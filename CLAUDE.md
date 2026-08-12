@AGENTS.md

# Gold tier

Gold is wired the same way Silver is: one learner-facing module = four files plus one wiring pass through `components/Admin.jsx`. Reference implementation for the pattern: Silver's "Preparing for a Mortgage" module (`lib/silver-course-17-data.js`, `components/MortgagePrepCourse.jsx`, `app/course/silver/preparing-for-a-mortgage/page.jsx`).

Gold's catalog already exists in `components/Admin.jsx` as `goldCourses` (two course groups: "Canadian Benefits and Financial Support" — 20 modules — and "Additional Income Opportunities" — 5 modules), all currently marked "Planned". Building a module means flipping one entry from planned to published across the four files below.

**Numbering convention:** unlike Silver (which mixes concatenated indices like `silver-course-17` with dashed ones like `silver-course-3-10`), Gold should always dash-separate `<courseIndex>-<moduleIndex>` in file names to avoid ambiguity, since course 1 alone runs to 20 modules. Export identifiers drop the dash (Silver's own convention: `silver-course-3-10-data.js` exports `silverCourse310`), so `gold-course-1-14-data.js` exports `goldCourse114`. localStorage keys always stay dash-separated regardless of file naming: `cp-gold-1-14-learner`, `cp-gold-1-14-complete`, `cp-gold-1-14-submissions`.

### 1. `lib/gold-course-<courseIndex>-<moduleIndex>-data.js`

Mirrors `lib/silver-course-17-data.js`. Exports three consts named `goldCourse<N>`, `goldCourse<N>Sections`, `goldCourse<N>Glossary`:
- `goldCourse<N>`: `{ id, eyebrow, title, subtitle, duration }` — `eyebrow` follows Silver's `"SILVER MASTERCLASS · ..."` shape, e.g. `"GOLD MASTERCLASS · CANADIAN BENEFITS AND FINANCIAL SUPPORT 1.14"`.
- `goldCourse<N>Sections`: ordered `{ id, label }` list driving the side nav and scroll-spy.
- `goldCourse<N>Glossary`: `[term, definition]` pairs rendered in the closing glossary section.

### 2. `components/<Name>Course.jsx`

Mirrors `components/MortgagePrepCourse.jsx`. One `"use client"` component per module (name it for the topic, e.g. `CanadaChildBenefitCourse.jsx`), importing icons from `lucide-react` and `Brand` from `./Brand`, plus the three data exports from its `lib/gold-course-*-data.js` file. Each module owns:
- `learnerKey`/`completionKey`/`submissionKey` constants scoped to that module's dashed id (`cp-gold-1-14-learner`, etc.).
- Local content arrays for that module's body (outcomes, myth checks, story, quick-check Q&A, action-form field list) — these live in the component, not the data file, matching Silver.
- The scroll-spy/progress-bar `useEffect` (IntersectionObserver over the section ids + scroll-based progress %) and the `submit` handler that appends to the submissions array in localStorage and flips the completion flag.
- Render tree wrapped in a `gold-course` root class (parallel to Silver's `silver-course`), using `gold-`-prefixed classes for the hero/header/nav/body/spotlight/completion/form/footer — parallel to `silver-hero`, `silver-header`, `silver-tier-mark`, `silver-primary`, `silver-nav`, `silver-body`, `silver-heading`, `silver-spotlight`, `silver-completion`, `silver-form-frame`, `silver-footer`. These `gold-*` classes don't exist in `app/globals.css` yet — add them when the first Gold module is built, seeded from CSS vars in the same shape as `.silver-course{--silver:#d7dde2;--silver-bright:#f7f9fb;--silver-mid:#aeb8c1;--silver-dark:#52616d;--silver-ink:#10242b}`.
- Tier mark text reads `"GOLD EXCLUSIVE"` (not `"SILVER EXCLUSIVE"`), and should use a different lucide icon than Silver's `Crown` — e.g. `Award` or `Medal` — so the two tiers stay visually distinct in the header badge and seal.

**Gold design direction:** Silver reads as cool, frosted "glass" — slate/silver palette, backdrop blur, navy-to-steel gradients. Gold should read as warm and weightier: amber/bronze on deep charcoal or espresso, foil/embossed edges instead of glass blur, using the `#d8ad3f` gold accent already established as the tier color in Admin's catalog CSS (`.tier-gold{border-left-color:#d8ad3f}`). Keep the same structural rhythm (hero → outcomes → myth checks → story → quick checks → action form → glossary) so the two tiers feel like siblings, not different products.

### 3. `app/course/gold/<slug>/page.jsx`

Mirrors `app/course/silver/preparing-for-a-mortgage/page.jsx` exactly — same gate, same cookie name and access level (there is no per-tier access level; every course, Starter through Gold, gates on `verifySession(jar.get("cp_course_access")?.value, "course1")`):

```js
import{cookies}from"next/headers";import{goldCourse114}from"../../../../lib/gold-course-1-14-data";import{verifySession}from"../../../../lib/session";import{PasswordGate}from"../../../../components/PasswordGate";import{CanadaChildBenefitCourse}from"../../../../components/CanadaChildBenefitCourse";export const dynamic="force-dynamic";export default async function CoursePage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_course_access")?.value,"course1");return unlocked?<CanadaChildBenefitCourse course={goldCourse114}/>:<PasswordGate course={goldCourse114}/>}
```

`slug` is the kebab-case module title, placed under `app/course/gold/` (parallel to `app/course/silver/`).

### 4. `components/Admin.jsx` wiring

Four edits per module, all in `components/Admin.jsx`:
- **Route array:** add the new `/course/gold/<slug>` path to a `publishedGoldRoutes` array (course group 1) or `publishedGoldIncomeRoutes` array (course group 2) — these don't exist yet; create them the first time a Gold module ships, following `publishedSilverRoutes`/`publishedSilverMoneyRoutes`/`publishedSilverHustleRoutes` (same index order as the corresponding `goldCourses[n].modules` list).
- **Published count:** `GoldCatalog()` currently renders every module as `"Planned"` with no published branch. Replace it with `SilverCatalog()`'s logic — per-course-group published count in the `<small>` summary, a `published` boolean per module index, the `"published"` list-item class, and the `<a href=... target="_blank">Open ↗</a>` link sourced from the route array added above.
- **Overview stat:** bump the Overview tab's `<b>50</b>` (published-courses count) and extend its `<small>` description to name the newly live Gold course/module range, matching how it currently calls out "Silver Advanced Credit 1.1–1.10, Major Money Decisions 2.1–2.5 and Instant Cash Side Hustles 3.10" — same sentence, gold clause appended.
- **Submissions key:** in `AdminDashboard`'s data-loading `useEffect`, add a `const gold114=JSON.parse(localStorage.getItem("cp-gold-1-14-submissions"))||[]` line (matching the module's `submissionKey`) and splice it into the array passed to `setSubmissions([...])` alongside the existing `course1*`/`silver*` reads.
