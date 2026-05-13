---
name: grill-driven-spec
description: Use when starting a new project or feature from a vague idea and the user wants AI-led requirement clarification, PRD/docs updates, and OpenSpec proposal/spec/task workflow before coding. Trigger when the user mentions grill-driven spec, grill-to-OpenSpec, PRD plus OpenSpec, from 0 to 1 project setup, or asks to clarify requirements before implementation.
---

# Grill Driven Spec

Use this skill to act as a stage-gated product/spec lead for AI-assisted development.

The core rule:

```text
grill first, spec second, code last
```

The user expresses ideas and confirms phase transitions. You ask focused questions, update project documents, decide whether the current phase is ready to advance, and explicitly ask for confirmation before crossing major gates.

## Stage Gates

Follow these gates in order unless the project already has later-stage artifacts.

### 0. Preflight and Seed the Project Skeleton

For a 0-to-1 entry such as:

```text
/grill-driven-spec I want to build <project idea>
```

first run a small preflight before asking product questions.

Stage 0 must run before any optional companion, mockup, brainstorming, stack-selection, product-clarification, or design question. For a 0-to-1 entry, the expected first action is to inspect the folder, initialize git if needed, and create or update the minimal project skeleton.

Ask before Stage 0 only when continuing would risk data loss, overwrite a meaningful existing file, require user approval for a privileged install, or when the folder is clearly an existing implemented project rather than a 0-to-1 or unstructured project folder.

Check:

```text
current directory name
whether the directory is already a git repository
whether README.md, PRD.md, AGENTS.md, CONTEXT.md, docs/, or openspec/ already exist
raw source materials such as notes, drafts, meeting summaries, exports, screenshots, PDFs, or docs
signals that this is already an implemented project rather than a 0-to-1 folder
git availability
OpenSpec availability
Lore availability, if commits are expected
```

Dependency rules:

```text
git is required before initializing the repository or committing
OpenSpec is required before Stage 2 initializes OpenSpec or Stage 4 creates a change
Lore is recommended before committing workflow, docs, or spec decisions, but it must not block initial grilling
```

If `git` is available and the current directory is not a git repository, initialize it with `git init`.

If `git` is missing, tell the user it must be installed before repository initialization or commits, then continue only with file work if the environment allows it.

If OpenSpec is missing, do not create an OpenSpec change. Install it or ask the user to install it before Stage 2.

If Lore is missing, install it or ask the user to install it before creating Lore-managed commits. Do not delay Stage 0 or Stage 1 just because Lore is unavailable.

0-to-1 does not require a perfectly empty directory. A folder with raw source materials is still a 0-to-1 candidate if it does not already have a coherent project skeleton.

Treat existing raw materials as inbox sources:

```text
do not delete, move, rename, summarize destructively, or overwrite user files without explicit approval
do not treat raw materials as confirmed requirements
record their paths as raw sources or open questions where useful
distill only clearly stated facts, and keep uncertain interpretations under Open Questions
ask the user to confirm important requirements before marking them confirmed
```

If the folder already contains meaningful implementation artifacts, such as a source tree, package manifest, application config, or existing product docs, pause and tell the user this appears closer to Existing Project Adoption than 0-to-1. Recommend the adoption flow instead of overwriting the project with a new skeleton.

Create or update the minimum project context:

```text
README.md
PRD.md
AGENTS.md
CONTEXT.md
docs/inbox/README.md
docs/architecture.md
docs/adr/README.md
docs/diagrams/README.md
docs/ai-tools.md
```

README.md should contain only a single H1 using the current directory name.

Keep all other files thin. Use `TBD` for unknown commands, stack, architecture, or decisions. Do not invent product scope, product features, technical stack, business rules, architecture, user personas, or implementation directories.

For empty or unstructured projects, create basic files first, then immediately enter grilling. Do not ask setup, visual companion, stack, design, or product questions before creating the skeleton.

Gate prompt to user:

```text
Initial files are in place. The PRD is still too thin for an OpenSpec change.
Next I recommend grill-me: I will ask one question at a time and update PRD.md after each important answer.
```

### 1. Clarify Product Intent With grill-me

Ask one important question at a time. Prefer questions that shrink MVP scope, identify first users, define success, or expose non-goals.

After each important answer, update `PRD.md`.

Do not create an OpenSpec change yet.

Advance only when:

```text
MVP boundary is clear
non-goals are recorded
core behavior can become testable requirements
remaining unknowns do not block the first change
```

### 2. Initialize OpenSpec

Initialize OpenSpec early so the project can track specs and changes.

OpenSpec initialization is not complete until the agent verifies the install result.

Verify:

```text
openspec/ exists
openspec/specs/ exists
openspec/changes/ exists
the selected tool adapter was installed or intentionally skipped
the OpenSpec CLI can run a basic command after initialization
```

If OpenSpec initialization partially fails, do not treat it as a clean success. Classify the failure:

```text
project-local OpenSpec structure missing -> blocking; fix before continuing
selected tool adapter failed to install -> blocking for that tool; guide the user to fix or explicitly continue without the adapter
global prompt/config write failed -> explain the exact path and permission issue; give the user the command or permission change needed; ask whether to retry, skip global install, or continue project-local only
```

