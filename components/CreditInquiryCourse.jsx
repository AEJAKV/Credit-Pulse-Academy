"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  Clock3, FileCheck2, Lightbulb, LockKeyhole, Menu, Pause, Play,
  SearchCheck, ShieldCheck, ShoppingBag, X,
} from "lucide-react";
import { Brand } from "./Brand";
import { course19Glossary, course19Sections } from "../lib/course-19-data";

const learnerKey="cp-course-1-9-learner"; const completionKey="cp-course-1-9-complete"; const submissionKey="cp-course-1-9-submissions";
const decisions=[
  ["DECISION 1","IDENTIFY THE EVENT","Are you only requesting information, or are you authorizing an application for credit?",CircleHelp],
  ["DECISION 2","CONFIRM THE INQUIRY","Ask whether the check will be hard or soft and which credit bureau may be accessed.",SearchCheck],
  ["DECISION 3","TEST THE PRODUCT","Does the credit serve a real need, and have you compared the rate, fees, term and total cost?",ShoppingBag],
  ["DECISION 4","CHECK THE TIMING","Have you recently made other applications, or can this decision wait until your file is quieter?",Clock3],
];
const rateRules=[
  ["Keep the purpose consistent.","Compare the same type of loan rather than mixing unrelated credit applications."],
  ["Keep the window focused.","Do the comparison in a short period instead of spreading applications across many weeks."],
  ["Ask who will check your file.","A dealer or broker may work with more than one lender. Understand the process and consent before authorizing checks."],
  ["Compare the full offer.","Rate matters, but so do fees, term, payment amount, penalties and total borrowing cost."],
];
const investigate=[
  ["Match the date.","Compare it with applications made through a dealer, broker, retailer, landlord or lender."],
  ["Check the business name.","The inquiry may appear under a parent company, financing partner or legal name you do not immediately recognize."],
  ["Contact the organization.","Ask why the report was accessed and what authorization they relied on."],
  ["Escalate an error.","Dispute inaccurate information and consider fraud alerts or other identity protections if misuse is possible."],
];
const quickChecks=[
  ["You download your own free credit report.","Soft/non-score-damaging check; your own review does not lower the score."],
  ["A checkout offers $20 off for a new card.","Pause and compare the long-term account, not only today’s discount."],
  ["You compare three mortgage quotes within ten days.","Focused rate shopping within FCAC’s two-week guidance."],
  ["A limit-increase screen says ‘check eligibility’ but does not identify the inquiry type.","Ask first."],
  ["A hard inquiry appears under an unfamiliar corporate name.","Match the date, investigate the organization and dispute it if inaccurate."],
];
function Spotlight({children}){return <aside className="reader-spotlight"><Lightbulb/><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>}
function SourceLink({href,children}){return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14}/></a>}
function Heading({number,title}){return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>}

function DecisionCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [paused, setPaused] = useState(false);
  const maxSlide = Math.max(0, decisions.length - visibleCount);
  const displayedSlide = Math.min(activeSlide, maxSlide);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 900 ? 2 : 1);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1)), 3000);
    return () => window.clearInterval(interval);
  }, [maxSlide, paused]);

  const slidePercent = (displayedSlide * 100) / visibleCount;
  const slideGap = (displayedSlide * 18) / visibleCount;

  return <section
    className="decision-carousel"
    data-visible={visibleCount}
    aria-label="Application decision room steps"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="decision-carousel-viewport">
      <div className="decision-carousel-track" style={{ transform: `translateX(calc(-${slidePercent}% - ${slideGap}px))` }}>
        {decisions.map(([step, title, copy, Icon], index) => <article key={step} aria-label={`${index + 1} of ${decisions.length}`}>
          <div className="decision-card-image" aria-hidden="true">
            <Image src={`/starter%20images/course-1-9/cr9-${index + 1}.webp`} alt="" fill sizes="(max-width: 899px) calc(100vw - 64px), 420px" />
            <span className="decision-card-tag">{step}</span>
          </div>
          <div className="decision-card-badge" aria-hidden="true"><Icon /></div>
          <div className="decision-card-copy">
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>)}
      </div>
    </div>
    <div className="decision-carousel-controls">
      <div className="decision-carousel-dots" aria-label="Choose a group of decisions">
        {Array.from({ length: maxSlide + 1 }, (_, index) => <button key={index} type="button" className={displayedSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show decision group ${index + 1}`} aria-current={displayedSlide === index ? "true" : undefined} />)}
      </div>
      <div>
        <button type="button" onClick={() => setActiveSlide((current) => (current <= 0 ? maxSlide : current - 1))} aria-label="Previous decisions"><ChevronLeft /></button>
        <button type="button" onClick={() => setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1))} aria-label="Next decisions"><ChevronRight /></button>
      </div>
    </div>
    <span className="carousel-status" aria-live="polite">Showing decision {displayedSlide + 1} through {Math.min(displayedSlide + visibleCount, decisions.length)} of {decisions.length}</span>
  </section>;
}

const decisionCheckCarouselSlides = [
  { src: "/starter%20images/course-1-9/9carousel.webp", alt: "Weighing whether an application's purpose is clear before applying." },
  { src: "/starter%20images/course-1-9/9carousel.2.webp", alt: "Checking the cost and timing of a credit application before deciding." },
];

function DecisionCheckImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % decisionCheckCarouselSlides.length), 4000);
    return () => window.clearInterval(interval);
  }, [paused]);

  function showSlide(index) {
    setActiveSlide((index + decisionCheckCarouselSlides.length) % decisionCheckCarouselSlides.length);
  }

  return <section
    className="course-image-carousel decision-check-image-carousel"
    aria-label="Course image carousel"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {decisionCheckCarouselSlides.map((slide, index) => <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${decisionCheckCarouselSlides.length}`} aria-hidden={activeSlide !== index} key={slide.src}>
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
    <div className="carousel-dots" aria-label="Choose an image">{decisionCheckCarouselSlides.map((slide, index) => <button key={slide.src} type="button" className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />)}</div>
    <span className="carousel-status" aria-live="polite">Image {activeSlide + 1} of {decisionCheckCarouselSlides.length}</span>
  </section>;
}

function Myth({children,reality}){return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2/>{reality}</div></article>}

export function CreditInquiryCourse({course}){
  const [activeSection,setActiveSection]=useState("start"),[menuOpen,setMenuOpen]=useState(false),[scrollProgress,setScrollProgress]=useState(0),[learner,setLearner]=useState({name:"",email:""}),[complete,setComplete]=useState(false);
  useEffect(()=>{const frame=requestAnimationFrame(()=>{try{setLearner(JSON.parse(localStorage.getItem(learnerKey))||{name:"",email:""});setComplete(localStorage.getItem(completionKey)==="true")}catch{}});const update=()=>{const a=document.documentElement.scrollHeight-window.innerHeight;setScrollProgress(a>0?Math.min(100,Math.round(window.scrollY/a*100)):0)};const observer=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)setActiveSection(v.target.id)},{rootMargin:"-20% 0px -65%",threshold:[0,.25,.6]});course19Sections.forEach(({id})=>{const s=document.getElementById(id);if(s)observer.observe(s)});update();window.addEventListener("scroll",update,{passive:true});return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",update)}},[]);
  function goToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false)}
  function submitActivity(event){event.preventDefault();const d=Object.fromEntries(new FormData(event.currentTarget)),next={name:d.name,email:d.email};const response=[`11. Own file: ${d.ownFile}`,`12. Prequalification: ${d.prequalification}`,`13. Rate shopping: ${d.rateShopping}`,`14. Checkout: ${d.checkout}`,`15. Cluster: ${d.cluster}`,`16. Vague screen: ${d.vague}`,`17. Unfamiliar inquiry: ${d.unfamiliar}`,`18. Filter: ${d.filter}`].join("\n");const rows=JSON.parse(localStorage.getItem(submissionKey)||"[]");rows.unshift({...next,lesson:9,lessonTitle:"Application Decision Room",response,submittedAt:new Date().toISOString()});localStorage.setItem(submissionKey,JSON.stringify(rows));localStorage.setItem(learnerKey,JSON.stringify(next));localStorage.setItem(completionKey,"true");setLearner(next);setComplete(true)}
  return <div className="reader-shell inquiry-course"><div className="reader-progress"><span style={{width:`${scrollProgress}%`}}/></div><header className="reader-header"><button className="reader-menu-button" onClick={()=>setMenuOpen(true)} aria-label="Open course contents"><Menu/></button><Brand/><div className="reader-header-meta"><BookOpen size={17}/><span>Course 1.9</span><i/><span>{scrollProgress}% read</span></div><a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a></header><aside className={`reader-nav ${menuOpen?"open":""}`}><div className="reader-nav-head"><div><span>COURSE 1.9</span><strong>On this page</strong></div><button onClick={()=>setMenuOpen(false)}><X/></button></div><nav>{course19Sections.map((s,i)=><button key={s.id} className={activeSection===s.id?"active":""} onClick={()=>goToSection(s.id)}><span>{String(i+1).padStart(2,"0")}</span>{s.label}</button>)}</nav><div className="reader-nav-note"><LockKeyhole size={17}/><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div></aside>{menuOpen&&<button className="reader-scrim" onClick={()=>setMenuOpen(false)}/>}<main className="reader-main">
    <section className="reader-hero inquiry-hero" id="start"><div className="reader-hero-media inquiry-hero-media" aria-hidden="true"><Image src="/starter%20images/course-1-9/hero9bg.webp" alt="" fill priority sizes="(max-width: 1050px) 100vw, calc(100vw - 272px)" /></div><div className="reader-hero-copy"><p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p><p className="reader-deck">Before you apply, identify the event, confirm the inquiry, test the product and check the timing.</p><div className="reader-meta"><span><Clock3/>{course.duration}</span><span><FileCheck2/>One course check-in</span></div><button className="reader-primary" onClick={()=>goToSection("difference")}>Enter the decision room <ArrowRight/></button></div><div className="inquiry-hero-visual"><button type="button" tabIndex="-1">APPLY NOW</button><div className="inquiry-pulse"><SearchCheck/><strong>HARD<br/>OR<br/>SOFT?</strong></div></div></section>
    <div className="reader-body"><section className="reader-section reader-intro"><p className="reader-lead">A credit inquiry appears when someone accesses your credit information.</p><p>The important question is why the report was accessed. Was this part of an application for new credit, or was it a non-lending review such as checking your own report?</p><p>A hard inquiry—also called a hard hit—is generally connected with seeking credit and can affect a credit score. A soft inquiry—or soft hit—does not affect the score. The names sound like one arrived on a pillow and the other through a wall, but purpose matters more than the adjective.</p><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/improve-credit-score.html">FCAC: Understanding credit inquiries</SourceLink></div><Spotlight>Not every credit check is an application. Checking your own Canadian credit report or score does not affect your credit score.</Spotlight><h2 className="bureau-inline-heading">Welcome to the Application Decision Room</h2><p>This room has no judge, no velvet rope and only one clipboard. Before you apply, move through four decisions. If the answers are unclear, pause long enough to ask questions.</p><DecisionCarousel /><Spotlight>A hard inquiry is not automatically a bad decision. It is a cost of applying for credit, so it should be attached to a product with a clear purpose—not simply a button with excellent lighting.</Spotlight></section>
    <section className="reader-section" id="difference"><Heading number="01" title="Hard vs. Soft: The Useful Difference"/><div className="inquiry-compare"><article><SearchCheck/><span>HARD INQUIRY</span><p>Usually linked to applying for new credit. It appears on your credit report, may be visible to those who review the report and can affect the score. Examples may include a credit card, mortgage or loan application.</p></article><article><ShieldCheck/><span>SOFT INQUIRY</span><p>A non-score-damaging review. Examples include requesting your own report or an organization updating records for an existing account. Soft inquiries appear on the consumer-facing version of the report, not as score-damaging applications.</p></article></div><p>Do not guess based only on the setting. Some rental, employment, prequalification or limit-review processes may be handled differently depending on the organization and purpose. Ask the plain question: ‘Will this result in a hard inquiry on my credit file?’</p><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink><SourceLink href="https://www.transunion.ca/credit-score">TransUnion Canada: Do you know your credit score?</SourceLink></div><Spotlight>‘Pre-approved,’ ‘prequalified’ and ‘eligibility check’ are marketing labels, not inquiry guarantees. Ask whether accepting or continuing will create a hard inquiry.</Spotlight></section>
    <section className="reader-section" id="doors"><Heading number="02" title="The Three Doors: Proceed, Pause or Ask First"/><div className="door-grid"><article className="proceed"><Play/><h3>PROCEED</h3><p>The credit meets a real need, the cost is understood, the application fits your plan, and you have not been submitting unnecessary applications.</p></article><article className="pause"><Pause/><h3>PAUSE</h3><p>The main reason is an instant discount, the long-term account has no clear use, recent applications are piling up, or you have not compared alternatives.</p></article><article className="ask"><CircleHelp/><h3>ASK FIRST</h3><p>The process uses vague wording such as ‘check eligibility,’ involves a dealer or broker, offers a limit increase, or does not clearly state whether a hard inquiry will occur.</p></article></div><div className="story-card inquiry-story"><div className="story-media" aria-hidden="true"><Image src="/starter%20images/course-1-9/dedicated-storybg.webp" alt="" fill sizes="(max-width: 760px) 100vw, 860px" loading="eager" /></div><div className="story-content"><p className="reader-kicker">THE $23 CHECKOUT DECISION</p><h3>The coupon is temporary; the account may have long-term career ambitions.</h3><p>Jamie is buying a winter coat. At checkout, the store offers $23 off today if Jamie applies for its credit card. The discount is real. So is the possibility of a new account and hard inquiry.</p><p>Jamie enters the Decision Room. The card is not needed for financing, the long-term benefits have not been compared, and Jamie recently applied for a car loan. Decision: pause. Jamie keeps the coat, skips the application and leaves with one fewer financial souvenir.</p><p>The lesson is not that store cards are always wrong. The lesson is that a small immediate saving should not make the entire credit decision for you. Compare annual fees, interest, rewards, likely use and whether the application fits your current borrowing plan.</p></div></div><Spotlight>A discount answers ‘What do I save today?’ It does not answer ‘Do I want this account for the next several years?’ Those are two separate meetings.</Spotlight></section>
    <section className="reader-section" id="shopping"><Heading number="03" title="Rate Shopping Without Turning It Into Application Confetti"/><p className="reader-lead">It can be reasonable to compare lenders for a mortgage or car loan. FCAC recommends getting quotes from different lenders within a two-week period; the credit bureaus treat those focused inquiries as one inquiry for scoring purposes.</p><ol className="priority-list">{rateRules.map(([t,c],i)=><li key={t}><span>{i+1}</span><div><h3>{t}</h3><p>{c}</p></div></li>)}</ol><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/improve-credit-score.html">FCAC: Limiting credit inquiries</SourceLink></div><Spotlight>Focused mortgage or car-loan rate shopping is different from applying for several unrelated credit products. Same purpose, short window, clear comparison.</Spotlight><h2 className="bureau-inline-heading">Quick Myth Check</h2><div className="myth-list"><Myth reality="No. FCAC and TransUnion state that checking your own report or score does not affect your score.">Checking my own credit report lowers my score.</Myth><Myth reality="No. Applying occasionally is normal. The concern is unnecessary or clustered applications that may look like urgent credit seeking.">Every hard inquiry is a credit disaster.</Myth><Myth reality="Not necessarily. An initial offer may use a soft review, while accepting or completing the application may involve a hard inquiry. Ask before continuing.">A pre-approved offer is always a soft inquiry from start to finish.</Myth><Myth reality="Processes can differ. FCAC lists some rental and employment applications among possible hard-inquiry examples, while TransUnion describes certain non-lending checks as soft. Confirm the organization’s process.">Every rental or employment check is automatically soft.</Myth><Myth reality="No. FCAC says lender inquiries may remain for three years with Equifax and six years with TransUnion. How long an item appears is not a promise about its scoring impact.">An inquiry disappears from Equifax and TransUnion at exactly the same time.</Myth></div><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/information-credit-report.html">FCAC: How long information stays on your credit report</SourceLink></div></section>
    <section className="reader-section" id="consent"><Heading number="04" title="Consent and an Inquiry You Do Not Recognize"/><p className="reader-lead">In most Canadian provinces, a business or individual needs your consent before checking your credit. Nova Scotia, Prince Edward Island and Saskatchewan use a notification rule described by FCAC. Provincial and territorial rules can differ, so use your local consumer affairs office for legal details.</p><p>If a hard inquiry looks unfamiliar, investigate before assuming either fraud or harmless paperwork:</p><ol className="priority-list">{investigate.map(([t,c],i)=><li key={t}><span>{i+1}</span><div><h3>{t}</h3><p>{c}</p></div></li>)}</ol><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink></div></section>
    <section className="reader-section" id="quick-check"><Heading number="05" title="Quick Check: What Is the Decision?"/><div className="quick-checks">{quickChecks.map(([p,a],i)=><details key={p}><summary><span>{i+6}</span><strong>{p}</strong><ChevronDown/></summary><div><b>{a}</b></div></details>)}</div><div className="takeaway"><ShieldCheck/><div><p>KEY TAKEAWAY</p><h3>Hard inquiries are generally connected to applications and may affect a score. Soft inquiries do not affect the score.</h3><span>Apply selectively, ask what type of check will occur, keep rate shopping focused and investigate unfamiliar inquiries promptly.</span></div></div><div className="reader-context-media decision-check-context-media"><div className="reader-context-copy"><Spotlight>The best application filter is simple: clear purpose, understood cost, reasonable timing and no mystery about the credit check. If one piece is missing, pause.</Spotlight></div><DecisionCheckImageCarousel /></div></section>
    <section className="reader-section" id="action"><Heading number="06" title="Your Action (Fill Out Form): Application Decision Room"/><div className="checkin-intro"><p className="reader-lead">Scenario: Morgan plans to compare car loans, receives a prequalified credit-card email and is offered a store card at checkout.</p><p>Decide which door each situation belongs behind.</p></div>{complete?<div className="reader-completion"><span><Check/></span><p className="reader-kicker">COURSE 1.9 COMPLETE</p><h3>Nicely done{learner.name?`, ${learner.name.split(" ")[0]}`:""}.</h3><p>Your check-in is saved on this device.</p><button className="reader-primary" onClick={()=>window.print()}>Print course notes <FileCheck2/></button></div>:<div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}><div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required/></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required/></label></div><label><span><b>11</b>OWN FILE — Morgan checks a personal credit report before applying. Hard or soft, and what happens to the score?</span><textarea name="ownFile" rows="3" required/></label><label><span><b>12</b>PREQUALIFICATION — What exact inquiry question should Morgan ask before continuing with the emailed offer?</span><textarea name="prequalification" rows="3" required/></label><label><span><b>13</b>RATE SHOPPING — Morgan compares car-loan quotes from three lenders within twelve days. Why is the timing useful?</span><textarea name="rateShopping" rows="3" required/></label><label><span><b>14</b>CHECKOUT OFFER — The store card saves $28 today. List two long-term questions Morgan should answer before applying.</span><textarea name="checkout" rows="3" required/></label><label><span><b>15</b>APPLICATION CLUSTER — Morgan has already applied for two unrelated cards this month. Proceed or pause on a third? Explain.</span><textarea name="cluster" rows="3" required/></label><label><span><b>16</b>VAGUE SCREEN — A lender says it will ‘review eligibility’ but does not identify the inquiry. Which door: Proceed, Pause or Ask First?</span><textarea name="vague" rows="3" required/></label><label><span><b>17</b>UNFAMILIAR INQUIRY — Give two steps Morgan should take after seeing a hard inquiry that is not recognized.</span><textarea name="unfamiliar" rows="3" required/></label><label><span><b>18</b>APPLICATION FILTER — Complete: ‘I am willing to add a hard inquiry because this product ________, the total cost is ________, and I compared ________ alternatives.’</span><textarea name="filter" rows="3" required/></label><label className="checkin-consent"><input type="checkbox" required/><span>I reviewed my answers and understand that this is educational information, not financial advice.</span></label><button className="reader-primary">Complete Course 1.9 <ArrowRight/></button><small><ShieldCheck/>Do not include account numbers, passwords or sensitive identifiers.</small></form></div>}</section>
    <section className="reader-section reader-glossary" id="glossary"><Heading number="07" title="Glossary of Terms"/><dl>{course19Glossary.map(([t,d])=><div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl></section></div><footer className="reader-footer"><Brand light/><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer></main></div>;
}
