# Planetic Solutions Website

Dynamic, GitHub-ready Next.js website for **Planetic Solutions**: web hosting, domain registration, WHMCS client area, website development services, and the £200 complete website package.

## Tech Stack

- Next.js App Router
- React + TypeScript
- Central editable data files in `src/data`
- Reusable components in `src/components`
- API-ready contact form route at `src/app/api/contact/route.ts`
- SEO metadata, sitemap, robots, and JSON-LD structure

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Editable Content

Most website content is controlled from:

```text
src/data/site.ts          Brand, domain, WHMCS URL, navigation, footer links
src/data/pages.ts         Page titles, descriptions, hero text, SEO copy
src/data/plans.ts         Hosting plans and £200 website package
src/data/services.ts      Services, hosting features, domain items
src/data/faqs.ts          FAQs by section
src/data/testimonials.ts  Testimonials
src/data/blogPosts.ts     News/blog posts
```

Update those files to change plans, prices, FAQs, page copy, testimonials, or links without editing repeated page markup.

## WHMCS Integration

All hosting order, billing, support, invoice, domain management, and client area CTAs point to:

```text
https://planeticsolution.com/clientarea/
```

You can update this once in `src/data/site.ts`.

## Contact Form

The contact form posts to `/api/contact` by default. The included route validates submissions and can forward them to a webhook if `CONTACT_WEBHOOK_URL` is set.

Create a local `.env.local` file:

```bash
CONTACT_WEBHOOK_URL=https://your-secure-webhook.example/contact
```

Do not commit `.env.local` or real API keys to GitHub.

## Folder Structure

```text
.
+-- src
|   +-- app
|   |   +-- api/contact/route.ts
|   |   +-- about/page.tsx
|   |   +-- contact/page.tsx
|   |   +-- domain-registration/page.tsx
|   |   +-- news/page.tsx
|   |   +-- pricing/page.tsx
|   |   +-- web-hosting/page.tsx
|   |   +-- website-development/page.tsx
|   |   +-- globals.css
|   |   +-- layout.tsx
|   |   +-- page.tsx
|   |   +-- robots.ts
|   |   +-- sitemap.ts
|   +-- components
|   +-- data
|   +-- lib
+-- .env.example
+-- .gitignore
+-- next.config.mjs
+-- package.json
+-- tsconfig.json
```

## Deployment

For the cleanest GitHub-based workflow, push this project to GitHub and connect the repository to Vercel or a Node-enabled cPanel application. See `DEPLOYMENT.md` for the full GitHub deployment guide.

### Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Add environment variables if needed.
4. Deploy.

### cPanel With Node.js App Support

1. Push the project to GitHub.
2. In cPanel, create a Node.js application.
3. Set the app root to the cloned repository.
4. Set the startup command to:

```bash
npm run start
```

5. Run:

```bash
npm install
npm run build
```

6. Add any environment variables in cPanel.

### Traditional cPanel Without Node.js

This project is built for Next.js. For hosting accounts without Node.js support, deploy through Vercel/Netlify and point the domain DNS to that deployment, or ask for a PHP build of the same data-driven structure.

GitHub Pages is not recommended for this project because GitHub Pages cannot run the dynamic Next.js server or `/api/contact`.

## GitHub Workflow

```bash
git init
git add .
git commit -m "Build Planetic Solutions website"
git branch -M main
git remote add origin git@github.com:YOUR_ACCOUNT/planetic-solutions-website.git
git push -u origin main
```
