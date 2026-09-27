import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScenarioPlayer from "@/components/ScenarioPlayer";
import { scenarios } from "@/lib/scenarios";
import { formats } from "@/lib/scenario-engine";
export const dynamicParams = false;
export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    s = scenarios.find((s) => s.id === slug);
  if (!s) return {};
  const title = `${s.title} — Strategy Lab`,
    description = `Play ${s.title}: an interactive experiment in ${s.concept.toLowerCase()}.`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
export default async function Game({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    index = scenarios.findIndex((s) => s.id === slug);
  if (index < 0) notFound();
  const s = scenarios[index],
    next = scenarios[(index + 1) % scenarios.length],
    previous = scenarios[(index - 1 + scenarios.length) % scenarios.length];
  return (
    <div className="page-shell library-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="library-header">
        <Link className="wordmark" href="/">
          Strategy Lab<span className="brand-period">.</span>
        </Link>
        <Link className="text-link" href="/games">
          ← All games
        </Link>
      </header>
      <main id="main" className="scenario-layout">
        <section className="scenario-intro">
          <p className="eyebrow">
            Experiment {String(index + 1).padStart(3, "0")} / {formats[s.type]}
          </p>
          <h1>{s.title}</h1>

          <p>{s.situation}</p>
          <details className="model-note">
            <summary>How this model works</summary>
            <p>
              These are simplified, illustrative outcomes. Points compare
              outcomes within this game; they do not predict real-world
              salaries, status, or other results. The playable rules define what
              is simulated.
            </p>
            <p>Concept: {s.concept}</p>
            {s.source === "arena" && (
              <a
                className="text-link"
                href="https://dariakimi.github.io/game-theory-arena/"
              >
                Scenario from Game Theory Arena ↗
              </a>
            )}
          </details>
          <Link className="text-link" href="/games">
            Browse the library →
          </Link>
        </section>
        <div className="game-workbench">
          <nav className="game-navigation" aria-label="Move between games">
            <Link
              href={`/games/${previous.id}`}
              aria-label={`Previous game: ${previous.title}`}
            >
              ← Previous game
            </Link>
            <Link className="button ink" href={`/games/${next.id}`}>
              Next game →
            </Link>
          </nav>
          <ScenarioPlayer key={s.id} scenario={s} />
          <nav className="game-navigation" aria-label="Continue playing">
            <Link href="/games">All situations</Link>
            <Link className="button ink" href={`/games/${next.id}`}>
              Next game →
            </Link>
          </nav>
          <p className="next-game-title">Up next: {next.title}</p>
        </div>
      </main>
      <footer className="library-footer">
        <Link href="/games">← Game index</Link>
        <Link href={`/games/${next.id}`}>Next game: {next.title} →</Link>
      </footer>
    </div>
  );
}
