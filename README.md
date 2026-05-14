# Grill Driven Spec

Grill Driven Spec is a tool-agnostic workflow skill for AI coding agents.

It helps an agent turn vague project ideas into:

- a PRD
- project context docs
- OpenSpec proposals
- reviewed implementation tasks
- verified implementation

Core rule:

```text
grill first, spec second, code last
```

## Use Cases

Grill Driven Spec supports two main situations:

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

## Quick Start Prompt

```text
/grill-driven-spec I want to build <project idea>
```

For a new project, the agent should run preflight, initialize the git repository if needed, preserve any raw notes or source materials, create the minimal project documents, then start grilling one question at a time.

The agent should not ask visual companion, stack, design, or product questions before the minimal skeleton exists.

For an existing implemented product, use:

```text
/grill-driven-spec adopt this existing project
```

The agent should inventory the current product reality, create or refresh shared docs, align with the user on which behavior is desired, then use OpenSpec for future changes. It should not overwrite the project with a new 0-to-1 skeleton.

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
