"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, Clock3,
  CreditCard, FileCheck2, FileSearch, Fingerprint, Flag, Gauge, HelpCircle, History, Landmark, Lightbulb,
  ListChecks, LockKeyhole, Menu, SearchCheck, ShieldAlert, ShieldCheck, X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course13Glossary, course13Sections } from "../lib/course-13-data";

const learnerKey = "cp-course-1-3-learner";
const completionKey = "cp-course-1-3-complete";
const submissionKey = "cp-course-1-3-submissions";

const reportStops = [
  ["STOP 1", "Identity", "Does the personal information make sense?", Fingerprint],
  ["STOP 2", "Accounts", "Do I recognize each account, and what does each field say?", FileSearch],
  ["STOP 3", "Codes & Labels", "Can I translate the important account into plain language?", ListChecks],
  ["STOP 4", "Inquiries", "Which checks relate to applications, and which do not?", SearchCheck],
  ["STOP 5", "Serious Items", "What needs context, evidence or prompt follow-up?", ShieldAlert],
];

const accountFields = [
  ["Creditor or lender name.", "Who is reporting the account? The legal company name may differ from the brand you remember.", Landmark],
  ["Account type.", "Is it a credit card, line of credit, instalment loan, mortgage or another reported credit account?", CreditCard],
  ["Date opened.", "Does the timing make sense for an account that belongs to you?", CalendarDays],
  ["Reported balance.", "How much was shown as owing when the lender’s information was captured?", CircleDollarSign],
  ["Credit limit or original amount.", "For revolving credit, look for the limit; for a loan, the report may show the original amount or other loan details.", Gauge],
  ["Payment history.", "Does the account show payments as agreed or report late/missed payments?", History],
  ["Account status.", "Is it shown as open, closed, paid, transferred, in collection or another status?", Flag],
];

const quickChecks = [
  ["Your report shows an old address where you really lived", "Recognize it as possible historical information; verify it rather than treating it as instant fraud."],
  ["Your report balance is higher than today’s banking-app balance, but the report date is two weeks old", "Check the reporting date and recent payment activity first."],
  ["A legal financing-company name looks unfamiliar, but the account details match your store card", "Verify the company relationship before deciding the account is not yours."],
  ["Your Consumer Disclosure contains several inquiry entries", "Separate application-related inquiries from account-review, non-credit-related and your own inquiries."],
  ["A credit-card account and recent application inquiry are both completely unfamiliar", "Red label. Verify promptly and follow current bureau/lender fraud or dispute steps if they are not yours."],
];

function Spotlight({ children }) {
  return <aside className="reader-spotlight"><Lightbulb aria-hidden="true" /><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>;
}

function SourceLink({ href, children }) {
  return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14} aria-hidden="true" /></a>;
}

function Heading({ number, kicker, title }) {
  return <div className="reader-section-heading"><span>{number}</span><div>{kicker && <p>{kicker}</p>}<h2>{title}</h2></div></div>;
}

function Myth({ children, reality }) {
  return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2 />{reality}</div></article>;
}

const accountCarouselSlides = [
  { src: "/images/course-1-3/ca-1.webp", alt: "Reviewing a credit account line by line to confirm the creditor, balance and status." },
  { src: "/images/course-1-3/ca-2.webp", alt: "Translating an account's details into a plain-English summary." },
];

function AccountImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % accountCarouselSlides.length), 4000);
    return () => window.clearInterval(interval);
  }, [paused]);

  function showSlide(index) {
    setActiveSlide((index + accountCarouselSlides.length) % accountCarouselSlides.length);
  }

  return <section
    className="course-image-carousel report-image-carousel"
    aria-label="Course image carousel"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {accountCarouselSlides.map((slide, index) => <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${accountCarouselSlides.length}`} aria-hidden={activeSlide !== index} key={slide.src}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 1050px) min(560px, 100vw), 560px"
          />
        </div>)}
      </div>
    </div>
    <button className="carousel-arrow previous" type="button" onClick={() => showSlide(activeSlide - 1)} aria-label="Previous image"><ChevronLeft /></button>
    <button className="carousel-arrow next" type="button" onClick={() => showSlide(activeSlide + 1)} aria-label="Next image"><ChevronRight /></button>
    <div className="carousel-dots" aria-label="Choose an image">{accountCarouselSlides.map((slide, index) => <button key={slide.src} type="button" className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />)}</div>
    <span className="carousel-status" aria-live="polite">Image {activeSlide + 1} of {accountCarouselSlides.length}</span>
  </section>;
}

export function CreditReportCourse({ course }) {
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
    course13Sections.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
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
      `11. Identity check: ${data.identity}`,
      `12. Account snapshot: ${data.snapshot}`,
      `13. Plain-English translation: ${data.translation}`,
      `14. Inquiry scan: ${data.inquiry}`,
      `15. Triage: ${data.triage}`,
    ].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]");
    rows.unshift({ ...nextLearner, lesson: 3, lessonTitle: "Guided Report Walkthrough", response, submittedAt: new Date().toISOString() });
    localStorage.setItem(submissionKey, JSON.stringify(rows));
    localStorage.setItem(learnerKey, JSON.stringify(nextLearner));
    localStorage.setItem(completionKey, "true");
    setLearner(nextLearner);
    setComplete(true);
  }

  return <div className="reader-shell report-course">
    <div className="reader-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
    <header className="reader-header"><button className="reader-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open course contents"><Menu /></button><Brand /><div className="reader-header-meta"><BookOpen size={17} /><span>Course 1.3</span><i /><span>{scrollProgress}% read</span></div><a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a></header>
    <aside className={`reader-nav ${menuOpen ? "open" : ""}`} aria-label="Course contents"><div className="reader-nav-head"><div><span>COURSE 1.3</span><strong>On this page</strong></div><button onClick={() => setMenuOpen(false)} aria-label="Close course contents"><X /></button></div><nav>{course13Sections.map((section, index) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}</nav><div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div></aside>
    {menuOpen && <button className="reader-scrim" aria-label="Close course contents" onClick={() => setMenuOpen(false)} />}

    <main className="reader-main">
      <section className="reader-hero report-hero" id="start"><div className="reader-hero-media report-hero-media" aria-hidden="true"><Image src="/images/course-1-3/course-3-bg.webp" alt="" fill priority sizes="(max-width: 1050px) 100vw, calc(100vw - 272px)" /></div><div className="reader-hero-copy"><p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p><p className="reader-deck">This lesson is a guided walkthrough. You will move through the report in five stops: identity, credit accounts, codes and labels, inquiries, and serious items.</p><div className="reader-meta"><span><Clock3 />{course.duration}</span><span><FileCheck2 />One course check-in</span></div><button className="reader-primary" onClick={() => goToSection("identity")}>Start the walkthrough <ArrowRight /></button></div><div className="report-hero-visual" aria-hidden="true"><div className="report-sheet"><div><span>CANADIAN CREDIT REPORT</span><strong>FILE REVIEW</strong></div><i /><i /><i /><section><b>IDENTITY</b><b>ACCOUNTS</b><b>INQUIRIES</b></section><ShieldCheck /></div></div></section>

      <div className="reader-body">
        <section className="reader-section reader-intro">
          <p className="reader-lead">A Canadian credit report can look like a committee treated plain English as an optional upgrade.</p>
          <p>The good news: you do not have to read it like a novel—or understand every line on the first pass.</p>
          <p>This lesson is a guided walkthrough. You will move through the report in five stops: identity, credit accounts, codes and labels, inquiries, and serious items. At each stop, your only job is to answer a few simple questions before moving on.</p>
          <p>FCAC describes a credit report as a summary of how you have used credit in the past. It can include personal information, credit accounts, balances, payment history, collection information, public-record information and inquiries. The report is the file; a credit score is a number calculated from information in that file.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink></div>
          <Spotlight>Your credit report and your credit score are related, but they are not the same thing. Read the report for the facts behind the number.</Spotlight>
          <h2 className="bureau-inline-heading">Your Five-Stop Report Map</h2>
          <div className="report-stop-map">{reportStops.map(([stop, title, question, Icon]) => <article key={stop}><Icon /><span>{stop}</span><h3>{title}</h3><p>{question}</p></article>)}</div>
        </section>

        <section className="reader-section" id="identity">
          <Heading number="01" kicker="WALKTHROUGH STOP 1" title="Confirm Your Identity Information" />
          <p className="reader-lead">Start with the easy landmarks: your name, date of birth, current and previous addresses, phone information and any employer information shown. Not every report contains every field, and older information can remain as part of your file history.</p>
          <p>An old address you actually used is not the same as an address you have never seen. Treat unfamiliar identity information as a clue to investigate—especially if it appears alongside an account you do not recognize—but do not jump from ‘odd’ to ‘fraud’ without checking.</p>
          <div className="identity-check-card"><Fingerprint /><div><span>IDENTITY CHECK</span><strong>Name · Date of birth · Addresses · Phone · Employer</strong><p>Familiar history is different from information you have never seen.</p></div></div>
        </section>

        <section className="reader-section" id="accounts">
          <Heading number="02" kicker="WALKTHROUGH STOP 2" title="Review Every Credit Account" />
          <p className="reader-lead">Now move to the accounts. Credit accounts may also be called tradelines. Read one account from top to bottom before moving to the next. Trying to compare six accounts at once is how perfectly reasonable people end up arguing with a PDF.</p>
          <p>For each account, find these seven fields when they are available:</p>
          <div className="account-field-grid">{accountFields.map(([title, copy, Icon], index) => <article key={title}><span>{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink><SourceLink href="https://www.equifax.ca/personal/education/credit-report/articles/-/learn/what-information-is-in-a-credit-report/">Equifax Canada: What information is in a credit report?</SourceLink></div>
          <div className="reader-context-media report-context-media">
            <div className="reader-context-copy">
              <Spotlight>Before deciding a balance is wrong, check its reporting date. Your online banking balance may be today’s number while the credit report is showing an earlier snapshot.</Spotlight>
            </div>
            <AccountImageCarousel />
          </div>
          <h2 className="bureau-inline-heading">A 30-Second Account Translation</h2>
          <p>Suppose a fictional report entry shows: Maple Card Services; opened March 2022; balance $620; limit $3,000; updated last month; status current.</p>
          <div className="translation-card"><span>PAUSE &amp; TRANSLATE</span><p>Say it in one sentence: “This is my credit card. It was opened in 2022. The report shows a $620 balance on a $3,000 limit, the information was updated last month, and the account is shown as current.”</p></div>
          <p>If you cannot explain an important account in one or two plain sentences, mark it for follow-up. You do not need to become a bureau-code historian. You need to know what the account is saying about you.</p>
        </section>

        <section className="reader-section" id="codes">
          <Heading number="03" kicker="WALKTHROUGH STOP 3" title="Decode Codes and Labels Carefully" />
          <p className="reader-lead">Bureau reports can use abbreviations, account-type labels, ratings and status language. Formats can also change. Use the legend or explanations supplied with the report you are actually reading rather than memorizing a chart from a random social post that appears to have been designed during a Wi-Fi outage.</p>
          <p>The goal is translation, not memorization: account type, ownership, dates, balance, limit, payment history and current status. If a code changes the meaning of one of those facts, look it up in the bureau’s current guide or support material.</p>
          <Spotlight>The report’s own legend beats a memorized internet code chart. Bureau layouts and labels can change, so interpret the version in front of you.</Spotlight>
          <h2 className="bureau-inline-heading">Quick Myth Check</h2>
          <div className="myth-list"><Myth reality="The report contains credit-file information. The score is a separate numerical estimate calculated from credit-report information.">My credit report and credit score are basically the same document.</Myth><Myth reality="A previous address you actually used can be normal history. An address you never used is something to verify, especially if other unfamiliar information appears with it.">An old address on my report automatically means identity theft.</Myth><Myth reality="Consumer disclosures can include application-related inquiries as well as account-review, non-credit-related and your own inquiries. These do not all affect a score the same way.">Every inquiry listed on my consumer report is a hard credit application.</Myth></div>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/product/consumer-disclosure">TransUnion Canada: Consumer Disclosure</SourceLink></div>
          <div className="story-card report-story"><div className="story-media" aria-hidden="true"><Image src="/images/course-1-3/nadia.webp" alt="" fill sizes="(max-width: 760px) 100vw, 860px" loading="eager" /></div><div className="story-content"><p className="reader-kicker">NADIA’S VERY LOUD CREDIT REPORT</p><h3>Nadia opens her report.</h3><p>She immediately finds an employer she left years ago, a lender name she does not recognize, a card balance higher than the one in her banking app, and an inquiry section that looks like it invited friends.</p><p>For about thirty seconds, every line feels equally urgent. Then she uses the five-stop walkthrough. The old employer is historical information. The unfamiliar lender name turns out to be the financing company behind a store card she recognizes. The balance was reported before a recent payment. Several inquiry entries are not new credit applications.</p><p>One application-related inquiry, however, still does not make sense to her. That item gets a red label and prompt follow-up. Nadia did not ‘ignore’ the weird stuff. She separated explainable weird from important weird—which is a surprisingly useful adult skill.</p></div></div>
        </section>

        <section className="reader-section" id="inquiries">
          <Heading number="04" kicker="WALKTHROUGH STOP 4" title="Separate Inquiry Types" />
          <p className="reader-lead">An inquiry records that someone accessed credit information for an authorized purpose. Credit-related inquiries connected to an application may affect a score. Your own requests to view your credit file, and certain non-credit or account-review inquiries, do not affect your score in the same way.</p>
          <p>TransUnion says its Consumer Disclosure lists all inquiries made to your credit information, including account-management, non-credit-related and your own inquiries. So a crowded inquiry section is not automatically evidence of a crowded month of credit applications.</p>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-report">TransUnion Canada: What is a credit report?</SourceLink><SourceLink href="https://www.transunion.ca/product/consumer-disclosure">TransUnion Canada: Consumer Disclosure</SourceLink></div>
          <Spotlight>Checking your own credit information does not lower your credit score. In the inquiry section, focus first on application-related checks you do not recognize.</Spotlight>
          <Heading number="05" kicker="WALKTHROUGH STOP 5" title="Review Serious Items Without Shame" />
          <p className="reader-lead">A report may contain collection information, bankruptcy or insolvency information, or certain court/public-record information. These sections can feel heavier than the rest of the file, but the reading method stays the same: confirm ownership, dates, balance or amount, current status and whether the information appears accurate.</p>
          <p>Do not diagnose a reporting period from memory. How long particular information may stay on a report can depend on the item, the bureau and applicable provincial or territorial rules. If timing matters, check current official guidance before deciding something should no longer appear.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/information-credit-report.html">FCAC: How long information stays on your credit report</SourceLink></div>
          <h2 className="bureau-inline-heading">Finish With Green, Yellow or Red</h2>
          <div className="triage-grid"><article className="green"><Check /><h3>GREEN</h3><p>I recognize it, the dates make sense, and the information appears accurate.</p></article><article className="yellow"><HelpCircle /><h3>YELLOW</h3><p>I probably recognize it, but I need a statement, reporting date, lender name or other context before deciding.</p></article><article className="red"><ShieldAlert /><h3>RED</h3><p>It is not mine, clearly appears false, or may be a sign of identity fraud or another serious error. Investigate promptly.</p></article></div>
          <p>Limit your first follow-up list to three priority items. A 47-item colour-coded masterpiece that never gets acted on is still, unfortunately, a 47-item colour-coded masterpiece.</p>
          <Spotlight>FCAC recommends reviewing credit reports from both Equifax and TransUnion for errors or fraud. Checking both gives you a broader review of the credit information being reported about you.</Spotlight>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink></div>
        </section>

        <section className="reader-section" id="quick-check">
          <Heading number="06" title="Quick Check: What Would You Do Next?" />
          <div className="quick-checks">{quickChecks.map(([prompt, answer], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b></div></details>)}</div>
          <h2 className="bureau-inline-heading">Your Action</h2>
          <p>Open one current bureau report and do only one complete walkthrough. The goal is not to fix everything today; it is to leave the report knowing what is green, what needs context and what needs action.</p>
          <div className="action-preview"><p><b>11.</b> The report section I understand better now: <span /></p><p><b>12.</b> One item I want more context for: <span /></p><p><b>13.</b> My first follow-up action: <span /></p></div>
          <div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>Read your report in layers: identity, accounts, codes, inquiries and serious items.</h3><span>Dates and ownership come before panic. The goal is not to memorize every abbreviation; it is to know what belongs to you, what appears accurate and what needs follow-up.</span></div></div>
        </section>

        <section className="reader-section" id="action">
          <Heading number="07" title="Your Action (Fill Out Form): Guided Report Walkthrough" />
          <div className="checkin-intro"><div className="activity-reward-pill"><CircleDollarSign aria-hidden="true" /><span>Complete this activity and get <strong>$5</strong> plus <strong>20 Credit Pulse points</strong></span></div><p className="reader-lead">Use a real report if you are comfortable doing so, but do not write full account numbers, SIN numbers or other sensitive identifiers in course notes.</p><p>Write your answer before checking the guide.</p></div>
          {complete ? <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 1.3 COMPLETE</p><h3>Nicely done{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your check-in is saved on this device. You can review any section above or print this page for reference.</p><button className="reader-primary" onClick={() => window.print()}>Print course notes <FileCheck2 /></button></div> : <div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}>
            <div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required autoComplete="name" /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required autoComplete="email" /></label></div>
            <label><span><b>11</b>IDENTITY CHECK — Name one personal-information field you confirmed. Did it make sense?</span><textarea name="identity" rows="3" required /></label>
            <label><span><b>12</b>ACCOUNT SNAPSHOT — Choose one account. Record the creditor name, reported balance, reporting date and status.</span><textarea name="snapshot" rows="3" required /></label>
            <label><span><b>13</b>PLAIN-ENGLISH TRANSLATION — Explain that account in one or two sentences as if you were describing it to someone else.</span><textarea name="translation" rows="3" required /></label>
            <label><span><b>14</b>INQUIRY SCAN — Name one inquiry you recognize, or one inquiry you would verify. What type of check does it appear to be?</span><textarea name="inquiry" rows="3" required /></label>
            <label><span><b>15</b>TRIAGE — Choose one item and label it Green, Yellow or Red. Explain your next step.</span><textarea name="triage" rows="3" required /></label>
            <label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label><button className="reader-primary">Complete Course 1.3 <ArrowRight /></button><small><ShieldCheck />Do not include full account numbers, SIN numbers, passwords or other sensitive identifiers.</small>
          </form></div>}
        </section>

        <section className="reader-section reader-glossary" id="glossary"><Heading number="08" title="Glossary of Terms" /><dl>{course13Glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>
      </div>
      <footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
    </main>
  </div>;
}
