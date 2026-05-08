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

## 2. CURRENT STATUS

| Alan | Değer |
|------|-------|
| **Active phase** | PHASE 5 — Entegrasyonlar |
| **Current task** | 5.1 — Google Calendar sync |
| **Last update** | 2026-05-09 01:40 · Antigravity |
| **Blockers** | none |

---

## 3. NEXT ACTION

| Alan | Değer |
|------|-------|
| **Görev ID** | 5.1 |
| **Başlık** | Google Calendar sync |
| **Beklenen çıktı** | Takvimin dış servislerle çift yönlü senkronizasyonu |
| **Başarı kriteri** | Randevu alındığında Google Calendar'a event ekleniyor |

---

## 4. PHASES

### PHASE 0: Altyapı & Proje Kurulumu
- 🟡 0.1 Proje dizin yapısını oluştur (core/, modules/, engine/, data/, styles/) ✅
- 🟡 0.2 Git repo init + README + .gitignore + ilk commit ✅
- 🟡 0.3 GitHub repo'ya push (SSH key + merge) ✅
- ⚪ 0.4 Cloudflare Pages kurulumu (GitHub auto-deploy)
- 🟡 0.5 Supabase config (anon key + URL kaydedildi) ✅
- ⚪ 0.6 Brevo hesabı oluştur (transactional email)

---

### PHASE 1: Backend Foundation (Supabase)
- ⚪ 1.1 Supabase projesini EU Frankfurt'ta oluştur
- ⚪ 1.2 Schema deploy: tenants, users, leads, tasks, templates, price_plans, events
- ⚪ 1.3 RLS (Row Level Security) policies yaz ve test et
- ⚪ 1.4 Magic link auth çalışır duruma getir
- ⚪ 1.5 İlk curl testi: signup → tenant oluşur → başka tenant verisi görünmez
- ⚪ 1.6 Brevo transactional email entegrasyonu (magic link + bildirimler)

---

### PHASE 2: Frontend Modüler Refactor (Supabase ile Paralel)
- 🟡 2.1 CSS çıkarımı: styles/base.css ✅
- 🟡 2.2 core/ katmanı: state.js, supabase.js, storage.js, i18n.js, router.js, loader.js, bus.js, utils.js ✅
- 🟡 2.3 engine/ çıkarımı: decision.js, pricing.js, templates.js ✅
- 🟡 2.4 data/ state injection: Verilerin state'e yüklenmesi ✅
- 🟡 2.5 index.html shell: sidebar, header, splash, login, empty <main>, module loader ✅
- 🟡 2.6 Modül kontratı uygula: mount(rootEl, ctx) + unmount() + meta export ✅
- 🟡 2.7 Loader error isolation test ✅
- 🟡 2.8 APP_CREDS kaldır — Supabase auth ile değiştir ✅
- 🟡 2.9 Negatif test: bir modülü sil → diğer 10 çalışsın ✅

---

### PHASE 3: Module Migration — Leads, Tasks, Templates
- 🟡 3.1 Leads migration ✅
- 🟡 3.2 Realtime sync (basic) ✅
- 🟡 3.3 Tasks migration ✅
- 🟡 3.4 Resources migration ✅
- 🟡 3.5 Pricing connection ✅
- 🟡 3.6 Storage fallback ✅

---

### PHASE 4: Kalan Modüller Backend'e
- 🟡 4.1 modules/builder/builder.js ✅
- 🟡 4.2 modules/availability/availability.js ✅
- 🟡 4.3 modules/callguidance/callguidance.js ✅
- 🟡 4.4 modules/workflow/workflow.js ✅
- 🟡 4.5 modules/analytics/analytics.js ✅
- 🟡 4.6 modules/automation/automation.js ✅
- 🟡 4.7 modules/permissions/permissions.js ✅
- 🟡 4.8 Business info modal ✅
- 🟡 4.9 localStorage sync ✅

---

### PHASE 5: Venue Management & Calendar Sync
- 🔵 5.1 Business Settings Modülü: Firma bilgileri, IBAN, Banka yönetimi
- ⚪ 5.2 Calendar Integrations: Google/Outlook link senkronizasyon alanı
- ⚪ 5.3 Multi-tenant Calendar View: Availability modülünde aktif takvimi göster
- ⚪ 5.4 DATEV/sevDesk export (Opsiyonel)

---

### PHASE 6: Telegram & Advanced Automation (Gelecek)
- ⚪ 6.1 Telegram Bot altyapısı (Lead bildirimleri)
- ⚪ 6.2 Telegram üzerinden hızlı yanıt sistemi

