# 0-to-1 With Raw Materials

Use this scenario to test a new project folder that is not empty, but does not yet contain a
coherent project skeleton or implementation.

## Setup

Create an otherwise empty folder with raw source materials, for example:

```text
idea-notes.md
meeting-notes.md
screenshots/
exports/
```

Then run:

```text
/grill-driven-spec I want to build <project idea>
```

## Expected Behavior

- The agent treats the folder as a 0-to-1 candidate, not as Existing Project Adoption.
- The agent makes each workflow transition visually obvious with a large Markdown `Driving` heading.
- The agent does not delete, move, rename, overwrite, or destructively summarize raw source files.
- The agent initializes git when available and creates the thin Stage 0 skeleton.
- After creating the Stage 0 skeleton, the agent creates an initial baseline commit for generated workflow files when git is available.
- Before creating the initial baseline commit, the agent resolves author and committer identity from repository-local config or asks the user when no project identity exists.
- The initial baseline commit does not proactively add raw source materials unless the user asks, and it does not disturb raw materials that were already tracked or intentionally staged.
- Missing Lore does not block Stage 0; the initial baseline commit may use normal git when Lore is unavailable.
- `PRD.md` records raw source paths under `Raw Sources`.
- Clearly stated facts may be copied into `PRD.md`, but inferred requirements stay under `Open Questions`.
- `Confirmed Requirements` stays empty until the user confirms requirements during grill-me.
- After Stage 0, the agent asks whether the build is a throwaway prototype or product-track build unless the user's intent is already explicit.
- The selected build track is recorded in `PRD.md`.
- The agent enters grill-me after the skeleton exists, passing the PRD/OpenSpec convergence contract instead of copying grill-me's internal rules.
- During grill-me, the agent may answer useful side questions, but captures durable facts as requirements, risks, constraints, open questions, or candidates and then returns to the active gate.
- If two consecutive turns do not advance, revise, or explicitly defer the current gate, the agent gives a compact checkpoint and asks one next question.
- If the user introduces a different feature or product direction, the agent asks whether to switch focus, record it as a Candidate Change, or return to the current gate.
- If the user questions the process, the agent explains why the current gate matters and offers a smaller next step instead of continuing to grill blindly.
- Before development, the agent asks a compact greenfield readiness question for blocking technical/UI choices. If stack/runtime is missing, it recommends a first-slice stack with brief rationale and asks the user to confirm it or explicitly authorize conservative defaults.
- For product-track builds, the agent records core domain terms and business rules before review, keeps business behavior out of UI/API/persistence glue, and orders core behavior tests before implementation tasks unless TDD-first is explicitly deferred.
- For throwaway prototypes, the agent may skip DDD-lite or TDD-first gates only when the shortcut is recorded as a limitation.
- If the idea depends on an external system, the agent asks for enough docs/examples/access details or asks whether to proceed with a provisional mock boundary and documented assumptions.
- If the external system belongs to a mature domain, the agent may suggest a conservative domain-informed mock, but it names the pattern and records assumptions instead of treating them as real external-system facts.
- The same external knowledge readiness rule should also apply later if an existing-project change adds or changes an external system contract.

## Regression Risks

- Treating raw notes as confirmed product requirements.
- Asking product, stack, or design questions before creating the skeleton.
- Treating `git init` alone as a complete project initialization when git is available.
- Creating the initial baseline commit with an unconfirmed machine-global git identity.
- Blocking Stage 0 because Lore is unavailable for the initial baseline commit.
- Adding raw notes, screenshots, exports, or drafts to the initial commit without user intent.
- Moving raw files into `docs/inbox/` without explicit approval.
- Over-summarizing large source materials during Stage 0.
- Letting early ideation side questions erase the active first-slice clarification gate.
- Ending grill replies with vague invitations instead of one concrete steering question.
- Silently replacing the active first slice when the user mentions another idea.
- Starting product or technical grilling without recording the build track in `PRD.md`.
- Passing review and prompting development while stack, runtime, source layout, persistence, sensitive-data handling, or verification choices are still blocking TBDs or only implied defaults.
- Passing product-track review while domain terms, business rules, DDD-lite boundaries, or TDD-first task order are missing.
- Treating product-track engineering discipline as optional just because the first slice is small.
- Passing review and prompting development while required external-system behavior is unknown and no explicit mock path has been approved.
- Turning a domain-informed mock into a broad domain-modeling interview or treating industry-pattern assumptions as confirmed requirements.
