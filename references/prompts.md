# Workflow Prompts

Use these prompts as compact starting points. Adapt them to the current project.

Before using a stage prompt, classify the project state:

```text
0-to-1 -> no meaningful implementation and no coherent PRD/CONTEXT/OpenSpec baseline
Existing Project Adoption -> implementation exists, but baseline docs/OpenSpec are missing or too thin and baseline understanding is the work
Existing Project Change -> implementation exists, baseline is enough to orient the requested add/change/fix/continue work
Next-slice selection -> an initial OpenSpec change is complete or shipped and the user asks what to improve next
```

If signals conflict, explain the classification briefly and ask before entering a major new stage.

On first use in a new agent environment, run bootstrap before the first workflow readiness check.
Report dependency status only as much as needed to explain blockers:

```text
git -> blocks repository initialization and commits only; missing git does not block skeleton creation
grill-me -> blocks Stage 1 native product grilling
OpenSpec -> blocks Stage 2 initialization and formal changes
grill-with-docs -> blocks Stage 3 native docs/domain grilling
Lore -> default for context-rich workflow commits, not required for early workflow
```

Do not silently install, substitute package names, or claim a delegated helper is running when the
agent cannot load it.

Use the resolved project language for all user-visible workflow replies. For a new project, this is
usually the user's initial request language; for an existing project, inherit the language of the
authoritative project docs. Treat English prompt text in this file as semantic guidance, not output
to paste verbatim. Reply naturally in the project language for phase transitions, status updates,
validation summaries, readiness prompts, confirmation questions, verification instructions, and archive
reports. Preserve exact command names, file names, change names, URLs, and error identifiers.

When grill-driven-spec is active, keep it as the owner of workflow path, readiness checks, artifacts, and
OpenSpec lifecycle. Other skills may be used only as bounded helpers with a narrow contract, and
must return findings to PRD.md, CONTEXT.md, docs/, or the active OpenSpec change. Do not let a helper
skill start its own end-to-end workflow, introduce unrelated readiness checks, or create parallel specs unless I
explicitly ask for that separate workflow.

Route every user turn before answering. Treat the route as one of:

```text
readiness-answer -> absorb the answer, update or prepare artifacts, and reassess readiness
readiness-clarification -> explain the readiness question, simplify the choice, and ask one clearer version
productive-tangent -> answer briefly, capture durable facts when needed, then steer back
new-focus -> ask whether to switch focus, record as Candidate Change, or return to the current readiness question
meta-process -> explain or adjust the workflow, then offer the smallest useful next step
commit-request -> bare commit intent means handle commit readiness with Lore-first policy
```

Use a coach/project-manager style: allow useful detours, but do not let them erase the active focus.
Any tangent must end by returning to the current readiness question, recording a candidate, asking
for focus-switch confirmation, updating artifacts and reassessing readiness, or pausing by explicit
user request.

If two consecutive turns do not advance, revise, or explicitly defer the active readiness question,
give a compact checkpoint: active focus, what needs confirmation before the next stage, what the
side discussion changed, and the single next
question. Also checkpoint when I say continue/next, when the thread has become long, when I raise a
new direction without choosing a focus action, before entering a major new stage, or after
interruption or context compaction. End workflow replies with a concrete steering move instead of a
vague invitation.

Before creating any git or Lore commit, resolve the intended author and committer identity. Check
repository-local `user.name` / `user.email`, inspect recent commit authors and committers, and do
not silently use the machine's global git identity in an existing project. If the local config is
missing or differs from the recent project identity, use the recent project identity explicitly or
ask me before committing. If the project has mixed legitimate identities, ask which one to use.
Remember that Lore still inherits git author/committer identity unless overridden.

When I express bare commit intent without specifying a commit tool, message, file scope, handoff, or
skip decision, treat that as confirmation to handle current commit readiness using this workflow's
commit policy, not as a request for ordinary `git commit`. For context-rich workflow commits,
especially after OpenSpec archive, check Lore availability and use `lore commit` by default. Use
normal git only when Lore is unavailable, inappropriate for the current environment, or I explicitly
request a normal git commit.

