"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "./Brand";

const creditFoundationCourseNumbers = {
  "course-1": "1.1",
  "course-1-2": "1.2",
  "course-1-3": "1.3",
  "course-1-4": "1.4",
  "course-1-5": "1.5",
  "course-1-6": "1.6",
  "course-1-7": "1.7",
  "course-1-8": "1.8",
  "course-1-9": "1.9",
  "course-1-10": "1.10",
};

const moneyFoundationCourseNumbers = {
  "course-2-1": "2.1",
  "course-2-2": "2.2",
  "course-2-3": "2.3",
  "course-2-4": "2.4",
  "course-2-5": "2.5",
  "course-2-6": "2.6",
  "course-2-7": "2.7",
  "course-2-8": "2.8",
  "course-2-9": "2.9",
  "course-2-10": "2.10",
  "course-2-11": "2.11",
  "course-2-12": "2.12",
  "course-2-13": "2.13",
  "course-2-14": "2.14",
  "course-2-15": "2.15",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.8v5.5c0 4.3 2.8 8.1 6.5 9.7 3.7-1.6 6.5-5.4 6.5-9.7V5.8L12 3Z" />
      <path d="m9.3 12 1.8 1.8 3.8-4" />
    </svg>
  );
}

export function PasswordGate({ course }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const creditFoundationCourseNumber = creditFoundationCourseNumbers[course.id];
  const moneyFoundationCourseNumber = moneyFoundationCourseNumbers[course.id];
  const courseNumber = creditFoundationCourseNumber ?? moneyFoundationCourseNumber;
  const courseCollection = creditFoundationCourseNumber
    ? "CREDIT FOUNDATIONS"
    : moneyFoundationCourseNumber
      ? "MONEY FOUNDATIONS"
      : "YOUR COURSE";

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/course-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, courseId: course.id }),
    });

    if (response.ok) {
      router.refresh();
      return;
    }

    setError("That password didn’t work. Check your course email and try again.");
    setBusy(false);
  }

  return (
    <main className="gate-shell">
      <div className="gate-orb gate-orb-one" aria-hidden="true" />
      <div className="gate-orb gate-orb-two" aria-hidden="true" />

      <section className="gate-copy" aria-labelledby="gate-heading">
        <header className="gate-header">
          <Brand light />
          <span className="gate-badge"><i /> Private access</span>
        </header>

        <div className="gate-copy-inner">
          <h1 id="gate-heading">Build credit<br />with <span>clarity.</span></h1>
          <p className="gate-lead">Focused, practical learning designed to help you understand your credit—and feel confident about what comes next.</p>

          <article className="gate-preview">
            <div className="course-number">
              <small>COURSE</small>
              <strong>{courseNumber ?? "01"}</strong>
            </div>
            <div className="course-summary">
              <small>{courseCollection}</small>
              <strong>{course.title}</strong>
              <div className="course-meta">
                <span><i className="meta-play">▶</i>One continuous course</span>
                <span><i className="meta-clock" />{course.duration}</span>
              </div>
            </div>
            <span className="preview-arrow"><ArrowIcon /></span>
          </article>
        </div>

        <footer className="gate-foot">
          <span>Credit education, made clear.</span>
          <span>© {new Date().getFullYear()} Credit Pulse</span>
        </footer>
      </section>

      <section className="gate-form-side" aria-label="Course sign in">
        <div className="gate-card">
          <div className="card-accent" aria-hidden="true" />
          <div className="lock-icon"><ShieldIcon /></div>
          <h2>Welcome back.</h2>
          <p>Enter the password from your course email to continue your learning journey.</p>

          <form onSubmit={submit}>
            <label htmlFor="course-password">Course password</label>
            <div className="password-field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              <input
                id="course-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="primary gate-submit" disabled={busy}>
              <span>{busy ? "Checking…" : "Access your course"}</span>
              {!busy && <ArrowIcon />}
            </button>
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>

          <div className="privacy-note">
            <ShieldIcon />
            <p><strong>Your access is secure</strong><span>Only learners with a valid course password can enter.</span></p>
          </div>
          <p className="gate-support">Having trouble? <a href="mailto:support@creditpulse.ca">Contact support</a></p>
        </div>
      </section>
    </main>
  );
}
