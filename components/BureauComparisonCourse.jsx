"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, ChevronDown,
  Clock3, FileCheck2, Files, Landmark, Lightbulb, LockKeyhole, Menu,
  SearchCheck, ShieldAlert, ShieldCheck, X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course12Glossary, course12Sections } from "../lib/course-12-data";

const learnerKey = "cp-course-1-2-learner";
const completionKey = "cp-course-1-2-complete";
const submissionKey = "cp-course-1-2-submissions";

const reasons = [
  ["Different reporting dates", "One bureau may show an older balance because the lender sent its update on a different date.", CalendarDays],
  ["Different reporting relationships", "A lender may provide account information to one bureau but not the other.", Landmark],
  ["Different names", "A store card or financing account may appear under the legal financing company or parent organization instead of the brand name you remember.", Files],
  ["Different display formats", "The same account status may sit in a different section or use different wording. Compare facts, not aisle numbers.", BookOpen],
  ["Different inquiry detail", "The consumer-facing information you see may include inquiry details that are not shown in the shorter report supplied to a business.", SearchCheck],
];

const scenarios = [
  ["Same account, different balances, different reporting dates", "Check the dates and recent statements before calling it an error.", ""],
  ["Same account, same date, one report says 30 days late and your payment proof shows on-time", "Verify and prepare a dispute if the bureau information is wrong.", ""],
  ["Store card appears under a financing-company name you recognize after checking", "Likely an explained naming difference.", ""],
  ["An account appears that you do not recognize", "Investigate promptly; ownership matters more than layout.", ""],
  ["You check both of your own reports", "This does not lower your credit score, according to FCAC.", ""],
];

function Spotlight({ children }) {
  return <aside className="reader-spotlight"><Lightbulb aria-hidden="true" /><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>;
}

function SourceLink({ href, children }) {
  return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14} aria-hidden="true" /></a>;
}

function Heading({ number, title }) {
  return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>;
}

function Myth({ children, reality }) {
  return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2 />{reality}</div></article>;
}

