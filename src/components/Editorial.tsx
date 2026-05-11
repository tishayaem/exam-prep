import type { ReactNode } from 'react';

/**
 * Inline markdown helper used by lesson copy and feedback panels:
 * `**text**` becomes a yellow-highlighted strong span. Built by splitting +
 * mapping to `<strong>` so we never inject raw HTML.
 */
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong
        key={i}
        className="bg-neon-yellow px-1 font-semibold text-ink"
      >
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

interface HeadlineProps {
  /** Small uppercase tracking-wide pre-title in pink. */
  overline?: string;
  /** The big title (left of `accent` if provided). */
  lead: string;
  /**
   * Optional last word/phrase that gets a skewed coloured underline. The
   * underline colour cycles by intent: blue=Study, pink=Mistakes, green=done.
   */
  accent?: string;
  accentColor?: 'yellow' | 'blue' | 'pink' | 'green';
  /** Optional subtitle in inkSoft. */
  subtitle?: ReactNode;
  /** Optional follow-up content (CTAs, meta) under the subtitle. */
  children?: ReactNode;
  /** Tames the title size for inner pages — Home keeps its own oversized hero. */
  size?: 'inner' | 'huge';
}

const ACCENT_BG: Record<NonNullable<HeadlineProps['accentColor']>, string> = {
  yellow: 'bg-neon-yellow',
  blue: 'bg-neon-blue',
  pink: 'bg-neon-pink',
  green: 'bg-neon-green',
};

/**
 * Inner-page hero: overline + oversized title with a skewed coloured underline
 * on the accent word. Home has its own hero (with the geometric shapes panel)
 * so it doesn't use this — kept that way to avoid coupling the two.
 */
export function Headline({
  overline,
  lead,
  accent,
  accentColor = 'yellow',
  subtitle,
  children,
  size = 'inner',
}: HeadlineProps) {
  const titleSize =
    size === 'huge'
      ? 'text-[clamp(2.5rem,8vw,5.5rem)]'
      : 'text-[clamp(2.25rem,6.4vw,4.75rem)]';

  return (
    <header>
      {overline && (
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
          {overline}
        </div>
      )}
      <h1
        className={`font-display font-bold leading-[0.95] tracking-[-0.04em] m-0 ${titleSize}`}
      >
        {lead}
        {accent && (
          <>
            {' '}
            <span className="relative inline-block">
              {accent}
              <span
                aria-hidden
                className={`absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] ${ACCENT_BG[accentColor]} -z-10 -skew-x-6`}
              />
            </span>
          </>
        )}
      </h1>
      {subtitle && (
        <div className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
          {subtitle}
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}

interface SectionHeaderProps {
  number?: string;
  title: string;
  trailing?: ReactNode;
}

/**
 * "01 · The idea" with a hairline rule below — used to mark each band on a
 * page (lesson, vocab, etc.).
 */
export function SectionHeader({ number, title, trailing }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between pb-3.5 border-b border-rule mb-5">
      <div className="flex items-baseline gap-3 sm:gap-[18px] min-w-0">
        {number && (
          <span className="text-[13px] font-bold text-inkSoft tabular-nums shrink-0">
            {number}
          </span>
        )}
        <h2 className="m-0 font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em] truncate">
          {title}
        </h2>
      </div>
      {trailing && (
        <span className="hidden sm:inline text-xs text-inkSoft font-medium uppercase tracking-[0.08em] shrink-0">
          {trailing}
        </span>
      )}
    </div>
  );
}
