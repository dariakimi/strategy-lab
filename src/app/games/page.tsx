import type { Metadata } from "next";
import Link from "next/link";
import GameLibrary from "@/components/GameLibrary";
import { scenarios } from "@/lib/scenarios";
const title = "Game Library — Strategy Lab",
  description =
    "Play real-life decisions about work, money, relationships, and shared resources. Choose your action and continue to the next game.";
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
        <section className="library-play-intro">
          <h1>
            What would <em>you do?</em>
          </h1>
          <p>
            Negotiate a salary. Choose what to wear. Set a return policy. Play a
            situation, see what happens, then go straight to the next game.
          </p>
          <Link className="button ink" href={`/games/${scenarios[0].id}`}>
            Start playing →
          </Link>
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
