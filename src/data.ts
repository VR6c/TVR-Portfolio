export type TestCategory = 'Positive' | 'Negative' | 'Boundary Value / Edge Case' | 'Mobile Interrupt';
export type TestStatus = 'PASS' | 'FAIL' | 'BLOCKED';

export interface TestCase {
  id: string;
  module: string;
  objective: string;
  preconditions: string;
  steps: string[];
  expected: string;
  actual: string;
  status: TestStatus;
  category: TestCategory;
}

export const skills = [
  'Functional & regression testing',
  'iOS TestFlight verification',
  'Boundary value analysis',
  'Equivalence partitioning',
  'Defect lifecycle & triage',
  'Requirements traceability',
  'Mobile interrupt testing',
  'REST API validation · Postman',
];

export const stack = ['Laravel', 'React', 'React Native', 'Python', 'FastAPI', 'OpenCV', 'YOLOv8', 'Tailwind CSS', 'MongoDB', 'MySQL', 'VirtualBox / VMware Workstation', 'MikroTik CHR'];

export const projects = [
  {
    id: 'mobile',
    index: '01',
    label: 'Mobile · TestFlight',
    title: 'HR & Attendance App',
    product: 'CheckinMe · iOS v2.5.5 → v2.5.7',
    description: 'End-to-end verification of employee benefits, learning, analytics, and a Firebase notification migration across production-bound iOS builds.',
    scope: ['BenefitMe rewards', 'AI Mentor', 'Employee Analysis', 'Firebase push migration'],
    highlight: 'Interrupted the app at the moments that matter: backgrounded, foregrounded, and locked. Signed off regression builds and re-verified hotfixes.',
    accent: 'mint',
    metric: '03 builds',
  },
  {
    id: 'reports',
    index: '02',
    label: 'Rules · Reporting',
    title: 'Task & Monthly Reports',
    product: 'Personal task ownership · Export engine',
    description: 'Validated owner-only task permissions, month-boundary filtering, and scheduled report output against business rules.',
    scope: ['Manage Only Owner Tasks', 'Monthly report generation', 'Cross-month deduplication', 'Boundary date ranges'],
    highlight: 'Probed the June → July cutoff and last-second timestamps to catch timezone leakage and duplicate records between monthly exports.',
    accent: 'blue',
    metric: '100% coverage',
  },
  {
    id: 'music',
    index: '03',
    label: 'Shift-left · SRS',
    title: 'Music Platform',
    product: 'SETEC MIS SU20 · Laravel API + React SPA',
    description: 'Authored pre-implementation requirements and acceptance criteria for Producer profiles, subscription entitlements, premium downloads, and billing-plan transitions.',
    scope: ['Producer profile data integrity', '1-Week / 1-Month / 1-Year plans', 'Expiry and renewal boundaries', 'Unauthorized download blocks'],
    highlight: 'Applied shift-left QA: checked business rules and state transitions against the SRS before code implementation, including exact subscription expiry behavior.',
    accent: 'violet',
    metric: '03 plan tiers',
  },
  {
    id: 'anpr',
    index: '04',
    label: 'Vision · ANPR',
    title: 'ANPR Car Wash',
    product: 'SETEC MIS SU20 · FastAPI + OpenCV + YOLOv8',
    description: 'Specified and validated an automated license-plate recognition workflow that connects image confidence handling to real-time Telegram Bot service notifications.',
    scope: ['Blurry and angled plate samples', 'Lighting variations', 'Confidence < 0.65 fallback', 'Telegram webhook delivery'],
    highlight: 'Keep uncertain plate reads out of automatic acceptance: return a safe fallback, flag manual review, and verify the notification handoff.',
    accent: 'blue',
    metric: '0.65 review gate',
  },
  {
    id: 'lab',
    index: '05',
    label: 'Network · QA Lab',
    title: 'VPN & Network Lab',
    product: 'SETEC Institute · MikroTik CHR',
    description: 'Built isolated validation nodes and reproducible test environments for operating-system and network-tunnel validation checks.',
    scope: ['VirtualBox + VMware Workstation', 'Windows 10 · macOS · Linux', 'L2TP · PPTP · Site-to-Site IPsec', 'DNS & Domain Setup · reak.edu'],
    highlight: 'Validate tunnel handshake, encryption policy, and packet routing between virtual routers; keep the multi-OS test environment isolated and locally addressable.',
    accent: 'violet',
    metric: 'Multi-OS & VPN',
  },
];

