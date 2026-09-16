# Redesign verification

- `npm run lint`: passed.
- `npm run build`: passed; landing and legal HTML pre-rendered.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e`: 19 passed.
- Browser review: no page errors; no horizontal overflow.
- Legal pages use a fixed revision date; a future browser clock is tested to prevent server/client date mismatches.
- Responsive checks: 320, 390, 768, 1280, and 1920 pixels.
- Quote tests intercept EmailJS requests, including success, failure, and retry. No email was sent.
- Final screenshots: `coverage/design/desktop.png`, `mobile.png`, `mobile-top.png`, `mobile-first-visit.png`, `creative.png`, and `footer.png` (local review artifacts, ignored by Git).

The site uses all supplied marketing copy. The longer copy and the full supplied logo change some section heights relative to the compact image reference. Reference photography is displayed from the supplied screenshot; original high-resolution photos can be substituted in `ReferencePhoto.tsx`.

The shared EmailJS browser settings from pia-counties are configured locally and in the existing Amplify app environment. The request supplies dan@patriotmessaging.com as the template recipient. The direct-send flow, errors, retries, and fallback are covered with intercepted requests; no test email was sent. The README documents template binding and deployment.
