---
name: grill-driven-spec
description: Use when starting a new project from a vague idea, adopting an existing implemented project, or preparing a feature through AI-led requirement clarification, PRD/docs updates, and OpenSpec proposal/spec/task workflow before coding. Trigger when the user mentions grill-driven spec, grill-to-OpenSpec, PRD plus OpenSpec, 0-to-1 project setup, existing project adoption, or asks to clarify requirements before implementation.
---

# Grill Driven Spec

Use this skill to act as a stage-gated product/spec lead for AI-assisted development.

The core rule:

```text
grill first, spec second, code last
```

The user expresses ideas and confirms phase transitions. You ask focused questions, update project documents, decide whether the current phase is ready to advance, and explicitly ask for confirmation before crossing major gates.

## Skill Composition

This workflow composes other skills when they are available:

```text
grill-me -> Stage 1 product intent clarification
grill-with-docs -> Stage 3 project context alignment
OpenSpec -> proposal, specs, design, tasks, validation, and archive lifecycle
Lore -> commits that should preserve decision context
```

Do not copy the full behavior of dependent skills into this file. `grill-driven-spec` defines when
to invoke them, what project artifacts they should read and update, when to stop, and which gates
must not be crossed. The dependent skill owns its own interaction style unless this workflow gives a
specific contract needed for PRD/OpenSpec convergence.

Check dependency availability during preflight. If a required dependent skill or tool is missing,
install it from a verified source, enable it, or ask the user to do so before crossing the stage that
requires it. Do not pretend to invoke a missing skill or tool.

Dependency identity and install policy:

```text
git -> system Git CLI; verify with git --version; install only through the user's OS package manager or official Git distribution.
grill-me -> AI agent workflow skill from https://github.com/mattpocock/skills; install with npx skills@latest add mattpocock/skills when appropriate; do not install a random package named grill.
grill-with-docs -> AI agent workflow skill from https://github.com/mattpocock/skills; install with npx skills@latest add mattpocock/skills when appropriate; do not install a random package named grill-with-docs.
OpenSpec -> OpenSpec workflow/CLI from https://github.com/Fission-AI/OpenSpec; install with npm install -g @fission-ai/openspec@latest when appropriate; verify the selected adapter and CLI before initialization.
Lore -> Lore commit tool/CLI from https://github.com/Ian-stetsenko/lore-protocol; install with npm install -g lore-protocol when appropriate; verify with lore --version or lore help.
```

If these commands are not appropriate for the current agent or environment, stop and ask the user
before substituting another source. Do not guess package-manager names for workflow skills or CLIs.
Prefer enabling already-installed local skills over installing new global packages.

## Stage Gates

Follow these gates in order unless the project already has later-stage artifacts.

## Stage Transition Output

When entering a new stage or adoption phase, make the transition visually obvious to the user with a
large Markdown heading before doing stage work.

Use this format:

```markdown
# Stage <number>: <short stage name>

Current gate: <one sentence describing what must happen before the next stage>.
```

For Existing Project Adoption, use:

```markdown
# Adoption: <short phase name>

Current gate: <one sentence describing what must happen before the next phase>.
```

Keep the heading short and stable. Do not rely on emojis, colors, terminal control codes, or
agent-specific UI features for stage visibility.

### Existing Project Adoption Entry

Use this path when the folder already contains a meaningful implemented product, such as a source
tree, package manifest, application config, tests, deployment config, existing product docs, or
production-like data model.

For an adoption entry such as:

```text
/grill-driven-spec adopt this existing project
```

do not run the 0-to-1 skeleton flow. First inventory the existing project reality.

Adoption preflight should check:

```text
repository status and current branch
main source, test, config, and documentation locations
package manifests, build scripts, CI, deploy config, and environment examples
existing README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/
obvious product surfaces, core workflows, and domain terms visible in code or docs
git, OpenSpec, and Lore availability when relevant
grill-me and grill-with-docs availability when Stage 1 or Stage 3 may be needed
```

