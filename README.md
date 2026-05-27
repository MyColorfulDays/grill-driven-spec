# Grill Driven Spec

Grill Driven Development for AI coding agents.

Grill Driven Spec turns vague product intent into a disciplined development path:

```text
grill first, spec second, code last
```

The agent asks focused questions, records durable decisions in project docs, creates an OpenSpec
change, reviews the change before coding, implements after confirmation, asks the user to verify,
then syncs and archives the change.

## Start In 30 Seconds

Install the skill:

```text
npx skills@latest add MyColorfulDays/grill-driven-spec
```

Start a new project:

```text
/grill-driven-spec I want to build <project idea>
```

Adopt an existing project:

```text
/grill-driven-spec adopt this existing project
```

Prepare a change in an existing project:

```text
/grill-driven-spec add <feature or behavior>
```

If your agent does not support the `skills` installer, copy this repository's `SKILL.md` into your
agent's custom skills or instruction directory.

## Fast Path

Use the fast path when you want the first useful slice without a heavy product or architecture
process.

```text
Idea or requested change
  -> classify project state
  -> ask only blocking questions
  -> write PRD/context
  -> create OpenSpec proposal
  -> review before development
  -> implement after confirmation
  -> user verifies
  -> sync, archive, and handle commit gate
```

The workflow supports three common starts:

- **0-to-1:** create a thin project skeleton, preserve raw notes, clarify the MVP, then propose the first OpenSpec change.
- **Existing project adoption:** inventory current reality, separate observed behavior from desired behavior, and establish enough docs for future changes.
- **Existing project change:** clarify one requested change while inheriting current architecture, UI, test, deployment, and workflow conventions unless the change affects them.

## What The Agent Creates

A new or adopted project usually grows toward this shape:

```text
your-project/
|-- README.md                    # Human-facing project overview
|-- PRD.md                       # Raw idea, confirmed requirements, non-goals, MVP direction
|-- CONTEXT.md                   # Project context, small glossary, business rules, project facts
|-- UBIQUITOUS_LANGUAGE.md       # Optional dedicated glossary when domain language becomes complex
|-- AGENTS.md                    # Local instructions that keep agents on the same workflow
|-- SECURITY.md                  # Security, privacy, auth, data-handling, and abuse constraints
|-- DESIGN.md                    # Optional UI direction and design decisions when needed
|-- docs/
|   |-- inbox/                   # Raw notes, screenshots, meeting notes, pasted requirements
|   |-- architecture.md          # Architecture context and decisions as they become real
|   `-- adr/                     # Optional architecture decision records
|-- openspec/
|   |-- project.md               # OpenSpec project context
|   `-- changes/
|       `-- <change-name>/
|           |-- proposal.md      # What should change and why
|           |-- design.md        # Technical/product design when the change needs it
|           |-- tasks.md         # Reviewed implementation checklist
|           `-- specs/           # Requirement deltas for affected capabilities
|-- src/ or stack-native layout   # Product code, created or changed only after review
`-- tests/ or stack-native tests  # Verification for the implemented behavior
```

The exact tree stays project-specific. Business source files should not accumulate in the project
root unless that is the confirmed stack or project convention.

## Full Workflow

The full flow has explicit gates:

1. Run preflight and seed the project skeleton, or inventory the existing project.
2. Clarify product intent with `grill-me`.
3. Initialize or verify OpenSpec.
4. Fill project context with `grill-with-docs`.
5. Create an OpenSpec proposal after user confirmation.
6. Review `proposal.md`, `specs/`, `design.md`, and `tasks.md` before development.
7. Implement and test after user confirmation.
8. Ask the user to verify the core flow.
9. Sync specs and archive after verification passes.
10. Handle the commit gate with a Lore commit, normal git commit, user handoff, or explicit skip.

Before development, the agent checks whether the first slice has enough implementation context. For
greenfield projects, stack/runtime, source layout, persistence, sensitive-data handling, broad UI
direction, local verification, and deployment expectations must be confirmed, inherited, or
explicitly delegated as conservative defaults when they affect the first slice.

For external systems or mature domain patterns, required knowledge is classified before review:

- `known`: documented by project docs, adapters, schemas, fixtures, contract tests, examples, or user-provided materials.
- `provisional`: explicitly approved as a mock, fixture, fake adapter, or guessed contract with assumptions recorded in `design.md`.
- `blocking`: missing facts that affect correctness, data shape, integration behavior, verification, or the confirmed goal.

## Hard Rules

The workflow must not:

- create OpenSpec changes from vague intent
- implement immediately after proposing a change
- archive before user verification
- turn unconfirmed assumptions into requirements
- overwrite existing product docs with starter skeletons
- silently use a machine-global git identity when it differs from project history
- let documentation drift away from product or implementation reality

## Dependencies

Installing this skill does not automatically install every dependency it composes.

Before crossing workflow gates, the agent should verify:

- `git`: system Git CLI.
- `grill-me`: AI agent workflow skill from `https://github.com/mattpocock/skills`.
- `grill-with-docs`: AI agent workflow skill from `https://github.com/mattpocock/skills`.
- `OpenSpec`: intended OpenSpec workflow/CLI from `https://github.com/Fission-AI/OpenSpec`.
- `Lore`: Lore commit tool/CLI from `https://github.com/Ian-stetsenko/lore-protocol`, when Lore commits are expected.

