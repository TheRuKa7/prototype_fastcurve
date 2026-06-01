const { useEffect, useMemo, useState } = React;
const E = React.createElement;

const defaultDemo = {
  resolved: false,
  workStatus: "open",
  trustAccess: "pending",
  buyerQuestion: "draft",
  snapshot: "needs_refresh"
};

const people = {
  maya: { id: "maya", name: "Maya Patel", role: "GRC owner", team: "Security" },
  ethan: { id: "ethan", name: "Ethan Brooks", role: "Infrastructure owner", team: "Engineering" },
  liam: { id: "liam", name: "Liam Nguyen", role: "External auditor", team: "Audit partner" },
  nora: { id: "nora", name: "Nora Singh", role: "Buyer security reviewer", team: "Prospect" }
};

const integrations = [
  { id: "aws", name: "AWS", type: "Cloud", status: "connected", resources: 48, coverage: "S3, IAM, EC2, CloudTrail" },
  { id: "github", name: "GitHub", type: "Code", status: "connected", resources: 18, coverage: "Repos, branch protection, code owners" },
  { id: "okta", name: "Okta", type: "Identity", status: "connected", resources: 126, coverage: "Users, groups, MFA, offboarding" },
  { id: "gusto", name: "Gusto", type: "HRIS", status: "connected", resources: 96, coverage: "Employees, onboarding, background checks" },
  { id: "jamf", name: "Jamf", type: "MDM", status: "needs_attention", resources: 89, coverage: "Disk encryption, screen lock, OS patching" },
  { id: "jira", name: "Jira", type: "Ticketing", status: "connected", resources: 41, coverage: "Remediation, approvals, task sync" }
];

const resources = [
  { id: "res-s3-prod-logs", name: "prod-audit-logs", type: "S3 bucket", owner: "ethan", integration: "aws", scope: "SOC 2 production" },
  { id: "res-github-api", name: "payments-api", type: "GitHub repo", owner: "ethan", integration: "github", scope: "Change management" },
  { id: "res-okta-workforce", name: "Workforce identity group", type: "Okta group", owner: "maya", integration: "okta", scope: "Access control" }
];

const tests = [
  {
    id: "test-s3-encryption",
    name: "S3 buckets storing audit evidence must enforce encryption",
    shortName: "S3 encryption",
    statusWhenOpen: "failing",
    statusWhenResolved: "passing",
    severity: "high",
    owner: "ethan",
    resourceId: "res-s3-prod-logs",
    control: "CC6.1 Data at rest is protected",
    framework: "SOC 2",
    evidence: "AWS config snapshot",
    fix: "Enable AES256 or KMS encryption on prod-audit-logs and re-run the AWS sync."
  },
  {
    id: "test-github-review",
    name: "Production repositories require pull request review",
    shortName: "PR review",
    statusWhenOpen: "passing",
    statusWhenResolved: "passing",
    severity: "medium",
    owner: "ethan",
    resourceId: "res-github-api",
    control: "CC8.1 Changes are authorized",
    framework: "SOC 2",
    evidence: "GitHub branch protection export",
    fix: "No action required."
  },
  {
    id: "test-okta-mfa",
    name: "All workforce identities must have enforced MFA",
    shortName: "MFA enforcement",
    statusWhenOpen: "passing",
    statusWhenResolved: "passing",
    severity: "high",
    owner: "maya",
    resourceId: "res-okta-workforce",
    control: "CC6.2 Access is authenticated",
    framework: "SOC 2",
    evidence: "Okta MFA policy sync",
    fix: "No action required."
  }
];

const documents = [
  { id: "doc-soc2-report", name: "SOC 2 Type II report", statusWhenOpen: "ready", statusWhenResolved: "approved", owner: "maya", access: "gated", renewal: "2026-09-30" },
  { id: "doc-ir-policy", name: "Incident response policy", statusWhenOpen: "approved", statusWhenResolved: "approved", owner: "maya", access: "public", renewal: "2026-12-15" },
  { id: "doc-vendor-list", name: "Vendor inventory export", statusWhenOpen: "ready", statusWhenResolved: "ready", owner: "maya", access: "internal", renewal: "2026-07-01" },
  { id: "doc-s3-evidence", name: "AWS S3 encryption evidence", statusWhenOpen: "not_ready", statusWhenResolved: "approved", owner: "ethan", access: "auditor", renewal: "Continuous" }
];

