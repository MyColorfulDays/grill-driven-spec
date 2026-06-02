# Grill Driven Spec Path Guides

Use this file for path-specific execution details. `SKILL.md` keeps the hard rules and gate order;
`references/state-machine.md` decides where the workflow is; this file says what to do inside each
path.

## Existing Project Adoption

Use when the folder already contains a meaningful implemented product, but baseline docs or
OpenSpec context are missing or too thin.

Do not run the 0-to-1 skeleton flow. First inventory current reality.

Adoption preflight should check:

```text
repository status and current branch
main source, test, config, and documentation locations
package manifests, build scripts, CI, deploy config, and environment examples
existing README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/
obvious product surfaces, core workflows, and domain terms visible in code or docs
primary language of existing authoritative project docs
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

Create or refresh only missing or clearly thin guidance files:

```text
AGENTS.md
CONTEXT.md
SECURITY.md
docs/architecture.md
docs/ai-tools.md
docs/adr/README.md
docs/diagrams/README.md
```

Use `Observed`, `Confirmed`, and `Open Questions` language. Put current code facts in observed
sections, and move them to confirmed requirements only after user confirmation.

Stop adoption when:

```text
baseline docs are thin but sufficient to orient future work
observed behavior and confirmed desired behavior are clearly separated
the user has confirmed the smallest first change worth proposing, or confirmed there is no immediate change
remaining unknowns can be carried as Open Questions without blocking future change review
```

Recommended gate prompt:

```text
I have inventoried the existing project and created or refreshed only thin guidance docs.
Next I recommend an adoption grill: I will ask one blocking question at a time to separate desired behavior from observed behavior before creating any OpenSpec change.
```

## Existing Project Change

Use when the folder already contains a meaningful implemented product and the user asks to add,
change, or fix product behavior.

Do not run the 0-to-1 skeleton flow. Do not force full adoption when the existing project already
has enough baseline context for the requested change.

Lightweight change preflight:

```text
check repository status and current branch
identify likely source, test, config, docs, and OpenSpec locations for this change
check whether README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/ provide enough baseline context
identify existing architecture, stack, UI, test, deployment, and workflow conventions relevant to the change
identify relevant external-system adapters, schemas, fixtures, contract tests, docs, and conventions for this change
identify the primary language of existing authoritative project docs
check git, OpenSpec, and Lore availability when relevant
check grill-me and grill-with-docs availability when clarification may be needed
```

Branch the flow:

```text
if baseline context is missing or too thin to judge desired behavior -> do a minimal adoption baseline first
if the change fits existing architecture, UI, test, deployment, and workflow conventions -> inherit them by default
if the change affects architecture, data, security, deployment, shared UI, or workflow conventions -> ask one blocking impact question before proposing
if the user explicitly asks for productization, DDD/TDD migration, maintainability refactoring, or product-grade architecture -> treat it as a scoped product-track refactoring change
if the change adds or changes external knowledge -> classify it as known, provisional, or blocking
if product intent is vague -> invoke grill-me with a change-scoped contract
if project/domain context is the blocker -> invoke grill-with-docs with a change-scoped contract
```

For next-slice selection, recommend a small number of change candidates and ask the single selection
question that decides the next OpenSpec proposal. Do not invoke a visual companion, mockup flow, or
broad brainstorming flow just to choose the next slice.

Change-scoped grill contract:

```text
goal: clarify only what is needed for the requested change
inputs: current project docs, relevant code/docs, and any existing OpenSpec artifacts
write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, and the future OpenSpec change when confirmed
question focus: desired behavior, compatibility with existing workflows, non-goals, and convention impact
external knowledge: inherit known external-system contracts from existing code/docs, or classify new/changed external knowledge as known, provisional, or blocking
stop condition: the change can be proposed as testable behavior and its convention impact is known
constraints: do not re-adopt the whole project, choose a new stack, redesign shared UI, migrate data, or implement before review unless the user explicitly asks for that scope
```

For existing projects, inherit current architecture, source layout, and test conventions by default.
Do not turn a small change into a DDD/TDD migration. When the user explicitly requests
productization, DDD/TDD migration, maintainability refactoring, or product-grade architecture, make
that refactor its own existing-project change with scoped behavior, compatibility, migration, and
test strategy.

Recommended gate prompt:

```text
I have checked the existing project context for this change.
This looks like a change-scoped flow rather than full adoption. I will clarify only the behavior and convention impact needed before creating an OpenSpec proposal.
```

## 0-to-1 Project

Use for a new or unstructured folder, including a folder with raw source materials but no meaningful
implementation.

Stage 0 must run before any optional companion, mockup, brainstorming, stack-selection,
product-clarification, or design question.

Stage 0 is the bootstrap boundary. Do not enter `grill-me`, OpenSpec initialization, stack
selection, or design work until the thin skeleton exists or a filesystem blocker has been reported.
If the user's first message includes a product idea, copy it into the starter `PRD.md` as seed input
or clearly stated facts only. Do not ask a follow-up product question until Stage 0 has completed.

Preflight:

```text
current directory name
whether the directory is already a git repository or inside a parent git worktree
whether README.md, PRD.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, or openspec/ already exist
raw source materials such as notes, drafts, meeting summaries, exports, screenshots, PDFs, or docs
signals that this is already an implemented project rather than a 0-to-1 folder
primary artifact language from the user's initial request or existing authoritative docs
git, grill-me, grill-with-docs, OpenSpec, and Lore availability when relevant
```

If the folder contains meaningful implementation artifacts, pause and recommend Existing Project
Adoption instead of overwriting the project with a new skeleton.

If git is available and this 0-to-1 folder is not already inside a git worktree, initialize git
before the baseline commit gate. If a parent git worktree already owns the folder, use that
repository and do not create a nested repository. If git is unavailable, continue with skeleton
creation when the filesystem is writable, record the limitation in `docs/ai-tools.md`, and mark the
baseline commit as unavailable or user-handled.

Treat raw materials as inbox sources:

```text
do not delete, move, rename, summarize destructively, or overwrite user files without explicit approval
do not treat raw materials as confirmed requirements
record their paths in PRD.md under Raw Sources, or in Open Questions when relevance is unclear
distill only clearly stated facts into PRD.md
keep uncertain interpretations under Open Questions
ask the user to confirm important requirements before marking them confirmed
```

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

README.md should contain only a single H1 using the current directory name. Keep all other files
thin. Use `TBD` for unknown commands, stack, architecture, or decisions. Do not invent product
scope, features, stack, business rules, architecture, personas, or implementation directories.

After the Stage 0 skeleton is created, create an initial baseline commit for generated or refreshed
workflow skeleton files when git is available and an allowed author/committer identity is available.
Run commit identity preflight first. Missing Lore must not block Stage 0 or Stage 1.

If no allowed author/committer identity is available, do not commit and do not invent one. Stop at
the commit identity gate after creating the skeleton, ask for a complete `Name <email>` pair or an
explicit user handoff, and keep product grilling blocked only if `grill-me` is unavailable.

After Stage 0, choose the 0-to-1 build track before product, stack, or implementation clarification
unless the user's intent is already explicit. Ask one compact question:

```text
Is this first build a throwaway prototype or a product-track build?
```

Use product-track as the recommended default unless the user explicitly says the work is disposable,
a spike, a mockup, or a demo that will not be maintained. Record the selected track in `PRD.md`
because it is product intent. When an OpenSpec change is created, copy the engineering consequences
into `design.md`.

Track behavior:

```text
throwaway prototype -> keep the first slice fast, record shortcuts as limitations, do not block on DDD-lite or TDD-first task order
product-track build -> default to DDD-lite boundaries, TDD-first behavior tasks, and source/test layout that can grow
```

Recommended gate prompt:

```text
Initial files are in place. The PRD is still too thin for an OpenSpec change.
Next I recommend choosing the build track, then using grill-me to clarify the first testable slice.
```

## Product Clarification

Delegate to `grill-me` for product clarification. Preserve its native behavior: interview one branch
at a time, ask one question at a time, and provide the recommended answer for each question. Do not
replace missing `grill-me` with ordinary questioning while claiming the delegated stage is running.

Contract:

```text
goal: clarify enough product intent for the first OpenSpec change
primary write target: PRD.md
preferred question focus: build track, first users, success criteria, first-slice boundary, non-goals, and testable core behavior
external knowledge: when external systems or mature domain patterns appear, classify them lightly using External Knowledge and Domain Pattern Readiness
stop condition: build track, first-slice boundary, non-goals, and core behavior can become testable requirements
constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements
```

Advance only when the build track is recorded in `PRD.md`, first-slice boundary is clear,
non-goals are recorded, core behavior can become testable
requirements, and remaining unknowns do not block the first change.

## OpenSpec Initialization

Initialize OpenSpec early after product direction is clear enough to track changes.

Verify:

```text
openspec/ exists
openspec/specs/ exists
openspec/changes/ exists
the selected tool adapter was installed or intentionally skipped
the OpenSpec CLI can run a basic command after initialization
```

If initialization partially fails, classify the failure and record non-blocking limitations in
`docs/ai-tools.md`. Do not create a formal change until the user confirms propose.

Failure classification:

```text
project-local OpenSpec structure missing -> blocking; fix before continuing
selected tool adapter failed to install -> blocking for that tool; guide the user to fix or explicitly continue without the adapter
global prompt/config write failed -> explain the path and permission issue; ask whether to retry, skip global install, or continue project-local only
```

When continuing project-local only after a non-blocking global or adapter issue, record what will
not work until it is fixed.

## Project Context

Delegate to `grill-with-docs` when PRD is clear but project/domain context is not ready for a
proposal. Preserve its native behavior: grill against docs, domain language, and code; ask one
question at a time; provide the recommended answer for each question; update `CONTEXT.md` inline
when domain terms are resolved.

Contract:

```text
goal: fill only the context needed for the first OpenSpec proposal
inputs: PRD.md, AGENTS.md, CONTEXT.md, docs/, openspec/
write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, docs/inbox/
question focus: only questions that block a testable first OpenSpec change
external knowledge: classify required external systems, external docs, and domain-pattern assumptions as known, provisional, or blocking
stop condition: enough project context exists to propose the first OpenSpec change
constraints: do not continue grilling for non-blocking UI or implementation details, do not write code, and do not create a change until the user confirms propose
```

For greenfield projects, do not enter development until stack/runtime, source and test layout,
persistence, sensitive-data handling, integrations, broad UI direction, local verification, and
deployment target are confirmed, inherited, or explicitly delegated as conservative defaults when
they affect the first slice.

When stack/runtime is not confirmed for a greenfield implementation, ask one compact technical
readiness question before review can pass. Recommend a specific first-slice stack with a short reason, then
ask the user to confirm it or explicitly authorize conservative defaults. Do not treat silence or a
generic "proceed" as stack approval.

Source layout is part of technical readiness. Do not place business source files such as `app.py`,
`main.py`, or `index.ts` in the project root just because the stack is unclear. Prefer
stack-specific conventions and record the chosen layout in the active `design.md`.

For greenfield product-track builds, project context must include enough DDD-lite material for the
first slice: core domain terms, confirmed business rules, and any candidate entities, value objects,
aggregates, policies, or domain services that clarify the first slice. Keep this in `CONTEXT.md`
while the glossary is small. Do not perform broad up-front domain modeling.

For existing projects, inherit current architecture, stack, source layout, UI, test, and deployment
conventions unless the change affects them.

Keep domain terminology in `CONTEXT.md` while the glossary is small. Create
`UBIQUITOUS_LANGUAGE.md` only when terms are numerous, ambiguous, mapped differently across external
systems, needed for code/API naming, or DDD modeling has begun.

## OpenSpec Proposal

Only after user confirmation, create:

```text
openspec/changes/<change-name>/proposal.md
openspec/changes/<change-name>/specs/
openspec/changes/<change-name>/design.md
openspec/changes/<change-name>/tasks.md
```

`proposal.md` explains why, what, and non-goals. `specs/` describe testable behavior, not
implementation details. `design.md` records technical approach, constraints, risks, and open
questions. `tasks.md` includes implementation, tests, docs, CI, and DDD/TDD tasks required by the
selected build track.

For greenfield projects, `design.md` must include a Technical Approach section before review. It
must record confirmed choices, proposed defaults awaiting approval, and technical open questions for
application shape/runtime, source and test layout, persistence, sensitive-data handling,
integrations, basic UI direction when relevant, local verification, and deployment when it affects
the first slice.

For greenfield product-track builds, `design.md` must also record how the first slice keeps
domain/application/infrastructure/UI boundaries, where core behavior tests live, and whether any
TDD-first behavior work is explicitly deferred. `tasks.md` must place core behavior tests before the
related implementation tasks unless a deferral reason is recorded.

Before review passes, any proposed default required for implementation must be confirmed by the user
or converted into an explicit agent-selected default under user authorization. Do not leave required
stack/runtime, source layout, or local verification choices as "proposed" or "awaiting approval"
while asking to enter development.

For existing projects, `design.md` should state whether the change follows existing technical,
source-layout, and UI conventions or list the specific conventions it changes.

If the change depends on external knowledge, `design.md` must record whether the dependency is
known, provisional, or blocking. Known dependencies should reference docs, adapters, schemas,
fixtures, contract tests, runbooks, or authoritative project docs. Provisional dependencies must
record the mock boundary, assumptions, non-goals, replacement trigger, and any domain-pattern
assumptions. Specs describe behavior against the agreed boundary; they must not pretend unknown
external behavior is confirmed.

Do not implement after creating the change.

## Review Before Development

Review the new change before coding. Check:

```text
proposal matches PRD.md
specs are testable
design does not depend on unconfirmed assumptions
technical approach is ready for implementation
tasks are executable and ordered
tests, docs, and CI are represented
first slice is not too large
external knowledge is known or explicitly provisional
```

For greenfield projects, review fails if the build track is unknown or required stack/runtime,
persistence, sensitive-data handling, source layout, broad UI direction, integrations, local
verification, or deployment choices are still TBD and not explicitly delegated. If stack/runtime is
missing, ask a technical readiness question with a recommended stack instead of asking for
development confirmation.

For greenfield product-track builds, review also fails if core domain terms and business rules are
not recorded, business behavior is designed only inside UI/API/persistence code, core behavior tasks
do not include tests before implementation, or TDD is skipped without an explicit reason. MVP may
trim scope; it must not trim engineering discipline.

For existing projects, do not fail review on inherited stack or UI choices unless the change affects
architecture, data, security, deployment, source layout, local verification, shared UI conventions,
or user workflow conventions.

If required external knowledge is blocking, ask for docs/examples/access details, identify the
existing project contract to inherit, or ask whether to proceed with a provisional mock boundary and
documented assumptions. Do not ask for development confirmation yet.

If review fails, return to the relevant grill/context gate and ask one blocking question. If review
passes, ask the user to confirm development.

## Implement, Verify, Sync, and Archive

Implement only after user confirmation. Follow `tasks.md` in order. For product-track builds, use
TDD-first for behavior changes by default; for throwaway prototypes, record any skipped testing or
boundary shortcuts as limitations. Update `tasks.md` as work completes.

After implementation and tests, ask the user to verify. Include startup commands, core flows,
first-slice behaviors, explicit non-goals, test status, and known limitations. Do not claim manual
or browser verification passed unless it actually ran and passed.

Archive only after user verification passes. Before archiving, check tasks, tests/lint/build,
README.md, PRD.md, CONTEXT.md, docs, specs, and unresolved open questions or ADRs. After archive
verification, handle the commit gate with Lore-first policy, normal git only when Lore is
unavailable/inappropriate or explicitly requested, user handoff, or explicit skip.

For post-archive commits, use Lore when it is available and appropriate because the commit should
preserve requirement, design, implementation, verification, and archive context. Use a normal git
commit only when Lore is unavailable, inappropriate for the current environment, or explicitly
requested by the user. Bare commit intent is enough to handle the commit gate, but not enough to
downgrade from Lore to normal git. In all cases, resolve author and committer from allowed evidence
before running a commit command. Do not infer or fabricate identity; if the identity is missing or
ambiguous, ask for the complete `Name <email>` pair.

If the archive tool creates a date-stamped directory with a date that differs from the current
session date, do not rename it manually. Report both dates clearly, keep the tool-generated name,
and verify the archived change and synced specs using the tool.