Known install sources:

```text
grill skills: npx skills@latest add mattpocock/skills
OpenSpec: npm install -g @fission-ai/openspec@latest
Lore: npm install -g lore-protocol
```

Do not install similarly named packages just because a dependency is missing. If these commands are
not appropriate for the user's agent or environment, ask the user before substituting another source.

## Maintainer View

`SKILL.md` is the workflow owner, but detailed rules live in references so the skill can be read and
maintained in layers.

- `SKILL.md`: trigger, delegation boundary, gate order, progressive disclosure map, and hard rules.
- `references/state-machine.md`: entry classification, resume rules, focus switching, conversation routing, and commit identity.
- `references/path-guides.md`: path-specific execution details for 0-to-1, adoption, existing changes, review, implementation, verification, and archive.
- `references/prompts.md`: reusable prompts for each stage.
- `references/file-skeletons.md`: starter project documentation templates.
- `references/helper-capabilities.md`: optional PM, design, and architecture helper capability slots.
- `references/review-checklist.md`: pre-development review checklist.
- `examples/`: narrative scenario notes and regression observations.
- `scenarios/`: structured regression fixtures derived from examples.
- `scripts/check-skill.mjs`: lightweight maintenance check for references and scenario fixtures.
- `agents/openai.yaml`: OpenAI/Codex adapter metadata.

Use `examples/` to understand why a behavior matters. Use `scenarios/` to check whether future
changes preserve expected and forbidden agent actions.

Run the lightweight maintenance check before publishing workflow changes:

```text
node scripts/check-skill.mjs
```

## Progressive Maturity

Grill Driven Spec starts lightweight. The early path should get the first useful slice working
without pulling in every possible product, design, or architecture process.

As the project matures, the workflow can delegate bounded helper capabilities:

- **Product maturity:** prioritization, user journey, roadmap, metrics, and candidate-change shaping.
- **Design maturity:** design references, UI direction, component/style principles, and a project-level `DESIGN.md`.
- **Architecture maturity:** solution design, architecture review, technology selection, threat modeling, technical debt, and release gating.

These helpers are capability slots, not fixed dependencies. Decisions must return to Grill Driven
Spec artifacts and OpenSpec gates.

## Use With Any Agent

Paste or install this workflow into an AI coding agent that can read project instructions and edit
files. The workflow is intended to work with tools such as Claude Code, Codex, Cursor, Trae,
Windsurf, Aider, and other agentic development environments.

Tool-specific files belong in `agents/` as adapters. The workflow core should stay tool-agnostic.

## Lore Commits

This repository uses Lore-enriched commits for decision context.

Use a lightweight normal git commit for the initial Stage 0 baseline when Lore is unavailable. Use
Lore for post-archive commits when available, because those commits should preserve requirement,
design, implementation, verification, and archive context. If Lore is missing after archive, handle
the commit gate with a normal git commit, user handoff, or explicit skip instead of silently moving
to the next feature.

Lore still relies on git's author and committer identity. Before either Lore or normal git commits,
verify the project identity from repository-local config and recent commits, then override or ask
when the current machine identity does not match.

The agent must not invent commit identity. Valid identity evidence is limited to a user-provided
`Name <email>`, a complete repository-local identity confirmed by project history or the user, or a
single clear recent project identity. If the user says only `commit` after archive and identity is
missing or ambiguous, the agent should stop and ask for the author/committer instead of guessing or
falling back to machine-global git config.

Recommended flow:

```powershell
git add .
lore commit -i
```

Validate recent commits:

```powershell
lore validate HEAD~1..HEAD
```
