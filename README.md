# Aegis Continuous Trust Prototype

This workspace contains a clickable Aegis prototype: a simplified Continuous Trust Management platform for mid-market B2B SaaS companies pursuing SOC 2 Type II.

## Submission Packet

- Prototype repository: https://github.com/TheRuKa7/prototype_fastcurve
- Primary supporting document: [docs/submission-supporting-document.md](docs/submission-supporting-document.md)
- Product demo user guide: [docs/product-demo-user-guide.md](docs/product-demo-user-guide.md)
- Product docs: PRD, user flow, RFC, and completeness matrix in [docs](docs)
- Optional architecture diagrams: included in the supporting document

## Run Locally

Use Node 20+:

```powershell
npm run dev
```

Then open:

```text
http://localhost:5173
```

If `npm` is not available in this local Codex environment, use the bundled runtime directly:

```powershell
& 'C:\Users\rushi\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.cjs
```

## Netlify Deployment

This repo is Netlify-ready.

Netlify settings:

```text
Build command: npm run build
Publish directory: dist
Node version: 20
```

The build script copies the static app into `dist/` and creates an SPA redirect so deep links such as `/vendors` and `/monitoring/rules/rule-mfa` work after deployment.

## Main Walkthrough

Overview -> My Work remediation -> Compliance auditor snapshot -> Trust Center buyer access -> Platform extensibility

The core chain is:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

## Review Walkthrough

1. Start on Overview and point out the SOC 2-first command center.
2. Click `Open remediation queue`.
3. Use My Work to start the fix, mark it ready for review, and run the check.
4. Open Compliance to show the auditor snapshot and evidence states.
5. Open Trust Center to approve gated SOC 2 access and a cited AI answer.
6. Open Platform to show integrations, Custom Resources API, token rotation, and MCP positioning.
