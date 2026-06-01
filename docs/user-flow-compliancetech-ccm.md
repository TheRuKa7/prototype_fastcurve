# User Flow: Aegis SOC 2 And Trust Center Demo

## Primary Demo Path

The demo starts with Maya, a GRC owner at Acme Financial Services, preparing for SOC 2 Type II. Aegis detects a high-severity AWS test failure, creates evidence, maps it to SOC 2 CC6.1, assigns remediation to Ethan in engineering, generates an MCP remediation snippet, refreshes the auditor snapshot, and updates the Trust Center once the issue is resolved.

## Navigation

The simplified IA has five hubs:

1. Overview
2. Compliance
3. My Work
4. Trust Center
5. Platform

Old deep links from the previous prototype render equivalent hub views so the Netlify deployment remains resilient.

## Flow

### 1. Overview

User sees:

- SOC 2 readiness score.
- Automated evidence rate.
- Open failing tests.
- Audit handoff readiness.
- Trust Center review deflection.
- Primary CTA: Fix failing SOC 2 test.

### 2. My Work

User sees:

- Overdue S3 encryption test.
- Owner, severity, resource, control, and exact fix.
- MCP tools: `list_tests`, `list_test_entities`, `get_remediation`.
- Terraform and CLI remediation output.

User actions:

- Start fix.
- Mark ready for review.
- Run check and close.

### 3. Compliance

User sees:

- SOC 2 readiness.
- Signal-to-status chain.
- Assessment lifecycle: scope, collect evidence, monitor controls, create finding, freeze snapshot, report posture.
- Auditor snapshot.
- Evidence states: Not Ready, Ready for audit, Approved, Flagged, N/A.
- Controls, tests, evidence, and documents in one table.

### 4. Trust Center

User sees:

- Buyer-facing SOC 2 badge and approved posture.
- Gated SOC 2 report request.
- NDA/access workflow.
- AI answer drafted from approved evidence with citations.

User actions:

- Approve SOC 2 access.
- Approve cited answer.

### 5. Platform

User sees:

- Integration coverage.
- Custom Resources API full-state sync example.
- OAuth token rotation with concurrent active tokens.
- MCP server and append-only audit log.
- Future sequencing for TPRM, privacy, and enterprise BU scoping.

## Success Criteria

- A first-time viewer understands Aegis in under 60 seconds.
- The sidebar has five primary entries.
- Every page has one clear primary action.
- Trust Center and MCP feel like hero differentiators.
- The prototype covers the original PDF's CCM chain:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```
