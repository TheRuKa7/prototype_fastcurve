const { useEffect, useMemo, useState } = React;
const E = React.createElement;

const users = [
  { id: "usr-maya", name: "Maya Patel", role: "Compliance Manager", team: "GRC" },
  { id: "usr-ethan", name: "Ethan Brooks", role: "IT Operations Owner", team: "IT Operations" },
  { id: "usr-sofia", name: "Sofia Romero", role: "Security Engineering Lead", team: "Security" },
  { id: "usr-liam", name: "Liam Nguyen", role: "Internal Auditor", team: "Audit" },
  { id: "usr-ava", name: "Ava Martin", role: "Vendor Risk Manager", team: "Risk" }
];

const scopes = [
  { id: "scope-corp-it", name: "Corporate IT", type: "Business unit", ownerId: "usr-ethan" },
  { id: "scope-payments", name: "Payments Platform", type: "Application", ownerId: "usr-sofia" },
  { id: "scope-data", name: "Customer Data Warehouse", type: "Infrastructure", ownerId: "usr-sofia" },
  { id: "scope-vendors", name: "Vendor Operations", type: "Process", ownerId: "usr-ava" }
];

const frameworks = [
  {
    id: "soc-2",
    name: "SOC 2 Type II",
    version: "2026 readiness",
    baseScore: 88,
    resolvedScore: 92,
    domains: [
      { id: "soc-cc6", name: "Logical and Physical Access", citation: "CC6.1", controlIds: ["ac-01", "ac-02"] },
      { id: "soc-cc7", name: "System Operations", citation: "CC7.2", controlIds: ["vm-01", "ir-01"] },
      { id: "soc-cc8", name: "Change Management", citation: "CC8.1", controlIds: ["sdlc-01"] }
    ]
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    version: "2022",
    baseScore: 91,
    resolvedScore: 93,
    domains: [
      { id: "iso-a5", name: "Organizational Controls", citation: "A.5", controlIds: ["ac-01", "ir-01"] },
      { id: "iso-a8", name: "Technology Controls", citation: "A.8", controlIds: ["cc-01", "vm-01", "sdlc-01"] }
    ]
  },
  {
    id: "nist-csf",
    name: "NIST CSF",
    version: "2.0",
    baseScore: 84,
    resolvedScore: 86,
    domains: [
      { id: "nist-pr", name: "Protect", citation: "PR.AA", controlIds: ["ac-01", "ac-02"] },
      { id: "nist-de", name: "Detect", citation: "DE.CM", controlIds: ["vm-01"] },
      { id: "nist-rs", name: "Respond", citation: "RS.MA", controlIds: ["ir-01"] }
    ]
  }
];

const controls = [
  {
    id: "ac-01",
    code: "AC-01",
    title: "Multi-factor authentication enforced for all workforce users",
    description: "All active workforce identities must have at least one enforced MFA factor before accessing production or corporate systems.",
    ownerId: "usr-ethan",
    scopeIds: ["scope-corp-it", "scope-payments"],
    baseStatus: "failing",
    resolvedStatus: "passing",
    requirements: ["SOC 2 CC6.1", "ISO 27001 A.5.16", "NIST CSF PR.AA"],
    ruleIds: ["rule-mfa"],
    evidenceIds: ["ev-okta-mfa"],
    findingIds: ["find-mfa-001"]
  },
  {
    id: "ac-02",
    code: "AC-02",
    title: "Quarterly privileged access review",
    description: "Privileged access must be reviewed by system owners every quarter.",
    ownerId: "usr-liam",
    scopeIds: ["scope-corp-it"],
    baseStatus: "needs_review",
    resolvedStatus: "needs_review",
    requirements: ["SOC 2 CC6.2", "NIST CSF PR.AA"],
    ruleIds: ["rule-access-review"],
    evidenceIds: ["ev-access-review"],
    findingIds: []
  },
  {
    id: "cc-01",
    code: "CC-01",
    title: "Cloud storage encryption enabled",
    description: "Customer data stores must enforce encryption at rest and block public access.",
    ownerId: "usr-sofia",
    scopeIds: ["scope-data"],
    baseStatus: "passing",
    resolvedStatus: "passing",
    requirements: ["ISO 27001 A.8.24"],
    ruleIds: ["rule-s3"],
    evidenceIds: ["ev-aws-storage"],
    findingIds: []
  },
  {
    id: "hr-01",
    code: "HR-01",
    title: "Background checks completed before start date",
    description: "All workforce members must complete required screening before their first day.",
    ownerId: "usr-maya",
    scopeIds: ["scope-corp-it"],
    baseStatus: "passing",
    resolvedStatus: "passing",
    requirements: ["SOC 2 CC1.4", "ISO 27001 A.6.1"],
    ruleIds: ["rule-hris-bg"],
    evidenceIds: ["ev-hris-bg"],
    findingIds: []
  },
  {
    id: "ir-01",
    code: "IR-01",
    title: "Incident response plan reviewed annually",
    description: "Incident response procedures must be reviewed, approved, and tested every year.",
    ownerId: "usr-sofia",
    scopeIds: ["scope-payments"],
    baseStatus: "passing",
    resolvedStatus: "passing",
    requirements: ["SOC 2 CC7.4", "ISO 27001 A.5.24", "NIST CSF RS.MA"],
    ruleIds: ["rule-ir-plan"],
    evidenceIds: ["ev-ir-plan"],
    findingIds: []
  },
  {
    id: "vm-01",
    code: "VM-01",
    title: "Critical vulnerabilities remediated within SLA",
    description: "Critical vulnerabilities must be remediated within seven calendar days.",
    ownerId: "usr-sofia",
    scopeIds: ["scope-payments", "scope-data"],
    baseStatus: "failing",
    resolvedStatus: "failing",
    requirements: ["SOC 2 CC7.1", "ISO 27001 A.8.8", "NIST CSF DE.CM"],
    ruleIds: ["rule-vuln-sla"],
    evidenceIds: ["ev-vuln"],
    findingIds: ["find-vm-002"]
  },
  {
    id: "sdlc-01",
    code: "SDLC-01",
    title: "Pull requests require review before merge",
    description: "Protected repositories must require peer approval before code is merged.",
    ownerId: "usr-sofia",
    scopeIds: ["scope-payments"],
    baseStatus: "passing",
    resolvedStatus: "passing",
    requirements: ["SOC 2 CC8.1", "ISO 27001 A.8.32"],
    ruleIds: ["rule-pr-review"],
    evidenceIds: ["ev-github-pr"],
    findingIds: []
  }
];

const integrations = [
  { id: "int-okta", name: "Okta", provider: "Identity", status: "connected", lastSyncAt: "Today 09:15", controlsCovered: 18, evidenceGenerated: 41 },
  { id: "int-aws", name: "AWS", provider: "Cloud", status: "connected", lastSyncAt: "Today 09:03", controlsCovered: 27, evidenceGenerated: 58 },
  { id: "int-github", name: "GitHub", provider: "Source control", status: "connected", lastSyncAt: "Today 08:48", controlsCovered: 12, evidenceGenerated: 19 },
  { id: "int-jira", name: "Jira", provider: "Ticketing", status: "connected", lastSyncAt: "Today 08:40", controlsCovered: 9, evidenceGenerated: 14 },
  { id: "int-hris", name: "HRIS", provider: "Employee lifecycle", status: "degraded", lastSyncAt: "Yesterday 18:22", controlsCovered: 8, evidenceGenerated: 11 }
];

