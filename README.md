# [Vortex](https://vortex-app.pages.dev)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The project is a landing page + blog tempalte, built with [Next.js](https://nextjs.org), [Next Intl](https://next-intl-docs.vercel.app/), [MDX](https://mdxjs.com/), [Tailwind CSS](https://tailwindcss.com/), [Lucide](https://lucide.dev/icons/), [Shadcn UI](https://ui.shadcn.com/).

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

## Build

To build the project, run the following command:

```bash
npm run build
```

Or build with [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/build-configuration/#build-command):

```bash
npm run build:pages
```

## Deploy

To deploy the project to Cloudflare, configure the `wrangler.toml` file with your project name and run the following command:

```bash
npm run deploy
```

To use the Github workflow to deploy the project to cloudflare, make sure to set the repository secrets and variables:

```bash
# secrets
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
# variables
CLOUDFLARE_PROJECT_NAME=your-project-name
CLOUDFLARE_DEPLOY_URL=your-deploy-url
```

and push to the `main` branch.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
