# Credit Pulse Course Delivery

A portable Next.js prototype for sending a learner one password-protected link to one course. It includes:

- a server-validated Course 1 password gate;
- one continuous, readable Course 1 experience;
- sticky section navigation and reading progress;
- one end-of-course knowledge check;
- a private admin sign-in and dashboard;
- CSV export for prototype submissions;
- responsive and print-friendly layouts.

## Run in VS Code

1. Install Node.js 22.13 or newer.
2. Duplicate `.env.example` as `.env.local`.
3. Replace the example passwords and session secret.
4. Run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The learner course is the default route. The admin area is at `/admin`.

Without environment variables, local preview credentials are:

- Course password: `creditpulse`
- Admin email: `owner@creditpulse.ca`
- Admin password: `adminpulse`

Never use those defaults after deployment.

## GitHub and Vercel

Push this folder to a private GitHub repository, import the repository into Vercel, then add every required value from `.env.example` under Vercel Project Settings → Environment Variables. Vercel will detect Next.js and deploy it normally.

## Important prototype boundary

This version stores lesson progress and activity submissions in the learner's browser so the full journey can be tested immediately. That means the admin dashboard can only see prototype responses created in the same browser.

Before inviting real learners, connect a production database (Supabase or Neon are sensible options) and an email provider such as Resend. The intended production submission flow is:

1. validate the activity on the server;
2. save it to the database;
3. show it in the admin dashboard;
4. send the admin notification email;
5. mark the lesson complete and unlock the next lesson.

Do not collect SINs, account numbers, passwords, or other sensitive financial information in course activities.
