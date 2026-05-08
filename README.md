# SalesCockpit

Sales Operating System for Experience Venues.

## Quick Start

```bash
# Local development (ES modules require HTTP)
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Architecture

```
salescockpit/
├── index.html              ← Shell (sidebar, header, splash, login)
├── SalesCockpit.html       ← Original monolith (reference)
├── PROJECT_COMMAND.md       ← Central command file
├── core/                   ← State, router, loader, i18n, utils
├── modules/                ← 11 independent modules
│   ├── builder/
│   ├── availability/
│   ├── callguidance/
│   ├── leads/
│   ├── tasks/
│   ├── workflow/
│   ├── resources/
│   ├── analytics/
│   ├── automation/
│   └── permissions/
├── engine/                 ← Decision engine, pricing, templates
├── data/                   ← Default JSON configs
└── styles/                 ← CSS files
```

## Module Contract

Every module exports:
```js
export const meta = { id: 'leads', label: { de: 'Leads', en: 'Leads' } };
export function mount(rootEl, ctx) { /* render UI */ }
export function unmount() { /* cleanup */ }
```

## Stack

- **Frontend**: Vanilla JS, ES Modules, no build step
- **Backend**: Supabase (EU Frankfurt)
- **Auth**: Magic link (Supabase Auth)
- **Hosting**: Cloudflare Pages (GitHub auto-deploy)
- **Payments**: Paddle (MoR)
- **Email**: Brevo (transactional)
