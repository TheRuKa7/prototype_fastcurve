# Completeness Matrix

## Original Case-Study PDF

| Requirement | Prototype Coverage |
|---|---|
| Navigation and information architecture | Covered with five simple hubs. |
| Side menu and major module pages | Covered through Overview, Compliance, My Work, Trust Center, Platform. |
| Example assessment lifecycle | Covered through the Compliance page lifecycle: scope, evidence, monitoring, finding, snapshot, reporting. |
| Dashboard experience | Covered through the Overview cockpit. |
| Cross-module relationships | Covered through Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status. |
| CCM deep dive | Covered through failing test, evidence, remediation, and status rollup. |
| Control monitoring | Covered through SOC 2 tests and AWS signal. |
| Evidence collection | Covered through automated evidence and document lifecycle. |
| Integrations | Covered through Platform integration cards. |
| Compliance posture | Covered through SOC 2 readiness score. |
| Alerting/findings | Covered through My Work, Finding FIND-001, and failing test workflow. |
| Reporting | Covered through Trust Center and auditor snapshot surfaces. |
| Product documentation | Covered through PRD, user flow, RFC, supporting document, and this matrix. |
| Extensibility/trade-offs | Covered through Custom Resources API, token rotation, and phased non-goals. |

## Updated Aegis PRD

| P0 / Differentiator | Prototype Coverage |
|---|---|
| SOC 2-first wedge | Visible on Overview and Compliance. |
| Live signals to controls | Covered by AWS signal to SOC 2 CC6.1. |
| Evidence automation | Covered by automated evidence rate and document table. |
| My Work | Covered as a primary hub. |
| Developer-native remediation | Covered through MCP remediation and Terraform/CLI output. |
| Auditor portal / immutable snapshot | Covered by auditor snapshot panel and evidence states. |
| Trust Center growth loop | Covered by gated report access and buyer AI Q&A. |
| Custom Resources API | Covered in Platform. |
| Public API / token rotation | Covered in Platform with concurrent active tokens. |
| TPRM and privacy sequencing | Covered as later-phase decisions. |

## Vanta Cross-Reference

| Vanta Capability Verified | Aegis Positioning |
|---|---|
| SOC 2 automation and continuous monitoring | Aegis narrows to SOC 2 first and makes the flow clearer. |
| Trust Center with AI and access workflows | Aegis treats Trust Center as the revenue loop, not a side module. |
| MCP server and IDE remediation | Aegis makes MCP the product signature. |
| Custom Resources API | Aegis includes a similar extensibility surface from MVP. |
| One active Vanta API token behavior | Aegis differentiates with concurrent token rotation and overlap windows. |
| Audit evidence statuses | Aegis models Not Ready, Ready, Approved, Flagged, and N/A. |
| TPRM Agent | Aegis sequences deep TPRM later to preserve MVP focus. |

## Remaining Intentional Gaps

- Real backend services are not implemented.
- Real integrations are mocked.
- Real Trust Center access control is mocked.
- Real MCP server is represented as product surface and tool output only.
- Full TPRM, privacy suite, and enterprise BU scoping are deferred by design.
