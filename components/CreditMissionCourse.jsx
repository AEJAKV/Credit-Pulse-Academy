"use client";
import Image from"next/image";
import{useEffect,useState}from"react";
import{ArrowRight,BookOpen,CalendarCheck,Check,CheckCircle2,ChevronDown,ChevronLeft,ChevronRight,CircleDollarSign,Clock3,FileCheck2,Flag,Lightbulb,LockKeyhole,Menu,Percent,Plus,SearchCheck,ShieldCheck,Target,TrendingDown,X}from"lucide-react";
import{Brand}from"./Brand";
import{course110Glossary,course110Sections}from"../lib/course-110-data";
const learnerKey="cp-course-1-10-learner",completionKey="cp-course-1-10-complete",submissionKey="cp-course-1-10-submissions";
const campaignOne=[
 ["Save the baseline.","Record the date, source and score shown where available. Remember that the score a lender uses may differ from the score you see."],
 ["Read the facts.","Review identity details, accounts, payment status, balances, limits, inquiries and serious negative items."],
 ["Use three labels.","Green means accurate and stable; yellow means verify or monitor; red means prompt action, such as an unfamiliar account or false late payment."],
 ["Calculate utilization.","Check the overall percentage and each revolving account so one nearly maxed account cannot hide inside a comfortable total."],
 ["Build one due-date system.","List required payments, minimums and processing times in one place; then add reminders or automatic minimums where appropriate."],
 ["Choose three priorities.","Limit the first mission list to the actions with the clearest value. Ten urgent priorities are usually zero priorities wearing matching jackets."],
];
const campaignTwo=[
 ["Dispute only genuine errors.","Gather statements, receipts or other evidence. Submit a focused dispute to the bureau showing the error; contact the lender or information provider as well when helpful."],
 ["Track the case.","Record submission dates, case numbers, documents sent, replies and the next follow-up date."],
 ["Protect payment history.","Make required payments on time. If the full amount is not affordable, make at least the minimum and contact the lender early when even that may be difficult."],
 ["Reduce balance pressure safely.","Direct affordable extra money toward a high-utilization account without missing essentials or other required payments."],
 ["Pause unnecessary applications.","New credit should solve a real need, not merely create movement in a plan that already has movement."],
 ["Review statements weekly.","Confirm payments cleared, balances are moving as expected and no unfamiliar activity has appeared."],
];
const campaignThree=[
 ["Review dispute outcomes.","Confirm whether the corrected facts appear on the bureau file or whether follow-up is still required.",FileCheck2],
 ["Test the payment system.","Check whether reminders, automatic minimums and funding-account reviews worked for every due date.",CalendarCheck],
 ["Recalculate utilization.","Use current reported balances and limits. Record both the overall result and any account that remains highly concentrated.",Percent],
 ["Review inquiries and accounts.","Confirm that no unnecessary or unfamiliar credit activity appeared during the mission.",SearchCheck],
 ["Record behaviour wins.","Count new missed payments, unresolved errors, high-utilization accounts, new hard inquiries and payment systems successfully tested.",CheckCircle2],
 ["Choose the next three behaviours.","Continue the habits that produced control. A 90-day finish line should become a routine, not a trap door.",Flag],
];
const diagnostics=[
 ["Reporting timing","Have lenders reported the newer balances and payments yet?"],
 ["Two-file status","Are dispute corrections visible at both bureaus where they should be?"],
 ["Accurate history","Is valid negative information still affecting the file?"],
 ["Offsetting activity","Did a new account, hard inquiry or higher balance occur during the same period?"],
 ["Sustainability","Can the improved habits continue for another 90 days without squeezing essential expenses?"],
];
const quickChecks=[
 ["A false late payment has supporting bank records.","Mission action: build a focused dispute case."],
 ["A social-media service promises a guaranteed 120-point increase.","Distraction: no honest provider controls exact scoring results."],
 ["One card is at high utilization, but extra payment would leave rent short.","Protect essentials and required payments; choose a sustainable reduction amount."],
 ["Your score is similar on Day 90, but there were no missed payments and two errors were corrected.","Meaningful progress; investigate reporting timing and continue."],
 ["A checkout discount offers another card during the mission.","Apply only if the account has a clear long-term purpose and fits the plan; otherwise pause."],
];
function Spotlight({children}){return <aside className="reader-spotlight"><Lightbulb/><div><strong>Credit Pulse spotlight</strong><p>{children}</p></div></aside>}
function SourceLink({href,children}){return <a className="reader-source" href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={14}/></a>}
function Heading({number,title}){return <div className="reader-section-heading"><span>{number}</span><div><h2>{title}</h2></div></div>}

