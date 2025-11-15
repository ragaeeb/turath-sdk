# turath-sdk Contributor Notes

- Use **Bun** for dependency management (`bun install --frozen-lockfile`) and tasks (`bun run build`, `bun run lint`, `bun run test`, `bun run e2e`).
- All formatting and linting is enforced with **Biome**. Run `bun run lint` locally before committing and do not introduce alternative tooling.
- Source files use **TypeScript** with 4-space indentation and a maximum line width of 120 characters. Prefer named exports and keep JSDoc comments up to date.
- Bundling is handled via **tsdown**. The published entry point is `src/index.ts`; ensure changes continue to build with `bun run build`.
- Tests use `bun:test`. Unit tests reside in `src`, while E2E tests live under `testing/`. Mock utilities via `bun:test`'s `mock.module` helpers when necessary.
- Keep documentation aligned with the public API surface (`README.md`) and describe any new exports you add.
