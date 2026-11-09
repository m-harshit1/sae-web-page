# SAEINDIA Collegiate Club Portal — Consolidated Engineering & Technical Report

This engineering report outlines the technical architecture, database layouts, secure session authentication framework, global fuzzy search, PWA features, and performance optimizations implemented in the **SAEINDIA Collegiate Club Web Portal** at the **Indian Institute of Information Technology, Design & Manufacturing (IIITDM), Kurnool**.

---

## 🏎️ 1. Core Technology Stack & Architecture

The application is built on top of the modern **Next.js App Router** framework using hybrid static and dynamic routing:
1. **Core Runtime**: React 19 / TypeScript / Next.js
2. **Database & Persistence Layer**: Server-side file-based JSON databases (`/data/*.json`) replacing client-side `localStorage`. Reads and writes are executed server-side via Next.js API route handlers.
3. **Authentication Layer**: Role-Based Access Control (RBAC) powered by HTTP-only session cookies and Next.js Edge Middleware protection.
4. **Image Optimizer Engine**: Native Next.js `<Image>` components backed by `sharp` for on-demand WebP generation.
5. **Styling Engine**: Custom CSS utility classes extending standard Tailwind CSS tokens, utilizing high-contrast HSL color variables, and glassmorphic panel backdrops.

---

## 🎨 2. Theme System & Design Tokens

The portal enforces a high-velocity, premium motorsport aesthetic:
* **Background Grid Layer**: Diagonal carbon fiber mesh patterns overlaying a dark charcoal backdrop.
* **Curated Motorsport Color Palette**:
  - `Carbon-900` (`#0D0E10`): Deep chassis framework background.
  - `Titanium-700` (`#1E2025`): Primary glassmorphic cards and telemetry frames.
  - `Alloy-100` (`#F3F4F6`): Clean typography base for readability.
  - `Apex-Red` (`#E11D48`): High-alert accent (used for Chassis, yield stresses, safety limits).
  - `Torque-Orange` (`#F97316`): Action accent (used for Drivetrain, CVT ratios, RPM curves).
  - `Lift-Blue` (`#0EA5E9`): Kinematics accent (used for Suspension, roll centers, wheel travel).
  - `Emerald-Green` (`#10B981`): Validation accent (used for Brakes, safety conformances, verified states).
* **Typography Tokens**:
  - **Montserrat**: Bold heading fonts.
  - **Inter**: Readability body fonts.
  - **JetBrains Mono**: Mathematical parameters, equations, and telemetry logs.
* **Typography & Stacking Enhancements**:
  - Base font sizes scaled up globally via Tailwind `@theme` overrides: `xs` raised to `0.85rem` (13.6px), `sm` to `0.95rem` (15.2px), `base` to `1.075rem` (17.2px).
  - Scanline telemetry background overlay shifted to `z-index: -1` with `isolation: isolate` on the root node, ensuring all text elements render as crisp vector layers above the backdrop.

---

## 🗄️ 3. Navigation & Consolidated Routing State

The root page component `SAEIndiaHubContent` (defined in `app/page.tsx`) manages routing dynamically using Next.js search parameters. The 11 original menu options have been consolidated into **6 core tabs**:

| State/Tab | Target Component | Consolidated Contents |
| --- | --- | --- |
| `"home"` | `HomeTab` | Hero section, Club Telemetry Stats, About Chapter mission statements, Faculty Advisors, and Action Photo/Video Gallery with lightbox. |
| `"projects"` | `ProjectsTab` | Vehicle Spec Hotspots, interactive SVG Dyno Curve mapping, CVT speed/torque calculators, FEA/EV research studies, and seasonal scoreboard registries. |
| `"teams"` | `TeamsTab` | Interactive Org Hierarchy tree, active student officers list, and the alumni network database with mentorship booking scheduling. |
| `"blog"` | `BlogTab` | Newsbulletins, shakedown reports, and outreach summaries. Dynamic data is read from local storage namespaces. |
| `"join"` | `JoinTab` | Student recruitment pipeline timelines, department matrices, downloadable bootcamps roadmaps, and the sponsor ROI pledge slider. |
| `"portal"` | `PortalTab` | Secure administration cockpit to manage tasks, rosters, parts inventory, budgets, and publish news blog posts. |

---

## 💾 4. Server-Side Persistence & API Database Schema

Client-side local storage has been completely replaced with a server-side JSON file database system located under `/data/`. Next.js API routes manage write locks and reads:

### A. Blog Posts Registry (`data/posts.json`)
Stores articles, news, shakedowns, and user reactions:
```json
{
  "id": 1,
  "title": "B-26 ATV Completes Dynamic Brake Shakedown",
  "excerpt": "Our engineering leads verified brake lock reliability...",
  "content": "Full article content with paragraph splits...",
  "category": "Testing",
  "author": "Vineet Sharma (Tech Head)",
  "date": "May 28, 2026",
  "lastUpdated": "June 12, 2026",
  "readTime": "4 min read",
  "reactions": { "like": 14, "fire": 8, "rocket": 12 }
}
```

