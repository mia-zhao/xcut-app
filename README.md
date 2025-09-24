# XCut – Website & Legal

This repository contains the XCut marketing site and legal pages, built with Next.js and localized with next‑intl. It includes a feedback form, light/dark/system theming, and deployment to Cloudflare Pages.

## Tech Stack

- Next.js App Router (React 19)
- next‑intl for i18n
- Tailwind CSS v4
- shadcn/ui + Radix UI primitives
- Lucide icons
- Deployed on Cloudflare Pages via Wrangler/GitHub Actions

## Requirements

- Node.js 20+ (LTS recommended)
- pnpm (preferred)
- Cloudflare account (for Pages deployments)

## Getting Started

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to view the app.

### Project Structure

- `app/` – Next.js app routes (App Router)
  - `[locale]/` – localized routes
- `components/` – UI and layout components
- `i18n/` – next‑intl configuration
- `messages/` – default locale messages (JSON)
- `content/legal/` – MDX legal documents
- `public/` – static assets

## Environment Variables

Create a `.env.local` (or use your platform’s env vars):

```
NEXT_PUBLIC_BASE_URL=https://xcut.app
CLOUDFLARE_PROJECT_NAME=<your-pages-project>
```

## Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server locally
pnpm test       # Run unit tests (Jest + Testing Library)
pnpm lint       # Run linters (if configured)
```

## i18n

- Default locale: `en` (see `i18n/config.ts`)
- Messages stored in `messages/en.json`
- Use `useTranslations()` for localized strings

## UI & Theming

- Theming via `next-themes` with a toggle group (system/light/dark)
- Components from shadcn/ui and Radix UI
- Tailwind CSS utilities in `app/globals.css`

## Feedback Form & Privacy

- Feedback form posts to a Google Forms endpoint.
- Errors are handled gracefully with a localized dialog.
- Email field is required for follow‑up communications.
- See `content/legal/en/privacy-policy.mdx` and `content/legal/en/terms-of-service.mdx` for data practices and terms.

## Deployment (Cloudflare Pages)

Build locally:

```bash
pnpm build
```

Deploy with Wrangler (Pages):

```bash
pnpm deploy
```

GitHub Actions: configure `.github/workflows/deploy.yml` and set repository secrets/variables:

```
# Secrets
CLOUDFLARE_API_TOKEN=***
CLOUDFLARE_ACCOUNT_ID=***

# Variables
CLOUDFLARE_PROJECT_NAME=xcut-app
NEXT_PUBLIC_BASE_URL=https://xcut.app
```

## Contributing

Pull requests welcome! Please open an issue for significant changes.

## License

MIT – see [LICENSE](LICENSE).