const trustRequests = [
  { id: "req-zenpay", company: "ZenPay", requester: "Nora Singh", document: "SOC 2 Type II report", statusWhenOpen: "pending", statusWhenResolved: "approved", nda: "Required", revenue: "$180K ARR" },
  { id: "req-metrobank", company: "MetroBank Labs", requester: "Arun Mehta", document: "Security package", statusWhenOpen: "approved", statusWhenResolved: "approved", nda: "Signed", revenue: "$92K ARR" }
];

const buyerQuestions = [
  {
    id: "q-1",
    question: "Is production customer data encrypted at rest?",
    answer: "Yes. Aegis cites AWS config evidence for customer data stores and the approved Data Protection control. The current failing S3 test affects audit-log storage, not customer production data, and is already assigned for remediation.",
    citations: ["AWS storage snapshot", "CC6.1 control mapping", "Data Protection policy"]
  },
  {
    id: "q-2",
    question: "Can we download your latest SOC 2 report?",
    answer: "Access is gated. The requester signs the NDA, Aegis routes approval to the GRC owner, and the Trust Center grants expiring access after approval.",
    citations: ["Trust Center access request", "NDA workflow", "SOC 2 report metadata"]
  }
];

const findings = [
  {
    id: "find-s3-001",
    label: "Finding FIND-001",
    title: "S3 encryption disabled on prod-audit-logs",
    severity: "high",
    owner: "ethan",
    resourceId: "res-s3-prod-logs",
    testId: "test-s3-encryption",
    statusWhenOpen: "open",
    statusWhenResolved: "closed",
    detail: "AWS CCM alert created an owned remediation finding that blocks SOC 2 auditor handoff until the test passes."
  }
];

const auditSnapshot = {
  id: "audit-soc2-q2",
  name: "SOC 2 auditor handoff snapshot",
  period: "2026 Q2 readiness",
  statusWhenOpen: "not_ready",
  statusWhenResolved: "ready",
  evidenceStatus: ["Not Ready", "Ready for audit", "Approved", "Flagged", "N/A"],
  frozenAtWhenOpen: "Pending refresh",
  frozenAtWhenResolved: "2026-06-01 10:45 IST"
};

const apiApplications = [
  { id: "app-prod", name: "Production automation", type: "Manage API", tokens: ["tok-current", "tok-next"], scopes: "frameworks:read evidence:write tests:read" },
  { id: "app-legacy", name: "Legacy HR bridge", type: "Custom Resources", tokens: ["tok-legacy"], scopes: "resources:write resources:read" }
];

const accessTokens = [
  { id: "tok-current", label: "current token", status: "active", expires: "42 min", overlap: "Yes" },
  { id: "tok-next", label: "rotated token", status: "active", expires: "59 min", overlap: "Yes" },
  { id: "tok-legacy", label: "legacy bridge token", status: "active", expires: "51 min", overlap: "Yes" }
];

const mcpTools = [
  { id: "list_tests", name: "list_tests", purpose: "Return failing tests prioritized by severity and ownership." },
  { id: "list_test_entities", name: "list_test_entities", purpose: "Show affected resources for a selected test." },
  { id: "get_remediation", name: "get_remediation", purpose: "Generate Terraform, CLI, and console fix guidance." }
];

const auditEvents = [
  { id: "evt-test", actor: "AWS connector", action: "TestRun recorded", detail: "S3 encryption failed for prod-audit-logs" },
  { id: "evt-ticket", actor: "Aegis workflow", action: "Remediation opened", detail: "Jira ticket and MCP guidance assigned to Ethan Brooks" },
  { id: "evt-trust", actor: "Maya Patel", action: "Trust access approved", detail: "ZenPay granted expiring SOC 2 report access after NDA" }
];

const navItems = [
  { label: "Overview", path: "/overview", token: "O" },
  { label: "Compliance", path: "/compliance", token: "C" },
  { label: "My Work", path: "/work", token: "W" },
  { label: "Trust Center", path: "/trust-center", token: "T" },
  { label: "Platform", path: "/platform", token: "P" }
];