const monitoringRules = [
  {
    id: "rule-mfa",
    code: "MFA_ENFORCED_WORKFORCE",
    name: "All workforce users must have enforced MFA",
    description: "Every active Okta user in workforce groups must have at least one enforced MFA factor.",
    integrationId: "int-okta",
    controlId: "ac-01",
    frequency: "Daily",
    baseStatus: "failing",
    resolvedStatus: "passing",
    lastRunAt: "Today 09:15",
    lastResultSummary: "3 active users are missing enforced MFA."
  },
  {
    id: "rule-access-review",
    code: "PRIV_ACCESS_REVIEW_QTR",
    name: "Privileged access review completed this quarter",
    description: "Privileged groups must have an approved access review in the current quarter.",
    integrationId: "int-jira",
    controlId: "ac-02",
    frequency: "Weekly",
    baseStatus: "needs_review",
    resolvedStatus: "needs_review",
    lastRunAt: "Today 07:30",
    lastResultSummary: "Review packet submitted and waiting for auditor approval."
  },
  {
    id: "rule-s3",
    code: "S3_ENCRYPTION_BLOCK_PUBLIC",
    name: "Cloud storage encrypted and private",
    description: "Customer data buckets must enforce encryption and block public access.",
    integrationId: "int-aws",
    controlId: "cc-01",
    frequency: "Hourly",
    baseStatus: "passing",
    resolvedStatus: "passing",
    lastRunAt: "Today 09:03",
    lastResultSummary: "All monitored storage resources pass."
  },
  {
    id: "rule-vuln-sla",
    code: "CRITICAL_VULN_SLA",
    name: "Critical vulnerabilities remediated within SLA",
    description: "Critical vulnerabilities must not remain open beyond seven days.",
    integrationId: "int-jira",
    controlId: "vm-01",
    frequency: "Daily",
    baseStatus: "failing",
    resolvedStatus: "failing",
    lastRunAt: "Today 08:40",
    lastResultSummary: "2 critical vulnerabilities are outside SLA."
  },
  {
    id: "rule-pr-review",
    code: "PR_REVIEW_REQUIRED",
    name: "Protected branches require pull request review",
    description: "Production repositories must require at least one approving review.",
    integrationId: "int-github",
    controlId: "sdlc-01",
    frequency: "Daily",
    baseStatus: "passing",
    resolvedStatus: "passing",
    lastRunAt: "Today 08:48",
    lastResultSummary: "All protected repositories pass."
  },
  {
    id: "rule-hris-bg",
    code: "BACKGROUND_CHECK_COMPLETE",
    name: "Background checks complete before start date",
    description: "New hires must have required screening completed before their first day.",
    integrationId: "int-hris",
    controlId: "hr-01",
    frequency: "Daily",
    baseStatus: "passing",
    resolvedStatus: "passing",
    lastRunAt: "Yesterday 18:22",
    lastResultSummary: "Last sync passed, but connector is delayed."
  },
  {
    id: "rule-ir-plan",
    code: "IR_PLAN_ANNUAL_REVIEW",
    name: "Incident response plan reviewed annually",
    description: "The incident response plan must have a current annual review attestation.",
    integrationId: "int-jira",
    controlId: "ir-01",
    frequency: "Weekly",
    baseStatus: "passing",
    resolvedStatus: "passing",
    lastRunAt: "Yesterday 16:10",
    lastResultSummary: "Annual review completed by Security Engineering."
  }
];

const signals = [
  {
    id: "sig-okta-2026-05-30-0915",
    integrationId: "int-okta",
    ruleId: "rule-mfa",
    receivedAt: "Today 09:15",
    type: "MFA policy evaluation",
    baseResult: "fail",
    resolvedResult: "pass",
    baseSummary: "3 active workforce users are missing enforced MFA.",
    resolvedSummary: "All active workforce users have enforced MFA.",
    evidenceId: "ev-okta-mfa",
    affectedEntities: ["Jordan Lee", "Priya Shah", "Morgan Chen"]
  },
  {
    id: "sig-aws-2026-05-30-0903",
    integrationId: "int-aws",
    ruleId: "rule-s3",
    receivedAt: "Today 09:03",
    type: "Storage configuration evaluation",
    baseResult: "pass",
    resolvedResult: "pass",
    baseSummary: "All monitored buckets are encrypted and private.",
    resolvedSummary: "All monitored buckets are encrypted and private.",
    evidenceId: "ev-aws-storage",
    affectedEntities: ["customer-data-prod", "payments-ledger-prod"]
  },
  {
    id: "sig-jira-2026-05-30-0840",
    integrationId: "int-jira",
    ruleId: "rule-vuln-sla",
    receivedAt: "Today 08:40",
    type: "Vulnerability SLA evaluation",
    baseResult: "fail",
    resolvedResult: "fail",
    baseSummary: "2 critical vulnerabilities are outside SLA.",
    resolvedSummary: "2 critical vulnerabilities are outside SLA.",
    evidenceId: "ev-vuln",
    affectedEntities: ["PAY-API-14", "DATA-ETL-02"]
  }
];

const evidence = [
  {
    id: "ev-okta-mfa",
    title: "Okta MFA enforcement snapshot",
    source: "Okta",
    method: "Automated",
    collectedAt: "Today 09:15",
    baseFreshness: "current",
    resolvedFreshness: "current",
    baseReviewerStatus: "needs_review",
    resolvedReviewerStatus: "approved",
    signalId: "sig-okta-2026-05-30-0915",
    controlIds: ["ac-01"],
    frameworkIds: ["soc-2", "iso-27001", "nist-csf"],
    assessmentIds: ["assess-soc2-q2"],
    preview: [
      ["Jordan Lee", "Active", "No enforced factor"],
      ["Priya Shah", "Active", "SMS enrolled, not enforced"],
      ["Morgan Chen", "Active", "Pending enrollment"]
    ]
  },
  {
    id: "ev-access-review",
    title: "Q2 privileged access review packet",
    source: "Jira",
    method: "Manual review",
    collectedAt: "Yesterday 15:00",
    baseFreshness: "current",
    resolvedFreshness: "current",
    baseReviewerStatus: "needs_review",
    resolvedReviewerStatus: "needs_review",
    signalId: "",
    controlIds: ["ac-02"],
    frameworkIds: ["soc-2", "nist-csf"],
    assessmentIds: ["assess-soc2-q2"],
    preview: [["Finance Admins", "12 users", "Reviewer pending"], ["Production Admins", "7 users", "Reviewer pending"]]
  },
  {
    id: "ev-aws-storage",
    title: "AWS storage encryption and access snapshot",
    source: "AWS",
    method: "Automated",
    collectedAt: "Today 09:03",
    baseFreshness: "current",
    resolvedFreshness: "current",
    baseReviewerStatus: "approved",
    resolvedReviewerStatus: "approved",
    signalId: "sig-aws-2026-05-30-0903",
    controlIds: ["cc-01"],
    frameworkIds: ["iso-27001"],
    assessmentIds: ["assess-iso-gap"],
    preview: [["customer-data-prod", "Encrypted", "Public access blocked"], ["payments-ledger-prod", "Encrypted", "Public access blocked"]]
  },
  {
    id: "ev-vuln",
    title: "Critical vulnerability SLA snapshot",
    source: "Jira",
    method: "Automated",
    collectedAt: "Today 08:40",
    baseFreshness: "current",
    resolvedFreshness: "current",
    baseReviewerStatus: "needs_review",
    resolvedReviewerStatus: "needs_review",
    signalId: "sig-jira-2026-05-30-0840",
    controlIds: ["vm-01"],
    frameworkIds: ["soc-2", "iso-27001", "nist-csf"],
    assessmentIds: ["assess-soc2-q2"],
    preview: [["PAY-API-14", "Critical", "9 days open"], ["DATA-ETL-02", "Critical", "11 days open"]]
  },
  {
    id: "ev-github-pr",
    title: "GitHub branch protection export",
    source: "GitHub",
    method: "Automated",
    collectedAt: "Today 08:48",
    baseFreshness: "current",
    resolvedFreshness: "current",
    baseReviewerStatus: "approved",
    resolvedReviewerStatus: "approved",
    signalId: "",
    controlIds: ["sdlc-01"],
    frameworkIds: ["soc-2", "iso-27001"],
    assessmentIds: ["assess-soc2-q2"],
    preview: [["payments-api", "Review required", "Passing"], ["ledger-worker", "Review required", "Passing"]]
  },
  {
    id: "ev-hris-bg",
    title: "HRIS background check completion export",
    source: "HRIS",
    method: "Automated",
    collectedAt: "Yesterday 18:22",
    baseFreshness: "stale",
    resolvedFreshness: "stale",
    baseReviewerStatus: "approved",
    resolvedReviewerStatus: "approved",
    signalId: "",
    controlIds: ["hr-01"],
    frameworkIds: ["soc-2", "iso-27001"],
    assessmentIds: ["assess-soc2-q2"],
    preview: [["April hires", "42", "Complete"], ["May hires", "19", "Complete"]]
  }
];

const remediationTasks = [
  {
    id: "task-mfa-001",
    title: "Enforce MFA policy for users missing required factor",
    system: "Jira",
    externalKey: "SEC-1842",
    ownerId: "usr-ethan",
    baseStatus: "todo",
    dueDate: "2026-06-06"
  },
  {
    id: "task-vm-002",
    title: "Remediate critical vulnerabilities outside SLA",
    system: "Jira",
    externalKey: "SEC-1819",
    ownerId: "usr-sofia",
    baseStatus: "in_progress",
    dueDate: "2026-06-03"
  }
];

