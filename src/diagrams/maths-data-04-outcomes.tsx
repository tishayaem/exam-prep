const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const CELL = 40;
const GRID_X = 110;
const GRID_Y = 40;

export function MathsOutcomesDiagram() {
  return (
    <svg
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A sample space diagram for two dice: a 6 by 6 grid showing all 36 total scores, with the six doubles circled along the diagonal. P(a double) = 6 out of 36 = 1/6."
      className="w-full h-auto max-w-[480px]"
    >
      <title>Sample space diagram for two dice (doubles circled)</title>

      {/* Grid cells with sums; row r (bottom = die2 of 1), col c (die1) */}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => {
          const die1 = c + 1;
          const die2 = 6 - r; // top row is die2 = 6
          const cx = GRID_X + c * CELL + CELL / 2;
          const cy = GRID_Y + r * CELL + CELL / 2;
          const isDouble = die1 === die2;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={GRID_X + c * CELL}
                y={GRID_Y + r * CELL}
                width={CELL}
                height={CELL}
                fill={isDouble ? '#fde6f4' : 'white'}
                stroke={INK}
                strokeWidth="1.5"
              />
              {isDouble && (
                <circle cx={cx} cy={cy} r="15" fill="none" stroke={PINK} strokeWidth="2.5" />
              )}
              <text x={cx} y={cy + 5} fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">
                {die1 + die2}
              </text>
            </g>
          );
        }),
      )}

      {/* Axis numbers */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={`ax-${i}`}>
          <text
            x={GRID_X + i * CELL + CELL / 2}
            y={GRID_Y + 6 * CELL + 22}
            fontSize="14"
            fontWeight="700"
            fontFamily={LABEL_FONT}
            fill={BLUE}
            textAnchor="middle"
          >
            {i + 1}
          </text>
          <text
            x={GRID_X - 16}
            y={GRID_Y + (5 - i) * CELL + CELL / 2 + 5}
            fontSize="14"
            fontWeight="700"
            fontFamily={LABEL_FONT}
            fill={BLUE}
            textAnchor="middle"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Axis titles */}
      <text x={GRID_X + 3 * CELL} y={GRID_Y + 6 * CELL + 44} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.04em">
        1st die
      </text>
      <text
        x={GRID_X - 44}
        y={GRID_Y + 3 * CELL}
        fontSize="13"
        fontWeight="700"
        fontFamily={LABEL_FONT}
        fill={INK_SOFT}
        textAnchor="middle"
        letterSpacing="0.04em"
        transform={`rotate(-90 ${GRID_X - 44} ${GRID_Y + 3 * CELL})`}
      >
        2nd die
      </text>

      <text x="240" y="344" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.04em">
        36 outcomes · doubles circled · P(a double) = 6⁄36 = 1⁄6
      </text>
    </svg>
  );
}
