'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CORE_CHARACTERS, type Character365 } from '@/data/english/365/characters';

// ============================================================
// DATA
// ============================================================

function getCharColor(id: string): string {
  const char = CORE_CHARACTERS.find(c => c.id === id);
  return char?.color || '#A8A29E';
}

interface Relationship {
  from: string;
  to: string;
  label: string;
  labelJa: string;
}

const RELATIONSHIPS: Relationship[] = [
  { from: 'yuki', to: 'gondo', label: 'Regular & Master', labelJa: '常連とマスター' },
  { from: 'yuki', to: 'takeshi', label: 'Drinking Buddies', labelJa: '飲み仲間' },
  { from: 'yuki', to: 'lisa', label: 'Mentor & Student', labelJa: '先輩と後輩' },
  { from: 'yuki', to: 'kenji', label: 'Fellow Students', labelJa: '仲間' },
  { from: 'yuki', to: 'mina', label: 'Fellow Students', labelJa: '仲間' },
  { from: 'gondo', to: 'lisa', label: 'Teaching Partners', labelJa: '教える仲間' },
  { from: 'gondo', to: 'kenji', label: 'Old Friends', labelJa: '古い友人' },
  { from: 'takeshi', to: 'mina', label: 'IT Neighbors', labelJa: 'IT仲間' },
];

interface LocationEntry {
  name: string;
  area: string;
  characters: string[];
  description: string;
}

const LOCATIONS_LIST: LocationEntry[] = [
  { name: "Gondo's Izakaya", area: 'Shimokitazawa', characters: ['Gondo', 'Yuki', 'Takeshi', 'Lisa', 'Kenji', 'Mina'], description: 'Home base. English Hour every Tuesday and Thursday night.' },
  { name: "Yuki's Trading Company", area: 'Otemachi', characters: ['Yuki'], description: 'Foreign clients, English emails, conference calls she dreads.' },
  { name: "Takeshi's IT Company", area: 'Shibuya', characters: ['Takeshi'], description: 'Tech meetings, English Slack channels, documentation in English.' },
  { name: "Lisa's Marketing Firm", area: 'Roppongi', characters: ['Lisa'], description: 'International office. Presentations, global campaigns.' },
  { name: "Kenji's Construction Site", area: 'Various', characters: ['Kenji'], description: 'Foreign workers on site. Safety instructions need English.' },
  { name: 'Shimokitazawa Streets', area: 'Shimokitazawa', characters: ['Everyone'], description: 'Daily encounters, lost tourists, cafe conversations.' },
];

// ============================================================
// LAYOUT POSITIONS -- 6 characters in hexagonal arrangement
// ============================================================

// Center at (400, 300) in an 800x600 viewBox
// Yuki at top (protagonist), Gondo at center-bottom (mentor), others around
const CHARACTER_POSITIONS: Record<string, { x: number; y: number }> = {
  yuki:    { x: 400, y: 140 },  // top center -- protagonist
  lisa:    { x: 570, y: 220 },  // top right
  takeshi: { x: 570, y: 380 },  // bottom right
  mina:    { x: 400, y: 460 },  // bottom center
  kenji:   { x: 230, y: 380 },  // bottom left
  gondo:   { x: 230, y: 220 },  // top left -- mentor
};

// ============================================================
// HELPERS
// ============================================================

function getInitial(char: Character365): string {
  return char.nameJa.charAt(0);
}

function getCharById(id: string): Character365 | undefined {
  return CORE_CHARACTERS.find(c => c.id === id);
}

function getLabelPos(from: { x: number; y: number }, to: { x: number; y: number }) {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };
}

function formatToeicScore(score: number): string {
  return `TOEIC ${score}`;
}

// ============================================================
// SUB COMPONENTS
// ============================================================

