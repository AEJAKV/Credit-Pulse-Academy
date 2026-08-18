"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, Clock3,
  FileCheck2, FileSearch, FileText, FolderOpen, Landmark, Lightbulb, ListChecks,
  LockKeyhole, Mail, Menu, Plus, SearchCheck, ShieldAlert, ShieldCheck, X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course14Glossary, course14Sections } from "../lib/course-14-data";

const learnerKey = "cp-course-1-4-learner";
const completionKey = "cp-course-1-4-complete";
const submissionKey = "cp-course-1-4-submissions";

const errorExamples = [
  ["Ownership", "an account or inquiry you do not recognize."],
  ["Payment history", "a late payment you believe was reported incorrectly."],
  ["Account figures", "a balance, credit limit or other account amount that does not match the evidence for the reporting period."],
  ["Duplicate reporting", "the same account or debt appears to be reported twice when it should not be."],
  ["Status", "an account shown as open, unpaid or in collection when your records support a different status."],
  ["Personal information", "identity details that are not yours or are materially incorrect."],
];

const evidenceTabs = [
  ["TAB A", "The disputed field", "Copy the exact account, month, balance, status or inquiry you believe is wrong. Use only a partial account number in your working notes.", FileSearch],
  ["TAB B", "The report details", "Record the bureau, report date, creditor or lender name, and enough of the account identifier to find the item safely.", FileText],
  ["TAB C", "The proof", "Choose the smallest useful set of statements, payment confirmations, lender letters, closure notices or other records that directly support your position.", FileCheck2],
  ["TAB D", "The evidence note", "Beside each document, write one sentence: “This proves ___.” If the sentence has nothing to do with the disputed fact, the document may not belong in this case file.", ListChecks],
  ["TAB E", "The correction", "Ask for one clear outcome: correct the payment status, update the balance/status, remove an account that is not yours, or investigate another specific factual error.", CheckCircle2],
];

const disputePieces = [
  ["Report", "Which bureau report are you referring to, and what is its date?", FolderOpen],
  ["Account", "Which lender/account is involved? Use a safe partial account identifier.", Landmark],
  ["Period or field", "Which month, payment, balance, status or inquiry is wrong?", SearchCheck],
  ["Reported fact", "What does the report currently say?", FileText],
  ["Evidence", "What document supports the information you believe is correct?", FileCheck2],
  ["Request", "What precise correction or investigation are you asking for?", ArrowRight],
];

const logFields = [
  ["SUBMITTED", "date you sent the dispute or contacted the lender."],
  ["ORGANIZATION", "Equifax, TransUnion, lender or other relevant organization."],
  ["METHOD", "online form, mail, phone or another method allowed by that organization."],
  ["REFERENCE", "case, confirmation or reference number, if provided."],
  ["EVIDENCE", "the documents you sent or referenced."],
  ["NEXT STEP", "what the organization said would happen next."],
  ["RESULT", "what changed, what did not, and what you verified afterward."],
];

