---
name: grill-driven-spec
description: Use when turning vague product ideas, existing-project adoption, or specific feature/change requests into clarified PRD/context docs and OpenSpec-ready proposals before coding; also use when resuming Grill Driven Spec/OpenSpec work, handling archived-but-uncommitted changes, commit readiness, or Lore-first workflow commits. Triggers on grill-driven spec, grill-to-OpenSpec, PRD plus OpenSpec, 0-to-1 project setup, existing project adoption, next-slice selection, requests to clarify requirements before implementation, OpenSpec archive follow-up, and bare commit intent after workflow/archive work.
---

# Grill Driven Spec

Use this skill to act as a staged product/spec lead for AI-assisted development.

The core rule:

```text
grill first, spec second, code last
```

The user expresses ideas and confirms phase transitions. You ask focused questions, update project documents, decide whether the current phase is ready to advance, and explicitly ask for confirmation before entering the next stage.

## Post-Archive Commit Policy

When Grill Driven Spec or OpenSpec work has been synced, archived, or appears archived but related
changes are still uncommitted, a bare commit intent means "handle workflow commit readiness." It does
not mean ordinary `git commit` by default.

For context-rich workflow commits, especially post-archive commits, use Lore-first policy:

```text
resolve author and committer identity
verify Lore availability
run lore commit when Lore is available and appropriate
use normal git only when Lore is unavailable, inappropriate for the environment, or explicitly requested by the user
```

This policy does not require Lore for the initial Stage 0 baseline commit. Missing Lore must not
block skeleton creation, requirement grilling, or early normal git commits that do not need workflow
decision context.

## Skill Composition

This workflow composes other skills when they are available:

```text
grill-me -> Stage 1 product intent clarification
grill-with-docs -> Stage 3 project context alignment
OpenSpec -> proposal, specs, design, tasks, validation, and archive lifecycle
Lore -> commits that should preserve decision context
```

Do not copy the full behavior of dependent skills into this file. `grill-driven-spec` defines when
to invoke them, what project artifacts they should read and update, when to stop, and which stage
boundaries must not be crossed. The dependent skill owns its own interaction style unless this workflow gives a
specific contract needed for PRD/OpenSpec convergence.

### Skill Delegation Boundary

When `grill-driven-spec` is active, it owns:

```text
workflow path selection
stage transitions and readiness checks
user confirmation points
artifact routing
OpenSpec proposal, review, development, verification, and archive lifecycle
```

Other skills may be invoked only as bounded helpers when the user explicitly asks for that
skill/workflow, or when the current `grill-driven-spec` stage delegates a narrow task to it.

A delegated helper must:

```text
receive a narrow contract
preserve the helper's native interaction style and core behavior
write findings back to grill-driven-spec artifacts such as PRD.md, CONTEXT.md, docs/, or the active OpenSpec change
avoid introducing its own unrelated major readiness checks
avoid redirecting to its own unrelated artifact structure
avoid bypassing OpenSpec readiness checks
return control to grill-driven-spec after the bounded task
```

Do not let a helper skill start its own end-to-end workflow, require its own visual/browser/setup
confirmation, or create parallel specs outside the Grill Driven Spec artifacts unless the user
explicitly requested that separate workflow or that confirmation is the current blocking question.

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

### First-run Bootstrap

Run a lightweight bootstrap before the first workflow readiness check in a new project or a new agent
environment. Bootstrap is not a separate product stage; it is the dependency and workspace sanity
check that lets stage progression run predictably.

Classify each dependency by what it blocks:

```text
git -> required for repository initialization and commits; missing git does not block creating the Stage 0 skeleton
grill-me -> required before Stage 1 product clarification; missing grill-me blocks native product grilling
OpenSpec -> required before Stage 2 initialization and any formal OpenSpec change; missing OpenSpec does not block Stage 0 or Stage 1
grill-with-docs -> required before Stage 3 project/domain context grilling; missing grill-with-docs blocks that delegated stage
Lore -> default for context-rich workflow commits; missing Lore does not block Stage 0, Stage 1, normal git commits, or implementation
```

