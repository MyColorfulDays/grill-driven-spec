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

### Skill Delegation Boundary

When `grill-driven-spec` is active, it owns:

```text
workflow path selection
stage and gate transitions
user confirmation points
artifact routing
OpenSpec proposal, review, development, verification, and archive lifecycle
```

Other skills may be invoked only as bounded helpers when the user explicitly asks for that
skill/workflow, or when the current `grill-driven-spec` stage delegates a narrow task to it.

A delegated helper must:

```text
receive a narrow contract
write findings back to grill-driven-spec artifacts such as PRD.md, CONTEXT.md, docs/, or the active OpenSpec change
avoid introducing its own unrelated major gates
avoid redirecting to its own unrelated artifact structure
avoid bypassing OpenSpec gates
return control to grill-driven-spec after the bounded task
```

Do not let a helper skill start its own end-to-end workflow, require its own visual/browser/setup
gate, or create parallel specs outside the Grill Driven Spec artifacts unless the user explicitly
requested that separate workflow or that gate is the current blocking question.

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

## Progress Tracking

Maintain a visible task plan for the workflow whenever the agent environment provides a task,
checklist, or progress-plan tool.

Rules:

```text
create the progress plan during preflight or resume, before doing substantial stage work
use one task per active gate or phase, not one task per tiny substep
keep exactly one task in progress whenever possible
mark tasks completed as soon as their gate is actually satisfied
when resuming, rebuild the plan from the earliest incomplete gate based on files, not chat memory
when switching focus, replace the plan with tasks for the newly selected focus
do not mark implementation, user verification, or archive complete until the corresponding file/tool/user evidence exists
```

Default plan items for a full 0-to-1 flow:

```text
Preflight and seed project skeleton
Clarify product intent
Initialize and verify OpenSpec
Fill project context
Create OpenSpec proposal
Review before development
Implement and test
User verification
Sync and archive
```

For Existing Project Adoption, Existing Project Change, or Next-slice selection, create a shorter
plan that matches the chosen path and starts at the earliest incomplete gate. Keep the user-facing
`Driving` heading as the phase label in chat, and use the progress plan as the side-channel status.

## Conversation Steering

Drive the workflow like a coach and project manager, not like a rigid form. The user may ask side
questions, explore doubts, change their mind, or raise new feature ideas. Answer useful detours, but
route every turn back into the active workflow state.

Before responding to each user turn, classify it:

```text
gate-answer -> the user answered the current blocking question or confirmed a gate transition
gate-clarification -> the user asks what the current question means, why it matters, or how to choose
productive-tangent -> the user asks a related side question that may reveal requirements, risks, constraints, terminology, or implementation context
new-focus -> the user introduces a different feature, product direction, or change request
meta-process -> the user questions the workflow, pace, gates, or whether this process is working
```

Then respond according to the route:

```text
gate-answer:
  absorb the answer, update or prepare the relevant artifact, and reassess whether the current gate can advance

gate-clarification:
  explain the question briefly, reduce the decision to an easier shape, and ask one clearer version of the current gate question

productive-tangent:
  answer the tangent, record any durable requirement/risk/constraint/term/open question/candidate in the right artifact when file edits are in scope, then steer back to the active gate

new-focus:
  do not silently switch; ask whether to switch focus now, record it as a Candidate Change, or return to the current gate

meta-process:
  pause forward motion, explain the purpose of the current gate, adjust the pace if needed, then offer the smallest useful next step
```

A tangent must end in one of these explicit steering outcomes:

```text
return to current gate
record as Candidate Change
switch-focus confirmation
update artifact and reassess gate
pause workflow by explicit user request
```

Do not let the last line of a workflow reply be vague when the active gate is still open. Prefer a
concrete steering move:

```text
Good:
"I will record that as a Candidate Change. Back to the current gate: for the MVP first slice, should the user complete A or B first?"

Bad:
"Anything else?"
"What else should we discuss?"
"We can continue."
```

Use checkpoint recovery when drift accumulates. If two consecutive user turns do not advance,
revise, or explicitly defer the active gate, the next assistant reply must include a short
checkpoint:

