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
| To Email | `erik@patriotsinaction.com` (literal address) |
| From Name | Patriot Messaging website |
| From Email | Use the email service's default address |
| Reply-To | `{{reply_to}}` |
| Subject | `Patriot Messaging: {{title}}` |
| CC | `dan@patriotsinaction.com` (literal address) |
| BCC | Empty |
| Auto-reply | Disabled |
| Content | Paste `patriot-messaging-contact.html` into the HTML/code editor, or use `{{message}}` as a plain-text body |

The recipient must be fixed in the dashboard. Do not use `{{to_email}}` in this
template. The browser's legacy `to_email` parameter cannot override a fixed
template recipient. On September 21, the owner authorized all PIA brand public
forms to reach both Erik and Dan and consolidated the other brands into this
account. This replaces the earlier delivery-only-to-Patriot-Messaging setting;
public contact links remain independent. The template subject is
`Patriot Messaging: {{title}}`, and the saved body also includes the source URL
and timestamp. Do not send verification email without separate authorization.

Configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
`VITE_EMAILJS_PUBLIC_KEY` from the same EmailJS account in this project's local
`.env` and the **pia-messaging** Amplify app (`d14v9wv3biszlc`, `us-east-2`). This
template belongs to the Patriot Messaging account, so it requires that account's
service and public key. Reusing the prior shared account's settings caused
EmailJS to reject the template with `The template ID not found`.

Preserve the site URL and all other application settings. Rebuild and deploy
`main`, because Vite embeds these values in the browser bundle at build time.

Verify the deployed form uses the new template ID and retains the visitor's email
as `reply_to`. A successful EmailJS API response confirms acceptance of a request,
not its destination mailbox or inbox delivery. Verify the template's recipient in
the dashboard or its delivery history and confirm receipt with Dan. Send a live
test only when explicitly authorized.

If a live send returns `Outlook: Invalid grant. Please reconnect your Outlook
account`, open this account's Email Services page, reconnect the Outlook account
on the configured service, and save it. This provider authorization problem must
be resolved in EmailJS; rebuilding the website does not restore the Outlook
connection.

Reference: [EmailJS template setup](https://www.emailjs.com/docs/tutorial/creating-email-template/).
