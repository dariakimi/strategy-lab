# Strategy Lab

An independent editorial and interactive game-theory learning platform. Learn the logic of cooperation, competition, bargaining, and trust by making choices and observing their consequences.

Repository: https://github.com/dariakimi/strategy-lab

## Product and design

Warm ivory paper, dark green-black ink, signal-red accents, fine rules, and code-native strategic diagrams. Instrument Serif provides the editorial display voice; DM Sans handles reading and navigation; DM Mono distinguishes scores and annotations. All fonts are managed and self-hosted by `next/font` after build. Semantic CSS variables centralize the palette. Layouts change at desktop, tablet, and phone widths, including compact illustrated game rows on phones.

The homepage includes a playable one-shot Prisoner’s Dilemma, a five-round Tit for Tat experiment, four foundational game introductions, four pathways, three expandable Field Notes, a methodology sequence, a glossary, and accessibility information. The three additional game introductions are reading experiments with thought questions, not separate simulations. Pathways link to available content; they do not promise unimplemented courses.

## Technology

- Next.js 16.3.4, App Router, TypeScript, React 19.2.8
- npm and a committed package-lock.json
- ESLint with Next.js rules
- Node’s built-in test runner; no extra test framework
- Semantic HTML, organized global CSS, SVG diagrams
- No database, authentication, runtime remote API, UI framework, or animation dependency

Use Node.js 24 or later for native TypeScript test execution. The app itself follows Next.js’s supported Node requirements.

## Install and run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Fonts are fetched at build time; installed dependencies and a completed production build require no remote API at runtime.

```sh
npm run lint
npm test
npm run build
npm run start -- --hostname 127.0.0.1
```

The production server listens on http://127.0.0.1:3000. Stop it with Ctrl+C. `npm test` covers every payoff, first-round cooperation, previous-move copying, cumulative scores, input immutability, and the five-round cap. Browser checks are documented in `docs/VALIDATION.md`.

## Structure

```text
src/app/page.tsx                Homepage and editorial sections
src/app/layout.tsx              Fonts, metadata, viewport
src/app/globals.css             Semantic tokens, layout, responsive states
src/app/icon.svg                Code-native favicon
src/app/opengraph-image.tsx     Locally rendered social-preview image
src/app/twitter-image.tsx       Matching Twitter preview
src/components/Header.tsx       Accessible mobile navigation
src/components/Matrix.tsx       One-shot playable matrix
src/components/RepeatedGame.tsx Five-round lesson and history
src/components/Diagram.tsx      Accessible strategic SVG figures
src/lib/game.ts                 Pure payoff and Tit for Tat rules
src/lib/game.test.ts            Deterministic unit tests
src/lib/content.ts              Typed game, pathway, and article content
docs/screenshots/              Desktop and mobile review images
```

## Rules and payoffs

### The police deal: prison years

The one-shot Prisoner’s Dilemma uses prison sentences, where lower is better. Cooperate means stay silent; Defect means confess and betray the other prisoner. Both silent: 1 year each. Both confess: 3 years each. If only one confesses, that prisoner goes free (0 years) and the silent prisoner receives 5 years. Every matrix cell lists your years first, then theirs.

### Repeated experiment: utility points

The separate Tit for Tat lesson uses the following abstract point payoffs, where higher is better. These points are not prison sentences.

Scores in the repeated lesson are illustrative utility points, not money.

| Your move | Their move | You | Them |
| --------- | ---------- | --: | ---: |
| Cooperate | Cooperate  |   3 |    3 |
| Cooperate | Defect     |   0 |    5 |
| Defect    | Cooperate  |   5 |    0 |
| Defect    | Defect     |   1 |    1 |

The one-shot opponent independently chooses each move with equal probability using browser randomness. Reset clears the result; either choice also replays immediately.

Tit for Tat cooperates in round one, then copies your previous move. Each round adds both players’ points. Choices are disabled after round five; restart clears the history and totals. Mutual cooperation earns 15 each. The final explanation distinguishes short-term advantage, retaliation, forgiveness, and the limitation of a known final round. This illustrates one rule, not a claim that Tit for Tat is universally optimal.

## Accessibility expectations

Preserve semantic landmarks, one h1, properly scoped table headers and captions, visible-on-focus skip navigation, real buttons, explicit move names, selected outcome check marks, and polite atomic live regions. Mobile navigation supports Enter/Space, Tab, and Escape with focus returned to its toggle. Expanded content uses native details/summary. Core controls are at least 44px high. Text uses high-contrast ink, muted green, or a darker red; bright signal red is decorative. The dark lesson uses a light focus outline.

Respect `prefers-reduced-motion`: disable transitions and smooth scrolling. Confirm full functionality with keyboard and at 200% zoom. Test 1440, 1024, 768, and 390px viewports and check for horizontal overflow, including expanded content and completed games. Automated checks do not replace assistive-technology testing.

## Metadata and social preview

The exact title and description are configured in the layout. The social image is rendered locally by Next.js at `/opengraph-image`, with a matching Twitter image. The generated PNG is also saved in `docs/social-preview.png` for review. No external image service is used.

Set `SITE_URL` to the actual origin when deploying. The default is the local development origin `http://localhost:3000`; it only resolves social-image metadata. No production URL or canonical URL is assumed. Do not set `SITE_URL` to the GitHub repository URL.

## Deployment options

Deploy the repository to a Next.js-compatible host such as Vercel, or run `npm ci`, `npm run build`, and `npm start` on a Node host behind HTTPS. Set `SITE_URL` before building to publish absolute social-image URLs. No secrets are required. This repository does not assume an existing production deployment.

A static export is also possible by setting `output: "export"` in next.config.ts and serving `out/`; test the metadata image routes and host base path when adopting this option. GitHub Pages does not run a Next.js server, so it requires that export setup and an appropriate Pages workflow. The default implementation uses the standard Next.js production server.

## Sources

- Yale Open Courses, Ben Polak: https://oyc.yale.edu/economics/econ-159
- Nobel Prize, Elinor Ostrom and shared-resource governance: https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/
- Nobel Prize, auction theory: https://www.nobelprize.org/prizes/economic-sciences/2020/press-release/

The learning sequence is situation → choice → outcome → concept. Reading and experiment durations are approximate and include reflection.
