export type Move = "Cooperate" | "Defect";
export type Round = {
  you: Move;
  opponent: Move;
  yours: number;
  theirs: number;
};
export const MAX_ROUNDS = 5;
export function payoff(you: Move, opponent: Move): [number, number] {
  if (you === "Cooperate") return opponent === "Cooperate" ? [3, 3] : [0, 5];
  return opponent === "Cooperate" ? [5, 0] : [1, 1];
}
export function playRound(history: readonly Round[], you: Move): Round[] {
  if (history.length >= MAX_ROUNDS) return [...history];
  const opponent = history.length
    ? history[history.length - 1].you
    : "Cooperate";
  const [yours, theirs] = payoff(you, opponent);
  return [...history, { you, opponent, yours, theirs }];
}
export function explain(you: Move, opponent: Move): string {
  if (you === "Cooperate" && opponent === "Cooperate")
    return "You both cooperate. Shared trust earns each of you 3 points.";
  if (you === "Defect" && opponent === "Defect")
    return "You both defect. Each protects their own interest, but earns only 1 point.";
  return you === "Defect"
    ? "You defect while they cooperate. You gain 5 points; they receive 0. A short-term advantage can come at the cost of trust."
    : "You cooperate while they defect. You receive 0 points; they gain 5. Cooperation leaves you exposed when it is not returned.";
}

// Prison sentences are costs: fewer years is better, unlike lesson points.
export function prisonSentence(you: Move, opponent: Move): [number, number] {
  if (you === "Cooperate") return opponent === "Cooperate" ? [1, 1] : [5, 0];
  return opponent === "Cooperate" ? [0, 5] : [3, 3];
}
export function explainSentence(you: Move, opponent: Move): string {
  if (you === "Cooperate" && opponent === "Cooperate")
    return "You both stay silent. Each receives a light sentence of 1 year.";
  if (you === "Defect" && opponent === "Defect")
    return "You both confess and betray each other. Each receives a moderate sentence of 3 years.";
  return you === "Defect"
    ? "You confess while the other prisoner stays silent. You go free; they receive a heavy sentence of 5 years."
    : "You stay silent while the other prisoner confesses. They go free; you receive a heavy sentence of 5 years.";
}
