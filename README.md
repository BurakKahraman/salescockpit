# SalesCockpit — Modular SaaS for VR Venues

SalesCockpit is a high-performance, multi-tenant sales automation platform designed specifically for Virtual Reality Parks and Event Venues.

## 🏗️ Architecture
- **Core**: Vanilla JavaScript (ES Modules) for zero-dependency speed.
- **Backend**: Supabase (PostgreSQL, Auth, RLS) hosted in **EU-Frankfurt** (GDPR compliant).
- **Styling**: Modern Vanilla CSS with a focus on responsiveness and premium aesthetics.
- **Modularity**: Plug-and-play module system using a standardized `mount/unmount` contract.

## 🔑 Key Features
- **Smart Offer Builder**: Dynamic template generation with real-time pricing.
- **Multi-Tenancy**: Data isolation via Row Level Security (RLS). Each venue sees only its data.
- **Calendar Sync**: Live integration with Google/Outlook for availability checking.
- **Finance Export**: DATEV/sevDesk compatible CSV exports for accounting.
- **Bulk Migration**: Tools for importing leads from Google Sheets/CSV.

## 🗺️ Roadmap & Scale
- [x] Phase 0-5: Core Modular SaaS & Supabase Integration
- [x] Phase 7: Varpoint Go-Live (Borsigturm Berlin)
- [x] Phase 6: Compliance & Telegram Automation
- [x] Phase 8: Onboarding & GTM Readiness
- [ ] Phase 9: Scale — Onboarding 25+ venues in Berlin area.
- [ ] Grants: Preparing **EXIST** & **Berlin Startup Stipendium** applications.

## 🛠️ Development
1. Clone repo
2. Run a local server (e.g., `npx serve .`)
3. Access `index.html`
