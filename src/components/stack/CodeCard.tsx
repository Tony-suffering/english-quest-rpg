import { T, MONO } from '@/data/stack/theme';
import type { CodeBlock } from '@/data/stack/types';

const LANG_LABEL: Record<CodeBlock['lang'], string> = {
    ts: 'TypeScript',
    tsx: 'TSX',
    sql: 'SQL',
    bash: 'ターミナル',
    json: 'JSON',
    text: '',
};

export function CodeCard({ block }: { block: CodeBlock }) {
    return (
        <div style={{ margin: '18px 0' }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                padding: '7px 12px', backgroundColor: T.ink,
                borderRadius: `${T.radiusSm} ${T.radiusSm} 0 0`,
                fontFamily: MONO, fontSize: 11,
            }}>
                <span style={{ color: '#E7E5E4', fontWeight: 700, wordBreak: 'break-all' }}>{block.file}</span>
                {LANG_LABEL[block.lang] && (
                    <span style={{ color: T.gold, fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {LANG_LABEL[block.lang]}
                    </span>
                )}
            </div>
            <pre style={{
                margin: 0, padding: '14px', backgroundColor: T.codeBg,
                border: `1px solid ${T.border}`, borderTop: 'none',
                borderRadius: `0 0 ${T.radiusSm} ${T.radiusSm}`,
                fontFamily: MONO, fontSize: 12.5, lineHeight: 1.75, color: T.code,
                overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            }}>
                <code>{block.code}</code>
            </pre>
            {block.note && (
                <p style={{
                    margin: '8px 2px 0', fontSize: 12.5, color: T.textSub,
                    borderLeft: `2px solid ${T.gold}`, paddingLeft: 10, lineHeight: 1.8,
                }}>
                    {block.note}
                </p>
            )}
        </div>
    );
}