Skill dependencies such as `grill-me` and `grill-with-docs` are agent skills, not shell commands.
Do not check them with `which` or install similarly named CLI packages. If the current agent cannot
prove that a required skill is loaded, say which stage is blocked, show the verified install or
enablement source, and ask the user whether to install, enable, or stop at that boundary.

Do not silently install global tools, write global prompt/config files, or substitute package names.
When a dependency is missing, report:

```text
dependency name
verified identity/source
current status: available, unavailable, unknown, or skipped
first stage it blocks
recommended next action
```

Record durable setup limitations in `docs/ai-tools.md` once the project skeleton exists. Before the
skeleton exists, keep the bootstrap report in chat and continue only with stages not blocked by the
missing dependency.

## Stage Readiness

Follow these readiness checks in order unless the project already has later-stage artifacts.

### Stage 0 Invariants

For a `0-to-1` entry, Stage 0 is mandatory and must happen before product, stack, design, visual
companion, or OpenSpec proposal questions.

When the first user message already contains a product idea, capture it only as seed input for
`PRD.md`. Do not ask any follow-up question about that idea until Stage 0 has either completed or
hit a filesystem/dependency blocker. The first visible `0-to-1` response should say that the project
is being bootstrapped and then perform or report Stage 0 actions, not start product grilling.

Stage 0 must:

```text
classify the folder as empty, raw-material-only, unstructured, meaningful implementation, or existing repository worktree
detect whether the current folder is already inside a git repository before running git init
run git init when git is available, the folder is not already inside a repository, and the folder is classified as 0-to-1
create the thin skeleton files listed in references/file-skeletons.md
preserve raw source materials in place and list their paths in PRD.md without treating them as confirmed requirements
record missing or skipped tools in docs/ai-tools.md after that file exists
create an initial baseline commit containing only generated or refreshed workflow skeleton files when git is available and an allowed author/committer identity is available
stop at commit identity readiness before any baseline commit when no allowed author/committer identity is available
```

Stage 0 must not:

```text
run inside a folder with meaningful implementation artifacts; switch to Existing Project Adoption instead
create a nested git repository when a parent repository already owns the worktree
delete, move, rename, summarize destructively, overwrite, stage, or commit raw source materials without explicit user approval
choose a stack, create business source directories, write business code, create an OpenSpec change, or start design work
call Stage 0 fully initialized when git is available but the generated baseline has not been committed or explicitly handed off
```

If git is unavailable, create the skeleton when the filesystem is writable, record git as unavailable,
and mark the baseline commit as unavailable or user-handled. Missing OpenSpec or Lore never blocks
Stage 0. Missing `grill-me` does not block Stage 0, but it blocks entering Stage 1.

Use progressive disclosure:

```text
read references/state-machine.md when classifying entry path, resuming work, handling focus changes, routing user turns, or preparing commits
read references/path-guides.md when executing 0-to-1, adoption, existing-change, OpenSpec proposal, review, implementation, verification, or archive stages
read references/prompts.md when a compact user-facing stage prompt is useful
read references/file-skeletons.md when creating thin project documents
read references/review-checklist.md before development
read references/helper-capabilities.md before invoking product, design, or architecture maturity helpers
```

The references are not optional background. They are the canonical detailed rules for their topics.
`SKILL.md` remains the workflow owner: it defines the trigger, delegation boundary, hard boundaries, and
rules that must not be bypassed.

## Progress Tracking

Maintain a visible task plan for the workflow whenever the agent environment provides a task,
checklist, or progress-plan tool.

Rules:

```text
create the progress plan during preflight or resume, before doing substantial stage work
use one task per active readiness check or phase, not one task per tiny substep
keep exactly one task in progress whenever possible
mark tasks completed as soon as their readiness check is actually satisfied
when resuming, rebuild the plan from the earliest incomplete readiness check based on files, not chat memory
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
plan that matches the chosen path and starts at the earliest incomplete readiness check. Keep the user-facing
`Driving` heading as the phase label in chat, and use the progress plan as the side-channel status.

## Conversation Steering

Drive the workflow like a coach and project manager, not like a rigid form. The user may ask side
questions, explore doubts, change their mind, or raise new feature ideas. Answer useful detours, but
route every turn back into the active workflow state.

Before responding to each user turn, classify it:

```text
readiness-answer -> the user answered the current blocking question or confirmed the next stage
readiness-clarification -> the user asks what the current question means, why it matters, or how to choose
productive-tangent -> the user asks a related side question that may reveal requirements, risks, constraints, terminology, or implementation context
new-focus -> the user introduces a different feature, product direction, or change request
meta-process -> the user questions the workflow, pace, readiness checks, or whether this process is working
```

Then respond according to the route:

```text
readiness-answer:
  absorb the answer, update or prepare the relevant artifact, and reassess whether the current stage can advance

