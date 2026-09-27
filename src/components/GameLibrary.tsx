import Link from "next/link";
import type { Scenario } from "@/lib/scenario-engine";
export default function GameLibrary({ scenarios }: { scenarios: Scenario[] }) {
  return (
    <section aria-label="Choose a real-life situation">
      <div className="library-index">
        {scenarios.map((s, i) => (
          <article key={s.id}>
            <span className="index">{String(i + 1).padStart(3, "0")}</span>
            <div>
              <p className="eyebrow">{s.category}</p>
              <h2>
                <Link href={`/games/${s.id}`}>{s.title}</Link>
              </h2>
              <p>{s.situation.split(/(?<=[.!?])\s/)[0]}</p>
            </div>
            <Link
              className="text-link"
              href={`/games/${s.id}`}
              aria-label={`Play ${s.title}`}
            >
              Play →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
