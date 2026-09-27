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
    next = scenarios[(index + 1) % scenarios.length];
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
          ← All 147 games
        </Link>
      </header>
      <main id="main" className="scenario-layout">
        <section className="scenario-intro">
          <p className="eyebrow">
            Experiment {String(index + 1).padStart(3, "0")} / {formats[s.type]}
          </p>
          <h1>{s.title}</h1>
          <p className="scenario-concept">{s.concept}</p>
          <p>{s.situation}</p>
          <aside className="model-note">
            <strong>About this model</strong>
            <p>
              The situation provides context. The rules in the playable panel
              define the experiment; additional real-world details, uncertainty,
              and negotiation are not simulated.
            </p>
          </aside>
          <Link className="text-link" href="/games">
            Browse the library →
          </Link>
        </section>
        <ScenarioPlayer scenario={s} />
      </main>
      <footer className="library-footer">
        <Link href="/games">← Game index</Link>
        <Link href={`/games/${next.id}`}>Next: {next.title} →</Link>
      </footer>
    </div>
  );
}