const findings = [
  {
    id: "find-mfa-001",
    title: "3 workforce users missing enforced MFA",
    severity: "high",
    baseStatus: "open",
    source: "Automated monitoring",
    ownerId: "usr-ethan",
    dueDate: "2026-06-06",
    controlId: "ac-01",
    evidenceId: "ev-okta-mfa",
    assessmentId: "assess-soc2-q2",
    remediationTaskId: "task-mfa-001",
    summary: "Okta reported three active workforce users who do not have an enforced MFA factor."
  },
  {
    id: "find-vm-002",
    title: "Critical vulnerabilities outside remediation SLA",
    severity: "critical",
    baseStatus: "in_progress",
    source: "Automated monitoring",
    ownerId: "usr-sofia",
    dueDate: "2026-06-03",
    controlId: "vm-01",
    evidenceId: "ev-vuln",
    assessmentId: "assess-soc2-q2",
    remediationTaskId: "task-vm-002",
    summary: "Two critical vulnerabilities remain open beyond the seven day SLA."
  },
  {
    id: "find-access-003",
    title: "Privileged access review awaiting auditor approval",
    severity: "medium",
    baseStatus: "ready_for_review",
    source: "Assessment review",
    ownerId: "usr-liam",
    dueDate: "2026-06-12",
    controlId: "ac-02",
    evidenceId: "ev-access-review",
    assessmentId: "assess-soc2-q2",
    remediationTaskId: "",
    summary: "The access review packet is complete but needs final reviewer approval."
  }
];

const assessments = [
  {
    id: "assess-soc2-q2",
    name: "SOC 2 Readiness Q2",
    frameworkId: "soc-2",
    scopeIds: ["scope-corp-it", "scope-payments"],
    ownerId: "usr-maya",
    status: "In review",
    dueDate: "2026-06-20",
    baseProgress: 72,
    resolvedProgress: 81,
    controlIds: ["ac-01", "ac-02", "vm-01", "sdlc-01", "hr-01", "ir-01"],
    findingIds: ["find-mfa-001", "find-vm-002", "find-access-003"]
  },
  {
    id: "assess-iso-gap",
    name: "ISO 27001 Gap Assessment",
    frameworkId: "iso-27001",
    scopeIds: ["scope-data", "scope-payments"],
    ownerId: "usr-maya",
    status: "In progress",
    dueDate: "2026-07-15",
    baseProgress: 54,
    resolvedProgress: 58,
    controlIds: ["ac-01", "cc-01", "vm-01", "sdlc-01", "ir-01"],
    findingIds: ["find-mfa-001", "find-vm-002"]
  },
  {
    id: "assess-vendor-q3",
    name: "Critical Vendor Reassessment",
    frameworkId: "soc-2",
    scopeIds: ["scope-vendors"],
    ownerId: "usr-ava",
    status: "Draft",
    dueDate: "2026-08-01",
    baseProgress: 18,
    resolvedProgress: 18,
    controlIds: ["ac-02", "hr-01"],
    findingIds: []
  }
];

const risks = [
  { id: "risk-iam", title: "Identity control drift in workforce access", ownerId: "usr-ethan", inherentScore: 18, residualScore: 9, treatment: "Mitigate", linkedFindingIds: ["find-mfa-001"], linkedControlIds: ["ac-01"] },
  { id: "risk-vuln", title: "Delayed remediation of internet-facing vulnerabilities", ownerId: "usr-sofia", inherentScore: 22, residualScore: 14, treatment: "Mitigate", linkedFindingIds: ["find-vm-002"], linkedControlIds: ["vm-01"] },
  { id: "risk-vendor", title: "Incomplete vendor reassessment coverage", ownerId: "usr-ava", inherentScore: 15, residualScore: 11, treatment: "Transfer", linkedFindingIds: [], linkedControlIds: [] }
];

const vendors = [
  { id: "vendor-payrails", name: "PayRails", criticality: "critical", assessmentStatus: "review", ownerId: "usr-ava", nextReviewDate: "2026-06-18" },
  { id: "vendor-helpscout", name: "HelpScout", criticality: "medium", assessmentStatus: "approved", ownerId: "usr-ava", nextReviewDate: "2026-09-10" },
  { id: "vendor-datastream", name: "DataStream Analytics", criticality: "high", assessmentStatus: "in_progress", ownerId: "usr-ava", nextReviewDate: "2026-07-04" }
];

const reports = [
  { id: "soc2-readiness-summary", name: "SOC 2 Readiness Summary", type: "Framework", frameworkId: "soc-2", assessmentId: "assess-soc2-q2", generatedAt: "Today 10:00", summary: "Generated from 118 evidence records, 52 controls, and 1 active assessment." },
  { id: "executive-posture", name: "Executive Compliance Posture", type: "Executive", frameworkId: "", assessmentId: "", generatedAt: "Today 09:45", summary: "Board-ready posture, risks, and remediation summary across active frameworks." },
  { id: "evidence-package-q2", name: "Q2 Evidence Package", type: "Evidence package", frameworkId: "soc-2", assessmentId: "assess-soc2-q2", generatedAt: "Today 09:30", summary: "Audit-ready evidence export grouped by control and framework requirement." },
  { id: "findings-summary", name: "Open Findings Summary", type: "Findings", frameworkId: "", assessmentId: "", generatedAt: "Today 09:25", summary: "Severity, owner, SLA, and remediation status for active findings." }
];

const navItems = [
  { label: "Dashboard", path: "/dashboard", token: "D" },
  { label: "Frameworks", path: "/frameworks", token: "F" },
  { label: "Controls Library", path: "/controls", token: "C" },
  { label: "Assessments", path: "/assessments", token: "A" },
  { label: "Continuous Monitoring", path: "/monitoring", token: "M" },
  { label: "Evidence", path: "/evidence", token: "E" },
  { label: "Findings", path: "/findings", token: "FI" },
  { label: "Risks", path: "/risks", token: "R" },
  { label: "Vendors", path: "/vendors", token: "V" },
  { label: "Reports", path: "/reports", token: "RP" },
  { label: "Integrations", path: "/integrations", token: "I" },
  { label: "Admin / Scopes", path: "/admin/scopes", token: "S" }
];

const statusLabels = {
  passing: "Passing",
  failing: "Failing",
  needs_review: "Needs review",
  not_monitored: "Not monitored",
  open: "Open",
  in_progress: "In progress",
  ready_for_review: "Ready for review",
  closed: "Closed",
  accepted_risk: "Accepted risk",
  todo: "To do",
  done: "Done",
  connected: "Connected",
  degraded: "Degraded",
  disconnected: "Disconnected",
  current: "Current",
  stale: "Stale",
  expired: "Expired",
  approved: "Approved",
  rejected: "Rejected",
  fail: "Fail",
  pass: "Pass"
};

const defaultDemoState = {
  findingStatus: "open",
  taskStatus: "todo",
  controlResolved: false,
  ruleFilter: "all"
};

