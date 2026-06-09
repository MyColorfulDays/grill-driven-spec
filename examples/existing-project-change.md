# Existing Project Change

Use this scenario to test a mature or partially mature product where the user asks for a specific
new feature, behavior change, or bug fix rather than full adoption.

## Setup

Use a project folder with meaningful implementation artifacts, for example:

```text
src/
tests/
package.json
README.md
docs/
openspec/
```

Then run:

```text
/grill-driven-spec add <small feature> to this existing project
```

Or:

```text
/grill-driven-spec change <behavior that affects data/security/deployment/shared UI>
```

Or after the first OpenSpec change has shipped, run:

```text
/grill-driven-spec the first version is done; what should we improve next?
```

Or ask for a design-maturity change:

```text
/grill-driven-spec I want to optimize the current project's UI and interactions
```

Or create two unfinished feature threads:

```text
/grill-driven-spec start candidate workbench
/grill-driven-spec start JD matching, but pause before proposal
```

Or after a change has been verified and archived, express a bare commit intent, for example:

```text
commit
```

Or:

```text
提交吧
```

## Expected Behavior

- The agent treats this as an existing-project change, not as 0-to-1.
- The agent labels the phase as Change, not Adoption, when the baseline itself is not the work.
- The agent uses file signals such as implementation artifacts, PRD/CONTEXT, OpenSpec artifacts, and archived changes to classify the project state.
- The agent does not force full adoption when baseline context is already sufficient.
- The agent runs a lightweight change preflight to find relevant source, tests, docs, and OpenSpec artifacts.
- The agent checks recent planning artifact changes and Candidate Changes for future-facing content not linked to an active OpenSpec change.
- If planning artifacts contain next-spec or future-facing change content, the agent asks whether to promote it into an OpenSpec proposal, keep it as a Candidate Change, commit/archive it as docs-only housekeeping, or treat it as background context before implementing.
- If the active change covers future-facing durable docs content, the agent adds a `tasks.md` item for the Durable Docs Closure Audit before archive.
- When asked what to build next, the agent recommends a few small product slices and asks one selection question.
- After the user selects a recommended slice, the agent continues change-scoped clarification instead of invoking a separate brainstorming flow.
- If another skill is useful, the agent invokes it only as a bounded helper and returns findings to Grill Driven Spec artifacts.
- For UI/interaction optimization, the agent treats the request as a design-maturity existing-project change and asks which design outcome or screen should be optimized first.
- If screenshots, browser review, mockups, or a visual companion would help, the agent presents them as optional support after the `Driving` gate and a normal text-answerable question are visible.
- For small changes, the agent inherits existing architecture, stack, UI, test, deployment, and workflow conventions.
- For convention-impacting changes, the agent asks one blocking impact question about the affected area.
- If the user explicitly asks for productization, DDD/TDD migration, maintainability refactoring, or product-grade architecture, the agent treats that as a scoped product-track refactoring change instead of silently applying it to unrelated small changes.
- If baseline docs are too thin to judge desired behavior, the agent creates or refreshes only the minimum adoption baseline before proposing.
- The agent creates an OpenSpec proposal only after desired behavior and convention impact are clear.
- If a previous session left an active OpenSpec change in `openspec/changes/`, the agent resumes that change before recommending another one.
- If multiple active changes exist, the agent lists them with detected gate or phase and asks which one to continue.
- If a feature idea is not ready for OpenSpec, the agent records it as a lightweight candidate instead of relying on chat memory.
- If the user switches feature focus in the same session, the agent records the previous focus state before continuing.
- If the user asks a related side question, the agent answers it, captures durable requirements or risks when needed, and steers back to the current gate.
- If two consecutive turns do not advance, revise, or explicitly defer the current gate, the agent gives a compact checkpoint with active focus, current gate, what changed, and one next question.
- If the user questions the workflow itself, the agent explains the current gate's purpose, adjusts the pace if appropriate, and offers a smaller next step.
- If the user introduces a new feature while another change is active, the agent asks whether to switch focus, record it as a Candidate Change, or return to the current gate.
- After archive and spec sync, the agent checks git status and handles the commit gate before calling the workflow fully complete.
- Before archive, the agent runs the Durable Docs Closure Audit and resolves only relevant future-facing durable-doc content: completed work becomes current state, unfinished work remains backlog/candidate, historical/background material stays non-requirement, and unclear relevant items are asked about.
- Before creating Lore or normal git commits, the agent compares repository-local git identity with recent commit authors/committers and uses only an allowed complete identity source or asks the user.
- If the user manually applied, verified, and archived the change, the agent detects an archived-but-uncommitted state on resume and handles the commit gate with Lore-first policy; normal git is offered only when Lore is unavailable, inappropriate, or explicitly requested.
- When the user expresses bare commit intent after archive, the agent treats that as permission to handle the commit gate with Lore-first policy, not as permission to invent author/committer identity or to use a normal git commit when Lore is available and appropriate.
- For post-archive commits, the agent uses Lore when available and appropriate; normal git is used only when Lore is unavailable, inappropriate, or explicitly requested.
- If no complete `Name <email>` identity can be resolved from explicit user input, repository-local config confirmed by history, or a single clear recent project identity, the agent asks the user before committing.
- The agent does not implement until review passes and the user confirms development.