const routeAliases = {
  "/": "/overview",
  "/dashboard": "/overview",
  "/frameworks": "/compliance",
  "/frameworks/soc-2": "/compliance/soc2",
  "/controls": "/compliance",
  "/controls/ac-01": "/compliance/soc2",
  "/assessments": "/compliance",
  "/assessments/assess-soc2-q2": "/compliance/soc2",
  "/monitoring": "/work",
  "/monitoring/rules/rule-mfa": "/work",
  "/monitoring/signals/sig-okta-2026-05-30-0915": "/work",
  "/evidence": "/compliance",
  "/evidence/ev-okta-mfa": "/compliance/soc2",
  "/findings": "/work",
  "/findings/find-mfa-001": "/work",
  "/risks": "/platform",
  "/vendors": "/platform",
  "/reports": "/trust-center",
  "/reports/soc2-readiness-summary": "/trust-center",
  "/integrations": "/platform",
  "/admin/scopes": "/platform"
};

const statusLabels = {
  passing: "Passing",
  failing: "Failing",
  ready: "Ready",
  approved: "Approved",
  not_ready: "Not ready",
  pending: "Pending",
  connected: "Connected",
  needs_attention: "Needs attention",
  open: "Open",
  in_progress: "In progress",
  ready_for_review: "Ready for review",
  closed: "Closed",
  active: "Active"
};

function useRoute() {
  const current = normalizePath(window.location.pathname);
  const [path, setPath] = useState(current);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/overview");
    }
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(to) {
    const normalized = normalizePath(to);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { path, navigate };
}

function normalizePath(path) {
  return routeAliases[path] || path;
}