function useRoute() {
  const initial = window.location.pathname === "/" ? "/dashboard" : window.location.pathname;
  const [path, setPath] = useState(initial);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/dashboard");
    }
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to) => {
    if (to === path) return;
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function App() {
  const route = useRoute();
  const [demo, setDemo] = useState(() => {
    try {
      const stored = window.localStorage.getItem("complianceops-demo-state");
      return stored ? { ...defaultDemoState, ...JSON.parse(stored) } : defaultDemoState;
    } catch {
      return defaultDemoState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("complianceops-demo-state", JSON.stringify(demo));
  }, [demo]);

  const model = useMemo(() => buildModel(demo), [demo]);

  const actions = {
    moveFinding(status) {
      setDemo((current) => ({
        ...current,
        findingStatus: status,
        taskStatus: status === "in_progress" ? "in_progress" : current.taskStatus
      }));
    },
    markReady() {
      setDemo((current) => ({ ...current, findingStatus: "ready_for_review", taskStatus: "ready_for_review" }));
    },
    runRecheck() {
      setDemo((current) => ({ ...current, findingStatus: "closed", taskStatus: "done", controlResolved: true }));
    },
    resetScenario() {
      setDemo(defaultDemoState);
    },
    setRuleFilter(ruleFilter) {
      setDemo((current) => ({ ...current, ruleFilter }));
    }
  };

  return E(
    "div",
    { className: "app-shell" },
    E(Sidebar, { route, model }),
    E(
      "main",
      { className: "main-content" },
      E(TopBar, { model, actions }),
      E("div", { className: "content-wrap" }, renderPage(route.path, route, model, actions, demo))
    )
  );
}

function buildModel(demo) {
  const statusFor = (item) => (demo.controlResolved ? item.resolvedStatus : item.baseStatus);
  const resultFor = (item) => (demo.controlResolved ? item.resolvedResult : item.baseResult);
  const summaryFor = (item) => (demo.controlResolved ? item.resolvedSummary : item.baseSummary);
  const freshnessFor = (item) => (demo.controlResolved ? item.resolvedFreshness : item.baseFreshness);
  const reviewerFor = (item) => (demo.controlResolved ? item.resolvedReviewerStatus : item.baseReviewerStatus);

  const enrichedControls = controls.map((control) => ({
    ...control,
    status: statusFor(control)
  }));

  const enrichedRules = monitoringRules.map((rule) => ({
    ...rule,
    status: statusFor(rule),
    lastResultSummary: rule.id === "rule-mfa" && demo.controlResolved ? "All active workforce users pass MFA enforcement." : rule.lastResultSummary
  }));

  const enrichedSignals = signals.map((signal) => ({
    ...signal,
    result: resultFor(signal),
    summary: summaryFor(signal)
  }));

  const enrichedEvidence = evidence.map((record) => ({
    ...record,
    freshness: freshnessFor(record),
    reviewerStatus: reviewerFor(record)
  }));

  const enrichedTasks = remediationTasks.map((task) => ({
    ...task,
    status: task.id === "task-mfa-001" ? demo.taskStatus : task.baseStatus
  }));

  const enrichedFindings = findings.map((finding) => ({
    ...finding,
    status: finding.id === "find-mfa-001" ? demo.findingStatus : finding.baseStatus
  }));

  const enrichedFrameworks = frameworks.map((framework) => ({
    ...framework,
    postureScore: demo.controlResolved ? framework.resolvedScore : framework.baseScore
  }));

  const enrichedAssessments = assessments.map((assessment) => ({
    ...assessment,
    progressPercent: demo.controlResolved ? assessment.resolvedProgress : assessment.baseProgress
  }));

  const byId = (items) => Object.fromEntries(items.map((item) => [item.id, item]));
  const failingControls = enrichedControls.filter((control) => control.status === "failing");
  const openFindings = enrichedFindings.filter((finding) => finding.status !== "closed");
  const highFindings = openFindings.filter((finding) => finding.severity === "high" || finding.severity === "critical");
  const currentEvidence = enrichedEvidence.filter((record) => record.freshness === "current").length;

  return {
    users: byId(users),
    scopes: byId(scopes),
    frameworks: enrichedFrameworks,
    frameworksById: byId(enrichedFrameworks),
    controls: enrichedControls,
    controlsById: byId(enrichedControls),
    integrations,
    integrationsById: byId(integrations),
    rules: enrichedRules,
    rulesById: byId(enrichedRules),
    signals: enrichedSignals,
    signalsById: byId(enrichedSignals),
    evidence: enrichedEvidence,
    evidenceById: byId(enrichedEvidence),
    findings: enrichedFindings,
    findingsById: byId(enrichedFindings),
    tasks: enrichedTasks,
    tasksById: byId(enrichedTasks),
    assessments: enrichedAssessments,
    assessmentsById: byId(enrichedAssessments),
    risks,
    vendors,
    reports,
    reportsById: byId(reports),
    metrics: {
      overallScore: demo.controlResolved ? 91 : 88,
      monitoredControls: 143,
      failingChecks: demo.controlResolved ? 8 : 9,
      evidenceFreshness: Math.round((currentEvidence / enrichedEvidence.length) * 100),
      openFindings: openFindings.length,
      highFindings: highFindings.length,
      passingControls: enrichedControls.filter((control) => control.status === "passing").length,
      failingControls: failingControls.length
    }
  };
}

function renderPage(path, route, model, actions, demo) {
  if (path.startsWith("/frameworks/")) return E(FrameworkDetailPage, { id: path.split("/")[2], route, model });
  if (path === "/frameworks") return E(FrameworksPage, { route, model });
  if (path.startsWith("/controls/")) return E(ControlDetailPage, { id: path.split("/")[2], route, model });
  if (path === "/controls") return E(ControlsPage, { route, model });
  if (path.startsWith("/assessments/")) return E(AssessmentDetailPage, { id: path.split("/")[2], route, model });
  if (path === "/assessments") return E(AssessmentsPage, { route, model });
  if (path.startsWith("/monitoring/rules/")) return E(RuleDetailPage, { id: path.split("/")[3], route, model });
  if (path.startsWith("/monitoring/signals/")) return E(SignalDetailPage, { id: path.split("/")[3], route, model });
  if (path === "/monitoring") return E(MonitoringPage, { route, model, actions, demo });
  if (path.startsWith("/evidence/")) return E(EvidenceDetailPage, { id: path.split("/")[2], route, model });
  if (path === "/evidence") return E(EvidencePage, { route, model });
  if (path.startsWith("/findings/")) return E(FindingDetailPage, { id: path.split("/")[2], route, model, actions });
  if (path === "/findings") return E(FindingsPage, { route, model });
  if (path.startsWith("/reports/")) return E(ReportDetailPage, { id: path.split("/")[2], route, model });
  if (path === "/reports") return E(ReportsPage, { route, model });
  if (path === "/risks") return E(RisksPage, { route, model });
  if (path === "/vendors") return E(VendorsPage, { route, model });
  if (path === "/integrations") return E(IntegrationsPage, { route, model });
  if (path === "/admin/scopes") return E(ScopesPage, { route, model });
  return E(DashboardPage, { route, model });
}

function Sidebar({ route }) {
  return E(
    "aside",
    { className: "sidebar" },
    E(
      "div",
      { className: "brand" },
      E("div", { className: "brand-mark" }, "CO"),
      E("div", null, E("strong", null, "ComplianceOps"), E("span", null, "Cloud"))
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
            className: route.path === item.path || (item.path !== "/dashboard" && route.path.startsWith(item.path)) ? "nav-link active" : "nav-link",
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
      E("span", { className: "mini-label" }, "Tenant"),
      E("strong", null, "Acme Financial Services"),
      E("span", null, "Production readiness demo")
    )
  );
}

function TopBar({ model, actions }) {
  return E(
    "header",
    { className: "top-bar" },
    E(
      "div",
      { className: "search-box" },
      E("span", null, "Search controls, evidence, findings"),
      E("kbd", null, "/")
    ),
    E(
      "div",
      { className: "top-actions" },
      E("span", { className: "env-pill" }, "Demo tenant"),
      E("button", { className: "ghost-button", onClick: actions.resetScenario }, "Reset scenario"),
      E("div", { className: "avatar" }, model.users["usr-maya"].name.split(" ").map((part) => part[0]).join(""))
    )
  );
}

function DashboardPage({ route, model }) {
  const mfaFinding = model.findingsById["find-mfa-001"];
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Compliance command center",
      title: "Continuous compliance posture",
      description: "Live posture across frameworks, controls, evidence, assessments, and remediation work.",
      actions: [
        E(ActionButton, { key: "monitoring", route, to: "/monitoring", label: "Review failing controls" }),
        E(ActionButton, { key: "report", route, to: "/reports/soc2-readiness-summary", label: "Open SOC 2 report", variant: "secondary" })
      ]
    }),
    E(
      "div",
      { className: "metric-grid" },
      E(MetricCard, { label: "Overall compliance", value: `${model.metrics.overallScore}%`, detail: model.metrics.overallScore > 90 ? "Improved after remediation" : "Down 4 points from failed MFA", tone: model.metrics.overallScore > 90 ? "good" : "warn" }),
      E(MetricCard, { label: "Monitored controls", value: model.metrics.monitoredControls, detail: `${model.metrics.failingChecks} automated checks failing`, tone: "info" }),
      E(MetricCard, { label: "Evidence freshness", value: `${model.metrics.evidenceFreshness}%`, detail: "Current evidence records", tone: "good" }),
      E(MetricCard, { label: "Open findings", value: model.metrics.openFindings, detail: `${model.metrics.highFindings} critical or high`, tone: model.metrics.highFindings ? "danger" : "good" })
    ),
    E(
      "div",
      { className: "dashboard-grid" },
      E(
        Panel,
        { title: "Framework posture", className: "span-7" },
        E(
          "div",
          { className: "posture-list" },
          model.frameworks.map((framework) => E(FrameworkPostureCard, { key: framework.id, framework, route }))
        )
      ),
      E(
        Panel,
        { title: "CCM alert queue", className: "span-5" },
        E(
          "div",
          { className: "alert-card" },
          E("div", { className: "alert-topline" }, E(StatusBadge, { status: model.controlsById["ac-01"].status }), E("span", null, "Okta daily check")),
          E("h3", null, mfaFinding.status === "closed" ? "MFA enforcement verified" : mfaFinding.title),
          E("p", null, mfaFinding.status === "closed" ? "The recheck passed and the finding is closed. Evidence was approved for SOC 2 readiness." : "Automated monitoring converted an Okta signal into evidence, then into a high-severity finding."),
          E(RelationshipChain, null),
          E(ActionButton, { route, to: "/monitoring/rules/rule-mfa", label: "Open rule detail" })
        )
      ),
      E(
        Panel,
        { title: "Assessment lifecycle", className: "span-6" },
        E(AssessmentTimeline, { assessment: model.assessmentsById["assess-soc2-q2"], model, route })
      ),
      E(
        Panel,
        { title: "Findings by severity", className: "span-6" },
        E(SeverityStack, { model }),
        E("div", { className: "table-actions" }, E(ActionButton, { route, to: "/findings", label: "View all findings", variant: "secondary" }))
      )
    )
  );
}

function FrameworksPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Frameworks",
      title: "Normalized framework coverage",
      description: "Frameworks roll up from reusable controls, evidence freshness, and active assessments."
    }),
    E(
      "div",
      { className: "card-grid three" },
      model.frameworks.map((framework) =>
        E(
          "article",
          { className: "surface-card", key: framework.id },
          E("div", { className: "card-kicker" }, framework.version),
          E("h3", null, framework.name),
          E(ScoreRing, { score: framework.postureScore }),
          E("p", null, `${countFrameworkControls(framework)} mapped controls across ${framework.domains.length} domains.`),
          E(ActionButton, { route, to: `/frameworks/${framework.id}`, label: "Open framework" })
        )
      )
    )
  );
}

function FrameworkDetailPage({ id, route, model }) {
  const framework = model.frameworksById[id] || model.frameworksById["soc-2"];
  const controlsForFramework = unique(framework.domains.flatMap((domain) => domain.controlIds)).map((controlId) => model.controlsById[controlId]);
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Frameworks", "/frameworks"], [framework.name]] }),
    E(PageHeader, {
      eyebrow: `${framework.name} ${framework.version}`,
      title: "Framework posture",
      description: "Requirements inherit status from mapped normalized controls and their latest evidence.",
      actions: [E(ActionButton, { key: "assessment", route, to: "/assessments/assess-soc2-q2", label: "Open related assessment" })]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Domain coverage" },
          E(
            "div",
            { className: "domain-list" },
            framework.domains.map((domain) =>
              E(
                "div",
                { className: "domain-row", key: domain.id },
                E("div", null, E("strong", null, domain.name), E("span", null, domain.citation)),
                E("div", { className: "domain-controls" }, domain.controlIds.map((controlId) => E(ControlChip, { key: controlId, control: model.controlsById[controlId], route })))
              )
            )
          )
        ),
        E(
          Panel,
          { title: "Mapped controls" },
          E(
            "div",
            { className: "data-table" },
            E(TableHeader, { columns: ["Control", "Owner", "Status", "Evidence", "Action"] }),
            controlsForFramework.map((control) =>
              E(
                "div",
                { className: "table-row", key: control.id },
                E("div", null, E("strong", null, control.code), E("span", null, control.title)),
                E("div", null, ownerName(model, control.ownerId)),
                E("div", null, E(StatusBadge, { status: control.status })),
                E("div", null, `${control.evidenceIds.length} records`),
                E("div", null, E(InlineLink, { route, to: `/controls/${control.id}`, label: "Open" }))
              )
            )
          )
        )
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Posture" }, E(ScoreRing, { score: framework.postureScore }), E("p", null, "Score combines automated checks, evidence freshness, assessment review, and open findings.")),
        E(Panel, { title: "Traceability" }, E(RelationshipChain, null), E("p", null, "Every requirement links back to controls, evidence, and assessment outcomes."))
      )
    )
  );
}

function ControlsPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Controls library", title: "Reusable normalized controls", description: "Controls map to multiple frameworks and are supported by monitoring rules and evidence." }),
    E(
      Panel,
      { title: "Control catalog" },
      E(
        "div",
        { className: "data-table" },
        E(TableHeader, { columns: ["Control", "Owner", "Status", "Requirements", "Evidence", "Action"] }),
        model.controls.map((control) =>
          E(
            "div",
            { className: "table-row", key: control.id },
            E("div", null, E("strong", null, control.code), E("span", null, control.title)),
            E("div", null, ownerName(model, control.ownerId)),
            E("div", null, E(StatusBadge, { status: control.status })),
            E("div", null, `${control.requirements.length} mappings`),
            E("div", null, `${control.evidenceIds.length} records`),
            E("div", null, E(InlineLink, { route, to: `/controls/${control.id}`, label: "Open" }))
          )
        )
      )
    )
  );
}

function ControlDetailPage({ id, route, model }) {
  const control = model.controlsById[id] || model.controlsById["ac-01"];
  const owner = model.users[control.ownerId];
  const relatedEvidence = control.evidenceIds.map((evidenceId) => model.evidenceById[evidenceId]).filter(Boolean);
  const relatedFindings = control.findingIds.map((findingId) => model.findingsById[findingId]).filter(Boolean);
  const relatedRules = control.ruleIds.map((ruleId) => model.rulesById[ruleId]).filter(Boolean);

  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Controls", "/controls"], [control.code]] }),
    E(PageHeader, {
      eyebrow: "Control detail",
      title: `${control.code}: ${control.title}`,
      description: control.description,
      actions: [
        E(ActionButton, { key: "evidence", route, to: `/evidence/${relatedEvidence[0]?.id || "ev-okta-mfa"}`, label: "View latest evidence" }),
        E(ActionButton, { key: "finding", route, to: `/findings/${relatedFindings[0]?.id || "find-mfa-001"}`, label: "Open finding", variant: "secondary" })
      ]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Control status and mappings" },
          E("div", { className: "control-hero" }, E(StatusBadge, { status: control.status }), E("div", null, E("strong", null, owner.name), E("span", null, owner.role))),
          E("div", { className: "tag-list" }, control.requirements.map((item) => E("span", { className: "tag", key: item }, item))),
          E(RelationshipChain, null)
        ),
        E(
          Panel,
          { title: "Monitoring rules" },
          relatedRules.map((rule) =>
            E(
              "div",
              { className: "linked-row", key: rule.id },
              E("div", null, E("strong", null, rule.code), E("span", null, rule.name)),
              E(StatusBadge, { status: rule.status }),
              E(InlineLink, { route, to: `/monitoring/rules/${rule.id}`, label: "Open" })
            )
          )
        ),
        E(
          Panel,
          { title: "Evidence and findings" },
          relatedEvidence.map((record) => E(EvidenceMiniCard, { key: record.id, record, route })),
          relatedFindings.map((finding) => E(FindingMiniCard, { key: finding.id, finding, model, route }))
        )
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Assessment impact" }, E("strong", null, "SOC 2 Readiness Q2"), E("p", null, control.status === "passing" ? "Remediated. Assessment progress improved to 81 percent." : "Blocking sign-off. Assessment progress is 72 percent."), E(ActionButton, { route, to: "/assessments/assess-soc2-q2", label: "Open assessment", variant: "secondary" })),
        E(Panel, { title: "Scopes" }, control.scopeIds.map((scopeId) => E("div", { className: "scope-pill", key: scopeId }, model.scopes[scopeId].name)))
      )
    )
  );
}

function AssessmentsPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Assessments", title: "Assessment lifecycle", description: "Scope, questionnaire, control evaluation, evidence review, findings, and sign-off." }),
    E(
      "div",
      { className: "card-grid three" },
      model.assessments.map((assessment) => E(AssessmentCard, { key: assessment.id, assessment, model, route }))
    )
  );
}

function AssessmentDetailPage({ id, route, model }) {
  const assessment = model.assessmentsById[id] || model.assessmentsById["assess-soc2-q2"];
  const framework = model.frameworksById[assessment.frameworkId];
  const relatedFindings = assessment.findingIds.map((findingId) => model.findingsById[findingId]).filter(Boolean);
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Assessments", "/assessments"], [assessment.name]] }),
    E(PageHeader, {
      eyebrow: "Assessment detail",
      title: assessment.name,
      description: `${framework.name} assessment across ${assessment.scopeIds.map((scopeId) => model.scopes[scopeId].name).join(", ")}.`,
      actions: [E(ActionButton, { key: "report", route, to: "/reports/soc2-readiness-summary", label: "Preview report" })]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(Panel, { title: "Lifecycle" }, E(AssessmentTimeline, { assessment, model, route })),
        E(
          Panel,
          { title: "Control evaluation" },
          assessment.controlIds.map((controlId) => E(ControlStatusRow, { key: controlId, control: model.controlsById[controlId], route, model }))
        ),
        E(
          Panel,
          { title: "Blocking findings" },
          relatedFindings.map((finding) => E(FindingMiniCard, { key: finding.id, finding, model, route }))
        )
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Progress" }, E(ProgressBar, { value: assessment.progressPercent }), E("p", null, `${assessment.progressPercent}% complete. Due ${assessment.dueDate}.`)),
        E(Panel, { title: "Scope" }, assessment.scopeIds.map((scopeId) => E("div", { className: "scope-pill", key: scopeId }, model.scopes[scopeId].name)))
      )
    )
  );
}

