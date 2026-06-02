# Review Checklist

Use after an OpenSpec change is created and before development begins.

## Proposal

- Does `proposal.md` match `PRD.md`?
- Does it explain why the change exists?
- Does it clearly say what is in scope?
- Does it clearly say what is out of scope?
- Did any open question become a false requirement?

## Specs

- Is each requirement observable from user or system behavior?
- Can each requirement be tested?
- Are acceptance criteria specific enough?
- Are failure paths or edge cases included where they matter?
- Are implementation details kept out of specs?

## Design

- Does `design.md` depend on unconfirmed product assumptions?
- Are technical constraints and risks explicit?
- For greenfield projects, is the build track recorded as throwaway prototype or product-track build?
- For greenfield projects, are stack, runtime, source layout, persistence, sensitive-data handling, integrations, broad UI direction, local verification, and deployment decisions confirmed or explicitly delegated to the agent as conservative defaults?
- For greenfield projects, if stack/runtime was delegated to the agent, does `design.md` record the selected stack, source layout, verification commands, and rationale rather than leaving them as proposed defaults?
- For greenfield product-track builds, does `design.md` record DDD-lite boundaries for the first slice, including how domain/application/infrastructure/UI responsibilities stay separated?
- For greenfield product-track builds, are core domain terms and confirmed business rules recorded in `CONTEXT.md`?
- For greenfield product-track builds, does the design keep business behavior out of UI, route handlers, persistence adapters, and framework glue?
- For any change, if external knowledge is required, does `design.md` classify it as known, provisional, or blocking?
- For known external knowledge, does `design.md` reference the source of truth such as docs, adapters, schemas, fixtures, contract tests, runbooks, or authoritative project docs?
- For provisional external knowledge, does `design.md` record the mock boundary, assumptions, non-goals, replacement trigger, and what must change when real facts arrive?
- If a domain-informed mock is used, does `design.md` name the domain pattern, explain why it fits the first slice, keep the boundary conservative, and mark provisional fields, workflows, states, and failure cases as assumptions?
- For greenfield projects, does the design prevent business source files from accumulating in the project root unless that root-level layout is the confirmed project shape?
- For existing projects, does the design either follow inherited architecture, stack, source layout, UI, test, and deployment conventions or identify the specific conventions it changes?
- For existing-project changes, is the impact on architecture, data, security, deployment, source layout, shared UI, and workflow conventions explicit?
- Are important tradeoffs recorded?
- Should any decision move to `docs/adr/`?
- Are open questions listed instead of hidden?

## Tasks

- Are tasks small enough to execute and verify?
- Are tasks ordered sensibly?
- For product-track builds, do core behavior test tasks appear before related implementation tasks?
- If TDD-first is skipped or deferred, is the reason explicit in `tasks.md` or `design.md`?
- Are docs updates included?
- Is CI included or explicitly deferred?
- Are PRD, CONTEXT, architecture, or ADR updates included when relevant?

## Decision

If review passes, ask user to confirm development.

If greenfield review fails because the build track is missing, ask whether this is a throwaway
prototype or product-track build and record the answer in `PRD.md`. If greenfield review fails
because technical or experience readiness is missing, ask one compact readiness question before
development. If the missing readiness is stack/runtime, recommend a specific first-slice stack with
brief rationale and ask the user to confirm it or explicitly authorize conservative defaults; do not
ask for development confirmation yet. If existing-project review follows existing conventions, do
not block on stack or UI questions. If review fails for product or domain reasons, name the single
most important blocking question and return to grill-me or grill-with-docs.

For greenfield product-track builds, fail review when core domain terms or business rules are
missing, business behavior is designed only inside UI/API/persistence code, core behavior test tasks
do not precede implementation tasks, or TDD-first is skipped without an explicit reason. For
throwaway prototypes, do not fail review on missing DDD-lite or TDD-first structure, but ensure the
shortcut is visible as a limitation.

If review fails because required external knowledge is blocking, ask one integration readiness
question: request the missing docs/examples/access details, identify the existing project contract to
inherit, or ask whether the user wants a provisional mock path with documented assumptions. Do not
ask for development confirmation yet.

If the proposed mock relies on a domain pattern, fail review when the pattern assumptions are treated
as confirmed external-system facts or when the agent expanded into a broad domain model beyond the
first slice without user request.

Report the review decision, validation summary, and confirmation question in the resolved project
language. Preserve exact commands, change names, file names, and error identifiers.
