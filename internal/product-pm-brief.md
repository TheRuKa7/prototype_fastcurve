# Aegis Internal PM Product Brief

Purpose: a single internal study guide for understanding the product, users, use cases, product sense, competitive field, pricing, and likely interview discussion areas. This file is not linked from the prototype's public Docs section.

Last updated: June 1, 2026

## 1. Product In One Sentence

Aegis helps B2B SaaS companies become and stay audit-ready by continuously pulling evidence from their systems, mapping it to controls and frameworks, routing remediation to owners, and turning approved compliance posture into buyer-facing trust proof.

## 2. The Problem

Teams pursuing SOC 2 often run compliance as a last-minute project. Evidence is collected manually, control failures are found late, engineers lose time answering compliance questions, and sales teams wait on security reviews before enterprise deals can close.

The product turns that scramble into an operating workflow:

```text
Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status
```

## 3. Target Users

| User | Job | Pain | What Aegis gives them |
|---|---|---|---|
| GRC owner / security lead | Own audit readiness and buyer reviews | Too much manual evidence and status chasing | Dashboard, evidence automation, control posture, auditor snapshot |
| Engineer / resource owner | Fix failing infrastructure or code controls | Does not want to live in a compliance tool | My Work, Jira/Linear tasks, MCP remediation, CLI/Terraform guidance |
| Auditor | Review stable evidence and control mappings | Hates screenshots and shifting evidence | Frozen snapshot, mapped evidence, review states |
| Buyer security reviewer | Validate vendor security posture | Slow document requests and questionnaires | Trust Center, gated reports, cited AI answers |
| Founder / revenue leader | Close enterprise deals | SOC 2 and security reviews block pipeline | Trust Center deflection and faster buyer confidence |

## 4. Main Use Cases

- Prepare for first SOC 2 Type II.
- Continuously monitor controls from AWS, GitHub, Okta, HRIS, MDM, and Jira.
- Auto-collect evidence instead of manual screenshots.
- Route failing controls to accountable owners.
- Let engineers fix issues from their IDE or ticketing flow.
- Give auditors a frozen evidence snapshot.
- Publish Trust Center proof to reduce security questionnaire back-and-forth.
- Add unsupported systems through Custom Resources API.

## 5. Product Surface

| Area | Purpose |
|---|---|
| Overview | SOC 2 command center: readiness, evidence automation, findings, buyer-review impact |
| Compliance | Framework posture, assessment lifecycle, controls, evidence, documents, auditor snapshot |
| My Work | Findings, remediation workflow, owner context, MCP fix output |
| Trust Center | Public posture, gated SOC 2 report, NDA approval, buyer AI with citations |
| Platform | Integrations, Custom Resources API, OAuth token rotation, MCP server, audit log |
| Docs | Interviewer-facing product docs and architecture |

## 6. USP And Differentiation

The market already expects automated compliance and evidence collection. Aegis should compete by being sharper in three ways:

1. Developer-native remediation as a first-class feature.
   - Competitors show failing controls.
   - Aegis makes the engineer's fix path the hero: affected resource, code-level context, Terraform/CLI, MCP tools.

2. Trust Center as a revenue workflow.
   - The Trust Center is not a vanity page.
   - It reduces questionnaire turnaround and helps enterprise deals move faster.

3. Better extensibility and API reliability.
   - Custom Resources API for unsupported systems.
   - Concurrent token rotation with overlap windows to avoid distributed-service failures.

## 7. Feature Prioritization

P0:

- SOC 2 readiness workspace.
- Integrations for core SOC 2 systems.
- Continuous test engine.
- Evidence automation.
- Control and framework mapping.
- My Work remediation.
- Auditor snapshot.
- Basic Trust Center.
- Custom Resources API.
- Public API with safe token rotation.

P1:

- Full MCP server.
- Trust Center AI with citations.
- ISO 27001 and HIPAA expansion.
- Multi-step approvals.
- SIEM streaming.

P2:

- Agentic TPRM.
- Privacy suite.
- Enterprise business-unit scoping.
- Integration marketplace.
- Auditor partner API.

## 8. Product Sense Notes

Why SOC 2 first:

- Clear buyer pain.
- Clear sales trigger.
- Well-known evidence patterns.
- Strong wedge for B2B SaaS.
- Natural expansion into ISO 27001, HIPAA, vendor risk, privacy, and enterprise GRC.

Why not full TPRM first:

- Different buyer motion.
- Heavy document parsing and vendor follow-up workflows.
- Would distract from the first audit-readiness wedge.

Why Trust Center matters:

- Compliance moves from cost center to revenue enabler.
- Buyers can self-serve posture proof.
- Security teams spend less time answering repeated questions.

Why MCP matters:

- Engineers do not want another admin portal.
- Fixes happen faster when surfaced in IDE/ticketing workflows.
- Creates a memorable product story in a crowded category.

## 9. Innovation Ideas

- IDE-native remediation assistant.
- Evidence chain explorer from Signal to Compliance Status.
- Trust Center AI that only answers from approved evidence with citations.
- Custom Resources API with deletion-by-diff for legacy systems.
- Safe token rotation with overlap windows.
- Auditor snapshots that freeze evidence without stopping continuous monitoring.
- Cross-framework evidence reuse so one control supports SOC 2, ISO 27001, HIPAA, and custom frameworks.

