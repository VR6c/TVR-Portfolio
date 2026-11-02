# TODO — Thary Vireak QA Command Center

## 1. Profile, sticky navigation, and QA Status hero — Complete
- Build a modern, interactive, single-page “QA Engineer & Manual Testing Portfolio” for Thary Vireak (ថារី វីរៈ), a QA Engineer based in Phnom Penh, Cambodia, using React, Tailwind CSS, and Lucide React icons.
- Use an interactive QA Command Center / Test Management Dashboard visual direction inspired by Linear, TestRail, and GitHub Dark Mode rather than a generic developer template.
- Include sticky navigation with section links, a green pulse badge reading “System Status: All Release Checks Passing”, and a “Download CV / Contact” call to action.
- Introduce Thary Vireak and show role “Quality Assurance (QA) Engineer | Mobile (TestFlight), Web & API Manual Testing” and location Phnom Penh, Cambodia.
- Include the profile portrait supplied by the user in the hero, cropped to keep the face visible and accompanied by descriptive alt text.
- Display KPI cards: `3+` Production & TestFlight Builds Validated (v2.5.5, v2.5.6, v2.5.7); `150+` Structured Test Cases Designed & Executed; `98%` Bug Reproducibility Rate on First Triage; and `Full-Stack` Gray-Box Debugging (UI, REST API, Database).
- Show profile skills: Functional & Regression Testing, iOS TestFlight Build Verification, Boundary Value Analysis (BVA), Equivalence Partitioning, Defect Lifecycle & Bug Triage, Requirements Traceability Matrix (RTM), Mobile Interrupt Testing, and REST API Validation (Postman).
- Show technical/dev stack familiarity: Laravel, React, React Native, Python (FastAPI/OpenCV/YOLOv8), Tailwind CSS, MongoDB, MySQL, VirtualBox/VMware, and MikroTik CHR (VPN Lab validation).
- Use a clean light-mode palette with a soft off-white/slate canvas, white dashboard panels, crisp slate text and borders, and emerald for passed tests, rose for failed/critical bugs, plus indigo/cyan accents. Use clean monospace typography (`font-mono`) for IDs, build numbers, and JSON payloads.

## 2. Scroll-driven interaction and project explorer — Complete
- Include scrolling animation throughout the single-page site. Use restrained, purposeful scroll-triggered reveals and movement, a reading-progress indicator, and subtle hover/status feedback that preserve dashboard readability and respect reduced-motion preferences.
- Highlight the active section in sticky navigation while scrolling; crossfade and slide project details when case studies are switched; reveal `PASS` / `FAIL` result badges and draw RTM coverage indicators; stagger experience and education timeline entrances; and slowly shift a low-contrast hero backdrop. Disable or substantially reduce these animations when the visitor prefers reduced motion.
- Add a subtle, page-wide light-mode gradient atmosphere that shifts gently in response to scrolling without obscuring or intercepting page content. Freeze the background motion when the visitor prefers reduced motion.
- Build an interactive project switcher with five QA and system-specification case studies using sanitized company data.
- Case Study A: Enterprise HR & Attendance Mobile App (CheckinMe — iOS TestFlight v2.5.5 to v2.5.7). Scope: end-to-end validation of BenefitMe rewards, AI Mentor, Employee Analysis, and Firebase Push Notification Migration. Highlight mobile interrupt testing (foreground/background/locked states), build regression sign-off, and hotfix verification.
- Case Study B: Personal Task & Automated Monthly Report Engine. Scope: validate “Manage Only Owner Tasks” and automated monthly report generation. Highlight cross-month data deduplication (tasks logged in June are strictly excluded from July reports) and boundary date-range filtering.
- Case Study C: Full-Stack Music Platform (Laravel API + React SPA). Show shift-left verification of requirements before implementation, Producer profile data integrity, and state transitions across `1-Week`, `1-Month`, and `1-Year` plans, including expiration boundaries, renewal triggers, and unauthorized-access blocks.
- Case Study D: ANPR Car Wash Management System (FastAPI + OpenCV + YOLOv8 + Telegram Bot). Show edge-case testing for blurry/angled plates and lighting variations, low-confidence fallback/manual-review behavior, and real-time Telegram Bot webhook reliability.
- Case Study E: SETEC QA Lab & Infrastructure. Show VirtualBox and VMware Workstation with Windows 10, macOS, and Linux test nodes; MikroTik CHR L2TP, PPTP, and Site-to-Site IPsec validation; and local DNS/domain routing configuration for `reak.edu`.

