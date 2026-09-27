"use client";
import { useState } from "react";
import { MAX_ROUNDS, playRound, type Round } from "@/lib/game";
const actions = { Cooperate: "Patrol the block", Defect: "Skip your patrol" };
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
          You and a neighbor share a neighborhood watch. Each week, choose to
          patrol the block or skip your patrol. Play five weeks and see how your
          neighbor responds.
        </p>
        <div className="opponent">
          <span className="opponent-symbol" aria-hidden="true">
            ⇄
          </span>
          <div>
            <strong>Meet Tit for Tat</strong>
            <p>It patrols first, then copies your previous action.</p>
          </div>
        </div>
        <p className="lesson-rules">
          Higher points are better. Both patrol: 3 each. Both skip: 1 each. Skip
          while your neighbor patrols: you get 5, they get 0. Patrol alone: you
          get 0, they get 5.
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
            Patrol the block ↗
          </button>
          <button
            className="button light-outline"
            disabled={complete}
            onClick={() => setHistory((h) => playRound(h, "Defect"))}
          >
            Skip your patrol →
          </button>
        </div>
        <div className="round-feedback" aria-live="polite" aria-atomic="true">
          {last ? (
            <>
              <strong>
                Round {history.length}: you chose “{actions[last.you]}”; your
                neighbor chose “{actions[last.opponent]}”.
              </strong>
              <p>
                You earned {last.yours} points; your neighbor earned{" "}
                {last.theirs}.
              </p>
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
            <p>The first move is yours. Your neighbor begins by patrolling.</p>
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
                      {actions[r.you]} · {r.yours}
                    </td>
                    <td>
                      {actions[r.opponent]} · {r.theirs}
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