const missionCarouselSlides = [
  { src: "/starter%20images/course-1-10/10.1.webp", alt: "Recording a baseline credit report before starting the 90-day mission." },
  { src: "/starter%20images/course-1-10/10.2.webp", alt: "Tracking facts and behaviours over the course of the mission." },
];

function MissionImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % missionCarouselSlides.length), 4000);
    return () => window.clearInterval(interval);
  }, [paused]);

  function showSlide(index) {
    setActiveSlide((index + missionCarouselSlides.length) % missionCarouselSlides.length);
  }

  return <section
    className="course-image-carousel mission-image-carousel"
    aria-label="Course image carousel"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {missionCarouselSlides.map((slide, index) => <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${missionCarouselSlides.length}`} aria-hidden={activeSlide !== index} key={slide.src}>
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
    <div className="carousel-dots" aria-label="Choose an image">{missionCarouselSlides.map((slide, index) => <button key={slide.src} type="button" className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />)}</div>
    <span className="carousel-status" aria-live="polite">Image {activeSlide + 1} of {missionCarouselSlides.length}</span>
  </section>;
}
function Myth({children,reality}){return <article><span>MYTH</span><p>“{children}”</p><div><CheckCircle2/>{reality}</div></article>}
function ActionList({items}){return <ol className="priority-list">{items.map(([t,c],i)=><li key={t}><span>{i+1}</span><div><h3>{t}</h3><p>{c}</p></div></li>)}</ol>}

function MissionActionCarousel({items}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const maxSlide = Math.max(0, items.length - visibleCount);
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
    className="mission-action-carousel"
    data-visible={visibleCount}
    aria-label="Campaign three verification steps"
    aria-roledescription="carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="mission-action-viewport">
      <div className="mission-action-track" style={{ transform: `translateX(calc(-${slidePercent}% - ${slideGap}px))` }}>
        {items.map(([title, copy, Icon], index) => <article key={title} aria-label={`${index + 1} of ${items.length}`}>
          <div className="mission-action-visual" aria-hidden="true">
            <Icon className="mission-action-ghost" aria-hidden="true" />
            <span className="mission-action-tag">STEP {index + 1}</span>
            <span className="mission-action-badge"><Icon /></span>
          </div>
          <div className="mission-action-copy">
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>)}
      </div>
    </div>
    <div className="mission-action-controls">
      <div className="mission-action-dots" aria-label="Choose a group of steps">
        {Array.from({ length: maxSlide + 1 }, (_, index) => <button key={index} type="button" className={displayedSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show step group ${index + 1}`} aria-current={displayedSlide === index ? "true" : undefined} />)}
      </div>
      <div>
        <button type="button" onClick={() => setActiveSlide((current) => (current <= 0 ? maxSlide : current - 1))} aria-label="Previous steps"><ChevronLeft /></button>
        <button type="button" onClick={() => setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1))} aria-label="Next steps"><ChevronRight /></button>
      </div>
    </div>
    <span className="carousel-status" aria-live="polite">Showing step {displayedSlide + 1} through {Math.min(displayedSlide + visibleCount, items.length)} of {items.length}</span>
  </section>;
}

