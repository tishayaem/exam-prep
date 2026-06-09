import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { allSections } from '../data';
import { PACKS, SUBJECTS } from '../data/packs';
import type { Section } from '../data/types';
import { useProgress } from '../lib/storage';
import { mistakesQueue } from '../lib/mistakes';
import { weakestTopics } from '../lib/mastery';
import { burstFromEvent } from '../lib/confetti';
import { getSectionProgress, pickResume } from '../lib/sectionProgress';

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

export function Home() {
  const { state } = useProgress();
  const mistakesCount = mistakesQueue(state.attempts).length;
  const focus = weakestTopics(state.attempts.length ? allSections : [], state, Date.now(), {
    includeUnseen: false,
    limit: 3,
  })
    .filter((t) => t.band !== 'strong')
    .map((t) => t.section.title);

  const resume = pickResume(state, allSections);
  const today = DAY_NAMES[new Date().getDay()];

  // Build subject → packs from the registry. Packs are numbered sequentially
  // after the Practice section (01); empty packs (a subject not authored yet)
  // are skipped so they simply don't appear.
  let packNumber = 1;
  const groups = SUBJECTS.map((subject) => {
    const packs = PACKS.filter((p) => p.subject === subject.id)
      .map((pack) => ({
        pack,
        sections: allSections.filter((s) => s.pack === pack.slug),
      }))
      .filter((g) => g.sections.length > 0)
      .map((g) => ({ ...g, number: String(++packNumber).padStart(2, '0') }));
    return { subject, packs };
  }).filter((g) => g.packs.length > 0);

  return (
    <div className="space-y-14">
      <Hero today={today} resume={resume} />

      <Practice mistakesCount={mistakesCount} focus={focus} />

      {groups.flatMap((group) => [
        <SubjectDivider key={`subject-${group.subject.id}`} title={group.subject.title} />,
        ...group.packs.map((g) => (
          <Pack
            key={g.pack.slug}
            number={g.number}
            title={g.pack.title}
            trailing={`${g.sections.length} topic${g.sections.length === 1 ? '' : 's'}`}
            sections={g.sections}
          />
        )),
      ])}
    </div>
  );
}

// ─── SubjectDivider ─────────────────────────────────────────────────────────

function SubjectDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <span className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-neon-pink shrink-0">
        {title}
      </span>
      <span className="flex-1 h-px bg-rule" />
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({
  today,
  resume,
}: {
  today: string;
  resume: ReturnType<typeof pickResume>;
}) {
  const { state, setChildName } = useProgress();
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const isFirstTime = !state.childName;
  const displayName = state.childName ?? 'friend';

  // Auto-open the modal on first visit so the kid sets a name immediately.
  useEffect(() => {
    if (isFirstTime) setNameModalOpen(true);
  }, [isFirstTime]);

  return (
    <section className="relative grid items-end gap-8 md:gap-10 md:grid-cols-[1.4fr_1fr] mb-4">
      <div>
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.18em] mb-3.5">
          Today · {today}
        </div>
        <h1 className="font-display font-bold leading-[0.92] tracking-[-0.045em] m-0 text-[clamp(2.5rem,8vw,5.5rem)]">
          Pick up where
          <br />
          you left off,{' '}
          <button
            type="button"
            onClick={() => setNameModalOpen(true)}
            aria-label={`Change name (currently ${displayName})`}
            className="relative inline-block bg-transparent border-0 p-0 cursor-pointer font-display font-bold leading-[0.92] tracking-[-0.045em] text-[clamp(2.5rem,8vw,5.5rem)] hover:opacity-80 transition-opacity"
          >
            {displayName}.
            <span
              aria-hidden
              className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[20%] bg-neon-yellow -z-10 -skew-x-6"
            />
          </button>
        </h1>

        <div className="flex flex-wrap items-center gap-5 mt-7">
          {resume ? (
            <Link
              to={`/quiz/${resume.section.id}`}
              viewTransition
              className="bg-ink text-paper border-0 px-6 py-4 font-semibold text-base rounded-full active:scale-[0.98] transition-transform hover:bg-neon-pink"
            >
              Resume — {resume.section.title} ›
            </Link>
          ) : (
            <Link
              to="/mock-test"
              viewTransition
              className="bg-ink text-paper border-0 px-6 py-4 font-semibold text-base rounded-full active:scale-[0.98] transition-transform hover:bg-neon-pink"
            >
              Start a mock test ›
            </Link>
          )}
          {resume && (
            <span className="text-sm text-inkSoft">{resume.meta}</span>
          )}
        </div>
      </div>

      {/* Geometric punctuation — pure shapes that anchor the four-colour palette
          without an illustration. Tucked behind the hero on small screens. */}
      <HeroShapes />

      <NameModal
        open={nameModalOpen}
        defaultValue={state.childName ?? ''}
        isFirstTime={isFirstTime}
        onSave={(name) => {
          setChildName(name);
          setNameModalOpen(false);
        }}
        onCancel={() => {
          // First-timers can't cancel — they have to enter a name to proceed.
          if (!isFirstTime) setNameModalOpen(false);
        }}
      />
    </section>
  );
}