export interface RepositoryProject {
  id: string;
  repository: string;
  owner: string;
  title: string;
  stack: string;
  summary: string;
  tags: string[];
  url: string;
  accent: 'mint' | 'blue' | 'violet';
  note?: string;
}

export const githubProjects: RepositoryProject[] = [
  {
    id: 'ecommers-laravel', repository: 'E-commers-laravel', owner: 'VR6c',
    title: 'Multi-vendor commerce platform', stack: 'Laravel 10 · PHP 8.1+',
    summary: 'Customer APIs cover accounts, catalog, checkout, orders, and wishlists; the web routes include administration and vendor portals.',
    tags: ['REST API', 'Catalog & checkout', 'Admin / vendor'],
    url: 'https://github.com/VR6c/E-commers-laravel', accent: 'mint',
  },
  {
    id: 'flutter-e-commerce', repository: 'flutter_e_commerce', owner: 'VR6c',
    title: 'TVR E-Commerce App', stack: 'Flutter · Dart · Riverpod · GoRouter',
    summary: 'Group SU20 Final Year 4 e-commerce capstone documented as a Flutter client for a Laravel REST API, with catalog, cart/checkout, orders, and profile flows.',
    tags: ['Mobile app', 'Laravel REST API', 'Group SU20'],
    url: 'https://github.com/VR6c/flutter_e_commerce', accent: 'blue',
    note: 'The README lists Thary Vireak in the group roster; it does not specify individual responsibilities.',
  },
  {
    id: 'java-final-y4', repository: 'Java-Final-Y4', owner: 'VR6c',
    title: 'School & commerce API', stack: 'Java 21 · Spring Boot 3.4 · PostgreSQL',
    summary: 'REST API modules for school management and e-commerce. The README and source tree document JWT authentication, OTP workflows, caching, activity logs, and OpenAPI documentation.',
    tags: ['Spring Security', 'JWT / OTP', 'Audit & OpenAPI'],
    url: 'https://github.com/VR6c/Java-Final-Y4', accent: 'violet',
  },
  {
    id: 'service-system', repository: 'Service-System', owner: 'VR6c',
    title: 'Automotive service management', stack: 'React 19 · TypeScript · Express · MongoDB',
    summary: 'Automotive aftersales workflows for BYD and DENZA. The SRS and source cover quotations, receipts, customer/vehicle views, reporting, and administration.',
    tags: ['SRS-backed workflows', 'Quote → receipt', 'MongoDB API'],
    url: 'https://github.com/VR6c/Service-System', accent: 'blue',
  },
  {
    id: 'order-lunch', repository: 'Order_Lunch', owner: 'Phanit009',
    title: 'Staff lunch ordering system', stack: 'Node.js · Express · Telegraf · React/Vite',
    summary: 'A Telegram-based staff ordering flow paired with a web admin dashboard for staff and manual orders, plus branch-filtered reporting.',
    tags: ['Telegram bot', 'Admin dashboard', 'Branch reports'],
    url: 'https://github.com/Phanit009/Order_Lunch', accent: 'mint',
  },
];

