'use client';

import { useState, useRef, useCallback } from 'react';

const initialData = [
    { group: 'Code and Logic', value: 0.9, tools: 'Python, SQL, Matlab, React' },
    { group: 'Data Systems', value: 0.8, tools: 'Data Pipelines, ETL, Data Architecture' },
    { group: 'Deep Dive', value: 0.95, tools: 'Sensor Data, Image Processing, Simulation, Research' },
    { group: 'Creative Flow', value: 0.85, tools: 'Figma, Procreate, Photoshop' },
    { group: 'Tool Tinkering', value: 0.8, tools: 'AWS, Docker, Git' },
];

const CX = 220;
const CY = 178;
const R = 96;
const LEVELS = 4;
const SIDES = initialData.length;

function angleFor(i: number) {
    return (Math.PI * 2 * i) / SIDES - Math.PI / 2;
}

function pointAt(i: number, scale: number) {
    const a = angleFor(i);
    return { x: CX + Math.cos(a) * R * scale, y: CY + Math.sin(a) * R * scale };
}

function polygonPoints(scale: number) {
    return Array.from({ length: SIDES }, (_, i) => {
        const p = pointAt(i, scale);
        return `${p.x},${p.y}`;
    }).join(' ');
}

function getLabelOffset(i: number): { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' } {
    const a = angleFor(i);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const dx = cos * 20;
    let dy = sin * 20;
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (cos > 0.3) anchor = 'start';
    else if (cos < -0.3) anchor = 'end';
    if (sin < -0.3) dy -= 4;
    else if (sin > 0.3) dy += 4;
    return { dx, dy, anchor };
}

