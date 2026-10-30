# Hjörtur Ingvi

Next.js site for Hjörtur Jóhannsson. Sanity is the CMS. Studio is embedded at `/studio`.

The previous Gatsby site stays on `master` as the design reference.

## Run

```bash
npm install
npm run dev
```

Without Sanity environment variables the pages still build. Lists and text fall back to empty states, and the layout keeps the previous portraits, player title and social links until a dataset is connected.

## Environment

Copy `.env.example` to `.env.local`. Leave the values empty until the Sanity project exists. Do not commit filled-in values.

`SANITY_API_READ_TOKEN` is unused. Public reads go through the CDN.

## Migration

Only Jón or DevOps runs this, after the Sanity project exists. Do not point it at a dataset from the app build.

```bash
npm run migrate:dry-run
```

`--dry-run` reads the markdown from `master` (or `--source <checkout>`) and prints what it would write. It does not upload anything. A real run, without `--dry-run`, needs `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_MIGRATION_WRITE_TOKEN`.

The script is idempotent: documents use stable ids and assets are reused by sha1. Icelandic slugs are kept and NFC-normalised.

## Content updates

Public pages are static and revalidate hourly. One Sanity GROQ webhook, `POST` to `/api/revalidate` on the site host, refreshes them sooner.

- Filter: `_type in ["about","news","concert","contact","project","siteLinks","cv"]`
- Projection: `{_id,_type}`
- Secret: `SANITY_REVALIDATE_SECRET` (the webhook signature secret)
- The site host is whichever host serves the deployment. It is not hardcoded here.

Reads use `useCdn: true`. There is no live content subscription and no browser query outside `/studio`.

## Licensing

`app/fonts` holds the faces the previous site already used. The font license PDF and the unreferenced Chopin recording are not part of this app. See the pull request notes.
