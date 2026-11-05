This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Awards enquiries

The Awards registration tab is available at `/register?t=awards`. It submits to
`/api/awards`, validates the required fields and terms acceptance, and saves the
enquiry through the existing CMS lead integration. Set `NEXT_PUBLIC_CMS_PROJECT_ID`
and `NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT` as for the other registration forms.
Awards enquiries use the CMS's `OTHER` lead type; the selected industry, award
category, consent and submission time are retained in the lead message.

To enable Cloudflare Turnstile, set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the
server-only `TURNSTILE_SECRET_KEY` for the same widget, allow the website's hostname
in Cloudflare, then rebuild/restart. When configured, the server verifies the
single-use token before saving the lead. With neither key configured, the form
operates without a CAPTCHA. Configuring only one key rejects submissions.

Nominator country, state and city selections are independent of the nominee's
address. States and cities load from CountriesNow, as in the existing delegate
form. Changing a country clears its state and city; changing a state clears its
city. Other / Not listed supports places missing from the data or an unavailable
location service.

## Nomination thank-you flow

After a valid nomination is accepted, `POST /api/nominations` immediately returns
HTTP 202 and the browser replaces the form with `/nominate/thank-you`. This page is
prefetched while the form is open. Validation and connection failures leave the
details in the form for correction or retry.

CMS saving and the confirmation email run on the server using Next.js `after()`.
Each task runs independently, has an eight-second request timeout, and retries
once. The Resend confirmation uses a submission-specific idempotency key to avoid
duplicate emails when retrying. Failed background tasks log their submission
reference and task name without logging the submitted personal details.

Configure `NEXT_PUBLIC_CMS_PROJECT_ID`, `NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT`,
`RESEND_API_KEY` and `RESEND_FROM` in the Next.js server environment. The Resend
values are server-only and must never use a `NEXT_PUBLIC_` prefix. The local setup
reuses the email credentials already configured in the backend; configure these
same variables separately when deploying the frontend.

The route allows up to 60 seconds for background processing. The deployment must
support Next.js `after()` (the local Node.js server does). This is request-scoped
background processing, not a persisted queue across server restarts.
