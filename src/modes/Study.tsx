import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection } from '../data/science';

export function Study() {
  const { sectionId } = useParams();
  const section = sectionId ? findSection(sectionId) : undefined;
  const [deeperOpen, setDeeperOpen] = useState(false);

  if (!section) {
    return <div className="card">Section not found.</div>;
  }

  return (
    <article className="space-y-6">
      <header>
        <p className="text-sm text-ink/60">Section {section.number}</p>
        <h1 className="text-3xl font-bold">{section.title}</h1>
      </header>

      <section className="card space-y-3 leading-relaxed">
        {section.lesson.split('\n\n').map((para, i) => (
          <p key={i}>{renderInline(para)}</p>
        ))}
      </section>

      <section className="card">
        <h2 className="text-lg font-bold mb-3">Words to know</h2>
        <dl className="divide-y divide-ink/5">
          {section.vocabulary.map((v) => (
            <div key={v.term} className="py-3 grid grid-cols-[7rem_1fr] gap-3">
              <dt className="font-bold text-accent">{v.term}</dt>
              <dd className="text-ink/80">{v.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      {section.deeper && (
        <section className="rounded-3xl border-2 border-dashed border-accent/40 bg-amber-50/50 overflow-hidden">
          <button
            type="button"
            onClick={() => setDeeperOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left"
            aria-expanded={deeperOpen}
          >
            <span className="flex items-center gap-2 font-bold text-ink">
              <span aria-hidden>🤔</span>
              Want to know more?
              <span className="text-xs font-normal text-ink/50">
                (not in the test — just cool stuff)
              </span>
            </span>
            <span aria-hidden className="text-accent text-xl">
              {deeperOpen ? '−' : '+'}
            </span>
          </button>
          {deeperOpen && (
            <div className="px-6 pb-6 space-y-3 leading-relaxed">
              {section.deeper.split('\n\n').map((para, i) => (
                <p key={i}>{renderInline(para)}</p>
              ))}
            </div>
          )}
        </section>
      )}

      <Link
        to={`/quiz/${section.id}`}
        className="tap bg-accent text-white font-bold flex items-center justify-center w-full text-lg"
      >
        I'm ready — quiz me →
      </Link>
    </article>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
