'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Environment, ContactShadows, Float } from '@react-three/drei'
import Link from 'next/link'
import { ArrowLeft, Layers, Sun, Box, Circle } from 'lucide-react'

// マテリアル設定の型定義
type MaterialConfig = {
    color: string
    roughness: number
    metalness: number
    name: string
}

const PRESETS: MaterialConfig[] = [
    { name: 'マットホワイト', color: '#ffffff', roughness: 0.8, metalness: 0 },
    { name: 'コンクリート', color: '#888888', roughness: 0.9, metalness: 0.1 },
    { name: 'ダークウッド', color: '#3e2723', roughness: 0.6, metalness: 0 },
    { name: 'ゴールド', color: '#ffd700', roughness: 0.2, metalness: 1 },
    { name: 'ミッドナイト', color: '#1a237e', roughness: 0.4, metalness: 0.6 },
]

function Scene({ config }: { config: MaterialConfig }) {
    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        color={config.color}
                        roughness={config.roughness}
                        metalness={config.metalness}
                    />
                </mesh>
            </Float>
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        </>
    )
}

export default function MaterialLabPage() {
    const [config, setConfig] = useState<MaterialConfig>(PRESETS[0])

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 text-gray-800 font-bold mb-2 hover:opacity-70 transition-opacity">
                        <ArrowLeft className="w-5 h-5" />
                        HOME
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                        MATERIAL<br />LAB.
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 font-mono">
                        Experimental 3D Texture Simulator<br />
                        React Three Fiber + Drei
                    </p>
                </div>
            </header>

            {/* 3D Canvas */}
            <div className="flex-1 w-full h-screen">
                <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.5}>
                            <Scene config={config} />
                        </Stage>
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={2} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/50">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Material Config
                    </h2>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {config.name}
                    </span>
                </div>

                {/* Presets */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => setConfig(preset)}
                            className={`w-10 h-10 rounded-full border-2 transition-all flex-shrink-0 ${config.name === preset.name ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                                }`}
                            style={{ backgroundColor: preset.color }}
                            title={preset.name}
                        />
                    ))}
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> ROUGHNESS (ザラつき)</span>
                            <span>{config.roughness.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={config.roughness}
                            onChange={(e) => setConfig({ ...config, roughness: parseFloat(e.target.value), name: 'Custom' })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span className="flex items-center gap-1"><Box className="w-3 h-3" /> METALNESS (金属感)</span>
                            <span>{config.metalness.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={config.metalness}
                            onChange={(e) => setConfig({ ...config, metalness: parseFloat(e.target.value), name: 'Custom' })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
