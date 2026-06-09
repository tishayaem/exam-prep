import type { NvrFigure as Figure, NvrQuestion } from '../data/types';
import { NvrFigure } from './NvrFigure';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

type Verdict = 'correct' | 'wrong' | null;

/** A non-interactive figure in a plain bordered cell (used in question stems). */
function StemCell({ figure, box = 70 }: { figure: Figure; box?: number }) {
  return (
    <div className="rounded-xl border border-rule bg-paper grid place-items-center p-1">
      <NvrFigure figure={figure} box={box} />
    </div>
  );
}

/**
 * The stem of a Codes question: example figures with their letter codes
 * beneath, then the figure to encode above a "?". Rendered by AnswerArea
 * above ordinary MCQ text choices (the code answers are plain strings).
 */
export function NvrCodeStem({ nvr }: { nvr: NvrQuestion }) {
  const examples = nvr.stem.slice(0, -1);
  const unknown = nvr.stem[nvr.stem.length - 1];
  return (
    <div className="rounded-[22px] border border-rule bg-off p-4 sm:p-6 overflow-x-auto mb-6">
      <div className="flex items-end justify-center gap-3 sm:gap-4 min-w-max">
        {examples.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <StemCell figure={f} />
            <span className="font-display font-bold text-[17px] tracking-wide">
              {nvr.codes?.[i] ?? ''}
            </span>
          </div>
        ))}
        <span className="text-inkSoft text-2xl font-bold px-1 self-center pb-4">→</span>
        <div className="flex flex-col items-center gap-1.5">
          <StemCell figure={unknown} />
          <span className="font-display font-bold text-[17px] text-neon-blue">?</span>
        </div>
      </div>
    </div>
  );
}

/** The dashed "?" cell marking what the child must find. */
function MissingCell({ box = 70 }: { box?: number }) {
  return (
    <div
      className="rounded-xl border-2 border-dashed border-neon-blue grid place-items-center text-neon-blue font-display font-bold text-3xl"
      style={{ width: box + 10, height: box + 10 }}
    >
      ?
    </div>
  );
}

/** The tappable answer figures (A, B, C…). Shared by every kind. */
function Choices({
  figures,
  answerIndex,
  pickedIndex,
  locked,
  verdict,
  onChoose,
}: {
  figures: Figure[];
  answerIndex: number;
  pickedIndex: number | null;
  locked: boolean;
  verdict: Verdict;
  onChoose: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-3">
      {figures.map((f, i) => {
        const isAnswer = i === answerIndex;
        const isPicked = i === pickedIndex;
        let cls = 'bg-paper border-[1.5px] border-rule hover:border-ink';
        if (verdict) {
          if (isAnswer) cls = 'bg-neon-green/15 border-[1.5px] border-neon-green';
          else if (isPicked) cls = 'bg-neon-pink/10 border-[1.5px] border-neon-pink';
          else cls = 'bg-paper border-[1.5px] border-rule opacity-50';
        } else if (isPicked) {
          cls = 'border-[1.5px] border-ink';
        }
        return (
          <button
            key={i}
            type="button"
            disabled={locked}
            onClick={() => onChoose(i)}
            className={`rounded-2xl p-2 flex flex-col items-center gap-1 transition-colors ${cls}`}
          >
            <NvrFigure figure={f} />
            <span className="text-[12px] font-bold text-inkSoft">{LETTERS[i]}</span>
          </button>
        );
      })}
    </div>
  );
}

export function NvrAnswer({
  nvr,
  answerIndex,
  pickedIndex,
  locked,
  verdict,
  onChoose,
}: {
  nvr: NvrQuestion;
  answerIndex: number;
  pickedIndex: number | null;
  locked: boolean;
  verdict: Verdict;
  onChoose: (i: number) => void;
}) {
  const choices = nvr.kind === 'odd-one-out' ? nvr.stem : nvr.options ?? [];
  const choiceBlock = (
    <Choices
      figures={choices}
      answerIndex={answerIndex}
      pickedIndex={pickedIndex}
      locked={locked}
      verdict={verdict}
      onChoose={onChoose}
    />
  );

  if (nvr.kind === 'odd-one-out') {
    return choiceBlock;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[22px] border border-rule bg-off p-4 sm:p-6 overflow-x-auto">
        <Stem nvr={nvr} />
      </div>
      <div>
        <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-inkSoft mb-3">
          Pick the missing shape
        </div>
        {choiceBlock}
      </div>
    </div>
  );
}

/** The non-interactive question stem, laid out per kind. */
function Stem({ nvr }: { nvr: NvrQuestion }) {
  if (nvr.kind === 'series') {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max">
        {nvr.stem.map((f, i) => (
          <StemCell key={i} figure={f} />
        ))}
        <span className="text-inkSoft text-2xl font-bold px-1">→</span>
        <MissingCell />
      </div>
    );
  }

  if (nvr.kind === 'analogy') {
    // stem = [A, B, C]; render  A → B  ::  C → ?
    const [a, b, c] = nvr.stem;
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max">
        <StemCell figure={a} />
        <span className="text-inkSoft text-2xl font-bold">→</span>
        <StemCell figure={b} />
        <span className="text-inkSoft text-3xl font-bold px-1 sm:px-2">::</span>
        <StemCell figure={c} />
        <span className="text-inkSoft text-2xl font-bold">→</span>
        <MissingCell />
      </div>
    );
  }

  // matrix: stem = 8 figures filling a 3×3 grid row-major; bottom-right is the gap
  const cells: Array<Figure | null> = [...nvr.stem.slice(0, 8), null];
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-max mx-auto">
      {cells.map((f, i) =>
        f ? <StemCell key={i} figure={f} box={58} /> : <MissingCell key={i} box={58} />,
      )}
    </div>
  );
}