function MonitoringPage({ route, model, actions, demo }) {
  const visibleRules = demo.ruleFilter === "all" ? model.rules : model.rules.filter((rule) => rule.status === demo.ruleFilter);
  return E(
    "section",
    null,
    E(PageHeader, {
      eyebrow: "Continuous Compliance Monitoring",
      title: "Automated control monitoring",
      description: "Signals from connected systems become evidence, control outcomes, findings, and framework posture.",
      actions: [E(ActionButton, { key: "mfa", route, to: "/monitoring/rules/rule-mfa", label: "Open MFA rule" })]
    }),
    E(
      "div",
      { className: "monitoring-grid" },
      integrations.map((integration) => E(IntegrationHealthCard, { key: integration.id, integration }))
    ),
    E(
      "div",
      { className: "dashboard-grid" },
      E(
        Panel,
        { title: "Monitoring rules", className: "span-7" },
        E(FilterBar, { value: demo.ruleFilter, onChange: actions.setRuleFilter }),
        E(
          "div",
          { className: "data-table" },
          E(TableHeader, { columns: ["Rule", "Source", "Control", "Status", "Last run", "Action"] }),
          visibleRules.map((rule) =>
            E(
              "div",
              { className: "table-row", key: rule.id },
              E("div", null, E("strong", null, rule.code), E("span", null, rule.name)),
              E("div", null, model.integrationsById[rule.integrationId].name),
              E("div", null, model.controlsById[rule.controlId].code),
              E("div", null, E(StatusBadge, { status: rule.status })),
              E("div", null, rule.lastRunAt),
              E("div", null, E(InlineLink, { route, to: `/monitoring/rules/${rule.id}`, label: "Open" }))
            )
          )
        )
      ),
      E(
        Panel,
        { title: "Signal stream", className: "span-5" },
        model.signals.map((signal) => E(SignalMiniCard, { key: signal.id, signal, model, route })),
        E("div", { className: "table-actions" }, E(ActionButton, { route, to: "/evidence/ev-okta-mfa", label: "Trace Okta evidence", variant: "secondary" }))
      ),
      E(
        Panel,
        { title: "Control impact", className: "span-12" },
        E(RelationshipChain, null),
        E("p", null, "The MFA rule feeds AC-01. AC-01 maps to SOC 2, ISO 27001, and NIST CSF, so one failed identity signal can affect assessment readiness and executive posture.")
      )
    )
  );
}

function RuleDetailPage({ id, route, model }) {
  const rule = model.rulesById[id] || model.rulesById["rule-mfa"];
  const control = model.controlsById[rule.controlId];
  const integration = model.integrationsById[rule.integrationId];
  const ruleSignals = model.signals.filter((signal) => signal.ruleId === rule.id);
  const ruleEvidence = model.evidence.filter((record) => record.controlIds.includes(control.id));
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Monitoring", "/monitoring"], [rule.code]] }),
    E(PageHeader, {
      eyebrow: "Monitoring rule",
      title: rule.name,
      description: rule.description,
      actions: [E(ActionButton, { key: "control", route, to: `/controls/${control.id}`, label: "Open linked control" })]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Rule evaluation" },
          E("div", { className: "summary-grid" },
            E(SummaryItem, { label: "Source", value: integration.name }),
            E(SummaryItem, { label: "Frequency", value: rule.frequency }),
            E(SummaryItem, { label: "Last run", value: rule.lastRunAt }),
            E("div", { className: "summary-item" }, E("span", null, "Status"), E(StatusBadge, { status: rule.status }))
          ),
          E("p", null, rule.lastResultSummary)
        ),
        E(Panel, { title: "Latest signals" }, ruleSignals.map((signal) => E(SignalMiniCard, { key: signal.id, signal, model, route }))),
        E(Panel, { title: "Generated evidence" }, ruleEvidence.map((record) => E(EvidenceMiniCard, { key: record.id, record, route })))
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Linked control" }, E("strong", null, `${control.code}: ${control.title}`), E("p", null, control.description), E(StatusBadge, { status: control.status })),
        E(Panel, { title: "Framework impact" }, control.requirements.map((req) => E("div", { className: "scope-pill", key: req }, req)))
      )
    )
  );
}

function SignalDetailPage({ id, route, model }) {
  const signal = model.signalsById[id] || model.signalsById["sig-okta-2026-05-30-0915"];
  const rule = model.rulesById[signal.ruleId];
  const integration = model.integrationsById[signal.integrationId];
  const record = model.evidenceById[signal.evidenceId];
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Monitoring", "/monitoring"], [rule.code, `/monitoring/rules/${rule.id}`], [signal.type]] }),
    E(PageHeader, { eyebrow: "Signal detail", title: signal.type, description: signal.summary, actions: [E(ActionButton, { key: "evidence", route, to: `/evidence/${record.id}`, label: "Open generated evidence" })] }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Source signal" },
          E("div", { className: "summary-grid" },
            E(SummaryItem, { label: "Source", value: integration.name }),
            E(SummaryItem, { label: "Received", value: signal.receivedAt }),
            E(SummaryItem, { label: "Rule", value: rule.code }),
            E("div", { className: "summary-item" }, E("span", null, "Result"), E(StatusBadge, { status: signal.result }))
          ),
          E("h3", null, "Affected entities"),
          E("div", { className: "tag-list" }, signal.affectedEntities.map((entity) => E("span", { className: "tag", key: entity }, entity)))
        )
      ),
      E("aside", { className: "detail-side" }, E(Panel, { title: "Generated evidence" }, E(EvidenceMiniCard, { record, route })), E(Panel, { title: "Trace chain" }, E(RelationshipChain, null)))
    )
  );
}

function EvidencePage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Evidence", title: "Evidence inventory", description: "Manual and automated evidence records with source, freshness, reviewer state, and control mappings." }),
    E(
      Panel,
      { title: "Evidence records" },
      E(
        "div",
        { className: "data-table" },
        E(TableHeader, { columns: ["Evidence", "Source", "Freshness", "Reviewer", "Controls", "Action"] }),
        model.evidence.map((record) =>
          E(
            "div",
            { className: "table-row", key: record.id },
            E("div", null, E("strong", null, record.title), E("span", null, record.collectedAt)),
            E("div", null, record.source),
            E("div", null, E(StatusBadge, { status: record.freshness })),
            E("div", null, E(StatusBadge, { status: record.reviewerStatus })),
            E("div", null, record.controlIds.map((controlId) => model.controlsById[controlId].code).join(", ")),
            E("div", null, E(InlineLink, { route, to: `/evidence/${record.id}`, label: "Open" }))
          )
        )
      )
    )
  );
}

function EvidenceDetailPage({ id, route, model }) {
  const record = model.evidenceById[id] || model.evidenceById["ev-okta-mfa"];
  const linkedFinding = model.findings.find((finding) => finding.evidenceId === record.id);
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Evidence", "/evidence"], [record.title]] }),
    E(PageHeader, {
      eyebrow: "Evidence detail",
      title: record.title,
      description: "Evidence is a structured record with source lineage, freshness, reviewer state, and downstream control impact.",
      actions: [E(ActionButton, { key: "finding", route, to: `/findings/${linkedFinding?.id || "find-mfa-001"}`, label: linkedFinding ? "Open finding" : "Create finding" })]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Evidence metadata" },
          E("div", { className: "summary-grid" },
            E(SummaryItem, { label: "Source", value: record.source }),
            E(SummaryItem, { label: "Collection", value: record.method }),
            E(SummaryItem, { label: "Collected", value: record.collectedAt }),
            E("div", { className: "summary-item" }, E("span", null, "Freshness"), E(StatusBadge, { status: record.freshness })),
            E("div", { className: "summary-item" }, E("span", null, "Reviewer"), E(StatusBadge, { status: record.reviewerStatus }))
          )
        ),
        E(
          Panel,
          { title: "Evidence preview" },
          E(
            "div",
            { className: "preview-table" },
            record.preview.map((row, index) => E("div", { className: "preview-row", key: index }, row.map((cell) => E("span", { key: cell }, cell))))
          )
        )
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Linked controls" }, record.controlIds.map((controlId) => E(ControlChip, { key: controlId, control: model.controlsById[controlId], route }))),
        E(Panel, { title: "Linked frameworks" }, record.frameworkIds.map((frameworkId) => E("div", { className: "scope-pill", key: frameworkId }, model.frameworksById[frameworkId].name))),
        E(Panel, { title: "Trace chain" }, E(RelationshipChain, null))
      )
    )
  );
}

function FindingsPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Findings", title: "Remediation work queue", description: "Findings turn assessment gaps and automated failures into owned remediation work." }),
    E(
      Panel,
      { title: "Findings" },
      E(
        "div",
        { className: "data-table" },
        E(TableHeader, { columns: ["Finding", "Severity", "Status", "Owner", "Due", "Action"] }),
        model.findings.map((finding) =>
          E(
            "div",
            { className: "table-row", key: finding.id },
            E("div", null, E("strong", null, finding.title), E("span", null, finding.source)),
            E("div", null, E(SeverityBadge, { severity: finding.severity })),
            E("div", null, E(StatusBadge, { status: finding.status })),
            E("div", null, ownerName(model, finding.ownerId)),
            E("div", null, finding.dueDate),
            E("div", null, E(InlineLink, { route, to: `/findings/${finding.id}`, label: "Open" }))
          )
        )
      )
    )
  );
}

