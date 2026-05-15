# Helper Capabilities

Use these as optional capability slots. They are not fixed dependencies.

`grill-driven-spec` remains the driver: helpers enrich the current phase and return decisions to the
project artifacts and OpenSpec gates.

Before using any helper, define:

- trigger
- narrow question
- writeback target
- stop condition
- fallback if the helper, external reference, MCP, browser, private skill, or network access is unavailable

If a helper is unavailable, do not stop the workflow by default. Record the limitation and fall back
to local project artifacts, existing docs, screenshots, or agent-native reasoning.

Helper findings are advisory until written into Grill Driven Spec artifacts and accepted by the
relevant OpenSpec review gate. Treat findings as blocking only when they affect safety,
correctness, data, deployment, reversibility, or the user's confirmed goal.

## Product Maturity Helper

Use when:

- the user asks what to build next
- feature direction feels scattered
- prioritization is unclear
- user journey, roadmap, or metrics need clarification

Typical outputs:

- prioritized candidate changes
- opportunity or journey notes
- outcome-oriented roadmap notes
- success metrics or decision criteria

Write back to:

- `PRD.md`
- `CONTEXT.md`
- `Candidate Changes`
- active OpenSpec `proposal.md` or `design.md`

Possible implementations:

- installed PM skills
- project-specific product docs
- agent-native product reasoning

Do not turn a small next-slice decision into a full discovery workflow unless the user asks for it.

## Design Maturity Helper

Use when:

- the product works but feels visually rough
- UI or interaction patterns are inconsistent
- the user asks for a more polished, usable, or coherent product
- a reusable project visual direction is needed

Typical outputs:

- design reference observations
- product tone and UI principles
- color, typography, spacing, and component guidance
- project-level `DESIGN.md`
- UI verification expectations

Write back to:

- `DESIGN.md`
- active OpenSpec `design.md`
- `tasks.md`
- verification notes

Possible implementations:

- design reference sites such as Refero Styles
- existing product screenshots or browser review
- project-specific design system docs
- agent-native UI review

Do not copy a reference brand blindly. Record the design direction that fits the product.
Do not block the workflow if a design reference site, browser, or MCP is unavailable.

## Architecture Maturity Helper

Use when a change affects:

- architecture boundaries or module ownership
- data model, migrations, persistence, or lifecycle rules
- authentication, authorization, privacy, or sensitive-data handling
- external integrations or AI/tool dependencies
- performance, reliability, deployment, runtime, or CI
- technology selection
- intentional refactoring
- release readiness

Typical outputs:

- solution design notes
- architecture review findings
- technology selection matrix or ADR
- risk register
- threat model or security review notes
- technical debt assessment
- release gate checklist

Write back to:

- `docs/architecture.md`
- `docs/adr/`
- `SECURITY.md`
- active OpenSpec `design.md`
- `tasks.md`
- release or verification notes

Possible implementations:

- installed public architecture skills
- local or private architecture skill packs
- project-specific architecture docs
- agent-native architecture review

Example mapping for an architecture helper pack:

- architecture-impacting feature -> architecture design review
- new service or substantial feature design -> solution design proposal
- technology adoption -> technology selection evaluation
- security-sensitive design -> threat modeling or security review
- technical debt roadmap -> technical debt assessment
- release readiness -> product release gating

Do not invoke architecture helpers for routine feature changes unless architecture risk is actually
part of the current problem.
If a public or private architecture helper is unavailable, use local architecture docs and
agent-native architecture review instead of stopping by default.