readiness-clarification:
  explain the question briefly, reduce the decision to an easier shape, and ask one clearer version of the current readiness question

productive-tangent:
  answer the tangent, record any durable requirement/risk/constraint/term/open question/candidate in the right artifact when file edits are in scope, then steer back to the active readiness question

new-focus:
  do not silently switch; ask whether to switch focus now, record it as a Candidate Change, or return to the current readiness question

meta-process:
  pause forward motion, explain why the current confirmation is needed, adjust the pace if needed, then offer the smallest useful next step
```

A tangent must end in one of these explicit steering outcomes:

```text
return to current readiness question
record as Candidate Change
switch-focus confirmation
update artifact and reassess readiness
pause workflow by explicit user request
```

Do not let the last line of a workflow reply be vague when the active readiness question is still open. Prefer a
concrete steering move:

```text
Good:
"I will record that as a Candidate Change. Before the next stage: for the first slice, should the user complete A or B first?"

Bad:
"Anything else?"
"What else should we discuss?"
"We can continue."
```

Use checkpoint recovery when drift accumulates. If two consecutive user turns do not advance,
revise, or explicitly defer the active readiness question, the next assistant reply must include a short
checkpoint:

```text
active focus
what needs confirmation before the next stage
what the side discussion changed or clarified
the single next question or confirmation needed
```

Also checkpoint when:

```text
the user says continue, next, then what, or similar
the conversation has become long enough that the next needed confirmation may be unclear
the user raises a new direction without saying whether to switch focus
the assistant is about to enter a major new stage
the assistant resumes after interruption or context compaction
```

Checkpoints should be compact and natural in the project language. They do not always require a
large `Driving` heading, but major phase transitions still require the `Driving` heading described
below.

## Project State Detection

Before choosing a workflow path, classify the current folder and user intent using both file signals
and the user's words. Use `references/state-machine.md` as the canonical decision table.

Supported paths:

```text
0-to-1
Existing Project Adoption
Existing Project Change
Next-slice selection
```

If signals conflict, explain the classification briefly and ask before entering a major new stage. Do not
run the 0-to-1 skeleton flow in an implemented project. Do not run full adoption when a baseline is
already sufficient for a specific requested change.

## Workflow Resume

When a session resumes or the user says to continue, inspect current artifacts before choosing a
stage. Do not rely on chat memory alone. Use `references/state-machine.md` for the resume checklist,
OpenSpec file-state matrix, multiple-active-change handling, and archived-but-uncommitted commit
readiness.

Resume from the earliest incomplete readiness check. Do not repeat completed stages unless artifacts are
missing, inconsistent, or the user explicitly asks to revisit them.

## Change Focus and Candidates

Keep change context from different features separate. Use `references/state-machine.md` for focus
switching rules and candidate shape.

One active focus is allowed per session. Do not mix PRD, design, tasks, or review state between
features. Do not promote a candidate into `openspec/changes/` until desired behavior and convention
impact are clear enough for review.

If planning artifacts contain future-facing requirements, next-slice notes, first-slice direction,
design direction, architecture/security decisions, product-track decisions, or Candidate Changes
that are not linked to an active OpenSpec change, treat that as Planning Artifact Promotion readiness.
Planning artifacts include `PRD.md`, `CONTEXT.md`, `DESIGN.md`, `SECURITY.md`,
`docs/architecture.md`, `docs/adr/`, `docs/proposals/`, and Candidate Changes. Do not implement from
unpromoted planning content. Ask whether to promote it into an OpenSpec proposal, keep/defer it as a
Candidate Change, commit/archive it as docs-only housekeeping, or treat it as background context for
the current work.

## Commit Identity

Before creating a git or Lore commit, resolve author and committer identity. Do not silently use the
machine's global git identity in an existing project. Use `references/state-machine.md` for the full
commit identity preflight and selection rules.

A bare commit intent means the user is asking the workflow to handle current commit readiness without
specifying a commit tool, message, file scope, handoff, or skip decision. It is not approval to
invent author data, use a partial identity, use machine-global git config, or downgrade from Lore to
a normal git commit when Lore is available and appropriate. For context-rich workflow commits,
especially post-archive commits, the default command path is Lore-first: check Lore availability and
use `lore commit` unless Lore is unavailable, inappropriate for the environment, or the user
explicitly asks for a normal git commit. If no allowed source gives one complete `Name <email>`
identity, ask the user before committing.

Commit messages are repository history, not project documentation. Choose the commit message and
Lore `intent`/`body` language from recent repository commit history by default. If history is
clearly English, use English even when the current conversation or project docs are not English. If
history is clearly in the resolved project language, use that language. If commit history is mixed
or unclear, use the resolved project language unless the user explicitly asks for a commit language.

## Progressive Maturity

Start lightweight, then add maturity helpers only when the project shows that need.

Use this progression:

```text
Fast Path:
- default for 0-to-1 and first-slice work
- seed thin artifacts, choose the build track, clarify enough, create the first OpenSpec slice, implement, and verify
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
- optional helper capability: solution design, architecture review, technology selection, threat modeling, technical debt assessment, release readiness
- write outcomes to docs/architecture.md, docs/adr/, SECURITY.md, active OpenSpec design.md, and tasks.md
```

Do not invoke maturity helpers just because they exist. Use them when the current user goal,
project state, or OpenSpec review reveals that maturity dimension. Keep the first working slice
focused; let product, design, and architecture maturity deepen over later iterations.

For 0-to-1 work, distinguish a throwaway prototype from a product-track build before deciding
engineering discipline. Record the selected track in `PRD.md`. Product-track builds default to
DDD-lite boundaries and TDD-first behavior tasks; throwaway prototypes may use pragmatic shortcuts
when those shortcuts are recorded as limitations. MVP controls scope, not engineering discipline.
Prefer `first slice`, `first product slice`, or `first testable slice` in workflow language; use
`MVP` when the user uses that term or when discussing scope trimming.

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
by the relevant OpenSpec review readiness check. Treat findings as blocking only when they affect safety,
correctness, data, deployment, reversibility, or the user's confirmed goal.

For Design Maturity, visual companion tools may be used when they make UI or interaction decisions
easier to evaluate. They are acceptable only when the current `Driving` phase and readiness question remain clear,
the visual board answers a narrow design question, text replies are accepted equally to visual
clicks, choices are mirrored back into chat, and decisions are written to `DESIGN.md` or the active
OpenSpec `design.md`. If those conditions are not met, fall back to chat, screenshots, existing
project UI, or agent-native UI review.

Helper skills and visual companions may run their own lightweight interaction flow when that improves
the user's thinking. Treat that flow as a bounded handoff, not a replacement for Grill Driven Spec.
Before yielding to a helper-specific prompt, keep the current `Driving` phase and readiness question visible and say what
decision the helper is helping with. If the helper requires a standalone invitation, browser consent,
or other waiting step, the same assistant turn must still include a normal chat response with the
active focus, current readiness question, and one concrete text-answerable question. The helper invitation may be
offered as an option, but it must not be the only visible next step. The next assistant turn must
resume from the user's reply and reconnect it to the current readiness question. Do not leave the user with an
unexplained helper prompt, and do not require a visual click when a normal chat reply is enough.

When a user asks to improve UI or interactions in an existing project, treat it as a Design Maturity
existing-project change unless project-state signals say otherwise. The first stopping point after
preflight should ask for the narrow design outcome to optimize, for example visual polish,
workflow friction, accessibility/responsiveness, or a specific screen. Offer screenshots or browser
review only as optional support after the `Driving` phase and text-answerable question are visible.

See `references/helper-capabilities.md` for helper capability slots and example implementations.

## Project and Conversation Language

Use one stable primary language for project artifacts created or updated by this workflow, and use
the same language for the conversation around the workflow unless the user explicitly asks otherwise.
The goal is a natural project-local experience, not word-for-word translation of template text.

Default rules:

```text
resolve the project artifact language before creating or substantially updating PRD, CONTEXT, OpenSpec proposal, design, specs, tasks, or durable docs
for new projects, use the primary language of the user's initial project request
for existing projects, inherit the primary language of authoritative docs such as README.md, PRD.md, CONTEXT.md, or OpenSpec artifacts
if the project language is unclear, ask the user once before creating substantial docs
do not switch artifact language just because a later chat message uses a different language
keep file names, commands, code identifiers, dependency names, and workflow/tool names such as grill-me, grill-with-docs, OpenSpec, Lore, Stage, readiness, proposal.md, design.md, and tasks.md in their established form
do not preserve template section headings, placeholder words, or explanatory prose in English merely because this skill's examples are written in English
translate generated document titles, section headings, status labels, placeholders, and prose into the resolved project artifact language unless an existing project has already established those labels
preserve raw source materials in their original language
write summaries, confirmed requirements, OpenSpec proposal text, spec requirements, acceptance criteria, design notes, and tasks in the project artifact language unless quoting source material
write user-visible phase transitions, readiness prompts, validation summaries, status updates, and confirmation questions in the project language
apply this conversation-language rule throughout Stage 0 through Stage 8, including development progress, verification handoff, and archive reporting
do not paste English readiness prompt templates verbatim when the project language is not English; translate or adapt the prompt while preserving command names and file names
do not let English CLI output, OpenSpec output, tool labels, or prompt templates change the reply language; summarize tool results in the project language while preserving exact commands, file names, and error identifiers
do not let English examples in this skill become the default language for generated project artifacts
prefer natural wording in the project language over rigid literal translation; keep the readiness meaning and decision point clear
```

Do not rewrite unrelated existing docs just to normalize language. Keep language consistent within
the files, OpenSpec change, and user-visible workflow messages touched by the current workflow.
When a change touches artifacts in the wrong language, fix the touched artifact sections before
review or archive rather than translating the whole repository.

English examples and readiness prompts in this skill are semantic templates, not required output text.
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
record pattern assumptions in the localized open-questions section of PRD.md or in design.md, not specs
do not treat industry-pattern assumptions as confirmed external-system facts
```