function App() {
  const route = useRoute();
  const [demo, setDemo] = useState(() => {
    try {
      const stored = window.localStorage.getItem("aegis-demo-state");
      return stored ? { ...defaultDemo, ...JSON.parse(stored) } : defaultDemo;
    } catch {
      return defaultDemo;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("aegis-demo-state", JSON.stringify(demo));
  }, [demo]);

  const model = useMemo(() => buildModel(demo), [demo]);
  const actions = {
    startFix: () => setDemo((value) => ({ ...value, workStatus: "in_progress" })),
    markReview: () => setDemo((value) => ({ ...value, workStatus: "ready_for_review" })),
    resolve: () => setDemo((value) => ({ ...value, resolved: true, workStatus: "closed", snapshot: "ready", trustAccess: "approved", buyerQuestion: "answered" })),
    approveTrust: () => setDemo((value) => ({ ...value, trustAccess: "approved" })),
    answerQuestion: () => setDemo((value) => ({ ...value, buyerQuestion: "answered" })),
    refreshSnapshot: () => setDemo((value) => ({ ...value, snapshot: "ready" })),
    reset: () => setDemo(defaultDemo)
  };

  return E(
    "div",
    { className: "app-shell" },
    E(Sidebar, { route }),
    E(
      "main",
      { className: "main-content" },
      E(TopBar, { actions }),
      E("div", { className: "content-wrap" }, renderPage(route.path, route, model, actions))
    )
  );
}

function buildModel(demo) {
  const primaryTest = tests[0];
  const testStatus = demo.resolved ? primaryTest.statusWhenResolved : primaryTest.statusWhenOpen;
  const mappedTests = tests.map((test) => ({
    ...test,
    status: test.id === primaryTest.id ? testStatus : test.statusWhenOpen
  }));
  const mappedDocs = documents.map((doc) => ({
    ...doc,
    status: demo.resolved ? doc.statusWhenResolved : doc.statusWhenOpen
  }));
  const mappedRequests = trustRequests.map((request) => ({
    ...request,
    status: request.id === "req-zenpay" ? demo.trustAccess : request.statusWhenOpen
  }));
  const mappedFindings = findings.map((finding) => ({
    ...finding,
    status: demo.resolved ? finding.statusWhenResolved : demo.workStatus
  }));
  const openTests = mappedTests.filter((test) => test.status === "failing");
  const readiness = demo.resolved ? 92 : 84;
  const automation = demo.resolved ? 84 : 78;
  return {
    people,
    integrations,
    resources,
    tests: mappedTests,
    documents: mappedDocs,
    trustRequests: mappedRequests,
    findings: mappedFindings,
    buyerQuestions,
    auditSnapshot: {
      ...auditSnapshot,
      status: demo.snapshot === "ready" || demo.resolved ? auditSnapshot.statusWhenResolved : auditSnapshot.statusWhenOpen,
      frozenAt: demo.snapshot === "ready" || demo.resolved ? auditSnapshot.frozenAtWhenResolved : auditSnapshot.frozenAtWhenOpen
    },
    apiApplications,
    accessTokens,
    mcpTools,
    auditEvents,
    primaryTest: { ...primaryTest, status: testStatus },
    metrics: {
      readiness,
      automation,
      failingTests: openTests.length,
      auditReady: demo.resolved ? "Ready" : "Blocked by 1 high issue",
      trustDeflection: demo.resolved ? "73%" : "61%",
      questionnaireTime: demo.resolved ? "12 min" : "42 min"
    },
    demo
  };
}

function renderPage(path, route, model, actions) {
  if (path.startsWith("/compliance")) return E(CompliancePage, { route, model, actions });
  if (path === "/work") return E(WorkPage, { route, model, actions });
  if (path === "/trust-center") return E(TrustCenterPage, { route, model, actions });
  if (path === "/platform") return E(PlatformPage, { route, model, actions });
  return E(OverviewPage, { route, model, actions });
}

function Sidebar({ route }) {
  return E(
    "aside",
    { className: "sidebar" },
    E(
      "div",
      { className: "brand" },
      E("div", { className: "brand-mark" }, "A"),
      E("div", null, E("strong", null, "Aegis"), E("span", null, "Continuous Trust"))
    ),
    E(
      "nav",
      { className: "nav-list", "aria-label": "Primary navigation" },
      navItems.map((item) =>
        E(
          "a",
          {
            key: item.path,
            href: item.path,
            className: route.path === item.path || route.path.startsWith(item.path + "/") ? "nav-link active" : "nav-link",
            onClick: linkTo(route, item.path)
          },
          E("span", { className: "nav-token" }, item.token),
          E("span", null, item.label)
        )
      )
    ),
    E(
      "div",
      { className: "sidebar-footer" },
      E("span", { className: "mini-label" }, "Active program"),
      E("strong", null, "SOC 2 Type II"),
      E("span", null, "Q2 auditor handoff")
    )
  );
}

function TopBar({ actions }) {
  return E(
    "header",
    { className: "top-bar" },
    E("div", { className: "search-box" }, E("span", null, "Search tests, controls, evidence"), E("kbd", null, "/")),
    E("div", { className: "top-actions" }, E("span", { className: "env-pill" }, "Acme Financial Services"), E("button", { className: "ghost-button", onClick: actions.reset }, "Reset workspace"), E("div", { className: "avatar" }, "MP"))
  );
}

function OverviewPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Program overview",
      title: "SOC 2 readiness command center",
      description: "Track Acme's SOC 2 program from connected systems to auditor handoff and buyer-facing trust proof.",
      actions: [E(ActionButton, { key: "fix", route, to: "/work", label: "Open remediation queue" })]
    }),
    E(
      "div",
      { className: "metric-grid" },
      E(MetricCard, { label: "SOC 2 readiness", value: `${model.metrics.readiness}%`, detail: model.demo.resolved ? "Ready for auditor handoff" : "Blocked by S3 encryption" }),
      E(MetricCard, { label: "Automated evidence", value: `${model.metrics.automation}%`, detail: "Evidence collected from APIs" }),
      E(MetricCard, { label: "Open findings", value: model.metrics.failingTests, detail: model.metrics.auditReady }),
      E(MetricCard, { label: "Buyer review deflection", value: model.metrics.trustDeflection, detail: `Questionnaire turnaround ${model.metrics.questionnaireTime}` })
    ),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "SOC 2 launch plan" },
        E(FlowRail, {
          steps: [
            ["Connect systems", "AWS, GitHub, Okta, HRIS, MDM, and Jira are connected to automate evidence."],
            ["Confirm scope", "Production systems, people, devices, repos, and policies are scoped for SOC 2 Type II."],
            ["Monitor controls", "Aegis evaluates continuous tests and refreshes control status on every sync."],
            ["Resolve findings", "Owners receive clear remediation work with ticket and IDE guidance."],
            ["Handoff audit", "Frozen evidence snapshots keep the auditor view stable."],
            ["Publish trust", "Approved posture and gated documents are shared through Trust Center."]
          ]
        })
      ),
      E(
        Panel,
        { title: "Program priorities" },
        E("div", { className: "decision-list" },
          E(Decision, { title: "Audit-ready by default", body: "Keep evidence fresh continuously instead of rebuilding the packet before fieldwork." }),
          E(Decision, { title: "Owners know what to fix", body: "Findings route to the accountable engineer with resource, control, and remediation context." }),
          E(Decision, { title: "Trust supports sales", body: "Approved reports, live badges, and cited answers reduce buyer security-review back-and-forth." }),
          E(Decision, { title: "Extensible by design", body: "Unsupported tools can still feed monitoring through the Custom Resources API." })
        )
      )
    ),
    E(
      "div",
      { className: "two-column" },
      E(Panel, { title: "Current blocker" }, E(TestHero, { test: model.primaryTest, model }), E("div", { className: "panel-actions" }, E(ActionButton, { route, to: "/work", label: "Open My Work" }))),
      E(
        Panel,
        { title: "Audit handoff" },
        E("div", { className: "decision-list" },
          E(Decision, { title: "Auditor window", body: model.demo.resolved ? "SOC 2 Q2 evidence snapshot is ready for review." : "Snapshot waits on one high-severity finding." }),
          E(Decision, { title: "Trust Center", body: model.demo.resolved ? "SOC 2 report access and buyer answers are approved." : "Buyer-facing proof stays gated until the blocker is resolved." }),
          E(Decision, { title: "Next milestone", body: "Close the S3 finding, refresh the auditor snapshot, then publish approved Trust Center posture." })
        )
      )
    )
  );
}

