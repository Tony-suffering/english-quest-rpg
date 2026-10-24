/**
 * Silent Bartender -- test scenarios.
 *
 * Canonical scenarios to verify the game flow behaves as intended.
 * Not runnable tests yet — just a specification that future test
 * runners can consume.
 */

export interface TestScenario {
    id: string;
    name: string;
    setup: string[];
    expected: string[];
}

export const TEST_SCENARIOS: TestScenario[] = [
    {
        id: 'test-first-night',
        name: '初プレイ：チュートリアル表示',
        setup: ['localStorage empty', 'page /english/bar accessed'],
        expected: [
            'tutorialが先に表示される',
            'skip後、通常intro画面に移る',
            '最初のnight開始で mic calibration が走る',
        ],
    },
    {
        id: 'test-mic-denied',
        name: 'マイク許可拒否',
        setup: ['mic permission denied', 'start night'],
        expected: [
            '声を出してもバストしない',
            'ゲームは通常通り進む',
            '閉店時、通常の summary 表示',
        ],
    },
    {
        id: 'test-speakeasy-mode',
        name: 'Speakeasy モード',
        setup: ['select speakeasy', 'start night'],
        expected: [
            'mic watchdog 無効',
            'calibration をスキップ',
            '通常の game loop を実行',
        ],
    },
    {
        id: 'test-lisa-eligibility',
        name: 'Lisa アンロック',
        setup: ['totalNights === 7'],
        expected: [
            'CharacterSelect が intro に表示される',
            'Lisa を選んで夜を開始できる',
            'Lisa の intro beat と roast が使われる',
        ],
    },
    {
        id: 'test-milestone-trigger',
        name: 'マイルストーン発火',
        setup: ['complete night N where N === milestone.nights'],
        expected: [
            'MilestoneOverlay が ended 画面で表示される',
            'stats.totalNights が更新される',
            '次の夜の intro で MILESTONE_INTRO_BEATS[N] が引かれる可能性',
        ],
    },
    {
        id: 'test-boss-aftermath',
        name: 'ボス aftermath 発火',
        setup: ['fail a specific boss', 'play 3-4 more nights'],
        expected: [
            'maybeInjectAftermath が該当の follow-up customer を挿入',
            'one-shot フラグが立ち、再発火しない',
        ],
    },
    {
        id: 'test-easter-egg-100th',
        name: '100夜目 egg',
        setup: ['totalNights === 99'],
        expected: [
            'egg-hundredth-celebrant が night roster に spliced される',
            'cooldown で再発火しない',
        ],
    },
    {
        id: 'test-weekend-customers',
        name: '週末客',
        setup: ['JST Friday', 'start night'],
        expected: [
            'getWeekendCustomers() が weekend pool を返す',
            'merged roster にそれらが含まれる',
        ],
    },
    {
        id: 'test-seasonal-customer',
        name: '季節の客',
        setup: ['JST April', 'start night'],
        expected: [
            'getSeasonalCustomers() が桜月の客を返す',
            'merged roster に sakura 客が含まれる',
        ],
    },
    {
        id: 'test-install-gate',
        name: 'PWA インストールバナー',
        setup: ['totalNights === 3', 'not in standalone mode'],
        expected: [
            'InstallGate banner が表示される',
            'dismiss 後、localStorage フラグが立つ',
        ],
    },
];

export function scenarioById(id: string): TestScenario | undefined {
    return TEST_SCENARIOS.find(s => s.id === id);
}
