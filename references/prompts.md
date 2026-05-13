# Stage Prompts

Use these prompts as compact starting points. Adapt them to the current project.

## Seed Project Skeleton

```text
Please initialize the current empty project with a minimal grill-driven spec skeleton.

Create README.md, PRD.md, AGENTS.md, CONTEXT.md, docs/inbox/README.md,
docs/architecture.md, docs/adr/README.md, docs/diagrams/README.md, and docs/ai-tools.md.

Keep all files thin. Use TBD for unknown stack, commands, architecture, or decisions.
Do not write business code, create business directories, invent features, or create an OpenSpec change.
```

## grill-me

```text
Use grill-me to clarify PRD.md.

Ask one most important question at a time. Give your recommended answer and reason.
After each important answer, update PRD.md.
Put uncertain content under open questions. Put confirmed exclusions under non-goals.
Do not write code or create an OpenSpec change.
```

## grill-with-docs

```text
Use grill-with-docs to review PRD.md, AGENTS.md, CONTEXT.md, docs/, and openspec/.

Ask one most important question at a time.
Update PRD.md for product intent, CONTEXT.md for stable domain language,
docs/architecture.md for long-lived architecture knowledge, and docs/adr/ for hard-to-reverse decisions.
Do not write code or create a change until I confirm propose.
```

## Create OpenSpec Change

```text
Confirmed: enter OpenSpec propose.

Create the first OpenSpec change from PRD.md, CONTEXT.md, docs/, and the grill results.
Write proposal.md, specs/, design.md, and tasks.md.
Include implementation, tests, docs, CI, TDD, and lightweight DDD tasks where relevant.
Do not implement.
```

## Review Before Development

```text
Review the current OpenSpec change before development.

Check proposal vs PRD.md, testability of specs, unconfirmed assumptions in design,
task size and order, and missing tests/docs/CI.
If unclear, return to grill and update the relevant files. Do not code.
```

## Start Development

```text
Confirmed: begin development.

Follow tasks.md in order. Prefer TDD for behavior changes.
Update tasks.md as work completes.
If requirements or design conflict with reality, pause and update PRD.md, design.md, or tasks.md before continuing.
```

## Verification

```text
Tell me how to verify the MVP.

Include startup commands, core flows, MVP behaviors, explicit non-goals, test status, and known limitations.
```

## Sync and Archive

```text
Before archiving, check tasks, tests/lint/build, README.md, PRD.md, CONTEXT.md, docs/, openspec/specs/,
and unresolved open questions or ADRs.

If checks pass and user verification passed, sync specs and archive the change.
```