Allowed commit identities are only: an explicit user-provided `Name <email>`, a complete
repository-local identity that matches project history or that I confirmed, or a single clear recent
project identity from commit history. Never invent identity from OS username, home directory, agent
profile, remote URL owner, package metadata, README maintainer, chat display name, or guessed email
domain. Never use placeholder identities such as Codex, AI, Assistant, unknown@example.com, or
noreply@example.com unless that exact identity is confirmed by project history or me. If the identity
is missing, partial, conflicting, or ambiguous, stop and ask me for the author/committer before
running any commit command.

When resuming a previous workflow, inspect current artifacts before choosing a stage:

```text
check git status and current branch
check repository-local git author/committer config and recent commit identities when commits may be needed
read PRD.md, CONTEXT.md, SECURITY.md, DESIGN.md, docs/, docs/proposals/, docs/ai-tools.md, and docs/adr/ when present
check recent planning artifact changes from git diff or recent commits when they may describe the next spec
check raw sources already recorded in PRD.md
inspect openspec/, openspec/specs/, openspec/changes/, and archived changes
inspect active change proposal.md, specs/, design.md, and tasks.md when present
check recent commits when deciding whether a baseline or archived change has already been committed
use active changes in openspec/changes/ as the primary change-state signal
if multiple active changes exist, list them with detected readiness state or phase and ask me which one to continue
also list lightweight candidate changes from PRD.md or the existing candidate artifact when present
if planning artifacts have uncommitted or unpromoted future-facing requirements, next-slice notes, first-slice direction, design direction, architecture/security decisions, product-track decisions, or Candidate Changes not linked to an active OpenSpec change, ask whether to promote them into OpenSpec, keep/defer them as Candidate Changes, commit/archive them as docs-only housekeeping, or treat them as background context before implementing
if a change appears archived and synced but related files are still uncommitted, checkpoint the archive and handle commit readiness with Lore-first policy; offer normal git only when Lore is unavailable, inappropriate, or explicitly requested
continue from the earliest incomplete readiness check
do not recommend a new change while an unfinished active change exists unless I explicitly defer or abandon it
```

When I discuss a feature idea but it is not ready for a formal OpenSpec change, record it as a
lightweight candidate in the existing candidate artifact, or in `PRD.md` under `Candidate Changes`.
Keep only a short label, one-sentence intent, status, blocking question, and OpenSpec change link
when promoted.

When planning artifacts already contain content that looks intended for the next spec, do not
implement from it directly. Planning artifacts include `PRD.md`, `CONTEXT.md`, `DESIGN.md`,
`SECURITY.md`, `docs/architecture.md`, `docs/adr/`, `docs/proposals/`, and Candidate Changes. Ask
one Planning Artifact Promotion question:

```text
I found planning document changes that look intended for the next spec but are not linked to an active OpenSpec change. Should I promote them into an OpenSpec proposal, keep them as Candidate Changes for later, commit/archive them as docs-only housekeeping, or treat them as background context for the current work?
```

Only continue to implementation when the planning content is already represented by the active
OpenSpec change, the user chooses background/documentation-only housekeeping, or the user explicitly
confirms a reviewed OpenSpec proposal path.

If I switch feature focus within the same session, record the previous focus state before continuing:
active, deferred, abandoned, or promoted to an OpenSpec change. Then name the new focus and do not
carry unresolved assumptions across features.

Use Progressive Maturity lightly:
- Fast Path for 0-to-1 and first-slice work.
- Product maturity helpers only when direction, prioritization, journey, roadmap, or metrics are the problem.
- Design maturity helpers only when visual quality, usability, consistency, or DESIGN.md is the problem.
- Architecture maturity helpers only when architecture, data, security, integrations, performance, deployment, technology choice, refactoring, or release risk is the problem.