const quickChecks = [
  ["A real payment was genuinely late, but you dislike seeing it", "Not a reporting error merely because it is negative. Do not use a dispute to ask for accurate information to disappear."],
  ["A report says your May payment was late, and your dated confirmation shows it was received on time", "Build a dispute case around that exact payment and evidence."],
  ["The same debt appears twice and you cannot explain the duplicate", "Verify the entries. If the duplicate is inaccurate, dispute the specific duplicate reporting."],
  ["The same incorrect status appears on both bureau reports", "Prepare separate disputes for Equifax and TransUnion, and contact the reporting lender as appropriate."],
  ["A new account and application inquiry are completely unfamiliar", "Treat it as a potential fraud issue and follow current lender, bureau and fraud-reporting steps promptly."],
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

const disputeCarouselSlides = [
  { src: "/images/course-1-4/ca-4.1.webp", alt: "Building a focused case file with the disputed fact and supporting evidence." },
  { src: "/images/course-1-4/ca4.2.webp", alt: "Submitting a dispute to a Canadian credit bureau and logging the reference number." },
];

function DisputeImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % disputeCarouselSlides.length), 4000);
    return () => window.clearInterval(interval);
  }, [paused]);

  function showSlide(index) {
    setActiveSlide((index + disputeCarouselSlides.length) % disputeCarouselSlides.length);
  }

  return <section
    className="course-image-carousel dispute-image-carousel"
    aria-label="Course image carousel"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {disputeCarouselSlides.map((slide, index) => <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${disputeCarouselSlides.length}`} aria-hidden={activeSlide !== index} key={slide.src}>
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
    <div className="carousel-dots" aria-label="Choose an image">{disputeCarouselSlides.map((slide, index) => <button key={slide.src} type="button" className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />)}</div>
    <span className="carousel-status" aria-live="polite">Image {activeSlide + 1} of {disputeCarouselSlides.length}</span>
  </section>;
}

function DisputeEvidenceCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const maxSlide = Math.max(0, evidenceTabs.length - visibleCount);
  const displayedSlide = Math.min(activeSlide, maxSlide);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setVisibleCount(width >= 1100 ? 3 : width >= 700 ? 2 : 1);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1)), 3800);
    return () => window.clearInterval(interval);
  }, [maxSlide, paused]);

  const slidePercent = (displayedSlide * 100) / visibleCount;
  const slideGap = (displayedSlide * 18) / visibleCount;

  return <section
    className="dispute-evidence-carousel"
    data-visible={visibleCount}
    aria-label="Evidence file tabs"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="dispute-evidence-viewport">
      <div className="dispute-evidence-track" style={{ transform: `translateX(calc(-${slidePercent}% - ${slideGap}px))` }}>
        {evidenceTabs.map(([tab, title, copy, Icon], index) => <article key={tab} aria-label={`${index + 1} of ${evidenceTabs.length}`}>
          <div className="dispute-evidence-image" aria-hidden="true">
            <Image
              src={`/images/course-1-4/caro-4.${index + 1}.webp`}
              alt=""
              fill
              sizes="(max-width: 699px) calc(100vw - 64px), (max-width: 1099px) calc(50vw - 36px), 276px"
            />
          </div>
          <div className="dispute-evidence-badge" aria-hidden="true"><Icon /></div>
          <div className="dispute-evidence-copy">
            <span>{tab}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>)}
      </div>
    </div>
    <div className="dispute-evidence-controls">
      <div className="dispute-evidence-dots" aria-label="Choose a group of evidence tabs">
        {Array.from({ length: maxSlide + 1 }, (_, index) => <button key={index} type="button" className={displayedSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show tab group ${index + 1}`} aria-current={displayedSlide === index ? "true" : undefined} />)}
      </div>
      <div>
        <button type="button" onClick={() => setActiveSlide((current) => (current <= 0 ? maxSlide : current - 1))} aria-label="Previous evidence tabs"><ChevronLeft /></button>
        <button type="button" onClick={() => setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1))} aria-label="Next evidence tabs"><ChevronRight /></button>
      </div>
    </div>
    <span className="carousel-status" aria-live="polite">Showing tab {displayedSlide + 1} through {Math.min(displayedSlide + visibleCount, evidenceTabs.length)} of {evidenceTabs.length}</span>
  </section>;
}