export function CreditMissionCourse({course}){
 const[activeSection,setActiveSection]=useState("start"),[menuOpen,setMenuOpen]=useState(false),[scrollProgress,setScrollProgress]=useState(0),[learner,setLearner]=useState({name:"",email:""}),[complete,setComplete]=useState(false);
 useEffect(()=>{const frame=requestAnimationFrame(()=>{try{setLearner(JSON.parse(localStorage.getItem(learnerKey))||{name:"",email:""});setComplete(localStorage.getItem(completionKey)==="true")}catch{}});const update=()=>{const a=document.documentElement.scrollHeight-window.innerHeight;setScrollProgress(a>0?Math.min(100,Math.round(window.scrollY/a*100)):0)};const observer=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)setActiveSection(v.target.id)},{rootMargin:"-20% 0px -65%",threshold:[0,.25,.6]});course110Sections.forEach(({id})=>{const s=document.getElementById(id);if(s)observer.observe(s)});update();window.addEventListener("scroll",update,{passive:true});return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",update)}},[]);
 function goToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false)}
 function submitActivity(event){event.preventDefault();const d=Object.fromEntries(new FormData(event.currentTarget)),next={name:d.name,email:d.email};const response=[`11. Dates: ${d.dates}`,`12. Baseline: ${d.baseline}`,`13. Priorities: ${d.priorities}`,`14. Payment defence: ${d.payment}`,`15. Dispute file: ${d.dispute}`,`16. Balance plan: ${d.balance}`,`17. Application rule: ${d.application}`,`18. Commitment: ${d.commitment}`,`Scorecard: ${d.scorecard}`].join("\n");const rows=JSON.parse(localStorage.getItem(submissionKey)||"[]");rows.unshift({...next,lesson:10,lessonTitle:"90-Day Mission Plan",response,submittedAt:new Date().toISOString()});localStorage.setItem(submissionKey,JSON.stringify(rows));localStorage.setItem(learnerKey,JSON.stringify(next));localStorage.setItem(completionKey,"true");setLearner(next);setComplete(true)}
 return <div className="reader-shell mission-course"><div className="reader-progress"><span style={{width:`${scrollProgress}%`}}/></div><header className="reader-header"><button className="reader-menu-button" onClick={()=>setMenuOpen(true)}><Menu/></button><Brand/><div className="reader-header-meta"><BookOpen size={17}/><span>Course 1.10</span><i/><span>{scrollProgress}% read</span></div><a className="reader-help" href="mailto:support@creditpulse.ca">Need help?</a></header><aside className={`reader-nav ${menuOpen?"open":""}`}><div className="reader-nav-head"><div><span>COURSE 1.10</span><strong>On this page</strong></div><button onClick={()=>setMenuOpen(false)}><X/></button></div><nav>{course110Sections.map((s,i)=><button key={s.id} className={activeSection===s.id?"active":""} onClick={()=>goToSection(s.id)}><span>{String(i+1).padStart(2,"0")}</span>{s.label}</button>)}</nav><div className="reader-nav-note"><LockKeyhole size={17}/><p><strong>Private course link</strong><span>Your progress stays on this device.</span></p></div></aside>{menuOpen&&<button className="reader-scrim" onClick={()=>setMenuOpen(false)}/>}<main className="reader-main">
 <section className="reader-hero mission-hero" id="start"><div className="reader-hero-media mission-hero-media" aria-hidden="true"><Image src="/starter%20images/course-1-10/course-10bg.webp" alt="" fill priority sizes="(max-width: 1050px) 100vw, calc(100vw - 272px)" /></div><div className="reader-hero-copy"><p className="reader-kicker">{course.eyebrow}</p><h1>{course.title}</h1><p className="reader-subtitle">{course.subtitle}</p><p className="reader-deck">Three campaigns. Thirty days each. Build a credit routine sturdy enough to survive ordinary life.</p><div className="reader-meta"><span><Clock3/>{course.duration}</span><span><FileCheck2/>One mission plan</span></div><button className="reader-primary" onClick={()=>goToSection("campaign-one")}>Begin the mission <ArrowRight/></button></div><div className="mission-hero-visual"><div className="mission-target"><span className="mission-target-face" aria-hidden="true" /><Target/><strong>90</strong><small>DAYS</small></div><div className="mission-phases"><span>TRUTH</span><i/><span>STABILIZE</span><i/><span>VERIFY</span></div></div></section>
 <div className="reader-body"><section className="reader-section reader-intro"><p className="reader-lead">A 90-day credit plan is not a promise that a score will rise by a specific number.</p><p>Credit bureaus and lenders use different formulas, lenders report on different schedules, and accurate negative history does not disappear because a calendar received an inspiring speech.</p><p>What 90 days can give you is control. You can confirm what is on both reports, correct genuine errors, protect every required payment, reduce avoidable balance pressure, limit unnecessary applications and measure whether your systems actually worked.</p><p>Think of this as a mission with three campaigns. Each lasts 30 days. The goal is not perfection; it is a credit routine sturdy enough to survive ordinary life, including the week when every bill suddenly remembers your email address.</p><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/credit-report-score-basics.html">FCAC: Credit report and score basics</SourceLink></div><div className="reader-context-media mission-context-media"><div className="reader-context-copy"><Spotlight>A score is one measurement taken at one point in time. Your 90-day mission tracks the facts and behaviours underneath it—the parts you can actually verify and repeat.</Spotlight></div><MissionImageCarousel /></div><h2 className="bureau-inline-heading">Mission Briefing: Define a Win You Can Prove</h2><div className="mission-brief"><article><i className="mission-brief-icon"><Target/></i><span>MISSION OBJECTIVE</span><p>Build a more accurate, stable and manageable credit file through repeatable actions over 90 days.</p></article><article><i className="mission-brief-icon"><Flag/></i><span>WIN CONDITION</span><p>No new missed payments, fewer avoidable high balances, genuine errors corrected or documented, only necessary applications, and a working review system.</p></article><article><i className="mission-brief-icon"><X/></i><span>NOT THE MISSION</span><p>Chasing a guaranteed point increase, disputing accurate information, opening accounts for a quick fix or sacrificing essential expenses to make a score look prettier.</p></article></div></section>
 <section className="reader-section" id="campaign-one"><Heading number="01" title="Campaign One — Days 1–30: Establish the Truth"/><div className="campaign-banner"><span>DAYS 1–30</span><strong>ESTABLISH THE TRUTH</strong><p>Build the baseline before changing the plan.</p></div><p className="reader-lead">The first month is investigation, not panic. Access your Equifax report and your TransUnion Consumer Disclosure. Checking your own report or score does not affect your credit score. Because the bureaus maintain separate files, review both rather than treating one as the official master copy.</p><ActionList items={campaignOne}/><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/order-credit-report.html">FCAC: Getting your credit report and credit score</SourceLink></div><div className="checkpoint"><CalendarCheck/><div><span>DAY-30 CHECKPOINT</span><p>You should have both reports, a dated baseline, one payment calendar, utilization calculations and no more than three high-value priorities.</p></div></div><Spotlight>Equifax and TransUnion provide free online access to consumer credit reports. Checking your own information does not lower your score, so the first mission move is observation, not application.</Spotlight><div className="story-card mission-story"><div className="story-media" aria-hidden="true"><Image src="/starter%20images/course-1-10/dedicated-story-10.webp" alt="" fill sizes="(max-width: 760px) 100vw, 860px" loading="eager" /></div><div className="story-content"><p className="reader-kicker">THE MISSION WITH TWELVE PRIORITIES</p><h3>Ten urgent priorities are usually zero priorities wearing matching jackets.</h3><p>Jordan begins on Sunday with two credit reports, four browser tabs and the confidence of someone who has not yet met the paperwork. By lunch, the plan has twelve priorities: dispute everything negative, open a new card, close an old card, move three balances and somehow become financially serene by Tuesday.</p><p>Jordan pauses and asks which actions solve a verified problem. One false late payment has proof. One card is using most of its limit. One due date has been missed before because the reminder is unreliable. Those become the three priorities: dispute the false late payment, lower the concentrated balance safely and install a payment backup.</p><p>The new plan looks less dramatic, which is excellent. Credit improvement is often a series of quiet jobs completed in the correct order. The mission succeeds because Jordan can explain each action, not because the checklist has achieved impressive wingspan.</p></div></div></section>
 <section className="reader-section" id="campaign-two"><Heading number="02" title="Campaign Two — Days 31–60: Correct and Stabilize"/><div className="campaign-banner"><span>DAYS 31–60</span><strong>CORRECT AND STABILIZE</strong><p>Fix verified errors and protect the habits that matter most.</p></div><ActionList items={campaignTwo}/><div className="reader-links"><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/check-errors.html">FCAC: Checking your credit report for errors and fraud</SourceLink><SourceLink href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/improve-credit-score.html">FCAC: Improving your credit score</SourceLink></div><div className="checkpoint"><CalendarCheck/><div><span>DAY-60 CHECKPOINT</span><p>Every genuine dispute has evidence and a case trail; payment safeguards have been tested; the priority balance has a sustainable plan; unnecessary applications are paused.</p></div></div><Spotlight>Credit bureaus must correct errors for free, but accurate negative information is not an error. A strong dispute identifies a specific wrong fact and supports the correction with evidence.</Spotlight></section>
 <section className="reader-section" id="campaign-three"><Heading number="03" title="Campaign Three — Days 61–90: Verify and Continue"/><div className="campaign-banner"><span>DAYS 61–90</span><strong>VERIFY AND CONTINUE</strong><p>Measure the result, repair weak systems and choose the next habits.</p></div><div className="sentence-builder mission-sentence-builder"><div className="sentence-builder-card"><span className="sentence-builder-kicker">VERIFICATION ROUND</span><h3>Compare the evidence before you decide</h3><p>The final month is not a victory lap around one score. Lenders update information on different schedules, and the score you see can move for several reasons. Compare the evidence before deciding whether the mission worked.</p></div><div className="sentence-builder-tiles"><article><span className="tile-plus"><Plus/></span><Clock3/><b>Different schedules</b></article><article><span className="tile-plus"><Plus/></span><TrendingDown/><b>Score can shift</b></article><article><span className="tile-plus"><Plus/></span><SearchCheck/><b>Compare evidence</b></article></div></div><MissionActionCarousel items={campaignThree}/><div className="checkpoint"><CalendarCheck/><div><span>DAY-90 CHECKPOINT</span><p>Compare the baseline with the current reports and behaviour scorecard. Schedule the next review before the mission folder disappears into a drawer with three warranty booklets.</p></div></div><Spotlight>A score can rise, fall or remain similar while your underlying file changes. Judge the mission by verified accuracy, protected payments, lower balance pressure and fewer unnecessary applications—not one number alone.</Spotlight></section>
 <section className="reader-section" id="control"><Heading number="04" title="Mission Control: What to Protect, Correct, Reduce, Avoid and Verify"/><div className="control-grid"><article><ShieldCheck/><span>PROTECT</span><p>Every required payment and the household essentials that keep the plan sustainable.</p></article><article><FileCheck2/><span>CORRECT</span><p>Only information that is inaccurate, incomplete or not yours—supported by clear evidence.</p></article><article><TrendingDown/><span>REDUCE</span><p>High revolving balances where an affordable payment lowers utilization without creating a cash-flow crisis.</p></article><article><X/><span>AVOID</span><p>Unnecessary applications, panic closures, paid quick fixes and new debt that does not solve the problem.</p></article><article><SearchCheck/><span>VERIFY</span><p>Payment completion, reporting updates, dispute results and whether the routine can continue beyond Day 90.</p></article></div><Spotlight>The best plan protects payment history first. A balance-reduction goal that causes a missed required payment has promoted the wrong employee.</Spotlight><h2 className="bureau-inline-heading">Quick Myth Check</h2><div className="myth-list"><Myth reality="No. Formulas are not shared, reporting schedules differ and a lender may use another score. A responsible plan promises actions and measurement, not points.">A 90-day plan can guarantee a 100-point increase.</Myth><Myth reality="No. Dispute information you believe is wrong. Accurate negative history may remain; a dispute is an accuracy process, not an eraser lottery.">I should dispute every negative item to see what disappears.</Myth><Myth reality="No special credit-building benefit comes from paying interest. Payment history, balances, utilization and responsible account management matter; avoidable interest simply adds cost.">Carrying a balance and paying interest helps build credit.</Myth><Myth reality="Not automatically. Closing can reduce available credit and may affect credit-history length. Consider fees, manageability, spending risk and utilization first.">Closing an older paid-off card always improves my score.</Myth><Myth reality="Not necessarily. Reporting may be catching up, accurate negative information may remain, or another change may offset progress. Verified accuracy and reliable habits still matter.">If my score barely moves by Day 90, the mission failed.</Myth></div><h2 className="bureau-inline-heading">If the Number Has Not Moved Much</h2><p>Before changing the entire plan, investigate the timing and the file:</p><div className="diagnostic-list">{diagnostics.map(([t,c])=><div key={t}><strong>{t} —</strong><span>{c}</span></div>)}</div><div className="reader-links"><SourceLink href="https://www.transunion.ca/credit-score">TransUnion Canada: Do you know your credit score?</SourceLink></div></section>
 <section className="reader-section" id="quick-check"><Heading number="05" title="Quick Check: Mission or Distraction?"/><div className="quick-checks">{quickChecks.map(([p,a],i)=><details key={p}><summary><span>{i+6}</span><strong>{p}</strong><ChevronDown/></summary><div><b>{a}</b></div></details>)}</div><div className="takeaway"><Target/><div><p>KEY TAKEAWAY</p><h3>A strong 90-day plan establishes accurate information, stabilizes payments and balances, limits unnecessary applications, verifies results and continues the behaviours that work.</h3><span>Aim for control and consistency, not a guaranteed number.</span></div></div><Spotlight>The mission ends with a decision, not a trophy: keep the systems that worked, repair the ones that failed and choose the next three behaviours deliberately.</Spotlight></section>
 <section className="reader-section" id="action"><Heading number="06" title="Your Action (Fill Out Form): 90-Day Mission Plan"/><div className="checkin-intro"><div className="activity-reward-pill"><CircleDollarSign aria-hidden="true"/><span>Complete this activity and get <strong>$5</strong> plus <strong>20 Credit Pulse points</strong></span></div><p className="reader-lead">Choose a start date and a Day-90 review date.</p><p>Use initials or shortened account names in course notes; do not write full account numbers, passwords or identity-document numbers here.</p></div>{complete?<div className="reader-completion"><span><Check/></span><p className="reader-kicker">COURSE 1.10 COMPLETE</p><h3>Mission complete{learner.name?`, ${learner.name.split(" ")[0]}`:""}.</h3><p>Your plan is saved on this device.</p><button className="reader-primary" onClick={()=>window.print()}>Print mission plan <FileCheck2/></button></div>:<div className="calculator-frame checkin-form-frame"><form className="checkin-form" onSubmit={submitActivity}><div className="checkin-identity"><label>Full name<input name="name" defaultValue={learner.name} required/></label><label>Email address<input name="email" type="email" defaultValue={learner.email} required/></label></div><label><span><b>11</b>MISSION DATES — What are your four check-in dates: start, Day 30, Day 60, and Day 90?</span><textarea name="dates" rows="3" required/></label><label><span><b>12</b>BASELINE — Which two reports (Equifax and TransUnion) will you use, and when did you pull them?</span><textarea name="baseline" rows="3" required/></label><label><span><b>13</b>THREE PRIORITIES — What's one thing to protect, one to fix or verify, and one balance or habit to lower?</span><textarea name="priorities" rows="3" required/></label><label><span><b>14</b>PAYMENT DEFENCE — How will you make sure every required payment gets made on time?</span><textarea name="payment" rows="3" required/></label><label><span><b>15</b>DISPUTE FILE — If there's an error: what's wrong, what proof do you have, and when will you follow up?</span><textarea name="dispute" rows="3" required/></label><label><span><b>16</b>BALANCE PLAN — Which account needs the most attention, and how much can you safely pay toward it?</span><textarea name="balance" rows="3" required/></label><label><span><b>17</b>APPLICATION RULE — Finish the sentence: For 90 days, I'll only apply for new credit when ___.</span><textarea name="application" rows="3" required/></label><label><span><b>18</b>COMMITMENT — Finish the sentence: Over the next 90 days, I will protect ___, fix ___, avoid ___, and verify ___.</span><textarea name="commitment" rows="3" required/></label><label><span><b>DAY 90</b>Your Day-90 Scorecard — Compare your baseline to Day 90: missed payments, overall utilization, high-utilization accounts, unresolved errors, new hard inquiries, and payment systems you tested.</span><textarea name="scorecard" rows="7" required/></label><label className="checkin-consent"><input type="checkbox" required/><span>I reviewed my plan and understand that this is educational information, not financial advice.</span></label><button className="reader-primary">Complete Course 1.10 <ArrowRight/></button><small><ShieldCheck/>Do not include full account numbers, passwords or identity-document numbers.</small></form></div>}</section>
 <section className="reader-section reader-glossary" id="glossary"><Heading number="07" title="Glossary of Terms"/><dl>{course110Glossary.map(([t,d])=><div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl></section></div><footer className="reader-footer"><Brand light/><p>Credit education, made clear.</p><a href="#start">Back to top ↑</a></footer></main></div>;
}
