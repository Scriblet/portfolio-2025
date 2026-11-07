## Agent skills

### Issue tracker

Local markdown — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) with default strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

### Commits

[Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) — `<type>(<scope>): <description>`, with `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`; use `!` + `BREAKING CHANGE:` for breaking changes. Enforced by `.githooks/commit-msg` (enabled with `git config core.hooksPath .githooks`, also run by the `prepare` npm script). See `docs/agents/commits.md`.
