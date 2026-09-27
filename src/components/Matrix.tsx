"use client";
import { useState } from "react";
import { explainSentence, prisonSentence, type Move } from "@/lib/game";
const action = { Cooperate: "Stay silent", Defect: "Confess" };
const moves: Move[] = ["Cooperate", "Defect"];
export default function Matrix() {
  const [result, setResult] = useState<{ you: Move; opponent: Move } | null>(
    null,
  );
  function choose(you: Move) {
    setResult({
      you,
      opponent:
        crypto.getRandomValues(new Uint32Array(1))[0] < 2147483648
          ? "Cooperate"
          : "Defect",
    });
  }
  return (
    <div className="matrix-model" id="matrix">
      <div className="figure-heading">
        <span>Figure 01</span>
        <span>
          <i className="status-dot" /> Playable model
        </span>
      </div>
      <h2>The Prisoner’s Dilemma</h2>
      <p className="model-intro">
        The police offer each prisoner a deal. Stay silent to cooperate with the
        other prisoner, or confess to betray them.
      </p>
      <table className="payoff-table">
        <caption>
          YEARS IN PRISON · LOWER IS BETTER <span aria-hidden="true">↓</span>
          <span className="sr-only">
            . Rows are your choice. Each cell lists your prison sentence first,
            then theirs, in years. Columns are the other prisoner’s choice.
          </span>
        </caption>
        <thead>
          <tr>
            <td aria-hidden="true">You / Them</td>
            {moves.map((m) => (
              <th key={action[m]} scope="col">
                {action[m]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {moves.map((you) => (
            <tr key={you}>
              <th scope="row">{action[you]}</th>
              {moves.map((opponent) => {
                const selected =
                  result?.you === you && result.opponent === opponent;
                const [a, b] = prisonSentence(you, opponent);
                return (
                  <td key={opponent} className={selected ? "selected" : ""}>
                    <span className="payoff">
                      <b>{a}</b>
                      <span>,</span>
                      <b>{b}</b>
                    </span>
                    <span className="cell-label">
                      {selected
                        ? "✓ Your outcome"
                        : you === opponent
                          ? you === "Cooperate"
                            ? "Mutual trust"
                            : "Mutual loss"
                          : you === "Defect"
                            ? "Your advantage"
                            : "Their advantage"}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="matrix-key">
        <span>
          <i /> Your years
        </span>
        <span>
          <i /> Their years
        </span>
      </div>
      <p className="sentence-rules">
        Both silent: 1 year each. Both confess: 3 years each. Only one
        confesses: they go free; the silent prisoner gets 5 years.
      </p>
      <p className="choice-label">
        Your actions: stay silent or confess to the police.
      </p>
      <div className="choice-buttons">
        {moves.map((m) => (
          <button
            className={m === "Cooperate" ? "button green" : "button outline"}
            key={action[m]}
            onClick={() => choose(m)}
          >
            {action[m]}
            <span aria-hidden="true">{m === "Cooperate" ? "↗" : "→"}</span>
          </button>
        ))}
      </div>
      <div className="matrix-feedback" aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <strong>
              Prison years — You:{" "}
              {prisonSentence(result.you, result.opponent)[0]} · Them:{" "}
              {prisonSentence(result.you, result.opponent)[1]}
            </strong>
            <p>{explainSentence(result.you, result.opponent)}</p>
          </>
        ) : (
          <p>
            Your opponent chooses randomly, with equal odds. Make a move to
            reveal the outcome.
          </p>
        )}
      </div>
      <button
        className="text-button"
        disabled={!result}
        onClick={() => setResult(null)}
      >
        Reset experiment ↺
      </button>
    </div>
  );
}
