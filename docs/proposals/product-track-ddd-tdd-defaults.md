# Product-Track DDD/TDD Defaults

Status: Implemented

## Why

`grill-driven-spec` currently steers 0-to-1 work toward a fast first slice, but its wording can make
MVP feel like the product quality target. DDD and TDD are mentioned as preferences, but they are not
strong enough to shape the default engineering path for long-lived greenfield products.

The observed failure mode is a project that gets an early result quickly, but later needs to be
reworked into domain-oriented boundaries and test-driven behavior. The workflow should avoid that by
distinguishing a throwaway prototype from a product-track build before choosing engineering
discipline.

## Goal

For 0-to-1 work, ask whether the project is a throwaway prototype or a product-track build before
deciding DDD/TDD strength.

MVP should control scope, not engineering discipline. A first slice can be small while still using
domain language, testable behavior, and clean boundaries appropriate for a product that may continue
to grow.

## Non-Goals

- Do not force heavy DDD ceremonies on every project.
- Do not require TDD for scripts, spikes, one-off demos, or explicitly throwaway prototypes.
- Do not require complete domain modeling before the first product slice.
- Do not rewrite the whole skill in one pass.
- Do not create source-code scaffolds during Stage 0.

## Proposed Behavior

### 0-to-1 Track Selection

After Stage 0 skeleton creation and before product/technical clarification, ask one compact track
question when the user has not already made the intent obvious:

```text
Is this first build a throwaway prototype or a product-track build?
```

Recommended default:

```text
Product-track build, unless the user explicitly says the work is disposable, a spike, a mockup, or a
demo that will not be maintained.
```

Record the selected track in `PRD.md` because it is product intent. When an OpenSpec change is later
created, copy the engineering consequences into the active `design.md`.

### Throwaway Prototype Track

Use when the user wants to test an idea quickly and does not expect the codebase to grow.

Expected behavior:

- Keep the first slice fast.
- Allow pragmatic shortcuts when they are recorded as limitations.
- Do not block implementation on DDD-lite boundaries or TDD-first task order.
- Still record non-goals, assumptions, run commands, and verification steps.
- Ask before converting prototype work into product-track work.

### Product-Track Build

Use when the user expects the project to become a maintained product, internal tool, SaaS, app, or
workflow system.

Expected behavior:

- Use DDD-lite by default.
- Use TDD-first for behavior changes by default.
- Keep business rules out of UI, route handlers, persistence adapters, and framework glue.
- Record domain terms and business rules in `CONTEXT.md`.
- Create `UBIQUITOUS_LANGUAGE.md` only when terminology grows beyond `CONTEXT.md` or DDD modeling has
  begun.
- Make `design.md` state the source/test layout and how domain/application/infrastructure/UI
  boundaries will be kept for the first slice.
- Make `tasks.md` place core behavior tests before implementation tasks.

DDD-lite means:

- Identify core domain terms.
- Record confirmed business rules.
- Name candidate entities, value objects, aggregates, policies, or domain services only when they
  clarify the first slice.
- Avoid broad up-front modeling.
- Keep implementation boundaries simple enough for the selected stack.

TDD-first means:

- Write or update tests for core behavior before implementing that behavior.
- Prefer domain/application tests for business rules.
- Add integration or UI tests only where the first slice needs confidence across boundaries.
- Allow explicit deferral for behavior that cannot reasonably be tested yet, with the reason recorded
  in `tasks.md` or `design.md`.

### Existing Project Product-Track Refactoring

For existing projects, inherit current architecture, source layout, and test conventions by default.
Do not turn a small change into a DDD/TDD migration.

Allow an existing project to opt into product-track refactoring only when the user explicitly asks for
long-term productization, DDD/TDD migration, maintainability refactoring, or product-grade
architecture. In that case, treat the refactor as its own existing-project change with scoped
behavior, compatibility, migration, and test strategy.

## Review Gate Changes

For greenfield product-track work, review before development should fail when:

- The track is unknown.
- Core domain terms and business rules are not recorded.
- Source and test layout are not confirmed or explicitly delegated.
- Business behavior is designed only inside UI/API/persistence code.
- Core behavior tasks do not include tests before implementation.
- TDD is skipped without an explicit reason.

For throwaway prototype work, review should not fail on missing DDD-lite or TDD-first structure, but
the shortcut must be visible as a limitation.

## Next-Slice Selection Changes

After the first product-track slice is implemented and verified, recommend follow-up slices using a
product maturity lens, not only feature size:

- Core workflow completeness
- Usability and recovery
- Reliability and edge states
- Data model durability
- Operational readiness
- Trust, permissions, privacy, and auditability
- UI polish and performance

The agent should still recommend small slices, but each recommendation should explain which maturity
dimension it improves.

## Files Likely To Change

- `SKILL.md`
- `README.md`
- `references/path-guides.md`
- `references/prompts.md`
- `references/review-checklist.md`
- `references/file-skeletons.md`
- `examples/0-to-1-with-raw-materials.md`
- `scenarios/0-to-1-with-raw-materials.json`

## Open Questions

None.

## Decisions

- Track choice is recorded in `PRD.md`. If an OpenSpec change is created, `design.md` records the
  engineering consequences such as DDD-lite boundaries, source/test layout, and TDD-first task order.
- Existing projects inherit current conventions by default. They may opt into product-track
  refactoring only when the user explicitly asks for productization, DDD/TDD migration,
  maintainability refactoring, or product-grade architecture.
- Default wording should avoid `MVP` in favor of `first slice`, `first product slice`, or `first
  testable slice`. Use `MVP` when the user uses that term or when the discussion is specifically
  about scope trimming.

## Draft Tasks

- [x] Update language from MVP-first to first-slice/product-track wording where appropriate.
- [x] Add 0-to-1 track selection after Stage 0.
- [x] Add product-track DDD-lite and TDD-first defaults.
- [x] Strengthen greenfield review gates for DDD/TDD.
- [x] Add throwaway prototype escape hatch.
- [x] Update prompts and examples so the behavior is regression-testable.
- [x] Run `node scripts/check-skill.mjs`.

## Verification

- `node scripts/check-skill.mjs` passed.
- User confirmed the Lore-first commit gate behavior worked in practice for a bare commit request.
