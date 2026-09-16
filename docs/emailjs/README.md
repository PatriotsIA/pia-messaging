# Dedicated Patriot Messaging contact template

The project uses the dedicated EmailJS template **`template_do0b6qd`**, created in
the dashboard by the site owner on September 16, 2026. The checked-in HTML is a
reference body; it does not create or update an EmailJS account resource.

Manage the template at https://dashboard.emailjs.com/admin/templates using these
settings:

| Setting | Value |
| --- | --- |
| Template name | Patriot Messaging contact |
| Template ID | `template_do0b6qd` |
| To Email | `dan@patriotmessaging.com` (literal address) |
| From Name | Patriot Messaging website |
| From Email | Use the email service's default address |
| Reply-To | `{{reply_to}}` |
| Subject | `Patriot Messaging: {{title}}` |
| CC / BCC | Empty |
| Auto-reply | Disabled |
| Content | Paste `patriot-messaging-contact.html` into the HTML/code editor, or use `{{message}}` as a plain-text body |

The recipient must be fixed in the dashboard. Do not use `{{to_email}}` in this
template. The browser's legacy `to_email` parameter cannot override a fixed
template recipient. Do not modify the shared support template used by other
sites.

After the template is saved, copy its actual template ID into
`VITE_EMAILJS_TEMPLATE_ID` in this project's local `.env` and the **pia-messaging**
Amplify app (`d14v9wv3biszlc`, `us-east-2`). Preserve the service ID, public key,
site URL, and all other application settings. Rebuild and deploy `main`, because
Vite embeds these values in the browser bundle at build time.

Verify the deployed form uses the new template ID and retains the visitor's email
as `reply_to`. A successful EmailJS API response confirms acceptance of a request,
not its destination mailbox or inbox delivery. Verify the template's recipient in
the dashboard or its delivery history and confirm receipt with Dan. Send a live
test only when explicitly authorized.

Reference: [EmailJS template setup](https://www.emailjs.com/docs/tutorial/creating-email-template/).