## 10. Pricing Thinking

Most compliance automation vendors do not publish list pricing. Public pages generally push buyers to request a demo or quote. A reasonable Aegis pricing model for the target wedge:

| Tier | Target | Indicative annual range | Notes |
|---|---|---:|---|
| Launch | 20-75 employees, one framework | $8K-$15K | SOC 2, core integrations, basic Trust Center |
| Growth | 75-250 employees, one to two frameworks | $18K-$40K | Adds advanced remediation, buyer Q&A, more integrations |
| Scale | 250-500 employees, multi-framework | $45K-$85K | Adds custom resources, advanced audit workflows, API usage |
| Enterprise | 500+ employees | Custom | SSO/SCIM, BU scoping, SIEM, private support, partner workflows |

Pricing levers:

- Employee count.
- Number of frameworks.
- Integrations.
- Trust Center and questionnaire volume.
- API volume.
- MCP/developer seats.
- Auditor or partner access.

Useful pricing context:

- Vanta pricing page asks buyers to request personalized pricing and includes Essentials, Plus, and Professional plans with automated evidence, continuous controls monitoring, Trust Center, AI agent, and questionnaire automation: https://www.vanta.com/pricing
- Drata's public plans show Foundation, Advanced, and Enterprise, including pre-mapped frameworks, Trust Center, AI questionnaire assistance, risk management, custom controls, TPRM, Compliance as Code, and Open API access: https://drata.com/plans
- Secureframe packages include infrastructure monitoring, evidence collection, policy management, Trust Center, continuous control monitoring, custom frameworks/controls/tests, questionnaires, risk, and TPRM: https://secureframe.com/pricing
- A third-party SOC 2 pricing comparison estimates broad market ranges, with a clear caveat that vendors generally do not publish price lists and ranges are synthesized from buyer/procurement data: https://soc2auditors.org/insights/soc-2-software-pricing-comparison/

## 11. Competitor Field

| Competitor | Strength | Weakness / opening |
|---|---|---|
| Vanta | Brand leader, broad trust platform, integrations, Trust Center, AI | Can feel broad and expensive; opportunity to win on dev-first remediation and API reliability |
| Drata | Strong compliance automation, broad plans, risk and TPRM depth | Can feel heavier for first-time SOC 2; opportunity to simplify wedge |
| Secureframe | Broad compliance package, evidence, Trust Center, TPRM | Competitive breadth; opportunity to lead with cleaner workflow and developer experience |
| Sprinto | Strong automation positioning and global SaaS reach | Opportunity to differentiate on IDE-native remediation and enterprise-grade trust graph |
| Thoropass | Platform plus audit bundle | Aegis can remain auditor-neutral and focus on product-led trust workflow |
| Hyperproof / OneTrust | Broader enterprise GRC | Too heavy for first SOC 2 wedge; Aegis should be faster and simpler |

## 12. Interview Talk Track

Start with:

"I narrowed the product to a SOC 2-first Continuous Trust Management wedge because it creates a clear buyer, clear workflow, and clear business outcome: audit readiness plus faster enterprise sales."

Then explain:

- The core chain: Signal -> Evidence -> Control -> Assessment -> Framework -> Compliance Status.
- The end-user journey: Overview -> My Work -> Compliance -> Trust Center -> Platform.
- The trade-off: keep TPRM/privacy as sequenced expansion rather than diluting the MVP.
- The differentiation: MCP remediation, Trust Center revenue loop, custom resources, token rotation.
- The market context: Vanta/Drata/Secureframe validate the category, but Aegis is cleaner and more developer-native.

## 13. Questions To Be Ready For

Why would a buyer pick this over Vanta?

- Cleaner first-SOC-2 journey.
- Engineer-native remediation.
- Stronger API reliability story.
- Trust Center is tied to sales velocity, not just compliance display.

Why not build TPRM?

- It is a valid expansion but a separate workflow with different data and buying motion.
- First win the audit-readiness wedge.

What is the hardest technical risk?

- Integration quality and evidence trustworthiness.
- Mitigation: start with fewer but deeper integrations, immutable snapshots, audit log, and clear lineage.

What is the biggest product risk?

- Becoming a broad, generic GRC tool too early.
- Mitigation: keep the first journey opinionated and SOC 2-first.

How would you measure success?

- Time to audit-ready.
- Automated evidence rate.
- Failing-control resolution time.
- Auditor snapshot acceptance rate.
- Questionnaire deflection.
- Trust Center document request turnaround.
- Expansion to second framework.

## 14. How To Think About The Space

This is not just compliance software. It sits at the intersection of:

- Security operations.
- Governance, risk, and compliance.
- Audit workflow.
- Developer productivity.
- Sales enablement and buyer trust.
- API/integration platforms.
- AI-assisted evidence and questionnaire workflows.

The winning product is not the one with the most modules. It is the one that makes trust operational, traceable, and easy for every stakeholder to act on.
