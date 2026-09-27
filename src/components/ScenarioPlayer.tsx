"use client";
import { useState } from "react";
import { explain, type Move, type Round } from "@/lib/game";
import {
  advanceCent,
  bargain,
  centipedePayoffs,
  initialCent,
  nashCells,
  policies,
  repeatRound,
  type Scenario,
  type MatrixScenario,
  type UltimatumScenario,
  type CentipedeScenario,
  type RepeatedScenario,
} from "@/lib/scenario-engine";
const draw = () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button className="text-link replay" onClick={onClick}>
      Restart experiment ↻
    </button>
  );
}
function MatrixPlayer({ s }: { s: MatrixScenario }) {
  const [cell, setCell] = useState<number | null>(null);
  const result = cell === null ? null : s.payoffs[cell],
    equilibria = nashCells(s);
  return (
    <>
      <p className="eyebrow">Your move / their response</p>
      <p>
        Your choices are the rows. {s.opponent} chooses a column at random,
        independently of your move.
      </p>
      <div
        className="table-scroll"
        tabIndex={0}
        aria-label="Payoff matrix; scroll horizontally if needed"
      >
        <table className="scenario-table">
          <caption>
            Each cell: you / {s.opponent}.{" "}
            {s.prison
              ? "Years in prison; fewer is better."
              : "Points; higher is better."}
          </caption>
          <thead>
            <tr>
              <th scope="col">You ↓ / {s.opponent} →</th>
              {s.cols.map((c, i) => (
                <th scope="col" key={i}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r, i) => (
              <tr key={i}>
                <th scope="row">{r}</th>
                {s.cols.map((_, j) => {
                  const k = i * s.cols.length + j;
                  return (
                    <td key={j} className={cell === k ? "chosen-cell" : ""}>
                      {s.payoffs[k].join(" / ")}
                      {cell === k && <strong>✓ Outcome</strong>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="experiment-actions">
        {s.rows.map((r, i) => (
          <button
            className="button ink"
            key={i}
            disabled={cell !== null}
            onClick={() =>
              setCell(i * s.cols.length + Math.floor(draw() * s.cols.length))
            }
          >
            {r}
          </button>
        ))}
      </div>
      <div className="experiment-feedback" role="status">
        {result && cell !== null ? (
          <>
            <strong>
              You: {result[0]} · {s.opponent}: {result[1]}{" "}
              {s.prison ? "years" : "points"}
            </strong>
            <p>
              You chose {s.rows[Math.floor(cell / s.cols.length)]}; they chose{" "}
              {s.cols[cell % s.cols.length]}.
            </p>
            <p>
              {equilibria.length
                ? `Pure Nash outcomes: ${equilibria.map((i) => `${s.rows[Math.floor(i / s.cols.length)]} / ${s.cols[i % s.cols.length]}`).join("; ")}. At these outcomes, neither player improves by changing their own move alone.`
                : "There is no pure-strategy Nash equilibrium in this matrix. A mixed strategy randomizes over moves."}{" "}
              An equilibrium need not be the best shared outcome.
            </p>
          </>
        ) : (
          "Choose a row to reveal the outcome."
        )}
      </div>
      <Reset onClick={() => setCell(null)} />
    </>
  );
}
function UltimatumPlayer({ s }: { s: UltimatumScenario }) {
  const [offer, setOffer] = useState(50),
    [submitted, setSubmitted] = useState(false),
    scores = bargain(offer, s.threshold);
  return (
    <>
      <p className="eyebrow">Divide 100 points</p>
      <p>
        You propose a split. Your opponent accepts if their share meets a fixed
        hidden threshold; rejection gives both players zero. The slider always
        specifies their share.
      </p>
      <label className="offer-label" htmlFor="offer">
        Offer to {s.opponent}: <strong>{offer} points</strong>
      </label>
      <input
        id="offer"
        type="range"
        min="0"
        max="100"
        step="1"
        value={offer}
        disabled={submitted}
        onChange={(e) => setOffer(Number(e.target.value))}
      />
      <p>You keep {100 - offer} points if accepted.</p>
      <button
        className="button ink"
        disabled={submitted}
        onClick={() => setSubmitted(true)}
      >
        Propose this split →
      </button>
      <div className="experiment-feedback" role="status">
        {submitted ? (
          <>
            <strong>
              {offer >= s.threshold ? "Accepted" : "Rejected"} · You:{" "}
              {scores[0]} / {s.opponent}: {scores[1]}
            </strong>
            <p>
              The acceptance threshold was {s.threshold} points. Offering
              exactly that amount maximizes your points against this fixed rule.
              Real people may negotiate or value fairness differently.
            </p>
          </>
        ) : (
          "Choose an offer, then submit it."
        )}
      </div>
      <Reset
        onClick={() => {
          setSubmitted(false);
          setOffer(50);
        }}
      />
    </>
  );
}
function CentipedePlayer({ s }: { s: CentipedeScenario }) {
  const [state, setState] = useState(initialCent),
    path = centipedePayoffs(s);
  return (
    <>
      <p className="eyebrow">Take or pass / {s.nodes} steps</p>
      <p>
        Taking ends the game and awards both displayed shares. Passing moves to
        the next split. You move first. Your opponent{" "}
        {s.computer === "backward"
          ? "takes at their first opportunity"
          : "passes until the final step"}
        . The final player must take.
      </p>
      <ol className="decision-path">
        {path.map((pair, i) => (
          <li key={i} aria-current={state.node === i ? "step" : undefined}>
            <span>
              Step {i + 1} · {i % 2 ? "Them" : "You"}
            </span>
            <strong>{pair.join(" / ")}</strong>
            <small>
              {state.node === i
                ? state.ended
                  ? "Final outcome"
                  : "← Current step"
                : i < state.node
                  ? "Passed"
                  : "Available later"}
            </small>
          </li>
        ))}
      </ol>
      <p>Shares above: your points / their points. Higher is better.</p>
      <div className="experiment-actions">
        <button
          className="button ink"
          disabled={state.ended}
          onClick={() => setState(advanceCent(s, state, "take"))}
        >
          Take the split
        </button>
        <button
          className="button"
          disabled={state.ended || state.node === s.nodes - 1}
          onClick={() => setState(advanceCent(s, state, "pass"))}
        >
          Pass →
        </button>
      </div>
      <div className="experiment-feedback" role="status">
        {state.events.at(-1) ?? "Your turn at step 1."}
        {state.scores ? (
          <>
            <p>
              <strong>
                Final scores · You: {state.scores[0]} / Them: {state.scores[1]}
              </strong>
            </p>
            <p>
              Compare your final split with the earlier offers. Passing changes
              both shares and hands control to the other player. This is a
              fixed-policy experiment, not a claim that immediate taking is
              optimal for every payoff schedule.
            </p>
          </>
        ) : (
          <p>Your turn at step {state.node + 1}.</p>
        )}
      </div>
      {state.events.length > 0 && (
        <details>
          <summary>Decision history</summary>
          <ol>
            {state.events.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ol>
        </details>
      )}
      <Reset onClick={() => setState(initialCent())} />
    </>
  );
}
function RepeatedPlayer({ s }: { s: RepeatedScenario }) {
  const [history, setHistory] = useState<Round[]>([]),
    last = history.at(-1),
    done = history.length === s.rounds;
  return (
    <>
      <p className="eyebrow">
        Round {Math.min(history.length + 1, s.rounds)} / {s.rounds}
      </p>
      <p>
        <strong>Opponent policy:</strong> {policies[s.strategy]}
      </p>
      <p>
        Points (you / them): both cooperate 3 / 3; only you defect 5 / 0; only
        they defect 0 / 5; both defect 1 / 1.
      </p>
      <div className="experiment-score">
        <span>
          You <strong>{history.reduce((n, r) => n + r.yours, 0)}</strong>
        </span>
        <span>
          {s.opponent}{" "}
          <strong>{history.reduce((n, r) => n + r.theirs, 0)}</strong>
        </span>
      </div>
      <div className="experiment-actions">
        {(["Cooperate", "Defect"] as Move[]).map((move) => (
          <button
            className="button ink"
            key={move}
            disabled={done}
            onClick={() => setHistory(repeatRound(s, history, move, draw()))}
          >
            {move}
          </button>
        ))}
      </div>
      <div className="experiment-feedback" role="status">
        {last
          ? `Round ${history.length}: ${explain(last.you, last.opponent)}`
          : "Choose your first move."}
        {done && (
          <p>
            <strong>Experiment complete.</strong> You cooperated in{" "}
            {history.filter((r) => r.you === "Cooperate").length} of {s.rounds}{" "}
            rounds. {policies[s.strategy]} Replay with a different sequence to
            see how this policy changes the cost of betrayal and the value of
            returning to cooperation.
          </p>
        )}
      </div>
      {history.length > 0 && (
        <div className="table-scroll" tabIndex={0} aria-label="Round history">
          <table className="scenario-table">
            <caption>Round history · points</caption>
            <thead>
              <tr>
                <th scope="col">Round</th>
                <th scope="col">Your move</th>
                <th scope="col">Their move</th>
                <th scope="col">You / them</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{r.you}</td>
                  <td>{r.opponent}</td>
                  <td>
                    {r.yours} / {r.theirs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Reset onClick={() => setHistory([])} />
    </>
  );
}
export default function ScenarioPlayer({
  scenario: s,
}: {
  scenario: Scenario;
}) {
  return (
    <section className="experiment-panel" aria-label="Playable experiment">
      {s.type === "matrix" ? (
        <MatrixPlayer s={s} />
      ) : s.type === "ultimatum" ? (
        <UltimatumPlayer s={s} />
      ) : s.type === "centipede" ? (
        <CentipedePlayer s={s} />
      ) : (
        <RepeatedPlayer s={s} />
      )}
    </section>
  );
}
