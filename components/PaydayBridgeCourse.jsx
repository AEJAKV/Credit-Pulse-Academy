"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  Lightbulb,
  LockKeyhole,
  Menu,
  ReceiptText,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course22Glossary, course22Sections } from "../lib/course-22-data";

const learnerKey = "cp-course-2-2-learner";
const completionKey = "cp-course-2-2-complete";
const submissionKey = "cp-course-2-2-submissions";

const bridgeEvidence = [
  ["LANDING", "What is the exact date and reliable take-home amount of the next deposit?"],
  ["OWNERSHIP", "Which bills, minimum payments and transfers already own part of it?"],
  ["CROSSING", "What groceries, fuel, medication and other essentials are needed before the next deposit?"],
  ["FLOOR", "What balance must remain untouched so ordinary timing changes do not create a fee problem?"],
];

const cashFlowRows = [
  ["Day 0", "Opening cleared balance", "$125", "$125", "Is any transaction still pending?"],
  ["Day 1", "Net pay deposit", "+$1,850", "$1,975", "Which costs already own this money?"],
  ["Day 1", "Rent share", "−$1,050", "$925", "Is the amount and withdrawal date confirmed?"],
  ["Day 2", "Phone and internet", "−$90", "$835", "Does the provider use this exact date?"],
  ["Day 3", "Groceries", "−$240", "$595", "Is this a realistic pay-period amount?"],
  ["Day 5", "Auto payment", "−$310", "$285", "Is this payment protected before flexible spending?"],
  ["Day 8", "Insurance", "−$75", "$210", "What alert should fire before this point?"],
  ["Days 10–12", "Fuel and medication", "−$125", "$85", "Does the floor still survive?"],
  ["Day 14", "Next net pay", "+$1,850", "$1,935", "Which next-cycle jobs begin now?"],
];

const assignmentSteps = [
  ["Confirm the starting point and next deposit.", "Use cleared cash, then record the next reliable date and conservative take-home amount; keep pending or uncertain money separate."],
  ["Reserve required payments first.", "Protect housing, utilities, insurance, minimum debt payments and other dated obligations."],
  ["Fund the crossing.", "Assign realistic groceries, fuel, medication, child-related costs and other essentials needed before payday."],
  ["Protect the floor.", "Treat the small cash-flow buffer as assigned money, not as a late-breaking snack budget."],
  ["Release only the remainder.", "Flexible spending begins after the bridge is safe, not before the map has met the calendar."],
];

const separationLayers = [
  ["LAYER 1", "INCOME LANDING", "Pay, benefits and other deposits arrive here so the amount and date are easy to confirm.", Landmark],
  ["LAYER 2", "BILLS HOLDING", "Money for fixed and required withdrawals is separated immediately and used only for those obligations.", ReceiptText],
  ["LAYER 3", "DAILY SPENDING", "Groceries, fuel and approved flexible spending receive a controlled amount for the pay period.", WalletCards],
];

const repairs = [
  ["Measure the exact gap.", "Name the lowest projected balance, the date it occurs and the amount needed to reach the floor."],
  ["Contact the provider early.", "Ask whether a due date or arrangement can change; keep paying under the existing terms until a change is confirmed."],
  ["Remove a safe non-essential cost.", "Pause or cancel an unused subscription before its deadline rather than underfunding food or medication."],
  ["Split planned transfers.", "When appropriate, divide a monthly sinking-fund or savings transfer across pay periods. Do not reduce a required payment without agreement."],
  ["Build the floor gradually.", "Add a repeatable amount each payday until the buffer can absorb normal timing changes."],
];

const provinces = [
  ["AB and BC", "Use Alberta Consumer information or Consumer Protection BC’s licence search."],
  ["NB and PEI", "Use FCNB or PEI Financial and Consumer Services information."],
  ["ON", "Use Ontario’s official Payday loan: your rights guidance."],
  ["NL", "Use the provincial Consumer and Financial Services Division’s lender information."],
];

const quickChecks = [
  ["A monthly budget balances, but rent clears two days before pay.", "Map the exact timing gap."],
  ["$700 is held for bills in the same account.", "Exclude it from available spending."],
  ["The lowest projected balance is $45 and the floor is $150.", "The bridge is $105 too thin."],
  ["A provider verbally discusses a new date.", "Keep the old plan until the change is confirmed."],
  ["A bank alert arrives after a pending debit.", "Recalculate immediately; the alert is not a pause button."],
];

