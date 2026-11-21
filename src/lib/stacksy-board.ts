// Stacksy's blackboard: what the voice agent writes, cleaned and kept in order.
// The agent calls blackboard_open / blackboard_write / blackboard_close; the page turns those calls
// into BoardActions. Only erasable TypeScript syntax: tests run it in Node.

export const LINE_STYLES = ['step', 'equation', 'highlight', 'note'] as const;
export const DIAGRAMS = ['right_triangle', 'triangle', 'circle', 'number_line', 'fraction', 'parallel_lines'] as const;
export type LineStyle = typeof LINE_STYLES[number];
export type Diagram = typeof DIAGRAMS[number];

export interface BoardLine {id: number; text: string; style: LineStyle; diagram: Diagram | null; labels: string[]}
export interface BoardState {open: boolean; title: string; lines: BoardLine[]; nextId: number}

export type BoardAction =
  | {type: 'open'; title?: unknown}
  | {type: 'write'; text?: unknown; style?: unknown; diagram?: unknown; labels?: unknown}
  | {type: 'close'};

export const EMPTY_BOARD: BoardState = {open: false, title: '', lines: [], nextId: 1};

/** A board holds this many lines; older ones are wiped off the top, like a real board. */
export const MAX_LINES = 14;
const MAX_TEXT = 140;
const MAX_TITLE = 70;
const MAX_LABELS = 8;

/** Trims what the agent wrote into one tidy chalk line (no markdown, no line breaks). */
export function cleanText(value: unknown, max = MAX_TEXT): string {
  if (typeof value !== 'string') return '';
  const text = value
    .replace(/[*_`#]+/g, '')
    .replace(/\^2(?!\d)/g, '²').replace(/\^3(?!\d)/g, '³')
    .replace(/sqrt\s*\(([^()]{1,12})\)/gi, '√$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}

/** "A, B, C, 3 cm" → ["A", "B", "C", "3 cm"]. Accepts an array too. */
export function parseLabels(value: unknown): string[] {
  const list = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
  return list.map(v => cleanText(typeof v === 'number' ? String(v) : v, 12)).filter(Boolean).slice(0, MAX_LABELS);
}

function pick<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  const v = typeof value === 'string' ? value.trim().toLowerCase().replace(/[\s-]+/g, '_') : '';
  return (allowed as readonly string[]).includes(v) ? v as T : null;
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'open':
      // A new explanation starts on a clean board.
      return {open: true, title: cleanText(action.title, MAX_TITLE) || "Stacksy's board", lines: [], nextId: state.nextId};
    case 'write': {
      const text = cleanText(action.text);
      const diagram = pick(action.diagram, DIAGRAMS);
      if (!text && !diagram) return state;
      const line: BoardLine = {id: state.nextId, text, style: pick(action.style, LINE_STYLES) ?? 'step', diagram, labels: diagram ? parseLabels(action.labels) : []};
      const lines = [...(state.open ? state.lines : []), line].slice(-MAX_LINES);
      return {open: true, title: state.open ? state.title : "Stacksy's board", lines, nextId: state.nextId + 1};
    }
    case 'close':
      return state.open ? {...state, open: false} : state;
  }
}

/** Where a number-line label sits: "-2" → -2, "√2" → 1.414, "2√3", "π", "3/4", "1.5". Not a number → null. */
export function labelValue(label: string): number | null {
  const s = label.replace(/\s+/g, '').replace(/−/g, '-');
  let m = s.match(/^(-?)(\d+(?:\.\d+)?)?√(\d+(?:\.\d+)?)$/);
  if (m) return (m[1] ? -1 : 1) * (m[2] ? Number(m[2]) : 1) * Math.sqrt(Number(m[3]));
  m = s.match(/^(-?)(\d+(?:\.\d+)?)?π$/);
  if (m) return (m[1] ? -1 : 1) * (m[2] ? Number(m[2]) : 1) * Math.PI;
  m = s.match(/^(-?\d+)\/(\d+)$/);
  if (m) return Number(m[2]) === 0 ? null : Number(m[1]) / Number(m[2]);
  return /^-?\d+(?:\.\d+)?$/.test(s) ? Number(s) : null;
}

/** Positions (0 to 1) along a number line for each label; labels that aren't numbers are spaced evenly. */
export function numberLinePositions(labels: string[]): number[] {
  const values = labels.map(labelValue);
  const known = values.filter((v): v is number => v !== null);
  if (known.length < 2 || known.length !== values.length) return labels.map((_, i) => labels.length < 2 ? 0.5 : 0.08 + 0.84 * i / (labels.length - 1));
  const min = Math.min(...known), max = Math.max(...known);
  if (max === min) return labels.map(() => 0.5);
  return values.map(v => 0.08 + 0.84 * ((v as number) - min) / (max - min));
}
