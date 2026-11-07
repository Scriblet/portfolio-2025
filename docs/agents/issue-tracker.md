# Issue tracker: Local Markdown

Issues and PRDs for this repo live as markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/` **or** `.scratch/<category>/<feature-slug>/` (category grouping: `01-tecnicos`, `02-ux`, `03-features`, `04-secoes`)
- The PRD is `.scratch/<feature-slug>/PRD.md` (or under category subfolder)
- Implementation issues are `.scratch/<feature-slug>/issues/<NN>-<slug>.md` (or under category), numbered from `01`
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<feature-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.
