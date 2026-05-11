import type { CSSProperties, ReactNode } from 'react';

interface FlipCardProps {
  revealed: boolean;
  front: ReactNode;
  back: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  minHeight?: string;
  /** Tailwind classes applied to each face. Defaults to the `.card` style. */
  frontClassName?: string;
  backClassName?: string;
}

/**
 * 3D flip card. Both faces live in the same CSS-grid cell so the container
 * grows to max(front, back) naturally — no measuring, no layout shift on flip.
 */
export function FlipCard({
  revealed,
  front,
  back,
  onClick,
  ariaLabel,
  minHeight = '18rem',
  frontClassName = 'card',
  backClassName = 'card',
}: FlipCardProps) {
  const containerStyle: CSSProperties = {
    perspective: '1200px',
    minHeight,
  };

  const innerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: '1fr',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    transition:
      'transform var(--motion-duration-structural) var(--ease-emphasis)',
    transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
    minHeight,
  };

  const faceBase: CSSProperties = {
    gridRowStart: 1,
    gridColumnStart: 1,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={revealed}
      className="block w-full text-left active:scale-[0.99] transition-transform"
      style={containerStyle}
    >
      <div style={innerStyle}>
        <div className={frontClassName} style={faceBase} aria-hidden={revealed}>
          {front}
        </div>
        <div
          className={backClassName}
          style={{ ...faceBase, transform: 'rotateY(180deg)' }}
          aria-hidden={!revealed}
        >
          {back}
        </div>
      </div>
    </button>
  );
}
