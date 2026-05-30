# ComplianceOps Cloud Prototype

This workspace contains a clickable ComplianceTech / GRC SaaS prototype with a deep Continuous Compliance Monitoring flow.

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

Dashboard -> SOC 2 framework -> AC-01 control -> CCM rule -> Okta signal -> evidence -> finding -> remediation -> report

The core chain is:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```