export function CreditDisputeCourse({ course }) {
  const [activeSection, setActiveSection] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [learner, setLearner] = useState({ name: "", email: "" });
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { try { setLearner(JSON.parse(localStorage.getItem(learnerKey)) || { name: "", email: "" }); setComplete(localStorage.getItem(completionKey) === "true"); } catch {} });
    const updateProgress = () => { const available = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0); };
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActiveSection(visible.target.id); }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] });
    course14Sections.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    updateProgress(); window.addEventListener("scroll", updateProgress, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", updateProgress); };
  }, []);

  function goToSection(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
  function submitActivity(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nextLearner = { name: data.name, email: data.email };
    const response = [
      `11. Case ID: ${data.caseId}`, `12. Disputed fact: ${data.disputedFact}`, `13. Accurate fact: ${data.accurateFact}`,
      `14. Evidence: ${data.evidence}`, `15. Correction request: ${data.correction}`, `16. Submission log: ${data.submissionLog}`,
      `17. Verification: ${data.verification}`,
    ].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]");
    rows.unshift({ ...nextLearner, lesson: 4, lessonTitle: "Dispute Case File Builder", response, submittedAt: new Date().toISOString() });
    localStorage.setItem(submissionKey, JSON.stringify(rows)); localStorage.setItem(learnerKey, JSON.stringify(nextLearner)); localStorage.setItem(completionKey, "true"); setLearner(nextLearner); setComplete(true);
  }

  return <div className="reader-shell dispute-course">
    <div className="reader-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
    <header className="reader-header"><button className="reader-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open course contents"><Menu /></button><Brand /><div className="reader-header-meta"><BookOpen size={17} /><span>Course 1.4</span><i /><span>{scrollProgress}% read</span></div><a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a></header>
    <aside className={`reader-nav ${menuOpen ? "open" : ""}`} aria-label="Course contents"><div className="reader-nav-head"><div><span>COURSE 1.4</span><strong>On this page</strong></div><button onClick={() => setMenuOpen(false)} aria-label="Close course contents"><X /></button></div><nav>{course14Sections.map((section, index) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}</nav><div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div></aside>
    {menuOpen && <button className="reader-scrim" aria-label="Close course contents" onClick={() => setMenuOpen(false)} />}

    <main className="reader-main">
      <section className="reader-hero dispute-hero" id="start"><div className="reader-hero-media dispute-hero-media" aria-hidden="true"><Image src="/images/course-1-4/course1.4.webp" alt="" fill priority sizes="(max-width: 1050px) 100vw, calc(100vw - 272px)" /></div><div className="reader-hero-copy"><p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p><p className="reader-deck">What works better is a small, organized case file: one disputed fact, the proof that supports you, and one clear correction request.</p><div className="reader-meta"><span><Clock3 />{course.duration}</span><span><FileCheck2 />One course check-in</span></div><button className="reader-primary" onClick={() => goToSection("error")}>Open the case file <ArrowRight /></button></div><div className="case-hero-visual" aria-hidden="true"><div className="case-folder-stack"><span className="case-paper-back" /><span className="case-paper-mid" /><div className="case-folder"><span className="case-folder-rivet" /><span className="case-folder-label">CASE FILE</span><strong>FACT<br />EVIDENCE<br />REQUEST</strong><FileSearch /></div><div className="case-stamp"><Check />READY TO INVESTIGATE</div></div></div></section>

      <div className="reader-body">
        <section className="reader-section reader-intro">
          <p className="reader-lead">If frustration alone could correct a credit report, one stern look at a PDF would solve half the problem.</p>
          <p>Sadly, PDFs remain emotionally unavailable. What works better is a small, organized case file: one disputed fact, the proof that supports you, and one clear correction request.</p>
          <p>In Canada, you have the right to dispute information on your credit report that you believe is wrong. The Financial Consumer Agency of Canada (FCAC) says credit bureaus must correct errors for free. The bureau may investigate the item with the lender or organization that supplied the information.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink></div>
          <Spotlight>A credit-report correction is not a favour you buy. FCAC says credit bureaus must correct errors for free. Your job is to make the disputed fact easy to identify and investigate.</Spotlight>
        </section>

        <section className="reader-section" id="error">
          <Heading number="01" kicker="CASE FILE RULE 1" title="Decide Whether You Have an Error" />
          <div className="sentence-builder">
            <div className="sentence-builder-card">
              <span className="sentence-builder-kicker">FILL IN THE BLANKS</span>
              <h3>Finish this sentence before you file</h3>
              <p>Start with the exact line you believe is wrong. A dispute is strongest when you can finish this sentence: <strong>“My report says ___, but the accurate information is ___.”</strong> If you cannot yet fill in both blanks, you may need more information before you file.</p>
            </div>
            <div className="sentence-builder-tiles">
              <article><span className="tile-plus"><Plus /></span><FileSearch /><b>Report says</b></article>
              <article><span className="tile-plus"><Plus /></span><CheckCircle2 /><b>Accurate info</b></article>
              <article><span className="tile-plus"><Plus /></span><FileCheck2 /><b>Evidence needed</b></article>
            </div>
          </div>
          <p>Examples of information worth checking include:</p>
          <div className="error-example-grid">{errorExamples.map(([title, copy]) => <article key={title}><CheckCircle2 /><p><strong>{title}</strong> — {copy}</p></article>)}</div>
          <h2 className="bureau-inline-heading">Quick Myth Check: Before You Open the File Folder</h2>
          <div className="myth-list"><Myth reality="A dispute is for information you believe is inaccurate or incomplete. Accurate negative information does not become an error simply because it is inconvenient.">If an item hurts my score, the bureau has to delete it when I dispute it.</Myth><Myth reality="The useful evidence is the evidence that proves the specific point in dispute. Extra unrelated pages can bury the fact you need someone to see.">A 40-page evidence package is automatically stronger than a four-page one.</Myth><Myth reality="Treat each bureau report as its own file. If the same error appears on both, use each bureau’s dispute process and keep separate confirmation details.">If the mistake appears at Equifax and TransUnion, disputing with one automatically fixes the other.</Myth></div>
          <div className="reader-links"><SourceLink href="https://www.transunion.ca/assistance/credit-report-disputes">TransUnion Canada: Credit Report Disputes</SourceLink></div>
          <div className="reader-context-media dispute-context-media">
            <div className="reader-context-copy">
              <Spotlight>Disputing is not the same as asking for a clean slate. TransUnion explains that only inaccurate information may be removed through the dispute process; accurate negative information can remain as permitted by law.</Spotlight>
            </div>
            <DisputeImageCarousel />
          </div>
        </section>

        <section className="reader-section" id="evidence">
          <Heading number="02" kicker="CASE FILE RULE 2" title="Build a Focused Evidence File" />
          <p className="reader-lead">Think small and specific. You are not writing your financial autobiography. You are building a file that lets another person understand exactly what is wrong and exactly what supports the correction.</p>
          <DisputeEvidenceCarousel />
          <div className="privacy-note"><ShieldCheck /><p><strong>PRIVACY NOTE</strong> Keep copies for yourself and redact unrelated sensitive information where appropriate. Do not put a full SIN or unnecessary full account numbers into a course worksheet. Follow the bureau’s current secure submission instructions for the actual dispute.</p></div>
          <Spotlight>Evidence wins by relevance, not weight. A payment confirmation that addresses the exact month in dispute can be more useful than a small paper weather system of unrelated statements.</Spotlight>
          <div className="story-card dispute-story"><div className="story-content"><p className="reader-kicker">CASE STORY</p><h3>Marcus and the 60-Day Late That Wasn’t</h3><p>Marcus checks his report and sees a May payment marked 60 days late. His first draft is basically: “THIS IS WRONG. PLEASE FIX IT.” It has conviction. It also has the investigative value of a smoke alarm that only yells “something!”</p><p>So Marcus slows down. His May statement shows the due date. His payment confirmation shows the payment was received before that date. He records the bureau, report date, lender and account ending. Now he can point to one disputed month and two pieces of evidence that speak directly to it.</p><p>His case changes from a complaint into an investigable request. He is not asking anyone to guess what happened. He is showing the reported fact, the fact he believes is accurate, and the proof supporting the difference.</p></div></div>
        </section>

        <section className="reader-section" id="dispute">
          <Heading number="03" kicker="CASE FILE RULE 3" title="Write an Investigable Dispute" />
          <p className="reader-lead">A useful dispute message can usually be built from six pieces:</p>
          <ol className="priority-list dispute-piece-list">{disputePieces.map(([title, copy, Icon], index) => <li key={title}><span>{index + 1}</span><div><h3><Icon size={17} aria-hidden="true" />{title} —</h3><p>{copy}</p></div></li>)}</ol>
          <h2 className="bureau-inline-heading">A Clear Example</h2>
          <div className="dispute-example-panel">
            <div className="dispute-example-card">
              <div className="dispute-example-card-head">
                <span className="dispute-example-icon"><Mail /></span>
                <div>
                  <span>SAMPLE DISPUTE MESSAGE</span>
                  <strong>Re: Account ending 4432 — May payment status</strong>
                </div>
              </div>
              <p>My credit report dated July 15 lists the May payment for account ending 4432 as 60 days late. The attached May statement and payment confirmation show the payment was received before the due date. Please investigate the May payment status and correct it if your investigation confirms the reporting error.</p>
              <div className="dispute-example-card-foot"><FileCheck2 /><span>Structured, factual, investigable — no extra noise.</span></div>
            </div>
          </div>
          <p>Notice what is missing: a life story, three exclamation marks, and a threat to contact the Prime Minister before lunch. Clear facts make the request easier to follow.</p>
          <div className="reader-links"><SourceLink href="https://www.equifax.ca/personal/dispute-credit-report/">Equifax Canada: How to dispute information on your credit report</SourceLink></div>
          <Spotlight>A good dispute lets the investigator find the account, find the exact field, understand your evidence and know the correction you are requesting without having to decode your frustration.</Spotlight>
        </section>

        <section className="reader-section" id="tracking">
          <Heading number="04" kicker="CASE FILE RULE 4" title="Send the Case to the Right Places" />
          <p className="reader-lead">If an error appears on an Equifax report, follow Equifax’s current dispute process. If it appears on a TransUnion report, follow TransUnion’s. When the same error appears on both reports, prepare a separate case for each bureau. The evidence can overlap; the tracking details should not.</p>
          <p>FCAC also recommends contacting the lender or organization that reported the information. A lender may be able to confirm its records or correct information it supplied. Keep your explanation consistent: one disputed fact, the same supporting evidence, the same requested outcome.</p>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink><SourceLink href="https://www.equifax.ca/personal/dispute-credit-report/">Equifax Canada: Dispute your credit report</SourceLink><SourceLink href="https://www.transunion.ca/assistance/credit-report-disputes">TransUnion Canada: Credit Report Disputes</SourceLink></div>
          <h2 className="bureau-inline-heading">Your Case Tracking Log</h2>
          <p>Create one log entry every time the case moves. A simple record prevents “I know I submitted this sometime around Tuesday-ish” from becoming your official tracking system.</p>
          <div className="case-log">{logFields.map(([title, copy], index) => <article key={title} className={index === logFields.length - 1 ? "case-log-final" : undefined}><span className="case-log-index">{index === logFields.length - 1 ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
          <Spotlight>“Investigation completed” and “my report is now correct” are two different checkpoints. Review the updated report and verify the exact field you disputed.</Spotlight>
          <h2 className="bureau-inline-heading">When the Case Looks Like Fraud, Change Gears</h2>
          <p>An account or credit application you never made can be more than a routine reporting mistake. Treat possible identity fraud promptly and seriously. FCAC advises contacting the affected financial institution and both major credit bureaus, and reporting suspected fraud through Canada’s National Fraud Reporting System. The Canadian Anti-Fraud Centre also advises gathering your information, changing compromised passwords, and reporting identity fraud to both credit bureaus and police as appropriate.</p>
          <p>Ask the bureaus about the fraud protections currently available to you. Options such as alerts or security freezes can depend on the bureau and your province or territory. Follow current official instructions rather than an old checklist saved from the internet.</p>
          <div className="reader-links"><SourceLink href="https://antifraudcentre-centreantifraude.ca/scams-fraudes/victim-victime-eng.htm">Canadian Anti-Fraud Centre: What to do if you’re a victim of fraud</SourceLink></div>
        </section>

        <section className="reader-section" id="quick-check">
          <Heading number="05" title="Quick Check: Which File Would You Build?" />
          <p className="reader-lead">For each situation, decide whether you would dispute, verify first, or use the fraud-response path.</p>
          <div className="quick-checks">{quickChecks.map(([prompt, answer], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b></div></details>)}</div>
          <h2 className="bureau-inline-heading">Your Action: Open One Case File</h2>
          <p>Choose one real item you believe may be wrong—or use a fictional practice item if you do not want to work with personal information in your course notes. Your goal is to describe the case in three lines before gathering anything else.</p>
          <div className="action-preview"><p><b>11.</b> The report currently says: <span /></p><p><b>12.</b> I believe the accurate information is: <span /></p><p><b>13.</b> The evidence that could support this is: <span /></p></div>
          <div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>Dispute facts, not feelings.</h3><span>A focused case identifies the wrong field, supports the accurate fact with relevant evidence, asks for a specific correction, tracks each submission and verifies the result on the report itself.</span></div></div>
          <Spotlight>If a dispute is not resolved to your satisfaction, FCAC outlines escalation options. You may also be able to add a free consumer statement to your credit report to explain your position. A statement adds context; it does not turn accurate information into an error.</Spotlight>
          <div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink></div>
        </section>

        <section className="reader-section" id="action">
          <Heading number="06" title="Your Action (Fill Out Form): Dispute Case File Builder" />
          <div className="checkin-intro"><div className="activity-reward-pill"><CircleDollarSign aria-hidden="true" /><span>Complete this activity and get <strong>$5</strong> plus <strong>20 Credit Pulse points</strong></span></div><p className="reader-lead">Complete this as a preparation worksheet.</p><p>Do not write a full SIN, full account number, passwords or other unnecessary sensitive information here. For a real dispute, use the bureau or lender’s current secure process.</p></div>
          {complete ? <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 1.4 COMPLETE</p><h3>Nicely done{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your check-in is saved on this device. You can review any section above or print this page for reference.</p><button className="reader-primary" onClick={() => window.print()}>Print course notes <FileCheck2 /></button></div> : <div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}>
            <div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required autoComplete="name" /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required autoComplete="email" /></label></div>
            <label><span><b>11</b>CASE ID — Which report and which account is this about? (bureau, date, and the account)</span><textarea name="caseId" rows="3" required /></label>
            <label><span><b>12</b>DISPUTED FACT — What does the report say right now that you believe is wrong?</span><textarea name="disputedFact" rows="3" required /></label>
            <label><span><b>13</b>ACCURATE FACT — What should it say instead?</span><textarea name="accurateFact" rows="3" required /></label>
            <label><span><b>14</b>EVIDENCE — What documents back this up, and what does each one prove?</span><textarea name="evidence" rows="4" required /></label>
            <label><span><b>15</b>CORRECTION REQUEST — In one sentence, what correction are you asking for?</span><textarea name="correction" rows="3" required /></label>
            <label><span><b>16</b>SUBMISSION LOG — Where and when did you submit this, and do you have a reference number?</span><textarea name="submissionLog" rows="3" required /></label>
            <label><span><b>17</b>VERIFICATION — Once you hear back, what will you check on the updated report to confirm it's fixed?</span><textarea name="verification" rows="3" required /></label>
            <label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label><button className="reader-primary">Complete Course 1.4 <ArrowRight /></button><small><ShieldCheck />Do not include a full SIN, full account number, passwords or unnecessary sensitive information.</small>
          </form></div>}
        </section>

        <section className="reader-section reader-glossary" id="glossary"><Heading number="07" title="Glossary of Terms" /><dl>{course14Glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>
      </div>
      <footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
    </main>
  </div>;
}
