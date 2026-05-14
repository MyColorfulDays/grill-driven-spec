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

Or create two unfinished feature threads:

```text
/grill-driven-spec start candidate workbench
/grill-driven-spec start JD matching, but pause before proposal
```

## Expected Behavior

- The agent treats this as an existing-project change, not as 0-to-1.
- The agent labels the phase as Change, not Adoption, when the baseline itself is not the work.
- The agent uses file signals such as implementation artifacts, PRD/CONTEXT, OpenSpec artifacts, and archived changes to classify the project state.
- The agent does not force full adoption when baseline context is already sufficient.
- The agent runs a lightweight change preflight to find relevant source, tests, docs, and OpenSpec artifacts.
- When asked what to build next, the agent recommends a few small product slices and asks one selection question.
- After the user selects a recommended slice, the agent continues change-scoped clarification instead of invoking a separate brainstorming flow.
- If another skill is useful, the agent invokes it only as a bounded helper and returns findings to Grill Driven Spec artifacts.
- For small changes, the agent inherits existing architecture, stack, UI, test, deployment, and workflow conventions.
- For convention-impacting changes, the agent asks one blocking impact question about the affected area.
- If baseline docs are too thin to judge desired behavior, the agent creates or refreshes only the minimum adoption baseline before proposing.
- The agent creates an OpenSpec proposal only after desired behavior and convention impact are clear.
- If a previous session left an active OpenSpec change in `openspec/changes/`, the agent resumes that change before recommending another one.
- If multiple active changes exist, the agent lists them with detected stage and asks which one to continue.
- If a feature idea is not ready for OpenSpec, the agent records it as a lightweight candidate instead of relying on chat memory.
- If the user switches feature focus in the same session, the agent records the previous focus state before continuing.
- The agent does not implement until review passes and the user confirms development.

## Regression Risks

- Running the 0-to-1 skeleton flow in an implemented project.
- Re-adopting the whole project for a small change with clear existing conventions.
- Labeling next-slice selection as Adoption when the project baseline is already understood.
- Invoking a visual companion, mockup flow, or broad brainstorming flow before the next product slice is selected.
- Invoking a separate brainstorming flow after the user has already selected the next slice.
- Letting a helper skill take over gates, artifact routing, or the OpenSpec lifecycle.
- Asking stack, CSS framework, screen-layout, or deployment questions when the change follows existing conventions.
- Creating an OpenSpec change before knowing whether the requested behavior conflicts with current desired behavior.
- Ignoring an unfinished active change and recommending a new next slice.
- Mixing context between multiple unfinished features.
- Losing a half-discussed feature because it was never recorded as a candidate or active change.
- Treating one session as unable to switch feature focus when the user explicitly changes topic.
- Treating observed legacy behavior as confirmed desired behavior.
- Letting a data, security, deployment, or shared UI convention change pass review without one focused impact question.