Do not block the Fast Path just because more domain knowledge could be gathered. Block only when the
missing external fact affects safety, correctness, data shape, integration behavior, local
verification, reversibility, or the user's confirmed goal. Otherwise, carry it as an Open Question,
non-goal, or provisional design assumption.

## Driving Transition Output

When entering a new workflow phase, make the transition visually obvious to the user with a large
Markdown heading before doing phase work.

For the first assistant response in a new conversation, make the heading and first sentence
title-friendly. If the user's message starts with a command such as `/grill-driven-spec`, restate the
actual project, adoption, or change focus in natural language before asking the first readiness question.
Do not use only a generic tool name, stage number, or command echo as the first visible topic.

Use this semantic shape, adapting labels to the project language:

```markdown
# Driving: <short phase or focus>

Before the next stage: <one sentence describing what must be confirmed before moving on>.
```

Use `Driving` headings for 0-to-1, adoption, existing-project changes, implementation,
verification, and archive. Do not rely on numbered Stage headings, `Adoption:` headings, or
`Change:` headings in user-facing transition output.

When the project language is not English, keep `Driving` as the stable workflow label, but translate
or adapt labels such as `Before the next stage` and the descriptive text so the transition does not feel like
an English template pasted into the conversation.

Tool-generated labels such as `Implementing: <change-name>` may appear, but they do not replace the
`Driving` heading and current readiness question.

