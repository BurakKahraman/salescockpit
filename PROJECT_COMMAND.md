# PROJECT_COMMAND.md — SalesCockpit Merkezi Komuta Dosyası

---

## 1. HOW TO USE THIS FILE

Her AI ajanı (Antigravity, Claude Code, Gemini, vb.) bu dosyayı **oturuma başlarken ilk okur**.
- **NEXT ACTION**'ı al, yap, durumunu güncelle (⚪→🔵→🟡)
- Sonraki ⚪ görevi seç, NEXT ACTION'a yaz
- **CHANGELOG**'a satır ekle
- Burak'ın el ile güncellemesi de aynı protokole bağlı

**Tek kaynak prensibi**: Bu dosya projenin ana damarıdır. Tüm görev takibi buradan akar, buraya döner.

---

## 2. PROJECT STATUS

| Alan | Değer |
|------|-------|
| **Active phase** | PHASE 10 — SaaS Self-Service |
| **Current task** | 10.1 — Venue Admin Registration Page |
| **Last update** | 2026-05-09 06:27 · Antigravity (Gemini) |
| **Blockers** | Yeni kullanıcılara (tenant_id) atanmadığı için Supabase RLS (Row Level Security) insert işlemlerini (örn. CSV import) reddediyor. 10.1 tamamlanmadan veri yüklenemez. |

---

## 3. NEXT ACTION

| Alan | Değer |
|------|-------|
| **Görev ID** | 10.1 |
| **Başlık** | Venue Admin Registration Page |
| **Beklenen çıktı** | Self-service kayıt sayfası |
| **Başarı kriteri** | Yeni venue owner'ın e-mail + şifre ile kayıt olabilmesi |

---

## 4. PHASES

### PHASE 0-5: Core SaaS Migration ✅
- ✅ 0.1 Infrastructure setup
- ✅ 1.0 Supabase Foundation
- ✅ 2.0 Modular Frontend
- ✅ 3.0-5.0 Feature Migration

---

### PHASE 6: Compliance & Automation ✅
- ✅ 6.1 Legal Module (Compliance.js)
- ✅ 6.2 Telegram Notification Helper
- ✅ 6.3 Audit Logging

---

### PHASE 7: Go-Live (Varpoint) ✅
- ✅ 7.1 Template Migration
- ✅ 7.2 Pricing Migration
- ✅ 7.3 Lead Bulk Import Tool
- ✅ 7.4 Live Production Environment

---

### PHASE 8: GTM & Ürünleştirme ✅
- ✅ 8.1 Onboarding Wizard
- ✅ 8.2 Technical Roadmap Documentation
- ✅ 8.3 README SaaS Vision
- ✅ 8.4 Password Auth Migration (Replaced Magic Link)

---

### PHASE 9: Scale & Bugfix ✅
- ✅ 9.1 EXIST / Berlin Startup Stipendium applications
- ✅ 9.2 25 Berlin Venue Outreach (Landing Page Ready)
- ✅ 9.3 Multi-tenancy Proof (Isolation Confirmed)
- ✅ 9.4 **Critical Production Bugfix** — Modüler UI ayağa kaldırma (config.js multiline string, loader.js variable declaration, module path resolution, auth-blocking boot)

---

### PHASE 10: SaaS Self-Service (Active) 🔵
- ⚪ 10.1 Venue Admin Registration Page (Sign-Up Form)
- ⚪ 10.2 Automated Email Verification for New Venues
- ⚪ 10.3 Automatic Tenant Creation & Demo Data Seeding

---

## 5. DECISIONS LOG

| Tarih | Kim | Karar | Neden |
|-------|-----|-------|-------|
| 2026-05-09 | Burak + Antigravity | Supabase EU Frankfurt | DSGVO uyumu, veri Almanya'da kalmalı, region değiştirilemez |
| 2026-05-09 | Burak + Antigravity | Cloudflare Pages (Vercel yerine) | GitHub auto-deploy, Burak'ın tercihi |
| 2026-05-09 | Burak + Antigravity | Brevo (email servisi) | DSGVO uyumlu (Fransa), ücretsiz tier yeterli, Resend ABD verisi riski |
| 2026-05-09 | Burak + Antigravity | Fiyatlandırma ertelendi | Şimdilik opsiyonel, ileride pazar verisine göre netleşecek |
| 2026-05-09 | Burak + Antigravity | UG kuruluşu Phase 6-7 | Akışı bozmadan, ilk ödeyen müşteri öncesi |
| 2026-05-09 | Burak + Antigravity | EXIST + Berlin Startup Stipendium | İki grant birden, dilution yok, toplam ~€45K potansiyel |
| 2026-05-09 | Burak + Antigravity | Yaklaşım B: Supabase + paralel modülerleştirme | Hız önceliği, backend ve frontend paralel ilerlesin |
| 2026-05-09 | Burak + Antigravity | Paddle Çıkarıldı | Uygulama venue sahipleri ve sales rep'ler için olduğu için ödeme altyapısına gerek kalmadı |
| 2026-05-09 | Burak + Antigravity | Venue Settings Eklendi | Her tenant'ın kendi banka/takvim bilgilerini yönetmesi için merkezi modül kararlaştırıldı |
| 2026-05-09 | Burak + Antigravity | Telegram Önceliklendirildi | WhatsApp yerine Telegram bot altyapısı tercih edildi (düşük maliyet/yüksek hız) |
| 2026-05-09 | Burak + Claude Opus | Boot-first, Auth-later | Auth check artık uygulamayı bloke etmiyor, arka planda çalışıyor |

