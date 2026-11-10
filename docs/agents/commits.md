# Commits: Conventional Commits v1.0.0

This repo follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
Every commit message MUST match the format below. The rule is enforced locally by
`.githooks/commit-msg` (enabled via `git config core.hooksPath .githooks`, which the
`prepare` npm script sets on install).

## Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- **type**: one of the allowed types below (lowercase).
- **scope**: optional, lowercase, names the area touched (e.g. `data`, `contact`, `seo`, `theme`, `agents`).
- **!**: marks a breaking change; also add a `BREAKING CHANGE:` footer explaining it.
- **description**: imperative, present tense, no trailing period, max 100 characters.
- **body**: optional, wrapped at ~72 characters, explains *what* and *why* (not how).
- **footer(s)**: optional; `BREAKING CHANGE: ...`, `Refs: #123`, `Co-authored-by: ...`.

## Allowed types

| Type | Use for |
|---|---|
| `feat` | a new feature or capability |
| `fix` | a bug fix |
| `docs` | documentation only |
| `style` | formatting/whitespace, no code behavior change |
| `refactor` | code change that neither fixes a bug nor adds a feature |
| `perf` | performance improvement |
| `test` | adding or fixing tests |
| `build` | build system, dependencies, bundler, CI artifacts |
| `ci` | CI configuration and scripts |
| `chore` | maintenance that does not fit the others |
| `revert` | reverting a previous commit |

## Examples

```
feat(data): add typed content layer for portfolio sections
fix(theme): raise secondary text contrast
feat(contact)!: move contact submission to a server-side endpoint

BREAKING CHANGE: the client no longer posts to the Discord webhook directly.
Set DISCORD_WEBHOOK_URL in the Netlify environment before deploying.
```

```
docs(agents): document conventional commits convention

Refs: .scratch/01-tecnicos/seguranca-contato/PRD.md
```

## Rules of thumb

- One logical change per commit; do not mix unrelated areas.
- Prefer a scope when the repo has a clear area (`data`, `contact`, `seo`, `theme`, `ux`, `e2e`).
- Use `!` + `BREAKING CHANGE:` whenever a deploy, env var, or public contract changes.
- Never use vague descriptions (`update files`, `fix stuff`, `wip`).
- Merge, revert, `fixup!` and `squash!` commits are exempt from the header check.

## Validate manually

```bash
node .githooks/commit-msg.js <path-to-message-file>
```

Git passes the message file automatically when committing.