function FindingDetailPage({ id, route, model, actions }) {
  const finding = model.findingsById[id] || model.findingsById["find-mfa-001"];
  const control = model.controlsById[finding.controlId];
  const record = model.evidenceById[finding.evidenceId];
  const task = finding.remediationTaskId ? model.tasksById[finding.remediationTaskId] : null;
  const isMfa = finding.id === "find-mfa-001";
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Findings", "/findings"], [finding.title]] }),
    E(PageHeader, {
      eyebrow: "Finding detail",
      title: finding.title,
      description: finding.summary,
      actions: [
        E(ActionButton, { key: "control", route, to: `/controls/${control.id}`, label: "Open control" }),
        E(ActionButton, { key: "report", route, to: "/reports/soc2-readiness-summary", label: "View report", variant: "secondary" })
      ]
    }),
    E(
      "div",
      { className: "detail-layout" },
      E(
        "div",
        { className: "detail-main" },
        E(
          Panel,
          { title: "Finding status" },
          E("div", { className: "control-hero" }, E(SeverityBadge, { severity: finding.severity }), E(StatusBadge, { status: finding.status }), E("div", null, E("strong", null, ownerName(model, finding.ownerId)), E("span", null, `Due ${finding.dueDate}`))),
          E("p", null, "Source: ", finding.source)
        ),
        task && E(
          Panel,
          { title: "Remediation workflow" },
          E("div", { className: "summary-grid" },
            E(SummaryItem, { label: "Task", value: `${task.system} ${task.externalKey || ""}`.trim() }),
            E(SummaryItem, { label: "Owner", value: ownerName(model, task.ownerId) }),
            E(SummaryItem, { label: "Due", value: task.dueDate }),
            E("div", { className: "summary-item" }, E("span", null, "Task status"), E(StatusBadge, { status: task.status }))
          ),
          isMfa
            ? E(
                "div",
                { className: "workflow-actions" },
                E("button", { className: "primary-button", onClick: () => actions.moveFinding("in_progress"), disabled: finding.status === "closed" }, "Move to in progress"),
                E("button", { className: "secondary-button", onClick: actions.markReady, disabled: finding.status === "closed" }, "Mark ready for review"),
                E("button", { className: "primary-button", onClick: actions.runRecheck, disabled: finding.status !== "ready_for_review" }, "Run simulated recheck")
              )
            : E("p", null, "This remediation is tracked externally and shown here as a linked workflow.")
        ),
        E(Panel, { title: "Linked evidence" }, E(EvidenceMiniCard, { record, route }))
      ),
      E(
        "aside",
        { className: "detail-side" },
        E(Panel, { title: "Linked control" }, E("strong", null, `${control.code}: ${control.title}`), E("p", null, control.description), E(StatusBadge, { status: control.status })),
        E(Panel, { title: "Activity timeline" }, E(Timeline, { items: timelineForFinding(finding.status) }))
      )
    )
  );
}

function ReportsPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Reports", title: "Audit-ready reporting", description: "Reports are generated from evidence, control status, assessment progress, findings, and framework mappings." }),
    E(
      "div",
      { className: "card-grid two" },
      model.reports.map((report) =>
        E(
          "article",
          { className: "surface-card", key: report.id },
          E("div", { className: "card-kicker" }, report.type),
          E("h3", null, report.name),
          E("p", null, report.summary),
          E("span", { className: "mini-label" }, `Generated ${report.generatedAt}`),
          E(ActionButton, { route, to: `/reports/${report.id}`, label: "Open report" })
        )
      )
    )
  );
}

function ReportDetailPage({ id, route, model }) {
  const report = model.reportsById[id] || model.reportsById["soc2-readiness-summary"];
  const framework = report.frameworkId ? model.frameworksById[report.frameworkId] : model.frameworksById["soc-2"];
  const openFindings = model.findings.filter((finding) => finding.status !== "closed");
  return E(
    "section",
    null,
    E(Breadcrumbs, { route, items: [["Reports", "/reports"], [report.name]] }),
    E(PageHeader, { eyebrow: report.type, title: report.name, description: report.summary }),
    E(
      "div",
      { className: "dashboard-grid" },
      E(Panel, { title: "Executive summary", className: "span-6" }, E("p", null, framework.name, " is at ", framework.postureScore, "% posture. Automated evidence is current for ", model.metrics.evidenceFreshness, "% of sampled records. ", model.metrics.openFindings, " findings remain open."), E(RelationshipChain, null)),
      E(Panel, { title: "Framework posture", className: "span-6" }, E(ScoreRing, { score: framework.postureScore }), E("p", null, "Generated from mapped controls and latest evidence.")),
      E(
        Panel,
        { title: "Control status by domain", className: "span-6" },
        framework.domains.map((domain) =>
          E(
            "div",
            { className: "domain-row", key: domain.id },
            E("div", null, E("strong", null, domain.name), E("span", null, domain.citation)),
            E(
              "div",
              { className: "domain-controls" },
              domain.controlIds.map((controlId) => E(ControlChip, { key: controlId, control: model.controlsById[controlId], route }))
            )
          )
        )
      ),
      E(Panel, { title: "Open findings", className: "span-6" }, openFindings.map((finding) => E(FindingMiniCard, { key: finding.id, finding, model, route })))
    )
  );
}

function IntegrationsPage() {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Integrations", title: "Connected evidence sources", description: "Each connected system emits signals that monitoring rules evaluate into evidence and control outcomes." }),
    E("div", { className: "monitoring-grid" }, integrations.map((integration) => E(IntegrationHealthCard, { key: integration.id, integration, expanded: true })))
  );
}

function RisksPage({ route, model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Risks", title: "Risk register", description: "Findings and accepted exceptions can escalate into owned risk treatment plans." }),
    E(
      Panel,
      { title: "Risks" },
      E(
        "div",
        { className: "data-table" },
        E(TableHeader, { columns: ["Risk", "Owner", "Inherent", "Residual", "Treatment", "Linked controls"] }),
        model.risks.map((risk) =>
          E("div", { className: "table-row", key: risk.id }, E("div", null, E("strong", null, risk.title), E("span", null, `${risk.linkedFindingIds.length} linked findings`)), E("div", null, ownerName(model, risk.ownerId)), E("div", null, risk.inherentScore), E("div", null, risk.residualScore), E("div", null, risk.treatment), E("div", null, risk.linkedControlIds.map((id) => model.controlsById[id]?.code).filter(Boolean).join(", ") || "None"))
        )
      )
    )
  );
}

function VendorsPage({ model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Third Party Risk", title: "Vendor assessment pipeline", description: "A future TPRM module for onboarding, questionnaires, evidence requests, and periodic reassessment." }),
    E(
      Panel,
      { title: "Vendors" },
      E(
        "div",
        { className: "data-table" },
        E(TableHeader, { columns: ["Vendor", "Criticality", "Assessment", "Owner", "Next review", "Scope"] }),
        model.vendors.map((vendor) =>
          E("div", { className: "table-row", key: vendor.id }, E("div", null, E("strong", null, vendor.name), E("span", null, "External partner")), E("div", null, E(SeverityBadge, { severity: vendor.criticality })), E("div", null, readable(vendor.assessmentStatus)), E("div", null, ownerName(model, vendor.ownerId)), E("div", null, vendor.nextReviewDate), E("div", null, "Vendor Operations"))
        )
      )
    )
  );
}

function ScopesPage({ model }) {
  return E(
    "section",
    null,
    E(PageHeader, { eyebrow: "Admin", title: "Organization scopes", description: "Scopes define what assessments and controls are evaluated against: business units, applications, infrastructure, processes, and vendors." }),
    E(
      "div",
      { className: "card-grid two" },
      Object.values(model.scopes).map((scope) =>
        E("article", { className: "surface-card", key: scope.id }, E("div", { className: "card-kicker" }, scope.type), E("h3", null, scope.name), E("p", null, `Owner: ${ownerName(model, scope.ownerId)}`), E("p", null, "Used for assessment scoping, control ownership, evidence attribution, and reporting filters."))
      )
    )
  );
}

function PageHeader({ eyebrow, title, description, actions = [] }) {
  return E(
    "div",
    { className: "page-header" },
    E("div", null, E("span", { className: "eyebrow" }, eyebrow), E("h1", null, title), E("p", null, description)),
    actions.length ? E("div", { className: "page-actions" }, actions) : null
  );
}

function Panel({ title, className = "", children }) {
  return E("section", { className: `panel ${className}`.trim() }, title ? E("div", { className: "panel-header" }, E("h2", null, title)) : null, children);
}