function CompliancePage({ route, model, actions }) {
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Compliance",
      title: "SOC 2 end to end",
      description: "The compliance surface is intentionally narrow: SOC 2 readiness, evidence automation, document lifecycle, and auditor handoff.",
      actions: [E(ActionButton, { key: "auditor", route, to: "/compliance/soc2", label: "Review auditor snapshot" })]
    }),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "SOC 2 readiness" },
        E("div", { className: "score-block" }, E(ScoreRing, { score: model.metrics.readiness }), E("div", null, E("h3", null, "Framework status"), E("p", null, "Controls are mapped many-to-many so this same evidence can later satisfy ISO 27001 and HIPAA."))),
        E("div", { className: "chain" }, ["Signal", "Evidence", "Control", "Assessment", "Framework", "Compliance Status"].map((item) => E("span", { key: item }, item)))
      ),
      E(
        Panel,
        { title: "Auditor Snapshot" },
        E("div", { className: "snapshot-card" },
          E(StatusBadge, { status: model.auditSnapshot.status === "ready" ? "approved" : "not_ready" }),
          E("h3", null, model.auditSnapshot.name),
          E("p", null, `Frozen evidence state: ${model.auditSnapshot.frozenAt}`),
          E("div", { className: "tag-list" }, model.auditSnapshot.evidenceStatus.map((status) => E("span", { className: "tag", key: status }, status))),
          E("button", { className: "secondary-button", onClick: actions.refreshSnapshot }, "Refresh snapshot")
        )
      )
    ),
    E(
      Panel,
      { title: "Assessment lifecycle" },
      E(FlowRail, {
        steps: [
          ["Scope", "SOC 2 Type II production systems, identity, code, HR, device, and ticketing sources are selected."],
          ["Collect evidence", "Integrations and documents generate mapped evidence without manual screenshots."],
          ["Monitor controls", "Continuous tests evaluate resources and update SOC 2 control status."],
          ["Create finding", "A failed test becomes an owned remediation finding with Jira and MCP guidance."],
          ["Freeze snapshot", "Auditor gets an immutable review window with evidence states."],
          ["Report posture", "Approved status and documents flow into Trust Center reporting."]
        ]
      })
    ),
    E(
      Panel,
      { title: "Controls, evidence, and documents" },
      E(
        "div",
        { className: "simple-table" },
        E(TableHeader, { columns: ["Item", "Type", "Owner", "Status", "Why it matters"] }),
        model.tests.map((test) => E(Row, { key: test.id, cells: [test.shortName, test.control, model.people[test.owner].name, E(StatusBadge, { status: test.status }), test.evidence] })),
        model.documents.map((doc) => E(Row, { key: doc.id, cells: [doc.name, "Document", model.people[doc.owner].name, E(StatusBadge, { status: doc.status }), `${doc.access} access, renewal ${doc.renewal}`] }))
      )
    )
  );
}