```text
active focus
current gate
what the side discussion changed or clarified
the single next question or confirmation needed
```

Also checkpoint when:

```text
the user says continue, next, then what, or similar
the conversation has become long enough that the current gate may be unclear
the user raises a new direction without saying whether to switch focus
the assistant is about to cross a major gate
the assistant resumes after interruption or context compaction
```

Checkpoints should be compact and natural in the project language. They do not always require a
large `Driving` heading, but major phase transitions still require the `Driving` heading described
below.

## Commit Identity

Before creating any git or Lore commit, resolve the intended author and committer identity. Do not
silently use the machine's global git identity in an existing project.

Commit identity preflight:

```text
check repository-local git config user.name and user.email
inspect recent commits with author and committer fields
compare the configured identity with recent project commits
if the repository-local config is missing or differs from recent project commits, use the recent project identity or ask the user before committing
if multiple recent identities are legitimate and the correct one is unclear, ask the user
when using Lore, remember that it still shells out to git commit and inherits git author/committer identity unless explicitly overridden
```

Identity selection rules:

```text
new project with no commits:
  use repository-local git config when present; otherwise ask the user before the first commit or set the identity only when the user has provided it

existing project with consistent recent commits:
  use the recent project author/committer identity unless repository-local git config explicitly matches a different confirmed project identity

existing project with mixed recent commit identities:
  ask which identity to use before committing

automated or bot commits:
  use a bot identity only when the project already uses that bot identity for comparable commits or the user explicitly requests it
```

When the selected identity differs from current git config, pass the identity explicitly through
`--author` and the relevant `GIT_COMMITTER_NAME` / `GIT_COMMITTER_EMAIL` environment variables, or
set repository-local config only with user approval. If a commit was created with the wrong
identity, amend only the affected commit when it is safe to rewrite local history, and tell the user
the old and new commit hashes.

## Project State Detection

Before choosing a workflow path, classify the current folder and user intent using both file signals
and the user's words.

Use this decision table:

```text
0-to-1:
- no meaningful implementation artifacts
- no coherent PRD/CONTEXT/OpenSpec baseline
- raw materials may exist, but they are source materials rather than an implemented product
- user asks to start or build a new idea

Existing Project Adoption:
- meaningful implementation artifacts exist
- Grill Driven Spec, project docs, or OpenSpec baseline is missing or too thin to orient future work
- user asks to adopt, document, understand, or bring an existing project into the workflow
- baseline understanding is the work, not a specific product change

Existing Project Change:
- meaningful implementation artifacts exist
- baseline docs or OpenSpec artifacts exist enough to orient the requested change
- user asks to add, change, fix, continue, improve, or choose the next product slice
- the work is a new change, not adoption of the whole project

Next-slice selection:
- an initial OpenSpec change is complete, archived, or clearly shipped
- user asks what to improve next or where to continue
- recommend a few small candidate changes and ask one selection question before proposing
```

If signals conflict, explain the classification briefly and ask the user before crossing a major
gate. Do not run the 0-to-1 skeleton flow in an implemented project. Do not run full adoption when a
baseline is already sufficient for the requested change.

## Workflow Resume

When a session resumes or the user says to continue, inspect the current artifacts before choosing a
stage. Do not rely on chat memory alone.

Resume preflight should check:

```text
git status and current branch
repository-local git author/committer config and recent commit identities when commits may be needed
recent commits when deciding whether a baseline or archived change has already been committed
PRD.md, CONTEXT.md, SECURITY.md, and docs/
raw sources already recorded in PRD.md
openspec/, openspec/specs/, openspec/changes/, and archived changes
active OpenSpec change artifacts: proposal.md, specs/, design.md, tasks.md
task checkbox state, review notes, validation results, and user verification status when present
recent test/lint/build status if implementation has started
known blockers, Open Questions, and tool setup limitations in docs/ai-tools.md
```

Use OpenSpec as the primary change-state signal when it is available:

```text
active changes in openspec/changes/ take precedence over recommending a new change
archived changes are history, not active work
if openspec/ is missing, Stage 2 is not complete
if an active change has only proposal.md, continue Stage 4 and complete the change artifacts
if proposal.md, specs/, design.md, and tasks.md exist but review has not passed, continue Stage 5
if review passed and development was confirmed, continue Stage 6 from the first incomplete task
if implementation is complete but user verification is not recorded, continue Stage 7
if user verification passed but the change is not archived, continue Stage 8
if the change appears archived and synced but related changes are uncommitted, continue the Stage 8 commit gate before recommending a new feature
```

If multiple active changes exist, do not guess the current focus. List each active change with the
detected earliest incomplete gate, then ask the user which one to continue. A session should have
one active focus at a time even when the project has multiple active changes.

Prefer OpenSpec CLI/status commands when available, such as listing changes or validating the active
change, but do not rely only on CLI output. Also inspect the project artifacts. If CLI output and
files disagree, explain the mismatch and ask before crossing a major gate.

Resume from the earliest incomplete gate. Do not repeat completed stages unless artifacts are
missing, inconsistent, or the user explicitly asks to revisit them. Do not reclassify raw materials
as confirmed requirements. Do not create a new OpenSpec change while an unfinished active change is
present unless the user explicitly chooses to abandon, archive, or defer it.

When archive appears complete after manual user work, do not assume the commit gate is handled.
Treat it as pending when all of these are true:

```text
an archived change artifact exists or the archive tool result is visible
the relevant specs or docs appear synced
user verification is recorded in the conversation or change artifacts
git status shows related uncommitted workflow, docs, spec, archive, or implementation changes
recent commits do not clearly cover the archive
```

Checkpoint the completed archive, then ask whether to create a Lore commit, create a normal git
commit, mark it as user-handled, or skip this commit intentionally.

## Change Focus and Candidates

Keep change context from different features separate.

Rules:

```text
one active focus at a time
a session may switch focus when the user explicitly changes topic or chooses another feature
a project may have multiple active OpenSpec changes
if multiple active changes exist, list them with detected gate or phase and ask the user to choose focus
when switching focus, record the previous focus state before proceeding
do not mix PRD, design, tasks, or review state between active changes
do not start a new feature while another active change is unfinished unless the user explicitly defers, abandons, archives, or switches focus
```

On focus switch, summarize the previous focus, record whether it is active, deferred, abandoned, or
promoted to an OpenSpec change, then name the new focus before continuing. Do not carry unresolved
assumptions from the previous focus into the new one.

For feature ideas that are discussed but not ready for a formal OpenSpec change, record a lightweight
candidate instead of relying on chat memory. Prefer an existing project artifact if one already
tracks candidates; otherwise use a thin `PRD.md` section named `Candidate Changes`.

Each candidate should stay small:

```text
name or short label
one-sentence intent
current status: candidate, deferred, abandoned, promoted-to-change
known blocking question, if any
link to active OpenSpec change when promoted
```

When resuming and both active changes and candidate changes exist, show both groups and ask the user
which focus to continue. Do not promote a candidate into `openspec/changes/` until desired behavior
and convention impact are clear enough for review.

## Progressive Maturity

Start lightweight, then add maturity helpers only when the project shows that need.

Use this progression:

```text
Fast Path:
- default for 0-to-1 and early MVP work
- seed thin artifacts, clarify enough, create the first OpenSpec slice, implement, and verify
- do not introduce PM, design, or architecture helper work just because it is available

Product Maturity:
- use when the user asks what to build next, feature direction feels scattered, or prioritization is unclear
- optional helper capability: product discovery, prioritization, journey mapping, roadmap, metrics
- write outcomes to PRD.md, Candidate Changes, CONTEXT.md, or the active OpenSpec proposal

Design Maturity:
- use when the product works but feels rough, inconsistent, ugly, or hard to use
- optional helper capability: design references, UI direction, component/style principles, product-level DESIGN.md
- future UI-related OpenSpec design.md files should reference DESIGN.md when it exists

Architecture Maturity:
- use when a change affects architecture boundaries, data model, security, privacy, integrations, performance, reliability, deployment, technology selection, or intentional refactoring
- optional helper capability: solution design, architecture review, technology selection, threat modeling, technical debt assessment, release gating
- write outcomes to docs/architecture.md, docs/adr/, SECURITY.md, active OpenSpec design.md, and tasks.md
```