---

## 6. OPEN QUESTIONS

| # | Soru | Beklenen cevap kaynağı |
|---|------|----------------------|
| 1 | Domain (salescockpit.com vb.) alındı mı? | Burak |
| 2 | EXIST grant başvuru tarihi nedir? | Burak |
| 3 | Telegram bot token'ı hazır mı? | Burak |

---

## 7. BLOCKERS

| # | Engel | Çözüm yolu | Sorumlu |
|---|-------|-----------|---------| 
| 1 | RLS Policy engeli nedeniyle CSV Import yapılamıyor | Yeni kullanıcılara otomatik olarak bir tenant oluşturacak ve `profiles.tenant_id` değerini atayacak Supabase RPC (Remote Procedure Call) / Trigger (Phase 10.1 Venue Admin Registration) yazılmalı. | Antigravity |

---

## 8. BUGS FIXED (2026-05-09 Session)

| Bug | Kök Neden | Düzeltme |
|-----|-----------|----------|
| Sayfa açılıyor ama modüller yüklenmiyor | `data/config.js` multiline string'ler `'` ile yazılmış, JS SyntaxError | Python script ile tüm multiline string'ler backtick'e dönüştürüldü |
| Loader sessizce çöküyor | `core/loader.js`'de `activeModule` ve `currentModuleId` tanımsız | Değişken deklarasyonları eklendi |
| Modül dosyaları bulunamıyor | `import('./modules/x.js')` loader.js'nin konumuna göre çözümleniyor → `core/modules/x.js` | Mutlak path `/modules/x.js` kullanıldı |
| bootApp hiç çağrılmıyor | Supabase CDN/auth timeout yapınca `bootApp()` hiç tetiklenmiyor | Boot-first mimarisi: önce app başlıyor, auth arka planda |
| builder.js variable shadowing | `const templates = state.get('templates')` import edilen `templates` modülünü eziyor | `templateEngine` olarak yeniden adlandırıldı |
| View container'lar eksik | stats, settings, auto, call, wf, perm için `<div id="view-X">` yok | Tüm view container'lar eklendi |
| B2B/B2C ve DE/EN toggle yok | Header'da toggle butonları eksik | Toggle UI ve event handler'lar eklendi |

---

## 9. CHANGELOG

| Tarih | Kim | Görev | Yeni Statü |
|-------|-----|-------|-----------| 
| 2026-05-09 00:07 | Antigravity | PROJECT_COMMAND.md oluşturuldu | İlk versiyon |
| 2026-05-09 01:10 | Antigravity | Phase 3-4 Modül Migrasyonları | ⚪→🟡 |
| 2026-05-09 01:25 | Antigravity | Phase 5 Venue Settings | ⚪→🟡 |
| 2026-05-09 01:30 | Antigravity | Frontend Responsive Tasarım | ✅ |
| 2026-05-09 01:35 | Antigravity | Phase 7.1 & 7.2 Varpoint Data Migration | ⚪→🟡 |
| 2026-05-09 04:30 | Claude Opus | **9.4 Kritik Production Bugfix** — 7 bug düzeltildi, tüm modüller çalışır duruma getirildi | ✅ |
| 2026-05-09 06:10 | Gemini | DB Schema (tenants, leads) + Login Zorunluluğu Getirildi | ✅ |
| 2026-05-09 06:15 | Gemini | Global Search (Leads Araması) eklendi ve senkronize edildi | ✅ |
| 2026-05-09 06:25 | Gemini | data/leads.csv dosyası Supabase JSONB formatına uygun olarak temizlendi ve test edildi | ✅ |
| 2026-05-09 06:27 | Gemini | CSV Import Test Sonucu | 🔴 BLOCKED (Tenant Assignment Trigger Eksik) |