Keep the heading short and stable. Do not rely on emojis, colors, terminal control codes, or
agent-specific UI features for stage visibility.

### Existing Project Adoption Entry

Use this path when the folder already contains a meaningful implemented product, but baseline docs
or OpenSpec context are missing or too thin. Do not run the 0-to-1 skeleton flow. Adoption inventories
current reality, separates observed behavior from confirmed desired behavior, refreshes only thin or
missing guidance docs, and stops once the baseline can orient future changes.

Before doing adoption work, read `references/path-guides.md#existing-project-adoption`.

### Existing Project Change Entry

Use this path when the folder already contains a meaningful implemented product and the user asks to
add, change, or fix product behavior rather than adopt the whole project.

Do not force full adoption when existing baseline context is enough for the requested change. Run a
lightweight change preflight, inherit existing conventions for small changes, ask one focused impact
question for convention-impacting changes, and create an OpenSpec proposal only after desired
behavior and convention impact are clear enough for review.

Before doing change-scoped work, read `references/path-guides.md#existing-project-change`.

### 0. Preflight and Seed the Project Skeleton

For a 0-to-1 entry, run preflight and create the thin project skeleton before product, stack, design,
or visual companion questions. Preserve raw source materials as inbox sources, list them in `PRD.md`
without treating them as confirmed requirements, and create the baseline commit when git and commit
identity are available.

