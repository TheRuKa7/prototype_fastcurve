# PRD: Aegis Continuous Trust Management

## Summary

Aegis is a continuous trust management platform for mid-market B2B SaaS companies pursuing their first SOC 2 Type II. It pulls live signals from cloud, identity, code, HR, MDM, and ticketing systems; maps them to evidence, controls, assessments, and framework status; and turns compliance into a daily operating system instead of a pre-audit scramble.

The product wedge is intentionally narrow: SOC 2 readiness for 50 to 500 employee SaaS companies. The expansion loop is a buyer-facing Trust Center that reduces security-review friction and helps sales teams close enterprise deals faster. The signature differentiator is developer-native remediation through MCP and IDE workflows.

Core chain:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

## Users

- GRC owner / security lead: owns SOC 2 readiness, evidence, controls, auditors, and buyer security reviews.
- Engineer / resource owner: receives failing tests with exact remediation guidance in Jira, terminal, and IDE.
- External auditor: reviews frozen evidence snapshots and stable control mappings.
- Prospective buyer: self-serves approved Trust Center content and asks cited AI questions.

## Assumptions

- The first wedge is mid-market B2B SaaS companies with 50 to 500 employees pursuing their first SOC 2 Type II.
- The buyer already has common SaaS and infrastructure systems: AWS, GitHub, Okta, an HRIS, an MDM, and Jira or Linear.
- The case-study prototype is evaluated on product thinking, workflow clarity, and demo completeness, not production backend depth.
- Trust Center and MCP remediation are the strongest differentiators and should be visible in the first demo path.
- TPRM, privacy, and enterprise business-unit scoping matter later, but they are not required to win the first SOC 2 wedge.

## Domain Model

- Resource: a monitored asset such as an S3 bucket, GitHub repository, user, laptop, employee record, or custom resource.
- Test: a continuous monitoring rule evaluated against resources.
- TestRun: a timestamped result from a test evaluation.
- Evidence: a normalized record proving a test or document state at a point in time.
- Control: an internal safeguard, mapped to one or more frameworks.
- Assessment: the scoped evaluation of controls and evidence for a period.
- Framework: SOC 2 first, with ISO 27001 and HIPAA later through many-to-many control mapping.
- Finding: an owned failure or gap created from a failed test or auditor flag.
- Document: policy or file evidence with lifecycle, renewal, and approval state.
- AuditSnapshot: an immutable auditor-facing view of evidence and status.
- TrustCenterRequest: a buyer request for gated evidence or reports.
- ApiApplication and AccessToken: public API clients with safe token rotation.
- McpTool: IDE-accessible remediation tools such as `list_tests`, `list_test_entities`, and `get_remediation`.

## P0 Capabilities

- SOC 2-focused integration and ingestion engine for AWS, GitHub, Okta, Gusto, MDM, Jira, and related evidence sources.
- Continuous test engine that evaluates resources on sync and records timestamped test history.
- Control and framework mapping with many-to-many evidence reuse.
- Document lifecycle with upload state, renewal cadence, and approval status.
- Remediation workflow with owner assignment, Jira/Linear context, and two-way status sync.
- My Work view grouped by urgency and ownership.
- Auditor portal with immutable evidence snapshots and review states.
- Basic Trust Center with live badges, gated documents, NDA/access approval, and buyer-facing AI answers with citations.
- Custom Resources API for unsupported systems.
- Public REST API and OAuth2 with concurrent tokens and overlap windows for safe rotation.

## P1 Capabilities

- MCP server exposing `list_tests`, `list_test_entities`, and `get_remediation`.
- Trust Center AI over approved knowledge base only.
- ISO 27001 and HIPAA framework expansion using the same evidence graph.
- Multi-step approvals and policy-read tracking.
- SIEM streaming from the audit log.

## Non-Goals

- Full agentic TPRM in MVP.
- Full privacy suite such as DPIA, ROPA, or ISO 27005 risk register.
- Enterprise multi-business-unit admin UI in MVP.
- 400 integrations at launch.
- On-prem or self-hosted deployment.

## Product Principles

- Continuous, not point-in-time.
- Extensibility is the moat.
- Compliance should accelerate revenue.
- Meet engineers where they work.
- Architect for enterprise, sell to mid-market first.

## MVP Experience

The prototype demonstrates:

1. A failing SOC 2 control from AWS evidence.
2. Evidence mapping into SOC 2 readiness.
3. My Work remediation with MCP-generated Terraform and CLI guidance.
4. Auditor snapshot readiness.
5. Trust Center document access and buyer AI Q&A.
6. Platform extensibility through Custom Resources API and token rotation.

## Trade-Offs

- The demo uses static mock data and client-side state because the assignment evaluates product thinking, UX, and workflow coherence rather than backend completeness.
- Trust Center and MCP receive more emphasis than TPRM because they are the updated PRD's sharpest differentiators.
- Vendor/risk/privacy areas are acknowledged as future expansion but intentionally not deeply implemented.
