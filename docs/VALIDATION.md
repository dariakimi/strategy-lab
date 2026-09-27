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

## Game library expansion — 2026-09-27

- `npm run lint`: passed (internal-link lint errors corrected before final run).
- `npm test`: 11 passing tests, including all 147 records, Nash equilibria,
  prison sentences, bargaining boundaries, every sequential schedule, all eight
  repeated strategies, and finite-round termination.
- `npm run build`: passed; 147 scenario pages statically generated.
- `npm run start -- --port 3001`: production application started successfully.
- Browser: search, reset filters, format filter (35 repeated), and pagination
  (18 to 36) verified. Played matrix/restart, bargaining acceptance/rejection,
  sequential pass/take with both payouts, ten-round Tit for Tat to completion,
  and five-round homepage lesson to completion. Verified first-round cooperation,
  second-round retaliation, and disabled choices at completion.
- Keyboard: mobile menu opened with Enter and closed with Escape; focus returned
  to the toggle with a visible 3px outline. Range input operated with keyboard.
- Library checked at 1440, 1024, 768, and 390px without horizontal page overflow;
  mobile repeated player and homepage also checked. Matrix/history tables use
  contained horizontal scrolling. Outcomes have semantic status live regions.
- Reduced-motion CSS removes animation, transitions, and smooth scrolling;
  new game mechanics have no animation or timing dependency.
- Browser console had no errors or warnings in the tested local application.
- Screenshots: `docs/screenshots/library-desktop-1440.jpg` and
  `docs/screenshots/library-mobile-390.jpg`.

## Real-life scenarios and continuous play — 2026-09-27

- Re-read the public Game Theory Arena page and included all 80 public records,
  adding 30 missing scenarios. Catalogue now contains 177 unique routes. Public
  situations and available choices are retained, with clearer action names where
  the source used generic terms. The prison deal retains the requested sentences.
- Removed search and format/topic dropdowns. Real-life decisions lead the list.
- Added Previous game / Next game above the player, Next game below it, and
  a React key that resets player state across same-format navigation.
- `npm run lint`, `npm test` (12 tests), `npm run build`: passed.
- Production browser on port 3002: played salary-opening signal, navigated with
  keyboard Next game to Job Market Signaling, verified fresh state/enabled
  choices; checked zero filter inputs and real-life first entry.
- Repeated game: concrete patrol/skip buttons, opponent policy, live feedback,
  and ten-row history verified. First-round cooperation and subsequent copying
  confirmed; choices disabled after ten rounds. Sequential concrete actions
  correctly awarded both final shares. Homepage sentence game and five-round
  patrol lesson also passed; mobile menu Enter/Escape restored visible focus.
- Checked 390, 768, 1024, 1440px layouts without page overflow. Wide matrices
  scroll inside their labeled container. Existing reduced-motion rules remain
  applicable; interactions do not depend on motion. No browser console errors.
- New screenshots: real-life-desktop-1440.jpg and real-life-mobile-390.jpg.
