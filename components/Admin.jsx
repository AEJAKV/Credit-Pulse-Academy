"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "./Brand";

const creditFoundationModules = [
  "Understanding Canadian Credit Scores",
  "Equifax Canada Versus TransUnion Canada",
  "Reading Your Canadian Credit Report",
  "Correcting Errors on a Credit Report",
  "Building Credit From Zero",
  "Secured Credit Cards in Canada",
  "Credit Utilization",
  "Payment History",
  "Hard and Soft Credit Inquiries",
  "The 90-Day Credit Improvement Plan",
];

const moneyFoundationModules = [
  "Building a Canadian Household Budget",
  "Managing Money Between Paydays",
  "Emergency Funds",
  "Canadian Bank Accounts and Fees",
  "Credit Unions Versus Banks",
  "Managing Overdraft",
  "Understanding Interest and APR",
  "Paying Down High-Interest Debt",
  "Snowball Versus Avalanche Debt Repayment",
  "Managing Variable Income",
  "Managing Finances as a Couple",
  "Financial Planning for Single Parents",
  "Avoiding Predatory Financial Products",
  "Financing Major Purchases",
  "The 30-Day Financial Reset",
];

const silverCourses = [
  {
    title: "Advanced Canadian Credit",
    modules: [
      "Rebuilding Credit After Collections",
      "Rebuilding Credit After Bankruptcy",
      "Rebuilding Credit After a Consumer Proposal",
      "Dealing With Canadian Collection Agencies",
      "Statutes of Limitation by Province",
      "Identity Theft and Credit Fraud",
      "Preparing for a Mortgage",
      "Preparing for an Auto Loan",
      "Credit Building for Newcomers",
      "Credit Building After Divorce",
    ],
  },
  {
    title: "Major Money Decisions",
    modules: [
      "Buying Versus Leasing",
      "Saving for a Home",
      "Managing Rental Costs",
      "Insurance Basics",
      "Financial Fraud and Scams",
    ],
  },
  {
    title: "Instant Cash Side Hustles",
    modules: [
      "Starting a Side Hustle",
      "Gig Work in Canada",
      "Freelancing",
      "Virtual Assistance",
      "Cleaning Businesses",
      "Property Maintenance",
      "Snow Removal",
      "Lawn Care",
      "Mobile Detailing",
      "Pet Services",
    ],
  },
];

const goldCourses = [
  {
    title: "Canadian Benefits and Financial Support",
    modules: [
      "Canada Child Benefit",
      "GST/HST Credit",
      "Canada Workers Benefit",
      "Disability Tax Credit",
      "Registered Disability Savings Plan",
      "Old Age Security",
      "Guaranteed Income Supplement",
      "Canada Pension Plan",
      "CPP Disability Benefits",
      "Employment Insurance",
      "Provincial Income Support",
      "Provincial Disability Programs",
      "Rent Assistance",
      "Utility Assistance",
      "Dental-Care Benefits",
      "Prescription Assistance",
      "Student Grants",
      "Apprenticeship Funding",
      "Indigenous Benefits and Programs",
      "Newcomer Settlement Supports",
    ],
  },
  {
    title: "Additional Income Opportunities",
    modules: [
      "Senior Companion Services",
      "Online Tutoring",
      "Reselling Products",
      "Marketplace Flipping",
      "Getting Your First Customer",
    ],
  },
];

const platinumCourses = [
  {
    title: "Grants, Rebates and Special Programs",
    modules: [
      "Veteran Benefits",
      "Senior Home-Renovation Programs",
      "Energy-Efficiency Rebates",
      "Training Grants",
      "Small-Business Grants",
      "Wage Subsidies",
      "First-Time Home Buyer Programs",
      "Tax Credits People Commonly Miss",
      "Provincial Benefit Finders",
      "How to Apply Without Getting Scammed",
    ],
  },
  {
    title: "Canadian Tax and Wealth Foundations",
    modules: [
      "Understanding a Canadian Paycheque",
      "Marginal Tax Rates",
      "Filing an Income-Tax Return",
      "Common Tax Deductions and Credits",
      "TFSA Basics",
      "RRSP Basics",
      "FHSA Basics",
      "RESP Basics",
      "RDSP Basics",
      "RRIF Basics",
      "Tax-Free Versus Tax-Deferred Growth",
      "Investment Fees",
      "ETFs and Mutual Funds",
      "Risk Tolerance",
      "Compound Growth",
    ],
  },
];