For 0-to-1 work, choose the build track before deciding engineering discipline:
throwaway prototype or product-track build. Record the selected track in PRD.md. Product-track builds
default to DDD-lite boundaries and TDD-first behavior tasks. Throwaway prototypes may skip those
readiness checks when shortcuts are recorded as limitations. Prefer first slice / first product slice / first
testable slice language; use MVP when I use that term or when discussing scope trimming.

Before using a maturity helper, state its trigger, narrow question, writeback target, stop condition,
and fallback. If the helper/tool/site/private skill is unavailable, record the limitation and fall
back to project artifacts or agent-native reasoning instead of stopping by default.
For Design Maturity, visual companion tools may be used when they improve UI or interaction
discussion. Keep the current Driving phase and readiness question clear, use visuals only for a narrow design
question, accept text replies equally to visual clicks, mirror choices back into chat, and write
decisions to DESIGN.md or the active OpenSpec design.md. If that does not hold, fall back to chat,
screenshots, existing UI, or agent-native UI review.

Helper skills may use lightweight helper-specific prompts, browser consent, or visual companion
handoffs when they genuinely improve the conversation. Keep the handoff bounded: say which current
Driving phase and readiness question it supports, what decision is being clarified, and reconnect
the user's next reply to that readiness question. Do not leave a standalone helper prompt
unexplained, and do not require visual clicks when a normal chat reply answers the question.

If the current turn pauses for helper consent, browser consent, screenshot setup, or a visual board,
still send a normal workflow reply first or in the same turn. It must include the active focus, the
current Driving phase, the readiness question, and one concrete question the user can answer in
chat. The visual/browser choice can be offered as optional support, but it is not a substitute for
the next readiness question.

For a UI/interaction optimization request in an existing project, prefer this stopping shape after
preflight:

```markdown
# Driving: UI and interaction optimization

Before the next stage: decide which user-facing outcome this change should optimize before creating an OpenSpec proposal.

I found this is a design-maturity change in an existing project, so I will inherit the current stack
and UI conventions unless you want to change them. Which outcome should this first slice target:
visual polish, workflow friction, accessibility/responsiveness, or one specific screen? Screenshots
or a browser review can help, but a normal text answer is enough.
```

When entering a new workflow phase, print a large Markdown heading first. Use this semantic shape,
but adapt the labels and descriptive text to the project language:

For the first assistant response in a new conversation, make the heading and first sentence
title-friendly. If my message starts with a command such as `/grill-driven-spec`, restate the actual
project, adoption, next-slice, or change focus in natural language before asking the first readiness
question. Do not use only a generic tool name, stage number, or command echo as the first visible
topic.

```markdown
# Driving: <short phase or focus>

Before the next stage: <one sentence describing what must be confirmed before moving on>.
```

Use `Driving` headings for 0-to-1, adoption, existing-project changes, implementation,
verification, and archive. Keep `Driving` as the stable workflow label, but labels like `Before the
next stage` should be translated or adapted when the project language is not English.
Tool-generated labels such as `Implementing: <change-name>` may appear, but they do not replace the
`Driving` heading and current readiness question.

## Adopt Existing Project

```text
Use grill-driven-spec to adopt this existing implemented project.

Run adoption preflight first:
- check repository status and current branch
- identify main source, test, config, and documentation locations
- inspect package manifests, build scripts, CI, deploy config, and environment examples
- check whether README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/ already exist
- identify obvious product surfaces, core workflows, and domain terms from code or docs
- identify existing external-system adapters, schemas, fixtures, contract tests, docs, runbooks, and conventions
- identify the primary language of existing authoritative project docs and use it for updated artifacts
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
Create UBIQUITOUS_LANGUAGE.md only when domain terminology is already complex enough to need a
dedicated glossary, and link to it from CONTEXT.md.

Use localized equivalents of Observed, Confirmed, and Open Questions language where useful.
After the baseline is in place, ask me one blocking adoption question at a time to separate desired
behavior from legacy or accidental behavior.
Stop adoption once baseline docs are sufficient, observed and confirmed behavior are separated, and
the smallest first change is confirmed or intentionally deferred.
```

