# Release Gate Report

Generated: 2026-02-20T11:30:31.374Z

## Gate Status
- Build: PASS (`npm run build`)
- Unit tests: BLOCKED (no Vitest test files found)
- Smoke checks: PASS (12/12)
- Vercel deep-link runtime: BLOCKED (CLI auth required in this environment)
- Local production deep-link reload: PASS (`/about`, `/projects/webapps`, `/projects/webapps/nebula-stream`)

## Smoke Coverage
- PASS: deep-link render /about (marker=CHRISTOPHER_RODRIGUEZ)
- PASS: deep-link reload /about (marker=CHRISTOPHER_RODRIGUEZ)
- PASS: deep-link render /projects/webapps (marker=Web Applications)
- PASS: deep-link reload /projects/webapps (marker=Web Applications)
- PASS: deep-link render /projects/webapps/nebula-stream (marker=Nebula Stream)
- PASS: deep-link reload /projects/webapps/nebula-stream (marker=Nebula Stream)
- PASS: palette opens with Ctrl+K
- PASS: palette enter navigates to detail (expected=/projects/webapps/nebula-stream actual=/projects/webapps/nebula-stream)
- PASS: palette reopens
- PASS: escape closes palette
- PASS: g+a chord navigates webapps (expected=/projects/webapps actual=/projects/webapps)
- PASS: g+d chord navigates articles (expected=/projects/articles actual=/projects/articles)

## Lighthouse Baseline
### /about
- Scores: Performance 52, Accessibility 88, Best Practices 92, SEO 91
- Metrics: FCP 1.4 s, LCP 1.5 s, Speed Index 4.3 s, TBT 2,700 ms, CLS 0
### /projects/webapps/nebula-stream
- Scores: Performance 70, Accessibility 88, Best Practices 92, SEO 92
- Metrics: FCP 0.5 s, LCP 1.4 s, Speed Index 1.5 s, TBT 610 ms, CLS 0

## Artifacts
- `release-gate/smoke-results.json`
- `release-gate/lighthouse-about.report.html`
- `release-gate/lighthouse-about.report.json`
- `release-gate/lighthouse-webapps-nebula-stream.report.html`
- `release-gate/lighthouse-webapps-nebula-stream.report.json`
- `release-gate/screenshots/desktop/about.png`
- `release-gate/screenshots/desktop/projects-webapps.png`
- `release-gate/screenshots/desktop/projects-webapps-nebula-stream.png`
- `release-gate/screenshots/mobile/about-iphone13.png`
- `release-gate/screenshots/mobile/projects-webapps-iphone13.png`
