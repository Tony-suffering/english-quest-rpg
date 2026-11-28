/**
 * カードの中庭の場面(three.js)。React は知らない。DuelWorld.tsx が canvas を渡して、返ってきた取っ手で操作する。
 *
 * 場所の作り(単位はメートル。入口が +z、ライバルが -z):
 * - 石畳の中庭 26 × 84。まん中に細長い水盤。両脇に列柱と垂れ幕。
 * - 水盤の両岸にカードの台座が20基ずつ(計40枚)。内側を向いて浮いている。
 * - 奥に魔法陣とライバルの円い肖像。取ったカードは魔法陣のまわりに小さく並ぶ(20枚で輪が閉じる)。
 * - 遊び: カードの1枚が自分の英文を呼ぶ。声は sound.ts がそのカードの位置から鳴らす。ここは耳の位置を毎コマ渡し(onPose)、
 *   呼んでいるカードに波紋(近づくまで見えない)、手がかりを頼まれたら光の柱を出す。
 * 暗い画面にはしない(このアプリの決まり)。低い陽の、明るい夕方。
 */

import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { CardSpec } from '@/lib/duel';
import { PAL, bannerTex, cardFace, fluting, imageTex, leafBump, magicCircle, marble, plaqueTex, puddles, softDot, stoneTiles, waterNormals } from './textures';

export interface WorldCard { spec: CardSpec; art?: string }
export type Focus = { kind: 'card'; index: number } | { kind: 'rival' } | null;

export interface WorldOpts {
    cards: WorldCard[];
    art: { rival?: string; you?: string; back?: string };
    low: boolean;                       // スマホ: 後処理なし・影と水を軽く
    onFocus: (f: Focus) => void;
    onAct: () => void;
    onHear: () => void;
    onStep: (run: boolean) => void;
    onLock: (locked: boolean) => void;
    onHint: () => void;
    /** 毎コマ、歩く人の位置と向き(音の聞こえ方に使う) */
    onPose: (x: number, z: number, yaw: number) => void;
}

export interface WorldHandle {
    setTaken: (ids: string[]) => void;
    setMove: (x: number, z: number, run?: boolean) => void;
    look: (dx: number, dy: number) => void;
    lock: () => void;
    pulse: (index: number) => void;
    /** 呼んでいるカード。波紋は近づくまで見えない(far = true なら遠くからも見える。音を切っているとき用) */
    setCalling: (index: number | null, far?: boolean) => void;
    /** 手がかり: そのカードに光の柱を立てる */
    setHint: (index: number | null) => void;
    /** はずれ: カードが首を振る */
    shake: (index: number) => void;
    cardXZ: (index: number) => { x: number; z: number } | null;
    teleport: (x: number, z: number, yaw: number, pitch?: number) => void;
    /** 入場の空撮(水盤の上をすべって奥まで行き、入口に戻る) */
    playIntro: (done: () => void) => void;
    /** 挑戦の演出(20枚が魔法陣のまん中に集まり、ライバルの肖像へ寄る) */
    playChallenge: (done: () => void) => void;
    skipCine: () => void;
    dispose: () => void;
}

const PER_SIDE = 20;
const GAP = 2.6;
const STELE_X = 8.8;
const COL_X = 11.8;
const POOL_X = 4.2, POOL_Z = 25;
const CIRCLE = new THREE.Vector3(0, 0, -32.5);
const EYE = 1.62;
export const WORLD_SLOTS = PER_SIDE * 2;

const ELS = ['flame', 'aqua', 'wind', 'earth', 'thunder'];

