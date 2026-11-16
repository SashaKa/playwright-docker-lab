# Playwright + Docker Lab

UI test automation for a demo e-commerce site ([saucedemo.com](https://www.saucedemo.com)) with **Playwright + TypeScript**, running the same way locally, in **Docker** and in **GitHub Actions**.

![e2e](../../actions/workflows/e2e.yml/badge.svg)

## What's covered
- Login: happy path, locked-out user, validation (equivalence classes for credentials)
- Checkout: add to cart → cart → checkout form → order complete
- Page Object Model (`pages/`)
- Cross-browser: Chromium, Firefox, mobile viewport (Pixel 7)
- Docker image pinned to the Playwright version from `package.json`
- CI: matrix by browser, HTML report as an artifact, typecheck before tests

## Run
```bash
npm ci
npx playwright install --with-deps   # first time only, without Docker
npm test                             # all projects
npm run test:chromium
npm run report                       # open the last HTML report
```

In Docker (no local browsers needed):
```bash
docker compose run --rm tests
docker compose run --rm tests npx playwright test --project=chromium
```
The report lands in `./playwright-report` on the host.

## Project structure
```
pages/            page objects
tests/            specs
playwright.config.ts
Dockerfile        mcr.microsoft.com/playwright image, same version as @playwright/test
docker-compose.yml
.github/workflows/e2e.yml
```

## Roadmap
See [ROADMAP.md](ROADMAP.md).
