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

## Expected Behavior

- The agent treats this as an existing-project change, not as 0-to-1.
- The agent does not force full adoption when baseline context is already sufficient.
- The agent runs a lightweight change preflight to find relevant source, tests, docs, and OpenSpec artifacts.
- For small changes, the agent inherits existing architecture, stack, UI, test, deployment, and workflow conventions.
- For convention-impacting changes, the agent asks one blocking impact question about the affected area.
- If baseline docs are too thin to judge desired behavior, the agent creates or refreshes only the minimum adoption baseline before proposing.
- The agent creates an OpenSpec proposal only after desired behavior and convention impact are clear.
- The agent does not implement until review passes and the user confirms development.

## Regression Risks

- Running the 0-to-1 skeleton flow in an implemented project.
- Re-adopting the whole project for a small change with clear existing conventions.
- Asking stack, CSS framework, screen-layout, or deployment questions when the change follows existing conventions.
- Creating an OpenSpec change before knowing whether the requested behavior conflicts with current desired behavior.
- Treating observed legacy behavior as confirmed desired behavior.
- Letting a data, security, deployment, or shared UI convention change pass review without one focused impact question.