function WorkPage({ route, model, actions }) {
  const disabledRun = model.demo.workStatus !== "ready_for_review" || model.demo.resolved;
  const finding = model.findings[0];
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "My Work",
      title: "Remediation queue",
      description: "Prioritized findings, owner context, and fix guidance for the work blocking audit readiness.",
      actions: [E(ActionButton, { key: "trust", route, to: "/trust-center", label: "See Trust Center impact", variant: "secondary" })]
    }),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "Urgent work" },
        E(WorkItem, { label: finding.label, title: finding.title, detail: `${finding.detail} Fix: ${model.primaryTest.fix}`, status: finding.status, owner: model.people[finding.owner].name }),
        E("div", { className: "workflow-actions" },
          E("button", { className: "primary-button", onClick: actions.startFix, disabled: model.demo.resolved }, "Start fix"),
          E("button", { className: "secondary-button", onClick: actions.markReview, disabled: model.demo.resolved }, "Mark ready for review"),
          E("button", { className: "primary-button", onClick: actions.resolve, disabled: disabledRun }, "Run check and close")
        )
      ),
      E(
        Panel,
        { title: "MCP remediation" },
        E("p", null, "These are the product's signature developer tools. They let Claude Code or Cursor query trust state and produce fixes in the repo."),
        E("div", { className: "tool-list" }, model.mcpTools.map((tool) => E("div", { className: "tool-card", key: tool.id }, E("strong", null, tool.name), E("span", null, tool.purpose)))),
        E(CodeBlock, {
          code: `# get_remediation(test-s3-encryption)\nresource \"aws_s3_bucket_server_side_encryption_configuration\" \"prod_audit_logs\" {\n  bucket = aws_s3_bucket.prod_audit_logs.id\n  rule { apply_server_side_encryption_by_default { sse_algorithm = \"AES256\" } }\n}\n\naws s3api put-bucket-encryption --bucket prod-audit-logs --server-side-encryption-configuration file://encryption.json`
        })
      )
    ),
    E(
      Panel,
      { title: "Work grouped by urgency" },
      E("div", { className: "card-grid three" },
        E(WorkBucket, { title: "Overdue", count: model.demo.resolved ? 0 : 1, body: model.demo.resolved ? "No overdue work." : "S3 encryption fix blocks auditor handoff." }),
        E(WorkBucket, { title: "Coming soon", count: 2, body: "Quarterly access review and policy renewal." }),
        E(WorkBucket, { title: "Waiting on others", count: model.demo.trustAccess === "approved" ? 0 : 1, body: "NDA approval for ZenPay SOC 2 report access." })
      )
    )
  );
}

