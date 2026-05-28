# Grill Driven Spec State Machine

Use this file when `SKILL.md` asks you to classify project state, resume a workflow, or decide the
next gate. The main skill owns the workflow; this file makes the state decisions easier to audit.

## Entry Classification

Classify the current folder and user intent using both file signals and the user's words.

| Path | File Signals | User Intent | First Gate |
|---|---|---|---|
| `0-to-1` | No meaningful implementation artifacts. No coherent PRD, CONTEXT, or OpenSpec baseline. Raw notes may exist. | Start or build a new idea. | Stage 0 skeleton before product, stack, or design questions. |
| `Existing Project Adoption` | Meaningful implementation exists, but project docs or OpenSpec baseline are missing or too thin. | Adopt, document, understand, or bring an existing project into the workflow. | Inventory current reality before asking product questions. |
| `Existing Project Change` | Meaningful implementation exists, and baseline docs or OpenSpec artifacts are enough to orient a requested change. | Add, change, fix, continue, improve, or choose a next slice. | Lightweight change preflight. |
| `Next-slice selection` | Initial OpenSpec change is complete, archived, or clearly shipped. | Ask what to improve next or where to continue. | Recommend a few small candidates, then ask one selection question. |

If signals conflict, explain the classification briefly and ask the user before crossing a major
gate. Never run the 0-to-1 skeleton flow in an implemented project. Never run full adoption when the
baseline is already sufficient for a specific requested change.

## Global Stage Matrix

| Stage | Entry Evidence | Exit Evidence | Blocks On |
|---|---|---|---|
| First-run bootstrap | New agent environment, new project, or unknown dependency state. | Dependency status is known enough to identify blocked and unblocked stages. | User approval for installs, unavailable required helper for the next stage, filesystem access. |
| Preflight and skeleton | New or unstructured project; no reliable baseline docs. | Thin project skeleton exists; raw sources are listed without being treated as requirements; baseline commit is created or explicitly unavailable. | Data-loss risk, meaningful existing implementation, missing git for requested repository/commit work. |
| Product clarification | PRD is too thin for a testable first change. | MVP boundary, non-goals, and core behavior are testable. | Missing `grill-me`; product intent still vague. |
| OpenSpec initialization | Product direction is clear enough to track changes. | `openspec/`, `openspec/specs/`, and `openspec/changes/` exist; CLI or adapter limitation is verified and recorded. | Missing or failed OpenSpec setup when a change must be created. |
| Project context | PRD is clear but project/domain/technical context is not enough for review. | Context is sufficient to propose the first change. | Missing `grill-with-docs`; blocking architecture, security, data, integration, or source-layout questions. |
| Proposal | User confirmed propose. | `proposal.md`, `specs/`, `design.md`, and `tasks.md` exist for the active change. | Desired behavior or convention impact is unclear. |
| Review | Proposal artifacts exist. | Specs are testable; design assumptions are classified; tasks are executable; user is asked to confirm development. | Blocking TBDs, unconfirmed technical choices, blocking external knowledge, oversized MVP. |
| Implementation | Review passed and user confirmed development. | Tasks complete; tests/lint/build pass or gaps are explained. | Requirement/design conflict, failing verification, missing runtime/tooling. |
| User verification | Agent-side work is complete. | User has verified the core flow or explicitly reports verification result. | Manual/browser verification not actually performed or reported. |
| Sync and archive | User verification passed. | Specs are synced; change is archived; commit gate is handled. | Incomplete tasks, stale docs/specs, unresolved blocking questions, unhandled commit decision. |

## Resume Rules

When resuming, inspect files before choosing a stage. Do not rely on chat memory alone.

Check:

```text
git status and current branch
repository-local git author/committer config and recent commit identities when commits may be needed
recent commits when deciding whether a baseline or archived change has already been committed
PRD.md, CONTEXT.md, SECURITY.md, docs/, and docs/ai-tools.md when present
raw sources already recorded in PRD.md
openspec/, openspec/specs/, openspec/changes/, and archived changes
active OpenSpec change artifacts: proposal.md, specs/, design.md, tasks.md
task checkbox state, review notes, validation results, and user verification status when present
recent test/lint/build status if implementation has started
known blockers, Open Questions, and tool setup limitations
```