### B. Student Applications Registry (`data/applications.json`)
Captures recruitment form packets:
```json
{
  "id": 1,
  "name": "Aman Gupta",
  "branch": "Mechanical",
  "domain": "Chassis",
  "coverText": "Experience with SolidWorks sketch designs...",
  "submittedAt": "2026-06-12T19:00:00Z",
  "status": "Aptitude Test Pending"
}
```

### C. Mentorship Bookings Registry (`data/bookings.json`)
Logs session reservations made with verified alumni:
```json
{
  "id": 1,
  "alumnusName": "Rahul Deshmukh",
  "bookingDate": "2026-06-15",
  "bookingType": "Career Guidance",
  "bookedAt": "2026-06-12T19:06:00Z"
}
```

---

## 🔒 5. Administrative Authentication & Route Middleware

A secure session cookie layer protects the portal from unauthorized modifications:
* **Session Cookie (`sae_session`)**: Generated on successful authentication (username `admin`, password `sae2026`) via `POST /api/auth/login`. Stored as an HttpOnly, Secure cookie with a 2-hour sliding expiration.
- **Access Middleware (`middleware.ts`)**: Next.js Edge Middleware intercepts all incoming administrative mutations. If the session cookie is missing or expired, it immediately returns a `401 Unauthorized` response.
- **Client Reactions Bypass**: Client-side emoji reactions (`like`, `fire`, `rocket`) POST to `/api/posts`. To bypass middleware authentication checks, client requests attach a custom header `x-action-type: react` which is parsed by the middleware.
- **Authentication Fallback UI**: Unauthenticated users visiting the member portal tab are presented with a gorgeous glassmorphic login panel with simulated status diagnostics.

---

## 🔍 6. Global Fuzzy Search Command Palette (Ctrl+K)

To enable quick access to specifications, members, and team roles, the main layout is equipped with a global search palette:
* **Keyboard Shortcut**: Pressing `Ctrl+K` or `Cmd+K` toggles the search modal.
* **Header & Mobile Triggers**: Search icons in the header and a dedicated field in the mobile menu drawer provide click access.
* **Fuzzy Indexing**:
  - Matches queries against page navigation, specifications (Chassis, Powertrain, Suspension, Brakes), active officers, and alumni company records.
  - Automatically loads default page navigation shortcuts if the search box is empty.

---

## 🏎️ 7. Quick Wins & Usability Upgrades

1. **Favicon & PWA Support**: Links a custom [manifest.json](file:///c:/Users/Harshit/Desktop/sae%20web%20page/public/manifest.json) in metadata parameters for mobile home screen standalone support.
2. **Custom 404 Page**: Created [not-found.tsx](file:///c:/Users/Harshit/Desktop/sae%20web%20page/app/not-found.tsx) returning clean error logs and returns drivers home safely.
3. **Loading Transition Screens**: Introduced [loading.tsx](file:///c:/Users/Harshit/Desktop/sae%20web%20page/app/loading.tsx) to resolve dynamic route fetches smoothly.
4. **Copy-to-Clipboard**: Clicking cards in the specs grid saves values to the clipboard and triggers a `"Copied"` check status feedback badge.
5. **Print Stylesheet**: Appended CSS rules to [globals.css](file:///c:/Users/Harshit/Desktop/sae%20web%20page/app/globals.css) stripping dark theme backdrops and hiding navigation buttons during printing.
6. **Sponsorship PDF generator**: Outputs a branded proposal agreement featuring Rupee symbols, dynamic benefits ROI tables, and Section 135 CSR text blocks inside a printable browser pop-up.
7. **Lossless Image Compression**: Installed `sharp` to support Next.js dynamic optimizer and compressed raw PNG files:
   - `baja_atv_race.png`: 1010.6 KB ➔ 632.9 KB (**-37.4%**)
   - `outreach_mentorship.png`: 874.8 KB ➔ 511.4 KB (**-41.5%**)
   - `team_workshop.png`: 990.3 KB ➔ 657.3 KB (**-33.6%**)
   - `event_baja_drift.png`: 120.7 KB ➔ 39.1 KB (**-67.6%**)
   - `event_baja_jump.png`: 133.4 KB ➔ 44.1 KB (**-67.0%**)
   - `event_baja_lineup.png`: 77.0 KB ➔ 26.9 KB (**-65.1%**)

---

## 🛠️ 8. Clean Compilation & Build Verification Logs

The codebase compiled successfully with:
- **0 compiler warnings** during static checks (`npx tsc --noEmit`).
- **Static Page Generation** completed smoothly during production build compilation (`npm run build`), ensuring maximum SEO performance, fast LCP, and zero hydration mismatches.