## 3. Searchable, filterable test case specification viewer — Complete
- Build an interactive tabular component with search and filter pills `All`, `Positive`, `Negative`, `Boundary Value / Edge Case`, and `Mobile Interrupt`.
- Pre-populate nine realistic test cases across the QA projects. Include the exact columns `TC_ID`, `Module`, `Test Scenario & Objective`, `Preconditions`, `Test Steps` (numbered list), `Expected Result`, `Actual Result`, and `Status Badge`.
- Include existing cases such as `TC-BFM-001`, `TC-FCM-004`, `TC-RPT-002`, and `TC-SUB-003`, plus the following new cases:
  - `TC-SUB-001` (Music Platform): verify that a `1-Week` subscription auto-expires at exactly `T+168 hours` and revokes Producer premium-download access; validate the state immediately before and at the expiry boundary.
  - `TC-ANPR-002` (Car Wash System): verify that the FastAPI + YOLOv8 recognition endpoint returns a graceful fallback and flags manual review via Telegram Bot when license-plate confidence is `< 0.65`.
  - `TC-VPN-003` (MikroTik Lab): verify automatic reconnection of the Branch A ↔ Branch B Site-to-Site IPsec tunnel and zero cleartext packet leakage after a simulated WAN-link drop and recovery.
- Do not claim execution results that were not supplied. Mark these three new cases `BLOCKED` and state in `Actual Result` that execution evidence/environment results were not provided; include the precise requirement as the expected result.
- Status badges must represent `PASS`, `FAIL`, and `BLOCKED` with color coding. Calculate the displayed suite counts from all nine test records. Keep the table usable on narrow screens with horizontal scrolling.

## 4. Expandable defect / bug report inspector — Complete
- Display three realistic, high-impact sample bug reports that recruiters can click to expand and inspect.
- `BUG-FCM-102`: duplicate or delayed push notifications when switching the app from background to foreground during Firebase migration on iOS TestFlight v2.5.6.
- `BUG-RPT-208`: a task completed on the last day of June (`2026-06-30 23:59:59`) appears duplicated in both June and July monthly export reports due to UTC timezone offset. The sample converts the local timestamp to `2026-06-30T16:59:59Z`; its deliberately incorrect July filter begins at `2026-06-30T00:00:00Z`, before the correct local-month boundary at `2026-06-30T17:00:00Z`.
- `BUG-BFM-315`: BenefitMe reward redemption button allows a double-tap race condition on slow 3G, deducting points twice (`HTTP 200` returned twice before UI state locks).
- Each bug inspector must show Environment Badge (Device, OS, Build), Severity Badge (`Critical`, `High`, `Medium`), Priority Badge (`P1`, `P2`), Steps to Reproduce, Expected vs. Actual Result, and a Root Cause / DevTools API Payload code block with the exact JSON/HTTP response inspected.

## 5. Requirements traceability and REST API validation showcase — Complete
- Add a visual mapping table connecting `Business Requirement ID` -> `User Story / Rule` -> `Mapped Test Case IDs` -> `API Endpoint Tested` -> `Coverage Status (100%)`.
- Include the existing Postman / REST API check viewer demonstrating `200 OK`, `401 Unauthorized`, and `422 Unprocessable Entity` status codes and JSON schemas.
- Extend the RTM to map Producer profile/subscription expiry to `TC-SUB-001` and `TC-SUB-003`; ANPR confidence below `0.65` and manual review to `TC-ANPR-002`; and Branch A ↔ Branch B IPsec reconnection/traffic protection to `TC-VPN-003`.

## 6. Experience, education, and contact footer — Complete
- Show a clean timeline for QA Engineer at CheckinMe and B.Sc. in Management Information Systems (MIS) at SETEC Institute.
- Include education detail: Bachelor of Management Information Systems (MIS), SETEC Institute (Group SU20, completed 16-week internship & academic thesis).
- Include an interactive “Copy Email” action and direct contact details: phone `088 796 5013`, email `tharyvireak161@gmail.com`, and location `Phnom Penh, Cambodia`.
- Provide the requested “Download CV / Contact” call to action. The contact section also offers a concise downloadable profile generated from the information in this brief; it does not represent an independently supplied CV file.