function TrustCenterPage({ model, actions }) {
  const request = model.trustRequests[0];
  const question = model.buyerQuestions[0];
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Trust Center",
      title: "Customer-facing Trust Center",
      description: "Share approved security posture, gated reports, and cited answers with prospects from one controlled workspace.",
      actions: [E("button", { key: "approve", className: "primary-button", onClick: actions.approveTrust }, "Approve SOC 2 access")]
    }),
    E(
      "div",
      { className: "metric-grid" },
      E(MetricCard, { label: "Published badges", value: "3", detail: "SOC 2, uptime, encryption" }),
      E(MetricCard, { label: "Access approvals", value: model.demo.trustAccess === "approved" ? "93%" : "Pending", detail: "NDA + GRC owner approval" }),
      E(MetricCard, { label: "Questionnaire deflection", value: model.metrics.trustDeflection, detail: "Self-serve answers and docs" }),
      E(MetricCard, { label: "Buyer turnaround", value: model.metrics.questionnaireTime, detail: "After AI answer and access approval" })
    ),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "Gated document access" },
        E("div", { className: "request-card" },
          E(StatusBadge, { status: request.status }),
          E("h3", null, `${request.company} requests ${request.document}`),
          E("p", null, `${request.requester} is evaluating a ${request.revenue} opportunity. NDA: ${request.nda}.`),
          E("p", null, request.status === "approved" ? "Access approved after NDA and GRC owner approval." : "Access pending GRC owner approval."),
          E("button", { className: "secondary-button", onClick: actions.approveTrust }, "Approve request")
        )
      ),
      E(
        Panel,
        { title: "Buyer AI with citations" },
        E("div", { className: "question-card" },
          E("span", { className: "mini-label" }, "Prospect question"),
          E("h3", null, question.question),
          model.demo.buyerQuestion === "answered"
            ? E("p", null, question.answer)
            : E("p", null, "Answer is drafted from approved evidence but waiting for GRC approval."),
          E("span", { className: "mini-label" }, "Citations"),
          E("div", { className: "tag-list" }, question.citations.map((citation) => E("span", { className: "tag", key: citation }, citation))),
          E("button", { className: "primary-button", onClick: actions.answerQuestion }, "Approve cited answer")
        )
      )
    ),
    E(Panel, { title: "Public posture preview" }, E(TrustPreview, { model }))
  );
}

function PlatformPage({ model }) {
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Platform",
      title: "Platform settings",
      description: "Manage integrations, custom resources, API token rotation, MCP tools, and the audit log that power continuous trust.",
      actions: [E("a", { key: "tokens", className: "primary-button", href: "#token-rotation" }, "Review token rotation")]
    }),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "Integration coverage" },
        E("div", { className: "integration-grid" }, model.integrations.map((integration) => E(IntegrationCard, { key: integration.id, integration })))
      ),
      E(
        Panel,
        { title: "Custom Resources API" },
        E("p", null, "Unsupported systems can still feed the test engine through an idempotent full-state PUT. Deletion by diff removes records missing from the latest full-state sync."),
        E(CodeBlock, { code: `PUT /v1/custom-resources\n{\n  \"source_id\": \"legacy-hr\",\n  \"sync_mode\": \"full_state\",\n  \"schema\": \"jtd\",\n  \"resources\": [{ \"id\": \"emp_123\", \"mfa\": true, \"status\": \"active\" }]\n}` })
      )
    ),
    E(
      "div",
      { className: "two-column" },
      E(
        "div",
        { id: "token-rotation" },
        E(
          Panel,
          { title: "OAuth Token Rotation" },
          E("p", null, "Concurrent tokens with overlap windows avoid the cascading 401 failure mode caused by one-token-per-app rotation."),
          E("div", { className: "simple-table compact" },
            E(TableHeader, { columns: ["Token", "Status", "Expires", "Overlap"] }),
            model.accessTokens.map((token) => E(Row, { key: token.id, cells: [token.label, E(StatusBadge, { status: token.status }), token.expires, token.overlap] }))
          )
        )
      ),
      E(
        Panel,
        { title: "MCP Server" },
        E("p", null, "IDE assistants can query failing tests, affected resources, and remediation output without sending engineers back into the compliance portal."),
        E("div", { className: "tool-list" }, model.mcpTools.map((tool) => E("div", { className: "tool-card", key: tool.id }, E("strong", null, tool.name), E("span", null, tool.purpose))))
      )
    ),
    E(
      "div",
      { className: "two-column" },
      E(
        Panel,
        { title: "Append-only Audit Log" },
        E("p", null, "Every control evaluation, remediation action, access approval, and snapshot refresh is retained for auditor review and future SIEM streaming."),
        E("div", { className: "decision-list" }, model.auditEvents.map((event) => E(Decision, { key: event.id, title: `${event.actor}: ${event.action}`, body: event.detail })))
      ),
      E(
        Panel,
        { title: "Sequenced later" },
        E("div", { className: "decision-list" },
          E(Decision, { title: "Thin TPRM in MVP", body: "Vendor inventory exists, but agentic vendor reviews move to phase 3." }),
          E(Decision, { title: "Privacy suite later", body: "DPIA, ROPA, and full risk register stay out of the SOC 2 wedge." }),
          E(Decision, { title: "Enterprise BU UI later", body: "Tenant and business-unit columns are in the model, but the admin UX waits." })
        )
      )
    )
  );
}

