# Deploying From GitHub

GitHub should be used as the source repository for this project. Because this is a dynamic Next.js website with an API-ready contact route, do not use GitHub Pages as the primary production host. GitHub Pages is static hosting and will not run the Next.js server or `/api/contact`.

## Recommended: GitHub to Vercel

1. Create a new GitHub repository.
2. Push this project to the repository:

```bash
git init
git add .
git commit -m "Build Planetic Solutions website"
git branch -M main
git remote add origin git@github.com:YOUR_ACCOUNT/planetic-solutions-website.git
git push -u origin main
```

3. Go to Vercel and choose **Add New Project**.
4. Import the GitHub repository.
5. Keep the framework as **Next.js**.
6. Add environment variables if needed:

```bash
CONTACT_WEBHOOK_URL=
NEXT_PUBLIC_CONTACT_ENDPOINT=
RESEND_API_KEY=your_resend_api_key
RESEND_FROM="Planetic Solutions Support <support@planeticsolution.com>"
SUPPORT_EMAIL=kammiig@gmail.com
SUPPORT_AUTH_SECRET=replace-with-a-long-random-secret
```

Optional Gmail SMTP fallback:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=kammiig@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Planetic Solutions Support <kammiig@gmail.com>"
```

7. Deploy.

Resend is recommended for production email. If you use Gmail support tickets, use a Google App Password for `SMTP_PASS`. Do not put your normal Gmail password in GitHub.

Every push to the GitHub `main` branch can automatically trigger a new deployment.

## GitHub to cPanel With Node.js

Use this option only if the hosting account supports Node.js applications.

1. Push the repository to GitHub.
2. In cPanel, open **Git Version Control** and clone the repository.
3. In cPanel, open **Setup Node.js App**.
4. Set the application root to the cloned project folder.
5. Set the startup command:

```bash
npm run start
```

6. In the cPanel terminal, run:

```bash
npm install
npm run build
```

7. Start or restart the Node.js application.

## GitHub Actions

This repository includes `.github/workflows/ci.yml`. On every push or pull request to `main`, GitHub Actions will:

- Install dependencies
- Run TypeScript checks
- Build the Next.js project

If the GitHub Action passes, the project is ready for deployment through Vercel or a Node-enabled hosting server.