Do not invoke maturity helpers just because they exist. Use them when the current user goal,
project state, or OpenSpec review reveals that maturity dimension. Keep the first working slice fast;
let product, design, and architecture maturity deepen over later iterations.

### Maturity Helper Invocation Contract

Before invoking a product, design, or architecture maturity helper, state the helper contract:

```text
trigger: why this maturity helper is needed now
narrow question: the single decision or artifact it should help with
writeback target: PRD.md, DESIGN.md, CONTEXT.md, docs/architecture.md, docs/adr/, SECURITY.md, active OpenSpec design.md/tasks.md, or Candidate Changes
stop condition: what output is enough to return to grill-driven-spec
fallback: what to do if the helper, external reference, MCP, browser, private skill, or network access is unavailable
```

Maturity helpers must not block the Fast Path. If a helper implementation is unavailable, record the
limitation and fall back to local project artifacts, existing docs, screenshots, or agent-native
reasoning. Helper findings are advisory until written into Grill Driven Spec artifacts and accepted
by the relevant OpenSpec review gate. Treat findings as blocking only when they affect safety,
correctness, data, deployment, reversibility, or the user's confirmed goal.

For Design Maturity, visual companion tools may be used when they make UI or interaction decisions
easier to evaluate. They are acceptable only when the current `Driving` phase and gate remain clear,
the visual board answers a narrow design question, text replies are accepted equally to visual
clicks, choices are mirrored back into chat, and decisions are written to `DESIGN.md` or the active
OpenSpec `design.md`. If those conditions are not met, fall back to chat, screenshots, existing
project UI, or agent-native UI review.

Helper skills and visual companions may run their own lightweight interaction flow when that improves
the user's thinking. Treat that flow as a bounded handoff, not a replacement for Grill Driven Spec.
Before yielding to a helper-specific prompt, keep the current `Driving` gate visible and say what
decision the helper is helping with. If the helper requires a standalone invitation, browser consent,
or other waiting step, the next assistant turn must resume from the user's reply and reconnect it to
the current gate. Do not leave the user with an unexplained helper prompt, and do not require a visual
click when a normal chat reply is enough.

See `references/helper-capabilities.md` for helper capability slots and example implementations.

## Project and Conversation Language

Use one stable primary language for project artifacts created or updated by this workflow, and use
the same language for the conversation around the workflow unless the user explicitly asks otherwise.
The goal is a natural project-local experience, not word-for-word translation of template text.

Default rules:

```text
for new projects, use the primary language of the user's initial project request
for existing projects, inherit the primary language of authoritative docs such as README.md, PRD.md, CONTEXT.md, or OpenSpec artifacts
if the project language is unclear, ask the user once before creating substantial docs
do not switch artifact language just because a later chat message uses a different language
keep file names, commands, code identifiers, dependency names, and workflow/tool names such as grill-me, grill-with-docs, OpenSpec, Lore, Stage, gate, proposal.md, design.md, tasks.md, Observed, Confirmed, and Open Questions in their established form
preserve raw source materials in their original language
write summaries, confirmed requirements, specs, design notes, and tasks in the project artifact language unless quoting source material
write user-visible phase transitions, gate prompts, validation summaries, status updates, and confirmation questions in the project language
apply this conversation-language rule throughout Stage 0 through Stage 8, including development progress, verification handoff, and archive reporting
do not paste English gate prompt templates verbatim when the project language is not English; translate or adapt the prompt while preserving command names and file names
do not let English CLI output, OpenSpec output, tool labels, or prompt templates change the reply language; summarize tool results in the project language while preserving exact commands, file names, and error identifiers
prefer natural wording in the project language over rigid literal translation; keep the gate meaning and decision point clear
```

