export type Game = {
  id: string;
  title: string;
  description: string;
  players: string;
  difficulty: string;
  duration: string;
  concept: string;
  detail: string;
  diagram: "matrix" | "split" | "tree" | "network";
};
export const games: Game[] = [
  {
    id: "prisoners-dilemma",
    title: "Prisoner’s Dilemma",
    description: "When doing what’s best for you isn’t best for everyone.",
    players: "2 players",
    difficulty: "Beginner",
    duration: "5 min",
    concept: "Individual incentives, collective costs",
    detail:
      "Each player chooses independently. Defection earns more whatever the other player does, yet mutual cooperation is better for both than mutual defection. Try the matrix above, then explore how repetition changes incentives in the guided experiment.",
    diagram: "matrix",
  },
  {
    id: "ultimatum",
    title: "Ultimatum Game",
    description: "How much is fair? Find the price of an unfair offer.",
    players: "2 players",
    difficulty: "Beginner",
    duration: "4 min",
    concept: "Bargaining meets fairness",
    detail:
      "One player proposes how to divide 10 points. The other accepts or rejects. Acceptance implements the split; rejection gives both zero. If only money matters, any positive offer beats zero. But people may reject a small offer to punish unfairness. Consider: would you accept 1 point while the proposer keeps 9?",
    diagram: "split",
  },
  {
    id: "stag-hunt",
    title: "Stag Hunt",
    description: "A bigger reward requires a little faith in someone else.",
    players: "2 players",
    difficulty: "Intermediate",
    duration: "6 min",
    concept: "Trust makes coordination possible",
    detail:
      "Two hunters can each safely catch a hare for 2 points. Hunting a stag earns 4 each only if both choose it; a lone stag hunter earns 0. Unlike the Prisoner’s Dilemma, cooperating is your best response to cooperation. Would you risk the stag without knowing the other hunter’s plan?",
    diagram: "tree",
  },
  {
    id: "commons",
    title: "Tragedy of the Commons",
    description:
      "A shared resource. Individual choices. Collective consequences.",
    players: "3+ players",
    difficulty: "Intermediate",
    duration: "7 min",
    concept: "The hidden cost of taking more",
    detail:
      "Imagine a lake that replenishes 12 fish each season, shared by three fishers. Four fish each keeps the stock stable. Taking six increases one person’s catch today, but if everyone does it, the stock shrinks. Shared rules, monitoring, and enforceable agreements can change the incentives; collapse is not inevitable.",
    diagram: "network",
  },
];
export const pathways: {
  title: string;
  description: string;
  scope: string;
  href: string;
  tag: string;
}[] = [
  {
    title: "New to game theory",
    description:
      "Start with a choice, not an equation. Build your first strategic instincts.",
    scope: "Start here · 4 foundational games",
    href: "#games",
    tag: "01 / The essentials",
  },
  {
    title: "Economics and markets",
    description:
      "Follow the incentives behind prices, bargaining, and shared resources.",
    scope: "Explore bargaining + the commons",
    href: "#ultimatum",
    tag: "02 / The exchange",
  },
  {
    title: "Politics and negotiation",
    description:
      "Explore credible promises, common ground, and the value of trust.",
    scope: "Explore coordination + repeated games",
    href: "#stag-hunt",
    tag: "03 / The agreement",
  },
  {
    title: "Computer science and AI",
    description:
      "Think in strategies. Discover how a simple rule creates complex behavior.",
    scope: "Explore the Tit for Tat experiment",
    href: "#learn",
    tag: "04 / The algorithm",
  },
];
export const notes: {
  category: string;
  time: string;
  title: string;
  summary: string;
  body: string;
}[] = [
  {
    category: "Markets & mechanisms",
    time: "1 min read",
    title: "Why auctions reward unusual bidding strategies",
    summary: "The highest valuation doesn’t always produce the highest bid.",
    body: "In a first-price sealed-bid auction, winning means paying your own bid. Bidding your full value leaves no surplus, so bidders balance a lower price against a lower chance of winning. In a second-price auction with private values and standard assumptions, truthful bidding is weakly dominant: the runner-up sets the price. The rules of the auction change what a sensible strategy looks like.",
  },
  {
    category: "Everyday dilemmas",
    time: "1 min read",
    title: "What traffic congestion teaches us about selfish behavior",
    summary: "The quickest route for one driver can slow everyone down.",
    body: "A driver considers the time their own trip takes, but joining a congested road also delays other people. This extra cost is an externality. When all drivers pick their individually fastest route, the resulting equilibrium can be worse than a coordinated assignment. More road capacity does not always help: in some networks, a new connection attracts traffic into a less efficient equilibrium.",
  },
  {
    category: "Cooperation & trust",
    time: "1 min read",
    title: "How repeated games create trust",
    summary: "When there’s a next time, today’s choices carry more weight.",
    body: "A one-off interaction ends with its immediate payoff. In a repeated game, a choice also changes how others respond tomorrow. A strategy such as Tit for Tat begins cooperatively, retaliates after defection, and forgives after cooperation returns. Repetition alone does not guarantee trust: patience, observation errors, and whether the end is known all matter. Our five-round experiment isolates the memory rule so you can see it at work.",
  },
];