function MetricCard({ label, value, detail, tone = "info" }) {
  return E("article", { className: `metric-card ${tone}` }, E("span", null, label), E("strong", null, value), E("p", null, detail));
}

function FrameworkPostureCard({ framework, route }) {
  return E(
    "article",
    { className: "posture-card" },
    E("div", null, E("strong", null, framework.name), E("span", null, framework.version)),
    E(ProgressBar, { value: framework.postureScore }),
    E("span", { className: "posture-score" }, `${framework.postureScore}%`),
    E(InlineLink, { route, to: `/frameworks/${framework.id}`, label: "Open" })
  );
}

function AssessmentCard({ assessment, model, route }) {
  return E(
    "article",
    { className: "surface-card" },
    E("div", { className: "card-kicker" }, model.frameworksById[assessment.frameworkId].name),
    E("h3", null, assessment.name),
    E(ProgressBar, { value: assessment.progressPercent }),
    E("p", null, `${assessment.status}. Due ${assessment.dueDate}.`),
    E(ActionButton, { route, to: `/assessments/${assessment.id}`, label: "Open assessment" })
  );
}

function StatusBadge({ status }) {
  return E("span", { className: `badge status-${status}` }, statusLabels[status] || readable(status));
}

function SeverityBadge({ severity }) {
  return E("span", { className: `badge severity-${severity}` }, readable(severity));
}

function ProgressBar({ value }) {
  return E("div", { className: "progress", "aria-label": `${value}%` }, E("span", { style: { width: `${value}%` } }));
}

function ScoreRing({ score }) {
  return E("div", { className: "score-ring", style: { "--score": `${score * 3.6}deg` } }, E("strong", null, `${score}%`), E("span", null, "posture"));
}

function RelationshipChain() {
  return E(
    "div",
    { className: "chain" },
    ["Signal", "Evidence", "Control", "Assessment", "Framework", "Compliance Status"].map((item) => E("span", { key: item }, item))
  );
}

function ActionButton({ route, to, label, variant = "primary" }) {
  return E("a", { href: to, className: `${variant}-button`, onClick: linkTo(route, to) }, label);
}

function InlineLink({ route, to, label }) {
  return E("a", { href: to, className: "inline-link", onClick: linkTo(route, to) }, label);
}

function linkTo(route, to) {
  return (event) => {
    event.preventDefault();
    route.navigate(to);
  };
}

function Breadcrumbs({ route, items }) {
  return E(
    "div",
    { className: "breadcrumbs" },
    E(InlineLink, { route, to: "/dashboard", label: "Dashboard" }),
    items.map((item, index) => {
      const [label, to] = Array.isArray(item) ? item : [item];
      return E("span", { key: `${label}-${index}` }, "/", to ? E(InlineLink, { route, to, label }) : E("strong", null, label));
    })
  );
}

function TableHeader({ columns }) {
  return E("div", { className: "table-row table-header-row" }, columns.map((column) => E("div", { key: column }, column)));
}

function ControlChip({ control, route }) {
  return E("a", { href: `/controls/${control.id}`, onClick: linkTo(route, `/controls/${control.id}`), className: `control-chip ${control.status}` }, E("strong", null, control.code), E(StatusBadge, { status: control.status }));
}

function ControlStatusRow({ control, route, model }) {
  return E(
    "div",
    { className: "linked-row" },
    E("div", null, E("strong", null, `${control.code}: ${control.title}`), E("span", null, ownerName(model, control.ownerId))),
    E(StatusBadge, { status: control.status }),
    E(InlineLink, { route, to: `/controls/${control.id}`, label: "Open" })
  );
}

function EvidenceMiniCard({ record, route }) {
  return E(
    "div",
    { className: "mini-card" },
    E("div", null, E("strong", null, record.title), E("span", null, `${record.source} - ${record.collectedAt}`)),
    E("div", { className: "mini-card-actions" }, E(StatusBadge, { status: record.freshness }), E(InlineLink, { route, to: `/evidence/${record.id}`, label: "Open" }))
  );
}

function FindingMiniCard({ finding, model, route }) {
  return E(
    "div",
    { className: "mini-card" },
    E("div", null, E("strong", null, finding.title), E("span", null, `${ownerName(model, finding.ownerId)} - due ${finding.dueDate}`)),
    E("div", { className: "mini-card-actions" }, E(SeverityBadge, { severity: finding.severity }), E(StatusBadge, { status: finding.status }), E(InlineLink, { route, to: `/findings/${finding.id}`, label: "Open" }))
  );
}

function SignalMiniCard({ signal, model, route }) {
  const integration = model.integrationsById[signal.integrationId];
  const rule = model.rulesById[signal.ruleId];
  return E(
    "div",
    { className: "mini-card" },
    E("div", null, E("strong", null, signal.type), E("span", null, `${integration.name} - ${signal.receivedAt} - ${rule.code}`)),
    E("div", { className: "mini-card-actions" }, E(StatusBadge, { status: signal.result }), E(InlineLink, { route, to: `/monitoring/signals/${signal.id}`, label: "Open" }))
  );
}

function IntegrationHealthCard({ integration, expanded = false }) {
  return E(
    "article",
    { className: "integration-card" },
    E("div", null, E("strong", null, integration.name), E("span", null, integration.provider)),
    E(StatusBadge, { status: integration.status }),
    E("p", null, `Last sync ${integration.lastSyncAt}`),
    expanded ? E("div", { className: "summary-grid compact" }, E(SummaryItem, { label: "Controls covered", value: integration.controlsCovered }), E(SummaryItem, { label: "Evidence generated", value: integration.evidenceGenerated })) : null
  );
}

function FilterBar({ value, onChange }) {
  const options = [
    ["all", "All"],
    ["failing", "Failing"],
    ["needs_review", "Needs review"],
    ["passing", "Passing"]
  ];
  return E(
    "div",
    { className: "filter-bar" },
    options.map(([id, label]) => E("button", { key: id, className: value === id ? "filter-pill active" : "filter-pill", onClick: () => onChange(id) }, label))
  );
}

function AssessmentTimeline({ assessment, model, route }) {
  const steps = [
    { label: "Created", status: "done" },
    { label: "Scope set", status: "done" },
    { label: "Questionnaire", status: "done" },
    { label: "Control review", status: assessment.progressPercent > 75 ? "done" : "active" },
    { label: "Evidence review", status: assessment.progressPercent > 75 ? "active" : "todo" },
    { label: "Sign-off", status: "todo" }
  ];
  return E(
    "div",
    null,
    E("div", { className: "timeline-steps" }, steps.map((step) => E("div", { className: `timeline-step ${step.status}`, key: step.label }, E("span", null), E("strong", null, step.label)))),
    E("p", null, `${assessment.name} is ${assessment.progressPercent}% complete and due ${assessment.dueDate}.`),
    E(ActionButton, { route, to: `/assessments/${assessment.id}`, label: "Open assessment", variant: "secondary" })
  );
}

function SeverityStack({ model }) {
  const counts = model.findings.reduce((acc, finding) => {
    if (finding.status !== "closed") acc[finding.severity] = (acc[finding.severity] || 0) + 1;
    return acc;
  }, {});
  return E(
    "div",
    { className: "severity-stack" },
    ["critical", "high", "medium", "low"].map((severity) => E("div", { className: "severity-row", key: severity }, E(SeverityBadge, { severity }), E("strong", null, counts[severity] || 0)))
  );
}

function Timeline({ items }) {
  return E("div", { className: "activity-timeline" }, items.map((item) => E("div", { className: "activity-item", key: item.title }, E("strong", null, item.title), E("span", null, item.detail))));
}

function SummaryItem({ label, value }) {
  return E("div", { className: "summary-item" }, E("span", null, label), E("strong", null, value));
}

function ownerName(model, ownerId) {
  return model.users[ownerId]?.name || "Unassigned";
}

function readable(value) {
  return String(value || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function unique(items) {
  return Array.from(new Set(items));
}

function countFrameworkControls(framework) {
  return unique(framework.domains.flatMap((domain) => domain.controlIds)).length;
}

function timelineForFinding(status) {
  const base = [
    { title: "Detected by Okta monitoring", detail: "Today 09:15" },
    { title: "Evidence generated", detail: "Okta MFA enforcement snapshot" },
    { title: "Finding created", detail: "Assigned to IT Operations" }
  ];
  if (status === "in_progress") return [...base, { title: "Remediation started", detail: "Jira SEC-1842 moved to in progress" }];
  if (status === "ready_for_review") return [...base, { title: "Ready for review", detail: "Owner requested automated recheck" }];
  if (status === "closed") return [...base, { title: "Recheck passed", detail: "All active users have enforced MFA" }, { title: "Finding closed", detail: "Evidence approved for audit trail" }];
  return base;
}

ReactDOM.createRoot(document.getElementById("root")).render(E(App));