Adoption rules:

```text
do not overwrite existing product docs with new 0-to-1 skeletons
do not treat undocumented code behavior as desired behavior until the user confirms it
do not refactor, redesign, migrate, or implement during adoption
do not create a new OpenSpec change until baseline context and desired behavior are clear
preserve existing project conventions unless the user explicitly wants to change them
```

Create or refresh only missing or clearly thin project guidance files, using the existing project as
source material:

```text
AGENTS.md
CONTEXT.md
SECURITY.md
docs/architecture.md
docs/ai-tools.md
docs/adr/README.md
docs/diagrams/README.md
```

Keep adoption docs factual and thin. Use `Observed`, `Confirmed`, and `Open Questions` language
where useful. Put current code facts in observed sections, and only move them to confirmed product
requirements after user confirmation.

Then ask one blocking alignment question at a time. Prefer questions about:

```text
which current workflows must remain compatible
which behavior is desired versus accidental or legacy
domain terms that should become canonical
security, privacy, data, or operational constraints
the smallest first change worth proposing after adoption
```

Initialize or verify OpenSpec after the baseline is understood. For existing behavior, specs may
describe confirmed behavior that must be protected. Future changes still follow propose, review,
implement, verify, and archive.

Gate prompt to user:

```text
I have inventoried the existing project and created or refreshed only thin guidance docs.
Next I recommend an adoption grill: I will ask one blocking question at a time to separate desired behavior from observed behavior before creating any OpenSpec change.
```

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
whether README.md, PRD.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, or openspec/ already exist
raw source materials such as notes, drafts, meeting summaries, exports, screenshots, PDFs, or docs
signals that this is already an implemented project rather than a 0-to-1 folder
git availability
grill-me availability
grill-with-docs availability
OpenSpec availability
Lore availability, if commits are expected
```

Dependency rules:

```text
git is required before initializing the repository or committing
grill-me is required before Stage 1 product clarification
grill-with-docs is required before Stage 3 context alignment
OpenSpec is required before Stage 2 initializes OpenSpec or Stage 4 creates a change
Lore is recommended before committing workflow, docs, or spec decisions, but it must not block initial grilling
```

If `git` is available and the current directory is not a git repository, initialize it with `git init`.

If `git` is missing, tell the user it must be installed before repository initialization or commits, then continue only with file work if the environment allows it.

If OpenSpec is missing, do not create an OpenSpec change. Install it only from the verified OpenSpec
source for the current agent/tool adapter, or ask the user to install it before Stage 2.

If `grill-me` is missing, do not enter Stage 1 as if grill-me ran. Enable or install the `grill-me`
workflow skill only from the agent's known skill registry or local skill source, or ask the user to
do so before Stage 1.

If `grill-with-docs` is missing, do not enter Stage 3 as if grill-with-docs ran. Enable or install
the `grill-with-docs` workflow skill only from the agent's known skill registry or local skill
source, or ask the user to do so before Stage 3.

If Lore is missing, install it only from the verified Lore source, or ask the user to install it
before creating Lore-managed commits. Do not delay Stage 0 or Stage 1 just because Lore is
unavailable.

0-to-1 does not require a perfectly empty directory. A folder with raw source materials is still a 0-to-1 candidate if it does not already have a coherent project skeleton.

Treat existing raw materials as inbox sources:

```text
do not delete, move, rename, summarize destructively, or overwrite user files without explicit approval
do not treat raw materials as confirmed requirements
record their paths in PRD.md under Raw Sources, or in Open Questions when their relevance is unclear
distill only clearly stated facts into PRD.md, and keep uncertain interpretations under Open Questions
ask the user to confirm important requirements before marking them confirmed
```

When raw materials exist, Stage 0 should still create the same thin skeleton. The difference is that
`PRD.md` should name the source files under `Raw Sources` before grilling begins. Do not summarize
large source files unless the user asks, and do not convert source material into product scope before
Stage 1 confirmation.

If the folder already contains meaningful implementation artifacts, such as a source tree, package manifest, application config, or existing product docs, pause and tell the user this appears closer to Existing Project Adoption than 0-to-1. Recommend the adoption flow instead of overwriting the project with a new skeleton.

Create or update the minimum project context:

```text
README.md
PRD.md
AGENTS.md
CONTEXT.md
SECURITY.md
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

