"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, BellRing, BookOpen, Check, CheckCircle2, ChevronDown,
  CircleDollarSign, Clock3, CreditCard, FileCheck2, Landmark, Lightbulb,
  ListChecks, LockKeyhole, Menu, SearchCheck, ShieldCheck, WalletCards, X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course15Glossary, course15Sections } from "../lib/course-15-data";

const learnerKey = "cp-course-1-5-learner";
const completionKey = "cp-course-1-5-complete";
const submissionKey = "cp-course-1-5-submissions";

const ladder = [
  ["RUNG 1", "Choose one suitable starting product", "Look for an account you can afford, understand and realistically manage every month."],
  ["RUNG 2", "Confirm reporting", "Ask whether the provider reports the account to Equifax, TransUnion or both. A product cannot help create bureau history in the way you expect if the relevant activity is not reported."],
  ["RUNG 3", "Plan light use", "Give the account one or two small, budgeted jobs instead of inventing new spending to make the card feel important."],
  ["RUNG 4", "Pay reliably", "Protect the due date first. When using a credit card, paying the statement balance in full is the cleaner cost-control habit when you can do it."],
  ["RUNG 5", "Check the result", "After the account has had time to report, review your credit files and confirm the account details appear accurately."],
];

const products = [
  ["Student or newcomer credit card.", "Some financial institutions offer products for people with limited Canadian credit history. Eligibility and terms vary, so compare the actual agreement rather than the category name.", CreditCard],
  ["Secured credit card.", "You provide a security deposit and receive a credit limit under the issuer’s terms. FCAC says this may be an option when you do not have a credit history. Course 6 will examine secured cards in depth.", ShieldCheck],
  ["Credit-builder or secured loan.", "If available, confirm the total cost, when funds are released, cancellation rules and exactly what is reported. Do not borrow simply to create debt if a simpler, cheaper route meets your needs.", Landmark],
  ["Additional cardholder / authorized user.", "This can provide access to someone else’s card account, but do not assume it creates a tradeline on your own Canadian credit file. Confirm the issuer’s reporting practice before treating it as a building strategy.", WalletCards],
];

const filters = [
  ["Reporting", "Which Canadian credit bureau or bureaus receive account information?"],
  ["Total cost", "What are the annual, monthly, setup and other unavoidable fees? What interest rate applies if you carry a balance?"],
  ["Deposit", "Is one required? Where is it held, and how and when can it be returned?"],
  ["Payment", "Can you easily see the statement, due date, minimum payment and available payment methods?"],
  ["Limit", "Is the limit small enough to manage comfortably but useful for your planned expense?"],
  ["Exit or upgrade", "Can you close, change or graduate from the product without a nasty surprise?"],
  ["Purpose", "Does this solve a real need, or are you applying because the ad used words like “guaranteed” and a very confident font?"],
];

const routine = [
  ["Give it one planned job.", "A phone bill, transit pass or one small grocery category is enough. The purchase should already exist in your budget.", ListChecks],
  ["Keep the balance comfortably below the limit.", "You do not need to chase a magic percentage. The basic lesson is simpler: avoid getting close to the limit and do not use the card as extra income.", CircleDollarSign],
  ["Protect the due date.", "Pay at least the required minimum by the due date. If cash flow allows, paying the statement balance in full keeps the routine cleaner and can avoid purchase interest when the card’s grace-period rules apply.", Clock3],
  ["Turn on alerts.", "Use payment-due and transaction alerts as guardrails, not as a substitute for reviewing the statement.", BellRing],
  ["Check every statement.", "Verify purchases, payment posting, fees and anything you do not recognize.", FileCheck2],
  ["Verify the bureau file later.", "After the account has had time to report, check your credit report and make sure the account belongs to you and is being reported accurately.", SearchCheck],
];

const quickChecks = [
  ["A starter card reports to a bureau, has a clear low cost and fits your budget", "Reasonable candidate to investigate further."],
  ["A “credit-building” product will not clearly say whether it reports to Equifax or TransUnion", "Pause. Confirm reporting before relying on it."],
  ["You have a $1,000 limit and want to spend $900 just to build faster", "No. More spending is not the goal; manageable, reliable use is."],
  ["You can pay the statement balance in full, but someone tells you to leave $20 unpaid for your score", "Pay according to your budget and agreement. Deliberately paying interest is not required for credit-building."],
  ["You are an additional cardholder and assume the account is building your own file", "Verify the issuer’s reporting practice instead of assuming."],
];