function CharacterNode({
  char,
  x,
  y,
  isSelected,
  isHighlighted,
  isDimmed,
  onSelect,
}: {
  char: Character365;
  x: number;
  y: number;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
}) {
  const color = getCharColor(char.id);
  const radius = 38;
  const opacity = isDimmed ? 0.25 : 1;

  return (
    <g
      onClick={() => onSelect(char.id)}
      style={{ cursor: 'pointer', opacity, transition: 'opacity 0.3s ease' }}
    >
      {/* Glow ring for selected */}
      {isSelected && (
        <circle
          cx={x}
          cy={y}
          r={radius + 7}
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.4}
        />
      )}
      {/* Outer ring */}
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={isSelected ? color : '#FAFAF9'}
        stroke={color}
        strokeWidth={3}
      />
      {/* Initial letter */}
      <text
        x={x}
        y={y - 4}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 20,
          fontWeight: 700,
          fill: isSelected ? '#FAFAF9' : color,
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
        }}
      >
        {getInitial(char)}
      </text>
      {/* Name label below */}
      <text
        x={x}
        y={y + radius + 16}
        textAnchor="middle"
        style={{
          fontSize: 12,
          fontWeight: 600,
          fill: isHighlighted || isSelected ? '#1C1917' : '#44403C',
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
        }}
      >
        {char.nameJa}
      </text>
      {/* TOEIC score below name */}
      <text
        x={x}
        y={y + radius + 30}
        textAnchor="middle"
        style={{
          fontSize: 10,
          fontWeight: 500,
          fill: '#78716C',
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
        }}
      >
        {formatToeicScore(char.toeicScore)}
      </text>
    </g>
  );
}

function RelationshipLine({
  rel,
  isHighlighted,
  isDimmed,
}: {
  rel: Relationship;
  isHighlighted: boolean;
  isDimmed: boolean;
}) {
  const from = CHARACTER_POSITIONS[rel.from];
  const to = CHARACTER_POSITIONS[rel.to];
  if (!from || !to) return null;

  const label = getLabelPos(from, to);
  const opacity = isDimmed ? 0.08 : isHighlighted ? 1 : 0.2;
  const strokeWidth = isHighlighted ? 2 : 1;
  const color = isHighlighted ? getCharColor(rel.from) : '#A8A29E';

  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
  const displayAngle = angle > 90 || angle < -90 ? angle + 180 : angle;

  return (
    <g style={{ transition: 'opacity 0.3s ease', opacity }}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={isHighlighted ? 'none' : '4 4'}
      />
      {isHighlighted && (
        <g transform={`translate(${label.x}, ${label.y}) rotate(${displayAngle})`}>
          <rect
            x={-48}
            y={-10}
            width={96}
            height={20}
            rx={4}
            fill="#FAFAF9"
            stroke="#E7E5E4"
            strokeWidth={1}
          />
          <text
            x={0}
            y={1}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: 9,
              fontWeight: 600,
              fill: '#44403C',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {rel.labelJa}
          </text>
        </g>
      )}
    </g>
  );
}

function CenterHub() {
  return (
    <g>
      <rect
        x={350}
        y={286}
        width={100}
        height={28}
        rx={6}
        fill="#1C1917"
        opacity={0.85}
      />
      <text
        x={400}
        y={301}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 10,
          fontWeight: 700,
          fill: '#D4AF37',
          letterSpacing: '0.1em',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        IZAKAYA TOEIC
      </text>
    </g>
  );
}

