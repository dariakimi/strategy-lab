# Validation record

Validated against the production Next.js application on 2026-09-09.

## Commands

- ✅ `npm run lint` — no warnings or errors.
- ✅ `npm test` — four tests pass: all point payoffs, deterministic Tit for Tat behavior, cooperation totals and immutability, and all four police-deal sentences with explanations.
- ✅ `npm run build` — optimized build and TypeScript checking pass, including locally generated social images.
- ✅ `npm run start -- --hostname 127.0.0.1` — production server starts successfully.
- ✅ `curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000` — HTTP 200.
- ✅ `curl -fsS http://127.0.0.1:3000/opengraph-image -o docs/social-preview.png` — local PNG generated successfully.
- ✅ `git diff --check` and `git diff --cached --check` — no whitespace errors.
- ✅ Staged-file review — no dependencies, build output, environment files, credentials, or temporary test captures staged.

Early linting exposed random-number handling that confused the purity rule; randomness now occurs through the browser crypto API in the event handler. Early TypeScript validation required `allowImportingTsExtensions` for native Node tests; that option is enabled with noEmit. The test runner module warning was fixed by declaring the package as ESM. An early social metadata warning was fixed with an explicit local metadata base, configurable through SITE_URL. All final commands above pass.

## Real-browser checks

Browser tests used the Codex browser API against the production server, not a development build.

- Desktop: 1440 × 1000; laptop: 1024 × 900; tablet: 768 × 1024; mobile: 390 × 844.
- At every width, `document.documentElement.scrollWidth === innerWidth`. The final sentence-based matrix was rechecked at all four widths.
- Both one-shot choices produce a selected cell with a check mark, both prison sentences, and a plain-language explanation. Reset restores the initial state. Keyboard Enter activates choices.
- Sentence matrix: silent/silent = 1/1; silent/confess = 5/0; confess/silent = 0/5; confess/confess = 3/3. Lower is better. The separate repeated game explicitly labels its values as points, where higher is better.
- Repeated-game manual sequence: Defect, Cooperate, Cooperate, Defect, Cooperate. Opponent: Cooperate, Defect, Cooperate, Cooperate, Defect. Final totals: 13/13. Both move buttons disabled after round five. Restart restores 0/0 and round one.
- Mobile menu: Enter opens; Tab reaches Learn; focus outline is visible; Escape closes and returns focus to the menu toggle. aria-expanded tracks the state and aria-controls names the navigation.
- Two polite, atomic live regions contain meaningful outcome messages. Matrix row/column headers, captions, move names, and selected check marks are exposed in the accessibility tree.
- No broken in-page anchors. Expanded Ultimatum reading content works and remains within the viewport.
- Browser console: no warnings or errors.
- CSS reduced-motion media rule verified in the loaded stylesheet: smooth scrolling, transitions, and hover movement are disabled. No game behavior depends on animation. An OS-level reduced-motion toggle and spoken screen-reader output were not exercised.
- Calculated text contrast: ink/paper 14.55:1; muted/paper 5.76:1; dark red/paper 5.24:1; light text/green button 5.72:1; muted light text/dark panel 7.58:1. All exceed AA normal-text contrast.

## Review artifacts

- `screenshots/desktop-1440.jpg` — final desktop first viewport.
- `screenshots/mobile-390.jpg` — final mobile first viewport.
- `social-preview.png` — locally generated 1200 × 630 sharing image.

Viewport screenshots are used because the browser’s full-page stitching produced duplicated sections. Those temporary stitched captures are not included.