const diamondCourses = [
  {
    title: "Advanced Tax and Wealth",
    modules: [
      "Canadian Retirement Planning",
      "Estate and Beneficiary Basics",
      "Self-Employment Taxes",
      "GST/HST for Small Businesses",
      "Keeping CRA Records",
    ],
  },
  {
    title: "Fitness Foundations",
    modules: [
      "Beginner Fitness for Men",
      "Beginner Fitness for Women",
      "Home Workouts",
      "Gym Fundamentals",
      "Strength Training",
      "Muscle Building",
      "Fat-Loss Fundamentals",
      "Low-Impact Fitness",
      "Fitness Over 40",
      "Fitness Over 50",
      "Mobility",
      "Flexibility",
      "Core Strength",
      "Resistance-Band Training",
      "Bodyweight Training",
    ],
  },
  {
    title: "Digital Income Courses",
    modules: [
      "Digital Products",
      "Affiliate Marketing",
      "Print on Demand",
      "Ecommerce",
      "AI-Assisted Businesses",
    ],
  },
];

const eliteCourses = [
  {
    title: "Advanced Fitness and Healthy Living",
    modules: [
      "HIIT",
      "Walking Programs",
      "Running Programs",
      "Boxing Fitness",
      "Kickboxing Fitness",
      "Yoga",
      "Pilates",
      "Desk-Worker Mobility",
      "Healthy Meal Planning",
      "Protein and Nutrition Basics",
      "Sleep and Recovery",
      "Habit Building",
      "Stress Management",
      "Thirty-Day Challenges",
      "Twelve-Week Transformations",
    ],
  },
  {
    title: "Business Setup and Scaling",
    modules: [
      "Social-Media Management",
      "Local Lead Generation",
      "Starting a Small Corporation",
      "Sole Proprietor Versus Corporation",
      "Canadian Business Registration",
      "Basic Bookkeeping",
      "GST/HST",
      "Pricing Services",
      "Building Recurring Revenue",
      "Moving From Side Hustle to Business",
    ],
  },
];

const publishedCourseRoutes = [
  "/course/understanding-canadian-credit-scores",
  "/course/equifax-canada-versus-transunion-canada",
  "/course/reading-your-canadian-credit-report",
  "/course/correcting-errors-on-a-credit-report",
  "/course/building-credit-from-zero",
  "/course/secured-credit-cards-in-canada",
  "/course/credit-utilization",
  "/course/payment-history",
  "/course/hard-and-soft-credit-inquiries",
  "/course/the-90-day-credit-improvement-plan",
];

const publishedMoneyRoutes = [
  "/course/building-a-canadian-household-budget",
  "/course/managing-money-between-paydays",
  "/course/emergency-funds",
  "/course/canadian-bank-accounts-and-fees",
  "/course/credit-unions-versus-banks",
  "/course/managing-overdraft",
  "/course/understanding-interest-and-apr",
  "/course/paying-down-high-interest-debt",
  "/course/snowball-versus-avalanche-debt-repayment",
  "/course/managing-variable-income",
  "/course/managing-finances-as-a-couple",
  null,
  "/course/avoiding-predatory-financial-products",
  "/course/financing-major-purchases",
  "/course/the-30-day-financial-reset",
];

const membershipTiers = ["Starter", "Silver", "Gold", "Platinum", "Diamond", "Elite"];

const publishedSilverRoutes = ["/course/silver/rebuilding-credit-after-collections"];