function CharacterDetail({ char, onClose }: { char: Character365; onClose: () => void }) {
  const color = getCharColor(char.id);
  const connections = RELATIONSHIPS.filter(r => r.from === char.id || r.to === char.id);

  return (
    <div
      style={{
        background: '#FAFAF9',
        border: '1px solid #E7E5E4',
        borderRadius: 16,
        padding: 24,
        position: 'relative',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 20,
          color: '#78716C',
          lineHeight: 1,
          padding: 4,
        }}
        aria-label="Close"
      >
        x
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAFAF9',
            fontSize: 24,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {getInitial(char)}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1C1917' }}>
            {char.nameJa}
            <span style={{ fontSize: 13, fontWeight: 400, color: '#78716C', marginLeft: 8 }}>
              {char.name}
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#44403C', marginTop: 2 }}>
            {char.age}{char.gender === 'male' ? 'M' : 'F'}
          </div>
        </div>
      </div>

      {/* TOEIC Score badge */}
      <div
        style={{
          display: 'inline-block',
          background: color,
          color: '#FAFAF9',
          borderRadius: 8,
          padding: '6px 14px',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.05em',
          marginBottom: 20,
        }}
      >
        TOEIC {char.toeicScore}
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <DetailField label="Role" value={char.role} />
        <DetailField label="English Level" value={char.englishLevel} />
        <DetailField label="Personality" value={char.personality} />
        <DetailField label="Speaking Style" value={char.speakingStyle} />
        <DetailField label="Arc" value={char.arc} />

        {/* Catchphrase */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 4 }}>
            CATCHPHRASE
          </div>
          <div
            style={{
              background: '#F5F5F4',
              borderLeft: `3px solid ${color}`,
              padding: '8px 12px',
              borderRadius: '0 8px 8px 0',
              fontSize: 14,
              color: '#1C1917',
              fontStyle: 'italic',
            }}
          >
            &quot;{char.catchphrase}&quot;
          </div>
          {char.catchphraseJa && (
            <div style={{ fontSize: 12, color: '#78716C', marginTop: 4, paddingLeft: 16 }}>
              {char.catchphraseJa}
            </div>
          )}
        </div>

        {/* Connections */}
        {connections.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 6 }}>
              CONNECTIONS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {connections.map((c, i) => {
                const otherId = c.from === char.id ? c.to : c.from;
                const other = getCharById(otherId);
                if (!other) return null;
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      background: '#F5F5F4',
                      border: '1px solid #E7E5E4',
                      borderRadius: 8,
                      padding: '3px 10px',
                      fontSize: 12,
                      color: '#44403C',
                    }}
                  >
                    {other.nameJa} -- {c.labelJa}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 2 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 14, color: '#1C1917', lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  );
}

