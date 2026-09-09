"use client";
import { useState } from "react";
import { explain, MAX_ROUNDS, playRound, type Round } from "@/lib/game";
export default function RepeatedGame() {
  const [history, setHistory] = useState<Round[]>([]);
  const complete = history.length === MAX_ROUNDS;
  const last = history.at(-1);
  return (
    <section className="lesson" id="learn" aria-labelledby="lesson-title">
      <div className="lesson-copy">
        <p className="eyebrow light">
          The guided experiment <span>Five rounds</span>
        </p>
        <h2 id="lesson-title">
          Can cooperation survive repeated <em>betrayal?</em>
        </h2>
        <p>
          One encounter is a gamble. A repeated encounter is a relationship.
          Play five rounds and discover what changes when your opponent
          remembers.
        </p>
        <div className="opponent">
          <span className="opponent-symbol" aria-hidden="true">
            ⇄
          </span>
          <div>
            <strong>Meet Tit for Tat</strong>
            <p>
              It cooperates first. After that, it copies your previous move.
              Firm, forgiving, and very predictable.
            </p>
          </div>
        </div>
        <p className="lesson-rules">
          POINTS, NOT PRISON YEARS · Higher is better. Both cooperate: 3 each.
          Both defect: 1 each. Defect alone: 5 for the defector, 0 for the
          cooperator.
        </p>
      </div>
      <div className="round-panel">
        <div className="figure-heading">
          <span>Figure 02 · Repeated game</span>
          <span>
            {complete ? "Complete" : `Round ${history.length + 1} of 5`}
          </span>
        </div>
        <div className="scoreboard">
          <div>
            <span>You</span>
            <strong>
              {String(history.reduce((s, r) => s + r.yours, 0)).padStart(
                2,
                "0",
              )}
            </strong>
          </div>
          <span className="score-divider">:</span>
          <div>
            <span>Tit for Tat</span>
            <strong>
              {String(history.reduce((s, r) => s + r.theirs, 0)).padStart(
                2,
                "0",
              )}
            </strong>
          </div>
        </div>
        <div
          className="round-dots"
          aria-label={`${history.length} of 5 rounds played`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < history.length ? "played" : ""}>
              {i < history.length ? "✓" : i + 1}
            </span>
          ))}
        </div>
        <div className="choice-buttons">
          <button
            className="button green"
            disabled={complete}
            onClick={() => setHistory((h) => playRound(h, "Cooperate"))}
          >
            Cooperate ↗
          </button>
          <button
            className="button light-outline"
            disabled={complete}
            onClick={() => setHistory((h) => playRound(h, "Defect"))}
          >
            Defect →
          </button>
        </div>
        <div className="round-feedback" aria-live="polite" aria-atomic="true">
          {last ? (
            <>
              <strong>
                Round {history.length}: you {last.you.toLowerCase()}, Tit for
                Tat {last.opponent === "Cooperate" ? "cooperates" : "defects"}.
              </strong>
              <p>{explain(last.you, last.opponent)}</p>
              {complete && (
                <p className="final-insight">
                  Experiment complete. Mutual cooperation would earn 15 points
                  each. Tit for Tat makes betrayal costly in the next round, but
                  responds to renewed cooperation. In a known final round there
                  is no future retaliation—an important limit to this strategy.
                </p>
              )}
            </>
          ) : (
            <p>
              The first move is yours. Tit for Tat will begin by cooperating.
            </p>
          )}
        </div>
        <details className="history" open={history.length > 0}>
          <summary>
            Round history <span>{history.length} / 5</span>
          </summary>
          {history.length ? (
            <table>
              <caption className="sr-only">
                Moves and points for each round
              </caption>
              <thead>
                <tr>
                  <th scope="col">Round</th>
                  <th scope="col">You</th>
                  <th scope="col">Tit for Tat</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {r.you} · {r.yours}
                    </td>
                    <td>
                      {r.opponent} · {r.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Your choices will appear here.</p>
          )}
        </details>
        <button className="text-button" onClick={() => setHistory([])}>
          Restart lesson ↺
        </button>
      </div>
    </section>
  );
}
