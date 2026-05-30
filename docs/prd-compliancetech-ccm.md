# PRD: ComplianceTech Platform With CCM Focus

## 1. Product Summary

### Product Name

ComplianceOps Cloud

### Product Vision

ComplianceOps Cloud helps enterprise compliance, security, risk, and audit teams operationalize compliance continuously instead of preparing for audits through periodic manual evidence collection. The platform combines assessment workflows, normalized control libraries, evidence management, findings, risk tracking, third-party assessment, reporting, and Continuous Compliance Monitoring (CCM).

The MVP demo should feel like a credible B2B SaaS shell that a product manager could show to a customer, executive sponsor, or engineering team. It should communicate how signals from connected systems become evidence, how evidence evaluates controls, how controls roll up to frameworks and assessments, and how failed checks produce findings and remediation work.

Primary CCM chain:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

### Product Positioning

ComplianceOps Cloud is conceptually similar to modern compliance automation tools such as Vanta, Drata, Secureframe, or enterprise GRC platforms, but the demo should emphasize richer GRC modeling:

- Multi-entity assessment scopes
- Framework and control normalization
- Evidence traceability
- Automated monitoring rules
- Findings and remediation workflows
- Risk and third-party extensibility

## 2. Problem Statement

Compliance programs are often managed through spreadsheets, disconnected ticketing workflows, repeated manual evidence requests, and static audit reports. This creates several problems:

- Evidence is collected too late, usually right before audits.
- Control owners lack real-time visibility into control health.
- Teams duplicate work across SOC 2, ISO 27001, NIST CSF, and internal policies.
- Failed controls are not consistently converted into remediation work.
- Audit teams struggle to trace evidence back to systems, owners, controls, and frameworks.
- Executives see compliance as a point-in-time report instead of an operational posture.

The product should solve this by creating a continuous operating model where controls are monitored, exceptions are detected early, findings are assigned, and posture is always visible.

## 3. Goals And Success Criteria

### Product Goals

- Provide an end-to-end product shell for a ComplianceTech / GRC SaaS platform.
- Demonstrate a realistic assessment lifecycle across scope definition, questionnaires, controls, evidence, review, and sign-off.
- Make CCM the deepest and most convincing module in the prototype.
- Show cross-module relationships between frameworks, controls, evidence, findings, risks, vendors, reports, and integrations.
- Support an interview-style walkthrough that explains product decisions, MVP boundaries, and scale path.

### Demo Success Criteria

The demo is successful if a viewer can understand:

- What the platform does within 60 seconds of landing on the dashboard.
- How an automated signal becomes evidence.
- How evidence maps to a control.
- How a failed control affects assessment and framework posture.
- How a finding is created, assigned, tracked, and resolved.
- How reports become audit-ready from the underlying evidence graph.
- What is included in the MVP and what is intentionally mocked.

## 4. Target Users And Personas

### Primary Persona: Compliance Manager

Owns compliance programs, coordinates assessments, prepares audits, tracks control status, and reports posture to leadership.

Needs:

- Real-time compliance posture
- Evidence readiness
- Framework-level reporting
- Assignment and review workflows
- Audit trail and traceability

### Secondary Persona: Security Control Owner

Owns operational controls such as MFA, access reviews, vulnerability management, employee onboarding, and incident response.

Needs:

- Clear control obligations
- Automated evidence collection
- Failed check notifications
- Remediation tasks with due dates
- Minimal manual audit work

### Secondary Persona: Auditor / Reviewer

Reviews controls, evidence, exceptions, and final assessment status.

Needs:

- Evidence lineage
- Reviewer notes and approvals
- Control history
- Exportable reports
- Confidence that evidence is current and complete

### Secondary Persona: Executive Sponsor

Needs a concise view of organizational compliance posture, risk exposure, remediation progress, and audit readiness.

Needs:

- Framework scorecards
- Risk and trend summaries
- Open critical findings
- Business-unit level posture

## 5. Core Product Modules

### Dashboard

Purpose: Provide an executive and operator view of compliance posture.

Key capabilities:

- Overall compliance score
- Framework posture cards for SOC 2, ISO 27001, and NIST CSF
- Monitored controls passing, failing, or needing review
- Open findings by severity
- Evidence freshness summary
- Upcoming assessment milestones
- Remediation SLA status

### Frameworks

Purpose: Represent external and internal compliance frameworks.

Key capabilities:

- Framework overview pages
- Domains, requirements, and controls
- Cross-mapped controls across frameworks
- Framework posture rollups
- Control coverage and evidence coverage

MVP frameworks:

- SOC 2
- ISO 27001
- NIST CSF

### Controls Library

Purpose: Maintain reusable normalized controls.

Key capabilities:

- Control catalog
- Owner, scope, status, and risk metadata
- Framework mappings
- Evidence requirements
- Monitoring rule mappings
- Control detail view with timeline and audit trail

### Assessments

Purpose: Run workflow-driven compliance, risk, or vendor assessments.

Key capabilities:

- Assessment creation
- Scope selection
- Questionnaire assignment
- Evidence request and submission
- Reviewer approval
- Final sign-off
- Assessment output to findings and reports

### Continuous Monitoring

Purpose: Continuously evaluate controls using connected-system signals.

Key capabilities:

- Monitoring overview
- Rules mapped to controls
- Signal stream from integrations
- Evidence generation
- Failed check detection
- Alerting and finding creation
- Posture trend over time

This is the primary deep-dive module.

### Evidence

Purpose: Centralize manual and automated evidence.

Key capabilities:

- Evidence inventory
- Source, timestamp, owner, and freshness
- Linked controls and frameworks
- Reviewer status
- Manual uploads and automated snapshots

### Findings

Purpose: Convert failed controls, review observations, and assessment gaps into trackable remediation work.

Key capabilities:

- Finding list and detail
- Severity and due date
- Owner assignment
- Linked control, evidence, assessment, and framework
- Remediation task status
- Reviewer closure workflow

### Risks

Purpose: Track risk items originating from failed controls, accepted exceptions, vendor issues, or business decisions.

Key capabilities:

- Risk register
- Inherent and residual risk
- Treatment plan
- Linked findings and controls
- Owner and review date

### Vendors / TPRM

Purpose: Represent future third-party risk management workflows.

Key capabilities:

- Vendor inventory
- Onboarding assessment status
- Questionnaire and evidence requests
- Criticality and risk tier
- Reassessment schedule

### Reports

Purpose: Create audit-ready and executive-ready reporting.

Key capabilities:

- Framework report
- Assessment report
- Evidence export
- Findings summary
- Executive posture report

### Integrations

Purpose: Connect systems that emit compliance-relevant signals.

MVP integrations:

- Okta for identity and MFA
- AWS for cloud configuration
- GitHub for repository security
- Jira for remediation workflow
- HRIS for employee lifecycle evidence

## 6. MVP Scope

### Included In MVP Demo

- SaaS shell with left navigation and major modules.
- Static mock data with realistic enterprise objects.
- Dashboard with posture metrics.
- Framework pages with control status rollups.
- Control detail page showing evidence, monitoring rules, findings, and framework mappings.
- Assessment lifecycle example from creation to sign-off.
- CCM overview, evidence stream, rules, integrations, findings, and posture trend.
- Manual-looking interactions such as filtering, viewing details, creating a finding, assigning an owner, and marking remediation complete.
- Product documentation and diagrams embedded in supporting materials or docs.

### Excluded From MVP Demo

- Real authentication or tenant isolation.
- Real backend persistence.
- Real third-party API integrations.
- Full questionnaire builder.
- Full framework import from UCF, SCF, or other external sources.
- Granular role-based access control.
- Real notification delivery.
- Legal-grade audit export package.

## 7. Representative Demo Data

### Organization

Tenant: Acme Financial Services

Business scopes:

- Corporate IT
- Payments Platform
- Customer Data Warehouse
- Vendor Operations

### Sample Frameworks

- SOC 2 Type II
- ISO 27001:2022
- NIST CSF 2.0

### Sample Controls

- AC-01: Multi-factor authentication enforced for all workforce users
- AC-02: Quarterly privileged access review
- CC-01: Cloud storage encryption enabled
- HR-01: Background checks completed before start date
- IR-01: Incident response plan reviewed annually
- VM-01: Critical vulnerabilities remediated within SLA
- SDLC-01: Pull requests require review before merge

### Sample CCM Scenario

The demo centers on a failed MFA control:

- Okta emits a signal showing 3 users without enforced MFA.
- The platform creates automated evidence from the Okta sync.
- The evidence maps to control `AC-01`.
- `AC-01` is mapped to SOC 2 CC6.1 and ISO 27001 A.5.16.
- The control status changes to failing.
- The related SOC 2 readiness assessment drops from 92 percent to 88 percent.
- A high-severity finding is created.
- The finding is assigned to the IT Operations owner.
- A Jira remediation task is shown as linked.
- Once remediated, the control returns to passing and the framework posture improves.