---

### PHASE 6: Compliance & Legal
- ⚪ 6.1 UG (haftungsbeschränkt) kuruluşu
- ⚪ 6.2 Impressum hazırla
- ⚪ 6.3 Datenschutzerklärung (DSGVO Privacy Policy) hazırla
- ⚪ 6.4 AGB (Terms of Service) hazırla
- ⚪ 6.5 AVV (Auftragsverarbeitungsvertrag) şablonu hazırla
- ⚪ 6.6 Data portability endpoint (DSGVO hakkı)
- ⚪ 6.7 Audit log: events tablosu aktif, her action loglanıyor

---

### PHASE 7: Go-Live (Varpoint)
- ⚪ 7.1 Varpoint gerçek template'lerini migrate et
- ⚪ 7.2 Varpoint fiyat listesini migrate et
- ⚪ 7.3 Mevcut lead'leri Supabase'e aktar
- ⚪ 7.4 Orhan'ın ekibi günlük kullanıma başlasın
- ⚪ 7.5 7 gün ardışık operatör Excel/email'e dönmeden kullanım (bitti kapısı)
- ⚪ 7.6 EXIST grant başvurusu hazırla ve gönder
- ⚪ 7.7 Berlin Startup Stipendium başvurusu hazırla ve gönder

---

### PHASE 8: GTM & Ürünleştirme
- ⚪ 8.1 Landing page (salescockpit.com)
- ⚪ 8.2 Fiyat sayfası (Starter / Pro / Multi-Venue / Enterprise)
- ⚪ 8.3 Signup wizard (venue adı, dil, business info, template seeding)
- ⚪ 8.4 Paddle entegrasyonu production'a al
- ⚪ 8.5 Transactional email'ler (welcome, magic link, trial bitiyor)
- ⚪ 8.6 UptimeRobot status page
- ⚪ 8.7 Destek kanalı (email veya Crisp.chat)

---

### PHASE 9: Scale
- ⚪ 9.1 Borsigturm Tenant #2 olarak aç
- ⚪ 9.2 Multi-tenancy production'da kanıtla (veri izolasyonu doğrula)
- ⚪ 9.3 Varpoint case study yaz (öncesi/sonrası rakamlar)
- ⚪ 9.4 25 Berlin venue'sine soğuk outreach kampanyası
- ⚪ 9.5 İlk Varpoint-dışı demo görüşmesi (bitti kapısı)

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
| 2026-05-09 | Burak + Antigravity | Paddle MoR | VAT otomasyonu, 5%+$0.50, 100+ ülkede vergi yönetimi |
| 2026-05-09 | Burak + Antigravity | Frontend referans: v13 HTML birebir korunacak | Arayüz değişmeyecek, iç yapı modülerleşecek |

---

## 6. OPEN QUESTIONS

| # | Soru | Beklenen cevap kaynağı |
|---|------|----------------------|
| 1 | GitHub repo URL'si nedir? | Burak |
| 2 | Supabase hesabı açıldı mı? | Burak |
| 3 | Domain (salescockpit.com vb.) alındı mı? İsim kesinleşti mi? | Burak |
| 4 | Paddle hesap doğrulaması başlatıldı mı? | Burak |

---

## 7. BLOCKERS

| # | Engel | Çözüm yolu | Sorumlu |
|---|-------|-----------|---------|
| — | Şu an blocker yok | — | — |

---

## 8. CHANGELOG

| Tarih | Kim | Görev | Yeni Statü |
|-------|-----|-------|-----------|
| 2026-05-09 00:07 | Antigravity | PROJECT_COMMAND.md oluşturuldu | İlk versiyon |
| 2026-05-09 00:14 | Antigravity | 0.1 Dizin yapısı oluşturuldu | ⚪→🟡 |
| 2026-05-09 00:14 | Antigravity | 0.2 Git init + README + .gitignore + ilk commit | ⚪→🟡 |
| 2026-05-09 00:45 | Antigravity | 0.5 Supabase config kaydedildi (core/supabase.js) | ⚪→🟡 |
| 2026-05-09 00:47 | Antigravity | 2.1 CSS çıkarımı (styles/base.css) | ⚪→🟡 |
| 2026-05-09 00:47 | Antigravity | 2.2 core/ 8 dosya oluşturuldu | ⚪→🟡 |
| 2026-05-09 00:48 | Antigravity | SalesCockpit.html localhost:8000'de doğrulandı | ✅ |
