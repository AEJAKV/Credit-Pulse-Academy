"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Clock3,
  CreditCard,
  FileCheck2,
  Landmark,
  Lightbulb,
  LockKeyhole,
  Menu,
  SearchCheck,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { Brand } from "./Brand";
import { courseSections, glossary } from "../lib/course-data";

const learnerKey = "cp-course-1-learner";
const completionKey = "cp-course-1-complete";
const submissionKey = "cp-course-1-submissions";

const factors = [
  ["Payment history", "This is the big one. Paying on time supports a positive history; missed or late payments may hurt it.", Clock3],
  ["Amounts owed", "High balances, especially on credit cards and lines of credit, may signal greater lending risk.", WalletCards],
  ["Credit utilization", "This compares revolving balances with available credit. A $1,000 balance on a $5,000 limit is 20%.", CircleGauge],
  ["Length of credit history", "Older, responsibly managed accounts can demonstrate a longer record of credit management.", Landmark],
  ["New credit applications", "A hard inquiry may affect your score. Checking your own credit is a soft inquiry and does not.", SearchCheck],
  ["Types of credit", "Managing different account types may help, but never borrow simply to create variety.", CreditCard],
];

const quickChecks = [
  ["A card reports $4,400 on a $5,000 limit.", "Likely relevant", "The account is using most of its available credit."],
  ["You receive a pay raise.", "Not a direct score factor", "A lender may consider income separately."],
  ["You check your own credit report.", "Not harmful", "This is generally a soft inquiry."],
  ["You miss the minimum payment.", "Likely relevant", "Payment history matters."],
  ["You apply for three cards in one week.", "Likely relevant", "Several inquiries and new accounts may appear."],
];

function Spotlight({ children }) {
  return <aside className="reader-spotlight"><Lightbulb aria-hidden="true" /><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>;
}

function SourceLink({ href, children }) {
  return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14} aria-hidden="true" /></a>;
}

