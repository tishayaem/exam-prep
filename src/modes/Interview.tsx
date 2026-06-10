import { Link } from 'react-router-dom';
import { Headline, SectionHeader, renderInline } from '../components/Editorial';
import { interviewGuide, interviewQuestions } from '../data/interview';
import type { GuideBand } from '../data/interview';

/**
 * The Interview hub: a kid-friendly read-through guide to the Brighton College
 * 11+ interview, then a CTA into the practice deck. Content lives in
 * src/data/interview.ts; this component is presentation only.
 */
export function Interview() {
  return (
    <article className="space-y-14 pb-8">
      <Headline
        overline="Brighton College · The interview"
        lead="The"
        accent="interview"
        accentColor="blue"
        subtitle="Two short, friendly chats with teachers in January. You can’t revise them — but you can turn up ready. Here’s how."
      />

      {/* At a glance — the three things that matter most, up front. */}
      <div className="grid gap-3 sm:grid-cols-3">
        <FactChip color="bg-neon-blue" title="Two short chats" body="With teachers, on the January activities day." />
        <FactChip color="bg-neon-green" title="Just be you" body="They want the real you, not learned answers." />
        <FactChip color="bg-neon-yellow" title="Be curious & kind" body="The qualities Brighton looks for most." />
      </div>

      {/* The guide */}
      {interviewGuide.map((band) => (
        <GuideBandView key={band.number} band={band} />
      ))}

      {/* CTA into the practice deck */}
      <section className="bg-ink text-paper rounded-[28px] p-7 sm:p-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-[12px] font-bold text-neon-green uppercase tracking-[0.14em]">
            Ready to practise?
          </div>
          <div className="font-display text-2xl sm:text-[36px] font-bold tracking-[-0.025em] mt-2 leading-tight">
            Try the question cards
          </div>
          <div className="text-[14px] text-[#A8A8B0] mt-2">
            {interviewQuestions.length} real-style questions. Say your answer out
            loud, then flip to see what they’re really looking for.
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/interview/practice"
            viewTransition
            className="bg-neon-green text-ink rounded-full px-6 py-3.5 font-bold text-[15px] hover:opacity-90 transition-opacity"
          >
            Practice questions ›
          </Link>
        </div>
      </section>
    </article>
  );
}

function FactChip({
  color,
  title,
  body,
}: {
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-rule rounded-[22px] p-5">
      <div className={`w-3 h-3 rounded-full ${color} mb-3`} aria-hidden />
      <div className="font-display text-lg font-bold tracking-tight">{title}</div>
      <div className="text-[14px] text-inkSoft mt-1 leading-snug">{body}</div>
    </div>
  );
}

function GuideBandView({ band }: { band: GuideBand }) {
  // The "be yourself" band is the most important idea on the page, so it gets
  // the dark spotlight treatment to stand out from the plain bands.
  if (band.tone === 'spotlight') {
    return (
      <section className="bg-ink text-paper rounded-[28px] p-7 sm:p-10">
        <div className="flex items-baseline gap-3 sm:gap-[18px] mb-5">
          <span className="text-[13px] font-bold text-neon-yellow tabular-nums shrink-0">
            {band.number}
          </span>
          <h2 className="m-0 font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em]">
            {band.title}
          </h2>
        </div>
        <BandBody band={band} dark />
      </section>
    );
  }

  return (
    <section>
      <SectionHeader number={band.number} title={band.title} trailing={band.trailing} />
      <BandBody band={band} />
    </section>
  );
}

function BandBody({ band, dark = false }: { band: GuideBand; dark?: boolean }) {
  return (
    <div className="space-y-4">
      {band.paras?.map((para, i) => (
        <p
          key={i}
          className={`text-[17px] sm:text-[19px] leading-[1.65] max-w-prose ${
            dark ? 'text-[#D8D8DE]' : 'text-ink'
          }`}
        >
          {renderInline(para)}
        </p>
      ))}
      {band.bullets && (
        <ul className="grid gap-3 pt-1">
          {band.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-2 w-2 h-2 rounded-full shrink-0 ${
                  dark ? 'bg-neon-green' : 'bg-neon-blue'
                }`}
              />
              <span
                className={`text-[15px] sm:text-[16px] leading-relaxed ${
                  dark ? 'text-paper' : 'text-ink'
                }`}
              >
                {renderInline(b)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
