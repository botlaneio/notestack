'use client';

// Stacksy's classroom blackboard. It opens over the page during a voice call and Stacksy
// writes each step in chalk as he explains it. The lines come from the voice agent (see stacksy-call.tsx).
import {useEffect, useRef, useState, type ReactNode} from 'react';
import {X} from 'lucide-react';
import {numberLinePositions, type BoardLine, type BoardState, type Diagram} from '@/lib/stacksy-board';
import styles from './stacksy-board.module.css';

/** Chalk speed: about 25 letters a second, faster when Stacksy has written ahead. */
const TICK_MS = 40;
/** A diagram takes as long to draw as this many letters. */
const DIAGRAM_COST = 24;

const cost = (line: BoardLine) => line.text.length + (line.diagram ? DIAGRAM_COST : 0);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function StacksyBoard({board, writing, onClose}: {board: BoardState; writing: boolean; onClose: () => void}) {
  // The chalk is at `chars` letters into line `lineId`: earlier lines are fully written, later ones not yet.
  // Line ids only grow, so a wiped or fresh board needs no special handling.
  const [cursor, setCursor] = useState({lineId: 0, chars: 0});
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const current = board.lines.find(line => line.id === cursor.lineId);
  const behind = (current ? cost(current) - cursor.chars : 0)
    + board.lines.filter(line => line.id > cursor.lineId).reduce((sum, line) => sum + cost(line), 0);

  // Chalk catches up with what Stacksy has written.
  useEffect(() => {
    if (behind <= 0) return;
    const last = board.lines[board.lines.length - 1];
    if (prefersReducedMotion()) {setCursor({lineId: last.id, chars: cost(last)}); return;}
    const step = behind > 160 ? 4 : behind > 70 ? 2 : 1;
    const t = window.setTimeout(() => setCursor(c => {
      const line = board.lines.find(l => l.id === c.lineId);
      if (line && c.chars < cost(line)) return {lineId: c.lineId, chars: Math.min(cost(line), c.chars + step)};
      const next = board.lines.find(l => l.id > c.lineId);
      return next ? {lineId: next.id, chars: Math.min(cost(next), step)} : c;
    }), TICK_MS);
    return () => window.clearTimeout(t);
  }, [behind, cursor, board.lines]);

  // Keep the newest line in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [cursor, board.lines.length]);

  // Escape closes the board; focus starts on its close button.
  useEffect(() => {
    closeRef.current?.focus({preventScroll: true});
    const onKey = (event: KeyboardEvent) => {if (event.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const chalkBusy = behind > 0 || writing;

  return <div className={styles.overlay}>
    <section className={styles.frame} role="dialog" aria-label={`Stacksy's blackboard: ${board.title}`}>
      <div className={styles.board}>
        <svg width="0" height="0" aria-hidden="true" focusable="false" className={styles.defs}>
          <filter id="stacksy-chalk"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter>
        </svg>
        <header className={styles.head}>
          <h2 className={styles.title}>{board.title}</h2>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close the blackboard" title="Close the board">
            <X size={20} aria-hidden="true"/>
          </button>
        </header>
        <div ref={scrollRef} className={styles.lines} aria-live="polite">
          {board.lines.length === 0 && <p className={styles.waiting} aria-hidden="true">Stacksy is picking up the chalk…</p>}
          {board.lines.map(line => {
            const visible = line.id < cursor.lineId ? cost(line) : line.id === cursor.lineId ? cursor.chars : 0;
            if (visible <= 0) return <p key={line.id} className={styles.srOnly}>{line.text}</p>;
            const drawn = line.diagram ? Math.min(DIAGRAM_COST, visible) / DIAGRAM_COST : 0;
            const letters = Math.max(0, visible - (line.diagram ? DIAGRAM_COST : 0));
            const typing = letters < line.text.length;
            return <div key={line.id} className={styles.line} data-style={line.style}>
              {line.diagram && <ChalkDiagram kind={line.diagram} labels={line.labels} progress={drawn}/>}
              {line.text && <p className={styles.text}>
                <span className={styles.srOnly}>{line.text}</span>
                <span aria-hidden="true">{line.text.slice(0, letters)}{typing && letters > 0 && <span className={styles.cursor}/>}</span>
              </p>}
            </div>;
          })}
        </div>
      </div>
      <div className={styles.tray} aria-hidden="true">
        <span className={chalkBusy ? `${styles.chalk} ${styles.chalkBusy}` : styles.chalk}/>
        <span className={styles.chalkBlue}/>
        <span className={styles.duster}/>
      </div>
    </section>
  </div>;
}

/* ---------------- chalk diagrams ---------------- */

const CHALK = '#f3f1ea';

function ChalkDiagram({kind, labels, progress}: {kind: Diagram; labels: string[]; progress: number}) {
  // Strokes draw in as `progress` goes from 0 to 1; labels appear once the shape is done.
  const dash = {strokeDasharray: 1, strokeDashoffset: 1 - progress};
  const lineProps = {pathLength: 1, style: dash, stroke: CHALK, strokeWidth: 2.6, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const show = progress >= 1;
  const L = (i: number, fallback = '') => labels[i] ?? fallback;
  const Label = ({x, y, i, fallback, anchor = 'middle'}: {x: number; y: number; i: number; fallback?: string; anchor?: 'start' | 'middle' | 'end'}) => {
    const text = L(i, fallback);
    return show && text ? <text x={x} y={y} textAnchor={anchor} className={styles.svgLabel}>{text}</text> : null;
  };

  let body: ReactNode = null;
  switch (kind) {
    case 'right_triangle':
      body = <>
        <path d="M40 20 L40 120 L180 120 Z" {...lineProps}/>
        <path d="M40 106 L54 106 L54 120" {...lineProps} strokeWidth={1.8}/>
        <Label x={32} y={18} i={0} fallback="A" anchor="end"/>
        <Label x={32} y={134} i={1} fallback="B" anchor="end"/>
        <Label x={188} y={134} i={2} fallback="C" anchor="start"/>
        <Label x={30} y={74} i={3} anchor="end"/>
        <Label x={110} y={138} i={4}/>
        <Label x={118} y={62} i={5} anchor="start"/>
      </>;
      break;
    case 'triangle':
      body = <>
        <path d="M110 16 L32 120 L188 120 Z" {...lineProps}/>
        <Label x={110} y={12} i={0} fallback="A"/>
        <Label x={24} y={134} i={1} fallback="B" anchor="end"/>
        <Label x={196} y={134} i={2} fallback="C" anchor="start"/>
        <Label x={62} y={64} i={3} anchor="end"/>
        <Label x={110} y={138} i={4}/>
        <Label x={158} y={64} i={5} anchor="start"/>
      </>;
      break;
    case 'circle':
      body = <>
        <circle cx={110} cy={70} r={52} {...lineProps}/>
        <path d="M110 70 L162 70" {...lineProps}/>
        {show && <circle cx={110} cy={70} r={3} fill={CHALK}/>}
        <Label x={104} y={66} i={0} fallback="O" anchor="end"/>
        <Label x={136} y={64} i={1}/>
        <Label x={170} y={30} i={2} anchor="start"/>
      </>;
      break;
    case 'number_line': {
      const points = labels.length ? labels : ['0', '1'];
      const at = numberLinePositions(points);
      body = <>
        <path d="M12 70 L208 70 M20 63 L12 70 L20 77 M200 63 L208 70 L200 77" {...lineProps}/>
        {show && points.map((p, i) => {
          const x = 20 + at[i] * 180;
          return <g key={i}>
            <path d={`M${x} 62 L${x} 78`} stroke={CHALK} strokeWidth={2} strokeLinecap="round"/>
            <circle cx={x} cy={70} r={3.4} fill="#ffe27a"/>
            <text x={x} y={i % 2 ? 50 : 98} textAnchor="middle" className={styles.svgLabel}>{p}</text>
          </g>;
        })}
      </>;
      break;
    }
    case 'fraction': {
      const num = Math.max(0, Math.round(Number(L(0, '1')) || 0));
      const den = Math.max(1, Math.round(Number(L(1, '2')) || 1));
      const parts = Math.min(den, 12);
      const w = 176 / parts;
      body = <>
        <rect x={22} y={34} width={176} height={46} {...lineProps}/>
        {show && Array.from({length: parts}, (_, i) => <g key={i}>
          {i > 0 && <path d={`M${22 + i * w} 34 L${22 + i * w} 80`} stroke={CHALK} strokeWidth={1.8}/>}
          {i < num && parts === den && <rect x={22 + i * w + 3} y={37} width={w - 6} height={40} fill="#ffe27a" opacity={0.45}/>}
        </g>)}
        {show && <text x={110} y={112} textAnchor="middle" className={styles.svgLabel}>{`${L(0, '1')} out of ${L(1, '2')} parts`}</text>}
      </>;
      break;
    }
    case 'parallel_lines':
      body = <>
        <path d="M14 46 L206 46 M14 100 L206 100 M70 132 L150 12" {...lineProps}/>
        {show && <path d="M100 40 l7 6 l-7 6 M100 94 l7 6 l-7 6" stroke={CHALK} strokeWidth={1.8} fill="none"/>}
        <Label x={212} y={50} i={0} fallback="l" anchor="start"/>
        <Label x={212} y={104} i={1} fallback="m" anchor="start"/>
        <Label x={156} y={14} i={2} fallback="t" anchor="start"/>
        <Label x={142} y={40} i={3} anchor="start"/>
        <Label x={124} y={94} i={4} anchor="start"/>
      </>;
      break;
  }

  return <svg viewBox="0 0 220 142" className={styles.diagram} aria-hidden="true" focusable="false">
    <g filter="url(#stacksy-chalk)">{body}</g>
  </svg>;
}