Before doing 0-to-1 work, read `references/path-guides.md#0-to-1-project` and
`references/file-skeletons.md`.

### 1. Clarify Product Intent With grill-me

Delegate to `grill-me` for product clarification needed to make the first change testable. This is
a native helper handoff, not a local reimplementation of grill-style questions.

The delegation contract must preserve `grill-me` behavior:

```text
interview the user relentlessly until shared understanding is reached
walk the design tree one branch at a time
ask one question at a time
provide the recommended answer for each question
explore the codebase instead of asking when the answer is already discoverable
```

Bound that native behavior to this workflow:

```text
goal: clarify enough product intent for the first OpenSpec change
primary write target: PRD.md
stop condition: build track, first-slice boundary, non-goals, and testable core behavior are clear
constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements
return control to grill-driven-spec when the stop condition is met or a blocking dependency/question appears
```

Update `PRD.md` after important answers. If `grill-me` is unavailable or cannot be invoked by the
current agent, do not pretend to run it or silently replace it with ordinary questioning. Stop at
Stage 1, report the missing helper, and offer the verified install/enablement path.

Before Stage 1 work, read `references/path-guides.md#product-clarification`.

### 2. Initialize OpenSpec

Initialize or verify OpenSpec before creating formal changes. Treat partial initialization as a real
state, record non-blocking limitations in `docs/ai-tools.md`, and do not create a change until the
user confirms propose.

Before Stage 2 work, read `references/path-guides.md#openspec-initialization`.

### 3. Fill Project Context With grill-with-docs

Delegate to `grill-with-docs` when PRD is clear but project/domain/technical context is not ready
for a proposal. This is a native helper handoff for grilling against docs, domain language, and code.

The delegation contract must preserve `grill-with-docs` behavior:

```text
interview against the existing glossary, docs, and code
sharpen fuzzy or conflicting terminology
ask one question at a time and provide the recommended answer for each question
update CONTEXT.md inline when domain terms are resolved
offer ADRs only for hard-to-reverse, surprising, real tradeoff decisions
```

Bound that native behavior to this workflow:

```text
goal: fill only the context needed for the first OpenSpec proposal
inputs: PRD.md, AGENTS.md, CONTEXT.md, docs/, openspec/
write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, docs/inbox/
question focus: only questions that block a testable first OpenSpec change
constraints: do not write business code, do not create a change until the user confirms propose, and do not start a separate end-to-end docs workflow
return control to grill-driven-spec when enough context exists to propose
```

For greenfield projects, required technical readiness must be confirmed or explicitly delegated
before review can pass. For existing projects, inherit conventions unless the change affects them.
If `grill-with-docs` is unavailable, stop at Stage 3, report the missing helper, and offer the
verified install/enablement path.

Before Stage 3 work, read `references/path-guides.md#project-context`.

### 4. Create the OpenSpec Proposal

Create OpenSpec change artifacts only after user confirmation. Specs describe testable behavior;
design records technical approach, constraints, risks, and classified assumptions; tasks include
implementation, tests, docs, CI, durable docs closure work when relevant, and TDD/DDD tasks required
by the selected build track. Resolve the project artifact language before writing them. Do not
implement after proposing.

Before Stage 4 work, read `references/path-guides.md#openspec-proposal`.

### 5. Review Before Development

Review before coding. The proposal must match PRD/context, specs must be testable, design must not
depend on unconfirmed assumptions, technical approach must be ready, and tasks must be executable.
OpenSpec artifacts and user-facing readiness text must use the resolved project language except for code
identifiers, commands, file names, and established workflow terms. If review fails, return to the
relevant grill/context readiness check and ask one blocking question. If it passes, ask the user to confirm
development.

