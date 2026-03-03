# Aegis Common Schema Architecture

## Scope
This document describes the architecture of the schema library, policy engine behavior, demo API integration, and the staged path to a production system including a front-end GUI.

## High-Level Components

1. **Schema Layer (`aegis_common_schema`)**
   - Provides typed canonical models, enums, and deterministic hash helpers.
   - Defines policy obligations and redaction rules.
   - Implements access-control decision flow with fail-secure defaults.

2. **Policy/Decision Layer**
   - Evaluates user/session/resource context.
   - Denies on first failing gate (account, session, clearance, compartments, need-to-know).
   - Emits obligations for downstream enforcement and audit.

3. **Redaction Layer**
   - Applies field-level and portion-level redaction after allow decisions.
   - Supports wildcard path traversal for nested collections.

4. **API Layer (`apps/aegis_demo_api`)**
   - Demonstrates real HTTP flow and classification rendering.
   - Publishes response headers for aggregated classification/markings.

5. **Test Layer (`tests/`)**
   - Validates access-control outcomes, redaction behavior, and end-to-end API flow.

## Data and Decision Flow

1. Parse auth/session context from request.
2. Evaluate authorization against resource classification and compartments.
3. If denied: return fail-secure 403 payload.
4. If allowed:
   - Compute obligations.
   - Apply redaction policy.
   - Aggregate highest classification and markings.
   - Return redacted body + classification headers.

## Architecture Feedback (Honest Assessment)

### Good
- Strong separation between model primitives and decision logic.
- Security-oriented defaults are built into code paths, not left to callers.
- Deterministic outputs are practical for auditing and reproducibility.

### Gaps
- The current “demo API + library” setup is not yet a full production architecture.
- Missing dedicated GUI and typed client contract package.
- Testing depth is good for integration basics, but not yet enough for production confidence (scale/security/perf).

## 3-Phase Implementation Plan

### Phase 1 — Stabilize Core and Contracts
- Formalize OpenAPI contract versioning and compatibility checks.
- Add CI checks for coverage threshold, linting, and stricter typing.
- Add negative-path tests for malformed contexts and unknown enum values.
- Introduce changelog/release automation.

### Phase 2 — Front-End GUI (TypeScript, Production UX)
- Implement a TypeScript GUI (React + strict TS config).
- Render classification banner and markings from server-provided headers.
- Add API client generation from OpenAPI to prevent schema drift.
- Enforce design guidance:
  - No dark-blue/cyan primary button style.
  - No brutalist style.
  - Preferred palette families: black/gold/violet or dark green/wood brown/yellow/white.

### Phase 3 — Production Operations and Assurance
- Add end-to-end authN/authZ integration with real identity claims.
- Add security hardening controls (rate limiting, strict transport/security headers, secrets management).
- Run performance, resilience, and threat-model validation before release.
- Add operational SLOs and alerting for access decision anomalies.

## Testing Strategy for the Plan

- **Unit tests:** model validation, enum coercion, deterministic hash invariants.
- **Integration tests:** policy evaluation + redaction + aggregation headers.
- **Contract tests:** API schema compatibility and generated TypeScript client checks.
- **Performance tests:** redaction throughput and p95 latency under realistic payload sizes.
- **Security tests:** fail-closed behavior for invalid claims/session state and privilege escalation attempts.

