# User Flow: ComplianceTech CCM Demo

## 1. Demo Narrative

The user is a Compliance Manager at Acme Financial Services preparing for SOC 2 readiness while maintaining ISO 27001 and NIST CSF alignment. The product has already connected Okta, AWS, GitHub, Jira, and HRIS. During the walkthrough, the user discovers that an automated Okta signal has caused an MFA control to fail, investigates the evidence, creates a finding, assigns remediation, and verifies the resulting compliance posture.

Core story:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

## 2. Primary Persona And Goal

Persona: Compliance Manager

Goal: Understand current compliance posture, investigate a failed automated control, assign remediation, and confirm audit readiness impact.

Success outcome:

- The user understands the failed control.
- The user can trace the issue back to source evidence.
- The user can see affected frameworks and assessments.
- The user can create or view a finding.
- The user can track remediation and report status.

## 3. Information Architecture

The prototype uses a persistent left sidebar with these modules:

1. Dashboard
2. Frameworks
3. Controls Library
4. Assessments
5. Continuous Monitoring
6. Evidence
7. Findings
8. Risks
9. Vendors
10. Reports
11. Integrations
12. Admin / Scopes

The most important route cluster is Continuous Monitoring, supported by Frameworks, Controls, Evidence, Findings, and Reports.

## 4. Golden Path Walkthrough

### Step 1: Dashboard Landing

Route: `/dashboard`

User sees:

- Overall compliance score: 88 percent
- SOC 2 posture: 88 percent, down 4 percent
- ISO 27001 posture: 91 percent
- NIST CSF posture: 84 percent
- 143 monitored controls
- 9 failing checks
- 6 high-severity findings
- Evidence freshness: 82 percent current
- CTA or card link: "Review failing automated controls"

User action:

- Clicks the SOC 2 card or the failing automated controls card.

Product purpose:

- Establish the operational posture and make the CCM issue visible immediately.

### Step 2: Framework Posture

Route: `/frameworks/soc-2`

User sees:

- SOC 2 readiness summary
- Domains and mapped controls
- Control status distribution
- Top failed controls
- Assessment link: "SOC 2 Readiness Q2"
- Failed control: `AC-01 Multi-factor authentication enforced`

User action:

- Opens `AC-01`.

Product purpose:

- Show that framework posture is not manually calculated. It rolls up from normalized controls and evidence.

### Step 3: Control Detail

Route: `/controls/ac-01`

User sees:

- Control title, description, owner, scope, and status: Failing
- Mapped frameworks:
  - SOC 2 CC6.1
  - ISO 27001 A.5.16
  - NIST PR.AA
- Monitoring rule: "All workforce users must have MFA enforced"
- Latest evidence: Okta MFA policy sync
- Related finding: "3 workforce users missing enforced MFA"
- Assessment impact: SOC 2 Readiness Q2 dropped from 92 percent to 88 percent

User action:

- Clicks "View evidence stream" or opens the latest evidence.

Product purpose:

- Make the control the junction between evidence, frameworks, assessments, and findings.

### Step 4: Continuous Monitoring Overview

Route: `/monitoring`

User sees:

- Monitoring health summary
- Integration sync status
- Failing rules
- Recent signals
- Evidence generated today
- Controls impacted
- Alert queue

Highlighted failed rule:

- Rule: `MFA_ENFORCED_WORKFORCE`
- Source: Okta
- Control: `AC-01`
- Result: Failed
- Reason: 3 users without enforced MFA
- Last checked: Today, 09:15

User action:

- Opens the failed monitoring rule.

Product purpose:

- Show CCM as an active monitoring system rather than a static evidence repository.

### Step 5: Monitoring Rule Detail

Route: `/monitoring/rules/mfa-enforced-workforce`

User sees:

- Rule definition
- Data source: Okta users and MFA policy assignments
- Evaluation logic: Every active workforce user must have at least one enforced MFA factor
- Check frequency: Daily
- Linked control: `AC-01`
- Linked frameworks: SOC 2, ISO 27001, NIST CSF
- Latest result: Failed
- Impacted entities:
  - Jordan Lee
  - Priya Shah
  - Morgan Chen

User action:

- Opens the latest signal.

Product purpose:

- Explain how an automated check is mapped to a compliance obligation.

### Step 6: Signal Detail

Route: `/monitoring/signals/sig-okta-2026-05-30-0915`

User sees:

- Source: Okta
- Signal type: MFA policy evaluation
- Raw result summary
- Received timestamp
- Integration sync ID
- Affected users
- Rule evaluation result: Failed
- Generated evidence link

User action:

- Clicks generated evidence.

Product purpose:

- Show source traceability without requiring raw API implementation.

### Step 7: Evidence Detail

Route: `/evidence/ev-okta-mfa-2026-05-30`

User sees:

- Evidence title: Okta MFA enforcement snapshot
- Source: Okta
- Collection method: Automated
- Timestamp
- Freshness: Current
- Reviewer status: Needs review
- Linked signal
- Linked control: `AC-01`
- Linked frameworks and assessment
- Evidence preview table with users missing MFA

User action:

- Clicks "Create finding" if no finding exists, or "Open finding" if seeded.

Product purpose:

- Show that evidence is not just a file. It is a structured object with lineage and downstream impact.

### Step 8: Finding Creation Or Detail

Route: `/findings/find-mfa-001`

If creating a finding, user sees a prefilled form:

- Title: 3 workforce users missing enforced MFA
- Severity: High
- Source: Automated monitoring
- Linked control: `AC-01`
- Linked evidence: Okta MFA enforcement snapshot
- Owner: IT Operations
- Due date: 7 days from detection
- Suggested remediation: Enforce MFA policy for impacted users and re-run Okta sync