export function SinglePageCourse({ course }) {
  const [activeSection, setActiveSection] = useState(courseSections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [learner, setLearner] = useState({ name: "", email: "" });
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const hydrationFrame = requestAnimationFrame(() => {
      try {
        setLearner(JSON.parse(localStorage.getItem(learnerKey)) || { name: "", email: "" });
        setComplete(localStorage.getItem(completionKey) === "true");
      } catch {}
    });

    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] },
    );
    courseSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      cancelAnimationFrame(hydrationFrame);
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
      `1. Behaviour: ${data.behaviour}`,
      `2. Score of 620: ${data.scoreMeaning}`,
      `3. Minimum payment: ${data.minimumPayment}`,
      `4. Utilization: ${data.utilization}`,
      `5. Own credit check: ${data.softInquiry}`,
    ].join("\n");
    const rows = JSON.parse(localStorage.getItem(submissionKey) || "[]");
    rows.unshift({ ...nextLearner, lesson: 1, lessonTitle: "Credit Score Check-In", response, submittedAt: new Date().toISOString() });
    localStorage.setItem(submissionKey, JSON.stringify(rows));
    localStorage.setItem(learnerKey, JSON.stringify(nextLearner));
    localStorage.setItem(completionKey, "true");
    setLearner(nextLearner);
    setComplete(true);
  }

  return (
    <div className="reader-shell">
      <div className="reader-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <header className="reader-header">
        <button className="reader-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open course contents"><Menu /></button>
        <Brand />
        <div className="reader-header-meta"><BookOpen size={17} /><span>Course 1.1</span><i /> <span>{scrollProgress}% read</span></div>
        <a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a>
      </header>

      <aside className={`reader-nav ${menuOpen ? "open" : ""}`} aria-label="Course contents">
        <div className="reader-nav-head">
          <div><span>COURSE 1.1</span><strong>On this page</strong></div>
          <button onClick={() => setMenuOpen(false)} aria-label="Close course contents"><X /></button>
        </div>
        <nav>
          {courseSections.map((section, index) => (
            <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => goToSection(section.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{section.label}
            </button>
          ))}
        </nav>
        <div className="reader-nav-note"><LockKeyhole size={17} /><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div>
      </aside>
      {menuOpen && <button className="reader-scrim" aria-label="Close course contents" onClick={() => setMenuOpen(false)} />}

      <main className="reader-main">
        <section className="reader-hero" id="start">
          <div className="reader-hero-copy">
            <p className="reader-kicker">COURSE 1.1 · CREDIT FOUNDATIONS</p>
            <h1>{course.title}</h1>
            <p className="reader-subtitle">Your credit score is a number. It is not your personality.</p>
            <p className="reader-deck">A practical guide to what the number means, why it moves, and which credit habits are actually in your control.</p>
            <div className="reader-meta"><span><Clock3 />35–45 minutes</span><span><FileCheck2 />One course check-in</span></div>
            <button className="reader-primary" onClick={() => goToSection("influences")}>Start learning <ArrowRight /></button>
          </div>
          <div className="reader-hero-media" aria-hidden="true">
            <Image src="/images/course-1/course-1.webp?v=20260809-2" alt="" fill priority unoptimized sizes="(max-width: 1050px) 100vw, calc(100vw - 272px)" />
          </div>
        </section>

        <div className="reader-body">
          <section className="reader-section reader-intro">
            <p className="reader-lead">If credit scores came with facial expressions, some of us would probably prefer they mind their own business.</p>
            <p>But here is the good news: your credit score is not a grade on how well you are doing at adulthood. It is simply a number designed to help a lender answer a question:</p>
            <blockquote>“Based on this person’s credit history, how risky might it be to lend them money?”</blockquote>
            <p>In Canada, credit scores usually fall between <strong>300 and 900</strong>. In general, a higher score suggests lower lending risk. Your score is only one part of a lender’s decision; lenders may combine it with other information and their own lending criteria.</p>
            <div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-score">TransUnion Canada: Credit score</SourceLink></div>
            <div className="reader-score-panel"><ScoreVisual /></div>
            <p>So if your score moves 20 or 30 points, resist the urge to organize a small memorial service for the missing points. Scores move. Your job is to understand why.</p>
            <div className="reader-context-intro">
              <p>For context, Equifax describes 660–724 as generally good, 725–759 as very good and 760+ as excellent. TransUnion emphasizes that each lender decides what it considers good or poor risk, so a score is a signal, not an automatic approval or decline.</p>
              <div className="reader-links"><SourceLink href="https://www.consumer.equifax.ca/personal/education/credit-score/what-is-a-good-credit-score/">Equifax Canada</SourceLink><SourceLink href="https://www.transunion.ca/credit-score">TransUnion Canada</SourceLink></div>
            </div>
            <div className="reader-context-media">
              <div className="reader-context-copy">
                <Spotlight>You do not have one universal credit score. Different bureaus, scoring models and lenders can produce or use different scores from similar credit information.</Spotlight>
              </div>
              <CourseImageCarousel />
            </div>
          </section>

          <section className="reader-section" id="influences">
            <SectionHeading number="01" title="What can influence your score" />
            <p className="reader-lead">You do not need to memorize a mysterious formula. Concentrate on the behaviours behind the number.</p>
            <div className="factor-grid">
              {factors.map(([title, copy, Icon], index) => <article key={title}><div><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
            <Spotlight>Minimum payment protects the deadline. Full payment attacks the debt. They solve two related but different problems.</Spotlight>
            <UtilizationCalculator />
            <p>FCAC recommends trying to use less than 30% of your total available credit. Do not treat 30% like a magic cliff: scoring formulas are more complicated, and lenders and bureaus use different models. The useful principle is simpler: lower revolving balances generally show less dependence on available credit.</p>
            <p>Income, savings, education and job performance are not normally direct inputs in a consumer credit score because they are not part of the credit report. A lender may still consider income, employment and other information separately.</p>
          </section>

          <section className="reader-section" id="myths">
            <SectionHeading number="02" title="Quick myth check" />
            <div className="myth-list">
              <Myth text="Checking my own credit score hurts it.">Checking your own credit is generally a soft inquiry and does not damage your score.</Myth>
              <Myth text="I need to carry a balance to build credit.">You do not need to pay interest to build payment history. Responsible use and on-time payments matter.</Myth>
              <Myth text="Every lender sees the same score.">Different models and bureau data can produce different scores.</Myth>
            </div>
            <div className="story-card">
              <div className="story-media" aria-hidden="true"><Image src="/images/course-1/amy.webp" alt="" fill sizes="(max-width: 760px) 100vw, 860px" loading="eager" /></div>
              <div className="story-content"><p className="reader-kicker">WHY A SCORE CAN MOVE EVEN WHEN YOU PAY ON TIME</p><h3>Meet Maya</h3><p>Maya has never missed a credit-card payment. Then her car needs a $3,400 repair, which she puts on a $5,000-limit card. Her utilization suddenly becomes much higher.</p><p>Even after she pays the card, her score may temporarily change depending on what balance was reported and when. Maya did not suddenly become irresponsible. The information used to calculate her score changed.</p></div>
            </div>
          </section>

          <section className="reader-section" id="priorities">
            <SectionHeading number="03" title="The priority order" />
            <p className="reader-lead">When you want to protect or improve your credit, use this order.</p>
            <ol className="priority-list">
              <Priority number="1" title="Protect payment history">Pay at least the required minimum by the due date. Paying more, ideally the full statement balance when affordable, reduces debt and interest faster.</Priority>
              <Priority number="2" title="Keep revolving balances manageable">A credit limit is a ceiling, not a personal challenge issued by the bank.</Priority>
              <Priority number="3" title="Apply only when an account solves a real need">Extra applications can add inquiries and new accounts.</Priority>
              <Priority number="4" title="Keep useful older accounts when manageable">Closing one can reduce available credit and may affect the age of your active accounts.</Priority>
              <Priority number="5" title="Review both Canadian credit reports">Look for errors, unfamiliar accounts or signs of identity misuse.</Priority>
            </ol>
          </section>

          <section className="reader-section" id="rebuilding">
            <SectionHeading number="04" title="Credit rebuilding: what can help" />
            <div className="rebuild-layout">
              <div className="rebuild-visual"><div><ShieldCheck /><span>Pay on time</span></div><i /><div><CircleGauge /><span>Manage balances</span></div><i /><div><FileCheck2 /><span>Build history</span></div></div>
              <div><p className="reader-lead">There is no secret “credit repair button.”</p><p>Some financial institutions offer secured credit cards intended to help people establish or rebuild credit. A secured card normally requires money as security. You then use the card like credit and make the required payments.</p><p>Simply owning a “credit-building” product does not magically fix a score. The behaviour that gets reported, including payments, balances and account management, is what matters.</p><div className="reader-links"><SourceLink href="https://www.td.com/ca/en/personal-banking/products/credit-cards/secured-credit-card">TD secured credit cards</SourceLink></div></div>
            </div>
          </section>

          <section className="reader-section" id="quick-check">
            <SectionHeading number="05" title="Quick check" />
            <p className="reader-lead">Decide whether each event is likely relevant to a credit score, then reveal the reasoning.</p>
            <div className="quick-checks">
              {quickChecks.map(([prompt, answer, reason], index) => <details key={prompt}><summary><span>{index + 6}</span><strong>{prompt}</strong><ChevronDown /></summary><div><b>{answer}</b><p>{reason}</p></div></details>)}
            </div>
            <div className="takeaway"><ShieldCheck /><div><p>KEY TAKEAWAY</p><h3>Payment history first. Balances second. Applications with purpose.</h3><span>Your score is a changing risk estimate, not your net worth, intelligence or the final boss of Canadian adulthood.</span></div></div>
          </section>

          <section className="reader-section" id="action">
            <SectionHeading number="06" title="Credit score check-in" />
            <p className="reader-lead">Write each answer in your own words. This single check-in completes Course 1.1.</p>
            {complete ? <Completion learner={learner} /> : <Activity learner={learner} onSubmit={submitActivity} />}
          </section>

          <section className="reader-section reader-glossary" id="glossary">
            <SectionHeading number="07" title="Glossary of terms" />
            <dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
          </section>
        </div>

        <footer className="reader-footer"><Brand light /><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer>
      </main>
    </div>
  );
}

function SectionHeading({ number, title }) {
  return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>;
}

function CourseImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = [
    { src: "/images/course-1/course-image-1.webp", alt: "Your credit score is a number. It is not your personality." },
    { src: "/images/course-1/course-image-2.webp", alt: "Pay on time and keep balances manageable." },
  ];

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 4000);
    return () => window.clearInterval(interval);
  }, [paused, slides.length]);

  function showSlide(index) {
    setActiveSlide((index + slides.length) % slides.length);
  }

  return <section
    className="course-image-carousel"
    aria-label="Course image carousel"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} aria-hidden={activeSlide !== index} key={slide.src}>
          <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 760px) calc(100vw - 36px), 560px" loading="eager" />
        </div>)}
      </div>
    </div>
    <button className="carousel-arrow previous" onClick={() => showSlide(activeSlide - 1)} aria-label="Previous image"><ChevronLeft /></button>
    <button className="carousel-arrow next" onClick={() => showSlide(activeSlide + 1)} aria-label="Next image"><ChevronRight /></button>
    <div className="carousel-dots" aria-label="Choose an image">{slides.map((slide, index) => <button key={slide.src} className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />)}</div>
    <span className="carousel-status" aria-live="polite">Image {activeSlide + 1} of {slides.length}</span>
  </section>;
}