function SilverCatalog() {
  return <div className="tier-content"><p className="tier-includes">Includes all Starter Courses</p>{silverCourses.map((course,courseIndex)=><details className="catalog-course" open={courseIndex===0} key={course.title}><summary><span>{`COURSE ${courseIndex+1}`}</span><div><strong>{course.title}</strong><small>{course.modules.length} modules · {courseIndex===0?"1 published":`${course.modules.length} planned`}</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{course.modules.map((title,moduleIndex)=>{const published=courseIndex===0&&moduleIndex===0;return <li className={published?"published":""} key={title}><span>{`${courseIndex+1}.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>{published?"Published":"Planned"}</small></div>{published&&<a href={publishedSilverRoutes[moduleIndex]} target="_blank" rel="noreferrer" aria-label={`Open ${title} learner view`}>Open ↗</a>}</li>})}</ol></details>)}</div>;
}

function GoldCatalog() {
  return <div className="tier-content"><div className="tier-inheritance"><p className="tier-includes">Includes all Starter Courses</p><p className="tier-includes">Includes all Silver Courses</p></div>{goldCourses.map((course,courseIndex)=><details className="catalog-course" key={course.title}><summary><span>{`COURSE ${courseIndex+1}`}</span><div><strong>{course.title}</strong><small>{course.modules.length} modules · {course.modules.length} planned</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{course.modules.map((title,moduleIndex)=><li key={title}><span>{`${courseIndex+1}.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>Planned</small></div></li>)}</ol></details>)}</div>;
}

function PlatinumCatalog() {
  return <div className="tier-content"><div className="tier-inheritance"><p className="tier-includes">Includes all Starter Courses</p><p className="tier-includes">Includes all Silver Courses</p><p className="tier-includes">Includes all Gold Courses</p></div>{platinumCourses.map((course,courseIndex)=><details className="catalog-course" key={course.title}><summary><span>{`COURSE ${courseIndex+1}`}</span><div><strong>{course.title}</strong><small>{course.modules.length} modules · {course.modules.length} planned</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{course.modules.map((title,moduleIndex)=><li key={title}><span>{`${courseIndex+1}.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>Planned</small></div></li>)}</ol></details>)}</div>;
}

function DiamondCatalog() {
  return <div className="tier-content"><div className="tier-inheritance"><p className="tier-includes">Includes all Starter Courses</p><p className="tier-includes">Includes all Silver Courses</p><p className="tier-includes">Includes all Gold Courses</p><p className="tier-includes">Includes all Platinum Courses</p></div>{diamondCourses.map((course,courseIndex)=><details className="catalog-course" key={course.title}><summary><span>{`COURSE ${courseIndex+1}`}</span><div><strong>{course.title}</strong><small>{course.modules.length} modules · {course.modules.length} planned</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{course.modules.map((title,moduleIndex)=><li key={title}><span>{`${courseIndex+1}.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>Planned</small></div></li>)}</ol></details>)}</div>;
}

function EliteCatalog() {
  return <div className="tier-content"><div className="tier-inheritance"><p className="tier-includes">Includes all Starter Courses</p><p className="tier-includes">Includes all Silver Courses</p><p className="tier-includes">Includes all Gold Courses</p><p className="tier-includes">Includes all Platinum Courses</p><p className="tier-includes">Includes all Diamond Courses</p></div>{eliteCourses.map((course,courseIndex)=><details className="catalog-course" key={course.title}><summary><span>{`COURSE ${courseIndex+1}`}</span><div><strong>{course.title}</strong><small>{course.modules.length} modules · {course.modules.length} planned</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{course.modules.map((title,moduleIndex)=><li key={title}><span>{`${courseIndex+1}.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>Planned</small></div></li>)}</ol></details>)}</div>;
}

export function AdminLogin() {
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
  async function submit(e){e.preventDefault(); setBusy(true); setError(""); const data=Object.fromEntries(new FormData(e.currentTarget)); const res=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); if(res.ok) router.refresh(); else {setError("Email or password is incorrect.");setBusy(false);}}
  return <main className="admin-login"><section><Brand/><p className="eyebrow">COURSE OPERATIONS</p><h1>Welcome back.</h1><p>Manage courses, learner progress and activity responses from one focused workspace.</p></section><form onSubmit={submit}><h2>Owner sign in</h2><label>Email address<input name="email" type="email" required autoComplete="username"/></label><label>Password<input name="password" type="password" required autoComplete="current-password"/></label><button className="primary" disabled={busy}>{busy?"Signing in…":"Sign in →"}</button>{error&&<p className="form-error">{error}</p>}<small>Private access for the Credit Pulse team.</small></form></main>;
}

export function AdminDashboard() {
  const [tab,setTab]=useState("Overview"); const [submissions,setSubmissions]=useState([]); const [query,setQuery]=useState(""); const router=useRouter();
  useEffect(()=>{
    requestAnimationFrame(()=>{try{const course11=JSON.parse(localStorage.getItem("cp-course-1-submissions"))||[];const course12=JSON.parse(localStorage.getItem("cp-course-1-2-submissions"))||[];const course13=JSON.parse(localStorage.getItem("cp-course-1-3-submissions"))||[];const course14=JSON.parse(localStorage.getItem("cp-course-1-4-submissions"))||[];const course15=JSON.parse(localStorage.getItem("cp-course-1-5-submissions"))||[];const course16=JSON.parse(localStorage.getItem("cp-course-1-6-submissions"))||[];const course17=JSON.parse(localStorage.getItem("cp-course-1-7-submissions"))||[];const course18=JSON.parse(localStorage.getItem("cp-course-1-8-submissions"))||[];const course19=JSON.parse(localStorage.getItem("cp-course-1-9-submissions"))||[];const course110=JSON.parse(localStorage.getItem("cp-course-1-10-submissions"))||[];const course21=JSON.parse(localStorage.getItem("cp-course-2-1-submissions"))||[];const course22=JSON.parse(localStorage.getItem("cp-course-2-2-submissions"))||[];const course23=JSON.parse(localStorage.getItem("cp-course-2-3-submissions"))||[];const course24=JSON.parse(localStorage.getItem("cp-course-2-4-submissions"))||[];const course25=JSON.parse(localStorage.getItem("cp-course-2-5-submissions"))||[];const course26=JSON.parse(localStorage.getItem("cp-course-2-6-submissions"))||[];const course27=JSON.parse(localStorage.getItem("cp-course-2-7-submissions"))||[];const course28=JSON.parse(localStorage.getItem("cp-course-2-8-submissions"))||[];const course29=JSON.parse(localStorage.getItem("cp-course-2-9-submissions"))||[];const course210=JSON.parse(localStorage.getItem("cp-course-2-10-submissions"))||[];const course211=JSON.parse(localStorage.getItem("cp-course-2-11-submissions"))||[];const course213=JSON.parse(localStorage.getItem("cp-course-2-13-submissions"))||[];const course214=JSON.parse(localStorage.getItem("cp-course-2-14-submissions"))||[];const course215=JSON.parse(localStorage.getItem("cp-course-2-15-submissions"))||[];const silver11=JSON.parse(localStorage.getItem("cp-silver-1-1-submissions"))||[];setSubmissions([...course11,...course12,...course13,...course14,...course15,...course16,...course17,...course18,...course19,...course110,...course21,...course22,...course23,...course24,...course25,...course26,...course27,...course28,...course29,...course210,...course211,...course213,...course214,...course215,...silver11].sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt)))}catch{}});
  },[]);
  const filtered=submissions.filter(s=>(s.name+s.email+s.lessonTitle).toLowerCase().includes(query.toLowerCase()));
  async function logout(){await fetch("/api/admin/logout",{method:"POST"});router.refresh()}
  function exportCsv(){const head=["Name","Email","Lesson","Response","Submitted at"];const rows=submissions.map(s=>[s.name,s.email,s.lessonTitle,s.response,s.submittedAt]);const csv=[head,...rows].map(r=>r.map(v=>`"${String(v||"").replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="credit-pulse-submissions.csv";a.click();}
  return <div className="admin-app"><aside className="admin-side"><Brand light/><nav>{["Overview","Courses","Submissions","Settings"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}</nav><button onClick={logout}>Sign out</button></aside><main className="admin-main"><header><div><p className="eyebrow">CREDIT PULSE ADMIN</p><h1>{tab}</h1></div><div className="admin-avatar">RO</div></header>
    {tab==="Overview"&&<><section className="stat-grid"><article><span>Published courses</span><b>25</b><small>Starter curriculum and Silver Advanced Credit 1.1 are active</small></article><article><span>Activity submissions</span><b>{submissions.length}</b><small>Saved in this prototype</small></article><article><span>Learners observed</span><b>{new Set(submissions.map(x=>x.email)).size}</b><small>Unique email addresses</small></article></section><section className="admin-panel"><div className="panel-title"><div><p className="eyebrow">SYSTEM READINESS</p><h2>What works now</h2></div></div><div className="readiness"><article><span>✓</span><div><b>Course and admin password gates</b><p>Protected with signed, server-issued cookies.</p></div></article><article><span>✓</span><div><b>Single-page course check-in</b><p>One activity records completion for the full course.</p></div></article><article className="pending"><span>2</span><div><b>Production database and email</b><p>Connect before real learners arrive.</p></div></article></div></section></>}
    {tab==="Courses"&&<section className="admin-catalog"><div className="catalog-intro"><div><p className="eyebrow">PROGRAM CATALOG</p><h2>Credit Pulse learning tiers</h2><p>Organize courses and modules by membership package.</p></div><span><b>6</b> tiers</span></div><div className="tier-list">{membershipTiers.map((tier,index)=><details className={`tier-package tier-${tier.toLowerCase()}`} open={index===0} key={tier}><summary><span className="tier-index">{String(index+1).padStart(2,"0")}</span><div><small>{tier.toUpperCase()} PACKAGE</small><strong>{tier}</strong></div><span className="tier-count active">{index===1||index===4?"3 courses":"2 courses"}</span><i aria-hidden="true">+</i></summary>{index===0?<div className="tier-content"><details className="catalog-course" open><summary><span>COURSE 1</span><div><strong>Credit Foundations</strong><small>10 modules · 10 published</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{creditFoundationModules.map((title,moduleIndex)=>{const published=moduleIndex<10;return <li className={published?"published":""} key={title}><span>{`1.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>{published?"Published":"Planned"}</small></div>{published&&<a href={publishedCourseRoutes[moduleIndex]} target="_blank" rel="noreferrer" aria-label={`Open ${title} learner view`}>Open ↗</a>}</li>})}</ol></details><details className="catalog-course" open><summary><span>COURSE 2</span><div><strong>Money Foundations</strong><small>15 modules · 14 published</small></div><i aria-hidden="true">+</i></summary><ol className="module-list">{moneyFoundationModules.map((title,moduleIndex)=>{const published=moduleIndex<11||moduleIndex>=12;return <li className={published?"published":""} key={title}><span>{`2.${moduleIndex+1}`}</span><div><strong>{title}</strong><small>{published?"Published":"Planned"}</small></div>{published&&<a href={publishedMoneyRoutes[moduleIndex]} target="_blank" rel="noreferrer" aria-label={`Open ${title} learner view`}>Open ↗</a>}</li>})}</ol></details></div>:index===1?<SilverCatalog/>:index===2?<GoldCatalog/>:index===3?<PlatinumCatalog/>:index===4?<DiamondCatalog/>:<EliteCatalog/>}</details>)}</div></section>}
    {tab==="Submissions"&&<section className="admin-panel"><div className="panel-title"><div><p className="eyebrow">LEARNER ACTIVITY</p><h2>Activity responses</h2></div><button className="secondary" onClick={exportCsv} disabled={!submissions.length}>Export CSV</button></div><input className="search" placeholder="Search name, email or lesson…" value={query} onChange={e=>setQuery(e.target.value)}/>{filtered.length?<div className="table-wrap"><table><thead><tr><th>Learner</th><th>Lesson</th><th>Response</th><th>Submitted</th></tr></thead><tbody>{filtered.map((s,i)=><tr key={`${s.submittedAt}-${i}`}><td><b>{s.name}</b><small>{s.email}</small></td><td>{String(s.lesson).padStart(2,"0")} · {s.lessonTitle}</td><td>{s.response}</td><td>{new Date(s.submittedAt).toLocaleDateString("en-CA")}</td></tr>)}</tbody></table></div>:<div className="empty"><b>No activity responses yet</b><p>Prototype responses from this browser will appear here.</p></div>}</section>}
    {tab==="Settings"&&<section className="admin-panel settings"><p className="eyebrow">LAUNCH CHECKLIST</p><h2>Production connections</h2><div><article><b>Course access</b><span className="status">Ready</span><p>Set the course password in Vercel environment variables.</p></article><article><b>Learner data</b><span className="status pending-tag">Connect</span><p>Add Supabase or Neon so submissions sync across devices.</p></article><article><b>Email notifications</b><span className="status pending-tag">Connect</span><p>Add Resend after the database so every activity can notify your team.</p></article></div></section>}
  </main></div>;
}