## Existing Project Change

```text
Use grill-driven-spec to prepare this change in an existing implemented project.

Requested change: <describe change here>

Run lightweight change preflight first:
- check repository status and current branch
- identify likely source, test, config, documentation, and OpenSpec locations for this change
- check whether README.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/, and openspec/ provide enough baseline context
- identify existing architecture, stack, UI, test, deployment, and workflow conventions relevant to the change
- identify relevant external-system adapters, schemas, fixtures, contract tests, docs, and conventions for this change
- identify the primary language of existing authoritative project docs and use it for updated artifacts
- check recent planning artifact changes and Candidate Changes for future-facing content not linked to an active OpenSpec change
- check whether grill-me, grill-with-docs, OpenSpec, git, and Lore are available when relevant

Do not run the 0-to-1 skeleton flow.
Do not force full adoption if the baseline is already sufficient for this change.
Do not label this as adoption unless the baseline itself is the work.
Do not choose a new stack, redesign shared UI, migrate data, or change deployment conventions unless the requested change affects them.

If baseline context is missing or too thin to judge desired behavior, create or refresh only the
minimum adoption baseline first. If the change follows existing conventions, inherit them and record
that in design.md. If the change affects architecture, data, security, deployment, shared UI, or
workflow conventions, ask one blocking impact question before creating an OpenSpec proposal.
If planning artifacts contain future-facing requirements, next-slice notes, design direction,
architecture/security decisions, product-track decisions, or Candidate Changes not linked to an
active OpenSpec change, ask the Planning Artifact Promotion question before implementation.
If the change adds or changes external knowledge, classify it as known, provisional, or blocking:
inherit existing adapters/docs/tests when known, ask for docs/examples/access details when blocking,
or ask whether to proceed with an explicit mock boundary.

If I ask what to build next, recommend a small number of change candidates and ask the single
selection question that decides the next OpenSpec proposal. Do not invoke a visual companion,
mockup flow, or broad brainstorming flow just to choose the next slice.
After I select a recommended slice, continue with change-scoped clarification and the OpenSpec
proposal readiness check. Do not restart into a separate brainstorming flow before proposing.

If product intent is vague, invoke grill-me with a change-scoped contract. If project/domain context
is the blocker, invoke grill-with-docs with a change-scoped contract. Ask only questions needed to
make the requested change testable and reviewable.

Do not create an OpenSpec change until desired behavior and convention impact are clear enough for review.
```

## Seed Project Skeleton

