# AGENTS.md - Aegis Common Schema

This file provides practical instructions for AI coding agents working in this repository.

## Mission
Maintain a production-oriented security schema library and demo API focused on:
- classification-aware access control,
- deterministic redaction,
- auditability and reproducibility.

## Repository Map
- `aegis_common_schema/` — canonical Pydantic v2 models and policy engines.
- `apps/aegis_demo_api/` — FastAPI demo service used for integration validation.
- `tests/integration/` — end-to-end validation of policy, redaction, and API behavior.
- `docs/` — architecture and CI reference material.

## Tech Stack
- Python `>=3.10`
- Pydantic v2
- FastAPI (demo API)
- pytest + mypy

## Working Rules
1. Preserve **fail-secure defaults** (deny by default, short-circuit on failure).
2. Keep model and hashing behavior **deterministic**.
3. Prefer explicit typing and schema clarity over implicit behavior.
4. Do not weaken access control checks to satisfy tests.
5. Any behavior change in policy/redaction should include test updates.

## Standard Commands
```bash
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
pytest -q
mypy aegis_common_schema
```

## Production-Readiness Expectations
- Prioritize testable, auditable changes.
- Document architecture-impacting decisions in `ARCHITECTURE.md`.
- Expand tests when modifying access, redaction, aggregation, or API contract behavior.

## Front-End Planning Guidance
If adding a GUI in this repo or related workstreams:
- Use TypeScript.
- Avoid dark-blue/cyan primary palette and avoid brutalist style.
- Preferred palette families: black/gold/violet or dark green/wood brown/yellow/white.