Do not rewrite unrelated existing docs just to normalize language. Keep language consistent within
the files, OpenSpec change, and user-visible workflow messages touched by the current workflow.

English examples and gate prompts in this skill are semantic templates, not required output text.
Before showing them to the user, translate or adapt them to the project language. Keep established
workflow identifiers such as `Driving`, `OpenSpec`, `proposal.md`, `design.md`, `tasks.md`, and
command names unchanged when translating them would reduce precision. Surrounding explanation should
read naturally in the project language.

## External Knowledge and Domain Pattern Readiness

Apply this rule in every workflow path: 0-to-1, Existing Project Adoption, Existing Project Change,
Next-slice selection, proposal review, and implementation resume.

When the first slice or requested change depends on external knowledge, classify that dependency
before review passes. External knowledge includes external systems, vendor services, third-party
APIs, organization-owned workflows, industry rules, legacy data formats, customer-provided files,
model APIs, data warehouses, identity providers, payment providers, HR systems, and similar facts
the project cannot safely invent.

Use this classification:

```text
known -> enough facts are available from user-provided docs/examples/access details, existing project code, adapters, schemas, contract tests, fixtures, or authoritative project docs
provisional -> the user explicitly approves a mock, fixture, fake adapter, or guessed contract; design.md records the boundary, assumptions, non-goals, replacement trigger, and what must change when real facts arrive
blocking -> neither enough facts nor explicit provisional approval exists; ask one readiness question before proposal review, development, or archive continues
```

For existing projects, inherit external knowledge from current adapters, schemas, contract tests,
fixtures, runbooks, and documented conventions when the change only consumes them. Re-run readiness
when the change adds a new external dependency, changes an external contract, changes sensitive-data
handling, or exposes previously hidden external behavior to users.

When real external facts are unavailable but the domain has mature patterns, the provisional mock may
be domain-informed. Keep this lightweight:

```text
briefly name the pattern when it helps the first slice
explain why it fits in one sentence
propose a conservative boundary instead of a broad domain model
ask at most one blocking question at a time
record pattern assumptions in PRD.md Open Questions or design.md, not specs
do not treat industry-pattern assumptions as confirmed external-system facts
```

Do not block the Fast Path just because more domain knowledge could be gathered. Block only when the
missing external fact affects safety, correctness, data shape, integration behavior, local
verification, reversibility, or the user's confirmed goal. Otherwise, carry it as an Open Question,
non-goal, or provisional design assumption.

## Driving Transition Output

When entering a new workflow phase, make the transition visually obvious to the user with a large
Markdown heading before doing phase work.

Use this semantic shape, adapting labels to the project language:

```markdown
# Driving: <short phase or focus>

Current gate: <one sentence describing what must happen before moving on>.
```

Use `Driving` headings for 0-to-1, adoption, existing-project changes, implementation,
verification, and archive. Do not rely on numbered Stage headings, `Adoption:` headings, or
`Change:` headings in user-facing transition output.

When the project language is not English, keep `Driving` as the stable workflow label, but translate
or adapt labels such as `Current gate` and the descriptive text so the transition does not feel like
an English template pasted into the conversation.

Tool-generated labels such as `Implementing: <change-name>` may appear, but they do not replace the
`Driving` heading and current gate.

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

Do not create `UBIQUITOUS_LANGUAGE.md` during default adoption unless domain terminology is already
complex enough to need a dedicated glossary. If created, link to it from `CONTEXT.md`.

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

Stop adoption when:

```text
baseline docs are thin but sufficient to orient future work
observed behavior and confirmed desired behavior are clearly separated
the user has confirmed the smallest first change worth proposing, or confirmed there is no immediate change
remaining unknowns can be carried as Open Questions without blocking future change review
```

Initialize or verify OpenSpec after the baseline is understood. For existing behavior, specs may
describe confirmed behavior that must be protected. Future changes still follow propose, review,
implement, verify, and archive.

Gate prompt to user:

