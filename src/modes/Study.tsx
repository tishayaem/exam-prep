import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection } from '../data/science';
import { Headline, SectionHeader, renderInline } from '../components/Editorial';

const VOCAB_TAGS = ['green', 'pink', 'yellow', 'blue'] as const;

const TAG_BG: Record<(typeof VOCAB_TAGS)[number], string> = {
  green: 'bg-neon-green text-ink',
  pink: 'bg-neon-pink text-paper',
  yellow: 'bg-neon-yellow text-ink',
  blue: 'bg-neon-blue text-paper',
};

export function Study() {
  const { sectionId } = useParams();
  const section = sectionId ? findSection(sectionId) : undefined;
  const [deeperOpen, setDeeperOpen] = useState(false);

  if (!section) {
    return (
      <div className="border border-rule rounded-3xl p-8 text-center">
        Section not found.
      </div>
    );
  }

  const sectionNum = String(section.number).padStart(2, '0');
  const hasExamples = !!section.examples && section.examples.length > 0;
  const vocabNum = hasExamples ? '03' : '02';
  const ctaStepLabel = hasExamples ? 'Step 04' : 'Step 03';
  const Diagram = section.diagram;

  return (
    <article className="space-y-14 pb-8">
      {/* Hero */}
      <Headline
        overline={`Section ${sectionNum} · ${section.pack === 'plants' ? 'Plants & Living Things' : 'Earth, Space & Forces'}`}
        lead={titleLead(section.title)}
        accent={titleAccent(section.title)}
        accentColor="blue"
        subtitle="Read the lesson, learn the words, then test yourself. Come back any time."
      />

      {/* Lesson */}
      <section>
        <SectionHeader number="01" title="The idea" trailing="Read this first" />
        <div className="text-[17px] sm:text-[19px] leading-[1.65] text-ink space-y-4 max-w-prose">
          {section.lesson.split('\n\n').map((para, i) => (
            <p key={i}>{renderInline(para)}</p>
          ))}
        </div>
      </section>

      {/* Diagram — optional visual anchor between lesson and examples */}
      {Diagram && (
        <section>
          <div className="rounded-[22px] border border-rule bg-off p-4 sm:p-8 flex justify-center overflow-hidden">
            <Diagram />
          </div>
        </section>
      )}

      {/* Examples — concrete real-world hooks, optional */}
      {hasExamples && (
        <section>
          <SectionHeader
            number="02"
            title="In the world"
            trailing={`${section.examples!.length} example${section.examples!.length === 1 ? '' : 's'}`}
          />
          <div className="grid gap-4">
            {section.examples!.map((ex, i) => {
              const tag = VOCAB_TAGS[i % VOCAB_TAGS.length];
              return (
                <div
                  key={i}
                  className="border border-rule rounded-[22px] p-5 sm:p-6"
                >
                  <div
                    className={`${TAG_BG[tag]} text-[13px] font-bold px-3 py-1.5 rounded-full inline-block mb-3`}
                  >
                    {ex.title}
                  </div>
                  <div className="text-[15px] sm:text-[16px] leading-relaxed text-ink space-y-3">
                    {ex.body.split('\n\n').map((para, j) => (
                      <p key={j}>{renderInline(para)}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Vocab */}
      <section>
        <SectionHeader
          number={vocabNum}
          title="Words to know"
          trailing={`${section.vocabulary.length} terms`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {section.vocabulary.map((v, i) => {
            const tag = VOCAB_TAGS[i % VOCAB_TAGS.length];
            return (
              <div
                key={v.term}
                className="border border-rule rounded-[22px] p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start"
              >
                <div
                  className={`${TAG_BG[tag]} text-[13px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0`}
                >
                  {v.term}
                </div>
                <div className="text-[15px] text-ink leading-relaxed">
                  {v.meaning}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Optional "Want to know more?" — kept from existing app, restyled */}
      {section.deeper && (
        <section className="border-2 border-dashed border-neon-blue rounded-3xl overflow-hidden">
          <button
            type="button"
            onClick={() => setDeeperOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-6 py-5 text-left"
            aria-expanded={deeperOpen}
          >
            <span className="flex items-baseline gap-3">
              <span className="text-[11px] font-bold text-neon-blue uppercase tracking-[0.16em]">
                Bonus
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Want to know more?
              </span>
              <span className="text-xs font-medium text-inkSoft hidden sm:inline">
                (not in the test — just cool stuff)
              </span>
            </span>
            <span
              aria-hidden
              className="text-neon-blue text-2xl inline-block leading-none shrink-0"
              style={{
                transition:
                  'transform var(--motion-duration-normal) var(--ease-emphasis)',
                transform: deeperOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              +
            </span>
          </button>
          <div className="collapse" data-open={deeperOpen}>
            <div className="collapse-inner">
              <div className="px-6 pb-6 space-y-3 text-[16px] leading-relaxed">
                {section.deeper.split('\n\n').map((para, i) => (
                  <p key={i}>{renderInline(para)}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA bar */}
      <section className="bg-ink text-paper rounded-[28px] p-7 sm:p-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-[12px] font-bold text-neon-green uppercase tracking-[0.14em]">
            {ctaStepLabel}
          </div>
          <div className="font-display text-2xl sm:text-[36px] font-bold tracking-[-0.025em] mt-2 leading-tight">
            Reckon you've got it?
          </div>
          <div className="text-[14px] text-[#A8A8B0] mt-2">
            Test yourself with {section.questions.length} quick question
            {section.questions.length === 1 ? '' : 's'}.
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/flashcards/${section.id}`}
            viewTransition
            className="bg-transparent text-paper border-[1.5px] border-white/30 rounded-full px-5 py-3.5 font-semibold text-[15px] hover:bg-white/10 transition-colors"
          >
            Flashcards first
          </Link>
          <Link
            to={`/quiz/${section.id}`}
            viewTransition
            className="bg-neon-green text-ink rounded-full px-6 py-3.5 font-bold text-[15px] hover:opacity-90 transition-opacity"
          >
            Quiz me ›
          </Link>
        </div>
      </section>
    </article>
  );
}

/**
 * Splits the section title into "lead" + "accent" so the last word gets the
 * skewed underline. Keeps short titles (≤2 words) entirely on the accent side
 * so they always get the highlight; longer titles split off the last word.
 */
function titleLead(title: string): string {
  const parts = title.split(' ');
  if (parts.length <= 2) return '';
  return parts.slice(0, -1).join(' ');
}

function titleAccent(title: string): string {
  const parts = title.split(' ');
  if (parts.length <= 2) return title;
  return parts[parts.length - 1];
}
