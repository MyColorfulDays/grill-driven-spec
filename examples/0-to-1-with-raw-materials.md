# 0-to-1 With Raw Materials

Use this scenario to test a new project folder that is not empty, but does not yet contain a
coherent project skeleton or implementation.

## Setup

Create an otherwise empty folder with raw source materials, for example:

```text
idea-notes.md
meeting-notes.md
screenshots/
exports/
```

Then run:

```text
/grill-driven-spec I want to build <project idea>
```

## Expected Behavior

- The agent treats the folder as a 0-to-1 candidate, not as Existing Project Adoption.
- The agent makes each workflow transition visually obvious with a large Markdown `Driving` heading.
- The agent does not delete, move, rename, overwrite, or destructively summarize raw source files.
- The agent initializes git when available and creates the thin Stage 0 skeleton.
- `PRD.md` records raw source paths under `Raw Sources`.
- Clearly stated facts may be copied into `PRD.md`, but inferred requirements stay under `Open Questions`.
- `Confirmed Requirements` stays empty until the user confirms requirements during grill-me.
- The agent enters grill-me after the skeleton exists, passing the PRD/OpenSpec convergence contract instead of copying grill-me's internal rules.
- Before development, the agent asks a compact greenfield readiness question for blocking technical/UI choices or asks the user to authorize conservative defaults.

## Regression Risks

- Treating raw notes as confirmed product requirements.
- Asking product, stack, or design questions before creating the skeleton.
- Moving raw files into `docs/inbox/` without explicit approval.
- Over-summarizing large source materials during Stage 0.
- Passing review and prompting development while stack, runtime, persistence, sensitive-data handling, or verification choices are still blocking TBDs.