If viewing an existing finding, user sees:

- Status: Open
- Severity: High
- Owner: IT Operations
- Linked Jira task: SEC-1842
- Due date
- Remediation checklist
- Activity timeline
- Reviewer notes

User action:

- Assigns or confirms owner.
- Clicks "Send to remediation" or views linked remediation task.

Product purpose:

- Show how continuous monitoring creates actionable work, not just alerts.

### Step 9: Remediation Tracking

Route: `/findings/find-mfa-001/remediation`

User sees:

- Remediation owner
- Jira task
- SLA status
- Required steps
- Evidence required for closure
- Recheck action

Demo interaction:

- User clicks "Mark remediation ready for review."
- Status changes to Ready for Review.
- Control state remains Needs Review until evidence is verified.

Optional second interaction:

- User clicks "Run check."
- Latest Okta signal passes.
- Evidence is updated.
- Finding status becomes Closed.
- Control returns to Passing.

Product purpose:

- Show that posture changes through evidence and review, not arbitrary status toggles.

### Step 10: Assessment Impact

Route: `/assessments/soc2-readiness-q2`

User sees:

- Assessment status: In Review
- Scope: Corporate IT and Payments Platform
- Framework: SOC 2
- Questionnaire completion
- Control evaluation status
- Evidence completeness
- Findings blocking sign-off
- Timeline from creation to sign-off

User action:

- Opens assessment findings or report preview.

Product purpose:

- Connect automated CCM results into the assessment lifecycle described in the case study.

### Step 11: Reporting

Route: `/reports/soc2-readiness-summary`

User sees:

- Executive summary
- Framework posture
- Control status by domain
- Evidence readiness
- Open findings
- Recently remediated items
- Audit trail export placeholder

User action:

- Views "Generated from 118 evidence records, 52 controls, 1 active assessment."

Product purpose:

- Show audit-ready reporting as a live output of the product graph.

## 5. Supporting Secondary Flows

### Integration Health Flow

Route: `/integrations`

Use case:

- Compliance Manager checks whether Okta, AWS, GitHub, Jira, and HRIS are connected and syncing.

Key UI elements:

- Integration cards
- Sync status
- Last successful sync
- Controls covered
- Evidence generated
- Errors or permissions issues

Important demo note:

- Okta should be shown as connected but with one failing compliance signal.

### Evidence Inventory Flow

Route: `/evidence`

Use case:

- Auditor filters evidence by framework, control, source, freshness, or reviewer status.

Key UI elements:

- Evidence table
- Source badges
- Freshness chips
- Linked controls
- Reviewer status
- Detail drawer

### Risk Flow

Route: `/risks`

Use case:

- A high-severity finding can be escalated into a risk or accepted as risk.

Key UI elements:

- Risk register
- Inherent risk
- Residual risk
- Treatment plan
- Linked findings and controls

### Vendor Flow

Route: `/vendors`

Use case:

- Demonstrates extensibility into third-party risk management.

Key UI elements:

- Vendor list
- Risk tier
- Assessment status
- Evidence requests
- Reassessment due date

## 6. Screen-Level Requirements

### Dashboard

Required components:

- Posture scorecard
- Framework cards
- Monitoring summary
- Findings summary
- Evidence freshness
- Assessment timeline

Primary action:

- Review failing automated controls.

### Continuous Monitoring

Required components:

- Rule status table
- Signal stream
- Integration health strip
- Evidence generated metric
- Failing checks panel
- Control impact panel

Primary action:

- Open failed MFA monitoring rule.

### Control Detail

Required components:

- Control metadata
- Framework mappings
- Monitoring rules
- Evidence records
- Findings
- Assessment impact
- Activity timeline

Primary action:

- View latest evidence or related finding.

### Finding Detail

Required components:

- Severity and status
- Owner and due date
- Linked evidence
- Linked control
- Remediation task
- Review timeline

Primary action:

- Move remediation forward.

## 7. State Changes For Demo

The prototype can use client-side state for these interactions:

- Filter tables by framework, status, source, or severity.
- Open detail drawers or detail pages.
- Create finding from evidence.
- Assign owner to finding.
- Move finding from Open to In Progress.
- Mark remediation Ready for Review.
- Run simulated recheck.
- Change control status from Failing to Passing after successful recheck.
- Update dashboard posture metrics after remediation.

Minimum viable state changes:

- Finding status update
- Recheck result update
- Control status update
- Dashboard posture update

## 8. Acceptance Criteria

The user flow is complete when:

- A viewer can navigate from dashboard to SOC 2 posture to failed control to monitoring rule to signal to evidence to finding to remediation to report.
- Each page shows enough context to explain why the user is there and what object is connected next.
- The CCM chain is visible in copy, labels, breadcrumbs, or detail relationships.
- The assessment lifecycle is represented, even if less interactive than CCM.
- Reports feel generated from product data rather than standalone static pages.

## 9. Demo Script

Suggested 8 to 12 minute walkthrough:

1. Start on dashboard and explain the platform as a continuous compliance operating layer.
2. Open SOC 2 posture and show framework rollup.
3. Open failed MFA control and explain normalized controls.
4. Move into CCM and show automated monitoring rules.
5. Open the Okta signal and generated evidence.
6. Show the related finding and remediation owner.
7. Simulate remediation and recheck.
8. Return to dashboard or SOC 2 report to show improved posture.
9. Briefly show risks, vendors, and integrations as extensibility areas.
10. Close with MVP boundaries and future scale path.