const thinking = [
  ["11", "Use the exact date and conservative net amount expected to clear. If income varies, Course 2.10 develops a fuller method."],
  ["12", "The opening balance excludes unavailable or pending money. The floor is a small cash-flow buffer, not permission to spend down to $0."],
  ["13", "A complete answer includes payee, date and amount for every obligation that may clear before payday."],
  ["14", "Use realistic pay-period amounts supported by recent activity and upcoming needs."],
  ["15", "The three amounts must fit within the opening cash plus the reliable deposit; bill money cannot also appear as daily spending."],
  ["16", "Calculate in date order. The lowest result, not the final payday balance, identifies the bridge’s risk point."],
  ["17", "Choose a threshold above the danger point and keep contact details current. Recalculate when a pending amount or date changes."],
  ["18", "SAFE stays above the floor; THIN stays above $0 but below the floor; SHOWING A GAP reaches $0 or below. Attach a specific repair and confirmation date."],
];

function Spotlight({ children }) {
  return <aside className="reader-spotlight"><Lightbulb /><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>;
}

function SourceLink({ href, children }) {
  return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14} /></a>;
}

function Heading({ number, title }) {
  return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>;
}

function Myth({ children, reality }) {
  return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2 />{reality}</div></article>;
}

export function PaydayBridgeCourse({ course }) {
  const [activeSection, setActiveSection] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [learner, setLearner] = useState({ name: "", email: "" });
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setLearner(JSON.parse(localStorage.getItem(learnerKey)) || { name: "", email: "" });
        setComplete(localStorage.getItem(completionKey) === "true");
      } catch {}
    });
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, Math.round(window.scrollY / available * 100)) : 0);
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65%", threshold: [0, .25, .6] });
    course22Sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  function goToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function submitActivity(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nextLearner = { name: data.name, email: data.email };
    const response = [
      `11. Landing: ${data.landing}`,
      `12. Starting point: ${data.startingPoint}`,
      `13. Ownership: ${data.ownership}`,
      `14. Crossing: ${data.crossing}`,
      `15. Separation: ${data.separation}`,
      `16. Low point: ${data.lowPoint}`,
      `17. Warning system: ${data.warning}`,
      `18. Verdict: ${data.verdict}`,
    ].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]");
    rows.unshift({ ...nextLearner, lesson: 2, lessonTitle: "Fourteen-Day Payday Bridge", response, submittedAt: new Date().toISOString() });
    localStorage.setItem(submissionKey, JSON.stringify(rows));
    localStorage.setItem(learnerKey, JSON.stringify(nextLearner));
    localStorage.setItem(completionKey, "true");
    setLearner(nextLearner);
    setComplete(true);
  }

  return <div className="reader-shell payday-course">
    <div className="reader-progress"><span style={{ width: `${scrollProgress}%` }} /></div>
    <header className="reader-header">
      <button className="reader-menu-button" onClick={() => setMenuOpen(true)}><Menu /></button>
      <Brand />
      <div className="reader-header-meta"><BookOpen size={17} /><span>Course 2.2</span><i /><span>{scrollProgress}% read</span></div>
      <a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a>
    </header>
    <aside className={`reader-nav ${menuOpen ? "open" : ""}`}>
      <div className="reader-nav-head"><div><span>COURSE 2.2</span><strong>On this page</strong></div><button onClick={() => setMenuOpen(false)}><X /></button></div>
      <nav>{course22Sections.map((section, index) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}</nav>
      <div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div>
    </aside>
    {menuOpen && <button className="reader-scrim" onClick={() => setMenuOpen(false)} />}

    <main className="reader-main">
      <section className="reader-hero payday-hero" id="start">
        <div className="reader-hero-copy">
          <p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p>
          <p className="reader-deck">Build a payday-to-payday cash-flow map that protects upcoming bills, daily essentials and the lowest expected balance.</p>
          <div className="reader-meta"><span><CalendarClock />{course.duration}</span><span><FileCheck2 />One payday bridge</span></div>
          <button className="reader-primary" onClick={() => goToSection("cash-flow-map")}>Map the bridge <ArrowRight /></button>
        </div>
        <div className="payday-hero-visual" aria-hidden="true"><div className="bridge-card"><CalendarClock /><span>NEXT PAYDAY</span><strong>14 DAYS</strong><i /><small>PROTECT THE LOW POINT</small></div><div className="bridge-floor">$150 FLOOR</div></div>
      </section>

      <div className="reader-body">
        <section className="reader-section reader-intro">
          <p className="reader-lead">A monthly budget can prove that enough money comes in overall and still leave the chequing account short before the next deposit.</p>
          <p>Money has a calendar, and it is surprisingly firm about attending its appointments.</p>
          <p>This lesson builds a payday-to-payday cash-flow map. The goal is to know what is truly available, reserve money that already belongs to upcoming bills, protect daily essentials and identify the lowest expected balance before it becomes an overdraft or missed-payment problem.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/banking/overdraft-protection.html">FCAC: Getting overdraft protection</SourceLink></div>
          <Spotlight>A budget answers, “Can the month work?” A payday bridge answers, “Will the money be in the right account on the right day?” Both questions matter.</Spotlight>
          <h2 className="bureau-inline-heading">Welcome to the Payday Bridge</h2>
          <p>For each deposit, inspect four pieces of evidence. The bridge is safe only when the cash can reach the next reliable deposit without borrowing from money assigned elsewhere.</p>
          <div className="hearing-grid bridge-evidence">{bridgeEvidence.map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}</div>
          <div className="myth-list"><Myth reality="Monthly totals do not show sequence. A large withdrawal may arrive before the deposit intended to cover it. Cash-flow planning adds exact dates and a running balance to the monthly plan.">If my monthly budget balances, my account cannot go into overdraft.</Myth></div>
        </section>

        <section className="reader-section" id="cash-flow-map">
          <Heading number="02" title="Exhibit A: The Fourteen-Day Cash-Flow Map" />
          <p className="reader-lead">This fictional map starts with cleared money and records each expected transaction in date order.</p>
          <p>Pending deposits are not counted until they are reliable, and every balance is recalculated after the transaction.</p>
          <div className="cash-flow-table"><div className="cash-flow-head"><span>Date</span><span>Transaction</span><span>Change</span><span>Running balance</span></div>{cashFlowRows.map(([day, item, change, balance, question]) => <article key={`${day}-${item}`}><span>{day}</span><strong>{item}</strong><b>{change}</b><em>{balance}</em><p>{question}</p></article>)}</div>
          <div className="formula-card"><span>BRIDGE RESULT</span><strong>The cycle remains above $0, but its lowest projected balance is only $85.</strong><p>If Talia’s planned floor is $150, the bridge is $65 too thin before any forgotten or delayed transaction appears.</p></div>
          <div className="myth-list"><Myth reality="A balance combines money for several dates and purposes. Rent money does not become flexible spending merely because it arrived in the same account wearing the same dollar sign.">The balance on payday is available spending money.</Myth></div>
          <Spotlight>The highest balance can be emotionally impressive. The lowest projected balance is operationally useful. That low point reveals the bridge’s real risk.</Spotlight>
          <div className="story-card payday-story"><div className="story-content"><p className="reader-kicker">TALIA AND THE $150 FLOOR</p><h3>Meet Talia</h3><p>Talia lives in Calgary and is paid $1,850 every second Friday. With $125 already in chequing, payday lifts the balance to $1,975. It looks roomy enough to host a small parade. Talia knows several bills are coming, but she has never placed them in date order.</p><p>Before mapping the cycle, Talia spends $95 on dinner and a gift. On Day 8, her account is heading toward $115. Then she remembers a $129 annual streaming renewal scheduled for Day 11. After the remaining fuel and medication, her projected balance is negative $139.</p><p>Overdraft could allow some payments to clear, and an online ad offers cash until payday. Neither option repairs the calendar. The pressure is real, but the useful question is smaller: which transaction can be changed safely before Day 11, and what must remain protected?</p><p>Talia sets the warning above her $150 floor. It prompts a review that reveals the renewal. She cancels before its deadline and gets the phone date moved to Day 16 in writing. The bridge now reaches payday above $0, but the floor still needs rebuilding.</p><p>Talia’s repaired bridge reaches the next payday without using overdraft or high-cost credit. On the next deposit she restores the $150 floor first, then assigns bills and daily spending. Her bank balance is less exciting, which is excellent. The bridge has one job: make an ordinary Thursday remain ordinary.</p></div></div>
        </section>

        <section className="reader-section" id="assign-deposit">
          <Heading number="03" title="Assign the Deposit Before It Gets Friendly" />
          <ol className="priority-list">{assignmentSteps.map(([title, copy], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
        </section>

        <section className="reader-section" id="separation">
          <Heading number="04" title="The Three-Part Separation Method" />
          <div className="layer-grid bridge-layer-grid">{separationLayers.map(([layer, title, copy, Icon]) => <article key={layer}><Icon /><span>{layer}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <p>Use accounts at one institution, digital sub-accounts, envelopes or a ledger. Check fees, limits and transfer timing before opening anything new. The method needs separation, not three banks and a brass plaque.</p>
          <div className="myth-list"><Myth reality="No. The purpose is to prevent bill money from looking available. A no-fee sub-account, envelope or written ledger may create the same boundary when separate accounts are unsuitable.">The three-part bridge requires three financial institutions.</Myth></div>
          <Spotlight>Good cash-flow design reduces decisions. When bill money is visibly separated, the learner does not have to renegotiate rent with every debit-card tap.</Spotlight>
          <h2 className="bureau-inline-heading">Set a Floor and an Early-Warning Alert</h2>
          <div className="formula-card"><span>RUNNING-BALANCE FORMULA</span><strong>Previous balance + money in − money out = new projected balance.</strong><p>The smallest projected result is the bridge’s low point.</p></div>
          <div className="alert-card"><BellRing /><p>Federally regulated banks and federal credit unions must automatically alert a customer when a personal account falls below $100, or a different amount the customer sets. Keep contact information current. Alerts warn; they do not pause pending transactions.</p></div>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-electronic-documents.html">FCAC: Your right to receive electronic alerts</SourceLink></div>
        </section>

        <section className="reader-section" id="repairs">
          <Heading number="05" title="Five Repairs for a Thin or Broken Bridge" />
          <ol className="priority-list">{repairs.map(([title, copy], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
          <div className="myth-list"><Myth reality="A confirmed date change may improve timing, but it does not reduce the amount owed. Check whether the first changed cycle is shorter, longer or contains a catch-up amount.">Moving a due date makes the bill cheaper.</Myth></div>
          <Spotlight>A timing repair changes when money moves. A spending repair changes how much money moves. Name which repair you are making so the next cycle does not inherit a mystery.</Spotlight>
        </section>

        <section className="reader-section" id="guardrails">
          <Heading number="06" title="Canadian Guardrails and Province Lens" />
          <p className="reader-lead">As of March 12, 2026, a federally regulated bank or federal credit union cannot charge more than $10 in NSF fees on a personal deposit account, cannot charge an NSF fee more than once per account within two business days, and cannot charge one when the overdraft amount is under $10.</p>
          <p>A returned payment may still create consequences outside the bank, so prevention remains the stronger plan.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/banking/bank-accounts/chequing-accounts.html">FCAC: Chequing accounts — non-sufficient funds fees</SourceLink></div>
          <p>The bridge method is national. If a shortfall pushes the learner toward high-cost credit, payday lending is provincially regulated. Verify current rules and licensing with the official regulator.</p>
          <div className="province-budget-grid">{provinces.map(([province, copy]) => <article key={province}><span>{province}</span><p>{copy}</p></article>)}</div>
        </section>

        <section className="reader-section" id="quick-check">
          <Heading number="07" title="Quick Check: Bridge or Warning Sign?" />
          <div className="quick-checks">{quickChecks.map(([prompt, answer], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b></div></details>)}</div>
          <h2 className="bureau-inline-heading">Before You Map Your Next Fourteen Days</h2>
          <div className="myth-list"><Myth reality="Overdraft is credit and may involve fees and daily interest. FCAC describes it as a short-term way to cover a necessary expense, not an ongoing solution for repeated shortfalls. Course 2.6 examines overdraft in detail.">Overdraft is my emergency fund between paydays.</Myth></div>
          <Spotlight>If the bridge breaks in the same place every cycle, the problem is no longer a surprise. The plan needs a permanent repair involving timing, amount, income or support.</Spotlight>
        </section>

        <section className="reader-section" id="action">
          <Heading number="08" title="Your Action (Fill Out Form): Fourteen-Day Payday Bridge" />
          <div className="checkin-intro"><p className="reader-lead">Use shortened account or bill names.</p><p>Do not place full account numbers, passwords, card details or government identification numbers in course notes.</p></div>
          {complete ? <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 2.2 COMPLETE</p><h3>Payday bridge complete{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your cash-flow evidence is saved on this device.</p><button className="reader-primary" onClick={() => window.print()}>Print bridge notes <FileCheck2 /></button></div> :
            <div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}>
              <div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required /></label></div>
              <label><span><b>11</b>LANDING — What is the date and reliable take-home amount of your next deposit?</span><textarea name="landing" rows="3" required /></label>
              <label><span><b>12</b>STARTING POINT — What is your cleared opening balance? What floor amount will remain assigned and unavailable for spending?</span><textarea name="startingPoint" rows="3" required /></label>
              <label><span><b>13</b>OWNERSHIP — List every fixed bill, minimum payment and automatic withdrawal due before the next deposit, with its exact date and amount.</span><textarea name="ownership" rows="4" required /></label>
              <label><span><b>14</b>CROSSING — How much is realistically needed for groceries, fuel, medication, child-related costs and other essentials during this pay period?</span><textarea name="crossing" rows="3" required /></label>
              <label><span><b>15</b>SEPARATION — How much will move to bills holding, daily spending and the protected floor immediately after payday?</span><textarea name="separation" rows="3" required /></label>
              <label><span><b>16</b>LOW POINT — After calculating each dated transaction, what is the lowest projected balance and on which date does it occur?</span><textarea name="lowPoint" rows="3" required /></label>
              <label><span><b>17</b>WARNING SYSTEM — What alert threshold will warn you before the floor is crossed? Name one pending transaction you must monitor.</span><textarea name="warning" rows="3" required /></label>
              <label><span><b>18</b>VERDICT — Is the bridge SAFE, THIN or SHOWING A GAP? State one repair and the exact date you will confirm it.</span><textarea name="verdict" rows="4" required /></label>
              <label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label>
              <button className="reader-primary">Complete Course 2.2 <ArrowRight /></button><small><ShieldCheck />Do not include account numbers, passwords, card details or government identification numbers.</small>
            </form></div>}
          <h2 className="bureau-inline-heading">Payday Bridge Safety Checklist</h2>
          <div className="verdict-checklist">
            <p><Check /><span><strong>Deposits are reliable.</strong> Dates and amounts use net money expected to clear, not hopeful or unconfirmed income.</span></p>
            <p><Check /><span><strong>Every automatic withdrawal is dated.</strong> Bills, minimum payments, transfers and renewals appear before the next deposit.</span></p>
            <p><Check /><span><strong>Essentials can cross.</strong> Daily needs are realistic and are not squeezed merely to make the arithmetic look calm.</span></p>
            <p><Check /><span><strong>The floor is protected.</strong> Its amount is excluded from spending and the alert threshold gives useful warning time.</span></p>
            <p><Check /><span><strong>Repairs are confirmed.</strong> Provider changes are documented, and the map is updated after every decision.</span></p>
          </div>
          <h2 className="bureau-inline-heading">Check Your Thinking</h2>
          <div className="thinking-grid">{thinking.map(([number, copy]) => <article key={number}><span>{number}</span><p>{copy}</p></article>)}</div>
          <div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>A payday bridge begins with cleared cash and the next reliable deposit.</h3><span>It assigns every dated obligation and daily essential, protects a floor balance, then uses the lowest projected balance to decide whether the cycle is safe, thin or showing a gap.</span></div></div>
          <Spotlight>The bridge is complete when each deposit can carry its assigned responsibilities to the next reliable deposit without borrowing from rent, essentials or tomorrow’s pay.</Spotlight>
        </section>

        <section className="reader-section reader-glossary" id="glossary">
          <Heading number="09" title="Glossary of Terms" />
          <dl>{course22Glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
        </section>
      </div>
      <footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
    </main>
  </div>;
}
