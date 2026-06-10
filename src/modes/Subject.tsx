import { Link, useParams } from 'react-router-dom';
import { allSections } from '../data';
import { PACKS, SUBJECTS } from '../data/packs';
import type { Section } from '../data/types';
import { Headline, SectionHeader } from '../components/Editorial';
import { useProgress } from '../lib/storage';
import { getSectionProgress, pickResume } from '../lib/sectionProgress';

/**
 * One subject's full topic list, grouped by pack — the level between Home
 * (subject cards) and Study/Quiz (one topic). Everything derives from the
 * packs registry, so a new pack or subject shows up here for free.
 */
export function Subject() {
  const { subjectId } = useParams();
  const { state } = useProgress();
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const sections = subject
    ? allSections.filter((s) => s.subject === subject.id)
    : [];

  if (!subject || sections.length === 0) {
    return (
      <div className="border border-rule rounded-3xl p-8 text-center">
        Subject not found.
      </div>
    );
  }

  let packNumber = 0;
  const packs = PACKS.filter((p) => p.subject === subject.id)
    .map((pack) => ({
      pack,
      sections: sections.filter((s) => s.pack === pack.slug),
    }))
    .filter((g) => g.sections.length > 0)
    .map((g) => ({ ...g, number: String(++packNumber).padStart(2, '0') }));

  const mastered = sections.filter(
    (s) => getSectionProgress(s, state.attempts).mastered,
  ).length;
  const resume = pickResume(state, sections);
  const resumeStarted =
    resume && getSectionProgress(resume.section, state.attempts).started;

  // Underline the last word; one-word titles get the whole word.
  const words = subject.title.split(' ');
  const accent = words.pop()!;
  const lead = words.join(' ');

  return (
    <div className="space-y-12 pb-8">
      <Headline
        overline={`Subject · ${packs.length} pack${packs.length === 1 ? '' : 's'} · ${sections.length} topics`}
        lead={lead}
        accent={accent}
        accentColor={subject.tone}
        subtitle={
          mastered > 0
            ? `${subject.blurb} You've mastered ${mastered} of ${sections.length} topics so far.`
            : subject.blurb
        }
      >
        {resume && (
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to={`/quiz/${resume.section.id}`}
              viewTransition
              className="bg-ink text-paper border-0 px-6 py-4 font-semibold text-base rounded-full active:scale-[0.98] transition-transform hover:bg-neon-pink"
            >
              {resumeStarted ? 'Continue' : 'Start'} — {resume.section.title} ›
            </Link>
            <span className="text-sm text-inkSoft">{resume.meta}</span>
          </div>
        )}
      </Headline>

      {packs.map((g) => (
        <section key={g.pack.slug}>
          <SectionHeader
            number={g.number}
            title={g.pack.title}
            trailing={`${g.sections.length} topic${g.sections.length === 1 ? '' : 's'}`}
          />
          <div className="flex flex-col">
            {g.sections.map((s, i) => (
              <TopicRow
                key={s.id}
                section={s}
                last={i === g.sections.length - 1}
              />
            ))}
          </div>
        </section>
      ))}
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
      } grid-cols-[36px_1fr_auto_auto] sm:grid-cols-[64px_1fr_160px_auto_auto]`}
    >
      <div
        className={`font-display text-2xl sm:text-[32px] font-bold tabular-nums tracking-[-0.04em] ${numColor} group-hover:text-neon-pink transition-colors`}
      >
        {String(section.number).padStart(2, '0')}
      </div>

      <div className="min-w-0">
        <div className="text-base sm:text-[19px] font-semibold tracking-[-0.012em]">
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