```text
I have inventoried the existing project and created or refreshed only thin guidance docs.
Next I recommend an adoption grill: I will ask one blocking question at a time to separate desired behavior from observed behavior before creating any OpenSpec change.
```

### Existing Project Change Entry

Use this path when the folder already contains a meaningful implemented product and the user asks to
add, change, or fix product behavior rather than adopt the whole project.

Do not run the 0-to-1 skeleton flow. Do not force a full adoption pass when the existing project
already has enough baseline context for the requested change.

Do not label this path as adoption unless the baseline itself is the work. When the user asks what
to build next after an initial OpenSpec change has shipped, treat that as change selection in an
existing project.

First run a lightweight change preflight:

```text
check repository status and current branch
identify the likely source, test, config, docs, and OpenSpec locations for this change
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
if the change adds or changes external knowledge -> classify it as known, provisional, or blocking using External Knowledge and Domain Pattern Readiness
if product intent is vague -> invoke grill-me with a change-scoped contract
if project/domain context is the blocker -> invoke grill-with-docs with a change-scoped contract
```

When the user asks which feature or product slice should come next, recommend a small number of
change candidates and ask the single selection question that decides the next OpenSpec proposal.
Do not invoke a visual companion, mockup flow, or broad brainstorming flow just to choose the next
slice. Use visual exploration only when the user explicitly asks for it, or when a confirmed visual
or workflow design choice blocks the OpenSpec proposal.

After the user selects a recommended next slice, continue with change-scoped clarification and the
OpenSpec proposal gate. Do not restart into a separate brainstorming flow before proposing.

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

For small changes that follow existing conventions, do not block on stack, architecture, or UI
questions. Record in `design.md` that the implementation follows existing conventions.

For convention-impacting changes, keep the question narrow. Ask about the specific affected area,
not the whole product vision.

Do not create an OpenSpec change until desired behavior and convention impact are clear enough for
review.

Gate prompt to user:

```text
I have checked the existing project context for this change.
This looks like a change-scoped flow rather than full adoption. I will clarify only the behavior and convention impact needed before creating an OpenSpec proposal.
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
primary artifact language from the user's initial request or existing authoritative docs
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
After the Stage 0 skeleton is created, make an initial baseline commit for the generated workflow
files when git is available. The initial commit exists to make the thin project baseline
recoverable and comparable; it is not a heavy decision-context gate.

Initial baseline commit rules:

```text
commit the generated or refreshed skeleton files such as README.md, PRD.md, AGENTS.md, CONTEXT.md, SECURITY.md, and docs/
run Commit Identity preflight before committing
do not proactively add raw source materials to the initial commit unless the user asks
do not unstage, remove, or rewrite raw source materials that were already tracked or intentionally staged by the user
prefer a simple commit message such as "Initialize Grill Driven Spec baseline"
use Lore if it is already available and appropriate, but do not install or block Stage 0 solely to use Lore for this commit
if Lore is missing, use a normal git commit or record that the baseline commit was not created because commits are unavailable
```

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

Keep all other files thin. Use `TBD` for unknown commands, stack, architecture, or decisions. Do not invent product scope, product features, technical stack, business rules, architecture, user personas, or implementation directories. Do not create `UBIQUITOUS_LANGUAGE.md` during Stage 0 unless the user explicitly asks for DDD-oriented documentation.

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
external knowledge: when external systems or mature domain patterns appear, classify them lightly using External Knowledge and Domain Pattern Readiness
stop condition: MVP boundary, non-goals, and core behavior can become testable requirements
constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements
```

After each important answer, update `PRD.md`.

Do not create an OpenSpec change yet.