export const testCases: TestCase[] = [
  {
    id: 'TC-BFM-001', module: 'BenefitMe', category: 'Positive', status: 'PASS',
    objective: 'Redeem an eligible reward once and confirm the points balance is reconciled.',
    preconditions: 'Employee account is active; 1,250 points available; reward costs 1,000 points; API is reachable.',
    steps: ['Open BenefitMe and select the 1,000-point reward.', 'Review the confirmation sheet and tap Redeem once.', 'Refresh the wallet and inspect the redemption history.'],
    expected: 'One redemption is created, 1,000 points are deducted, and the reward appears in history.',
    actual: 'HTTP 201 returned; balance changed from 1,250 to 250 and exactly one redemption record was present.',
  },
  {
    id: 'TC-FCM-004', module: 'Firebase Notification', category: 'Mobile Interrupt', status: 'PASS',
    objective: 'Verify one push notification is delivered after the app resumes from background on TestFlight.',
    preconditions: 'iPhone 13 on iOS 17.6; build 2.5.7; notification permission granted; device token registered.',
    steps: ['Sign in and leave the app in the background for 30 seconds.', 'Send a targeted Firebase notification from the QA console.', 'Return to the app and compare banner, inbox, and delivery event IDs.'],
    expected: 'A single banner and one inbox item share the same event ID; the app resumes without a duplicate alert.',
    actual: 'One alert appeared; inbox event ID fcm_7a91 matched the delivery receipt and badge count incremented once.',
  },
  {
    id: 'TC-RPT-002', module: 'Monthly Report', category: 'Boundary Value / Edge Case', status: 'FAIL',
    objective: 'Exclude a task completed at the final second of June from the July export.',
    preconditions: 'Workspace timezone Asia/Phnom_Penh; task timestamp 2026-06-30 23:59:59 local; July export generated.',
    steps: ['Complete a personal task at 2026-06-30 23:59:59 local time.', 'Generate June and July monthly CSV exports.', 'Search both files by task ID and compare normalized timestamps.'],
    expected: 'The task appears once in June and is absent from July; the month filter uses the workspace timezone.',
    actual: 'Task TSK-4408 appears in both files; its 16:59:59Z timestamp passes the July query lower bound of 00:00:00Z on June 30.',
  },
  {
    id: 'TC-SUB-003', module: 'Subscription Tier', category: 'Positive', status: 'PASS',
    objective: 'Activate a one-week subscription and verify its effective period and entitlement.',
    preconditions: 'Verified member account; active payment sandbox; no existing subscription; tier SKU WEEK-01 enabled.',
    steps: ['Open plans and select 1-Week access.', 'Complete sandbox checkout with a valid test payment method.', 'Inspect entitlement response and expiry timestamp.'],
    expected: 'One entitlement is active through the inclusive seven-day period and the selected tier is shown in account settings.',
    actual: 'Checkout returned 200; tier WEEK-01 is active and expires at 2026-11-09T10:15:00Z.',
  },
  {
    id: 'TC-BFM-009', module: 'BenefitMe', category: 'Negative', status: 'FAIL',
    objective: 'Prevent a second reward redemption while the first request is still pending on a slow network.',
    preconditions: 'BenefitMe account has 1,000 points; network throttled to slow 3G; reward costs 1,000 points.',
    steps: ['Tap Redeem for the 1,000-point reward.', 'Before the spinner resolves, double-tap the same button.', 'Inspect redemption requests, ledger entries, and resulting balance.'],
    expected: 'The in-flight action disables the control or is idempotent; only one request can deduct points.',
    actual: 'Two HTTP 200 responses created separate redemption IDs and the points ledger was debited twice.',
  },
  {
    id: 'TC-FCM-011', module: 'Firebase Notification', category: 'Mobile Interrupt', status: 'BLOCKED',
    objective: 'Confirm push delivery while the device is locked during the migration build.',
    preconditions: 'iPhone 13 on iOS 17.6; TestFlight build 2.5.6; valid FCM token; device available for lock-state validation.',
    steps: ['Install build 2.5.6 and allow notifications.', 'Lock the device and send a test push.', 'Unlock the device, open the notification, and compare event IDs.'],
    expected: 'One lock-screen alert is delivered and deep-links to the matching in-app notification.',
    actual: 'Blocked: Firebase credential rotation invalidated the QA target token; retest requires a newly registered device token.',
  },
  {
    id: 'TC-SUB-001', module: 'Subscription Tier · Producer Download', category: 'Boundary Value / Edge Case', status: 'BLOCKED',
    objective: 'Verify a 1-Week subscription expires at exactly T+168 hours and revokes the Producer’s premium-download access.',
    preconditions: 'Producer has an active 1-Week plan and premium track access; renewal is disabled; a controllable test clock can represent the exact expiry boundary.',
    steps: ['Activate the 1-Week plan and record its start time T0 and expiry at T0 + 168 hours.', 'Request the premium download at T+167h 59m 59s and confirm access is still active.', 'At exactly T+168h, refresh the entitlement state and request the same premium download.', 'Inspect the subscription transition and access decision; confirm no renewal was triggered.'],
    expected: 'The plan is active immediately before the boundary and expires at T+168 hours; premium download access is denied at the expiry instant unless a renewal has occurred.',
    actual: 'Blocked: no execution evidence or clock-controlled result was supplied; the exact-boundary run remains pending.',
  },
  {
    id: 'TC-ANPR-002', module: 'ANPR Recognition · Manual Review', category: 'Boundary Value / Edge Case', status: 'BLOCKED',
    objective: 'Verify a license-plate confidence score below 0.65 returns a graceful fallback and flags manual review through the Telegram Bot workflow.',
    preconditions: 'FastAPI + YOLOv8 recognition service is available with the 0.65 threshold configured; a low-confidence plate image and Telegram notification target are available.',
    steps: ['Submit an image expected to score below 0.65 to the ANPR recognition route.', 'Inspect the response for the graceful fallback and manual-review flag.', 'Verify the notification handoff identifies the recognition for manual review in Telegram.', 'Confirm the low-confidence plate is not treated as an automatically accepted recognition.'],
    expected: 'The service returns its safe fallback, flags the case for manual review, and sends the related Telegram Bot notification without auto-accepting the uncertain plate.',
    actual: 'Blocked: no image-corpus execution result or configured Telegram webhook evidence was supplied.',
  },
  {
    id: 'TC-VPN-003', module: 'MikroTik CHR · Site-to-Site IPsec', category: 'Boundary Value / Edge Case', status: 'BLOCKED',
    objective: 'Verify the Branch A ↔ Branch B Site-to-Site IPsec tunnel automatically reconnects after a simulated WAN-link drop with zero packet leakage.',
    preconditions: 'Branch A and Branch B MikroTik CHR routers have a Site-to-Site IPsec tunnel and test routes configured; WAN fault injection and packet capture are available on both sides.',
    steps: ['Establish the tunnel and capture baseline encrypted traffic between the branch test hosts.', 'Simulate a WAN-link drop and monitor tunnel state and the external interface for cleartext test packets.', 'Restore the WAN link and wait for automatic tunnel negotiation without manual intervention.', 'Verify the IPsec handshake, encryption policies, restored routes, and packet captures during recovery.'],
    expected: 'The tunnel reconnects automatically after WAN recovery, branch routes resume, and no protected test packet is emitted outside the encrypted IPsec path during the interruption or reconnection.',
    actual: 'Blocked: no WAN-fault execution or packet-capture evidence was supplied; reconnection and leakage results remain unverified.',
  },
];

