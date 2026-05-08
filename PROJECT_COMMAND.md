# PROJECT_COMMAND.md — SalesCockpit Merkezi Komuta Dosyası

---

## 1. HOW TO USE THIS FILE

Her AI ajanı (Antigravity, Claude Code, Gemini, vb.) bu dosyayı **oturuma başlarken ilk okur**.
- **NEXT ACTION**'ı al, yap, durumunu güncelle (⚪→🔵→🟡)
- Sonraki ⚪ görevi seç, NEXT ACTION'a yaz
- **CHANGELOG**'a satır ekle
- Burak'ın el ile güncellemesi de aynı protokole bağlı

**Tek kaynak prensibi**: Bu dosya projenin ana damarıdır. Tüm görev takibi buradan akar, buraya d| Alan | Değer |
|------|-------|
| **Active phase** | PHASE 9 — Scale & Maintenance |
| **Current task** | 9.1 — Grant Documentation & 25 Venue Outreach |
| **Last update** | 2026-05-09 01:40 · Antigravity |
| **Blockers** | none |

---

## 3. NEXT ACTION

| Alan | Değer |
|------|-------|
| **Görev ID** | 9.1 |
| **Başlık** | Scale & Grant Strategy |
| **Beklenen çıktı** | EXIST ve Berlin Startup Stipendium başvurularının tamamlanması |
| **Başarı kriteri** | Teknik dökümantasyonun hibe şartlarına uygunluğu |

---

## 4. PHASES

### PHASE 0-5: Core SaaS Migration ✅
- 🟡 0.1 Infrastructure setup ✅
- 🟡 1.0 Supabase Foundation ✅
- 🟡 2.0 Modular Frontend ✅
- 🟡 3.0-5.0 Feature Migration ✅

---

### PHASE 6: Compliance & Automation ✅
- 🟡 6.1 Legal Module (Compliance.js) ✅
- 🟡 6.2 Telegram Notification Helper ✅
- 🟡 6.3 Audit Logging ✅

---

### PHASE 7: Go-Live (Varpoint) ✅
- 🟡 7.1 Template Migration ✅
- 🟡 7.2 Pricing Migration ✅
- 🟡 7.3 Lead Bulk Import Tool ✅
- 🟡 7.4 Live Production Environment ✅

---

### PHASE 8: GTM & Ürünleştirme ✅
- 🟡 8.1 Onboarding Wizard ✅
- 🟡 8.2 Technical Roadmap Documentation ✅
- 🟡 8.3 README SaaS Vision ✅

---

### PHASE 9: Scale (Active) 🔵
- ⚪ 9.1 EXIST / Berlin Startup Stipendium applications
- ⚪ 9.2 25 Berlin Venue Outreach
- ⚪ 9.3 Multi-tenancy Proof (Borsigturm #2)
✅
- 🟡 7.2 Varpoint fiyat listesini migrate et ✅
- 🔵 7.3 Mevcut lead'leri Supabase'e aktar (Bulk Import)
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
| 2026-05-09 | Burak + Antigravity | Paddle Çıkarıldı | Uygulama venue sahipleri ve sales rep'ler için olduğu için ödeme altyapısına gerek kalmadı |
| 2026-05-09 | Burak + Antigravity | Venue Settings Eklendi | Her tenant'ın kendi banka/takvim bilgilerini yönetmesi için merkezi modül kararlaştırıldı |
| 2026-05-09 | Burak + Antigravity | Telegram Önceliklendirildi | WhatsApp yerine Telegram bot altyapısı tercih edildi (düşük maliyet/yüksek hız) |

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
| — | Şu an blocker yok | — | — |

---

## 8. CHANGELOG

| Tarih | Kim | Görev | Yeni Statü |
|-------|-----|-------|-----------|
| 2026-05-09 00:07 | Antigravity | PROJECT_COMMAND.md oluşturuldu | İlk versiyon |
| 2026-05-09 01:10 | Antigravity | Phase 3-4 Modül Migrasyonları (Leads, Tasks, Builder) | ⚪→🟡 |
| 2026-05-09 01:25 | Antigravity | Phase 5 Venue Settings & Calendar Sync | ⚪→🟡 |
| 2026-05-09 01:30 | Antigravity | Frontend Responsive Tasarım (Mobil/Tablet) | ✅ |
| 2026-05-09 01:35 | Antigravity | Phase 7.1 & 7.2 Varpoint Data Migration | ⚪→🟡 |
