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

## When To Use

Use this workflow when:

- starting a new project from a vague idea
- adding a feature whose requirements are not clear yet
- you want PRD and OpenSpec work before implementation
- you want the agent to ask questions instead of jumping into code
- you want decisions, non-goals, tests, and verification steps captured as the project evolves

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
Use grill-driven-spec to turn my vague project idea into PRD, project docs, and an OpenSpec change.

Do not jump into code.
Ask one important question at a time.
Update PRD.md after important answers.
Do not create an OpenSpec change until I confirm propose.

My idea is: <describe idea here>
```

For an empty project, use:

```text
Use grill-driven-spec.

Initialize the current empty project with the minimal spec skeleton.
Then grill me one question at a time before creating any OpenSpec change.
```

## Workflow

1. Seed the project skeleton.
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