## 7. Responsive behavior and content quality — Complete
- Make all tables responsive with horizontal scrolling on mobile.
- Support compact mobile widths down to 320px, tablet portrait and landscape, and desktop layouts. Prevent page-level horizontal overflow, keep navigation and controls fully visible, preserve readable wrapping and balanced panel layouts, and reserve horizontal scrolling for wide data tables.
- Keep the new academic, SRS, and lab cards legible at mobile, tablet, and desktop widths.
- Do not use placeholder “Lorem Ipsum” text anywhere. Populate every test case, bug report, and API snippet with realistic, domain-accurate QA documentation.
- Keep the single-page portfolio legible and interactive across desktop and mobile layouts; use motion as an enhancement rather than an obstacle.

## 8. SETEC Institute academic capstone, SRS, and lab validation — Complete
- Add a dedicated section titled “Academic Capstone, SRS & Lab Validation (SETEC Institute — MIS Group SU20)”.
- Add a 16-Week Internship & Thesis Milestone card showing completion of the 16-week structured weekly technical reporting booklet and final MIS bachelor's thesis at SETEC Institute, and emphasizing technical documentation, requirements traceability, and milestone tracking.
- Add an SRS & Acceptance Criteria Showcase explicitly labeled as static analysis / shift-left QA. Cover the Full-Stack Music Platform (Laravel API + React SPA): verify requirements before code implementation; Producer-profile entity data integrity; subscription-state transitions across `1-Week`, `1-Month`, and `1-Year` plans; expiration boundaries; renewal triggers; and unauthorized access blocks.
- Cover the ANPR Car Wash Management System (FastAPI + OpenCV + YOLOv8 + Telegram Bot): test license-plate OCR under blurry/angled plates and lighting variations, plus webhook reliability for real-time Telegram Bot service notifications.
- Add a “Test Environment & Lab Architecture” card showing VirtualBox and VMware Workstation running Windows 10, macOS, and Linux test nodes; MikroTik CHR virtual-router testing for L2TP, PPTP, and Site-to-Site IPsec tunnel handshake, encryption policies, and packet routing; and local DNS/domain routing configuration for `reak.edu`.


## 9. Public GitHub repository project entries — Complete
- Add five responsive repository cards in the Work section, each linking directly to the supplied public GitHub repository and showing repository owner/team attribution where confirmed. Open links safely in a new tab.
- `https://github.com/VR6c/E-commers-laravel`: describe the Laravel 10 / PHP 8.1+ multi-vendor e-commerce system. Public API routes cover accounts, catalog, checkout, orders, and wishlists; web routes include admin/vendor portals. Show the visible repository owner as `VR6c`.
- `https://github.com/VR6c/flutter_e_commerce`: describe the Group SU20 Final Year 4 Flutter/Dart capstone app using Riverpod, GoRouter, and a Laravel REST API, with catalog, cart/checkout, orders, and profile features. The README lists Thary Vireak in the group roster, but does not specify individual responsibilities.
- `https://github.com/VR6c/Java-Final-Y4`: describe the Java 21 / Spring Boot REST API with school-management and e-commerce modules, JWT authentication, OTP workflows, caching, audit logging, and OpenAPI documentation. Show repository owner `VR6c`.
- `https://github.com/VR6c/Service-System`: describe the React/TypeScript + Express/MongoDB automotive service-management system. The SRS and source tree cover quotation/receipt workflows, customer/vehicle views, reporting, and administration. Show repository owner `VR6c`.
- `https://github.com/Phanit009/Order_Lunch`: describe the Node/Express/Telegraf/MongoDB lunch-ordering system and React/Vite admin dashboard, with staff ordering, branch reporting, and admin management. Show repository owner `Phanit009`.
- Keep these repository summaries distinct from the interactive QA case studies. Identify them as descriptions of public repository contents; do not imply that Thary authored or QA-tested a repository unless the public source establishes that role. Do not invent test results or runtime verification.
- Preserve the source links and evidence notes in `REPOSITORY_NOTES.md`.