function PageHeader({ eyebrow, title, description, actions = [] }) {
  return E("div", { className: "page-header" }, E("div", null, E("span", { className: "eyebrow" }, eyebrow), E("h1", null, title), E("p", null, description)), actions.length ? E("div", { className: "page-actions" }, actions) : null);
}

function Panel({ title, children }) {
  return E("section", { className: "panel" }, E("div", { className: "panel-header" }, E("h2", null, title)), children);
}

function MetricCard({ label, value, detail }) {
  return E("article", { className: "metric-card" }, E("span", null, label), E("strong", null, value), E("p", null, detail));
}

function FlowRail({ steps }) {
  return E("div", { className: "flow-rail" }, steps.map(([title, body], index) => E("div", { className: "flow-step", key: title }, E("span", null, index + 1), E("div", null, E("strong", null, title), E("p", null, body)))));
}

function Decision({ title, body }) {
  return E("div", { className: "decision" }, E("strong", null, title), E("p", null, body));
}

function TestHero({ test, model }) {
  return E("div", { className: "test-hero" }, E(StatusBadge, { status: test.status }), E("h3", null, test.name), E("p", null, test.fix), E("div", { className: "tag-list" }, [test.framework, test.control, model.people[test.owner].name].map((tag) => E("span", { className: "tag", key: tag }, tag))));
}

function WorkItem({ label, title, detail, status, owner }) {
  return E("div", { className: "work-item" }, E("span", { className: "mini-label" }, label), E(StatusBadge, { status }), E("h3", null, title), E("p", null, detail), E("small", null, `Owner: ${owner}`));
}

function WorkBucket({ title, count, body }) {
  return E("article", { className: "surface-card" }, E("span", { className: "mini-label" }, title), E("strong", { className: "bucket-count" }, count), E("p", null, body));
}

function TrustPreview({ model }) {
  return E("div", { className: "trust-preview" },
    E("div", null, E("span", { className: "mini-label" }, "Public badge"), E("h3", null, "Acme Financial Services Trust Center"), E("p", null, "SOC 2 readiness, uptime, approved policies, and gated document access in one buyer-facing view.")),
    E("div", { className: "badge-row" }, E(StatusBadge, { status: model.demo.resolved ? "approved" : "ready" }), E("span", { className: "tag" }, "SOC 2 Type II"), E("span", { className: "tag" }, "99.98% uptime"), E("span", { className: "tag" }, "AI answers with citations"))
  );
}

function IntegrationCard({ integration }) {
  return E("article", { className: "integration-card" }, E(StatusBadge, { status: integration.status }), E("h3", null, integration.name), E("p", null, integration.coverage), E("small", null, `${integration.resources} resources synced from ${integration.type}`));
}

function CodeBlock({ code }) {
  return E("pre", { className: "code-block" }, E("code", null, code));
}

function ScoreRing({ score }) {
  return E("div", { className: "score-ring", style: { "--score": `${score * 3.6}deg` } }, E("strong", null, `${score}%`), E("span", null, "ready"));
}

function StatusBadge({ status }) {
  return E("span", { className: `badge status-${status}` }, statusLabels[status] || readable(status));
}

function TableHeader({ columns }) {
  return E("div", { className: "table-row table-header" }, columns.map((column) => E("div", { key: column }, column)));
}

function Row({ cells }) {
  return E("div", { className: "table-row" }, cells.map((cell, index) => E("div", { key: index }, cell)));
}

function ActionButton({ route, to, label, variant = "primary" }) {
  return E("a", { href: to, className: `${variant}-button`, onClick: linkTo(route, to) }, label);
}

function linkTo(route, to) {
  return (event) => {
    event.preventDefault();
    route.navigate(to);
  };
}

function readable(value) {
  return String(value || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

ReactDOM.createRoot(document.getElementById("root")).render(E(App));