function ScoreVisual() {
  const [scoreInput, setScoreInput] = useState("650");
  const score = Math.min(900, Math.max(300, Number(scoreInput) || 300));
  const position = ((score - 300) / 600) * 100;
  const result = score < 660
    ? { key: "building", label: "Building", range: "300–659", message: "This may signal more lending risk, but it does not mean automatic rejection." }
    : score < 725
      ? { key: "good", label: "Good", range: "660–724", message: "This is generally considered a good range by Equifax Canada." }
      : score < 760
        ? { key: "very-good", label: "Very good", range: "725–759", message: "This is generally considered a very good range by Equifax Canada." }
        : { key: "excellent", label: "Excellent", range: "760–900", message: "This is generally considered an excellent range by Equifax Canada." };

  return <div className="calculator-frame score-calculator-frame"><div className="score-explorer">
    <div className="score-explorer-head"><div><CircleGauge aria-hidden="true" /><span>Explore a credit score</span></div><strong>LIVE</strong></div>
    <div className="score-live-value" aria-live="polite"><span>Your score</span><strong>{score}</strong><small>out of 900</small></div>
    <label className="score-number-label" htmlFor="credit-score-input">Enter a score</label>
    <input id="credit-score-input" className="score-number-input" type="number" min="300" max="900" inputMode="numeric" value={scoreInput} onChange={(event) => setScoreInput(event.target.value)} onBlur={() => setScoreInput(String(score))} />
    <div className="score-range-wrap">
      <input className="score-range-input" type="range" min="300" max="900" value={score} onChange={(event) => setScoreInput(event.target.value)} aria-label="Explore a credit score from 300 to 900" style={{ "--score-position": `${position}%` }} />
      <div className="score-range-labels"><span>300</span><span>900</span></div>
    </div>
    <div className="score-band-grid" aria-label="General credit score bands">
      {[{ key: "building", range: "300–659", label: "Building" }, { key: "good", range: "660–724", label: "Good" }, { key: "very-good", range: "725–759", label: "Very good" }, { key: "excellent", range: "760–900", label: "Excellent" }].map((band) => <div key={band.key} className={result.key === band.key ? "current" : ""}><i /><span>{band.range}</span><small>{band.label}</small></div>)}
    </div>
    <div className={`score-live-result ${result.key}`} aria-live="polite"><ShieldCheck aria-hidden="true" /><div><span>{result.range}</span><strong>{result.label}</strong><p>{result.message}</p></div></div>
    <p className="score-disclaimer">Educational guide only. Lenders use different models and consider other information.</p>
  </div></div>;
}