function Spotlight({ children }) { return <aside className="reader-spotlight"><Lightbulb aria-hidden="true" /><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>; }
function SourceLink({ href, children }) { return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14} aria-hidden="true" /></a>; }
function Heading({ number, title }) { return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>; }
function Myth({ children, reality }) { return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2 />{reality}</div></article>; }

export function BuildCreditCourse({ course }) {
  const [activeSection, setActiveSection] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [learner, setLearner] = useState({ name: "", email: "" });
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { try { setLearner(JSON.parse(localStorage.getItem(learnerKey)) || { name: "", email: "" }); setComplete(localStorage.getItem(completionKey) === "true"); } catch {} });
    const updateProgress = () => { const available = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0); };
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActiveSection(visible.target.id); }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] });
    course15Sections.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    updateProgress(); window.addEventListener("scroll", updateProgress, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", updateProgress); };
  }, []);

  function goToSection(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
  function submitActivity(event) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const nextLearner = { name: data.name, email: data.email };
    const response = [`11. Starting route: ${data.route}`, `12. Reporting check: ${data.reporting}`, `13. Cost check: ${data.cost}`, `14. Planned use: ${data.use}`, `15. Payment system: ${data.payment}`, `16. Red flag test: ${data.redFlag}`, `17. Verify later: ${data.verify}`].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]"); rows.unshift({ ...nextLearner, lesson: 5, lessonTitle: "My First Credit Ladder", response, submittedAt: new Date().toISOString() }); localStorage.setItem(submissionKey, JSON.stringify(rows)); localStorage.setItem(learnerKey, JSON.stringify(nextLearner)); localStorage.setItem(completionKey, "true"); setLearner(nextLearner); setComplete(true);
  }

  return <div className="reader-shell build-course">
    <div className="reader-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
    <header className="reader-header"><button className="reader-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open course contents"><Menu /></button><Brand /><div className="reader-header-meta"><BookOpen size={17} /><span>Course 1.5</span><i /><span>{scrollProgress}% read</span></div><a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a></header>
    <aside className={`reader-nav ${menuOpen ? "open" : ""}`} aria-label="Course contents"><div className="reader-nav-head"><div><span>COURSE 1.5</span><strong>On this page</strong></div><button onClick={() => setMenuOpen(false)} aria-label="Close course contents"><X /></button></div><nav>{course15Sections.map((section, index) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}</nav><div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div></aside>
    {menuOpen && <button className="reader-scrim" aria-label="Close course contents" onClick={() => setMenuOpen(false)} />}

    <main className="reader-main">
      <section className="reader-hero build-hero" id="start"><div className="reader-hero-copy"><p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p><p className="reader-deck">The point of this lesson is to create useful credit history without turning your wallet into a science experiment.</p><div className="reader-meta"><span><Clock3 />{course.duration}</span><span><FileCheck2 />One course check-in</span></div><button className="reader-primary" onClick={() => goToSection("ladder")}>Build the first rung <ArrowRight /></button></div><div className="ladder-hero-visual" aria-hidden="true"><div className="credit-ladder">{[5,4,3,2,1].map((n) => <i key={n}><span>{n}</span></i>)}</div><div className="first-card"><CreditCard /><strong>ONE<br />MANAGEABLE<br />ACCOUNT</strong></div></div></section>

      <div className="reader-body">
        <section className="reader-section reader-intro"><p className="reader-lead">Starting with little or no Canadian credit history can feel like being asked for job experience before anyone will give you the first job.</p><p>Mildly inconvenient? Yes. Permanent problem? No. The point of this lesson is to create useful credit history without turning your wallet into a science experiment.</p><p>Having limited Canadian credit history is not the same as having a bad history. It means lenders and credit bureaus have less Canadian credit activity to evaluate. FCAC notes that a poor or limited history can make borrowing harder, while your score changes over time as lenders update the information in your file.</p><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink></div><Spotlight>No Canadian credit history is not the same thing as bad credit. You are not repairing a broken record; you are creating a useful record from the beginning.</Spotlight></section>

        <section className="reader-section" id="ladder"><Heading number="01" title="The First Credit Ladder" /><p className="reader-lead">Your goal is not to race to the top. Build one rung that can safely hold your weight, then repeat the behaviour that makes the account useful.</p><div className="ladder-list">{ladder.map(([rung, title, copy]) => <article key={rung}><span>{rung}</span><div><h3>{title} —</h3><p>{copy}</p></div></article>)}</div><Spotlight>TransUnion’s guidance for building from scratch starts with “start slow”: one manageable card is more useful than several rushed applications that create new hard inquiries and new payment obligations.</Spotlight><div className="reader-links"><SourceLink href="https://www.transunion.ca/build-credit">TransUnion Canada: 5 Ways to Build Your Credit from Scratch</SourceLink></div></section>

        <section className="reader-section" id="product"><Heading number="02" title="Choose Your First Rung, Not Your Forever Product" /><p className="reader-lead">A starter product only needs to do a few jobs well: fit your budget, report the account, have understandable costs and give you a payment routine you can maintain. Possible routes include:</p><div className="product-route-grid">{products.map(([title, copy, Icon]) => <article key={title}><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-cards/choose-credit-card.html">FCAC: Choosing a credit card — Secured credit cards</SourceLink><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-cards/joint-credit-card.html">FCAC: Joint credit cards — Additional cardholder and authorized user</SourceLink></div><div className="privacy-note"><CircleDollarSign /><p><strong>DON’T BUY THE LABEL</strong> A product called “credit builder” is still a financial product with fees, terms and risks. A large fee wearing a motivational slogan is still a large fee.</p></div>
          <h2 className="bureau-inline-heading">The Seven-Question Product Filter</h2><p>Before you apply, make the product earn a place in your budget. Ask:</p><ol className="priority-list product-filter-list">{filters.map(([title, copy], index) => <li key={title}><span>{index + 1}</span><div><h3>{title} —</h3><p>{copy}</p></div></li>)}</ol><Spotlight>Reporting matters. TransUnion notes that companies are not required to report account information, so ask before relying on a product to build your bureau file.</Spotlight><div className="reader-links"><SourceLink href="https://www.transunion.ca/customer-support/faq">TransUnion Canada: Frequently Asked Questions — How do I build a good credit history?</SourceLink></div>
          <h2 className="bureau-inline-heading">Quick Myth Check</h2><div className="myth-list"><Myth reality="A thin or new Canadian file means there may be limited history to evaluate. That is different from a file containing established negative payment behaviour.">No score means I already have bad credit.</Myth><Myth reality="More applications can mean more hard inquiries and more accounts to manage. TransUnion recommends starting slowly with one manageable card.">Opening several cards at once will build credit faster.</Myth><Myth reality="You can build a payment record without deliberately paying purchase interest. FCAC encourages paying a credit-card balance off by the due date; carrying a balance increases borrowing cost.">I need to carry a balance and pay interest so the score knows I am serious.</Myth><Myth reality="Do not assume it does. An additional card links to the primary cardholder’s account. Confirm how the issuer reports before depending on it as your own credit-building route.">Being an authorized user automatically builds my Canadian credit file.</Myth></div>
        </section>

        <section className="reader-section" id="routine"><Heading number="03" title="Build the Routine That Actually Does the Work" /><p className="reader-lead">Once the account is open, the product becomes less important than the routine. Think of the account as a tiny monthly reliability test, not a permission slip to spend more.</p><div className="factor-grid routine-grid">{routine.map(([title, copy, Icon], index) => <article key={title}><div><Icon /><span>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="reader-section" id="payment"><Heading number="04" title="Partial Payment vs. Full Payment: What Changes?" /><p className="reader-lead">Paying at least the minimum by the due date meets the cycle’s minimum-payment requirement, but unpaid debt may generate interest. Paying the full statement balance generally avoids purchase interest when the card’s grace-period conditions apply.</p><p>For credit-building, the important lesson is not “full payment earns secret score points.” It is that on-time payment protects payment history, while a lower carried balance keeps debt and utilization easier to manage. The scoring formula is not a vending machine: inserting $23 of interest does not dispense 15 bonus points.</p><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-cards/pay-off-credit-card.html">FCAC: Paying off your credit card</SourceLink><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-cards/credit-card-work.html">FCAC: How credit cards work — Interest-free grace periods</SourceLink></div><Spotlight>You do not need to carry a balance to prove you can use credit. Paying in full can avoid purchase interest; paying only the minimum can make repayment slower and more expensive.</Spotlight>
          <div className="story-card build-story"><div className="story-content"><p className="reader-kicker">PRIYA’S EXTREMELY UNEXCITING SUCCESS STORY</p><h3>Almost nothing dramatic happens.</h3><p>Priya opens her first Canadian credit card with a $1,000 limit. She is briefly tempted to celebrate by buying something worth $997, which would certainly make the card feel included. Instead, she gives it one job: her $55 monthly phone bill.</p><p>When the statement arrives, Priya checks the amount and due date, then pays the full $55 statement balance from money already set aside in her budget. She keeps the card active, makes payments reliably and checks the statement each month. Later, she reviews her credit report to confirm the account is appearing accurately.</p><p>What did Priya <em>not</em> do? She did not add shopping trips to “feed the score,” open three more cards because one felt lonely, or leave $11 unpaid just to donate interest to the cause. The story works precisely because almost nothing dramatic happens.</p></div></div><Spotlight>Credit-building is evidence over time. TransUnion says establishing a good credit history takes time; no legitimate provider can promise that one product will produce a particular score on a particular date.</Spotlight><div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-score">TransUnion Canada: Credit score — Building a good credit history</SourceLink></div>
        </section>

        <section className="reader-section" id="quick-check"><Heading number="05" title="Quick Check: First-Rung Decisions" /><div className="quick-checks">{quickChecks.map(([prompt, answer], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b></div></details>)}</div><h2 className="bureau-inline-heading">Your Action: Pick One First Rung</h2><p>Do not apply during this exercise. Research first. Choose the one route you would investigate and write down the three facts that would determine whether it deserves an application.</p><div className="action-preview"><p><b>11.</b> Product or route I will investigate: <span /></p><p><b>12.</b> The first cost/reporting fact I need to verify: <span /></p><p><b>13.</b> One small expense I could already afford without credit: <span /></p></div><div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>Build from zero with one suitable reporting product, light planned use and reliable payments.</h3><span>You are creating evidence over time. There is no need to sprint, collect accounts or pay avoidable interest just to make the file look busy.</span></div></div><Spotlight>Your first account does not need to be impressive. It needs to be affordable, understandable, reported and boring enough that paying it on time becomes routine.</Spotlight></section>

        <section className="reader-section" id="action"><Heading number="06" title="Your Action (Fill Out Form): My First Credit Ladder" /><div className="checkin-intro"><p className="reader-lead">Use this as a research and planning worksheet, not an application.</p><p>Do not write full account numbers, SIN numbers, passwords or other unnecessary sensitive information here.</p></div>{complete ? <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 1.5 COMPLETE</p><h3>Nicely done{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your check-in is saved on this device. You can review any section above or print this page for reference.</p><button className="reader-primary" onClick={() => window.print()}>Print course notes <FileCheck2 /></button></div> : <div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}><div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required autoComplete="name" /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required autoComplete="email" /></label></div><label><span><b>11</b>STARTING ROUTE — Which product type will you investigate first, and why does it fit your situation?</span><textarea name="route" rows="3" required /></label><label><span><b>12</b>REPORTING CHECK — Does the provider say it reports to Equifax, TransUnion or both? How will you confirm this before applying?</span><textarea name="reporting" rows="3" required /></label><label><span><b>13</b>COST CHECK — List the annual/monthly/setup fees, interest rate and any deposit requirement you found.</span><textarea name="cost" rows="3" required /></label><label><span><b>14</b>PLANNED USE — Name one or two purchases already in your budget that could go on the account.</span><textarea name="use" rows="3" required /></label><label><span><b>15</b>PAYMENT SYSTEM — What is your plan for the due date, alerts and payment backup?</span><textarea name="payment" rows="3" required /></label><label><span><b>16</b>RED FLAG TEST — What would make you walk away from this product before applying?</span><textarea name="redFlag" rows="3" required /></label><label><span><b>17</b>VERIFY LATER — After the account begins reporting, what details will you check on your Canadian credit report?</span><textarea name="verify" rows="3" required /></label><label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label><button className="reader-primary">Complete Course 1.5 <ArrowRight /></button><small><ShieldCheck />Do not include full account numbers, SIN numbers, passwords or other sensitive information.</small></form></div>}
        </section>

        <section className="reader-section reader-glossary" id="glossary"><Heading number="07" title="Glossary of Terms" /><dl>{course15Glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>
      </div><footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
    </main>
  </div>;
}