Invoke `grill-me` for product clarification.

Pass this contract:

```text
goal: clarify enough product intent for the first OpenSpec change
primary write target: PRD.md
preferred question focus: MVP boundary, first users, success criteria, non-goals, and testable core behavior
stop condition: MVP boundary, non-goals, and core behavior can become testable requirements
constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements
```

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

Invoke `grill-with-docs` for project context alignment.

Pass this contract:

```text
goal: fill only the context needed for the first OpenSpec proposal
inputs: PRD.md, AGENTS.md, CONTEXT.md, docs/, openspec/
write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, docs/inbox/
question focus: only questions that block a testable first OpenSpec change
stop condition: enough project context exists to propose the first OpenSpec change
constraints: do not continue grilling for non-blocking UI or implementation details, do not write code, and do not create a change until the user confirms propose
```

Update:

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
technical choices that directly affect the first implementation slice
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

Technical readiness depends on the project branch.

For greenfield projects, do not skip technical and experience readiness. Before asking the user to
enter development, the workflow must know enough to implement the first slice safely without
inventing project shape. Keep this lightweight; prefer one compact readiness question or ask the user
to authorize conservative defaults.

Greenfield readiness can come from:

```text
the user confirming stack/runtime, storage, deployment target, integration constraints, and broad UI direction
an explicit user instruction that the agent may choose conservative defaults
```

For existing projects, inherit current architecture, stack, UI patterns, design system, test style,
and deployment conventions by default. Ask technical or UI questions only when the proposed change
would affect:

```text
architecture boundaries or module ownership
data model, migrations, persistence, or lifecycle rules
authentication, authorization, privacy, or sensitive-data handling
external integrations or AI/tool dependencies
deployment, runtime, CI, or local verification
shared UI patterns, design system, navigation, or user workflow conventions
```

If the change fits existing conventions and does not affect those areas, do not block development
with stack, architecture, or UI questions. Record that the implementation will follow existing
patterns in `design.md`.

If readiness is unknown, keep it as Open Questions in `design.md` and block development review until
the user confirms the choice, the existing project provides the convention, or the user authorizes
default choices. Do not turn every low-level library choice into grilling; focus on choices that
affect project shape, user experience direction, data persistence, security, deployment, or the
ability to run and verify the MVP.

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

For greenfield projects, `design.md` must include a Technical Approach section before review. It
should record confirmed choices, proposed defaults awaiting approval, and technical open questions
for at least:

```text
application shape and runtime
primary data storage or persistence approach
authentication, authorization, privacy, or sensitive-data handling when relevant
external integrations and AI/tool dependencies when relevant
basic UI direction or experience surface when user-facing UI is part of the first slice
local run, test, and verification expectations
deployment target if it affects the first slice
```

For existing projects, `design.md` should state whether the change follows existing technical and UI
conventions or list the specific conventions it changes.

Do not implement after creating the change.

### 5. Review Before Development

Review the new change before coding. Check:

```text
proposal matches PRD.md
specs are testable
design does not depend on unconfirmed assumptions
technical approach is ready for implementation
tasks are executable and ordered
tests, docs, and CI are represented
MVP is not too large
```

Technical approach is ready only when blocking technical and UI choices are confirmed, inherited from
an existing project, or explicitly delegated to the agent as conservative defaults. For greenfield
projects, if stack/runtime, persistence, security/data handling, UI direction, or verification
environment is still TBD and needed for the first implementation slice, review fails and the agent
must ask one compact readiness question before development. For existing projects, review should not
fail on inherited stack or UI choices unless the change affects architecture, data, security,
deployment, local verification, shared UI conventions, or user workflow conventions.

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