function UtilizationCalculator() {
  const [balanceInput, setBalanceInput] = useState("1000");
  const [limitInput, setLimitInput] = useState("5000");
  const balance = Math.max(0, Number(balanceInput) || 0);
  const limit = Math.max(0, Number(limitInput) || 0);
  const utilization = limit > 0 ? (balance / limit) * 100 : 0;
  const roundedUtilization = Math.round(utilization * 10) / 10;
  const barWidth = Math.min(100, roundedUtilization);
  const guidance = roundedUtilization < 10
    ? { key: "low", title: "Low utilization", message: "You are using a small share of the credit available." }
    : roundedUtilization < 30
      ? { key: "steady", title: "Below 30%", message: "This is below the general FCAC guideline mentioned in this course." }
      : roundedUtilization < 50
        ? { key: "watch", title: "Worth watching", message: "The balance is using a meaningful share of the available limit." }
        : { key: "high", title: "High utilization", message: "A high reported balance may signal greater reliance on revolving credit." };
  const formatCurrency = (value) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);

  return <div className="calculator-frame utilization-calculator-frame"><section className="utilization-calculator" aria-labelledby="utilization-title">
    <header className="utilization-head"><div><Calculator aria-hidden="true" /><div><span>Interactive calculator</span><h3 id="utilization-title">Explore credit utilization</h3></div></div><strong>LIVE</strong></header>
    <p className="utilization-intro">Change either amount to see the calculation update immediately.</p>
    <div className="utilization-inputs">
      <label>Reported balance<div><span>$</span><input type="number" min="0" step="100" inputMode="decimal" value={balanceInput} onChange={(event) => setBalanceInput(event.target.value)} /></div><small>{formatCurrency(balance)}</small></label>
      <span className="utilization-operator" aria-hidden="true">÷</span>
      <label>Credit limit<div><span>$</span><input type="number" min="1" step="100" inputMode="decimal" value={limitInput} onChange={(event) => setLimitInput(event.target.value)} /></div><small>{formatCurrency(limit)}</small></label>
    </div>
    <div className="utilization-meter" style={{ "--utilization-width": `${barWidth}%` }}>
      <div className="utilization-meter-head"><span>Credit used</span><strong aria-live="polite">{roundedUtilization}%</strong></div>
      <div className="utilization-track" aria-hidden="true"><i /></div>
      <div className="utilization-scale"><span>0%</span><span>30% guide</span><span>100%+</span></div>
    </div>
    <div className={`utilization-guidance ${guidance.key}`} aria-live="polite"><CircleGauge aria-hidden="true" /><div><strong>{guidance.title}</strong><p>{guidance.message}</p></div></div>
    <p className="utilization-disclaimer">This is an educational ratio, not a credit-score prediction.</p>
  </section></div>;
}

