# Grill Driven Spec

Grill Driven Development for AI coding agents.

Answer focused questions, clarify what should be built, then let development follow SDD.

Grill Driven Spec turns a vague idea or requested change into a disciplined development path. The
agent asks only the questions needed to make intent real, records the answers as project context,
then uses OpenSpec proposals, review gates, implementation tasks, and verification to keep coding
aligned with the clarified decision.

```text
You:    /grill-driven-spec I want to build...
Agent:  Let's clarify the first slice before coding.
        I'll ask focused questions, write down decisions, and drive the SDD flow.
```

## What It Does

```text
0 to 1        Existing adoption        Existing change
   \                 |                       /
    \                |                      /
                  Intent
                    |
                    v
                  GRILL
           Ask until intent is real
                    |
                    v
             Context + PRD
                    |
                    v
            OpenSpec Proposal
                    |
                    v
              Review Gate
                    |
                    v
              Code + Test
                    |
                    v
           User Verification
                    |
                    v
             Sync + Archive
```

Grill Driven Spec is a tool-agnostic workflow skill for AI coding agents. It helps an
agent turn new ideas or existing project changes into:

- a PRD
- project context docs
- OpenSpec proposals
- reviewed implementation tasks
- verified implementation

## Project Shape

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

The exact tree stays project-specific. Grill Driven Spec keeps the important path stable:
raw intent becomes confirmed context, confirmed context becomes an OpenSpec change, and reviewed
tasks become code. Business source files should not accumulate in the project root unless that is the
confirmed stack or project convention.

## Start in 30 Seconds

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

If your agent does not support the `skills` installer, copy this repository's `SKILL.md`
into your agent's custom skills or instruction directory.

## Use Cases

Grill Driven Spec supports three common situations:

- **0 to 1:** start from an empty or unstructured folder, create the first project docs, clarify the MVP, then produce an OpenSpec change before coding.
- **Existing project adoption:** inventory current product reality, establish shared docs, and use the workflow for future changes.
- **Existing project changes:** prepare a new change in an already implemented project while inheriting current architecture, UI, test, and deployment conventions unless the change affects them.

## Use With Any Agent

Paste or install this workflow into your AI coding agent's instruction system.

It is intended to work with tools such as:

- Claude Code
- Codex
- Cursor
- Trae
- Windsurf
- Aider
- other agents that can read project instructions and edit files

The workflow is the stable core. Tool-specific files belong in `agents/` as adapters.

## What Happens Next

- **New project:** the agent runs preflight, initializes git if needed, preserves raw notes,
  creates the minimal project documents, creates an initial baseline commit when git is available,
  then starts grilling one question at a time.
- **Existing project adoption:** the agent inventories current product reality, creates or
  refreshes baseline docs, then uses that baseline for future OpenSpec changes.
- **Existing project change:** the agent clarifies the desired behavior, checks whether existing
  conventions or external-system contracts are affected, then prepares an OpenSpec proposal before coding.

The agent should not ask visual companion, stack, design, or product questions before the minimal
skeleton exists. It should not overwrite an existing product with a new 0-to-1 skeleton.

## Readiness Gates

Before development, the agent checks whether the first slice has enough implementation context.

For greenfield projects, it confirms or recommends stack/runtime, source layout, and local
verification instead of silently choosing them.

For any project path, external knowledge is classified before review passes:

- `known`: documented by project docs, adapters, schemas, fixtures, contract tests, examples, or user-provided materials.
- `provisional`: explicitly approved as a mock, fixture, fake adapter, or guessed contract with assumptions recorded in `design.md`.
- `blocking`: missing facts that affect correctness, data shape, integration behavior, verification, or the confirmed goal.

When a mature domain pattern can help, the agent may suggest a conservative domain-informed mock,
but it keeps assumptions visible and does not treat them as confirmed external-system facts.

## Workflow

1. Run preflight and seed the project skeleton.
2. Clarify product intent with grill-me.
3. Initialize OpenSpec.
4. Fill project context with grill-with-docs.
5. Create an OpenSpec proposal after confirmation.
6. Review before development.
7. Implement and test after confirmation.
8. Ask the user to verify.
9. Sync and archive after verification passes.
10. Handle the commit gate with a Lore commit, normal git commit, user handoff, or explicit skip.

Before creating any commit, the agent checks repository-local git identity and recent commit
authors/committers. It should not silently use the machine's global git identity when it differs
from the project history.

Existing project adoption uses a separate entry path: inventory the current code and docs, establish a baseline context, clarify desired behavior, initialize or verify OpenSpec, then create changes only after the baseline is understood.

Existing project changes use a lighter entry path when the project already has enough baseline context: clarify the desired behavior, check whether the change affects architecture, data, security, deployment, shared UI, or workflow conventions, then proceed to OpenSpec review without re-adopting the whole project.

## Progressive Maturity

Grill Driven Spec starts lightweight. The early path should get the first useful slice working
without pulling in every possible product, design, or architecture process.

As the project matures, the workflow can delegate bounded helper capabilities:

- **Product maturity:** prioritization, user journey, roadmap, metrics, and candidate-change shaping.
- **Design maturity:** design references, UI direction, component/style principles, and a project-level `DESIGN.md`.
- **Architecture maturity:** solution design, architecture review, technology selection, threat modeling, technical debt, and release gating.

These helpers are capability slots, not fixed dependencies. A project may use public skills, private
skills, local docs, reference sites, or agent-native reasoning, as long as decisions return to the
Grill Driven Spec artifacts and OpenSpec gates.

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

## Hard Rules

The workflow must not:

- create OpenSpec changes from vague intent
- implement immediately after proposing a change
- archive before user verification
- turn unconfirmed assumptions into requirements
- let documentation drift away from product or implementation reality

## Repository Layout

- `SKILL.md`: main workflow definition
- `references/prompts.md`: reusable prompts for each stage
- `references/file-skeletons.md`: starter project documentation templates
- `references/helper-capabilities.md`: optional PM, design, and architecture helper capability slots
- `references/review-checklist.md`: pre-development review checklist
- `examples/`: scenario notes and regression observations
- `agents/openai.yaml`: OpenAI/Codex adapter metadata

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

Recommended flow:

```powershell
git add .
lore commit -i
```

Validate recent commits:

```powershell
lore validate HEAD~1..HEAD
```