```text
Use grill-driven-spec for a new 0-to-1 project.

Idea: <describe idea here>

Run preflight first:
- check whether this directory is already a git repository
- check whether this directory is inside a parent git worktree before running git init
- scan for existing raw source materials such as notes, drafts, PDFs, docs, screenshots, exports, or meeting summaries
- check whether this looks like an empty or unstructured 0-to-1 folder, not an already implemented project
- use the primary language of my initial project request for generated artifacts unless I specify another language
- localize generated document titles, section headings, status labels, placeholders, and explanatory prose; do not copy English skeleton headings such as Raw Idea, Open Questions, None yet, or TBD into non-English projects
- check whether grill-me, grill-with-docs, OpenSpec, git, and Lore are available
- verify dependency identity before installing anything: grill-me and grill-with-docs come from https://github.com/mattpocock/skills, OpenSpec comes from https://github.com/Fission-AI/OpenSpec, Lore comes from https://github.com/Ian-stetsenko/lore-protocol, and git is the system Git CLI
- initialize git if available, this is a 0-to-1 folder, and this directory is not already inside a git repository
- do not create a nested git repository inside a parent worktree
- treat the initial idea as seed input for PRD.md, not as permission to ask product questions before Stage 0
- after creating the Stage 0 skeleton, create an initial baseline commit for generated workflow files when git is available and author/committer identity is allowed
- resolve commit author and committer identity before creating the initial baseline commit
- do not let missing OpenSpec or Lore block the initial skeleton and grill phase
- do not pretend to invoke missing grill-me, grill-with-docs, or OpenSpec dependencies
- do not guess package names or install similarly named tools when a dependency is missing
- use only the documented dependency install sources, and ask the user before substituting another source
- do not delete, move, rename, overwrite, or treat raw source materials as confirmed requirements without explicit user approval
- if raw source materials exist, list their paths in PRD.md under the localized Raw Sources section before grilling
- only copy clearly stated facts into PRD.md; put interpretations, conflicts, or suspected requirements under localized open questions
- do not ask visual companion, stack, design, grill, or product follow-up questions before the skeleton is in place

Create README.md, PRD.md, AGENTS.md, CONTEXT.md, SECURITY.md, docs/inbox/README.md,
docs/architecture.md, docs/adr/README.md, docs/diagrams/README.md, and docs/ai-tools.md.

README.md should contain only a single H1 using the current directory name.
Keep all other files thin. Use a localized placeholder such as TBD in English projects or 待定 in Chinese projects for unknown stack, commands, architecture, or decisions.
Do not write business code, create business directories, invent features, or choose a stack.
Do not create UBIQUITOUS_LANGUAGE.md unless the user explicitly asks for DDD-oriented documentation.
Do not create an OpenSpec change.
For the initial baseline commit, commit only generated or refreshed workflow skeleton files unless I
ask you to include raw source materials. Do not proactively add raw source materials, and do not
unstage or alter raw materials that were already tracked or intentionally staged. Use Lore only if it
is already available and appropriate; missing Lore must not block Stage 0. For a new project with no
commits and no repository-local git identity, ask me for the commit identity before the first commit.

After the skeleton is in place, start grilling me one question at a time.
First ask whether this build is a throwaway prototype or product-track build unless my intent is
already explicit. Record the selected track in PRD.md.
```

## grill-me

```text
Use grill-me to clarify PRD.md.

Invoke grill-me with this contract:
- preserve grill-me native behavior: interview relentlessly, walk the design tree one branch at a time, ask one question at a time, and provide your recommended answer for each question
- goal: clarify enough product intent for the first OpenSpec change
- primary write target: PRD.md
- stop condition: build track, first-slice boundary, non-goals, and testable core behavior are clear
- constraints: do not create OpenSpec changes, choose a stack, write business code, or turn unconfirmed assumptions into requirements
- domain pattern awareness: when a mature domain or external system is mentioned, briefly name the likely pattern only if it helps the first slice, ask at most one blocking question, and record unconfirmed pattern assumptions as localized open questions rather than confirmed requirements

After each important answer, update PRD.md.
Put uncertain content under open questions. Put confirmed exclusions under non-goals.
Do not write code or create an OpenSpec change.
If grill-me is unavailable, stop at Stage 1 and ask me whether to install or enable the verified skill.
```

## grill-with-docs

