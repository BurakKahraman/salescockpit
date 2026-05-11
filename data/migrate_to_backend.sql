-- ══════════════════════════════════════════════════════════
-- SalesCockpit — Backend Data Migration
-- Fiyat listesi ve firma bilgilerini tenants tablosuna taşı
-- ══════════════════════════════════════════════════════════

-- 1. tenants tablosuna eksik kolonları ekle (varsa atla)
ALTER TABLE public.tenants 
  ADD COLUMN IF NOT EXISTS biz_info jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS pkg_contents jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS cross_transitions jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS anz jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS sig jsonb DEFAULT '{}'::jsonb;

-- 2. Varpoint tenant'ına firma bilgilerini yükle
UPDATE public.tenants
SET
  name = 'Varpoint',
  iban = 'DE91 1009 0000 2970 4260 03',
  bank_name = 'Berliner Volksbank',
  address = 'Tempelhofer Damm 227, 12099 Berlin',
  phone = '+49 176 70838137',
  biz_info = '{
    "name": "Varpoint",
    "tagline": "Virtual Reality Park",
    "phone": "+49 176 70838137",
    "addr": "Tempelhofer Damm 227, 12099 Berlin",
    "company": "HOVR Entertainment GmbH",
    "bank": "Berliner Volksbank",
    "iban": "DE91 1009 0000 2970 4260 03",
    "bic": "BEVODEBBXXX"
  }'::jsonb,

  -- 3. Fiyat listesi (sadece sayısal fiyatlar)
  pricing = '{
    "b2b": {"arena15": 700, "arena2": 800, "arena3": 900, "venue15": 1150, "venue2": 1490, "venue3": 1690, "prem3": 1850, "prem4": 2250},
    "b2c": {"bronze": 350, "silver": 400, "gold": 450, "starter": 250, "plus": 350, "pro": 400, "priv": 250, "entry": 28}
  }'::jsonb,

  -- 4. Paket içerikleri (DE/EN)
  pkg_contents = '{
    "arena15": {"de": "Dauer: 1,5 Std.\nPrivate Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator", "en": "Duration: 1.5h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator"},
    "arena2": {"de": "Dauer: 2 Std.\nPrivate Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator\n1 VR-Attraktion/Pers. · 1 Softdrink/Pers.", "en": "Duration: 2h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator\n1 VR Attraction/person · 1 soft drink/person"},
    "arena3": {"de": "Dauer: 3 Std.\nPrivate Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator\n2 VR-Attraktionen/Pers. · 2 Softdrinks/Pers. · Früchte & Gemüse", "en": "Duration: 3h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator\n2 VR Attractions/person · 2 soft drinks · Fruits & vegetables"},
    "venue15": {"de": "Dauer: 1,5 Std.\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n1 VR-Attraktion/Pers. · 1 Softdrink/Pers.", "en": "Duration: 1.5h\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n1 VR Attraction/person · 1 soft drink"},
    "venue2": {"de": "Dauer: 2 Std.\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n2 VR-Attraktionen/Pers. · 2 Softdrinks/Pers.", "en": "Duration: 2h\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n2 VR Attractions/person · 2 soft drinks"},
    "venue3": {"de": "Dauer: 3 Std.\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n3 VR-Attraktionen/Pers. · 3 Softdrinks/Pers. · Früchte & Gemüse", "en": "Duration: 3h\nArena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)\n3 VR Attractions/person · 3 soft drinks · Fruits & vegetables"},
    "prem3": {"de": "Dauer: 3 Std. · Gesamte Location exklusiv\nAlle Stationen gleichzeitig · Unbegrenzte Attraktionen/Pers. · 2 Softdrinks/Pers.\nCompany Branding · Foto & Video Session · Preis Gewinnerteam · Dediziertes Moderationsteam", "en": "Duration: 3h · Entire venue exclusively\nAll stations simultaneously · Unlimited attractions/person · 2 soft drinks/person\nCompany branding · Photo & video session · Prize for winning team · Dedicated moderation team"},
    "prem4": {"de": "Dauer: 4 Std. · Gesamte Location exklusiv\nUnbegrenzte Attraktionen & Softdrinks · Pizza für alle\nCompany Branding · Foto & Video Session · Preis Gewinnerteam · Moderationsteam · Früchte & Gemüse", "en": "Duration: 4h · Entire venue exclusively\nUnlimited attractions & soft drinks · Pizza for all participants\nCompany branding · Photo & video session · Prize for winning team · Moderation team · Fruits & vegetables"},
    "bronze": {"de": "Dauer: 1,5 Std.\nPrivate Arena · Lounge · Deko · Snacks · PlayStation · Moderator", "en": "Duration: 1.5h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator"},
    "silver": {"de": "Dauer: 2 Std.\nPrivate Arena · Lounge · Deko · Snacks · PlayStation · Moderator\n1 VR-Attraktion/Person · 1 Softdrink/Person", "en": "Duration: 2h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator\n1 VR Attraction/person · 1 soft drink"},
    "gold": {"de": "Dauer: 2,5 Std.\nPrivate Arena · Lounge · Deko · Snacks · PlayStation · Moderator\n3 VR-Attraktionen/Person · 2 Softdrinks/Person · Früchte & Gemüse", "en": "Duration: 2.5h\nPrivate arena · Lounge · Decoration · Snacks · PlayStation · Moderator\n3 VR Attractions/person · 2 soft drinks · Fruits & vegetables"},
    "starter": {"de": "Dauer: 1 Std. (bis 7 Pers.)\nVR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks", "en": "Duration: 1h (up to 7 people)\nVR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks"},
    "plus": {"de": "Dauer: 2 Std. (bis 10 Pers.)\nVR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks\n1 VR-Attraktion/Person (Rotation) · 1 Softdrink/Person", "en": "Duration: 2h (up to 10 people)\nVR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks\n1 VR Attraction/person (rotation mode) · 1 soft drink"},
    "pro": {"de": "Dauer: 2,5 Std. (bis 10 Pers.)\nVR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks\n3 VR-Attraktionen/Person · 2 Softdrinks/Person · Früchte & Gemüse", "en": "Duration: 2.5h (up to 10 people)\nVR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks\n3 VR Attractions/person · 2 soft drinks · Fruits & vegetables"},
    "priv": {"de": "Dauer: 1 Std. (bis 10 Pers.)\nPrivate Arena exklusiv · Kein Lounge/Deko", "en": "Duration: 1h (up to 10 people)\nPrivate arena exclusively · No lounge/decoration"}
  }'::jsonb,

  -- 5. E-mail imzaları
  sig = '{
    "de": "Mit freundlichen Grüßen,\n\nIhr Varpoint Team  |  Virtual Reality Park\nTelefon: +49 176 70838137  |  Tempelhofer Damm 227, 12099 Berlin",
    "en": "Best regards,\n\nYour Varpoint Team  |  Virtual Reality Park\nPhone: +49 176 70838137  |  Tempelhofer Damm 227, 12099 Berlin"
  }'::jsonb,

  -- 6. Anzahlung / Deposit texte
  anz = '{
    "b2b_de": "Anzahlung:\nFür die verbindliche Buchung ist eine Anzahlung von 50 € erforderlich.\n\nHOVR Entertainment GmbH · Berliner Volksbank\nIBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX\n\nDie Anzahlung kann per Überweisung oder bar vor Ort geleistet werden.",
    "b2b_en": "Deposit:\nA deposit of €50 is required to confirm the booking.\n\nHOVR Entertainment GmbH · Berliner Volksbank\nIBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX\n\nPayment by bank transfer or cash on site.",
    "b2c_de": "Anzahlung:\nFür die verbindliche Buchung ist eine Anzahlung von 50 € erforderlich.\n\nHOVR Entertainment GmbH · Berliner Volksbank\nIBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX\n\nHinweis: Festpreis bis 10 Personen. Ab der 11. Person gilt ein Personenzuschlag.",
    "b2c_en": "Deposit:\nA deposit of €50 is required to confirm the booking.\n\nHOVR Entertainment GmbH · Berliner Volksbank\nIBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX\n\nNote: Fixed price up to 10 people. A per-person supplement applies from the 11th person."
  }'::jsonb

WHERE id = 'a57d169a-8585-4a18-8e75-b2cfa6fdae96';

-- 7. default_templates tablosuna da biz_info template ekle
-- (Yeni tenant'lar için handle_new_user trigger'ında ayrı bir default biz_info yok,
-- onlar Settings üzerinden doldurur)

SELECT 'Migration complete. Tenant data loaded to Supabase backend.' as status;
