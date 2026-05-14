# File Skeletons

Use these minimal skeletons when seeding a new project. Keep them honest and thin.

## README.md

```markdown
# <project-name>
```

## PRD.md

```markdown
# PRD

## Raw Idea

TBD

## Raw Sources

None yet.

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

## AGENTS.md

```markdown
# Agent Guide

This project uses Grill Driven Spec for AI-assisted development.

## Workflow

Follow the project documents before writing code:

1. Clarify requirements in PRD.md.
2. Record stable domain language in CONTEXT.md.
3. Use OpenSpec for proposed changes.
4. Review proposal, specs, design, and tasks before implementation.
5. Implement only after the user confirms development.

## Rules

- Grill first, spec second, code last.
- Do not create OpenSpec changes from vague intent.
- Do not invent product scope, stack, architecture, or business rules.
- Keep unknowns explicit as TBD or Open Questions.
- Before changing security-sensitive behavior, read SECURITY.md and keep unknown security decisions explicit.
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

## SECURITY.md

```markdown
# Security

Security requirements are not decided yet.

Use this file to record confirmed security, privacy, secrets, authentication,
authorization, compliance, abuse-prevention, and data-handling constraints.

Unknowns should stay explicit as TBD or Open Questions.

Do not invent a security policy before requirements are confirmed.
```

## docs/inbox/README.md

```markdown
# Requirements Inbox

Use this folder for raw stakeholder input such as requirement notes, meeting notes,
exports, screenshots, or pasted chat records.

These files are source material, not final requirements.
Distill confirmed requirements and open questions into PRD.md, then use grill and OpenSpec.

Do not delete, move, rename, overwrite, or reinterpret raw source files without explicit approval.
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

## Tools

- Git is required for repository initialization and commits.
- grill-me is required before Stage 1 product clarification.
- grill-with-docs is required before Stage 3 project context alignment.
- OpenSpec is required before creating or updating OpenSpec changes.
- Lore is recommended for commits that should preserve decision context.

Missing OpenSpec or Lore should not block initial project skeleton creation or requirement grilling.
Missing grill-me blocks Stage 1. Missing grill-with-docs blocks Stage 3.

## Dependency Identity

- Git means the system Git CLI, verified with `git --version`.
- grill-me and grill-with-docs mean AI agent workflow skills from `https://github.com/mattpocock/skills`, not arbitrary packages with similar names.
- OpenSpec means the intended OpenSpec workflow/CLI from `https://github.com/Fission-AI/OpenSpec` and selected tool adapter for this project.
- Lore means the Lore commit tool/CLI from `https://github.com/Ian-stetsenko/lore-protocol`, verified with `lore --version` or `lore help`.

Known install sources:

```text
grill skills: npx skills@latest add mattpocock/skills
OpenSpec: npm install -g @fission-ai/openspec@latest
Lore: npm install -g lore-protocol
```

Do not guess package-manager names for missing workflow skills or tools. If these commands are not
appropriate for the current agent or environment, ask the user before substituting another source.

## Tool Status

TBD

Record tool setup failures here, including blocked global prompt/config writes, skipped adapters,
permission issues, and the command or user action needed to fix them.

Do not assume every IDE or agent automatically reads AGENTS.md.
If a tool has its own configuration directory, install or refresh the OpenSpec workflow for that tool.
```
