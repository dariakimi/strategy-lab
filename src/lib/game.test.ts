import test from "node:test";
import assert from "node:assert/strict";
import {
  payoff,
  playRound,
  prisonSentence,
  explainSentence,
  type Move,
  type Round,
} from "./game.ts";
test("all four payoffs", () => {
  assert.deepEqual(payoff("Cooperate", "Cooperate"), [3, 3]);
  assert.deepEqual(payoff("Cooperate", "Defect"), [0, 5]);
  assert.deepEqual(payoff("Defect", "Cooperate"), [5, 0]);
  assert.deepEqual(payoff("Defect", "Defect"), [1, 1]);
});
test("Tit for Tat opens cooperatively and copies the previous move", () => {
  let history: Round[] = [];
  const moves: Move[] = [
    "Defect",
    "Cooperate",
    "Defect",
    "Defect",
    "Cooperate",
  ];
  for (const move of moves) history = playRound(history, move);
  assert.deepEqual(
    history.map((r) => r.opponent),
    ["Cooperate", "Defect", "Cooperate", "Defect", "Defect"],
  );
  assert.equal(
    history.reduce((n, r) => n + r.yours, 0),
    11,
  );
  assert.equal(
    history.reduce((n, r) => n + r.theirs, 0),
    11,
  );
  assert.deepEqual(playRound(history, "Cooperate"), history);
});
test("mutual cooperation earns 15 each and inputs remain immutable", () => {
  const initial: Round[] = [];
  let history = initial;
  for (let i = 0; i < 5; i++) history = playRound(history, "Cooperate");
  assert.equal(initial.length, 0);
  assert.equal(
    history.reduce((n, r) => n + r.yours, 0),
    15,
  );
  assert.equal(
    history.reduce((n, r) => n + r.theirs, 0),
    15,
  );
  assert.equal(playRound([], "Defect")[0].opponent, "Cooperate");
});

test("police deal uses exact prison sentences and explains each outcome", () => {
  assert.deepEqual(prisonSentence("Cooperate", "Cooperate"), [1, 1]);
  assert.deepEqual(prisonSentence("Cooperate", "Defect"), [5, 0]);
  assert.deepEqual(prisonSentence("Defect", "Cooperate"), [0, 5]);
  assert.deepEqual(prisonSentence("Defect", "Defect"), [3, 3]);
  assert.match(explainSentence("Cooperate", "Cooperate"), /1 year/);
  assert.match(explainSentence("Defect", "Defect"), /3 years/);
  assert.match(explainSentence("Defect", "Cooperate"), /You go free/);
  assert.match(explainSentence("Cooperate", "Defect"), /They go free/);
});
