# Patriot Messaging (React + Vite)

Patriot Messaging is a React + Vite + TypeScript site based on the `pfa-pac` methods, visual system, assets, EmailJS form helper, and EnSpot-style disclosure patterns.

## Local development

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Routes

- `/` Home
- `/messaging` Messaging and outreach intake
- `/services` Alias for messaging services
- `/contact`
- `/privacy`
- `/terms`
- `*` 404

## Environment variables

Create `.env.local` for local overrides. Do not commit secrets.

### Forms (EmailJS)

Contact and messaging forms send email through the same EmailJS browser integration used by `pfa-pac`. Use the same values from that deployment:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

The app sends `name`, `title`, `message`, and `time`, so it works with the same EmailJS template shape as `pfa-pac`.

### Site URL

- `VITE_SITE_URL`: canonical site URL used for canonical links, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

## Compliance notes

The contact and messaging forms keep the same consent pattern as `pfa-pac`: Privacy Policy and Terms links near the checkbox, consent confirmation before submission, and EnSpot-style SMS language when a mobile number is entered.

Final legal language, campaign classification, 10DLC registration details, and carrier approvals should be reviewed before launch.