export function BureauComparisonCourse({ course }) {
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
      setScrollProgress(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0);
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] });
    course12Sections.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", updateProgress); };
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
      `11. Equifax: ${data.equifax}`,
      `12. TransUnion: ${data.transunion}`,
      `13. First check: ${data.firstCheck}`,
      `14. Unrecognized account: ${data.unrecognized}`,
      `15. Automatic error: ${data.automaticError}`,
    ].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]");
    rows.unshift({ ...nextLearner, lesson: 2, lessonTitle: "Two-File Investigation", response, submittedAt: new Date().toISOString() });
    localStorage.setItem(submissionKey, JSON.stringify(rows));
    localStorage.setItem(learnerKey, JSON.stringify(nextLearner));
    localStorage.setItem(completionKey, "true");
    setLearner(nextLearner);
    setComplete(true);
  }

  return <div className="reader-shell bureau-course">
    <div className="reader-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
    <header className="reader-header">
      <button className="reader-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open course contents"><Menu /></button>
      <Brand />
      <div className="reader-header-meta"><BookOpen size={17} /><span>Course 1.2</span><i /><span>{scrollProgress}% read</span></div>
      <a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a>
    </header>

    <aside className={`reader-nav ${menuOpen ? "open" : ""}`} aria-label="Course contents">
      <div className="reader-nav-head"><div><span>COURSE 1.2</span><strong>On this page</strong></div><button onClick={() => setMenuOpen(false)} aria-label="Close course contents"><X /></button></div>
      <nav>{course12Sections.map((section, index) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}</nav>
      <div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div>
    </aside>
    {menuOpen && <button className="reader-scrim" aria-label="Close course contents" onClick={() => setMenuOpen(false)} />}

    <main className="reader-main">
      <section className="reader-hero bureau-hero" id="start">
        <div className="reader-hero-copy">
          <p className="reader-kicker">{course.eyebrow}</p>
          <h1>{course.title}</h1>
          <p className="reader-subtitle">{course.subtitle}</p>
          <p className="reader-deck">Your first job is not to choose a winner. Your job is to ask: What is different, why is it different, and does it need action?</p>
          <div className="reader-meta"><span><Clock3 />{course.duration}</span><span><FileCheck2 />One course check-in</span></div>
          <button className="reader-primary" onClick={() => goToSection("differences")}>Start comparing <ArrowRight /></button>
        </div>
        <div className="bureau-hero-visual" aria-hidden="true"><div className="bureau-file equifax-file"><span>E</span><strong>Equifax</strong><i /><i /><i /></div><div className="bureau-file transunion-file"><span>TU</span><strong>TransUnion</strong><i /><i /><i /></div><div className="bureau-you"><Check />ONE YOU</div></div>
      </section>

      <div className="reader-body">
        <section className="reader-section reader-intro">
          <p className="reader-lead">If Equifax and TransUnion matched every line perfectly, Canadian paperwork might finally be accused of showing off.</p>
          <p>In real life, the two reports can look different and still both make sense. Canada’s two main consumer credit bureaus—Equifax and TransUnion—maintain separate credit files. Lenders may report to one bureau, both bureaus, or update them at different times.</p>
          <p>That means a mismatch is not automatically a mistake. Your first job is not to choose a winner. Your job is to ask: What is different, why is it different, and does it need action?</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/order-credit-report.html">FCAC: Getting your credit report and score</SourceLink></div>
          <Spotlight>You do not have one master Canadian credit file. Equifax and TransUnion keep separate files, so one report can contain information the other does not.</Spotlight>
          <h2 className="bureau-inline-heading">Meet the Two Files</h2>
          <p>A credit report is the record. A credit score is a number calculated from credit-report information. So two different scores do not prove that one bureau has made an error.</p>
          <div className="bureau-definition-grid"><article><span>THE RECORD</span><h3>Credit report</h3><p>A credit report is the record.</p></article><article><span>THE NUMBER</span><h3>Credit score</h3><p>A credit score is a number calculated from credit-report information.</p></article></div>
          <p>Think of the reports as two camera photos of the same busy street taken at different moments. The street is real. The cars can change between pictures. The useful skill is checking the timestamp before declaring a traffic mystery.</p>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-report">TransUnion Canada: What is a credit report?</SourceLink></div>
        </section>

        <section className="reader-section" id="differences">
          <Heading number="01" title="Why the information may differ" />
          <p className="reader-lead">Most differences become easier to understand once you compare the underlying account rather than the page layout.</p>
          <div className="factor-grid bureau-reason-grid">{reasons.map(([title, copy, Icon], index) => <article key={title}><div><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-report">TransUnion Canada: What is a credit report?</SourceLink></div>
          <Spotlight>A reported balance is a snapshot tied to a reporting date. If you paid yesterday but the bureau file was updated earlier, the report has not failed a math test—it may simply be showing the earlier snapshot.</Spotlight>
          <h2 className="bureau-inline-heading">Quick Myth Check</h2>
          <div className="myth-list">
            <Myth reality="Different lender reporting and update timing can create legitimate differences. Verify the dates and account facts first.">If the two reports are different, one of them must be wrong.</Myth>
            <Myth reality="A more flattering report is not automatically more accurate. Accuracy depends on ownership, dates, status, balances, limits and the information actually reported.">The report with the better-looking balance or score is the accurate one.</Myth>
            <Myth reality="Checking your own credit report or score does not affect your credit score, according to FCAC.">Checking both reports will lower my credit score.</Myth>
          </div>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink></div>
        </section>

        <section className="reader-section" id="mystery">
          <Heading number="02" title="The $920 mystery" />
          <div className="story-card bureau-story"><div className="story-content"><p className="reader-kicker">A TIMING DIFFERENCE OR SOMETHING MORE?</p><h3>Here’s Jamie.</h3><p>He opens both credit reports before breakfast, which is an ambitious way to introduce paperwork to a perfectly innocent morning.</p><p>His Equifax report shows a card balance of $920. His TransUnion report shows $1,840. Jamie’s first thought is that one bureau misplaced a calculator.</p><div className="jamie-timeline"><span><b>JUN 18</b>TransUnion account snapshot: $1,840</span><i /><span><b>JUN 22</b>Jamie made a $920 payment</span><i /><span><b>JUL 03</b>Equifax account snapshot: $920</span></div><p>Then he checks the dates. TransUnion’s account snapshot was updated June 18. Jamie made a $920 payment on June 22. Equifax shows an update dated July 3. The balances now tell a sensible story: one report captured the account before the payment; the other captured it after.</p><p>But Jamie also notices a credit-card account on one report that he does not recognize. That is different. Reporting timing can explain a balance snapshot. It does not explain ownership of an unfamiliar account. Jamie labels the balance mismatch “explained” and the unfamiliar account “verify promptly.” Same comparison, different priority.</p></div></div>
        </section>

        <section className="reader-section" id="investigation">
          <Heading number="03" title="The two-file investigation" />
          <p className="reader-lead">Compare one account at a time. This keeps the task small enough to finish and makes it easier to separate harmless timing differences from facts that deserve attention.</p>
          <ol className="priority-list">
            <li><span>6</span><div><h3>Confirm the account belongs to you.</h3><p>Match the creditor name, account type and enough details to recognize the account. A corporate name can look unfamiliar even when the account is yours.</p></div></li>
            <li><span>7</span><div><h3>Check the reporting dates.</h3><p>Do this before comparing balances. Different dates can create perfectly normal differences.</p></div></li>
            <li><span>8</span><div><h3>Compare the core facts.</h3><p>Look at balance, credit limit or original loan amount, payment status and whether the account is open, closed or paid.</p></div></li>
            <li><span>9</span><div><h3>Separate display differences from factual differences.</h3><p>Different wording or placement is less important than wrong ownership, payment history, balance or status.</p></div></li>
            <li><span>10</span><div><h3>Assign a next-step label.</h3><p>Use one of four labels: Match, Explained Difference, Needs Verification, or Dispute Promptly.</p></div></li>
          </ol>
          <Spotlight>Checking your own credit report is a soft check for scoring purposes. FCAC says checking your own report or score does not affect your credit score—so you can investigate without treating the ‘view report’ button like a trap door.</Spotlight>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/order-credit-report.html">FCAC: Getting your credit report and credit score</SourceLink></div>
        </section>

        <section className="reader-section" id="attention">
          <Heading number="04" title="What usually needs less urgency" />
          <p className="reader-lead">These differences can be ordinary, although you should still verify anything you cannot explain: a different update date; an old address on only one report; a familiar account under a parent or financing-company name; a closed account placed in a different section; or a creditor that appears on only one bureau file.</p>
          <div className="urgency-grid"><article><ShieldCheck /><span>USUALLY LESS URGENCY</span><h3>Differences that can be ordinary</h3><ul><li>A different update date</li><li>An old address on only one report</li><li>A familiar account under a parent or financing-company name</li><li>A closed account placed in a different section</li><li>A creditor that appears on only one bureau file</li></ul></article><article><ShieldAlert /><span>PROMPT ATTENTION</span><h3>What deserves prompt attention</h3><ul><li>An account that is not yours</li><li>A false late payment</li><li>An unfamiliar application-related inquiry</li><li>A paid debt shown as unpaid</li><li>A wrong collection or insolvency record</li><li>A materially incorrect balance or limit</li></ul></article></div>
          <h2 className="bureau-inline-heading">What Deserves Prompt Attention</h2>
          <p>Move faster when the difference could change who owns an account or how your credit history is represented: an account that is not yours, a false late payment, an unfamiliar application-related inquiry, a paid debt shown as unpaid, a wrong collection or insolvency record, or a materially incorrect balance or limit.</p>
          <p>If you believe information is wrong, keep the evidence that supports your position—such as statements, receipts or payment confirmations—and follow the bureau’s dispute process. FCAC says you have the right to dispute information you believe is wrong and that credit bureaus must correct errors for free.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking for errors and fraud</SourceLink><SourceLink href="https://www.equifax.ca/personal/dispute-credit-report/">Equifax Canada: Dispute information</SourceLink></div>
          <h2 className="bureau-inline-heading">A Note About TransUnion Inquiry Lists</h2>
          <p>TransUnion calls its consumer-facing file a Consumer Disclosure. TransUnion says this disclosure is a complete account of the information on its credit file and lists all inquiries, including account-management, non-credit-related and your own inquiries. Its Business Version is abbreviated. That means a longer inquiry list on your disclosure is not, by itself, proof that a lender saw every item in the same way.</p>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/product/consumer-disclosure">TransUnion Canada: Consumer Disclosure</SourceLink></div>
          <Spotlight>TransUnion’s Consumer Disclosure can show more inquiry detail than its Business Version. A longer list on the consumer file is not automatically a longer list of credit applications.</Spotlight>
          <div className="mismatch-test"><p>THE FIVE-QUESTION MISMATCH TEST</p>{[["Dates","Are the reporting dates the same?"],["Reporting","Does this creditor appear to report to both bureaus?"],["Display","Is the account actually different, or only named or displayed differently?"],["Impact","Does the mismatch affect ownership, payment history, balance, limit, account status or serious public-record information?"],["Priority","Is the item a match, an explained difference, something to verify, or something to dispute promptly?"]].map(([label, copy], index) => <div key={label}><span>{index + 1}</span><strong>{label}</strong><p>{copy}</p></div>)}</div>
        </section>

        <section className="reader-section" id="quick-check">
          <Heading number="05" title="Quick check" />
          <p className="reader-lead">Before moving on, decide what you would do in each case:</p>
          <div className="quick-checks">{scenarios.map(([prompt, answer, reason], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b><p>{reason}</p></div></details>)}</div>
          <h2 className="bureau-inline-heading">Your Action</h2>
          <p>Choose one active account you recognize. Do a two-file comparison using the most recent Equifax and TransUnion reports you can access. Do not try to solve your entire credit history in one sitting; paperwork also benefits from portion control.</p>
          <div className="action-preview"><p><b>11.</b> One account to compare: <span /></p><p><b>12.</b> The biggest difference I notice: <span /></p><p><b>13.</b> My next-step label: <strong>□ Match&nbsp;&nbsp; □ Explained Difference&nbsp;&nbsp; □ Needs Verification&nbsp;&nbsp; □ Dispute Promptly</strong></p></div>
          <div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>Neither bureau is automatically the ‘correct’ one because its report looks cleaner.</h3><span>Compare account ownership, dates and core facts first. A mismatch is not a conclusion; it is a question with paperwork attached.</span></div></div>
          <Spotlight>If information is genuinely wrong, you can dispute it. FCAC says credit bureaus must correct errors for free. If the problem appears in both files, check both bureau records rather than assuming one correction will automatically solve everything.</Spotlight>
        </section>

        <section className="reader-section" id="action">
          <Heading number="06" title="Your Action (Fill Out Form): Two-File Investigation" />
          <div className="checkin-intro"><p className="reader-lead">Write your answer in your own words before checking the guide.</p><p>Use a real account for Questions 11–13 only if you are comfortable doing so; do not enter full account numbers in course notes.</p></div>
          {complete ? <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 1.2 COMPLETE</p><h3>Nicely done{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your check-in is saved on this device. You can review any section above or print this page for reference.</p><button className="reader-primary" onClick={() => window.print()}>Print course notes <FileCheck2 /></button></div> : <div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}>
            <div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required autoComplete="name" /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required autoComplete="email" /></label></div>
            <label><span><b>11</b>What balance and reporting date appear on Equifax?</span><textarea name="equifax" rows="3" required /></label>
            <label><span><b>12</b>What balance and reporting date appear on TransUnion for the same account?</span><textarea name="transunion" rows="3" required /></label>
            <label><span><b>13</b>If the balances differ, what is the most likely explanation you should check first?</span><textarea name="firstCheck" rows="3" required /></label>
            <label><span><b>14</b>One report shows an account you do not recognize. Is this low urgency or prompt attention? What would you do next?</span><textarea name="unrecognized" rows="3" required /></label>
            <label><span><b>15</b>True or False: Different Equifax and TransUnion information automatically proves that one bureau made an error.</span><textarea name="automaticError" rows="3" required /></label>
            <label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label>
            <button className="reader-primary">Complete Course 1.2 <ArrowRight /></button>
            <small><ShieldCheck />Do not include a SIN, full account number, password or other sensitive financial information.</small>
          </form></div>}
          <details className="thinking-guide"><summary>Check Your Thinking <ChevronDown /></summary><div><p><b>11–12.</b> Your answers will depend on your reports. The important habit is recording the balance together with its reporting date, not copying the number by itself.</p><p><b>13.</b> Check reporting dates first. Then compare recent statements or payment activity and confirm whether the creditor reports to both bureaus.</p><p><b>14.</b> Prompt attention. Confirm that the name is not a familiar lender under a different legal name. If you still do not recognize the account, follow the bureau/lender verification or dispute process and consider fraud steps when appropriate.</p><p><b>15.</b> False. Different reporting dates, lender reporting relationships and display formats can create legitimate differences.</p></div></details>
        </section>

        <section className="reader-section reader-glossary" id="glossary"><Heading number="07" title="Glossary of terms" /><dl>{course12Glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>
      </div>
      <footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
    </main>
  </div>;
}