function NameModal({
  open,
  defaultValue,
  isFirstTime,
  onSave,
  onCancel,
}: {
  open: boolean;
  defaultValue: string;
  isFirstTime: boolean;
  onSave: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue(defaultValue);
      const id = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(id);
    }
  }, [open, defaultValue]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFirstTime) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, isFirstTime, onCancel]);

  if (!open) return null;

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSave(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-6"
      onClick={isFirstTime ? undefined : onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="name-modal-title"
    >
      <form
        className="bg-paper rounded-[28px] p-7 sm:p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h2
          id="name-modal-title"
          className="font-display text-3xl sm:text-4xl font-bold mb-2 tracking-tight"
        >
          {isFirstTime ? 'Hi there!' : 'Change your name'}
        </h2>
        <p className="text-base text-inkSoft mb-5">
          {isFirstTime
            ? 'What should we call you?'
            : 'Type a new name and we’ll save it.'}
        </p>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={20}
          autoComplete="given-name"
          placeholder="Your name"
          className="w-full bg-off border-2 border-rule rounded-2xl px-4 py-3 text-2xl font-display font-bold mb-6 focus:outline-none focus:border-neon-pink"
        />
        <div className="flex justify-end gap-3">
          {!isFirstTime && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 rounded-full text-inkSoft font-semibold border border-rule hover:bg-off transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!value.trim()}
            className="px-6 py-3 rounded-full bg-ink text-paper font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neon-pink transition-colors"
          >
            {isFirstTime ? "Let's go ›" : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

function HeroShapes() {
  return (
    <div
      aria-hidden
      className="relative h-[180px] md:h-[280px] hidden sm:block pointer-events-none"
    >
      <div className="absolute right-5 top-0 w-[120px] h-[120px] rounded-full bg-neon-pink" />
      <div className="absolute right-[140px] top-[70px] w-20 h-40 rounded-full bg-neon-blue" />
      <div className="absolute right-0 bottom-0 w-[120px] h-[120px] bg-neon-green" />
      <div className="absolute right-20 bottom-[60px] w-[60px] h-[60px] bg-neon-yellow rotate-45" />
      <div className="absolute right-[240px] top-5 w-[50px] h-[50px] bg-ink rounded-full" />
    </div>
  );
}

// ─── Practice ───────────────────────────────────────────────────────────────

function Practice({
  mistakesCount,
  focus,
}: {
  mistakesCount: number;
  focus: string[];
}) {
  return (
    <section>
      <SectionHeader
        number="01"
        title="Practice"
        trailing={
          <Link to="/skills" viewTransition className="hover:text-ink transition-colors">
            Your skills map ›
          </Link>
        }
      />
      <SmartPracticeBanner focus={focus} />
      <div className="grid gap-4 sm:gap-[18px] grid-cols-2 lg:grid-cols-5 [&>*]:min-w-0">
        <PracticeCard
          to="/mock-test"
          big="Mock"
          accent="Test"
          meta="20 questions · 15 min"
          desc="Random questions from every topic. Like the real thing."
          bg="bg-ink"
          fg="text-paper"
          chipClass="text-neon-green"
          chipBgClass="bg-neon-green"
        />
        <PracticeCard
          to="/flashcards"
          big="Flash"
          accent="cards"
          meta="Smart shuffle"
          desc="Tap to flip. Hard ones come back."
          bg="bg-neon-green"
          fg="text-ink"
          chipClass="text-ink"
          chipBgClass="bg-ink"
        />
        <PracticeCard
          to="/vocab-sprint"
          big="Vocab"
          accent="Sprint"
          meta="45 second drill"
          desc="How many words before the buzzer?"
          bg="bg-neon-yellow"
          fg="text-ink"
          chipClass="text-neon-pink"
          chipBgClass="bg-neon-pink"
        />
        <PracticeCard
          to="/number-sprint"
          big="Number"
          accent="Sprint"
          meta="60 second drill"
          desc="How many sums before the buzzer?"
          bg="bg-neon-blue"
          fg="text-ink"
          chipClass="text-paper"
          chipBgClass="bg-paper"
          // "Number" is wider than the default clamp allows at tile widths
          // and would break mid-word ("Numbe-r").
          bigClass="text-[clamp(1.5rem,2.7vw,2.4rem)]"
        />
        <PracticeCard
          to="/mistakes"
          big="Fix"
          accent="ups"
          meta={
            mistakesCount === 0
              ? 'Empty — nice'
              : `${mistakesCount} waiting · do first`
          }
          desc="The ones you got wrong. Beat each one twice in a row and it's gone."
          bg="bg-neon-pink"
          fg="text-paper"
          chipClass="text-neon-yellow"
          chipBgClass="bg-neon-yellow"
          badge={mistakesCount > 0 ? String(mistakesCount) : undefined}
          // Five tiles in a 2-col phone grid would orphan the last one at
          // half width; spanning the row keeps the "do first" tile loudest.
          className="max-lg:col-span-2"
        />
      </div>
    </section>
  );
}

function SmartPracticeBanner({ focus }: { focus: string[] }) {
  return (
    <Link
      to="/smart-practice"
      viewTransition
      onClick={(e: MouseEvent<HTMLAnchorElement>) => burstFromEvent(e)}
      className="block relative overflow-hidden rounded-[28px] border-[1.5px] border-ink p-6 sm:p-8 mb-4 sm:mb-[18px] hover:-translate-y-0.5 transition-transform group"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-[11px] font-bold text-neon-pink uppercase tracking-[0.14em]">
            Adaptive · Aimed at your gaps
          </div>
          <div className="font-display font-bold tracking-[-0.03em] leading-[0.98] mt-1.5 text-[clamp(1.75rem,4vw,2.75rem)]">
            Smart{' '}
            <span className="relative inline-block">
              Practice
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-[6%] h-[16%] bg-neon-green -z-10 -skew-x-6"
              />
            </span>
          </div>
          <div className="text-[14px] text-inkSoft mt-2.5 max-w-lg leading-snug">
            {focus.length ? (
              <>
                Right now it’d focus on{' '}
                <span className="text-ink font-semibold">{focus.join(', ')}</span>.
              </>
            ) : (
              'Answer a few questions and this targets the topics you find hardest.'
            )}
          </div>
        </div>
        <div className="bg-ink text-paper rounded-full px-6 py-3.5 font-bold text-[15px] shrink-0 justify-self-start sm:justify-self-end group-hover:bg-neon-pink transition-colors">
          Start ›
        </div>
      </div>
    </Link>
  );
}

function PracticeCard({
  to,
  big,
  accent,
  meta,
  desc,
  bg,
  fg,
  chipClass,
  chipBgClass,
  badge,
  className = '',
  bigClass = 'text-[clamp(1.75rem,3.4vw,3rem)]',
}: {
  to: string;
  big: string;
  accent: string;
  meta: string;
  desc: string;
  bg: string;
  fg: string;
  chipClass: string;
  chipBgClass: string;
  badge?: string;
  className?: string;
  /** Big-word size override for words too wide for the default clamp. */
  bigClass?: string;
}) {
  return (
    <Link
      to={to}
      viewTransition
      onClick={(e: MouseEvent<HTMLAnchorElement>) => burstFromEvent(e)}
      className={`relative ${bg} ${fg} border-0 rounded-[28px] p-6 text-left cursor-pointer flex flex-col justify-between min-h-[200px] sm:min-h-[240px] hover:-translate-y-1 transition-transform overflow-hidden ${className}`}
    >
      <div className="text-[11px] font-semibold opacity-70 uppercase tracking-[0.12em] pr-10">
        {meta}
      </div>
      <div>
        <div
          className={`font-display font-bold leading-[0.95] tracking-[-0.035em] ${bigClass} [overflow-wrap:anywhere]`}
        >
          {big}{' '}
          <span className={chipClass}>{accent}</span>
        </div>
        <div className="text-[13px] mt-2.5 opacity-80 leading-snug">{desc}</div>
      </div>
      {badge && (
        <div
          className={`absolute top-5 right-5 ${chipBgClass} ${bg.replace('bg-', 'text-')} w-9 h-9 rounded-full font-bold text-[15px] grid place-items-center`}
        >
          {badge}
        </div>
      )}
      <div className="absolute bottom-5 right-[22px] text-[22px] font-bold">
        ›
      </div>
    </Link>
  );
}

// ─── Pack (a group of TopicRows) ────────────────────────────────────────────

function Pack({
  number,
  title,
  trailing,
  sections,
}: {
  number: string;
  title: string;
  trailing: string;
  sections: Section[];
}) {
  return (
    <section>
      <SectionHeader number={number} title={title} trailing={trailing} />
      <div className="flex flex-col">
        {sections.map((s, i) => (
          <TopicRow key={s.id} section={s} last={i === sections.length - 1} />
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  trailing,
}: {
  number: string;
  title: string;
  trailing: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between pb-4 border-b border-rule mb-5">
      <div className="flex items-baseline gap-4 sm:gap-[18px] min-w-0">
        <span className="text-sm font-bold text-inkSoft tabular-nums">
          {number}
        </span>
        <h2 className="m-0 font-display text-2xl sm:text-[36px] font-bold tracking-[-0.025em] truncate">
          {title}
        </h2>
      </div>
      <span className="hidden sm:inline text-xs text-inkSoft font-medium uppercase tracking-[0.08em] shrink-0">
        {trailing}
      </span>
    </div>
  );
}

function TopicRow({ section, last }: { section: Section; last: boolean }) {
  const { state } = useProgress();
  const p = getSectionProgress(section, state.attempts);
  const stateClass = p.mastered
    ? 'bg-neon-green'
    : p.started
      ? 'bg-neon-blue'
      : 'bg-rule';
  const numColor = p.started ? 'text-ink' : 'text-inkSoft';
  const fillClass = p.mastered
    ? 'bg-neon-green'
    : p.started
      ? 'bg-neon-blue'
      : 'bg-transparent';
  const ctaLabel = p.mastered ? 'Review' : p.started ? 'Continue' : 'Start';

  return (
    <div
      className={`grid items-center gap-2 sm:gap-6 py-4 sm:py-5 px-2 group hover:bg-off transition-colors ${
        last ? '' : 'border-b border-rule'
      } grid-cols-[36px_1fr_auto_auto] sm:grid-cols-[64px_1fr_220px_auto_auto]`}
    >
      <div
        className={`font-display text-2xl sm:text-[32px] font-bold tabular-nums tracking-[-0.04em] ${numColor} group-hover:text-neon-pink transition-colors`}
      >
        {String(section.number).padStart(2, '0')}
      </div>

      <div className="min-w-0">
        <div className="text-base sm:text-[19px] font-semibold tracking-[-0.012em] truncate">
          {section.title}
        </div>
        <div className="text-[13px] text-inkSoft mt-1 flex items-center gap-2">
          <span className={`block w-1.5 h-1.5 rounded-full ${stateClass}`} />
          {p.mastered
            ? 'Mastered'
            : p.started
              ? `${p.correct}/${p.total} answered`
              : 'Not started'}
        </div>
      </div>

      {/* progress bar — desktop only */}
      <div className="hidden sm:block">
        <div className="h-1.5 bg-off rounded-full overflow-hidden">
          <div
            className={`h-full ${fillClass} rounded-full progress-fill`}
            style={{ width: `${p.pct}%` }}
          />
        </div>
      </div>

      <Link
        to={`/study/${section.id}`}
        viewTransition
        className="inline-flex items-center bg-transparent border border-ink text-ink px-3 sm:px-4 py-2 rounded-full font-semibold text-[13px] hover:bg-ink hover:text-paper transition-colors"
      >
        Study
      </Link>
      <Link
        to={`/quiz/${section.id}`}
        viewTransition
        className="inline-flex items-center bg-ink text-paper border border-ink px-3 sm:px-4 py-2 rounded-full font-semibold text-[13px] hover:bg-neon-pink hover:border-neon-pink transition-colors"
      >
        {ctaLabel} ›
      </Link>
    </div>
  );
}
