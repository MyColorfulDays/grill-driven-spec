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
- **Existing project adoption:** summarize the current project history, establish shared docs, and use the workflow for future changes.

The current recommended path is to test the 0 to 1 flow first.

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

## Quick Start Prompt

```text
/grill-driven-spec I want to build <project idea>
```

For a new project, the agent should run preflight, initialize the git repository if needed, preserve any raw notes or source materials, create the minimal project documents, then start grilling one question at a time.

The agent should not ask visual companion, stack, design, or product questions before the minimal skeleton exists.

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
