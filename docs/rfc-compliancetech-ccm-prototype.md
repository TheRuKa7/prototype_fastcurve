# RFC: Aegis Static Prototype

## Summary

The prototype is a static React SPA using browser UMD React bundles, local mock data, and a lightweight Node static server. It is Netlify-ready through `npm run build`, which copies source assets into `dist/` and writes an SPA `_redirects` file.

## Routes

- `/overview`
- `/compliance`
- `/compliance/soc2`
- `/work`
- `/trust-center`
- `/platform`

Legacy routes such as `/dashboard`, `/vendors`, `/monitoring`, and `/reports/soc2-readiness-summary` render equivalent hub views.

## Mock Entities

The app includes PRD-specific mock entities:

- `Resource`
- `Test`
- `TestRun` represented through test status and remediation state
- `Document`
- `TrustCenterRequest`
- `BuyerQuestion`
- `AuditSnapshot`
- `ApiApplication`
- `AccessToken`
- `McpTool`

## State

The demo uses local storage under `aegis-demo-state`.

State transitions:

1. Initial state has one high-severity failing SOC 2 test.
2. User starts remediation from My Work.
3. User marks remediation ready for review.
4. User runs check and closes the issue.
5. SOC 2 readiness, auditor snapshot, Trust Center access, and buyer AI state update.

## Design

The UX intentionally avoids a large module-heavy GRC layout. It uses five hubs, one primary action per page, large readable cards, and guided workflow panels.

## Build And Deploy

```text
Build command: npm run build
Publish directory: dist
Node version: 20
```

## Verification

- Syntax-check `src/app.js`, `server.cjs`, and `scripts/build.cjs`.
- Run the build script.
- Browser-check `/overview`, `/work`, `/trust-center`, `/platform`, and legacy `/vendors`.
- Confirm no console errors.
- Confirm mobile has no horizontal overflow.