function LocationCard({ loc }: { loc: LocationEntry }) {
  return (
    <div
      style={{
        background: '#FAFAF9',
        border: '1px solid #E7E5E4',
        borderRadius: 12,
        padding: 16,
        flex: '1 1 300px',
        minWidth: 260,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1917' }}>{loc.name}</div>
        <div style={{ fontSize: 11, color: '#78716C' }}>{loc.area}</div>
      </div>
      <div style={{ fontSize: 13, color: '#44403C', marginBottom: 8 }}>{loc.description}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {loc.characters.map(name => (
          <span
            key={name}
            style={{
              background: '#F5F5F4',
              border: '1px solid #E7E5E4',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 12,
              color: '#44403C',
              fontWeight: 500,
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function CharacterRelationshipPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  const selectedChar = selectedId ? getCharById(selectedId) : null;

  // Determine which nodes/lines to highlight
  const connectedIds = new Set<string>();
  if (selectedId) {
    connectedIds.add(selectedId);
    RELATIONSHIPS.forEach(r => {
      if (r.from === selectedId) connectedIds.add(r.to);
      if (r.to === selectedId) connectedIds.add(r.from);
    });
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: '#D4AF37',
            marginBottom: 8,
          }}
        >
          IZAKAYA TOEIC
        </div>
        <h1
          style={{
            fontSize: isMobile ? 24 : 32,
            fontWeight: 700,
            color: '#1C1917',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Character Relationship Map
        </h1>
        <div style={{ fontSize: 14, color: '#78716C', marginTop: 8 }}>
          6 characters at a Shimokitazawa izakaya. Click any character to explore.
        </div>
      </div>

      {/* Main content: Map + Detail panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {/* SVG Map */}
        <div
          style={{
            flex: '1 1 0',
            minWidth: 0,
            background: '#FAFAF9',
            border: '1px solid #E7E5E4',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 800 560"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Background */}
            <rect width="800" height="560" fill="#FAFAF9" />

            {/* Relationship lines (drawn first, behind nodes) */}
            {RELATIONSHIPS.map((rel, i) => {
              const isHighlighted = selectedId
                ? rel.from === selectedId || rel.to === selectedId
                : false;
              const isDimmed = selectedId ? !isHighlighted : false;
              return (
                <RelationshipLine
                  key={i}
                  rel={rel}
                  isHighlighted={selectedId ? isHighlighted : false}
                  isDimmed={isDimmed}
                />
              );
            })}

            {/* Show all relationship labels when nothing selected */}
            {!selectedId &&
              RELATIONSHIPS.map((rel, i) => {
                const from = CHARACTER_POSITIONS[rel.from];
                const to = CHARACTER_POSITIONS[rel.to];
                if (!from || !to) return null;
                const label = getLabelPos(from, to);
                const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
                const displayAngle = angle > 90 || angle < -90 ? angle + 180 : angle;
                return (
                  <g key={`label-${i}`} transform={`translate(${label.x}, ${label.y}) rotate(${displayAngle})`}>
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: 8,
                        fill: '#A8A29E',
                        fontFamily: 'system-ui, sans-serif',
                      }}
                    >
                      {rel.labelJa}
                    </text>
                  </g>
                );
              })}

            {/* Center hub label */}
            <CenterHub />

            {/* Character nodes */}
            {CORE_CHARACTERS.map(char => {
              const pos = CHARACTER_POSITIONS[char.id];
              if (!pos) return null;
              const isSelected = selectedId === char.id;
              const isHighlighted = connectedIds.has(char.id);
              const isDimmed = selectedId !== null && !connectedIds.has(char.id);
              return (
                <CharacterNode
                  key={char.id}
                  char={char}
                  x={pos.x}
                  y={pos.y}
                  isSelected={isSelected}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  onSelect={handleSelect}
                />
              );
            })}
          </svg>
        </div>

        {/* Detail Panel */}
        <div
          style={{
            width: isMobile ? '100%' : 380,
            flexShrink: 0,
          }}
        >
          {selectedChar ? (
            <CharacterDetail
              char={selectedChar}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div
              style={{
                background: '#FAFAF9',
                border: '1px solid #E7E5E4',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #10B981 100%)',
                  opacity: 0.15,
                  margin: '0 auto 16px',
                }}
              />
              <div style={{ fontSize: 15, fontWeight: 600, color: '#44403C', marginBottom: 8 }}>
                Select a character
              </div>
              <div style={{ fontSize: 13, color: '#78716C', lineHeight: 1.6 }}>
                Click any node on the map to see their profile, TOEIC score, story arc, and connections.
              </div>

              {/* Legend */}
              <div style={{ marginTop: 24, textAlign: 'left' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 10 }}>
                  CAST
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {CORE_CHARACTERS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(c.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 0',
                        textAlign: 'left',
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: getCharColor(c.id),
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 13, color: '#1C1917', fontWeight: 500 }}>
                          {c.nameJa} ({c.name}) -- {c.age}{c.gender === 'male' ? 'M' : 'F'}
                        </span>
                        <span style={{ fontSize: 11, color: '#78716C' }}>
                          TOEIC {c.toeicScore} / {c.role.split('.')[0].trim()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Locations Section */}
      <div style={{ marginTop: 48 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: '#D4AF37',
              marginBottom: 6,
            }}
          >
            LOCATIONS
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1C1917', margin: 0 }}>
            Key Places
          </h2>
          <div style={{ fontSize: 13, color: '#78716C', marginTop: 4 }}>
            Where the story unfolds -- from the izakaya to the office and beyond
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {LOCATIONS_LIST.map(loc => (
            <LocationCard key={loc.name} loc={loc} />
          ))}
        </div>
      </div>
    </div>
  );
}
