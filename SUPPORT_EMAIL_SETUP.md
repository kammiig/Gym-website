# Support Email Setup

The support portal sends login codes and ticket emails through an email provider. Resend is recommended for production. Gmail SMTP remains available as a fallback, but Gmail may reject SMTP from hosting platforms.

## Recommended: Resend

Set these environment variables:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM="Planetic Solutions Support <support@planeticsolution.com>"
SUPPORT_EMAIL=kammiig@gmail.com
SUPPORT_AUTH_SECRET=replace-with-a-long-random-secret
```

Important details:

- `RESEND_FROM` must use a verified Resend sending domain.
- If you do not verify `planeticsolution.com`, use a Resend-verified sender address.
- Redeploy or restart the app after changing environment variables.

## Gmail SMTP Fallback

If you see:

```text
Gmail rejected the SMTP login
```

then Gmail rejected the SMTP username/password. This is almost always caused by using the normal Gmail password instead of a Google App Password, or by deploying without the correct environment variables.

## Required Gmail Steps

1. Login to the Gmail account used for support:

```text
kammiig@gmail.com
```

2. Enable 2-Step Verification on that Google account.
3. Create a Google App Password for mail.
4. Copy the 16-character app password.
5. Use that app password as `SMTP_PASS`.

Do not use your normal Gmail password.

## Required Environment Variables

Set these in Vercel, cPanel, or your server environment:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=kammiig@gmail.com
SMTP_PASS=your_16_character_google_app_password
SMTP_FROM="Planetic Solutions Support <kammiig@gmail.com>"
SUPPORT_EMAIL=kammiig@gmail.com
SUPPORT_AUTH_SECRET=replace-with-a-long-random-secret
```

Important details:

- `SMTP_USER` must be the same Gmail account that created the App Password.
- `SMTP_FROM` should use the same Gmail account unless you have configured a verified Gmail alias.
- Remove spaces from the App Password if Google shows it in groups.
- After changing environment variables, redeploy the app or restart the Node.js app.

## Vercel

1. Open the Vercel project.
2. Go to **Settings > Environment Variables**.
3. Add the variables above for **Production**.
4. Redeploy the latest deployment.

## cPanel Node.js

1. Open **Setup Node.js App**.
2. Add the variables above under environment variables.
3. Save.
4. Restart the Node.js application.

## If Gmail Still Rejects Login

Use Resend instead of Gmail SMTP. Gmail can block SMTP sending from some hosting environments even with the right password.
