# File Skeletons

Use these minimal skeletons when seeding a new project. Keep them honest and thin.

## README.md

```markdown
# <project-name>
```

## PRD.md

```markdown
# PRD

## One-Sentence Idea

TBD

## Confirmed Requirements

None yet.

## Open Questions

None yet.

## Non-Goals

None yet.

## MVP Direction

TBD
```

## CONTEXT.md

```markdown
# Project Context

This file records stable domain language and project context discovered through grill-with-docs.

## Domain Terms

TBD

## Business Rules

TBD

## Open Questions

TBD
```

## docs/inbox/README.md

```markdown
# Requirements Inbox

Use this folder for raw stakeholder input such as requirement notes, meeting notes,
exports, screenshots, or pasted chat records.

These files are source material, not final requirements.
Distill confirmed requirements and open questions into PRD.md, then use grill and OpenSpec.
```

## docs/architecture.md

```markdown
# Architecture

The architecture is not decided yet.

Confirmed facts should come from PRD.md and OpenSpec changes.
Unknowns should stay explicit as TBD or Open Questions.
```

## docs/adr/README.md

```markdown
# Architecture Decision Records

Use this folder for long-lived architecture decisions.

Do not create an ADR for every small choice. Create one when a decision is hard to reverse,
surprising without context, or the result of a real tradeoff.
```

## docs/diagrams/README.md

```markdown
# Diagrams

Use this folder for architecture diagrams, flow diagrams, and source diagram files.

Do not invent diagrams before the architecture or workflow is clear.
```

## docs/ai-tools.md

```markdown
# AI Tool Setup

This project uses AGENTS.md as the shared project-level agent guide.

Do not assume every IDE or agent automatically reads AGENTS.md.
If a tool has its own configuration directory, install or refresh the OpenSpec workflow for that tool.
```