Use OpenSpec as the primary change-state signal when it exists:

| File State | Resume Gate |
|---|---|
| `openspec/` missing | Initialize OpenSpec before creating changes. |
| Active change has only `proposal.md` | Complete Stage 4 artifacts. |
| Proposal, specs, design, and tasks exist but review has not passed | Continue Stage 5 review. |
| Review passed and development was confirmed | Continue Stage 6 from the first incomplete task. |
| Implementation complete but user verification is not recorded | Continue Stage 7. |
| User verification passed but change is not archived | Continue Stage 8. |
| Change appears archived and synced but related changes are uncommitted | Handle the Stage 8 commit gate before recommending a new feature. |

If multiple active changes exist, list each one with the detected earliest incomplete gate, then ask
the user which one to continue. A session should have one active focus at a time.

## Focus Switching

Keep feature contexts separate.

Rules:

```text
one active focus at a time
a project may have multiple active OpenSpec changes
do not mix PRD, design, tasks, or review state between active changes
do not start a new feature while another active change is unfinished unless the user explicitly defers, abandons, archives, or switches focus
record the previous focus state before switching: active, deferred, abandoned, or promoted-to-change
```

For feature ideas that are not ready for an OpenSpec change, record a lightweight candidate in the
existing candidate artifact or in `PRD.md` under `Candidate Changes`.

Candidate shape:

```text
name or short label
one-sentence intent
status: candidate, deferred, abandoned, or promoted-to-change
known blocking question, if any
link to active OpenSpec change when promoted
```

## Conversation Routing

Before responding to a workflow turn, classify it:

| Route | Meaning | Response Shape |
|---|---|---|
| `gate-answer` | User answered the current blocking question or confirmed a gate transition. | Absorb the answer, update or prepare artifacts, and reassess the gate. |
| `gate-clarification` | User asks what the current question means or how to choose. | Explain briefly, simplify the decision, and ask one clearer version. |
| `productive-tangent` | Related side question reveals requirements, risks, constraints, terminology, or implementation context. | Answer, capture durable facts when in scope, then steer back to the active gate. |
| `new-focus` | User introduces a different feature, product direction, or change request. | Ask whether to switch focus, record a candidate, or return to the current gate. |
| `meta-process` | User questions the workflow, pace, gates, or whether the process is working. | Pause forward motion, explain or adjust the gate, and offer the smallest useful next step. |

If two consecutive user turns do not advance, revise, or explicitly defer the active gate, give a
compact checkpoint: active focus, current gate, what changed, and the single next question.

## Commit Identity State

Before creating a git or Lore commit, resolve author and committer identity.

```text
check repository-local git config user.name and user.email
inspect recent commits with author and committer fields
compare configured identity with recent project commits
if repository-local config is missing or differs from recent project commits, use the recent project identity or ask the user before committing
if multiple recent identities are legitimate and the correct one is unclear, ask the user
remember Lore still shells out to git commit and inherits git identity unless overridden
```

Allowed identity sources:

```text
explicit user-provided name and email for this commit/session
complete repository-local user.name and user.email that match the project history or are confirmed by the user
a single clear recent project identity from commit history when repository-local config is missing or clearly machine-global
```

Forbidden identity sources:

```text
OS username, home directory, machine account, agent profile, repository owner, remote URL owner, package author, README maintainer, chat display name, or guessed email domain
partial identity with only a name or only an email
fabricated fallback such as Codex, AI, Assistant, unknown@example.com, noreply@example.com, or a transliterated user/project name
```

If no allowed source yields exactly one complete `Name <email>` pair for author and committer, stop
at the commit gate and ask the user for the identity. A bare user reply like `commit` confirms that
the commit gate should be handled; it does not confirm an author, a committer, a Lore downgrade, or a
machine-global identity.

When the selected identity differs from current git config, pass identity explicitly through
`--author` and the relevant `GIT_COMMITTER_NAME` / `GIT_COMMITTER_EMAIL` environment variables, or
set repository-local config only with user approval.