Use External Knowledge and Domain Pattern Readiness during product clarification, but keep it
lightweight. Surface a domain pattern only when it helps clarify the first slice, and ask at most one
blocking question at a time.

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
external knowledge: classify required external systems, external docs, and domain-pattern assumptions as known, provisional, or blocking
stop condition: enough project context exists to propose the first OpenSpec change
constraints: do not continue grilling for non-blocking UI or implementation details, do not write code, and do not create a change until the user confirms propose
```

Update:

```text
PRD.md for product intent
CONTEXT.md for stable project context and small domain glossaries
UBIQUITOUS_LANGUAGE.md for dedicated domain terminology when the glossary has outgrown CONTEXT.md
docs/architecture.md for long-lived architecture knowledge
docs/adr/ for hard-to-reverse decisions with real tradeoffs
docs/inbox/ for raw stakeholder materials
```

Stage 3 is a context pass, not a full product-design interview. Ask only questions that block a testable first OpenSpec change.

Keep domain terminology in `CONTEXT.md` by default. Create `UBIQUITOUS_LANGUAGE.md` only when it
materially improves clarity, such as when domain terms are numerous, terms map differently across
external systems, the same word is used ambiguously, code/API naming needs a stable glossary, or DDD
modeling has begun. When creating it, move or link detailed terms there and leave `CONTEXT.md` as the
project context overview.

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

Use External Knowledge and Domain Pattern Readiness during Stage 3. Domain patterns should reduce
questions rather than multiply them: propose a small default boundary for the first OpenSpec slice
and carry the rest as Open Questions or non-goals.

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
inventing project shape. Keep this lightweight, but do not treat silence as approval to choose the
stack.

Greenfield readiness can come from:

```text
the user confirming stack/runtime, source layout, storage, deployment target, integration constraints, and broad UI direction
an explicit user instruction that the agent may choose conservative defaults, followed by the agent recording the selected defaults and rationale in design.md
```

When stack/runtime is not already confirmed for a greenfield implementation, ask one compact
technical readiness question before review can pass. Make the question useful, not open-ended:
recommend a default stack for the MVP, give one short reason, mention one or two reasonable
alternatives when relevant, and ask the user to confirm the recommendation or authorize the agent to
choose conservative defaults. Do not start development from a response that merely says the change is
ready if stack/runtime, source layout, and local verification are still only implied.

For external systems, vendor services, organization-owned workflows, and domain-pattern assumptions,
apply the workflow-wide External Knowledge and Domain Pattern Readiness rule instead of treating
greenfield projects as a special case.

Source layout is part of technical readiness. Before implementation creates business code, the
workflow must know where product source and tests belong. Do not place business source files such as
`app.py`, `main.py`, `index.ts`, or similar entry points in the project root just because the stack is
not confirmed. Prefer stack-specific conventions and record the chosen layout in the active
`design.md`.

Default source layout guidance:

```text
existing implemented project -> inherit current source and test layout
Go -> prefer Go module conventions such as cmd/, internal/, and package directories; use pkg/ only when it represents a real exported package boundary
Node/TypeScript, React, Python app/service, Rust app, and most other greenfield application projects -> prefer src/ plus an appropriate tests/ or stack-native test location
small script/tool project -> use a named package, module directory, or scripts/ when multiple files are expected; root-level scripts are allowed only when that is the confirmed project shape
documentation-only, spec-only, or skill/plugin projects -> do not invent a src/ directory unless implementation code is actually needed
```

For existing projects, inherit current architecture, stack, UI patterns, design system, test style,
source layout, and deployment conventions by default. Ask technical or UI questions only when the proposed change
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
the user confirms the choice, the existing project provides the convention, or the user explicitly
authorizes default choices and the agent records the chosen defaults. Do not turn every low-level
library choice into grilling; focus on choices that affect project shape, user experience direction,
data persistence, security, deployment, or the ability to run and verify the MVP.

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
source and test layout
primary data storage or persistence approach
authentication, authorization, privacy, or sensitive-data handling when relevant
external integrations and AI/tool dependencies when relevant
basic UI direction or experience surface when user-facing UI is part of the first slice
local run, test, and verification expectations
deployment target if it affects the first slice
```

Before review passes, any proposed default that is required to implement the first slice must either
be confirmed by the user or converted into an explicit agent-selected default under user
authorization. Do not leave required stack/runtime, source layout, or local verification choices as
"proposed" or "awaiting approval" while asking to enter development.

For existing projects, `design.md` should state whether the change follows existing technical and UI
conventions or list the specific conventions it changes.

