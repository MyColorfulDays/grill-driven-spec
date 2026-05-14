# Stage Prompts

Use these prompts as compact starting points. Adapt them to the current project.

When entering a new workflow stage or adoption phase, print a large Markdown heading first:

```markdown
# Stage <number>: <short stage name>

Current gate: <one sentence describing what must happen before the next stage>.
```

For adoption, use `# Adoption: <short phase name>`.

## Adopt Existing Project

```text
Use grill-driven-spec to adopt this existing implemented project.

Run adoption preflight first:
- check repository status and current branch
- identify main source, test, config, and documentation locations
- inspect package manifests, build scripts, CI, deploy config, and environment examples
- check whether README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/ already exist
- identify obvious product surfaces, core workflows, and domain terms from code or docs
- check whether grill-me, grill-with-docs, OpenSpec, git, and Lore are available when relevant
- verify dependency identity before installing anything: grill-me and grill-with-docs come from https://github.com/mattpocock/skills, OpenSpec comes from https://github.com/Fission-AI/OpenSpec, Lore comes from https://github.com/Ian-stetsenko/lore-protocol, and git is the system Git CLI

Do not run the 0-to-1 skeleton flow.
Do not overwrite existing docs with thin starter files.
Do not treat undocumented code behavior as desired behavior until I confirm it.
Do not refactor, redesign, migrate, implement, or create a new OpenSpec change during adoption.
Do not pretend to invoke a missing grill or OpenSpec dependency.
Do not guess package names or install similarly named tools when a dependency is missing.
Use only the documented dependency install sources, and ask the user before substituting another source.

Create or refresh only missing or clearly thin guidance files such as AGENTS.md, CONTEXT.md,
SECURITY.md, docs/architecture.md, docs/ai-tools.md, docs/adr/README.md, and docs/diagrams/README.md.

Use Observed, Confirmed, and Open Questions language where useful.
After the baseline is in place, ask me one blocking adoption question at a time to separate desired
behavior from legacy or accidental behavior.
```

## Seed Project Skeleton

```text
Use grill-driven-spec for a new 0-to-1 project.

Idea: <describe idea here>

Run preflight first:
- check whether this directory is already a git repository
- scan for existing raw source materials such as notes, drafts, PDFs, docs, screenshots, exports, or meeting summaries
- check whether this looks like an empty or unstructured 0-to-1 folder, not an already implemented project
- check whether grill-me, grill-with-docs, OpenSpec, git, and Lore are available
- verify dependency identity before installing anything: grill-me and grill-with-docs come from https://github.com/mattpocock/skills, OpenSpec comes from https://github.com/Fission-AI/OpenSpec, Lore comes from https://github.com/Ian-stetsenko/lore-protocol, and git is the system Git CLI
- initialize git if available and this is not already a git repository
- do not let missing OpenSpec or Lore block the initial skeleton and grill phase
- do not pretend to invoke missing grill-me, grill-with-docs, or OpenSpec dependencies
- do not guess package names or install similarly named tools when a dependency is missing
- use only the documented dependency install sources, and ask the user before substituting another source
- do not delete, move, rename, overwrite, or treat raw source materials as confirmed requirements without explicit user approval
- if raw source materials exist, list their paths in PRD.md under Raw Sources before grilling
- only copy clearly stated facts into PRD.md; put interpretations, conflicts, or suspected requirements under Open Questions
- do not ask visual companion, stack, design, or product questions before the skeleton is in place

Create README.md, PRD.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/inbox/README.md,
docs/architecture.md, docs/adr/README.md, docs/diagrams/README.md, and docs/ai-tools.md.

README.md should contain only a single H1 using the current directory name.
Keep all other files thin. Use TBD for unknown stack, commands, architecture, or decisions.
Do not write business code, create business directories, invent features, choose a stack, or create an OpenSpec change.

After the skeleton is in place, start grilling me one question at a time.
```

## grill-me

```text
Use grill-me to clarify PRD.md.

Invoke grill-me with this contract:
- goal: clarify enough product intent for the first OpenSpec change
- primary write target: PRD.md
- stop condition: MVP boundary, non-goals, and testable core behavior are clear
- constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements

After each important answer, update PRD.md.
Put uncertain content under open questions. Put confirmed exclusions under non-goals.
Do not write code or create an OpenSpec change.
```

## grill-with-docs

```text
Use grill-with-docs to review PRD.md, AGENTS.md, CONTEXT.md, docs/, and openspec/.

Invoke grill-with-docs with this contract:
- goal: fill only the context needed for the first OpenSpec proposal
- inputs: PRD.md, AGENTS.md, CONTEXT.md, docs/, openspec/
- write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, docs/inbox/
- question focus: only questions that block a testable first OpenSpec change, including technical choices that directly affect the first implementation slice
- stop condition: enough project context exists to propose the first OpenSpec change
- constraints: do not continue grilling for non-blocking UI or implementation details, do not write code, and do not create a change until I confirm propose

Update PRD.md for product intent, CONTEXT.md for stable domain language,
docs/architecture.md for long-lived architecture knowledge, and docs/adr/ for hard-to-reverse decisions.

Do not continue grilling for non-blocking UI or implementation details such as screen layout,
button labels, component structure, CSS framework, or copy. Put those in design.md or tasks.md later.
Do ask or record one technical readiness question when stack, runtime, persistence, security/data
handling, integrations, local verification, or deployment target would block safe implementation.
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
In design.md, include Technical Approach with confirmed choices, proposed defaults awaiting approval,
and technical open questions for stack/runtime, persistence, sensitive-data handling, integrations,
local verification, and deployment when relevant.
Do not implement.
```

## Review Before Development

```text
Review the current OpenSpec change before development.

Check proposal vs PRD.md, testability of specs, unconfirmed assumptions in design,
technical readiness for implementation, task size and order, and missing tests/docs/CI.
Review must fail if required stack/runtime, persistence, security/data handling, integrations,
local verification, or deployment choices are still TBD and not explicitly delegated to the agent.
If unclear, return to grill and update the relevant files. Do not code.
```

## Start Development

```text
Confirmed: begin development.

Follow tasks.md in order. Prefer TDD for behavior changes.
Update tasks.md as work completes.
If resuming after an interruption, first read tasks.md, test/lint/build status, dev server state, git status, and known blockers.
Continue from the first incomplete or failed task instead of restarting completed work.
If requirements or design conflict with reality, pause and update PRD.md, design.md, or tasks.md before continuing.
```

## Verification

```text
Tell me how to verify the MVP.

Include startup commands, core flows, MVP behaviors, explicit non-goals, test status, and known limitations.
Do not claim browser or manual verification passed unless it actually ran and passed.
If local browser automation, network, sandbox, or server issues block verification, leave the task unchecked and ask me to verify the listed flows.
```

## Sync and Archive

```text
Before archiving, check tasks, tests/lint/build, README.md, PRD.md, CONTEXT.md, docs/, openspec/specs/,
and unresolved open questions or ADRs.

If checks pass and user verification passed, sync specs and archive the change.
If the archive tool creates a date-stamped directory that differs from the session date, report it and keep the tool-generated name.
```
