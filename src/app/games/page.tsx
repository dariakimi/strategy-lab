import type { Metadata } from "next";
import Link from "next/link";
import GameLibrary from "@/components/GameLibrary";
import { scenarios } from "@/lib/scenarios";
const title = "Game Library — Strategy Lab",
  description =
    "Explore 147 playable game-theory scenarios: payoff matrices, bargaining, sequential trust, and repeated dilemmas.";
export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};
export default function Games() {
  return (
    <div className="page-shell library-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="library-header">
        <Link className="wordmark" href="/">
          Strategy Lab<span className="brand-period">.</span>
        </Link>
        <nav aria-label="Library navigation">
          <Link href="/">← Home</Link>
          <Link href="/#learn">Guided lesson ↗</Link>
        </nav>
      </header>
      <main id="main">
        <section className="library-hero">
          <div>
            <h1>
              More ways to
              <br />
              <em>think strategically.</em>
            </h1>
            <p>
              From a first act of trust to the last round of negotiation. Find a
              situation, make your move, and discover the incentives beneath it.
            </p>
          </div>
          <div
            className="library-tally"
            aria-label="147 experiments in 4 formats"
          >
            <strong>
              147<span>↗</span>
            </strong>
            <p>
              77 matrices · 20 bargains
              <br />
              15 sequential games · 35 repeated dilemmas
            </p>
          </div>
        </section>
        <GameLibrary scenarios={scenarios} />
      </main>
      <footer className="library-footer">
        <p>Small models. A wider view of the world.</p>
        <Link href="/#sources">Sources & methodology →</Link>
      </footer>
    </div>
  );
}
