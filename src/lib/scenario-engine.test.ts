import test from "node:test";
import assert from "node:assert/strict";
import { scenarios } from "./scenarios.ts";
import {
  nashCells,
  bargain,
  advanceCent,
  centipedePayoffs,
  initialCent,
  repeatRound,
  strategyMove,
  type RepeatedScenario,
} from "./scenario-engine.ts";
test("catalogue contains 147 unique, valid playable scenarios", () => {
  assert.equal(scenarios.length, 147);
  assert.equal(new Set(scenarios.map((s) => s.id)).size, 147);
  for (const s of scenarios) {
    assert.ok(s.title && s.situation);
    if (s.type === "matrix") {
      assert.equal(s.payoffs.length, s.rows.length * s.cols.length);
      assert.ok(
        s.payoffs.every((p) => p.length === 2 && p.every(Number.isFinite)),
      );
    }
    if (s.type === "ultimatum")
      assert.ok(s.threshold >= 0 && s.threshold <= 100);
    if (s.type === "centipede") assert.ok(s.nodes >= 2);
    if (s.type === "repeated") assert.ok(s.rounds > 0);
  }
});
test("prison sentences and equilibrium minimize years", () => {
  const s = scenarios[0];
  assert.equal(s.type, "matrix");
  if (s.type !== "matrix") return;
  assert.deepEqual(s.payoffs, [
    [1, 1],
    [5, 0],
    [0, 5],
    [3, 3],
  ]);
  assert.deepEqual(nashCells(s), [3]);
});
test("matching pennies has no pure equilibrium", () => {
  const s = scenarios.find((s) => s.title === "Matching Pennies");
  assert.ok(s?.type === "matrix");
  assert.deepEqual(nashCells(s), []);
});
test("bargaining threshold, extremes and invalid offers", () => {
  assert.deepEqual(bargain(29, 30), [0, 0]);
  assert.deepEqual(bargain(30, 30), [70, 30]);
  assert.deepEqual(bargain(100, 30), [0, 100]);
  assert.throws(() => bargain(-1, 30));
  assert.throws(() => bargain(2.5, 30));
});
test("every sequential game terminates and pays both displayed shares", () => {
  for (const s of scenarios) {
    if (s.type !== "centipede") continue;
    let state = initialCent();
    const path = centipedePayoffs(s);
    assert.deepEqual(advanceCent(s, state, "take").scores, path[0]);
    for (let i = 0; i < s.nodes && !state.ended; i++)
      state = advanceCent(s, state, "pass");
    assert.equal(state.ended, true);
    assert.deepEqual(state.scores, path[state.node]);
    assert.deepEqual(advanceCent(s, state, "take"), state);
  }
});
test("Tit for Tat starts cooperative then copies previous player move and stops at horizon", () => {
  const s = {
    ...scenarios.find((s) => s.type === "repeated"),
    type: "repeated",
    strategy: "tit-for-tat",
    rounds: 5,
  } as RepeatedScenario;
  let h = repeatRound(s, [], "Defect", 0.5);
  assert.equal(h[0].opponent, "Cooperate");
  h = repeatRound(s, h, "Cooperate", 0.5);
  assert.equal(h[1].opponent, "Defect");
  h = repeatRound(s, h, "Cooperate", 0.5);
  assert.equal(h[2].opponent, "Cooperate");
  while (h.length < 5) h = repeatRound(s, h, "Cooperate", 0.5);
  assert.deepEqual(repeatRound(s, h, "Defect", 0.5), h);
});
test("all eight policies honor retaliation, forgiveness and random boundaries", () => {
  const h = [
    { you: "Defect", opponent: "Cooperate", yours: 5, theirs: 0 },
  ] as const;
  assert.equal(strategyMove("grim-trigger", h, 0.9), "Defect");
  assert.equal(strategyMove("always-defect", [], 0), "Defect");
  assert.equal(strategyMove("always-cooperate", h, 0), "Cooperate");
  assert.equal(strategyMove("generous-tit-for-tat", h, 0.69), "Defect");
  assert.equal(strategyMove("generous-tit-for-tat", h, 0.7), "Cooperate");
  assert.equal(strategyMove("tit-for-two-tats", h, 0), "Cooperate");
  assert.equal(strategyMove("tit-for-two-tats", [...h, ...h], 0), "Defect");
  assert.equal(strategyMove("win-stay-lose-shift", h, 0), "Defect");
  assert.equal(strategyMove("random", [], 0.49), "Cooperate");
  assert.equal(strategyMove("random", [], 0.5), "Defect");
});
