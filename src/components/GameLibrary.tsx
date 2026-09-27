"use client";
import { useState } from "react";
import Link from "next/link";
import { formats, type Scenario } from "@/lib/scenario-engine";
export default function GameLibrary({ scenarios }: { scenarios: Scenario[] }) {
  const [query, setQuery] = useState(""),
    [format, setFormat] = useState(""),
    [category, setCategory] = useState(""),
    [limit, setLimit] = useState(18);
  const filtered = scenarios.filter(
    (s) =>
      (!format || s.type === format) &&
      (!category || s.category === category) &&
      `${s.title} ${s.concept} ${s.situation}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section aria-label="Search the game library">
      <div className="library-filters">
        <label>
          Find a dilemma
          <input
            type="search"
            placeholder="Trust, auctions, cooperation…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(18);
            }}
          />
        </label>
        <label>
          Game format
          <select
            value={format}
            onChange={(e) => {
              setFormat(e.target.value);
              setLimit(18);
            }}
          >
            <option value="">All formats</option>
            {Object.entries(formats).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Topic
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setLimit(18);
            }}
          >
            <option value="">All topics</option>
            {[...new Set(scenarios.map((s) => s.category))].sort().map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="library-count">
        <p role="status">
          {filtered.length} experiments found · showing{" "}
          {Math.min(limit, filtered.length)}
        </p>
        <button
          className="text-link"
          onClick={() => {
            setQuery("");
            setFormat("");
            setCategory("");
            setLimit(18);
          }}
        >
          Clear filters
        </button>
      </div>
      <div className="library-index">
        {filtered.slice(0, limit).map((s) => (
          <article key={s.id}>
            <span className="index">
              {String(scenarios.indexOf(s) + 1).padStart(3, "0")}
            </span>
            <div>
              <p className="eyebrow">
                {s.category} / {formats[s.type]}
              </p>
              <h2>
                <Link href={`/games/${s.id}`}>{s.title}</Link>
              </h2>
              <p>{s.concept}</p>
            </div>
            <Link
              className="text-link"
              href={`/games/${s.id}`}
              aria-label={`Play ${s.title}`}
            >
              Play <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-library">
          No matches. Try a broader search or clear the filters.
        </p>
      )}
      {limit < filtered.length && (
        <button
          className="button ink library-more"
          onClick={() => setLimit(limit + 18)}
        >
          Show 18 more experiments ↓
        </button>
      )}
    </section>
  );
}