```text
Use grill-with-docs to review PRD.md, AGENTS.md, CONTEXT.md, docs/, and openspec/.

Invoke grill-with-docs with this contract:
- preserve grill-with-docs native behavior: grill against docs, glossary, and code; ask one question at a time; provide your recommended answer for each question; update CONTEXT.md inline when terms are resolved
- goal: fill only the context needed for the first OpenSpec proposal
- inputs: PRD.md, AGENTS.md, CONTEXT.md, docs/, openspec/
- write targets: PRD.md, CONTEXT.md, docs/architecture.md, docs/adr/, docs/inbox/
- question focus: only questions that block a testable first OpenSpec change, including technical choices that directly affect the first implementation slice
- external knowledge: classify required external systems, external docs, and domain-pattern assumptions as known, provisional, or blocking
- stop condition: enough project context exists to propose the first OpenSpec change
- constraints: do not continue grilling for non-blocking UI or implementation details, do not write code, and do not create a change until I confirm propose

Update PRD.md for product intent, CONTEXT.md for stable domain language,
docs/architecture.md for long-lived architecture knowledge, and docs/adr/ for hard-to-reverse decisions.
Keep domain terms in CONTEXT.md while the glossary is small. Create UBIQUITOUS_LANGUAGE.md only when
terms are numerous, ambiguous, mapped differently across external systems, needed for code/API
naming, or DDD modeling has begun; then link to it from CONTEXT.md.

Do not continue grilling for non-blocking UI or implementation details such as screen layout,
button labels, component structure, CSS framework, or copy. Put those in design.md or tasks.md later.
For greenfield projects, ask or record one compact technical/experience readiness question when
stack, runtime, source layout, persistence, security/data handling, integrations, broad UI direction,
local verification, or deployment target would block safe implementation. For existing projects, inherit
current architecture, stack, source layout, UI, test, and deployment conventions unless the change affects them.
If stack/runtime is not confirmed, recommend a default stack for the first slice with a short reason and one
or two alternatives when useful, then ask me to confirm the recommendation or explicitly authorize
you to choose conservative defaults. Do not treat silence or a generic "proceed" prompt as stack
approval.
For greenfield product-track builds, ensure CONTEXT.md records the core domain terms and confirmed
business rules needed for the first slice. Name candidate entities, value objects, aggregates,
policies, or domain services only when they clarify that slice. Do not expand into broad up-front
domain modeling.
For any path, apply External Knowledge and Domain Pattern Readiness when the first slice depends on
external systems, external docs, organization workflows, or domain-pattern assumptions. If facts are
missing, ask for docs/examples/access details or ask whether to proceed with an explicit mock or
fake-adapter boundary. When the domain has mature patterns, you may recommend a domain-informed mock
boundary, but keep it conservative, explain which pattern you are using, and carry the rest as Open
Questions or non-goals.
Do not create business source files in the project root merely because the stack is still unclear;
record the stack-appropriate source and test layout in design.md before development.
When the context is enough for a testable first OpenSpec change, ask me to confirm propose.

Do not write code or create a change until I confirm propose.
If grill-with-docs is unavailable, stop at Stage 3 and ask me whether to install or enable the verified skill.
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
Resolve the project artifact language first. Use it for proposal narrative, spec requirements and
acceptance criteria, design notes, and task descriptions. Keep file names, commands, code
identifiers, API names, and established workflow terms unchanged.
Include implementation, tests, docs, CI, durable docs closure work when relevant, and DDD/TDD tasks
required by the selected build track.
In design.md, include Technical Approach with confirmed choices, proposed defaults awaiting approval,
and technical open questions for stack/runtime, source layout, persistence, sensitive-data handling,
integrations, basic UI direction, local verification, and deployment when relevant. For existing
projects, state whether the change follows existing technical, source layout, and UI conventions or
list the specific conventions it
changes.
For greenfield product-track builds, design.md must record how the first slice keeps
domain/application/infrastructure/UI boundaries, where core behavior tests live, and any explicit
reason for deferring TDD-first behavior work. tasks.md must place core behavior tests before related
implementation tasks unless the deferral is recorded.
Before review can pass, required greenfield stack/runtime, source layout, and local verification
choices must be confirmed or explicitly delegated to you, and design.md must record the selected
choice and rationale.
For any path, if the change depends on external knowledge, design.md must record whether it is known,
provisional, or blocking. Known dependencies should reference docs, adapters, schemas, fixtures, or
contract tests. Provisional dependencies must record the mock boundary, assumptions, non-goals,
replacement trigger, and any domain-pattern assumptions.
If this change is promoted from or completes future-facing content in durable project docs, add a
tasks.md item to run the Durable Docs Closure Audit before archive and name likely affected files
when known.
Do not implement.
```

## Review Before Development

