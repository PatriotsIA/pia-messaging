# Redesign verification

- `npm run lint`: passed.
- `npm run build`: passed; landing and legal HTML pre-rendered.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e`: 22 passed.
- Browser review: no page errors; no horizontal overflow.
- Legal pages use a fixed revision date; a future browser clock is tested to prevent server/client date mismatches.
- Responsive checks: 320, 390, 768, 960, 1050, 1280, and 1920 pixels.
- Quote tests intercept EmailJS requests, including success, failure, and retry. No email was sent.
- Final screenshots: `coverage/design/desktop.png`, `mobile.png`, `mobile-top.png`, `mobile-first-visit.png`, `creative.png`, and `footer.png` (local review artifacts, ignored by Git).

The site uses all supplied marketing copy. The longer copy and the full supplied logo change some section heights relative to the compact image reference. The hero, writing, print, interview, and video graphics use the standalone artwork supplied on September 17, 2026, compressed to WebP at its original dimensions. Candidate website and Amarillo building photography still use the supplied screenshot.

The September 17 image refresh passed lint, the production build, and all 19 browser tests. Desktop (1440px) and mobile (390px) review confirmed that all five new images load, with no page errors or horizontal overflow. Image-review screenshots are in `coverage/image-refresh/` (ignored by Git).

The project uses the Patriot Messaging EmailJS account and its dedicated template. The September 21 recipient settings are documented in [the template reference](../emailjs/README.md): To `erik@patriotsinaction.com` and CC `dan@patriotsinaction.com`. The browser still supplies the legacy `to_email` value `dan@patriotmessaging.com`; it does not override fixed dashboard recipients. Public contact links and the draft fallback retain that public address. The direct-send flow, errors, retries, and fallback are covered with intercepted requests; browser tests do not verify inbox delivery and no test email was sent.

## September 21 preservation review (PIA-028)

- Saved a protected archive and SHA-256 manifest of all 10 existing modified or untracked artwork files before making changes; archive contents verified against the manifest.
- Preserved all three existing application edits and all five WebP files byte for byte. Only README and verification prose were amended during the preservation review to match the committed September 21 email-template documentation and record these checks.
- Node 22.23.2: lint, production build, and all 19 existing Playwright checks passed. The build used dummy EmailJS settings, and browser tests intercepted provider requests.
- Fresh hero, services, and creative-section screenshots at 1440 and 390 pixels are in `coverage/image-refresh/{desktop,mobile}-{hero,services,creative}.png`; the image-load report is `coverage/image-refresh/review.json`. All five WebPs loaded, with no page errors or horizontal overflow.
- The modified text files were checked for private credentials; no credential patterns were found. Environment files, dependencies, generated bundles, and local review artifacts are excluded from the commit.
- Amplify readback showed only the production `main` branch, with automatic branch creation and pull-request previews disabled. The artwork is preserved on `review/pia-028-artwork-preservation`; merging into `main` triggers the existing Amplify deployment. No deployment or provider email was sent during this review.

## September 22 contact and pricing update

- Added `866-756-1776` as a `tel:+18667561776` link in the desktop/mobile header and contact section.
- Replaced the single-product select with a checkbox dropdown. Verified multiple selections and deselection, keyboard operation and Escape dismissal, every selected product in both the EmailJS payload and email draft, retained selections after a failed send, and reset only after successful submission.
- Digital ads display $30 per 1,000 impressions. Ringless voicemail displays $0.08 per voicemail under 30 seconds, plus a $150 setup fee.
- Lint, production build, and all 22 browser checks passed. EmailJS requests were intercepted; these checks do not send messages or verify inbox receipt.
- Header and open-dropdown screenshots at 320, 390, 768, and 1280 pixels are in `coverage/contact-pricing/` (ignored by Git). No horizontal overflow or browser page errors were found.
- Read `tracker-context pia --project pia-messaging` before editing and added the PIA tracker workflow to the README for future work.

## September 22 hours, headline, and email package update

- Added the supplied weekday hours and weekend call note near the header phone number and in the contact section. Increased anchor-scroll offsets for the taller header.
- Changed the hero heading to “Reach voters where they are — on the phone in their pocket.”
- Kept the first full-database email send at $35,000, changed two full waves to $50,000, and removed the separate second-send row.
- Lint, production build, and all 22 browser checks passed. Header and email-card screenshots at 320, 390, 768, and 1280 pixels are in `coverage/about-update/`; there was no horizontal overflow or runtime error.
- The existing About copy and links are unchanged in this release. The requested expanded campaign history and the proposed email-result statement are not included.

## September 23 email pricing update

- Replaced the email table rows with the supplied options: first full-database send at $35,000, an additional send for the same campaign at $20,000, and both waves booked together at $50,000.
- Added the supplied Court of Criminal Appeals sentence beneath the first-send label. The newer About copy and artwork are preserved.
- Lint, production build, and all 22 existing browser checks passed. Provider requests were intercepted during tests.
- Browser review confirmed all three rows and prices at 320 and 1280 pixels, with no horizontal overflow or runtime errors. Review screenshots are in `coverage/email-pricing/` (ignored by Git).

## September 23 final pricing and punctuation update

- Restored Smaller universe at $0.01 per email, with the one-time $0.01 per record data charge beneath the label.
- Added “6 million + Verified Voter Emails” beneath the first full-database send label, retaining its supplied explanatory sentence.
- Added spaces around the em dash before “so the people writing” in the About paragraph.
- Lint, production build, and all 22 existing browser checks passed. Review at 320 and 1280 pixels confirmed the four pricing rows and dash spacing, without horizontal overflow or runtime errors. Updated screenshots are in `coverage/email-pricing/` (ignored by Git).

## September 23 studio photograph update

- Replaced the About section's studio image with the newly supplied photograph. The 1600 × 1200 WebP preserves the full 4:3 composition and uses a new asset URL so returning visitors receive the replacement.
- Updated the intrinsic dimensions, display aspect ratio, and description of the bison sculpture. The caption remains “Patriot Recording Studio.”
- Lint, production build, and all eight existing image-loading and responsive-layout checks passed.
- Browser review at 390 and 1280 pixels confirmed the new image loads, matches the local asset's SHA-256 hash, and preserves its aspect ratio, with no horizontal overflow or runtime errors. Screenshots are in `coverage/studio-update/` (ignored by Git).