export default function SkillRadar() {
    const [radarData, setRadarData] = useState(initialData);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const dragIndexRef = useRef<number | null>(null);

    const getSvgCoords = useCallback((clientX: number, clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return null;
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX + viewBox.x,
            y: (clientY - rect.top) * scaleY + viewBox.y,
        };
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
        const idx = dragIndexRef.current;
        if (idx === null) return;
        e.preventDefault();
        const pt = getSvgCoords(e.clientX, e.clientY);
        if (!pt) return;
        const dx = pt.x - CX;
        const dy = pt.y - CY;
        const newValue = Math.max(0.15, Math.min(1, Math.hypot(dx, dy) / R));
        setRadarData((previous) => previous.map((item, itemIndex) => (
            itemIndex === idx ? { ...item, value: newValue } : item
        )));
    }, [getSvgCoords]);

    const endDrag = useCallback(() => {
        dragIndexRef.current = null;
        setDragIndex(null);
    }, []);

    const startDrag = useCallback((i: number, e: React.PointerEvent<SVGCircleElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragIndexRef.current = i;
        setDragIndex(i);
        setActiveIndex(i);
    }, []);

    const dataPolygon = radarData
        .map((d, i) => {
            const p = pointAt(i, d.value);
            return `${p.x},${p.y}`;
        })
        .join(' ');

    const activeData = activeIndex !== null ? radarData[activeIndex] : null;

    return (
        <div className="pb-2">
            <svg
                ref={svgRef}
                viewBox="0 0 440 356"
                className="w-full select-none touch-pan-y"
                role="img"
                aria-label="Interactive skill radar. Drag vertices to adjust."
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                {/* Grid levels */}
                {Array.from({ length: LEVELS }, (_, l) => {
                    const scale = (l + 1) / LEVELS;
                    return (
                        <polygon
                            key={l}
                            points={polygonPoints(scale)}
                            fill="none"
                            stroke="var(--s-line)"
                            strokeOpacity={0.15}
                            strokeWidth={1}
                        />
                    );
                })}

                {/* Axis lines */}
                {Array.from({ length: SIDES }, (_, i) => {
                    const p = pointAt(i, 1);
                    const isActive = activeIndex === i;
                    return (
                        <line
                            key={i}
                            x1={CX}
                            y1={CY}
                            x2={p.x}
                            y2={p.y}
                            stroke={isActive ? '#6366F1' : 'var(--s-line)'}
                            strokeOpacity={isActive ? 0.6 : 0.15}
                            strokeWidth={isActive ? 1.5 : 1}
                        />
                    );
                })}

                {/* Data area */}
                <polygon
                    points={dataPolygon}
                    fill="rgba(99, 102, 241, 0.12)"
                    stroke="var(--s-accent-2)"
                    strokeWidth={1.5}
                />

                {/* Draggable vertices */}
                {radarData.map((d, i) => {
                    const p = pointAt(i, d.value);
                    const isActive = activeIndex === i;
                    const isDragging = dragIndex === i;
                    return (
                        <g key={i}>
                            {/* Glow */}
                            {(isActive || isDragging) && (
                                <circle cx={p.x} cy={p.y} r={12} fill="rgba(99,102,241,0.2)" stroke="var(--s-accent-2)" strokeWidth={0.5} />
                            )}
                            {/* Large hit target */}
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r={18}
                                fill="transparent"
                                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                                onPointerDown={(e) => { e.preventDefault(); startDrag(i, e); }}
                                onPointerEnter={() => { if (dragIndexRef.current === null) setActiveIndex(i); }}
                                onPointerLeave={() => { if (dragIndexRef.current === null) setActiveIndex(null); }}
                            />
                            {/* Visible dot */}
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r={isDragging ? 6 : isActive ? 5 : 4}
                                fill={isDragging ? 'var(--s-accent-2)' : isActive ? '#6366F1' : 'var(--s-card)'}
                                stroke={isActive || isDragging ? 'var(--s-violet)' : 'var(--s-accent-2)'}
                                strokeWidth={isDragging ? 2.5 : 1.5}
                                style={{ pointerEvents: 'none' }}
                            />
                        </g>
                    );
                })}

                {/* Labels */}
                {radarData.map((d, i) => {
                    const p = pointAt(i, 1);
                    const offset = getLabelOffset(i);
                    const isActive = activeIndex === i;
                    return (
                        <text
                            key={i}
                            x={p.x + offset.dx}
                            y={p.y + offset.dy}
                            textAnchor={offset.anchor}
                            dominantBaseline="central"
                            fill={isActive ? 'var(--s-violet)' : 'var(--s-text-2)'}
                            style={{
                                fontSize: isActive ? '11px' : '9.5px',
                                fontWeight: isActive ? 600 : 300,
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                letterSpacing: '0.02em',
                                cursor: 'pointer',
                            }}
                            onPointerEnter={() => { if (dragIndexRef.current === null) setActiveIndex(i); }}
                            onPointerLeave={() => { if (dragIndexRef.current === null) setActiveIndex(null); }}
                        >
                            {d.group}
                        </text>
                    );
                })}

                {/* Center tooltip */}
                {activeData ? (
                    <g>
                        <rect x={CX - 95} y={CY - 14} width={190} height={28} rx={6} fill="var(--s-card)" fillOpacity={0.9} stroke="#6366F1" strokeWidth={0.75} strokeOpacity={0.4} />
                        <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="central" fill="var(--s-violet)" style={{ fontSize: '8px', fontWeight: 500, fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                            {activeData.group} · {Math.round(activeData.value * 100)}%
                        </text>
                    </g>
                ) : (
                    <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central" fill="var(--s-line)" style={{ fontSize: '8px', fontWeight: 300, fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        Drag vertices to adjust
                    </text>
                )}
            </svg>
            <div className="min-h-12 px-3">
                <div className="rounded-lg border border-[#6366F1]/20 bg-(--s-card)/70 px-3 py-2 text-center text-xs leading-relaxed text-(--s-text-2)">
                    {activeData ? (
                        <span>
                            <span className="font-semibold text-(--s-violet)">{activeData.group}:</span> {activeData.tools}
                        </span>
                    ) : (
                        <span className="text-(--s-muted)">Hover or drag a point to view the related tools.</span>
                    )}
                </div>
            </div>
        </div>
    );
}
