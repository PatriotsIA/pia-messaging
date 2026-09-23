# Patriot Messaging

A React, TypeScript, and Vite single-page website based on the September 2026 design reference and approved PDF copy.

## Project context

Before working on this site, run `tracker-context pia --project pia-messaging` for the PIA tracker's current commits, deployments, issues, and queued actions. The tracker lives at `~/Projects/PIA/pia-tracker`; the workstation's `project-trackers` skill documents its data and update rules. Never print or commit tracker credentials.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
npm run build
npm run preview
```

The build generates HTML for the landing page and legal pages, so the marketing copy is available before JavaScript loads. React handles navigation and forms in the browser.

## Page and copy

The landing page contains Hero, Services, Pricing, Creative & digital, How it works, About, and Get a quote, followed by the branded footer. Navigation uses section anchors. Old `/services`, `/messaging`, and `/contact` URLs display the landing page and navigate to the matching section. `/privacy` and `/terms` remain accessible.

The header and contact section show a clickable **866-756-1776**. The quote form supports multiple products through a checkbox dropdown and includes every selected product in both direct submissions and email drafts. Digital ads are **$30 per 1,000 impressions**; ringless voicemail is **$0.08 per voicemail under 30 seconds, plus a $150 setup fee**, per the September 22 update.

The header and contact section also show weekday hours of **7:30 am–7:30 pm Central** and the supplied weekend call note. Email broadcasting lists **$35,000 for the first full-database send**, **$20,000 to add a second send for the same campaign**, and **$50,000 for both waves booked together**. The first send includes the label “8M+ addresses, 6M+ verified voter emails.” Smaller universes cost **$0.01 per email**, plus a **one-time $0.01 per record data charge**. The hero headline reads “Reach voters where they are — on the phone in their pocket.”

- `src/config/content.ts`: approved marketing copy and rates.
- `src/pages/HomePage.tsx`: page composition.
- `src/components/home`: phone preview and reference photography.
- `src/components/forms/QuoteForm.tsx`: quote form.
- `src/index.css`: responsive layout, colors, and typography.
- `docs/design/website-copy.txt`: extracted source PDF.

The PDF's detailed service tables provide the displayed voter-data, website, commercial, and interview rates. These are more specific than its introductory instruction to price only text and email. The longer PDF copy is retained, so section heights differ from the shorter screenshot. Long text-message guidance and setup/data explanations use accessible native disclosure controls.

## Assets

The supplied logo and original animated GIF are in `public/brand`. The GIF is omitted when reduced motion is requested. Barlow Condensed and Source Sans 3 are served locally from `public/fonts`.

The hero, message writing, print materials, interview studio, and video production graphics use the supplied standalone artwork, compressed as full-resolution WebP files in `public/images`. The hero loads with high priority; the service graphics load lazily. `ReferencePhoto.tsx` also serves local images for the candidate website, Amarillo office, and Patriot Recording Studio. The About section's studio photo uses the latest September 23 supplied JPEG at its original 1200 × 900 resolution, with its full 4:3 composition preserved.

## Quote delivery

Direct quote submissions use the dedicated EmailJS template with **To Email** fixed to **erik@patriotsinaction.com** and **CC** fixed to **dan@patriotsinaction.com**, as documented in the [template settings](docs/emailjs/README.md). Public contact links and the email-draft fallback continue to use **dan@patriotmessaging.com**.

Without an email provider, submitting opens a populated draft in the visitor's email application. The page explicitly asks the visitor to send the draft and retains their answers; it does not claim delivery.

To enable direct submission, configure:

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=template_do0b6qd
VITE_EMAILJS_PUBLIC_KEY=
```

Use the dedicated Patriot Messaging template **`template_do0b6qd`** with **To Email** fixed to `erik@patriotsinaction.com`, **CC** fixed to `dan@patriotsinaction.com`, **Reply-To** set to `{{reply_to}}`, empty **BCC**, and auto-reply disabled. The [template settings and email content](docs/emailjs/README.md) are maintained for reference. This repository does not provision EmailJS templates; recipient settings are managed in the EmailJS dashboard.

The service ID, template ID, and public key must belong to the same EmailJS account. A template from a different account is rejected with `The template ID not found`, even when its ID is correct. Use the Patriot Messaging account settings in the local `.env` and Amplify environment.

The template receives `name`, `title`, `message`, `time`, `to_email`, `reply_to`, `email`, `submitted_at`, and `page_url`. `to_email` remains for compatibility, but the dedicated template must use the fixed recipients above rather than that variable. Existing legacy contact-template fields are preserved. Sending failures keep the visitor's answers and allow retrying. Never commit private credentials.

`VITE_SITE_URL` controls canonical URLs; the default is `https://patriotmessaging.com`.

## Verification

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

To use an installed Chromium binary:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

Browser tests cover production hydration, static HTML, five viewport widths, anchor navigation, mobile menu behavior, legacy links, pricing disclosures, quote validation, email-draft fallback, mocked delivery success/failure/retry, reduced motion, and legal pages. Email provider requests are intercepted; tests do not send messages. They start a production preview on port 5180, a development server with dummy EmailJS settings on port 5181, and an explicitly unconfigured fallback server on port 5182.

## Deployment

Pushes to `PatriotsIA/pia-messaging` on `main` deploy through the existing AWS Amplify app **pia-messaging** (`d14v9wv3biszlc`, `us-east-2`). `amplify.yml` pins Node 22, builds the pre-rendered site, and publishes `dist`. The current hosting URL is `https://main.d14v9wv3biszlc.amplifyapp.com`.

This app uses the Patriot Messaging EmailJS account's service and public key with `VITE_EMAILJS_TEMPLATE_ID=template_do0b6qd`. Update all three EmailJS settings together when changing accounts, preserve unrelated Amplify settings, and trigger a rebuild because Vite embeds them in the browser bundle. Do not modify the shared support template or other sites' configuration. The service ID and public key are configured in the Amplify app environment and are not committed to Git.
