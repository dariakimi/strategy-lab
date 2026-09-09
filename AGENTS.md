# Strategy Lab development

- Work in this independent Next.js repository. Use npm and retain package-lock.json.
- Keep game rules pure in src/lib/game.ts; UI belongs in focused client components.
- Store repeated editorial content in typed arrays in src/lib/content.ts.
- Use semantic HTML, descriptive anchors, real buttons, table headers, live outcomes, and visible focus. Never rely on color alone.
- Keep palette values in semantic CSS properties. Use next/font and code-native diagrams; avoid heavy UI or animation libraries.
- Run npm run lint, npm test, and npm run build. Validate production in a browser at 1440, 1024, 768, and 390px; test keyboard navigation, both games, overflow, and reduced motion.
- Save review screenshots in docs/screenshots. Never commit node_modules, .next, credentials, or temporary browser output.
