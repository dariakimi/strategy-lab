import Link from "next/link";
import Header from "@/components/Header";
import Matrix from "@/components/Matrix";
import RepeatedGame from "@/components/RepeatedGame";
import Diagram from "@/components/Diagram";
import { games, pathways, notes } from "@/lib/content";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" className="page-shell">
        <Header />
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="red-dash" /> Interactive game theory
              </p>
              <h1 id="hero-title">
                Understand the choices behind <em>every outcome.</em>
              </h1>
              <p className="hero-description">
                Explore the logic of cooperation, competition, bargaining, and
                trust through visual lessons and playable experiments.
              </p>
              <div className="hero-actions">
                <a className="button ink" href="#matrix">
                  Start with the Prisoner’s Dilemma{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <Link className="text-link" href="/games">
                  Play all 147 games <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-footnote">
                <span aria-hidden="true">↳</span> No background needed. Just a
                willingness to choose.
              </div>
            </div>
            <Matrix />
          </section>
          <section className="principles" aria-label="Learning principles">
            {[
              [
                "Learn by choosing",
                "A good question is better when you’re in it.",
              ],
              [
                "See incentives clearly",
                "Look beyond the move. Understand the motive.",
              ],
              [
                "Build strategic intuition",
                "Take a new way of thinking into the world.",
              ],
            ].map(([title, copy], i) => (
              <div key={title}>
                <span className="index">0{i + 1}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </section>
          <section
            id="games"
            className="section-block"
            aria-labelledby="games-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">The foundations</p>
                <h2 id="games-title">
                  Choose a game<span className="red-period">.</span>
                </h2>
              </div>
              <p>
                Small experiments.
                <br />
                Surprisingly big ideas.
              </p>
            </div>
            <div className="games-grid">
              {games.map((game, i) => (
                <article className="game-entry" key={game.id} id={game.id}>
                  <div className="game-top">
                    <span className="eyebrow">Experiment 0{i + 1}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <Diagram kind={game.diagram} />
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <div className="game-meta">
                    <span>{game.players}</span>
                    <span>{game.difficulty}</span>
                    <span>{game.duration}</span>
                  </div>
                  <a className="text-link" href={game.href}>
                    Play the experiment →
                  </a>
                </article>
              ))}
            </div>
          </section>
          <div className="library-invitation">
            <p className="eyebrow">Go beyond the foundations</p>
            <h2>147 situations. A new perspective in every one.</h2>
            <Link className="button ink" href="/games">
              Explore the full game library ↗
            </Link>
          </div>
          <RepeatedGame />
          <section
            className="section-block"
            id="pathways"
            aria-labelledby="pathways-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Find your starting point</p>
                <h2 id="pathways-title">A path for your curiosity.</h2>
              </div>
              <p>
                One field. Many ways in.
                <br />
                Follow the questions that interest you.
              </p>
            </div>
            <div className="pathways">
              {pathways.map((p, i) => (
                <article key={p.title} className={`pathway pathway-${i}`}>
                  <p className="eyebrow">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="path-scope">{p.scope}</span>
                  <a
                    href={p.href}
                    aria-label={`Explore ${p.title}`}
                    className="path-action"
                  >
                    Explore pathway <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section
            className="field-notes section-block"
            id="field-notes"
            aria-labelledby="notes-title"
          >
            <div className="notes-intro">
              <p className="eyebrow">Ideas out in the world</p>
              <h2 id="notes-title">
                Field Notes<span className="red-period">.</span>
              </h2>
              <p>Game theory doesn’t stay on the page. Neither do we.</p>
              <span className="journal-mark" aria-hidden="true">
                SL /<br />
                NOTES
              </span>
            </div>
            <div className="notes-index">
              {notes.map((note, i) => (
                <article key={note.title}>
                  <span className="note-number">0{i + 1}</span>
                  <div>
                    <p className="eyebrow">
                      {note.category} <span>· {note.time}</span>
                    </p>
                    <h3>{note.title}</h3>
                    <p>{note.summary}</p>
                    <details>
                      <summary>
                        Read field note <span aria-hidden="true">↗</span>
                      </summary>
                      <p>{note.body}</p>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section
            className="methodology"
            id="about"
            aria-labelledby="about-title"
          >
            <div>
              <p className="eyebrow">Our approach</p>
              <h2 id="about-title">
                Intuition first.
                <br />
                <em>Terminology second.</em>
              </h2>
              <p>
                You don’t need an economics degree to think strategically. We
                start with a situation you can feel, then give you the language
                to understand it.
              </p>
              <a className="text-link" href="#sources">
                Sources & methodology →
              </a>
            </div>
            <ol>
              {[
                "Face the situation",
                "Make a choice",
                "Observe the outcome",
                "Name the concept",
              ].map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  {step}
                  <span aria-hidden="true">{i === 3 ? "↗" : "↓"}</span>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="reference-section"
            aria-label="Reference and accessibility"
          >
            <details id="glossary">
              <summary>
                Small glossary <span>+</span>
              </summary>
              <dl>
                <dt>Strategy</dt>
                <dd>A plan for what to do in each situation you might face.</dd>
                <dt>Payoff</dt>
                <dd>The value a player receives from an outcome.</dd>
                <dt>Nash equilibrium</dt>
                <dd>
                  A set of strategies where no player benefits by changing their
                  strategy alone.
                </dd>
                <dt>Dominant strategy</dt>
                <dd>
                  A strategy that does at least as well as alternatives,
                  whatever others do.
                </dd>
              </dl>
            </details>
            <details id="accessibility">
              <summary>
                Accessibility <span>+</span>
              </summary>
              <p>
                Use Tab to move through links and controls, and Enter or Space
                to choose a move. Outcomes are announced to screen readers.
                Scores, move names, and check marks communicate results without
                relying on color. The site respects reduced-motion preferences
                and supports browser zoom.
              </p>
            </details>
            <details id="sources">
              <summary>
                Sources & methodology <span>+</span>
              </summary>
              <p>
                These simplified models teach incentives, not predictions of how
                every person behaves. Points are illustrative utilities. The
                one-shot opponent is random; the repeated opponent follows a
                deterministic rule. The shorter reading scopes are self-paced
                estimates.
              </p>
              <ul>
                <li>
                  <a href="https://oyc.yale.edu/economics/econ-159">
                    Yale Open Courses: Game Theory, Ben Polak
                  </a>
                </li>
                <li>
                  <a href="https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/">
                    Elinor Ostrom: governance of shared resources
                  </a>
                </li>
                <li>
                  <a href="https://www.nobelprize.org/prizes/economic-sciences/2020/press-release/">
                    The Nobel Prize: auction theory and auction formats
                  </a>
                </li>
              </ul>
            </details>
          </section>
        </main>
        <footer>
          <div className="footer-top">
            <div>
              <a className="wordmark" href="#top">
                Strategy Lab<span className="brand-period">.</span>
              </a>
              <p>
                A place to think through the choices
                <br />
                that shape our shared world.
              </p>
            </div>
            <nav aria-label="Footer learning links">
              <a href="#learn">Learn</a>
              <Link href="/games">Game index</Link>
              <a href="#pathways">Pathways</a>
              <a href="#field-notes">Field Notes</a>
            </nav>
            <nav aria-label="Footer reference links">
              <a href="#about">About the lab</a>
              <a href="#glossary">Glossary</a>
              <a href="#accessibility">Accessibility</a>
              <a href="#sources">Sources & methodology</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Strategy Lab · An independent learning project</span>
            <span>
              Made for curious minds.{" "}
              <a href="https://github.com/dariakimi/strategy-lab">GitHub ↗</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