## Regression Risks

- Running the 0-to-1 skeleton flow in an implemented project.
- Re-adopting the whole project for a small change with clear existing conventions.
- Turning a small existing-project change into a DDD/TDD migration without explicit user intent.
- Labeling next-slice selection as Adoption when the project baseline is already understood.
- Invoking a visual companion, mockup flow, or broad brainstorming flow before the next product slice is selected.
- Invoking a separate brainstorming flow after the user has already selected the next slice.
- Letting a helper skill take over gates, artifact routing, or the OpenSpec lifecycle.
- Letting a visual companion obscure the current Driving phase or gate during Design Maturity.
- Ending the turn with only a browser, visual companion, screenshot, or local URL invitation and no normal workflow reply.
- Depending on a visual click without accepting a normal text reply as the workflow decision.
- Asking stack, CSS framework, screen-layout, or deployment questions when the change follows existing conventions.
- Creating an OpenSpec change before knowing whether the requested behavior conflicts with current desired behavior.
- Implementing directly from planning artifact changes that were intended for the next spec without asking the Planning Artifact Promotion question.
- Treating future-facing planning artifact edits as ordinary documentation sync when they affect implementation.
- Archiving while durable docs still describe completed current-change work as the recommended next step.
- Blocking archive on unrelated keyword matches, untouched historical ADR prose, or clearly deferred backlog.
- Ignoring an unfinished active change and recommending a new next slice.
- Mixing context between multiple unfinished features.
- Losing a half-discussed feature because it was never recorded as a candidate or active change.
- Letting side questions accumulate until the active gate is no longer visible.
- Ending workflow replies with vague invitations instead of a concrete steering move.
- Treating a workflow/process concern as normal product input instead of pausing to explain or adjust the gate.
- Silently switching focus when the user mentions a different feature.
- Recommending the next feature after archive while related archive/spec/docs/implementation changes are still uncommitted and the commit gate is not handled.
- Creating a post-archive commit with the machine-global git identity when it differs from the project history.
- Creating a post-archive commit with a fabricated author or committer inferred from OS username, remote owner, package metadata, README, chat name, project name, or placeholder email.
- Treating bare commit intent as approval to use a guessed, partial, ambiguous, or machine-global identity.
- Treating bare commit intent as a request for ordinary git commit when Lore is available and appropriate.
- Using normal git for a post-archive commit when Lore is available and appropriate and the user did not request normal git.
- Treating missing Lore as a reason to ignore the post-archive commit gate instead of offering normal git commit or user handoff.
- Treating one session as unable to switch feature focus when the user explicitly changes topic.
- Treating observed legacy behavior as confirmed desired behavior.
- Letting a data, security, deployment, or shared UI convention change pass review without one focused impact question.
