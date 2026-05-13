# Stage Prompts

Use these prompts as compact starting points. Adapt them to the current project.

## Seed Project Skeleton

```text
Use grill-driven-spec for a new 0-to-1 project.

Idea: <describe idea here>

Run preflight first:
- check whether this directory is already a git repository
- scan for existing raw source materials such as notes, drafts, PDFs, docs, screenshots, exports, or meeting summaries
- check whether this looks like an empty or unstructured 0-to-1 folder, not an already implemented project
- check whether git, OpenSpec, and Lore are available
- initialize git if available and this is not already a git repository
- do not let missing OpenSpec or Lore block the initial skeleton and grill phase
- do not delete, move, rename, overwrite, or treat raw source materials as confirmed requirements without explicit user approval
- do not ask visual companion, stack, design, or product questions before the skeleton is in place

Create README.md, PRD.md, AGENTS.md, CONTEXT.md, docs/inbox/README.md,
docs/architecture.md, docs/adr/README.md, docs/diagrams/README.md, and docs/ai-tools.md.

README.md should contain only a single H1 using the current directory name.
Keep all other files thin. Use TBD for unknown stack, commands, architecture, or decisions.
Do not write business code, create business directories, invent features, choose a stack, or create an OpenSpec change.

After the skeleton is in place, start grilling me one question at a time.
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

Ask one most important blocking question at a time.
Update PRD.md for product intent, CONTEXT.md for stable domain language,
docs/architecture.md for long-lived architecture knowledge, and docs/adr/ for hard-to-reverse decisions.

Do not continue grilling for non-blocking UI or implementation details such as screen layout,
button labels, component structure, CSS framework, or copy. Put those in design.md or tasks.md later.
When the context is enough for a testable first OpenSpec change, ask me to confirm propose.

Do not write code or create a change until I confirm propose.
```

## Initialize OpenSpec

```text
Confirmed: initialize OpenSpec.

Initialize OpenSpec for this project, but do not create a formal change and do not write business code.

After initialization, verify:
- openspec/ exists
- openspec/specs/ exists
- openspec/changes/ exists
- the selected tool adapter was installed or explicitly skipped
- the OpenSpec CLI can run a basic command

If any part fails, do not call it fully successful.
Explain the exact failure, whether it blocks the next stage, and the concrete command or permission fix the user should run.

If continuing project-local only after a non-blocking global adapter failure, record the limitation in docs/ai-tools.md.
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
