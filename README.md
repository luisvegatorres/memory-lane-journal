# Memory Lane

A Next.js static journal about web architecture, technology stacks, and deployment. Includes three posts, a searchable archive with topic filters, individual article pages, an About page, and a custom 404 page.

## Develop

Use Node.js 22 or 24 LTS.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run build
npm run typecheck
```

The static site is generated in `out/`. Deploy that directory on a static host, or import the repository into Vercel using the Next.js preset. No environment variables or database are required. Google Fonts are optional presentation enhancements; local serif and sans-serif fallbacks are provided.

## Project structure

- `app/` — pages, article template, and styles
- `components/` — journal filters and CSS illustrations
- `lib/posts.ts` — article content and metadata
