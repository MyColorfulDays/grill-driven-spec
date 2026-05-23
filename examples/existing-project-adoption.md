# Existing Project Adoption

Use this scenario to test a mature or partially mature product that is being introduced to
Grill Driven Spec after implementation already exists.

## Setup

Use a project folder with meaningful implementation artifacts, for example:

```text
src/
tests/
package.json
README.md
.github/workflows/
```

Then run:

```text
/grill-driven-spec adopt this existing project
```

## Expected Behavior

- The agent does not run the 0-to-1 skeleton flow.
- The agent makes each adoption phase transition visually obvious with a large Markdown `Driving` heading.
- The agent inventories source, tests, configs, docs, scripts, and product surfaces before asking product questions.
- Existing docs are preserved and refreshed only when missing, clearly thin, or explicitly requested.
- Observed code behavior is labeled as observed until the user confirms it is desired behavior.
- The agent does not refactor, redesign, migrate, implement, or create a new OpenSpec change during adoption.
- The agent asks one blocking alignment question at a time after the baseline is understood.
- If the user asks side questions about observed code, desired behavior, or process, the agent answers them, records durable facts or open questions, and returns to the active adoption gate.
- If two consecutive turns do not advance, revise, or explicitly defer the current adoption gate, the agent gives a compact checkpoint with active focus, current gate, what changed, and one next question.
- If the user introduces a specific product change during adoption, the agent asks whether to record it as a Candidate Change, switch to that change after minimum adoption baseline, or return to adoption.
- If the user questions the adoption workflow, the agent explains why separating observed and desired behavior matters and offers a smaller next step.
- OpenSpec is initialized or verified only after the baseline is clear enough to avoid encoding accidental behavior as desired behavior.
- For later changes, the agent inherits existing architecture, stack, UI, test, and deployment conventions unless the change affects them.

## Regression Risks

- Overwriting existing README.md, AGENTS.md, CONTEXT.md, or docs/ with starter skeletons.
- Treating current code behavior as product intent without confirmation.
- Starting a refactor while pretending to document adoption.
- Creating an OpenSpec change before separating desired behavior from legacy behavior.
- Asking broad product-vision questions before inventorying the current system.
- Letting code-explanation side threads hide the active adoption gate.
- Silently turning an adoption discussion into a feature proposal.
- Ending adoption replies without a clear next alignment question or focus choice.
- Blocking small follow-up changes with stack or UI questions when existing conventions already apply.
