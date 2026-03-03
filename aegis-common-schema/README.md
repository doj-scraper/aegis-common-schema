# Aegis Common Schema

Canonical Pydantic v2 models and policy/obligation primitives used across Aegis modules, plus a small FastAPI demo API for integration validation.

## Project Review (Current State)

### What is strong
- Core schema boundaries are clear (`base`, `policy_obligations`, `access_control_engine`, `supply_chain`).
- Security model is opinionated in the right direction (fail-secure access checks, deterministic hashing, explicit obligations).
- Integration tests already cover critical classification and redaction behavior.
- Demo API makes it easier to validate real request/response behavior.

### What needs attention next
- There is no dedicated front-end GUI yet.
- CI/reference docs exist, but a production execution roadmap should be more explicit.
- Quality gates should expand beyond unit/integration tests (contract, performance, and security checks).

## Repository Layout

- `aegis_common_schema/` — Canonical models and decision engines.
- `apps/aegis_demo_api/` — Demo FastAPI service showing policy evaluation and header rendering.
- `tests/integration/` — End-to-end and API flow tests.
- `docs/` — Supporting architecture and CI references.

## Local Development

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
pytest -q
mypy aegis_common_schema
```

## 3-Phase Forward Plan (Production-Oriented)

### Phase 1 — Foundation Hardening
- Lock quality gates in CI: tests + mypy + lint + minimum coverage threshold.
- Add API contract tests for denial/allow/redaction/header scenarios.
- Define release/versioning policy and signed artifact workflow.
- Add structured logging and audit event shape checks.

### Phase 2 — Front-End GUI (TypeScript)
- Build a TypeScript front-end (React + Vite or Next.js) against the demo API.
- Implement classification banner and portion markings from server headers.
- Add secure session/auth integration path (replace demo headers with token-based claims).
- UI style guardrails: avoid dark-blue/cyan primary palettes and brutalist styling; use production-ready neutral + black/gold/violet or dark-green/wood-brown/yellow/white variants.

### Phase 3 — Production Readiness and Scale
- Add observability (metrics, traces, security audit dashboards).
- Perform load, soak, and failure-mode testing on policy/redaction paths.
- Add threat modeling and periodic security review cadence.
- Package deployment references (container hardening, SBOM signing, rollback plan).

## Recommended Testing Expansion

- Contract tests for API headers and body redaction behavior.
- Property-based tests for classification aggregation edge cases.
- Performance benchmarks for redaction on large nested payloads.
- Security tests for fail-closed behavior on malformed claims/input.