For any workflow path, if the change depends on external knowledge, `design.md` must record the
External Knowledge and Domain Pattern Readiness classification. For known dependencies, reference
the source of truth such as docs, adapters, schemas, fixtures, or contract tests. For provisional
dependencies, record the mock boundary, assumptions, non-goals, replacement trigger, and any
domain-pattern assumptions. Specs must describe behavior against the agreed boundary, not pretend
unknown external behavior is confirmed.

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
projects, if stack/runtime, source layout, persistence, security/data handling, UI direction, or verification
environment is still TBD and needed for the first implementation slice, review fails and the agent
must ask one compact readiness question before development. That question should recommend a
specific stack/runtime when the project shape is unclear, not simply ask whether to proceed. For
existing projects, review should not
fail on inherited stack or UI choices unless the change affects architecture, data, security,
deployment, source layout, local verification, shared UI conventions, or user workflow conventions.

For any workflow path, if required external knowledge is blocking, review fails unless the dependency
is classified as known or explicitly provisional. The next gate should ask for docs/examples/access
details, identify the existing project contract to inherit, or ask whether to proceed with a mock
boundary and documented assumptions.

If anything is unclear, return to grill-me or grill-with-docs, update the relevant files, and review again.

Gate prompt to user:

```text
Review passed. Specs are testable and tasks are executable.
I recommend entering development and test. I will follow tasks.md and pause if design or requirements conflict with reality.
```

Translate or adapt this gate prompt to the project language before showing it to the user. Keep
command output, change names, and file names such as `openspec validate`, `tasks.md`, and `design.md`
unchanged.

### 6. Implement and Test

Implement only after user confirmation.

Follow `tasks.md` in order. Prefer TDD for behavior changes. Update `tasks.md` as work completes.

If work is interrupted or resumed during implementation, use the global Workflow Resume rules and
first re-read the current implementation status before continuing:

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

Use the project language for the verification handoff, including instructions, test status, known
limitations, and any request for the user to manually verify a flow. Preserve exact commands, URLs,
file names, and error identifiers.

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

After archive verification, handle the commit gate before calling the workflow fully complete.

Commit gate rules:

```text
check git status after archive and spec sync
run Commit Identity preflight before creating any Lore or normal git commit
if there are relevant uncommitted changes, recommend a Lore commit to preserve requirement, design, implementation, verification, and archive context
use Lore when it is available and appropriate
if Lore is missing, offer a normal git commit or record a user handoff instead of blocking archive completion forever
do not treat the commit gate as handled until a Lore commit is created, a normal git commit is created, the user explicitly says they will handle it, or the user intentionally skips the commit
if the user manually applied, verified, or archived the change, resume should still detect this gate and prompt for the commit decision before moving to the next feature
```

Use the project language for archive readiness summaries, archive results, remaining gaps, and any
follow-up confirmation question. Preserve generated archive names, command names, spec paths, and
dates exactly.

## Hard Rules

- Do not cross a major stage gate without telling the user what you are about to do.
- Do not create an OpenSpec change from vague intent.
- Do not implement immediately after propose; review first.
- Do not put unconfirmed assumptions into specs as facts.
- Do not archive before user verification.
- Do not create git or Lore commits before resolving the intended author and committer identity.
- Do not call a new-project Stage 0 fully initialized when git is available but the generated baseline has not been committed or explicitly handed off.
- Do not call an archived change fully complete until the commit gate has been handled by commit, user handoff, or explicit skip.
- Do not answer side questions in a way that loses the active gate; classify the turn, capture durable facts when needed, and steer to an explicit outcome.
- Do not silently switch focus when the user mentions another feature or direction; ask whether to switch, record a candidate, or return to the current gate.
- Do not end workflow replies with vague invitations while a gate is open; ask the single next question or name the next confirmation.
- Keep documentation alive throughout the work, not only at the end.

## References

Use these only when useful:

- `references/prompts.md` for stage prompts.
- `references/file-skeletons.md` for starter document skeletons.
- `references/review-checklist.md` for proposal/task review.
