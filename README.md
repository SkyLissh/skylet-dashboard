# SkyLet Dashboard 🌐

The **SvelteKit** web-app companion to my SkyLet Discord bot — a dashboard for managing Twitch integration, alerts, and live settings. Server-driven auth, typed data, and a full UI kit.

> **Stack:** SvelteKit · Svelte 5 · better-auth · drizzle-orm + libsql/Turso · TanStack Svelte Query · sveltekit-superforms + valibot · inlang/paraglide i18n · bits-ui · Tailwind v4

## Why this project

I built this to prove I can ship a *real* authenticated web app with clean server-side data access — not a frontend that fakes the backend. It has OAuth-backed auth, a real database with a schema and migrations, typed form validation, i18n, and a set of reusable accessible components.

## Highlights

- **SvelteKit (Svelte 5, runes)** — the modern Svelte reactivity model, with form actions and server load.
- **better-auth** — real auth (OAuth/session) wired into SvelteKit hooks; helpers like `src/lib/auth.ts` and `hooks.server.ts`.
- **drizzle-orm + libsql/Turso** — a typed schema, typed queries, and a server-side database. `@libsql/client` for the driver.
- **TanStack Svelte Query** — server-state with caching and devtools; the dashboard fetches live data reactively.
- **sveltekit-superforms + valibot** — schema-driven, type-safe forms (Twitch alert config, channel setup). Types and validation stay in sync.
- **inlang/paraglide-js** — compile-time i18n (English + Spanish).
- **bits-ui + Tailwind v4** — a full accessible UI kit (`button`, `card`, `collapsible`, `command`, `dialog`, `select`, `tabs`, etc.), `@fontsource/poppins` for typography.
- **Domain features** — Twitch alert forms, channel combinators, service deletion, a features menu, and a command-palette-style menu sheet.

## Architecture

```
src/
├── lib/
│   ├── auth.ts              # better-auth config
│   ├── components/          # feature + UI components
│   │   ├── ui/              #   bits-ui kit (button, card, command, dialog, select...)
│   │   └── *.svelte         #   twitch forms, channel combobox, menu sheet, language dropdown
│   ├── types/ (db schema)   # drizzle schema + server db
│   └── server/              # server load, form actions, db
├── hooks.server.ts          # auth middleware
├── hooks.ts                 # client hooks
└── app.html / app.css (Tailwind v4)
```

## Getting started

```bash
pnpm install
pnpm dev
```

Requires Node 20+. Set up a Turso/libSQL DB and auth env vars. Opens on the default Vite port.

## What it demonstrates

- Full-stack SvelteKit with server-side auth and a real DB
- Type-safe forms (superforms + valibot) and TanStack Query
- Compile-time i18n (paraglide)
- A complete, accessible bits-ui component kit on Tailwind v4
