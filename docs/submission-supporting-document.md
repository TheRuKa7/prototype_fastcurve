# Aegis Case Study Supporting Document

Owner: Rushil Kaul
Status: Submission-ready
Prototype repository: https://github.com/TheRuKa7/prototype_fastcurve

## Executive Summary

Aegis is a Continuous Trust Management platform for mid-market B2B SaaS companies pursuing their first SOC 2 Type II. It continuously ingests live signals from cloud, identity, code, HR, MDM, and ticketing tools; converts those signals into mapped evidence; rolls evidence into controls, assessments, frameworks, and compliance status; and uses the resulting trust posture to accelerate security reviews through a buyer-facing Trust Center.

The product experience intentionally focuses on one strong wedge: SOC 2 readiness plus Trust Center revenue impact plus developer-native remediation. It avoids becoming a sprawling GRC suite.

Core traceability chain:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

## Submission Package

| Expected item | Submission artifact |
|---|---|
| Prototype link | Netlify-ready repo at `TheRuKa7/prototype_fastcurve`; local verified route is `http://localhost:5173`. |
| Supporting document | This document, plus PRD, user flow, RFC, completeness matrix, and product demo guide in `/docs`. |
| Optional architecture diagrams | Included below: services, data model, and integration layer. |

## Supporting Artifacts

- Product demo guide: `docs/product-demo-user-guide.md`
- Completeness matrix: `docs/completeness-matrix.md`
- Product requirements: `docs/prd-compliancetech-ccm.md`
- User flow: `docs/user-flow-compliancetech-ccm.md`
- Prototype RFC: `docs/rfc-compliancetech-ccm-prototype.md`

## PM Narrative

The product should be introduced as a wedge, not a platform sprawl. Aegis starts with a focused SOC 2 Type II workflow for a mid-market SaaS company because that is where compliance pain, sales urgency, and implementation tractability meet. Once the trust graph exists, the same evidence can support additional frameworks, buyer-facing Trust Center proof, and developer remediation workflows.

The key differentiation is that Aegis does not treat remediation as a compliance-admin task. The engineer sees the finding in normal work surfaces and can use MCP tools to ask what failed, which resources are affected, and how to fix the issue with Terraform or CLI output.

## MVP Boundary

P0 includes SOC 2 monitoring, evidence automation, remediation, My Work, auditor snapshot, Trust Center access workflows, Custom Resources API, and safe public API token rotation.

P1 includes a fuller MCP server, Trust Center AI, ISO 27001 and HIPAA expansion, multi-step approvals, and SIEM streaming.

P2 includes agentic TPRM, privacy workflows, enterprise business-unit scoping UI, and an integration marketplace.

## Service Architecture

```mermaid
flowchart LR
  User["GRC owner / engineer / auditor / buyer"] --> Web["React/Next.js app"]
  Web --> API["Core API"]
  API --> DB["Postgres + JSONB + RLS"]
  API --> Files["Versioned evidence storage"]
  API --> Queue["Workflow engine"]
  Queue --> Connectors["Integration workers"]
  Queue --> Tests["Continuous test engine"]
  Tests --> DB
  Connectors --> SaaS["AWS / GitHub / Okta / HRIS / MDM / Jira"]
  API --> Trust["Trust Center"]
  API --> MCP["MCP server"]
  MCP --> IDE["Claude Code / Cursor"]
```

## Data Model

```mermaid
erDiagram
  Tenant ||--o{ Resource : owns
  Tenant ||--o{ Document : owns
  Resource ||--o{ TestRun : evaluated_by
  Test ||--o{ TestRun : emits
  TestRun ||--o{ Evidence : produces
  Evidence }o--|| Control : supports
  Control }o--o{ Framework : maps_to
  Framework ||--o{ Assessment : scoped_by
  TestRun ||--o{ Finding : creates
  Finding ||--o{ RemediationTask : assigned_to
  Assessment ||--o{ AuditSnapshot : freezes
  Document ||--o{ TrustCenterRequest : requested_by
  ApiApplication ||--o{ AccessToken : rotates
```

## Integration Layer

```mermaid
flowchart TD
  Source["Integration source"] --> Sync["Full or incremental sync"]
  Sync --> Normalize["Normalize to Resource schema"]
  Normalize --> Store["Store resource + raw payload"]
  Store --> Evaluate["Evaluate affected tests"]
  Evaluate --> Evidence["Write evidence + TestRun"]
  Evidence --> Status["Recompute control and framework status"]
  Status --> Finding["Create finding if failing"]
  Finding --> Ticket["Jira / Linear ticket"]
  Finding --> MCP["MCP remediation output"]
  Status --> Snapshot["Auditor snapshot"]
  Status --> TrustCenter["Trust Center posture"]
```

## Known Prototype Limits

- The app is a static React SPA with mock data.
- Integrations, tickets, AI, MCP, and auth are represented as product surfaces, not live services.
- Netlify deployment uses the Git-connected repository, build command `npm run build`, and publish directory `dist`.
