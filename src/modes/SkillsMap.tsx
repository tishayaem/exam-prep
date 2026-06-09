import { Link } from 'react-router-dom';
import { allSections } from '../data';
import { useProgress } from '../lib/storage';
import { Headline, SectionHeader } from '../components/Editorial';
import {
  allSubjectsMastery,
  weakestTopics,
  type MasteryBand,
  type TopicMastery,
} from '../lib/mastery';

const BAND: Record<MasteryBand, { label: string; chip: string; bar: string; dot: string }> = {
  unseen: { label: 'Not started', chip: 'bg-off text-inkSoft', bar: 'bg-rule', dot: 'bg-rule' },
  weak: { label: 'Needs work', chip: 'bg-neon-pink text-paper', bar: 'bg-neon-pink', dot: 'bg-neon-pink' },
  developing: { label: 'Getting there', chip: 'bg-neon-yellow text-ink', bar: 'bg-neon-yellow', dot: 'bg-neon-yellow' },
  strong: { label: 'Strong', chip: 'bg-neon-green text-ink', bar: 'bg-neon-green', dot: 'bg-neon-green' },
};

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function SkillsMap() {
  const { state } = useProgress();
  const now = Date.now();
  const subjects = allSubjectsMastery(allSections, state, now);
  const started = state.attempts.length > 0;
  const focus = weakestTopics(allSections, state, now, {
    includeUnseen: false,
    limit: 4,
  }).filter((t) => t.band !== 'strong');

  if (!started) {
    return (
      <div className="space-y-8">
        <Headline
          overline="Progress"
          lead="Your skills"
          accent="map"
          accentColor="blue"
          subtitle="Answer a few questions and your strong topics and weak spots show up here — colour-coded, with a one-tap way to drill the gaps."
        />
        <div className="border border-rule rounded-[28px] p-8 sm:p-10 text-center space-y-5">
          <p className="text-inkSoft max-w-md mx-auto">
            Nothing to map yet. Take a quick mock test or a quiz and this fills in.
          </p>
          <Link
            to="/mock-test"
            viewTransition
            className="inline-block bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
          >
            Start a mock test ›
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Headline
        overline="Progress"
        lead="Your skills"
        accent="map"
        accentColor="blue"
        subtitle="Green is solid, yellow is getting there, pink needs work. Tap any topic to drill it."
      />

      <section>
        <SectionHeader
          number="01"
          title="Focus next"
          trailing={
            <Link to="/smart-practice" viewTransition className="hover:text-ink">
              Smart practice ›
            </Link>
          }
        />
        {focus.length === 0 ? (
          <div className="border border-rule rounded-[22px] p-6 text-inkSoft">
            No weak spots flagged right now — nice work. Keep things fresh with{' '}
            <Link to="/smart-practice" viewTransition className="text-ink font-semibold underline">
              Smart Practice
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2">
            {focus.map((t) => (
              <FocusCard key={t.section.id} topic={t} />
            ))}
          </div>
        )}
      </section>

      {subjects.map((subj, i) => (
        <section key={subj.subject}>
          <SectionHeader
            number={String(i + 2).padStart(2, '0')}
            title={subj.title}
            trailing={
              subj.started ? `${pct(subj.accuracy)} · ${pct(subj.coverage)} seen` : 'Not started'
            }
          />
          <div className="flex flex-col gap-7">
            {subj.packs.map((p) => (
              <div key={p.slug}>
                <div className="text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em] mb-1.5">
                  {p.title}
                </div>
                <div className="flex flex-col">
                  {p.topics.map((t) => (
                    <SkillRow key={t.section.id} topic={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FocusCard({ topic }: { topic: TopicMastery }) {
  const b = BAND[topic.band];
  return (
    <Link
      to={`/quiz/${topic.section.id}`}
      viewTransition
      className="border border-rule rounded-[22px] p-5 hover:-translate-y-0.5 transition-transform group block"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${b.chip}`}
        >
          {b.label}
        </span>
        <span className="text-[13px] text-inkSoft tabular-nums">{pct(topic.accuracy)}</span>
      </div>
      <div className="font-display text-xl font-bold tracking-[-0.02em] mt-3 leading-snug group-hover:text-neon-pink transition-colors">
        {topic.section.title}
      </div>
      <div className="mt-3 h-1.5 bg-off rounded-full overflow-hidden">
        <div
          className={`h-full ${b.bar} rounded-full progress-fill`}
          style={{ width: pct(topic.accuracy) }}
        />
      </div>
      <div className="text-[13px] font-semibold text-inkSoft mt-3 group-hover:text-ink transition-colors">
        Practise ›
      </div>
    </Link>
  );
}

function SkillRow({ topic }: { topic: TopicMastery }) {
  const b = BAND[topic.band];
  const started = topic.attempts > 0;
  return (
    <div className="grid items-center gap-3 sm:gap-5 py-3.5 border-b border-rule last:border-b-0 grid-cols-[1fr_auto] sm:grid-cols-[1fr_150px_120px_auto]">
      <div className="min-w-0">
        <div className="text-[15px] sm:text-[17px] font-semibold truncate">
          {topic.section.title}
        </div>
        <div className="text-[12px] text-inkSoft mt-1 flex items-center gap-2">
          <span className={`block w-1.5 h-1.5 rounded-full ${b.dot}`} />
          {started ? `${b.label} · ${topic.seen}/${topic.total} seen` : 'Not started'}
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="h-1.5 bg-off rounded-full overflow-hidden">
          <div
            className={`h-full ${b.bar} rounded-full progress-fill`}
            style={{ width: started ? pct(topic.accuracy) : '0%' }}
          />
        </div>
      </div>

      <span
        className={`hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-1 rounded-full text-center ${b.chip}`}
      >
        {b.label}
      </span>

      <Link
        to={`/quiz/${topic.section.id}`}
        viewTransition
        className="justify-self-end inline-flex items-center bg-ink text-paper px-4 py-2 rounded-full font-semibold text-[13px] hover:bg-neon-pink transition-colors"
      >
        {started ? 'Practise' : 'Start'}
      </Link>
    </div>
  );
}