export function createWorld(canvas: HTMLCanvasElement, opts: WorldOpts): WorldHandle {
    const low = opts.low;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    const pr = Math.min(window.devicePixelRatio || 1, low ? 1.4 : 1.5);   // 内蔵GPUでも回るように抑える(この PC に単体の GPU は無い)
    renderer.setPixelRatio(pr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(66, 1, 0.1, 3000);
    camera.rotation.order = 'YXZ';
    scene.fog = new THREE.FogExp2(0xf2c9a2, 0.0030);

    // ── 空と陽 ──
    const sunDir = new THREE.Vector3(-0.38, 0.135, -0.9).normalize();
    const sky = new Sky();
    sky.scale.setScalar(10000);
    const su = sky.material.uniforms;
    su.turbidity.value = 10; su.rayleigh.value = 3.1; su.mieCoefficient.value = 0.004; su.mieDirectionalG.value = 0.8;
    su.sunPosition.value.copy(sunDir);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.add(sky);
    const env = pmrem.fromScene(envScene);
    scene.add(sky);
    scene.environment = env.texture;
    scene.environmentIntensity = 0.7;

    const sun = new THREE.DirectionalLight(0xffc284, 9);
    sun.position.copy(sunDir).multiplyScalar(120);
    sun.castShadow = true;
    sun.shadow.mapSize.set(low ? 1536 : 2048, low ? 1536 : 2048);
    const sc = sun.shadow.camera;
    sc.left = -52; sc.right = 52; sc.top = 52; sc.bottom = -52; sc.near = 10; sc.far = 260;
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
    scene.add(sun, sun.target);
    scene.add(new THREE.HemisphereLight(0xcfdcff, 0xb09468, 1.25));

    // 雲(1枚の板に、その場で計算した模様。ゆっくり流れる。水にも映る)
    const cloudMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uSun: { value: new THREE.Vector2(sunDir.x, sunDir.z).normalize() } },
        vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: `
            varying vec2 vP; uniform float uTime; uniform vec2 uSun;
            float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
                return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
            float fbm(vec2 p){ float a = 0.5, s = 0.0; for(int i=0;i<6;i++){ s += a*noise(p); p = p*2.03 + 17.0; a *= 0.5; } return s; }
            void main(){
                vec2 p = vP * 0.00075 + vec2(uTime * 0.006, uTime * 0.002);
                float n = fbm(p * vec2(1.0, 2.2));
                float d = smoothstep(0.46, 0.72, n);
                float r = length(vP) / 6000.0;
                float sunward = max(dot(normalize(vP + 0.001), uSun), 0.0);
                vec3 lit = mix(vec3(1.0, 0.72, 0.50), vec3(1.0, 0.93, 0.80), smoothstep(0.55, 0.9, n));
                vec3 shade = vec3(0.62, 0.50, 0.66);
                vec3 col = mix(shade, lit, 0.45 + 0.55 * sunward) * (1.6 + 2.2 * pow(sunward, 6.0));
                gl_FragColor = vec4(col, d * 0.92 * (1.0 - smoothstep(0.45, 1.0, r)));
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }`,
    });
    const clouds = new THREE.Mesh(new THREE.PlaneGeometry(12000, 12000), cloudMat);
    clouds.rotation.x = Math.PI / 2; clouds.position.y = 520;
    scene.add(clouds);

    // ── 地面 ──
    const tiles = stoneTiles([7.5, 23]);
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 92),
        new THREE.MeshStandardMaterial({ map: tiles.map, bumpMap: tiles.bump, bumpScale: 2.2, roughness: 1, roughnessMap: puddles(), metalness: 0.02 }),
    );
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
    scene.add(floor);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x9cab5e, roughness: 1 });
    const ground = new THREE.Mesh(new THREE.CircleGeometry(900, 48), grassMat);
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.06; ground.receiveShadow = true;
    scene.add(ground);
    // 遠くの丘
    const hillGeo = new THREE.SphereGeometry(1, 24, 12);
    [[-140, -260, 150, 34], [120, -330, 220, 46], [-320, -80, 180, 40], [300, -120, 200, 52], [260, 220, 170, 30], [-260, 240, 190, 36], [0, -520, 320, 70], [0, 420, 260, 44]].forEach(([x, z, r, h], i) => {
        const m = new THREE.Mesh(hillGeo, new THREE.MeshStandardMaterial({ color: i % 2 ? 0x8fa35f : 0x7f9a58, roughness: 1 }));
        m.position.set(x, -4, z); m.scale.set(r, h, r * 0.8);
        scene.add(m);
    });
    // 糸杉
    {
        const spots: [number, number, number][] = [];
        let s = 5;
        const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
        for (const side of [-1, 1]) {
            for (let z = -44; z <= 44; z += 5.2) spots.push([side * (17.5 + rnd() * 1.5), z + rnd() * 2, 8 + rnd() * 4]);
            for (let i = 0; i < 26; i++) spots.push([side * (26 + rnd() * 70), -90 + rnd() * 170, 7 + rnd() * 7]);
        }
        for (let i = 0; i < 16; i++) spots.push([-40 + rnd() * 80, -62 - rnd() * 50, 8 + rnd() * 6]);
        const cone = new THREE.InstancedMesh(new THREE.LatheGeometry([[0.0, -0.5], [0.5, -0.47], [0.9, -0.34], [1.0, -0.15], [0.9, 0.06], [0.66, 0.26], [0.36, 0.42], [0.12, 0.49], [0.0, 0.5]].map(([x, y]) => new THREE.Vector2(x, y)), 16), new THREE.MeshStandardMaterial({ color: 0x47663a, roughness: 0.95, bumpMap: leafBump(), bumpScale: 6 }), spots.length);
        const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.2, 1.2, 6), new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 1 }), spots.length);
        const m = new THREE.Matrix4(), q = new THREE.Quaternion();
        spots.forEach(([x, z, h], i) => {
            m.compose(new THREE.Vector3(x, 1 + h / 2, z), q, new THREE.Vector3(0.8 + h * 0.035, h, 0.8 + h * 0.035)); cone.setMatrixAt(i, m);
            m.compose(new THREE.Vector3(x, 0.6, z), q, new THREE.Vector3(1, 1, 1)); trunk.setMatrixAt(i, m);
        });
        cone.castShadow = true;
        scene.add(cone, trunk);
    }

    // ── 石と金 ──
    const marbleMat = new THREE.MeshStandardMaterial({ map: marble([1, 1]), roughness: 0.42, metalness: 0.02 });
    const marbleLong = new THREE.MeshStandardMaterial({ map: marble([12, 1], 9), roughness: 0.5 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.28, metalness: 1 });
    const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, shadow = true) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true;
        scene.add(m);
        return m;
    };

    // 列柱
    {
        const zs: number[] = [];
        for (let z = -36.4; z <= 36.41; z += 5.2) zs.push(z);
        const n = zs.length * 2;
        const shaftMat = new THREE.MeshStandardMaterial({ map: marble([2, 3], 5), bumpMap: fluting(), bumpScale: 3, roughness: 0.45 });
        const shaft = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.36, 0.43, 5.6, 28, 1), shaftMat, n);
        const base = new THREE.InstancedMesh(new THREE.BoxGeometry(1.12, 0.3, 1.12), marbleMat, n);
        const torus = new THREE.InstancedMesh(new THREE.TorusGeometry(0.45, 0.07, 10, 28), marbleMat, n * 2);
        const cap = new THREE.InstancedMesh(new THREE.BoxGeometry(1.14, 0.26, 1.14), marbleMat, n);
        const m = new THREE.Matrix4();
        const flat = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)), q0 = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
        let i = 0;
        for (const side of [-1, 1]) for (const z of zs) {
            const x = side * COL_X;
            m.compose(new THREE.Vector3(x, 3.1, z), q0, one); shaft.setMatrixAt(i, m);
            m.compose(new THREE.Vector3(x, 0.15, z), q0, one); base.setMatrixAt(i, m);
            m.compose(new THREE.Vector3(x, 6.03, z), q0, one); cap.setMatrixAt(i, m);
            m.compose(new THREE.Vector3(x, 0.36, z), flat, one); torus.setMatrixAt(i * 2, m);
            m.compose(new THREE.Vector3(x, 5.86, z), flat, new THREE.Vector3(0.9, 0.9, 1)); torus.setMatrixAt(i * 2 + 1, m);
            i++;
        }
        [shaft, base, torus, cap].forEach(o => { o.castShadow = true; o.receiveShadow = true; scene.add(o); });
        for (const side of [-1, 1]) {
            box(1.05, 0.78, 78.4, marbleLong, side * COL_X, 6.55, 0);
            box(1.5, 0.16, 79, marbleLong, side * COL_X, 7.02, 0);
            box(1.12, 0.07, 78.5, gold, side * COL_X, 6.2, 0, false);
        }
    }

    // 垂れ幕(柱と柱のあいだ)
    const banners: { mesh: THREE.Mesh; base: Float32Array; ph: number }[] = [];
    {
        const texs = ELS.map(bannerTex);
        let k = 0;
        for (const side of [-1, 1]) for (let z = -33.8; z <= 33.81; z += 5.2) {
            const geo = new THREE.PlaneGeometry(1.5, 3.3, 4, 10);
            const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: texs[k % 5], side: THREE.DoubleSide, roughness: 0.85 }));
            mesh.position.set(side * (COL_X - 0.05), 4.45, z);
            mesh.rotation.y = side * -Math.PI / 2;
            mesh.castShadow = true;
            scene.add(mesh);
            box(0.06, 0.06, 1.8, gold, side * (COL_X - 0.05), 6.12, z, false);
            banners.push({ mesh, base: (geo.attributes.position.array as Float32Array).slice(), ph: k * 1.7 });
            k++;
        }
    }

    // 水盤
    const rimMat = new THREE.MeshStandardMaterial({ map: marble([10, 1], 4), roughness: 0.4 });
    box(POOL_X * 2 + 0.9, 0.3, 0.45, rimMat, 0, 0.15, POOL_Z + 0.225);
    box(POOL_X * 2 + 0.9, 0.3, 0.45, rimMat, 0, 0.15, -POOL_Z - 0.225);
    box(0.45, 0.3, POOL_Z * 2, rimMat, POOL_X + 0.225, 0.15, 0);
    box(0.45, 0.3, POOL_Z * 2, rimMat, -POOL_X - 0.225, 0.15, 0);
    const water = new Water(new THREE.PlaneGeometry(POOL_X * 2, POOL_Z * 2), {
        textureWidth: low ? 384 : 512, textureHeight: low ? 384 : 512,
        waterNormals: waterNormals(),
        sunDirection: sunDir.clone(), sunColor: 0xffe2b0, waterColor: 0x0e3a3c,
        distortionScale: 0.16, fog: true,
    });
    water.rotation.x = -Math.PI / 2; water.position.y = 0.2;
    water.material.uniforms.size.value = 5;
    scene.add(water);

    // ── カードの台座 ──
    const dot = softDot();
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xc9a23a, roughness: 0.3, metalness: 1 });
    const backMat = new THREE.MeshStandardMaterial({ map: imageTex(opts.art.back, '#b8941e'), roughness: 0.4 });
    const cardGeo = new THREE.BoxGeometry(1.2, 1.7, 0.035);
    const plinthGeo = new THREE.BoxGeometry(1.0, 0.85, 0.7);
    const trimGeo = new THREE.BoxGeometry(1.08, 0.06, 0.78);
    const ringGeo = new THREE.TorusGeometry(0.66, 0.028, 10, 64);
    const glowGeo = new THREE.PlaneGeometry(2.4, 2.4);

    interface Stele { group: THREE.Group; card: THREE.Group; front: THREE.MeshStandardMaterial; ring: THREE.Mesh; glow: THREE.Mesh; pos: THREE.Vector3; face: THREE.Vector3; taken: boolean; f: number; pulse: number; shake: number; id: string }
    const steles: Stele[] = [];
    opts.cards.slice(0, WORLD_SLOTS).forEach((wc, i) => {
        const side = i % 2 ? 1 : -1, row = Math.floor(i / 2);
        const z = (PER_SIDE - 1) / 2 * GAP - row * GAP;      // 入口側から奥へ
        const x = side * STELE_X;
        const group = new THREE.Group();
        group.position.set(x, 0, z);
        group.rotation.y = -side * Math.PI / 2;
        const plinth = new THREE.Mesh(plinthGeo, marbleMat); plinth.position.y = 0.425; plinth.castShadow = plinth.receiveShadow = true;
        const t1 = new THREE.Mesh(trimGeo, gold); t1.position.y = 0.86; t1.castShadow = true;
        const t2 = new THREE.Mesh(trimGeo, gold); t2.position.y = 0.03;
        const [, c1] = PAL[wc.spec.element] || PAL.flame;
        const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ map: dot, color: new THREE.Color(c1), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
        glow.rotation.x = -Math.PI / 2; glow.position.y = 0.9;
        const front = new THREE.MeshStandardMaterial({ map: cardFace(wc.spec, wc.art), roughness: 1, metalness: 0, color: 0x000000, envMapIntensity: 0, emissive: 0xffffff, emissiveIntensity: 1.0 });   // 陽や空を映さない(斜めから見ると白く飛ぶ)。絵そのものの色で光らせる
        front.emissiveMap = front.map;
        const cardMesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, front, backMat]);
        cardMesh.castShadow = true;
        const card = new THREE.Group();
        card.position.y = 2.02;
        card.add(cardMesh);
        const ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0xffe08a, emissive: 0xffc94a, emissiveIntensity: 2.2, roughness: 0.3, metalness: 1 }));
        ring.visible = false;
        ring.rotation.x = Math.PI / 2; ring.position.y = 1.0;
        group.add(plinth, t1, t2, glow, card, ring);
        scene.add(group);
        steles.push({ group, card, front, ring, glow, pos: new THREE.Vector3(x, 2.02, z), face: new THREE.Vector3(-side, 0, 0), taken: false, f: 0, pulse: 0, shake: 0, id: wc.spec.id });
    });

    // 呼んでいるカードの波紋(3つの輪が順に広がる)と、手がかりの光の柱
    let calling = -1, callFar = false, hint = -1;
    const ripples = [0, 1, 2].map(() => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(1, 0.018, 8, 64), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 1.9, 0.9), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        m.visible = false;
        scene.add(m);
        return m;
    });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, 26, 24, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.1, 1.0), transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    beam.visible = false;
    scene.add(beam);

    // ── 奥: 魔法陣とライバル ──
    const circleTex = magicCircle();
    const circleMat = new THREE.MeshBasicMaterial({ map: circleTex, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2.6, 2.0, 1.0) });
    const circle = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 9.6), circleMat);
    circle.rotation.x = -Math.PI / 2; circle.position.copy(CIRCLE).setY(0.03);
    const circle2 = new THREE.Mesh(new THREE.PlaneGeometry(12.4, 12.4), new THREE.MeshBasicMaterial({ map: circleTex, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2.2, 1.9, 1.3) }));
    circle2.rotation.x = -Math.PI / 2; circle2.position.copy(CIRCLE).setY(0.025);
    scene.add(circle, circle2);

    const medallion = (url: string | undefined, z: number, faceZ: number, title: string, sub: string) => {
        box(27.6, 9.6, 1.2, marbleLong, 0, 4.8, z);
        box(28.2, 0.3, 1.7, marbleLong, 0, 9.75, z);
        box(27.7, 0.1, 1.3, gold, 0, 9.3, z, false);
        box(6.4, 8.2, 0.5, marbleMat, 0, 4.1, z + faceZ * 0.75);
        const mat = new THREE.MeshStandardMaterial({ map: imageTex(url, '#d4af37'), roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.45 });
        mat.emissiveMap = mat.map;
        const disc = new THREE.Mesh(new THREE.CircleGeometry(2.1, 64), mat);
        disc.position.set(0, 5.3, z + faceZ * 1.02); if (faceZ < 0) disc.rotation.y = Math.PI;
        const rim = new THREE.Mesh(new THREE.TorusGeometry(2.16, 0.13, 14, 72), gold.clone());
        rim.position.copy(disc.position);
        const plaque = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.1), new THREE.MeshStandardMaterial({ map: plaqueTex(title, sub), roughness: 0.6 }));
        plaque.position.set(0, 2.1, z + faceZ * 1.02); if (faceZ < 0) plaque.rotation.y = Math.PI;
        scene.add(disc, rim, plaque);
        return rim;
    };
    const rivalRim = medallion(opts.art.rival, -41.4, 1, 'THE RIVAL', 'CATCH TWENTY BY EAR, THEN STEP INTO THE CIRCLE');
    medallion(opts.art.you, 43.4, -1, 'THE CARD GROUNDS', 'A CARD IS CALLING  ·  FOLLOW THE VOICE');

    // かがり火
    const flames: { mesh: THREE.Sprite; light: THREE.PointLight; ph: number }[] = [];
    [[-4.6, -38.6], [4.6, -38.6], [-4.6, 40.6], [4.6, 40.6]].forEach(([x, z], i) => {
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.34, 1.5, 12), marbleMat); stand.position.set(x, 0.75, z); stand.castShadow = true;
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.2, 0.32, 20), gold); bowl.position.set(x, 1.62, z); bowl.castShadow = true;
        const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xff8a2a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
        flame.position.set(x, 2.15, z);
        const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xfff0b0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
        core.position.set(x, 1.98, z); core.scale.set(0.5, 0.6, 1);
        scene.add(core);
        const light = new THREE.PointLight(0xff9a3c, 14, 9, 2); light.position.set(x, 2.4, z);
        scene.add(stand, bowl, flame, light);
        flames.push({ mesh: flame, light, ph: i * 2.1 });
    });

    // 取ったカードが魔法陣のまわりに並ぶ
    const miniGeo = new THREE.BoxGeometry(0.62, 0.88, 0.02);
    const minis: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; a: number; s: number }[] = [];
    for (let k = 0; k < 20; k++) {
        const a = (k / 20) * Math.PI * 2 + Math.PI / 20;
        const mat = new THREE.MeshStandardMaterial({ roughness: 1, color: 0x000000, envMapIntensity: 0, emissive: 0xffffff, emissiveIntensity: 1.0 });
        const mesh = new THREE.Mesh(miniGeo, [sideMat, sideMat, sideMat, sideMat, mat, mat]);
        mesh.position.set(CIRCLE.x + Math.sin(a) * 4.1, 1.25, CIRCLE.z + Math.cos(a) * 4.1);
        mesh.rotation.y = a + Math.PI;
        mesh.visible = false; mesh.castShadow = true;
        scene.add(mesh);
        minis.push({ mesh, mat, a, s: 0 });
    }

    // 光の粒
    const MOTES = low ? 260 : 620;
    const motePos = new Float32Array(MOTES * 3), moteSeed = new Float32Array(MOTES);
    for (let i = 0; i < MOTES; i++) {
        motePos[i * 3] = (Math.random() - 0.5) * 24; motePos[i * 3 + 1] = 0.3 + Math.random() * 6.5; motePos[i * 3 + 2] = (Math.random() - 0.5) * 84;
        moteSeed[i] = Math.random() * 100;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({ map: dot, color: 0xffe9b0, size: 0.09, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
    scene.add(motes);

    // ── 後処理 ──
    let composer: EffectComposer | null = null;
    if (!low) {
        const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 2 });
        composer = new EffectComposer(renderer, rt);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new UnrealBloomPass(new THREE.Vector2(4, 4), 0.22, 0.6, 1.6));
        composer.addPass(new OutputPass());
    }

    const resize = () => {
        const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        composer?.setPixelRatio(pr);
        composer?.setSize(w, h);
        camera.aspect = w / h;
        camera.fov = w < h ? 80 : 66;
        camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── 歩く人 ──
    const pos = new THREE.Vector3(0, EYE, 36.5);
    let yaw = 0, pitch = -0.02;
    const vel = new THREE.Vector2();
    const move = { x: 0, z: 0, run: false };
    const keys = new Set<string>();
    let walked = 0, bob = 0;
    let focus: Focus = null;
    let ready = false;
    let gather = 0, gathering = false;
    let cine: { pos: THREE.CatmullRomCurve3; look: THREE.CatmullRomCurve3; t: number; dur: number; done: () => void; end?: [number, number, number, number] } | null = null;
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const endCine = () => {
        if (!cine) return;
        const c = cine; cine = null;
        if (c.end) { pos.x = c.end[0]; pos.z = c.end[1]; yaw = c.end[2]; pitch = c.end[3]; vel.set(0, 0); }
        c.done();
    };

    const resolve = () => {
        pos.x = Math.max(-10.6, Math.min(10.6, pos.x));
        pos.z = Math.max(-39.6, Math.min(41.6, pos.z));
        if (Math.abs(pos.z) < 26.6) pos.x = Math.max(-7.75, Math.min(7.75, pos.x));
        const px = POOL_X + 0.85, pz = POOL_Z + 0.85;
        if (Math.abs(pos.x) < px && Math.abs(pos.z) < pz) {
            const dx = px - Math.abs(pos.x), dz = pz - Math.abs(pos.z);
            if (dx < dz) pos.x = (pos.x < 0 ? -1 : 1) * px; else pos.z = (pos.z < 0 ? -1 : 1) * pz;
        }
    };

    const onKey = (e: KeyboardEvent) => {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (e.type === 'keydown') {
            if (!e.repeat && (k === 'e' || k === 'f' || k === 'Enter' || k === ' ')) { e.preventDefault(); opts.onAct(); }
            if (!e.repeat && k === 'r') opts.onHear();
            if (!e.repeat && k === 'h') opts.onHint();
            keys.add(k);
            if (k.startsWith('Arrow') || k === ' ') e.preventDefault();
        } else keys.delete(k);
    };
    const onBlur = () => keys.clear();
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    window.addEventListener('blur', onBlur);

    const look = (dx: number, dy: number) => {
        yaw -= dx; pitch = Math.max(-1.2, Math.min(1.2, pitch - dy));
    };
    let drag: { id: number; x: number; y: number; moved: number } | null = null;
    const locked = () => document.pointerLockElement === canvas;
    const lock = () => { try { const p = canvas.requestPointerLock() as unknown; (p as Promise<void> | undefined)?.catch?.(() => { /* 取れない環境ではドラッグで見回す */ }); } catch { /* 同上 */ } };
    const onDown = (e: PointerEvent) => { if (!locked()) drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 }; };
    const onMove = (e: PointerEvent) => {
        if (locked()) { look(e.movementX * 0.0022, e.movementY * 0.0022); return; }
        if (drag && drag.id === e.pointerId) {
            const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
            drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
            look(dx * 0.0042, dy * 0.0042);
        }
    };
    const onUp = (e: PointerEvent) => {
        if (locked()) { if (e.button === 0) opts.onAct(); return; }
        if (drag && drag.id === e.pointerId) {
            if (drag.moved < 6 && e.pointerType === 'mouse') lock();
            drag = null;
        }
    };
    const onLockChange = () => opts.onLock(locked());
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerlockchange', onLockChange);

    // ── 毎コマ ──
    const fwd = new THREE.Vector3(), tmp = new THREE.Vector3();
    let last = performance.now(), time = 0, raf = 0, dead = false;

    const frame = (now: number) => {
        if (dead) return;
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now; time += dt;

        if (gathering) gather = Math.min(1, gather + dt / 2.4);
        // 入力(演出のあいだは受けない)
        let ix = cine ? 0 : move.x, iz = cine ? 0 : move.z;
        if (cine) keys.clear();
        if (keys.has('w') || keys.has('ArrowUp')) iz += 1;
        if (keys.has('s') || keys.has('ArrowDown')) iz -= 1;
        if (keys.has('d')) ix += 1;
        if (keys.has('a')) ix -= 1;
        if (keys.has('ArrowLeft')) yaw += dt * 1.9;
        if (keys.has('ArrowRight')) yaw -= dt * 1.9;
        const mag = Math.hypot(ix, iz);
        if (mag > 1) { ix /= mag; iz /= mag; }
        const run = move.run || keys.has('Shift');
        const speed = run ? 6.4 : 3.3;
        const sin = Math.sin(yaw), cos = Math.cos(yaw);
        const tx = (ix * cos - iz * sin) * speed, tz = (-ix * sin - iz * cos) * speed;
        const ease = 1 - Math.exp(-dt * 10);
        vel.x += (tx - vel.x) * ease; vel.y += (tz - vel.y) * ease;
        const bx = pos.x, bz = pos.z;
        pos.x += vel.x * dt; pos.z += vel.y * dt;
        resolve();
        const stepLen = Math.hypot(pos.x - bx, pos.z - bz);
        walked += stepLen;
        if (walked > (run ? 1.25 : 0.82)) { walked = 0; opts.onStep(run); }
        bob += stepLen * (run ? 4.2 : 6.2);
        camera.position.set(pos.x, EYE + Math.sin(bob) * 0.028, pos.z);
        camera.rotation.set(pitch, yaw, Math.sin(bob * 0.5) * 0.004);
        if (cine) {
            cine.t += dt;
            const k = Math.min(1, cine.t / cine.dur), u = k * k * (3 - 2 * k);
            camera.position.copy(cine.pos.getPoint(u));
            camera.lookAt(cine.look.getPoint(u));
            if (k >= 1) endCine();
        }

        // いま見ているもの
        camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize();
        let best = -1, bestScore = 0.5;
        for (let i = 0; i < steles.length; i++) {
            const s = steles[i];
            tmp.set(s.pos.x - pos.x, 0, s.pos.z - pos.z);
            const d = tmp.length();
            if (d > 4.6) continue;
            const score = tmp.multiplyScalar(1 / d).dot(fwd) - d * 0.045;
            if (score > bestScore) { bestScore = score; best = i; }
        }
        let next: Focus = best >= 0 && !cine ? { kind: 'card', index: best } : null;
        if (cine) next = null; else
        if (!next && Math.hypot(pos.x - CIRCLE.x, pos.z - CIRCLE.z) < 5.2) next = { kind: 'rival' };
        if ((next?.kind !== focus?.kind) || (next?.kind === 'card' && focus?.kind === 'card' && next.index !== focus.index)) { focus = next; opts.onFocus(next); }

        // カード
        for (let i = 0; i < steles.length; i++) {
            const s = steles[i];
            const on = focus?.kind === 'card' && focus.index === i;
            s.f += ((on ? 1 : 0) - s.f) * (1 - Math.exp(-dt * 9));
            s.pulse = Math.max(0, s.pulse - dt * 1.6);
            s.shake = Math.max(0, s.shake - dt * 2.2);
            s.card.rotation.z = Math.sin(time * 34) * 0.1 * s.shake;
            const lift = s.taken ? 0.16 : 0;
            s.card.position.y = 2.02 + lift + Math.sin(time * 1.15 + i * 1.3) * 0.035 + s.f * 0.06 + Math.sin(s.pulse * Math.PI) * 0.35;
            s.card.position.z = s.f * 0.42;
            s.card.rotation.y = Math.sin(time * 0.7 + i) * 0.05 * (1 - s.f) + s.pulse * Math.PI * 2;
            const sc2 = 1 + s.f * 0.1;
            s.card.scale.setScalar(sc2);
            s.front.emissiveIntensity = 1.0 + s.f * 0.3 + (s.taken ? 0.12 : 0);
            s.ring.position.y = 1.0 + Math.sin(time * 1.6 + i) * 0.05;
            s.ring.scale.setScalar(1 + Math.sin(time * 2.2 + i) * 0.04);
            (s.glow.material as THREE.MeshBasicMaterial).opacity = 0.42 + s.f * 0.4 + (s.taken ? 0.25 : 0) + Math.sin(time * 2 + i) * 0.05;
        }
        // 波紋と光の柱
        const cs = calling >= 0 ? steles[calling] : null;
        const near = cs ? (callFar ? 1 : Math.max(0, Math.min(1, (9 - Math.hypot(cs.pos.x - pos.x, cs.pos.z - pos.z)) / 4))) : 0;
        ripples.forEach((r, k) => {
            r.visible = !!cs && near > 0.01;
            if (!cs) return;
            const ph = (time * 0.55 + k / 3) % 1;
            r.position.set(cs.pos.x + cs.face.x * 0.1, 2.05, cs.pos.z);
            r.rotation.y = Math.PI / 2;
            r.scale.setScalar(0.5 + ph * 2.1);
            (r.material as THREE.MeshBasicMaterial).opacity = (1 - ph) * 0.75 * near;
        });
        beam.visible = hint >= 0 && !!steles[hint];
        if (beam.visible) {
            beam.position.set(steles[hint].pos.x, 13, steles[hint].pos.z);
            (beam.material as THREE.MeshBasicMaterial).opacity = 0.24 + Math.sin(time * 4) * 0.08;
        }
        opts.onPose(pos.x, pos.z, yaw);

        // 輪に並ぶ小さなカード
        for (const m of minis) {
            if (!m.mesh.visible) continue;
            m.s += (1 - m.s) * (1 - Math.exp(-dt * 6));
            m.mesh.scale.setScalar(m.s);
            const ga = m.a + gather * gather * 7, gr = 4.1 * (1 - gather * 0.86);
            m.mesh.position.x = CIRCLE.x + Math.sin(ga) * gr;
            m.mesh.position.z = CIRCLE.z + Math.cos(ga) * gr;
            m.mesh.position.y = 1.25 + Math.sin(time * 1.3 + m.a * 3) * 0.05 + (1 - m.s) * 1.5 + gather * 2.1;
            m.mesh.rotation.y = ga + Math.PI;
            m.mat.emissiveIntensity = 1.0 + gather * 1.6;
        }
        circle.rotation.z = time * 0.08;
        circle2.rotation.z = -time * 0.05;
        circleMat.opacity = ready ? 0.8 + Math.sin(time * 3) * 0.2 : 0.6;
        circle.rotation.z += gather * time * 0.5;
        circle.scale.setScalar(1 + gather * 0.25);
        (rivalRim.material as THREE.MeshStandardMaterial).emissive.setHex(ready ? 0xffb347 : 0x000000);
        (rivalRim.material as THREE.MeshStandardMaterial).emissiveIntensity = ready ? 1.2 + Math.sin(time * 3) * 0.6 : 0;
        // 垂れ幕
        for (const b of banners) {
            const arr = b.mesh.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < arr.length; i += 3) {
                const y = b.base[i + 1], hang = (1.65 - y) / 3.3;
                arr[i + 2] = Math.sin(time * 1.5 + y * 1.4 + b.ph) * 0.09 * hang + Math.sin(time * 0.6 + b.ph) * 0.05 * hang;
            }
            b.mesh.geometry.attributes.position.needsUpdate = true;
        }
        // 火
        for (const f of flames) {
            const fl = 0.85 + Math.sin(time * 11 + f.ph) * 0.1 + Math.sin(time * 23 + f.ph * 2) * 0.06;
            f.mesh.scale.set(1.1 * fl, 1.7 * fl + (fl - 0.85) * 2, 1);
            f.light.intensity = 14 * fl;
        }
        // 粒
        const mp = moteGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < MOTES; i++) {
            mp[i * 3 + 1] += dt * (0.05 + (moteSeed[i] % 1) * 0.08);
            mp[i * 3] += Math.sin(time * 0.3 + moteSeed[i]) * dt * 0.08;
            if (mp[i * 3 + 1] > 7) mp[i * 3 + 1] = 0.3;
        }
        moteGeo.attributes.position.needsUpdate = true;
        water.material.uniforms.time.value = time * 0.22;
        cloudMat.uniforms.uTime.value = time;

        if (composer) composer.render(dt); else renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return {
        setTaken(ids) {
            const set = new Set(ids);
            steles.forEach(s => { s.taken = set.has(s.id); s.ring.visible = s.taken; });
            minis.forEach((m, k) => {
                const s = steles.find(x => x.id === ids[k]);
                if (s) {
                    if (m.mat.map !== s.front.map) { m.mat.map = s.front.map; m.mat.emissiveMap = s.front.map; m.mat.needsUpdate = true; m.s = 0; }
                    m.mesh.visible = true;
                } else { m.mesh.visible = false; m.mat.map = null; m.mat.emissiveMap = null; }
            });
            ready = ids.length >= 20;
        },
        setMove(x, z, run) { move.x = x; move.z = z; move.run = !!run; },
        look,
        lock,
        pulse(index) { if (steles[index]) steles[index].pulse = 1; },
        setCalling(index, far) { calling = index === null ? -1 : index; callFar = !!far; },
        setHint(index) { hint = index === null ? -1 : index; },
        shake(index) { if (steles[index]) steles[index].shake = 1; },
        cardXZ(index) { const s = steles[index]; return s ? { x: s.pos.x, z: s.pos.z } : null; },
        teleport(x, z, y, p = 0) { pos.x = x; pos.z = z; yaw = y; pitch = p; vel.set(0, 0); },
        playIntro(done) {
            cine = {
                pos: new THREE.CatmullRomCurve3([V(0, 9.5, 52), V(0, 4.2, 30), V(0.6, 1.25, 8), V(-0.6, 1.5, -14), V(0, 3.4, -27), V(0, 2.2, -29)]),
                look: new THREE.CatmullRomCurve3([V(0, 2, 20), V(0, 1.5, 0), V(4, 1.8, -8), V(-5, 2, -26), V(0, 4.6, -40), V(0, 5.2, -40)]),
                t: 0, dur: 10.5, done, end: [0, 36.5, 0, -0.02],
            };
        },
        playChallenge(done) {
            gathering = true;
            const from = camera.position.clone();
            cine = {
                pos: new THREE.CatmullRomCurve3([from, V(from.x * 0.4, 2.6, -26.5), V(0, 3.4, -31), V(0, 4.9, -36.2)]),
                look: new THREE.CatmullRomCurve3([V(CIRCLE.x, 1.4, CIRCLE.z), V(0, 2.6, -32.5), V(0, 4.4, -38), V(0, 5.3, -40.4)]),
                t: 0, dur: 3.4, done,
            };
        },
        skipCine() { if (cine?.end) endCine(); },
        dispose() {
            dead = true;
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('keyup', onKey);
            window.removeEventListener('blur', onBlur);
            canvas.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerlockchange', onLockChange);
            if (locked()) document.exitPointerLock();
            scene.traverse(o => {
                const m = o as THREE.Mesh;
                m.geometry?.dispose?.();
                const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
                mats.forEach(mt => { (mt as THREE.MeshStandardMaterial).map?.dispose?.(); mt.dispose?.(); });
            });
            env.dispose(); pmrem.dispose();
            composer?.dispose();
            renderer.dispose();
        },
    };
}
