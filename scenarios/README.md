# Scenario Fixtures

These fixtures make the regression expectations in `examples/` easier to check.

`examples/` stay narrative and human-readable. `scenarios/` are structured enough for a future
checker to load and compare against an agent transcript, file diff, or review notes.

## Schema

Each scenario JSON file uses this shape:

```json
{
  "id": "short-stable-id",
  "title": "Human-readable title",
  "sourceExample": "examples/example-file.md",
  "intent": "What this scenario protects",
  "setupSignals": ["Files, docs, tools, or repo conditions present before the prompt"],
  "prompt": "Representative user request",
  "expectedActions": ["Actions the agent should take"],
  "forbiddenActions": ["Actions the agent must not take"],
  "completionSignals": ["Evidence that the scenario reached the intended gate"]
}
```

Keep scenario entries small and behavior-oriented. Do not encode implementation details unless they
are part of a gate, safety rule, or artifact contract.