When continuing after a non-blocking OpenSpec issue, record the limitation in `docs/ai-tools.md` and tell the user what will not work until it is fixed.

Do not create a formal change until the user confirms propose.

Gate prompt to user:

```text
OpenSpec is initialized and verified. Next I recommend grill-with-docs to fill CONTEXT.md and docs/ from the clarified PRD before creating the first change.
```

### 3. Fill Project Context With grill-with-docs

Read `PRD.md`, `AGENTS.md`, `CONTEXT.md`, `docs/`, and `openspec/`.

Ask one question at a time. Update:

```text
PRD.md for product intent
CONTEXT.md for stable domain language
docs/architecture.md for long-lived architecture knowledge
docs/adr/ for hard-to-reverse decisions with real tradeoffs
docs/inbox/ for raw stakeholder materials
```

Stage 3 is a context pass, not a full product-design interview. Ask only questions that block a testable first OpenSpec change.

Examples of blocking Stage 3 questions:

```text
canonical domain terms or names
data lifecycle rules
important business rules
hard technical constraints
security, privacy, or data-handling constraints
choices that would cause a hard-to-reverse architecture decision
```

Examples that should usually move to `design.md` or `tasks.md` instead of more grilling:

```text
screen layout
button labels
component structure
CSS framework
minor UI copy
default implementation details with low reversibility cost
```

Advance as soon as the project context is sufficient to create a first OpenSpec change. When only non-blocking UI or implementation details remain, stop grilling and ask the user to confirm entering propose.

If blocked, name exactly one blocking question and continue grilling.

### 4. Create the OpenSpec Proposal

Only after user confirmation, create:

```text
openspec/changes/<change-name>/proposal.md
openspec/changes/<change-name>/specs/
openspec/changes/<change-name>/design.md
openspec/changes/<change-name>/tasks.md
```

Requirements:

```text
proposal.md explains why, what, and non-goals
specs/ describe testable behavior, not implementation details
design.md records technical approach, constraints, risks, and open questions
tasks.md includes implementation, tests, docs, CI, TDD, and lightweight DDD tasks where relevant
```

Do not implement after creating the change.

### 5. Review Before Development

Review the new change before coding. Check:

```text
proposal matches PRD.md
specs are testable
design does not depend on unconfirmed assumptions
tasks are executable and ordered
tests, docs, and CI are represented
MVP is not too large
```

If anything is unclear, return to grill-me or grill-with-docs, update the relevant files, and review again.

Gate prompt to user:

```text
Review passed. Specs are testable and tasks are executable.
I recommend entering development and test. I will follow tasks.md and pause if design or requirements conflict with reality.
```

### 6. Implement and Test

Implement only after user confirmation.

Follow `tasks.md` in order. Prefer TDD for behavior changes. Update `tasks.md` as work completes.

If work is interrupted or resumed, first re-read the current status before continuing:

```text
tasks.md completion state
recent test/lint/build results
running dev server state, if relevant
git status
known blockers or failed verification steps
```

Continue from the first incomplete or failed task. Do not restart the project or repeat completed work unless the current files show it is necessary.

If new facts appear, update the correct artifact:

```text
product intent -> PRD.md
domain language -> CONTEXT.md
architecture knowledge -> docs/architecture.md
hard-to-reverse decision -> docs/adr/
change-specific design -> design.md
work breakdown -> tasks.md
```

### 7. Ask the User to Verify

After implementation and tests, do not archive immediately.

Do not claim manual or browser verification passed unless it actually ran and passed. If a browser bridge, UI automation tool, network, sandbox, or local server prevents the agent from completing manual verification, leave the relevant task unchecked, explain the limitation, and ask the user to run the verification steps.

Tell the user:

```text
how to run the project
which core flows to verify
which behaviors are in MVP
which behaviors are non-goals
test/lint/build status
known limitations
```

If verification fails, classify the issue as bug, unclear spec, PRD change, or documentation drift before editing.

If the user reports that manual verification passed, update `tasks.md` or the relevant change artifact to mark that verification complete, then re-check validation before recommending archive.

### 8. Sync and Archive

Archive only after user verification passes.

Before archiving, check:

```text
tasks complete
tests/lint/build pass or gaps are explained
README.md reflects current project
PRD.md remains accurate
CONTEXT.md and docs are current
openspec/specs/ represent current behavior
no blocking open questions or ADRs remain
```

Then sync specs and archive the change.

If the archive tool generates an archive directory name with a date that differs from the current session date, do not rename it manually. Report both dates clearly, keep the tool-generated name, and verify the archived change and synced specs using the tool.

## Hard Rules

- Do not cross a major stage gate without telling the user what you are about to do.
- Do not create an OpenSpec change from vague intent.
- Do not implement immediately after propose; review first.
- Do not put unconfirmed assumptions into specs as facts.
- Do not archive before user verification.
- Keep documentation alive throughout the work, not only at the end.

## References

Use these only when useful:

- `references/prompts.md` for stage prompts.
- `references/file-skeletons.md` for starter document skeletons.
- `references/review-checklist.md` for proposal/task review.
