# Grill Driven Spec

Answer the questions. Let your AI agent drive the spec.

Grill Driven Spec turns your coding agent into a low-friction SDD driver: it grills unclear
intent, captures the answers as project context and OpenSpec changes, then carries the work through
review, implementation, and verification.

```text
You:    /grill-driven-spec I want to build...
Agent:  Let's grill the idea first.
        I'll ask the questions, write down the decisions, and drive the spec before code.
```

Core rule:

```text
grill first -> spec second -> code last
```

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
  creates the minimal project documents, then starts grilling one question at a time.
- **Existing project adoption:** the agent inventories current product reality, creates or
  refreshes baseline docs, then uses that baseline for future OpenSpec changes.
- **Existing project change:** the agent clarifies the desired behavior, checks whether existing
  conventions are affected, then prepares an OpenSpec proposal before coding.

The agent should not ask visual companion, stack, design, or product questions before the minimal
skeleton exists. It should not overwrite an existing product with a new 0-to-1 skeleton.

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

Recommended flow:

```powershell
git add .
lore commit -i
```

Validate recent commits:

```powershell
lore validate HEAD~1..HEAD
```
