# Patriot Messaging

A React, TypeScript, and Vite single-page website based on the September 2026 design reference and approved PDF copy.

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

- `src/config/content.ts`: approved marketing copy and rates.
- `src/pages/HomePage.tsx`: page composition.
- `src/components/home`: phone preview and reference photography.
- `src/components/forms/QuoteForm.tsx`: quote form.
- `src/index.css`: responsive layout, colors, and typography.
- `docs/design/website-copy.txt`: extracted source PDF.

The PDF's detailed service tables provide the displayed voter-data, website, commercial, and interview rates. These are more specific than its introductory instruction to price only text and email. The longer PDF copy is retained, so section heights differ from the shorter screenshot. Long text-message guidance and setup/data explanations use accessible native disclosure controls.

## Assets

The supplied logo and original animated GIF are in `public/brand`. The GIF is omitted when reduced motion is requested. Barlow Condensed and Source Sans 3 are served locally from `public/fonts`.

Photography comes from the supplied screenshot, displayed through SVG photo windows in `ReferencePhoto.tsx`. The original 756 × 2079 reference is stored unchanged in `public/images/design-reference.png`; the rest of the page is real HTML and CSS. Higher-resolution original photographs can replace these windows when available. The building photo is the image shown in the reference, not independent verification of the business premises.

## Quote delivery

Quote requests are addressed to **dan@patriotmessaging.com**.

Without an email provider, submitting opens a populated draft in the visitor's email application. The page explicitly asks the visitor to send the draft and retains their answers; it does not claim delivery.

To enable direct submission, configure:

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=template_do0b6qd
VITE_EMAILJS_PUBLIC_KEY=
```

Use the dedicated Patriot Messaging template **`template_do0b6qd`** with **To Email** fixed to `dan@patriotmessaging.com`, **Reply-To** set to `{{reply_to}}`, empty **CC/BCC**, and auto-reply disabled. The [template settings and email content](docs/emailjs/README.md) are maintained for reference. This repository does not provision EmailJS templates; recipient settings are managed in the EmailJS dashboard.

The template receives `name`, `title`, `message`, `time`, `to_email`, `reply_to`, `email`, `submitted_at`, and `page_url`. `to_email` remains for compatibility, but the dedicated template must use the fixed address above rather than that variable. Existing legacy contact-template fields are preserved. Sending failures keep the visitor's answers and allow retrying. Never commit private credentials.

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

The EmailJS service and public key remain shared with `pia-counties`. This app uses its own `VITE_EMAILJS_TEMPLATE_ID=template_do0b6qd`. Preserve all other Amplify settings when updating the template ID and trigger a rebuild, because Vite embeds it in the browser bundle. Do not modify the shared support template or other sites' configuration. The service ID and public key are configured in the Amplify app environment and are not committed to Git.
