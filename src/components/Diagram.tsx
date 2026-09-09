import type { Game } from "@/lib/content";
export default function Diagram({ kind }: { kind: Game["diagram"] }) {
  return (
    <svg
      viewBox="0 0 240 116"
      role="img"
      aria-label={
        {
          matrix:
            "A two-by-two payoff matrix: staying silent means 1 year each; both confessing means 3 years each.",
          split: "A bargaining allocation split into seven and three units.",
          tree: "Two decision paths converge on a shared reward.",
          network: "Individual players connect to one shared resource.",
        }[kind]
      }
      className={`game-diagram ${kind}`}
    >
      {kind === "matrix" ? (
        <>
          <path d="M70 8h100v100H70zM120 8v100M70 58h100" />
          <g className="diagram-text">
            <text x="95" y="39">
              1, 1
            </text>
            <text x="145" y="39">
              5, 0
            </text>
            <text x="95" y="89">
              0, 5
            </text>
            <text x="145" y="89">
              3, 3
            </text>
          </g>
          <rect x="71" y="9" width="48" height="48" className="diagram-tint" />
        </>
      ) : kind === "split" ? (
        <>
          <path d="M25 42h190v32H25zM158 42v32" />
          <path d="M158 28v60" className="accent-line" />
          <text x="88" y="64" className="diagram-text">
            7
          </text>
          <text x="188" y="64" className="diagram-text">
            3
          </text>
          <text x="88" y="99" className="diagram-note">
            PROPOSER
          </text>
          <text x="188" y="99" className="diagram-note">
            RESPONDER
          </text>
        </>
      ) : kind === "tree" ? (
        <>
          <path d="M35 58L105 23 185 58M35 58l70 35 80-35M185 58h35" />
          {[
            [35, 58],
            [105, 23],
            [105, 93],
            [185, 58],
          ].map(([x, y]) => (
            <circle key={x + "," + y} cx={x} cy={y} r="7" />
          ))}
          <text x="144" y="22" className="diagram-note">
            TOGETHER
          </text>
        </>
      ) : (
        <>
          <circle cx="120" cy="58" r="25" className="diagram-tint" />
          {[
            [40, 24],
            [40, 92],
            [200, 24],
            [200, 92],
            [120, 9],
            [120, 107],
          ].map(([x, y]) => (
            <g key={x + "," + y}>
              <path d={`M${x} ${y}L120 58`} />
              <circle cx={x} cy={y} r="6" />
            </g>
          ))}
          <circle cx="120" cy="58" r="17" />
          <text x="120" y="62" className="diagram-note">
            12
          </text>
        </>
      )}
    </svg>
  );
}