Before Stage 5 work, read `references/path-guides.md#review-before-development` and
`references/review-checklist.md`.

### 6. Implement and Test

Implement only after user confirmation. Follow `tasks.md` in order, prefer TDD for behavior changes,
update `tasks.md` as work completes, and update the relevant durable artifact when implementation
reveals new product, domain, architecture, design, or task facts.

Before Stage 6 work, read `references/path-guides.md#implement-verify-sync-and-archive`.

### 7. Ask the User to Verify

After implementation and tests, do not archive immediately. Ask the user to verify the core flow,
provide run commands, first-slice behaviors, non-goals, test status, and known limitations, and
never claim manual or browser verification passed unless it actually ran and passed.

Before Stage 7 work, read `references/path-guides.md#implement-verify-sync-and-archive`.

### 8. Sync and Archive

Archive only after user verification passes. Before archiving, re-check tasks, tests/lint/build,
README, PRD, CONTEXT, docs, specs, blocking open questions, and the Durable Docs Closure Audit.
Also check language consistency for artifacts touched by the current change. After archive
verification, handle commit readiness before calling the workflow complete.

Before Stage 8 work, read `references/path-guides.md#implement-verify-sync-and-archive` and the
commit identity rules in `references/state-machine.md#commit-identity-state`.

## Hard Rules

- Do not enter a major new stage without telling the user what you are about to do.
- Do not skip First-run Bootstrap when dependencies or agent skill availability are unknown.
- Do not ask product, stack, design, visual companion, or OpenSpec proposal questions before Stage 0 skeleton exists for a 0-to-1 project.
- Do not treat a product idea in the first user message as permission to grill before Stage 0; capture it as seed input and bootstrap first.
- Do not create a nested git repository when the current folder is already inside a parent git worktree.
- Do not replace unavailable `grill-me` or `grill-with-docs` with ordinary questioning while claiming the delegated grill stage is running.
- Do not drop the delegated grill requirement to provide a recommended answer for each grill question.
- Do not create an OpenSpec change from vague intent.
- Do not implement immediately after propose; review first.
- Do not implement from future-facing planning artifact changes before the user chooses whether to promote them to OpenSpec, keep/defer them as Candidate Changes, commit/archive them as docs-only housekeeping, or treat them as background context.
- Do not put unconfirmed assumptions into specs as facts.
- Do not generate OpenSpec `proposal.md`, `design.md`, `tasks.md`, or specs in English by default when the resolved project artifact language is not English.
- Do not archive before user verification.
- Do not archive until the Durable Docs Closure Audit has been run; block archive only on future-facing durable-doc content that is relevant to the current change and still unresolved.
- Do not create git or Lore commits before resolving the intended author and committer identity.
- Do not fabricate commit author or committer identity from usernames, project names, remote owners, package metadata, chat names, or placeholder emails.
- Do not call a new-project Stage 0 fully initialized when git is available but the generated baseline has not been committed or explicitly handed off.
- Do not call an archived change fully complete until commit readiness has been handled by commit, user handoff, or explicit skip.
- Do not answer side questions in a way that loses the active readiness question; classify the turn, capture durable facts when needed, and steer to an explicit outcome.
- Do not silently switch focus when the user mentions another feature or direction; ask whether to switch, record a candidate, or return to the current readiness question.
- Do not end workflow replies with vague invitations while a readiness question is open; ask the single next question or name the next confirmation.
- Do not end a workflow turn after tool use, preflight, helper handoff, or browser/visual-companion invitation without a normal visible chat response that includes the current `Driving` phase and one text-answerable next question.
- Keep documentation alive throughout the work, not only at the end.

## References

Reference map:

- `references/state-machine.md` for entry classification, workflow resume, focus switching, conversation routing, and commit identity.
- `references/path-guides.md` for path-specific execution details and readiness prompts.
- `references/prompts.md` for stage prompts.
- `references/file-skeletons.md` for starter document skeletons.
- `references/review-checklist.md` for proposal/task review.
- `references/helper-capabilities.md` for optional product, design, and architecture maturity helpers.