```text
Review the current OpenSpec change before development.

Check proposal vs PRD.md, project artifact language consistency, testability of specs, unconfirmed
assumptions in design, technical readiness for implementation, task size and order, and missing
tests/docs/CI.
For greenfield projects, review must fail if the build track is unknown or required stack/runtime,
persistence, security/data handling, source layout, broad UI direction, integrations, local
verification, or deployment choices are still TBD and not explicitly delegated to the agent. For
greenfield product-track builds, review must also fail if core domain terms and business rules are
missing, business behavior is designed only inside UI/API/persistence code, core behavior tests do
not appear before implementation tasks, or TDD is skipped without an explicit reason. For existing
projects, do not fail review on inherited stack or UI choices unless the change affects architecture,
data, security, deployment, source layout, local verification, shared UI conventions, or user
workflow conventions.
If unclear, return to grill and update the relevant files. Do not code.
If stack/runtime is missing for a greenfield project, the next readiness check is a technical readiness
question with a recommended stack, not a development confirmation.
If required external knowledge is blocking, the next readiness check is an integration readiness question: ask
for docs/examples/access details, identify the existing project contract to inherit, or ask whether
to proceed with a provisional mock boundary and documented assumptions.
If proposal.md, specs, design.md, tasks.md, or user-facing readiness text use the wrong language, fix the
touched artifact sections before asking for development confirmation.
When reporting the review result, summarize validation and the next readiness question naturally in the project
language. Keep command names, change names, and file names such as openspec validate, tasks.md, and
design.md unchanged.
```

## Start Development

```text
Confirmed: begin development.

Follow tasks.md in order. Prefer TDD for behavior changes.
For product-track builds, use TDD-first for behavior changes by default. For throwaway prototypes,
record skipped testing or boundary shortcuts as known limitations.
Update tasks.md as work completes.
If resuming after an interruption, first read tasks.md, test/lint/build status, dev server state, git status, and known blockers.
Continue from the first incomplete or failed task instead of restarting completed work.
If requirements or design conflict with reality, pause and update PRD.md, design.md, or tasks.md before continuing.
```

## Verification

```text
Tell me how to verify the first slice.

Include startup commands, core flows, first-slice behaviors, explicit non-goals, test status, and known limitations.
Do not claim browser or manual verification passed unless it actually ran and passed.
If local browser automation, network, sandbox, or server issues block verification, leave the task unchecked and ask me to verify the listed flows.
```

## Sync and Archive

```text
Before archiving, check tasks, tests/lint/build, README.md, PRD.md, CONTEXT.md, docs/,
openspec/specs/, unresolved open questions or ADRs, and the Durable Docs Closure Audit.
Also check language consistency for artifacts touched by the current change: generated requirements,
design notes, summaries, and tasks should use the resolved project artifact language.
Run the audit even when tasks.md says docs are updated. Scan durable docs and active OpenSpec
artifacts for future-facing terms such as next, recommended next, future, candidate, TBD, Open
Questions, 下一步, 候选, and 后续. Classify only matches relevant to the current change or touched
durable docs: completed by this change -> current state/completed fact; still future scope ->
remaining backlog/Candidate Change; raw source or historical/background material -> not a current
requirement; unclear and relevant -> ask me before archive. Do not block archive on unrelated
keyword matches.

If checks pass and user verification passed, sync specs and archive the change.
If the archive tool creates a date-stamped directory that differs from the session date, report it and keep the tool-generated name.
After archive verification, check git status and handle commit readiness before calling the workflow
fully complete. If relevant changes are uncommitted, check Lore and create a Lore commit when Lore is
available and appropriate. Treat commit readiness as handled only when a Lore commit is created, a normal git
commit is created because Lore is unavailable/inappropriate or explicitly requested, I explicitly say
I will handle it, or I intentionally skip it. Resolve author and committer identity before creating
either Lore or normal git commits. If I express bare commit intent after archive, treat that as
confirmation to handle commit readiness with the Lore-first policy, not as approval to invent
identity or use a normal git commit when Lore is available and appropriate. If using normal git,
pass the resolved author and committer explicitly instead of relying on global config.
```
