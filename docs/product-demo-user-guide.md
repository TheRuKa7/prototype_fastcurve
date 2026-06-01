# Product Demo User Guide

Owner: Rushil Kaul
Purpose: Case-study walkthrough and deliverable mapping. This guide is intentionally separate from the Aegis product UI so the prototype itself feels like a customer-facing B2B SaaS workspace.

## Suggested Walkthrough

1. Start on `Overview`.
   - Position Aegis as a SOC 2 readiness command center for a mid-market SaaS company.
   - Show readiness, automated evidence, open findings, and buyer review deflection.
2. Open `My Work`.
   - Show Finding FIND-001 from the failed AWS S3 encryption test.
   - Show owner context, MCP tools, Terraform output, and CLI remediation.
   - Move the finding from open to ready for review to closed.
3. Open `Compliance`.
   - Show SOC 2 readiness, the Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status chain, and the assessment lifecycle.
   - Show the auditor snapshot and evidence states.
4. Open `Trust Center`.
   - Show live posture, gated SOC 2 report access, NDA approval, and cited buyer AI answers.
5. Open `Platform`.
   - Show integrations, Custom Resources API, OAuth token rotation, MCP server, append-only audit log, and intentionally deferred TPRM/privacy scope.

## Deliverable Mapping

| Email requirement | Where to show it |
|---|---|
| Navigation and information architecture | Five hubs in the side navigation. |
| Side menu and major module pages | Overview, Compliance, My Work, Trust Center, Platform. |
| Example assessment lifecycle | Compliance -> Assessment lifecycle. |
| Dashboard experience | Overview command center. |
| Cross-module relationships | Overview launch plan and Compliance chain. |
| Control monitoring | Compliance controls table and My Work finding. |
| Evidence collection | Compliance documents/evidence table and automated evidence metric. |
| Integrations | Platform integration coverage. |
| Compliance posture | Overview readiness and Compliance SOC 2 status. |
| Alerting | My Work finding created from AWS CCM alert. |
| Findings | My Work -> Finding FIND-001. |
| Reporting | Auditor Snapshot and Trust Center. |
| Product vision | PRD and supporting document. |
| Assumptions | PRD. |
| Domain model | PRD, RFC, and supporting document. |
| MVP boundaries | PRD and supporting document. |
| Extensibility | Platform Custom Resources API, MCP, and token rotation. |
| Trade-offs | PRD, completeness matrix, and supporting document. |
| Optional architecture diagrams | Supporting document. |

## Competitive Notes

Vanta sets the buyer expectation for automated compliance, continuous monitoring, Trust Centers, security questionnaire automation, integrations, and AI-assisted workflows. Aegis should feel credible against that bar while making two choices sharper:

- Keep the first screen focused on the operating workflow rather than broad GRC modules.
- Make developer-native remediation and API reliability more prominent than a generic compliance checklist.

Useful public reference points:

- Vanta features: https://www.vanta.com/features
- Vanta automated compliance: https://www.vanta.com/products/automated-compliance
- Vanta Trust Center: https://www.vanta.com/products/trust-center
- Vanta Questionnaire Automation: https://www.vanta.com/products/questionnaire-automation
- Vanta AI and MCP positioning: https://www.vanta.com/products/ai

## Submission Checklist

- Prototype link from Netlify.
- Supporting document: `docs/submission-supporting-document.md`.
- Product demo guide: this file.
- Repository link: `https://github.com/TheRuKa7/prototype_fastcurve`.
