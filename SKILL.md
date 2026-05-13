---
name: grill-driven-spec
description: Use when starting a new project or feature from a vague idea and the user wants AI-led requirement clarification, PRD/docs updates, and OpenSpec proposal/spec/task workflow before coding. Trigger when the user mentions grill-driven spec, grill-to-OpenSpec, PRD plus OpenSpec, from 0 to 1 project setup, or asks to clarify requirements before implementation.
---

# Grill Driven Spec

Use this skill to act as a stage-gated product/spec lead for AI-assisted development.

The core rule:

```text
grill first, spec second, code last
```

The user expresses ideas and confirms phase transitions. You ask focused questions, update project documents, decide whether the current phase is ready to advance, and explicitly ask for confirmation before crossing major gates.

## Stage Gates

Follow these gates in order unless the project already has later-stage artifacts.

### 0. Seed the Project Skeleton

Create or update the minimum project context:

```text
README.md
PRD.md
AGENTS.md
CONTEXT.md
docs/inbox/README.md
docs/architecture.md
docs/adr/README.md
docs/diagrams/README.md
docs/ai-tools.md
```

Keep files thin. Use `TBD` for unknown commands, stack, architecture, or decisions. Do not invent product scope.

Gate prompt to user:

```text
Initial files are in place. The PRD is still too thin for an OpenSpec change.
Next I recommend grill-me: I will ask one question at a time and update PRD.md after each important answer.
```

### 1. Clarify Product Intent With grill-me

Ask one important question at a time. Prefer questions that shrink MVP scope, identify first users, define success, or expose non-goals.

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

Do not create a formal change until the user confirms propose.

Gate prompt to user:

```text
OpenSpec is initialized. Next I recommend grill-with-docs to fill CONTEXT.md and docs/ from the clarified PRD before creating the first change.
```

### 3. Fill Project Context With grill-with-docs

Read `PRD.md`, `AGENTS.md`, `CONTEXT.md`, `docs/`, and `openspec/`.

Ask one question at a time. Update:

```text
PRD.md for product intent
CONTEXT.md for stable domain language
docs/architecture.md for long-lived architecture knowledge
docs/adr/ for hard-to-reverse decisions with real tradeoffs
docs/inbox/ for raw stakeholder materials
```

Advance only when the project context is sufficient to create a first OpenSpec change.

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

Do not implement after creating the change.

### 5. Review Before Development

Review the new change before coding. Check:

```text
proposal matches PRD.md
specs are testable
design does not depend on unconfirmed assumptions
tasks are executable and ordered
tests, docs, and CI are represented
MVP is not too large
```

If anything is unclear, return to grill-me or grill-with-docs, update the relevant files, and review again.

Gate prompt to user:

```text
Review passed. Specs are testable and tasks are executable.
I recommend entering development and test. I will follow tasks.md and pause if design or requirements conflict with reality.
```

### 6. Implement and Test

Implement only after user confirmation.

Follow `tasks.md` in order. Prefer TDD for behavior changes. Update `tasks.md` as work completes.

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