## 8. Product Requirements

### Dashboard Requirements

- Show overall compliance score and trend.
- Show framework posture cards with percentage complete, failing controls, and evidence freshness.
- Show open findings by severity.
- Show monitored controls by status.
- Show upcoming assessment and remediation dates.
- Provide obvious entry points into CCM and framework details.

### Framework Requirements

- Show framework domains and mapped controls.
- Show control status by passing, failing, manual review, and not monitored.
- Show evidence coverage and assessment coverage.
- Link framework controls back to normalized controls.

### Assessment Requirements

- Show one example assessment lifecycle.
- Include scope, framework, owner, status, due date, questionnaire progress, control review, evidence collection, reviewer approval, and sign-off.
- Allow the demo user to view related findings and reports.

### CCM Requirements

- Show integrations and sync health.
- Show monitoring rules mapped to controls.
- Show recent signals from connected systems.
- Convert signals into evidence records.
- Show evidence freshness and source metadata.
- Show failed checks and alerts.
- Create findings from failed controls.
- Roll up status to controls, assessments, frameworks, and dashboard posture.

### Evidence Requirements

- List manual and automated evidence.
- Show evidence source, timestamp, freshness, owner, linked controls, and reviewer status.
- Show traceability from evidence to control to framework.

### Findings Requirements

- List findings by severity, owner, source, due date, and status.
- Link findings to controls, evidence, assessments, and frameworks.
- Support remediation states: Open, In Progress, Ready for Review, Closed, Accepted Risk.

### Reporting Requirements

- Show report types for executive posture, SOC 2 readiness, evidence package, findings summary, and assessment report.
- Show generated-from metadata such as framework, scope, date range, and evidence freshness.

## 9. UX Principles

- Make the first screen operational, not marketing-oriented.
- Use dense but readable B2B SaaS layouts.
- Prioritize tables, side panels, status chips, tabs, filters, and timeline views.
- Avoid decorative dashboards that do not explain workflow.
- Make cross-module links obvious.
- Ensure every CCM object shows source, owner, timestamp, and downstream impact.
- Keep copy crisp, enterprise-ready, and demo-friendly.

## 10. Key Decisions And Trade-offs

### Static Data Over Backend

Decision: Use static mock data with light client-side state.

Rationale: The assignment evaluates product thinking and prototype coherence, not production backend implementation.

Trade-off: State changes reset on reload unless local storage is added.

### Deep CCM Over Broad Feature Completeness

Decision: Build broad navigation coverage, but put more detail into CCM.

Rationale: The prompt explicitly asks for deeper emphasis on Continuous Compliance Monitoring.

Trade-off: TPRM, risks, and reports are credible shells rather than fully implemented workflows.

### Normalized Controls

Decision: Treat controls as reusable objects mapped to many frameworks.

Rationale: Enterprise customers often adopt multiple frameworks simultaneously and need control reuse.

Trade-off: The demo must explain cross-mapping clearly to avoid feeling abstract.

### Evidence Graph Mental Model

Decision: Make traceability the core product story.

Rationale: The strongest differentiator is showing how signals create evidence that affects compliance posture.

Trade-off: Requires careful UI labels and consistent object relationships.

## 11. Extensibility

The product should be designed so future versions can add:

- Real integration connectors
- Framework import and normalization
- Questionnaire builder with conditional logic
- Policy management
- Advanced role-based access control
- Vendor reassessment workflows
- Risk scoring models
- Continuous audit export packages
- AI-assisted evidence review and control mapping

## 12. Open Questions For Later Product Iterations

- Should customers configure monitoring rules themselves, or should rules be mostly managed by the platform?
- How much evidence review can be automated before requiring human attestation?
- What is the right abstraction between business scope, asset, application, process, and vendor?
- Should accepted risk keep a control failing or move it into an exception state?
- How should control scoring differ between readiness, audit, and continuous posture?

## 13. Delivery Checklist

- Product shell covers navigation and major modules.
- Dashboard explains the product immediately.
- Assessment lifecycle is visible.
- CCM deep dive is the strongest workflow.
- Signal-to-status chain is explicit.
- Documentation covers vision, assumptions, domain model, MVP, extensibility, and trade-offs.
- Demo can be presented in 8 to 12 minutes.
