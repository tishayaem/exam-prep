import { Link } from 'react-router-dom';
import { scienceSections } from '../data/science';
import { useProgress } from '../lib/storage';
import { mistakesQueue } from '../lib/mistakes';

export function Home() {
  const { state } = useProgress();
  const mistakesCount = mistakesQueue(state.attempts).length;

  const plants = scienceSections.filter((s) => s.pack === 'plants');
  const earthSpace = scienceSections.filter(
    (s) => s.pack === 'earth-space-forces',
  );

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl font-bold mb-2">Hey 👋</h1>
        <p className="text-ink/70">
          Pick a topic to study or quiz yourself. Maths and English will appear
          here when their materials are added.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3 px-1">🎯 Quick practice</h2>
        <div className="grid grid-cols-2 gap-3">
          <PracticeTile to="/mock-test" emoji="📝" label="Mock Test" sub="20 Qs · 15 min" />
          <PracticeTile to="/flashcards" emoji="🃏" label="Flashcards" sub="All sections" />
          <PracticeTile to="/vocab-sprint" emoji="⚡" label="Vocab Sprint" sub="45-second drill" />
          <PracticeTile
            to="/mistakes"
            emoji="🎯"
            label="Mistakes"
            sub={mistakesCount === 0 ? 'Empty — nice' : `${mistakesCount} to review`}
            urgent={mistakesCount > 0}
          />
        </div>
      </section>

      <SubjectGroup title="🌱 Plants & Living Things" sections={plants} />
      <SubjectGroup title="🌍 Earth, Space & Forces" sections={earthSpace} />
    </div>
  );
}

function PracticeTile({
  to,
  emoji,
  label,
  sub,
  urgent,
}: {
  to: string;
  emoji: string;
  label: string;
  sub: string;
  urgent?: boolean;
}) {
  return (
    <Link
      to={to}
      viewTransition
      className={`card flex flex-col gap-1 active:scale-[0.98] transition-transform ${
        urgent ? 'ring-2 ring-rose-400 bg-rose-50' : ''
      }`}
    >
      <span aria-hidden className="text-2xl">{emoji}</span>
      <span className="font-bold">{label}</span>
      <span className="text-xs text-ink/60">{sub}</span>
    </Link>
  );
}

function SubjectGroup({
  title,
  sections,
}: {
  title: string;
  sections: typeof scienceSections;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3 px-1">{title}</h2>
      <div className="grid gap-3">
        {sections.map((s) => (
          <div key={s.id} className="card flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-ink/60">Section {s.number}</p>
              <h3 className="font-bold truncate">{s.title}</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link
                to={`/study/${s.id}`}
                viewTransition
                className="tap bg-ink/5 hover:bg-ink/10 text-sm font-bold"
              >
                Study
              </Link>
              <Link
                to={`/quiz/${s.id}`}
                viewTransition
                className="tap bg-accent text-white text-sm font-bold"
              >
                Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