export const bugs = [
  {
    id: 'BUG-FCM-102', title: 'Duplicate push after app resume', module: 'Firebase Notification', severity: 'High', priority: 'P2', status: 'Open',
    environment: 'iPhone 13 · iOS 17.6 · TestFlight 2.5.6',
    summary: 'A pending notification is delivered twice when the app changes from background to foreground during Firebase migration.',
    steps: ['Install TestFlight build 2.5.6 with migration flag enabled.', 'Receive a push while the app is backgrounded.', 'Tap the notification, then foreground the app from the app switcher.', 'Compare banner delivery IDs against the notification inbox.'],
    expected: 'One FCM event produces one banner and one inbox entry, regardless of lifecycle transition.',
    actual: 'The foreground listener replays the queued event; two banners appear while the inbox stores one item.',
    rootCause: 'Foreground observer registers before the migration queue is acknowledged; the same event is emitted by both the notification-open callback and the resume reconciliation.',
    payload: '{\n  "event_id": "fcm_7a91",\n  "source": "resume_reconcile",\n  "delivery_count": 2,\n  "http_status": 200,\n  "dedupe_key": null\n}',
  },
  {
    id: 'BUG-RPT-208', title: 'June task leaks into July export', module: 'Monthly Report', severity: 'Critical', priority: 'P1', status: 'Open',
    environment: 'Chrome 128 · Ubuntu 22.04 · Report API v1.14',
    summary: 'A task completed at 2026-06-30 23:59:59 in Phnom Penh is duplicated in both June and July monthly exports.',
    steps: ['Set workspace timezone to Asia/Phnom_Penh (UTC+7).', 'Complete a task at 2026-06-30 23:59:59 local time.', 'Generate the June export, then generate the July export.', 'Search both CSV files for the task ID and inspect date filters.'],
    expected: 'June includes the record; July excludes it. Monthly boundaries are evaluated in the workspace timezone.',
    actual: 'Both exports contain TSK-4408: its UTC timestamp (16:59:59Z) passes the July query lower bound of 00:00:00Z on June 30.',
    rootCause: 'The July query lower bound is UTC midnight on June 30 instead of workspace-local midnight on July 1 (2026-06-30T17:00:00Z), so a late-June row passes the July gte filter.',
    payload: '{\n  "task_id": "TSK-4408",\n  "completed_at": "2026-06-30T16:59:59.000Z",\n  "workspace_tz": "Asia/Phnom_Penh",\n  "july_filter": {"gte": "2026-06-30T00:00:00.000Z"},\n  "http_status": 200\n}',
  },
  {
    id: 'BUG-BFM-315', title: 'Double-tap debits points twice', module: 'BenefitMe', severity: 'Critical', priority: 'P1', status: 'Open',
    environment: 'iPhone 13 · iOS 17.6 · TestFlight 2.5.7 · Slow 3G',
    summary: 'Reward redemption accepts two taps before the UI locks, returning HTTP 200 twice and deducting the points balance twice.',
    steps: ['Seed an account with exactly 1,000 points.', 'Throttle the device to slow 3G and open a 1,000-point reward.', 'Tap Redeem twice before the first response returns.', 'Inspect response bodies and the points ledger.'],
    expected: 'The client locks the control and the API enforces an idempotency key; one redemption and one points debit are recorded.',
    actual: 'Two redemption IDs are returned and the ledger posts two 1,000-point debits before the control becomes disabled.',
    rootCause: 'The redemption endpoint accepts concurrent requests without an idempotency key or atomic balance check; loading state is applied after the request callback.',
    payload: 'POST /api/v1/benefits/redeem\n{ "reward_id": "RW-1000", "points": 1000 }\n\nHTTP/1.1 200 OK\n{ "redemption_id": "RD-881", "balance": 0 }\nHTTP/1.1 200 OK\n{ "redemption_id": "RD-882", "balance": -1000 }',
  },
];