function Myth({ text, children }) {
  return <article><span>MYTH</span><p>“{text}”</p><div><CheckCircle2 />{children}</div></article>;
}

function Priority({ number, title, children }) {
  return <li><span>{number}</span><div><h3>{title}</h3><p>{children}</p></div></li>;
}

function Activity({ learner, onSubmit }) {
  return <form className="checkin-form" onSubmit={onSubmit}>
    <div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required autoComplete="name" /></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required autoComplete="email" /></label></div>
    <label><span><b>1</b>Name one credit behaviour that is completely within your control.</span><textarea name="behaviour" rows="3" required /></label>
    <label><span><b>2</b>You have a credit score of 620. What might that mean to a lender?</span><textarea name="scoreMeaning" rows="3" required /></label>
    <label><span><b>3</b>Your statement shows a $1,000 balance and a $50 minimum. You pay $30 by the due date. Did you satisfy the minimum? Explain.</span><textarea name="minimumPayment" rows="3" required /></label>
    <label><span><b>4</b>You have a $5,000 limit and a reported balance of $1,500. What is your utilization?</span><textarea name="utilization" rows="2" required /></label>
    <label><span><b>5</b>True or false: checking your own credit report normally damages your credit score. Explain.</span><textarea name="softInquiry" rows="2" required /></label>
    <label className="checkin-consent"><input type="checkbox" required /><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label>
    <button className="reader-primary">Complete Course 1.1 <ArrowRight /></button>
    <small><ShieldCheck />Do not include a SIN, account number, password or other sensitive financial information.</small>
  </form>;
}

function Completion({ learner }) {
  return <div className="reader-completion"><span><Check /></span><p className="reader-kicker">COURSE 1.1 COMPLETE</p><h3>Nicely done{learner.name ? `, ${learner.name.split(" ")[0]}` : ""}.</h3><p>Your check-in is saved on this device. You can review any section above or print this page for reference.</p><button className="reader-primary" onClick={() => window.print()}>Print course notes <FileCheck2 /></button></div>;
}
