import { payoff, type Move, type Round } from "./game.ts";
export type Pair = [number, number];
type Base = {
  id: string;
  title: string;
  category: string;
  concept: string;
  situation: string;
  opponent: string;
  source?: "arena";
};
export type MatrixScenario = Base & {
  type: "matrix";
  rows: string[];
  cols: string[];
  payoffs: Pair[];
  prison?: boolean;
};
export type UltimatumScenario = Base & { type: "ultimatum"; threshold: number };
export type CentipedeScenario = Base & {
  type: "centipede";
  actions: { take: string; pass: string };
  nodes: number;
  startPot: Pair;
  growth: number;
  computer: "cooperate" | "backward";
};
export type Strategy =
  | "tit-for-tat"
  | "grim-trigger"
  | "always-defect"
  | "always-cooperate"
  | "generous-tit-for-tat"
  | "win-stay-lose-shift"
  | "random"
  | "tit-for-two-tats";
export type RepeatedScenario = Base & {
  type: "repeated";
  actions: Record<Move, string>;
  strategy: Strategy;
  rounds: number;
};
export type Scenario =
  | MatrixScenario
  | UltimatumScenario
  | CentipedeScenario
  | RepeatedScenario;
export const formats = {
  matrix: "Payoff matrix",
  ultimatum: "Bargaining",
  centipede: "Sequential trust",
  repeated: "Repeated dilemma",
};
export function nashCells(s: MatrixScenario): number[] {
  const better = (a: number, b: number) => (s.prison ? a <= b : a >= b);
  return s.payoffs.flatMap((pair, i) => {
    const r = Math.floor(i / s.cols.length),
      c = i % s.cols.length;
    return s.rows.every((_, j) =>
      better(pair[0], s.payoffs[j * s.cols.length + c][0]),
    ) &&
      s.cols.every((_, j) =>
        better(pair[1], s.payoffs[r * s.cols.length + j][1]),
      )
      ? [i]
      : [];
  });
}
export function bargain(offer: number, threshold: number): Pair {
  if (!Number.isInteger(offer) || offer < 0 || offer > 100)
    throw new RangeError("Offer must be a whole number from 0 to 100.");
  return offer >= threshold ? [100 - offer, offer] : [0, 0];
}
export function centipedePayoffs(s: CentipedeScenario): Pair[] {
  let pair: Pair = [...s.startPot];
  return Array.from({ length: s.nodes }, () => {
    const result: Pair = [Math.round(pair[0]), Math.round(pair[1])];
    pair = [pair[1] * s.growth, pair[0] * s.growth];
    return result;
  });
}
export type CentState = {
  node: number;
  ended: boolean;
  events: string[];
  scores: Pair | null;
};
export const initialCent = (): CentState => ({
  node: 0,
  ended: false,
  events: [],
  scores: null,
});
export function advanceCent(
  s: CentipedeScenario,
  state: CentState,
  move: "take" | "pass",
): CentState {
  if (state.ended) return state;
  const path = centipedePayoffs(s),
    events = [...state.events];
  let node = state.node;
  if (move === "take" || node === s.nodes - 1) {
    events.push(`Step ${node + 1}: you take.`);
    return { node, ended: true, events, scores: path[node] };
  }
  events.push(`Step ${node + 1}: you pass.`);
  node++;
  if (s.computer === "backward" || node === s.nodes - 1) {
    events.push(`Step ${node + 1}: opponent takes.`);
    return { node, ended: true, events, scores: path[node] };
  }
  events.push(`Step ${node + 1}: opponent passes.`);
  node++;
  return { node, ended: false, events, scores: null };
}
export function strategyMove(
  strategy: Strategy,
  history: readonly Round[],
  draw: number,
): Move {
  const last = history.at(-1);
  switch (strategy) {
    case "always-defect":
      return "Defect";
    case "always-cooperate":
      return "Cooperate";
    case "random":
      return draw < 0.5 ? "Cooperate" : "Defect";
    case "grim-trigger":
      return history.some((r) => r.you === "Defect") ? "Defect" : "Cooperate";
    case "tit-for-two-tats":
      return history.length >= 2 &&
        history.slice(-2).every((r) => r.you === "Defect")
        ? "Defect"
        : "Cooperate";
    case "generous-tit-for-tat":
      return last?.you === "Defect" && draw < 0.7 ? "Defect" : "Cooperate";
    case "win-stay-lose-shift":
      return !last
        ? "Cooperate"
        : last.theirs >= 3
          ? last.opponent
          : last.opponent === "Cooperate"
            ? "Defect"
            : "Cooperate";
    default:
      return last?.you ?? "Cooperate";
  }
}
export function repeatRound(
  s: RepeatedScenario,
  history: readonly Round[],
  you: Move,
  draw: number,
): Round[] {
  if (history.length >= s.rounds) return [...history];
  const opponent = strategyMove(s.strategy, history, draw),
    [yours, theirs] = payoff(you, opponent);
  return [...history, { you, opponent, yours, theirs }];
}

export function describePolicy(s: RepeatedScenario): string {
  const keep = `“${s.actions.Cooperate}”`,
    breakAction = `“${s.actions.Defect}”`;
  switch (s.strategy) {
    case "tit-for-tat":
      return `Chooses ${keep} first, then copies your previous action.`;
    case "grim-trigger":
      return `Chooses ${keep} until you choose ${breakAction} once, then chooses ${breakAction} for all remaining rounds.`;
    case "always-cooperate":
      return `Chooses ${keep} every round.`;
    case "always-defect":
      return `Chooses ${breakAction} every round.`;
    case "generous-tit-for-tat":
      return `Chooses ${keep} first. After you choose ${breakAction}, responds with ${breakAction} 70% of the time and ${keep} otherwise.`;
    case "win-stay-lose-shift":
      return `Starts with ${keep}. Repeats its action after earning 3 or 5 points; switches after earning 0 or 1.`;
    case "tit-for-two-tats":
      return `Chooses ${breakAction} only after you choose it twice in a row; otherwise chooses ${keep}.`;
    case "random":
      return `Chooses ${keep} or ${breakAction} with equal probability each round.`;
  }
}