export const traceability = [
  { id: 'BR-014', rule: 'A reward is redeemed once and wallet balance cannot fall below zero.', cases: 'TC-BFM-001, TC-BFM-009', endpoint: 'POST /api/v1/benefits/redeem', coverage: '100%' },
  { id: 'BR-021', rule: 'One Firebase event creates one alert across app lifecycle states.', cases: 'TC-FCM-004, TC-FCM-011', endpoint: 'POST /api/v1/notifications/register', coverage: '100%' },
  { id: 'BR-033', rule: 'Monthly exports include only tasks completed inside the selected local month.', cases: 'TC-RPT-002', endpoint: 'GET /api/v1/reports/monthly', coverage: '100%' },
  { id: 'BR-047', rule: 'Subscription expiry matches the selected 1-Week / 1-Month / 1-Year duration and premium access is denied at expiry.', cases: 'TC-SUB-001, TC-SUB-003', endpoint: 'Laravel subscription / entitlement API', coverage: '100%' },
  { id: 'BR-048', rule: 'Producer profile data remains consistent and only authorized active plans permit premium downloads.', cases: 'TC-SUB-001, TC-SUB-003', endpoint: 'Laravel Producer / entitlement routes', coverage: '100%' },
  { id: 'BR-052', rule: 'ANPR confidence below 0.65 returns a safe fallback, flags manual review, and triggers the Telegram Bot workflow.', cases: 'TC-ANPR-002', endpoint: 'FastAPI recognition route · Telegram Bot webhook', coverage: '100%' },
  { id: 'BR-053', rule: 'Branch A ↔ Branch B IPsec reconnects after WAN recovery without exposing protected packets in cleartext.', cases: 'TC-VPN-003', endpoint: 'MikroTik CHR · Site-to-Site IPsec', coverage: '100%' },
];

export const apiChecks = [
  { code: '200', label: 'OK', endpoint: 'POST /benefits/redeem', description: 'Eligible redemption accepted; schema requires redemption_id, points_deducted, and balance.', body: '{\n  "redemption_id": "RD-881",\n  "points_deducted": 1000,\n  "balance": 250\n}', tone: 'success' },
  { code: '401', label: 'Unauthorized', endpoint: 'GET /reports/monthly', description: 'Missing or expired bearer token is rejected before report data is returned.', body: '{\n  "error": "unauthorized",\n  "message": "A valid bearer token is required."\n}', tone: 'warning' },
  { code: '422', label: 'Unprocessable Entity', endpoint: 'POST /subscriptions', description: 'Unknown tier SKU fails validation and returns a field-level schema error.', body: '{\n  "error": "validation_failed",\n  "fields": {\n    "tier_id": ["The selected tier is invalid."]\n  }\n}', tone: 'danger' },
];
