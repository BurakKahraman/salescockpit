export const TMPL_DEFAULT = {
b2b:{
de:{
discovery:[
{id:'b2b_de_d1',label:'Team-Outing / Firmen-Event',stage:'discovery',
ms:'Team-Outing / Firmen-Event / {GROUP} Pers. am {DATE}',
mirrors:[
'Für ein Team-Outing mit {GROUP} Personen am {DATE}, gerne gebe ich Ihnen einen Überblick über unsere drei Corporate Event Formate, damit Sie sehen können, welches Format am besten zu Ihrer Gruppe passt.',
'Ein Team-Outing mit {GROUP} Personen am {DATE}, ich fasse kurz zusammen, welches unserer drei Formate für diese Gruppengröße am besten geeignet ist.',
'Für Ihr Team-Event am {DATE} mit {GROUP} Personen haben wir drei Formate, je nach gewünschtem Erlebnisumfang und Budget.'
],
subject:'Ihr Team-Event bei Varpoint',
body:`{AVAIL_NOTE}Liebe/Lieber {NAME},

vielen Dank für Ihre Anfrage.

{MIRROR}

Arena Event, bis zu 20 Personen
Teams spielen gegeneinander in unserer VR-Arena, vergleichbar mit Paintball oder Lasertag, vollständig in Virtual Reality mit über 20 Arenen. Alle tragen Oculus Quest 3 Headsets und sehen sich gegenseitig. Moderator, private Arena, Lounge, Dekoration, Snacks und PlayStation inklusive.

Das richtige Format wenn fokussiertes Team-Gameplay klar im Mittelpunkt stehen soll.

Venue Booking, bis zu 25 Personen
Arena, VR-Räume und Fahrsimulator laufen gleichzeitig und parallel. Mehr Abwechslung, deutlich weniger Wartezeiten. Ideal wenn die Gruppe verschiedene Erlebnistypen in einem Event kombinieren möchte.

Premium, bis zu 35 Personen
Gesamte Location exklusiv. Alle Stationen parallel, kein Rotationssystem, keine Wartezeiten. Company Branding, Foto & Video Session und dediziertes Moderationsteam inklusive.

Welches Format klingt für Ihr Team interessanter, und wie lange soll das Event dauern?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2b_de_d2',label:'Jubiläum / Jahresabschluss',stage:'discovery',
ms:'Jubiläum / Jahresabschluss / Firmen-Feier / {GROUP} Pers. am {DATE}',
mirrors:[
'Für Ihre Feier mit {GROUP} Personen am {DATE}, ein besonderer Anlass verdient einen Rahmen der in Erinnerung bleibt. Ich stelle Ihnen kurz unsere drei Formate vor.',
'Ein Jubiläum mit {GROUP} Personen am {DATE}, ich zeige Ihnen, welches Format den stärksten Rahmen für einen unvergesslichen Abend bietet.',
'Für Ihr Firmen-Event am {DATE} mit {GROUP} Personen, je nach Anlass und gewünschtem Erlebnisumfang kommen drei Formate in Frage.'
],
subject:'Ihr Firmen-Event bei Varpoint',
body:`{AVAIL_NOTE}Liebe/Lieber {NAME},

vielen Dank für Ihre Anfrage.

{MIRROR}

Arena Event, bis zu 20 Personen
Exklusives Team-VR-Gameplay in privater Arena. Moderator, Lounge, Dekoration und PlayStation inklusive. Kompakter und fokussierter Rahmen, gut wenn das Gameplay klar im Vordergrund stehen soll.

Venue Booking, bis zu 25 Personen
Arena, VR-Räume und Fahrsimulator laufen gleichzeitig. Mehr Stationen, mehr Abwechslung, gut wenn die Gruppe verschiedene Erlebnistypen in einem Event kombinieren möchte.

Premium, bis zu 35 Personen
Gesamte Location exklusiv mit Company Branding, Foto & Video Session und dediziertem Moderationsteam. Für Anlässe bei denen der professionelle Rahmen Teil des Events ist.

Welches Format klingt für Ihren Anlass passender, und mit wie vielen Personen planen Sie?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2b_de_d3',label:'Allgemeine Anfrage / Format offen',stage:'discovery',
ms:'Allgemeine Anfrage / kein Anlass / Format noch offen',
mirrors:[
'Gerne gebe ich Ihnen einen Überblick über unsere drei Corporate Event Formate, damit Sie sehen können, was für Ihr Team am besten passt.',
'Für Corporate Events bieten wir drei Formate, je nach Gruppengröße, Budget und gewünschtem Erlebnisumfang. Ich fasse die Unterschiede kurz zusammen.',
'Ich habe mir angesehen, was wir für Ihr Team anbieten können, und stelle die drei Formate kurz vor.'
],
subject:'Ihr Team-Event bei Varpoint',
body:`{AVAIL_NOTE}Liebe/Lieber {NAME},

vielen Dank für Ihre Anfrage.

{MIRROR}

Arena Event, bis zu 20 Personen
Teams spielen gegeneinander in unserer VR-Arena. Vergleichbar mit Paintball oder Lasertag, vollständig in Virtual Reality. Private Arena, Lounge, Dekoration, Snacks und PlayStation inklusive. Moderator durchgehend dabei.

Venue Booking, bis zu 25 Personen
Arena, VR-Räume und Fahrsimulator laufen gleichzeitig und parallel. Mehr Abwechslung, weniger Wartezeiten als beim Arena-only Format.

Premium, bis zu 35 Personen
Gesamte Location exklusiv. Kein Rotationssystem, keine Wartezeiten. Company Branding, Foto & Video Session, dediziertes Moderationsteam.

Welches Format klingt interessanter, und wie lange planen Sie das Event?

{PHOTO_NOTE}

{SIGNOFF}`}
],
offer:[
{id:'b2b_de_o1',label:'Budget offen / Premium klingt passend',stage:'offer',
ms:'Budget offen / kein klares Format / Gesamterlebnis Priorität / großes Team',
mirrors:[
'Für eine Gruppe von ca. {GROUP} Personen und Ihrer Anforderung an ein reibungsloses Erlebnis für alle Teilnehmer würden wir Ihnen unser Premium Format empfehlen.',
'Da für Sie das Gesamterlebnis im Vordergrund steht und alle Teilnehmer gleichzeitig aktiv eingebunden sein sollen, haben wir das Premium Format als klaren Ausgangspunkt gewählt.',
'Um sicherzustellen, dass bei {GROUP} Personen keine Wartezeiten entstehen und alle Stationen gleichzeitig genutzt werden können, empfehlen wir das Premium Format.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung.

{MIRROR}

Für Ihr Event am {DATE} kommen insbesondere folgende Varianten infrage:

Premium · 3 Stunden
Exklusive Nutzung der gesamten Location. Alle Stationen laufen parallel und die Teilnehmer können frei zwischen Arena, VR-Erlebnissen und Simulatoren wechseln. Die einzige Option bei der alle Teilnehmer gleichzeitig an allen Stationen aktiv sein können, ohne Wartezeiten, ohne Rotationssystem.
Gesamtpreis: {PRICE_prem3} €
Von Teams für Gruppen dieser Größe am häufigsten gewählt.
- Gesamte Location exklusiv für Ihr Event
- Alle Stationen laufen gleichzeitig
- Unbegrenzte Attraktionen pro Person
- Company Branding auf allen Screens
- Foto und Video Session
- Preis für das Gewinnerteam
- Dediziertes Moderationsteam

Gleicher Aufbau, mit mehr Zeit und vollständigem Catering-Paket:

Premium · 4 Stunden
Identischer Ablauf wie die 3-Stunden-Variante, mit zusätzlicher Zeit für entspanntere Übergänge, mehr Raum für informellen Austausch im Team und einem vollständigen Catering-Paket.
Gesamtpreis: {PRICE_prem4} €
Alles wie oben, zusätzlich:
- Erweiterte Eventdauer
- Pizza für alle Teilnehmer
- Unbegrenzte Softdrinks, Früchte und Gemüse

Falls Sie das Event etwas kompakter planen möchten:

Venue Booking · 3 Stunden
Kombination aus Arena, VR-Stationen und Fahrsimulatoren mit parallelem Betrieb. Im Unterschied zum Premium Format liegt der Fokus auf rotierender Stationsnutzung statt vollständig simultanen Zugängen. Für Gruppen bis ca. 25 Personen ideal, für diese Gruppengröße planbar, jedoch mit etwas weniger gleichzeitiger Stationskapazität als beim Premium Format.
Gesamtpreis: {PRICE_venue3} €
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 3 Attraktionen pro Person
- 3 Softdrinks pro Person, Früchte und Gemüse
- Snacks, Dekoration, Moderator

Können Sie mir kurz mitteilen, welche Variante für Sie am besten passt und zu welcher Uhrzeit Sie das Event starten möchten? Dann reservieren wir den Termin verbindlich für Ihr Team.

{SIGNOFF}`},
{id:'b2b_de_o2',label:'Budget klar / Premium gewählt',stage:'offer',
ms:'Premium klingt passend / große Gruppe / Budget ist klar gesetzt / exklusiver Rahmen',
mirrors:[
'Da Sie ein exklusives Event für Ihre Gruppe planen, bestätigen wir das Premium Format als die passende Wahl und haben zwei Varianten für Sie zusammengestellt.',
'Für eine Gruppe von ca. {GROUP} Personen und Ihrer Präferenz für ein exklusives Erlebnis empfehlen wir klar unser Premium Format.',
'Da für Sie die exklusive Nutzung der gesamten Location im Vordergrund steht, haben wir zwei Premium Varianten für Ihre Gruppe vorbereitet.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung.

{MIRROR}

Premium · 3 Stunden
Das Format das für Teams dieser Größe das richtige Gleichgewicht aus Aktivität, Energie und Fokus bietet, ohne Wartezeiten, ohne Rotation, mit einem Team das sich ausschließlich um Ihr Event kümmert.
Gesamtpreis: {PRICE_prem3} €
Von Teams für exklusive Events am häufigsten gewählt.
- Gesamte Location exklusiv für Ihr Event
- Alle Stationen laufen gleichzeitig
- Unbegrenzte Attraktionen pro Person
- Company Branding auf allen Screens
- Foto und Video Session
- Preis für das Gewinnerteam
- Dediziertes Moderationsteam

Wenn Sie mehr Zeit und ein vollständiges Catering-Paket wünschen:

Premium · 4 Stunden
Gleicher Ablauf wie die 3-Stunden-Variante, mit mehr Raum für Pausen, informellen Austausch und einem Catering-Paket das keine weiteren Absprachen erfordert.
Gesamtpreis: {PRICE_prem4} €
Alles wie oben, zusätzlich:
- Pizza für alle Teilnehmer
- Unbegrenzte Softdrinks, Früchte und Gemüse

Können Sie mir kurz mitteilen, welche Variante für Sie am besten passt und zu welcher Uhrzeit Sie das Event starten möchten?

{SIGNOFF}`},
{id:'b2b_de_o3',label:'Budget offen / Venue Booking klingt passend',stage:'offer',
ms:'Venue Booking klingt passend / mittleres Budget / offen für Upgrade',
mirrors:[
'Da Sie das Venue Booking Format in Betracht ziehen, haben wir drei passende Varianten für Ihre Gruppe zusammengestellt, die sich in Dauer und Inhalt pro Person unterscheiden.',
'Für eine Gruppe von ca. {GROUP} Personen und Ihrer Präferenz für das Venue Booking Format empfehlen wir die 3-Stunden-Option als optimalen Ausgangspunkt.',
'Auf Basis Ihrer Angaben haben wir die drei Venue Booking Stufen verglichen und eine klare Empfehlung für Ihre Gruppe vorbereitet.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung, das hilft sehr bei der Einordnung.

{MIRROR}

Für Ihr Event am {DATE} kommen insbesondere folgende Varianten infrage:

Venue Booking · 3 Stunden
Mehr Zeit pro Station, mehr Attraktionen pro Person und zusätzliche Extras. Für Gruppen dieser Größe bietet diese Option das beste Verhältnis aus Aktivität, Inhalt und Eventdauer. Die längere Eventdauer reduziert Wartezeiten bei den Stationsrotationen deutlich.
Gesamtpreis: {PRICE_venue3} €
Von Teams in diesem Format am häufigsten gewählt.
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 3 Attraktionen pro Person
- 3 Softdrinks pro Person, Früchte und Gemüse
- Snacks, Dekoration, Moderator

Gleicher Stationsaufbau, kompakterer Zeitrahmen, reduzierter Inhalt pro Person:

Venue Booking · 2 Stunden
Identischer Stationsaufbau in einem etwas kürzeren Zeitrahmen. Eine gute Wahl wenn das Event in einen engeren Zeitplan passen muss.
Gesamtpreis: {PRICE_venue2} €
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 2 Attraktionen pro Person
- 2 Softdrinks pro Person
- Snacks, Dekoration, Moderator

Falls Sie das Event noch kompakter planen möchten:

Venue Booking · 1,5 Stunden
Einstiegsoption mit vollem Stationsaufbau und strukturiertem Ablauf. Empfohlen wenn die Zeit begrenzt ist oder das Event in einen größeren Tagesplan eingebettet wird.
Gesamtpreis: {PRICE_venue15} €
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 1 Attraktion pro Person
- 1 Softdrink pro Person
- Snacks, Dekoration, Moderator

Können Sie mir kurz mitteilen, welche Variante für Sie am besten passt?

{SIGNOFF}`},
{id:'b2b_de_o4',label:'Budget klar / nur Venue Booking',stage:'offer',
ms:'Venue Booking klingt passend / Budget ist klar definiert / kein Upgrade erwartet',
mirrors:[
'Da Sie das Venue Booking Format in Betracht ziehen, haben wir die drei Stufen für Ihre Gruppe mit klarer Empfehlung zusammengestellt.',
'Auf Basis Ihrer Angaben haben wir drei Venue Booking Varianten verglichen, vom kompakten Einstieg bis zur umfangreichsten Option.',
'Für Ihre Gruppe habe ich die drei Venue Booking Stufen mit den jeweiligen Inhalten vorbereitet.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung, das hilft sehr bei der Einordnung.

{MIRROR}

Alle drei Varianten nutzen denselben Stationsaufbau mit parallelem Betrieb, Arena, VR-Räume und Fahrsimulator laufen gleichzeitig. Der Unterschied liegt in der Eventdauer und dem Inhalt pro Person.

Für Ihr Event am {DATE}:

Venue Booking · 3 Stunden
Mehr Zeit pro Station, mehr Attraktionen und Extras pro Person. Für Teams die ein vollständiges Erlebnis ohne Abstriche wünschen, ist dies der beste Ausgangspunkt.
Gesamtpreis: {PRICE_venue3} €
Von Teams in diesem Format am häufigsten gewählt.
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 3 Attraktionen pro Person
- 3 Softdrinks pro Person, Früchte und Gemüse
- Snacks, Dekoration, Moderator

Gleicher Stationsaufbau, etwas kompakterer Zeitrahmen:

Venue Booking · 2 Stunden
Identischer Stationsaufbau, etwas weniger Zeit pro Station und reduzierter Inhalt pro Person.
Gesamtpreis: {PRICE_venue2} €
- 2 Attraktionen pro Person
- 2 Softdrinks pro Person
- Snacks, Dekoration, Moderator

Falls Sie das Event noch kompakter planen möchten:

Venue Booking · 1,5 Stunden
Einstiegsoption mit vollem Stationsaufbau.
Gesamtpreis: {PRICE_venue15} €
- 1 Attraktion pro Person
- 1 Softdrink pro Person
- Snacks, Dekoration, Moderator

Können Sie mir mitteilen, welche Variante am besten passt?

{SIGNOFF}`},
{id:'b2b_de_o5',label:'Arena angefragt / Budget offen für Upgrade',stage:'offer',
ms:'Arena Event angefragt / Budget vorhanden / für Venue Booking Empfehlung offen',
mirrors:[
'Da Sie das Arena Event in Betracht ziehen, möchten wir kurz erläutern, welches Format für eine Gruppe von {GROUP} Personen den deutlich aktiveren Ablauf bietet.',
'Auf Basis Ihrer Arena-Anfrage haben wir zwei Formate verglichen und eine Empfehlung vorbereitet, die für Ihre Gruppengröße besser geeignet ist.',
'Da Sie ein Arena-basiertes Event planen, stellen wir Ihnen eine Option vor, die für Gruppen dieser Größe deutlich weniger Wartezeiten erzeugt und alle Teilnehmer durchgehend aktiv hält.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung, das hilft sehr bei der Einordnung.

{MIRROR}

Beim Arena Event läuft nur eine Station, bei dieser Gruppengröße entstehen dadurch längere Wartezeiten und weniger gleichzeitige Aktivitäten. Das Venue Booking Format ermöglicht parallelen Betrieb aller Stationen und hält alle Teilnehmer durchgehend aktiv.

Für Ihr Event am {DATE}:

Venue Booking · 2 Stunden
Kombination aus Arena, VR-Stationen und Fahrsimulatoren, alle laufen gleichzeitig. Alle Teilnehmer bleiben durchgehend aktiv, Wartezeiten werden auf ein Minimum reduziert.
Gesamtpreis: {PRICE_venue2} €
- Arena, VR Räume und Fahrsimulator
- Beide Lounge Bereiche
- 2 Attraktionen pro Person
- 2 Softdrinks pro Person
- Snacks, Dekoration, Moderator

Gleicher paralleler Stationsaufbau, kompakterer Zeitrahmen:

Venue Booking · 1,5 Stunden
Identischer Aufbau mit etwas weniger Zeit pro Station.
Gesamtpreis: {PRICE_venue15} €
- 1 Attraktion pro Person
- 1 Softdrink pro Person
- Snacks, Dekoration, Moderator

Falls Sie das Budget kompakt halten möchten:

Arena Event · 3 Stunden
Fokus auf Arena-Gameplay. Bitte beachten Sie: bei dieser Gruppengröße läuft nur die Arena und es entstehen längere Wartezeiten. Die längere Eventdauer reduziert diesen Effekt etwas.
Gesamtpreis: {PRICE_arena3} €
- Private Arena, Lounge, 2 Attraktionen/Pers., 2 Softdrinks, Früchte & Gemüse, Moderator

Können Sie mir kurz mitteilen, welche Variante am besten passt?

{SIGNOFF}`},
{id:'b2b_de_o6',label:'Budget ist Hauptthema / Arena bevorzugt',stage:'offer',
ms:'Arena Event bevorzugt / Budget ist klar definiert und begrenzt / kein Upgrade',
mirrors:[
'Da Sie das Arena Event bevorzugen und das Budget klar definiert ist, haben wir drei Arena-Varianten für Ihre Gruppe verglichen.',
'Auf Basis Ihrer Präferenz für das Arena Format und dem gesetzten Budget haben wir die passenden Stufen zusammengestellt.',
'Da das Arena Event für Sie im Vordergrund steht, haben wir drei Varianten mit unterschiedlicher Dauer und Inhalt für Sie vorbereitet.'
],
subject:'Ihr Event bei Varpoint, Angebot für {GROUP} Personen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung, das hilft sehr bei der Einordnung.

{MIRROR}

Alle drei Varianten beinhalten exklusiven Arena-Zugang, Lounge, Dekoration, Snacks und einen Moderator vor Ort.

Arena Event · 3 Stunden
Mehr Zeit pro Person, entspanntere Rotationen und der höchste Inhalt pro Person. Beste Wahl wenn fokussiertes Arena-Gameplay klar im Mittelpunkt des Events stehen soll.
Gesamtpreis: {PRICE_arena3} €
Von Teams in diesem Format am häufigsten gewählt.
- Private Arena
- Lounge Bereich
- 2 Attraktionen pro Person
- 2 Softdrinks pro Person
- Früchte und Gemüse, Snacks, Dekoration, Moderator

Gleicher exklusiver Aufbau, kompakterer Zeitrahmen:

Arena Event · 2 Stunden
Eine Attraktion und ein Softdrink pro Person inklusive. Gut geeignet wenn das Event zeitlich eingebettet ist oder der Zeitrahmen enger ist.
Gesamtpreis: {PRICE_arena2} €
- 1 Attraktion pro Person
- 1 Softdrink pro Person
- Snacks, Dekoration, Moderator

Kompakter Einstieg ohne inkludierte Attraktionen:

Arena Event · 1,5 Stunden
Voller Arena-Zugang und strukturierter Ablauf. Kein inkludierter Inhalt pro Person, aber derselbe exklusive Rahmen.
Gesamtpreis: {PRICE_arena15} €
- Private Arena, Lounge, Snacks, Dekoration, Moderator

Können Sie mir mitteilen, welche Variante am besten passt?

{SIGNOFF}`}
],
slot:[
{id:'b2b_de_s1',availabilityModes:['available','partial'],label:'Termin verfügbar ✓',stage:'slot',ms:'Paket bestätigt / Startzeit noch offen / Termin frei',mirrors:[],
subject:'Ihr Termin bei Varpoint, {DATE}',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung. Ihr Wunschtermin ist verfügbar.

{DATE}, {DAY}  {WINDOW} Uhr

Sie können innerhalb des angebotenen Zeitfensters die Startzeit frei wählen.

Damit ich den Termin verbindlich für Ihr Team reservieren kann, benötige ich noch Ihre gewünschte Startzeit. Melden Sie sich gerne kurz.

{SIGNOFF}`},
{id:'b2b_de_s2',availabilityModes:['available','partial','unavailable'],label:'Termin teilweise verfügbar ⚠',stage:'slot',ms:'Paket bestätigt / Wunschtermin nur teilweise frei',mirrors:[],
subject:'Ihr Termin bei Varpoint, {DATE}',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung. An Ihrem Wunschtermin haben wir leider nur noch ein eingeschränktes Zeitfenster verfügbar.

Verfügbares Zeitfenster:
{DATE}, {DAY}  {WINDOW} Uhr

Alternativ könnte ich Ihnen folgenden Termin anbieten:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW} Uhr

Sie können innerhalb der angebotenen Zeitfenster die Startzeit frei wählen.

Welcher Termin passt für Ihr Team besser? Ich reserviere ihn dann verbindlich für Sie.

{SIGNOFF}`},
{id:'b2b_de_s3',availabilityModes:['partial','unavailable'],label:'Termin ausgebucht ✗',stage:'slot',ms:'Paket bestätigt / Wunschtermin ausgebucht',mirrors:[],
subject:'Ihr Termin bei Varpoint, Alternative Termine',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Rückmeldung. Der {DATE} ist leider bereits ausgebucht.

Gerne biete ich Ihnen folgende Alternativen an:

Option 1:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW} Uhr

Option 2:
{ALT2_DATE}, {ALT2_DAY}  {ALT2_WINDOW} Uhr

Sie können innerhalb der angebotenen Zeitfenster die Startzeit frei wählen.

Passt einer dieser Termine für Ihr Team? Dann reserviere ich ihn verbindlich für Sie.

{SIGNOFF}`}
],
booked:[
{id:'b2b_de_b1',label:'Buchungsbestätigung',stage:'booked',ms:'',mirrors:[],
subject:'Ihre Buchungsbestätigung, {DATE} bei Varpoint',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre Bestätigung. Gerne bestätige ich Ihnen hiermit Ihre Buchung:

Buchungsdetails:
- Datum: {DAY}, {DATE}
- Uhrzeit: {TIME} Uhr
- Personenzahl: {GROUP} Personen
- Gewähltes Paket: {PACKAGE}
- Gesamtpreis: {PRICE_SELECTED} €

Paketinhalt:
{PKG_CONTENTS}

{ANZ}

Sollten Sie noch Fragen haben oder zusätzliche Wünsche bestehen, stehe ich jederzeit gerne zur Verfügung.

Wir freuen uns darauf, Ihr Team bei uns begrüßen zu dürfen.

{SIGNOFF}`}
],
other:[
{id:'b2b_de_x1',label:'Preis zu hoch / Budget begrenzt',stage:'other',ms:'Preis zu hoch / Budget begrenzt / braucht günstigere Option',
mirrors:['Vielen Dank für Ihre ehrliche Rückmeldung. Ich habe mir angesehen, welche Optionen für Ihre Gruppe in einem anderen Preisrahmen in Frage kommen.','Das verstehe ich, lassen Sie mich kurz zeigen, was in einem kompakteren Format für Ihre Gruppe möglich ist.'],
subject:'Ihr Event bei Varpoint, Alternative Optionen',
body:`Liebe/Lieber {NAME},

vielen Dank für Ihre ehrliche Rückmeldung.

{MIRROR}

Für {GROUP} Personen am {DATE} wäre das Arena Event eine kompaktere Alternative:

Arena Event · 3 Stunden, Gesamtpreis: {PRICE_arena3} €
Exklusive Arena, Lounge, Dekoration, Snacks, Moderator, 2 Attraktionen und 2 Softdrinks pro Person.

Arena Event · 2 Stunden, Gesamtpreis: {PRICE_arena2} €
Gleicher Aufbau, eine Attraktion und ein Softdrink pro Person.

Der Unterschied zum Venue Booking: beim Arena Event läuft nur die Arena, beim Venue Booking laufen alle Stationen gleichzeitig. Für Teams die hauptsächlich Arena-Gameplay suchen, ist das Arena Event eine solide Wahl.

Welche Option kommt Ihnen am nächsten? Ich stelle das finale Angebot zusammen.

{SIGNOFF}`},
{id:'b2b_de_x2',label:'Kein Feedback nach Angebot',stage:'other',ms:'Kein Feedback nach Angebot / Follow-up nötig',mirrors:[],
subject:'Ihr Event bei Varpoint, Kurze Rückmeldung',
body:`Liebe/Lieber {NAME},

ich wollte kurz nachfragen, ob Sie noch Fragen zu den Optionen haben oder ob ich Ihnen weitere Details schicken soll.

Der Termin am {DATE} ist noch verfügbar. Sobald ich Ihre Bestätigung habe, reservieren wir ihn verbindlich für Ihr Team.

Melden Sie sich gerne, wenn Sie noch etwas benötigen.

{SIGNOFF}`}
]
},
en:{
discovery:[
{id:'b2b_en_d1',label:'Team outing / company event',stage:'discovery',
ms:'Team outing / company event / {GROUP} people on {DATE}',
mirrors:[
'For a team outing with {GROUP} people on {DATE}, happy to give you a quick overview of our three corporate formats so you can see which one fits your group best.',
'A team event with {GROUP} people on {DATE}, let me briefly summarise which of our three formats suits this group size best.',
'For your team event on {DATE} with {GROUP} people, we have three formats depending on the experience level and budget you have in mind.'
],
subject:'Your team event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for reaching out.

{MIRROR}

Arena Event, up to 20 people
Teams compete in our VR arena, comparable to paintball or laser tag, entirely in virtual reality with 20+ arenas. Everyone wears Oculus Quest 3 headsets and can see each other. Moderator, private arena, lounge, decoration, snacks and PlayStation included.

The right choice when focused team gameplay should clearly be the centrepiece.

Venue Booking, up to 25 people
Arena, VR rooms and simulators all running simultaneously in parallel. More variety and significantly less waiting time. Ideal when the group wants to combine different experience types in one event.

Premium, up to 35 people
Entire venue exclusively yours. All stations run in parallel, no rotation, no waiting time. Company branding, photo and video session and a dedicated moderation team included.

Which format sounds more interesting for your team, and how long are you planning the event?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2b_en_d2',label:'Anniversary / year-end celebration',stage:'discovery',
ms:'Anniversary / year-end / company celebration / {GROUP} people on {DATE}',
mirrors:[
'For a celebration with {GROUP} people on {DATE}, a special occasion deserves a setting that leaves a lasting impression. Here is a quick overview of our three formats.',
'An anniversary event with {GROUP} people on {DATE}, let me briefly outline which format provides the strongest setting for an unforgettable evening.',
'For your company celebration on {DATE} with {GROUP} people, depending on the occasion and experience level you have in mind, three formats come into consideration.'
],
subject:'Your company event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for reaching out.

{MIRROR}

Arena Event, up to 20 people
Exclusive team VR gameplay in a private arena. Moderator, lounge, decoration and PlayStation included. A focused and compact setting, best when gameplay should clearly be the centrepiece.

Venue Booking, up to 25 people
Arena, VR rooms and simulators running simultaneously. More stations, more variety, ideal when the group wants to combine different experience types in one event.

Premium, up to 35 people
Entire venue exclusively yours with company branding, photo and video session and a dedicated moderation team. For occasions where the professional setting is part of the event itself.

Which format sounds right for your occasion, and how many people are you planning for?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2b_en_d3',label:'General inquiry / format open',stage:'discovery',
ms:'General inquiry / no occasion mentioned / format not yet defined',
mirrors:[
'Happy to give you an overview of our three corporate event formats so you can see what fits your team best.',
'For corporate events we offer three formats, depending on group size, budget and the type of experience you are looking for.',
'I have looked at what we can offer your team and am happy to walk you through the three formats.'
],
subject:'Your team event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for reaching out.

{MIRROR}

Arena Event, up to 20 people
Teams compete in our VR arena. Comparable to paintball or laser tag, entirely in virtual reality. Private arena, lounge, decoration, snacks and PlayStation included. Moderator throughout.

Venue Booking, up to 25 people
Arena, VR rooms and simulators running simultaneously in parallel. More variety and less waiting time than the arena-only format.

Premium, up to 35 people
Entire venue exclusively yours. No rotation system, no waiting time. Company branding, photo and video session, dedicated moderation team.

Which format sounds more interesting, and how long are you planning the event?

{PHOTO_NOTE}

{SIGNOFF}`}
],
offer:[
{id:'b2b_en_o1',label:'Budget open / premium sounds right',stage:'offer',
ms:'Budget open / no clear format / overall experience is priority / large group',
mirrors:[
'For a group of around {GROUP} people and your focus on a seamless experience for all participants, we would recommend our Premium format.',
'Since the overall experience is the priority and you want all participants active simultaneously, we have chosen Premium as the clear starting point for your group.',
'To ensure there are no waiting times for {GROUP} people and all stations can be used simultaneously, we would recommend our Premium format.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply.

{MIRROR}

For your event on {DATE}, the following options would work well:

Premium · 3 hours
Exclusive use of the entire venue. All stations run in parallel and participants can move freely between arena, VR experiences and simulators. The only option where all participants can be active at all stations simultaneously, no waiting time, no rotation system.
Total price: {PRICE_prem3} €
Most frequently chosen by teams for groups of this size.
- Entire venue exclusively yours
- All stations running simultaneously
- Unlimited attractions per person
- Company branding on all screens
- Photo and video session
- Prize for the winning team
- Dedicated event moderation team

Same setup, with additional time and a complete catering package:

Premium · 4 hours
Identical flow to the 3-hour option, with additional time for more relaxed transitions and more space for team interaction. Recommended when the event should also have a social component alongside the activity.
Total price: {PRICE_prem4} €
Everything above, plus:
- Extended event duration
- Pizza for all participants
- Unlimited soft drinks, fruits and vegetables

If you would like a slightly more compact format:

Venue Booking · 3 hours
Combination of arena, VR stations and simulators with parallel operation. Compared to Premium, the focus is on rotating station use rather than fully simultaneous access. Ideal for groups up to 25, plannable for this group size, though with slightly less simultaneous station capacity than Premium.
Total price: {PRICE_venue3} €
- Arena, VR rooms and driving simulators
- Both lounge areas
- 3 attractions per person
- 3 soft drinks per person, fruits and vegetables
- Snacks, decoration, moderator

Could you let me know which option works best for your team and what time you would like to start? We will then reserve the slot for you.

{SIGNOFF}`},
{id:'b2b_en_o2',label:'Budget clear / premium chosen',stage:'offer',
ms:'Premium sounds right / large group / budget is clearly set / exclusive experience wanted',
mirrors:[
'Since you are planning an exclusive event for your group, we confirm the Premium format as the right choice and have put together two options for you.',
'For a group of around {GROUP} people and your preference for an exclusive experience, we would clearly recommend our Premium format.',
'Since exclusive use of the entire venue is the priority, we have prepared two Premium options for your group.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply.

{MIRROR}

Premium · 3 hours
The format that gives teams of this size the right balance of activity, energy and focus, no waiting time, no rotation, with a team dedicated entirely to your event.
Total price: {PRICE_prem3} €
Most frequently chosen by teams for exclusive events.
- Entire venue exclusively yours
- All stations running simultaneously
- Unlimited attractions per person
- Company branding on all screens
- Photo and video session
- Prize for the winning team
- Dedicated event moderation team

If you would like more time and a full catering package:

Premium · 4 hours
Same flow as the 3-hour option, with more room for breaks, informal interaction and a catering package that requires no further coordination.
Total price: {PRICE_prem4} €
Everything above, plus:
- Pizza for all participants
- Unlimited soft drinks, fruits and vegetables

Could you let me know which option works best and what time you would like to start?

{SIGNOFF}`},
{id:'b2b_en_o3',label:'Budget open / Venue Booking sounds right',stage:'offer',
ms:'Venue Booking sounds right / mid-range budget / open to full picture',
mirrors:[
'Since you are considering the Venue Booking format, we have put together three suitable options for your group that differ in duration and content per person.',
'For a group of around {GROUP} people and your preference for the Venue Booking format, we recommend the 3-hour option as the ideal starting point.',
'Based on your details we have compared the three Venue Booking options and prepared a clear recommendation for your group.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. That helps a lot with the planning.

{MIRROR}

For your event on {DATE}, the following options would work well:

Venue Booking · 3 hours
More time per station, more attractions per person and additional extras. For groups of this size this option offers the best balance of activity, content and event duration. The longer format significantly reduces waiting time during station rotations.
Total price: {PRICE_venue3} €
Most frequently chosen by teams in this format.
- Arena, VR rooms and driving simulators
- Both lounge areas
- 3 attractions per person
- 3 soft drinks per person, fruits and vegetables
- Snacks, decoration, moderator

Same station setup, in a more compact time frame with reduced content per person:

Venue Booking · 2 hours
Identical station setup in a slightly more compact time frame with reduced content per person. A good fit when the event needs to fit into a tighter schedule.
Total price: {PRICE_venue2} €
- Arena, VR rooms and driving simulators
- Both lounge areas
- 2 attractions per person
- 2 soft drinks per person
- Snacks, decoration, moderator

If you would like to keep the event even more compact:

Venue Booking · 1.5 hours
Entry option with full station setup and structured flow. Recommended when time is limited or the event is part of a larger day schedule.
Total price: {PRICE_venue15} €
- Arena, VR rooms and driving simulators
- Both lounge areas
- 1 attraction per person
- 1 soft drink per person
- Snacks, decoration, moderator

Could you let me know which option works best and what time you would like to start?

{SIGNOFF}`},
{id:'b2b_en_o4',label:'Budget clear / Venue Booking only',stage:'offer',
ms:'Venue Booking sounds right / budget is clearly defined / no upgrade expected',
mirrors:[
'Since you are considering the Venue Booking format, we have put together the three options with a clear recommendation for your group.',
'Based on your details we have compared three Venue Booking options, from the compact entry to the most complete option.',
'For your group I have prepared the three Venue Booking tiers with their respective contents and a clear recommendation.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. That helps a lot with the planning.

{MIRROR}

All three options use the same station setup with parallel operation, arena, VR rooms and simulators run simultaneously. The difference is in the event duration and content per person.

For your event on {DATE}:

Venue Booking · 3 hours
More time per station, more attractions and extras per person. For teams who want a complete experience without compromise, this is the best starting point.
Total price: {PRICE_venue3} €
Most frequently chosen by teams in this format.
- Arena, VR rooms and driving simulators
- Both lounge areas
- 3 attractions per person
- 3 soft drinks per person, fruits and vegetables
- Snacks, decoration, moderator

Same station setup, in a more compact time frame:

Venue Booking · 2 hours
Identical setup, slightly less time per station and reduced content per person.
Total price: {PRICE_venue2} €
- 2 attractions per person, 2 soft drinks, snacks, decoration, moderator

If you would like to keep the event even more compact:

Venue Booking · 1.5 hours
Entry option with full station setup and structured flow.
Total price: {PRICE_venue15} €
- 1 attraction per person, 1 soft drink, snacks, decoration, moderator

Could you let me know which option works best?

{SIGNOFF}`},
{id:'b2b_en_o5',label:'Arena inquiry / budget open for upgrade',stage:'offer',
ms:'Interested in Arena Event / budget available / open to Venue Booking recommendation',
mirrors:[
'Since you are considering the Arena Event, we would like to briefly explain which format provides a significantly more active flow for a group of {GROUP} people.',
'Based on your Arena Event inquiry, we have compared two formats and prepared a recommendation that is better suited to your group size.',
'Since you are planning an arena-based event, we would like to introduce an option that eliminates waiting time and keeps all participants active throughout for a group of this size.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. That helps a lot with the planning.

{MIRROR}

With the Arena Event, only one station is in use. For this group size, this can lead to longer waiting times and fewer simultaneous activities. The Venue Booking options run all stations in parallel, keeping all participants active throughout and significantly reducing waiting time.

For your event on {DATE}:

Venue Booking · 2 hours
Combination of arena, VR stations and simulators all running simultaneously. All participants stay active throughout and waiting time is minimised.
Total price: {PRICE_venue2} €
- Arena, VR rooms and driving simulators
- Both lounge areas
- 2 attractions per person
- 2 soft drinks per person
- Snacks, decoration, moderator

Same parallel station setup, in a more compact time frame:

Venue Booking · 1.5 hours
Identical setup with slightly less time per station.
Total price: {PRICE_venue15} €
- 1 attraction per person, 1 soft drink, snacks, decoration, moderator

If you would like to keep the budget compact:

Arena Event · 3 hours
Focus on arena gameplay. Please note that only the arena is in use in this format and for this group size, longer waiting times and fewer simultaneous activities can occur.
Total price: {PRICE_arena3} €
- Private arena, lounge, 2 attractions per person, 2 soft drinks, fruits and vegetables, snacks, decoration, moderator

Could you let me know which option works best?

{SIGNOFF}`},
{id:'b2b_en_o6',label:'Budget is main concern / Arena only',stage:'offer',
ms:'Budget is main factor / Arena preferred / no upgrade expected',
mirrors:[
'Since you are looking for the most cost-efficient option for your group, we have compared three Arena Event options with a clear recommendation.',
'Based on your budget focus, we have put together three Arena options that all offer a clear value structure.',
'Since you would like to keep the budget compact, here are three Arena Event options that differ in duration and content per person.'
],
subject:'Your event at Varpoint, Offer for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. That helps a lot with the planning.

{MIRROR}

All options include exclusive arena access, lounge, decoration, snacks and an on-site moderator.

For your event on {DATE}:

Arena Event · 3 hours
More time per person, relaxed rotations and the highest content per person. Best choice when focused arena gameplay should clearly be the centrepiece of the event.
Total price: {PRICE_arena3} €
Most frequently chosen by teams in this format.
- Private arena, lounge, 2 attractions per person, 2 soft drinks, fruits and vegetables, snacks, decoration, moderator

Same exclusive setup, more compact time frame:

Arena Event · 2 hours
One attraction and one soft drink per person included. A good fit when the time frame is tighter.
Total price: {PRICE_arena2} €
- Private arena, lounge, 1 attraction per person, 1 soft drink, snacks, decoration, moderator

Compact entry option without included attractions:

Arena Event · 1.5 hours
Full arena access and a structured flow. No included attractions or drinks, but the same exclusive private setup.
Total price: {PRICE_arena15} €
- Private arena, lounge, decoration, snacks, moderator

Could you let me know which option works best and what time you would like to start?

{SIGNOFF}`}
],
slot:[
{id:'b2b_en_s1',availabilityModes:['available','partial'],label:'Slot available ✓',stage:'slot',ms:'Package confirmed / start time still open / slot is free',mirrors:[],
subject:'Your slot at Varpoint, {DATE}',
body:`Hi {NAME},

thank you for your reply. Your requested date is available.

{DATE}, {DAY}  {WINDOW}

You can freely choose your start time within the available window.

To confirm the reservation for your team, I just need your preferred start time. Please feel free to send a quick reply.

{SIGNOFF}`},
{id:'b2b_en_s2',availabilityModes:['available','partial','unavailable'],label:'Slot partially available ⚠',stage:'slot',ms:'Package confirmed / limited window on requested date',mirrors:[],
subject:'Your slot at Varpoint, {DATE}',
body:`Hi {NAME},

thank you for your reply. For your requested date, we only have a limited time window available.

Available window:
{DATE}, {DAY}  {WINDOW}

Alternatively, I can offer the following date:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW}

You can freely choose your start time within the available windows.

Which date works better for your team? I will then confirm the reservation for you.

{SIGNOFF}`},
{id:'b2b_en_s3',availabilityModes:['partial','unavailable'],label:'Date fully booked ✗',stage:'slot',ms:'Package confirmed / requested date fully booked',mirrors:[],
subject:'Your slot at Varpoint, Alternative dates',
body:`Hi {NAME},

thank you for your reply. Unfortunately {DATE} is already fully booked.

I would like to offer the following alternatives:

Option 1:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW}

Option 2:
{ALT2_DATE}, {ALT2_DAY}  {ALT2_WINDOW}

You can freely choose your start time within the available windows.

Does one of these work for your team? I will then confirm the reservation right away.

{SIGNOFF}`}
],
booked:[
{id:'b2b_en_b1',label:'Booking Confirmation',stage:'booked',ms:'',mirrors:[],
subject:'Your booking confirmation, {DATE} at Varpoint',
body:`Hi {NAME},

thank you for your confirmation. Please find your booking details below:

- Date: {DAY}, {DATE}
- Time: {TIME}
- Number of people: {GROUP}
- Selected package: {PACKAGE}
- Total price: {PRICE_SELECTED} €

Package contents:
{PKG_CONTENTS}

{ANZ}

If you have any questions or additional requests, please do not hesitate to reach out.

We look forward to welcoming your team.

{SIGNOFF}`}
],
other:[
{id:'b2b_en_x1',label:'Price too high / budget limited',stage:'other',ms:'Price too high / budget limited / needs a more affordable option',
mirrors:['Thank you for the honest feedback. I have looked at what options are available for your group at a different price point.','I understand, let me briefly show you what is possible in a more compact format for your group.'],
subject:'Your event at Varpoint, Alternative options',
body:`Hi {NAME},

thank you for the honest feedback.

{MIRROR}

For {GROUP} people on {DATE}, the Arena Event would be a more compact alternative:

Arena Event · 3 hours, Total price: {PRICE_arena3} €
Exclusive arena, lounge, decoration, snacks, moderator, 2 attractions and 2 soft drinks per person.

Arena Event · 2 hours, Total price: {PRICE_arena2} €
Same setup, one attraction and one soft drink per person.

The difference from Venue Booking: with the Arena Event only the arena is in use. For groups primarily looking for arena gameplay this is a solid choice.

Which option comes closest? I will put together the final offer for you.

{SIGNOFF}`},
{id:'b2b_en_x2',label:'Follow-up · No response',stage:'other',ms:'No feedback after offer / follow-up needed',mirrors:[],
subject:'Your event at Varpoint, Quick check-in',
body:`Hi {NAME},

I just wanted to check whether you have any questions about the options or whether I can send you any further details.

The slot on {DATE} is still available. Once I have your confirmation we will reserve it for your team.

Feel free to get in touch if there is anything else you need.

{SIGNOFF}`}
]
}
},
b2c:{
de:{
discovery:[
{id:'b2c_de_d1',label:'Geburtstag / Geburtstagsfeier',stage:'discovery',
ms:'Geburtstag / Kindergeburtstag / {GROUP} Pers. am {DATE}',
mirrors:[
'Für einen Geburtstag mit {GROUP} Personen am {DATE}, ich stelle euch kurz unsere Formate vor, damit ihr sehen könnt was am besten zu eurer Gruppe passt.',
'Ein Geburtstag mit {GROUP} Personen am {DATE}, für private Feiern haben wir verschiedene Formate die sich in Erlebnistyp und Umfang unterscheiden. Ich fasse kurz zusammen was am besten passt.',
'Für euren Geburtstag am {DATE} mit {GROUP} Personen, je nachdem ob ihr gemeinsam spielen oder eher verschiedene Stationen ausprobieren möchtet, kommen zwei sehr unterschiedliche Formate in Frage.'
],
subject:'Dein Event bei Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

vielen Dank für deine Nachricht.

{MIRROR}

Arena Event · ab {PRICE_bronze} €
Die Gruppe spielt gemeinsam in Teams in unserer VR-Arena, vergleichbar mit Paintball oder Lasertag, vollständig in Virtual Reality mit über 20 Arenen. Alle tragen Oculus Quest 3 Headsets und können sich gegenseitig sehen und interagieren. Moderator durchgehend dabei. Private Arena, Lounge, Dekoration, Snacks und PlayStation inklusive. Bis zu 10 Personen.

Dieses Format ist das richtige wenn alle gemeinsam in derselben virtuellen Welt spielen und Teams gegeneinander antreten sollen.

VR Room Event · ab {PRICE_starter} €
3 separate VR-Räume mit über 100 Spielen auf Gaming-PCs, 2 Rennsimulatoren und 2 PlayStation-Stationen, alle laufen gleichzeitig. Lounge, Dekoration und Snacks inklusive. Bis zu 10 Personen.

Dieses Format ist das richtige wenn ihr möglichst viele verschiedene Erlebnisse ausprobieren möchtet und jeder etwas anderes spielen soll.

Der Unterschied in einem Satz: Beim Arena Event spielt die gesamte Gruppe gemeinsam in derselben virtuellen Welt. Beim VR Room Event erkundet jeder gleichzeitig eine andere Spielwelt.

Welches Format klingt interessanter für euch, und wie lange soll das Event dauern?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2c_de_d2',label:'Mit Freunden feiern / Gruppentreff',stage:'discovery',
ms:'Freundesgruppe / Gruppentreff / Spaß / {GROUP} Pers. am {DATE}',
mirrors:[
'Für einen Gruppentreff mit {GROUP} Personen am {DATE}, ich zeige euch kurz unsere Formate damit ihr sehen könnt was am besten zu eurer Gruppe passt.',
'Ein Event mit Freunden, {GROUP} Personen am {DATE}, je nachdem was ihr euch vorgestellt habt, kommen zwei sehr unterschiedliche Formate in Frage.',
'Für euren gemeinsamen Ausflug am {DATE} mit {GROUP} Personen stelle ich euch kurz die beiden Hauptformate vor.'
],
subject:'Dein Event bei Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

vielen Dank für deine Nachricht.

{MIRROR}

Arena Event · ab {PRICE_bronze} €
Gemeinsames Team-VR-Gameplay, vergleichbar mit Paintball oder Lasertag, vollständig in Virtual Reality. Alle spielen zusammen in derselben Arena, sehen sich gegenseitig und treten in Teams gegeneinander an. Moderator, private Arena, Lounge, Dekoration und Snacks inklusive. Bis zu 10 Personen.

VR Room Event · ab {PRICE_starter} €
3 VR-Räume mit über 100 Spielen, 2 Rennsimulatoren und 2 PlayStation, alle laufen gleichzeitig. Mehr Abwechslung, jeder spielt was ihn interessiert. Lounge und Snacks inklusive. Bis zu 10 Personen.

Kurze Entscheidungshilfe: Wollt ihr alle gemeinsam in derselben virtuellen Welt spielen → Arena Event. Soll jeder möglichst viele verschiedene Erlebnisse ausprobieren → VR Room Event.

Welches Format klingt interessanter, und wie lange soll das Event dauern?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2c_de_d3',label:'Allgemeine Anfrage / Format offen',stage:'discovery',
ms:'Allgemeine Anfrage / kein klarer Anlass / Format offen',
mirrors:[
'Ich habe mir angesehen was wir für eure Gruppe anbieten können und gebe euch gerne einen Überblick über unsere Formate.',
'Schön dass ihr Interesse habt, ich stelle euch kurz die verschiedenen Formate vor, damit ihr sehen könnt was am besten zu eurer Gruppe passt.',
'Für euer Event haben wir verschiedene Formate je nach gewünschtem Erlebnis und Gruppengröße. Hier ein kurzer Überblick.'
],
subject:'Dein Event bei Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

vielen Dank für deine Nachricht.

{MIRROR}

Arena Play · 28 €/Std. pro Person
Geteilte Arena ohne privates Setup. Geeignet für sehr kleine Gruppen oder spontane Besuche.

Arena Event · ab {PRICE_bronze} €
Die Gruppe spielt gemeinsam in Teams in unserer VR-Arena, wie Paintball oder Lasertag, vollständig in Virtual Reality. Moderator, private Arena, Lounge, Dekoration, Snacks und PlayStation inklusive. Bis zu 10 Personen.

VR Room Event · ab {PRICE_starter} €
3 VR-Räume mit über 100 Spielen, 2 Rennsimulatoren und 2 PlayStation, alle gleichzeitig. Lounge, Dekoration und Snacks inklusive. Bis zu 10 Personen.

Der Unterschied: Beim Arena Event spielt die gesamte Gruppe gemeinsam in derselben virtuellen Welt. Beim VR Room Event erkundet jeder eine andere Spielwelt gleichzeitig.

Welches Format klingt interessanter für euch, und wie lange soll das Event dauern?

{PHOTO_NOTE}

{SIGNOFF}`}
],
offer:[
{id:'b2c_de_o1',label:'Arena Event gewählt / Teamspiel',stage:'offer',
ms:'Arena Event gewählt / Teamspiel / Paintball-Feeling / gemeinsames Erlebnis',
mirrors:[
'Da euch das gemeinsame Teamspiel in der VR-Arena wichtig ist, ist das Arena Event genau das Richtige für eure Gruppe.',
'Das Arena Event ist für genau das konzipiert, was ihr sucht: Teams treten gegeneinander an, alle sind gleichzeitig aktiv in derselben virtuellen Welt, ein Moderator begleitet das Spiel von Anfang bis Ende.',
'Für ein Erlebnis bei dem alle gemeinsam in derselben virtuellen Welt spielen und direkt gegeneinander antreten, ist das Arena Event die beste Wahl.',
'Auf Basis eurer Gruppengröße und dem gewünschten Erlebnistyp habe ich die Arena Event Optionen für euch zusammengestellt.'
],
subject:'Dein Event bei Varpoint, Optionen für {GROUP} Personen',
body:`Hi {NAME},

vielen Dank für deine Antwort. Für eine Gruppe von {GROUP} Personen am {DATE} um {TIME} Uhr empfehle ich folgende Optionen.

{MIRROR}

Arena Event Gold · 2,5 Stunden
Das vollständigste Arena Event Paket, die meiste Zeit, die meisten Attraktionen und der beste Inhalt pro Person. Genug Zeit für echte Team-Battles in über 20 virtuellen Arenen, entspannte Rotationen zwischen den Spielen und VR-Attraktionen, die das Erlebnis weit über normales Gaming hinaus heben.
Gesamtpreis: {PRICE_gold} €
Unser beliebtestes Paket für Geburtstage und Gruppenevents.
- Private Arena, Lounge, Dekoration, Snacks, PlayStation, Moderator
- 3 VR-Attraktionen pro Person (Achterbahn, Wildwasserfahrt, Fliegen oder Unterwasserabenteuer)
- 2 Softdrinks pro Person
- Früchte und Gemüse

Gleicher Rahmen, etwas weniger Zeit und eine Attraktion pro Person:

Arena Event Silver · 2 Stunden
Gleicher privater Rahmen wie Gold, mit etwas weniger Zeit und einer Attraktion pro Person statt drei. Gut geeignet wenn das Budget oder die Dauer begrenzt ist.
Gesamtpreis: {PRICE_silver} €
- Private Arena, Lounge, Dekoration, Snacks, PlayStation, Moderator
- 1 VR-Attraktion pro Person (Achterbahn, Wildwasserfahrt, Fliegen oder Unterwasserabenteuer)
- 1 Softdrink pro Person

Kompakter Einstieg ohne inkludierte Attraktionen:

Arena Event Bronze · 1,5 Stunden
60 Minuten VR-Arena-Gameplay ohne inkludierte Attraktionen. Gleiche private Arena-Ausstattung mit Lounge, Deko und Moderator.
Gesamtpreis: {PRICE_bronze} €
- Private Arena, Lounge, Dekoration, Snacks, PlayStation, Moderator

Bei Gruppen zwischen 11 und 15 Personen gilt ein Personenzuschlag zum gleichen Stufentarif.

Kannst du mir die genaue Personenzahl und deine gewünschte Startzeit bestätigen? Dann halte ich den Termin für euch fest.

{SIGNOFF}`},
{id:'b2c_de_o2',label:'VR Room Event gewählt / Abwechslung',stage:'offer',
ms:'VR Room Event gewählt / Abwechslung / individuelle Stationen / verschiedene Genres',
mirrors:[
'Da ihr nach einem Erlebnis mit viel Abwechslung und verschiedenen Spielmöglichkeiten sucht, ist das VR Room Event genau das Richtige.',
'Das VR Room Event bietet genau das, was ihr sucht: 3 separate VR-Räume (je 1 Person) mit über 100 Spielen, 2 Rennsimulatoren und 2 PlayStation-Stationen laufen alle gleichzeitig, ab Plus kommen VR-Attraktionen im Rotationsmodus dazu.',
'Für eine Gruppe die verschiedene VR-Erlebnisse und Spielgenres kombinieren möchte, ist das VR Room Event die beste Wahl.',
'Auf Basis eurer Gruppe habe ich die VR Room Event Optionen zusammengestellt.'
],
subject:'Dein Event bei Varpoint, Optionen für {GROUP} Personen',
body:`Hi {NAME},

vielen Dank für deine Antwort. Für eine Gruppe von {GROUP} Personen am {DATE} um {TIME} Uhr passt das VR Room Event sehr gut.

{MIRROR}

VR Room Event Pro · 2,5 Stunden
Das vollständigste VR Room Event Paket, mit über 100 Spielen aus den Bereichen Shooter, Fantasy, Missionen, Sport und mehr auf leistungsstarken Gaming-PCs, 3 VR-Räumen, 2 Rennsimulatoren und 2 PlayStation-Stationen. Genug Zeit um wirklich in verschiedene Welten einzutauchen und alle Stationen ausgiebig zu nutzen.
Gesamtpreis: {PRICE_pro} €
Unser beliebtestes VR Room Paket.
- 3 VR-Räume (je 1 Person), 2 Rennsimulatoren, 2 PlayStation, Lounge, Dekoration, Snacks
- 3 VR-Attraktionen pro Person (Achterbahn, Wildwasserfahrt, Fliegen, Unterwasserabenteuer)
- 2 Softdrinks pro Person
- Früchte und Gemüse
- Bis zu 10 Personen aktiv

Gleicher Aufbau, eine Attraktion statt drei:

VR Room Event Plus · 2 Stunden
Identischer Stationsaufbau wie Pro. Eine Attraktion pro Person statt drei, ab 2 Personen laufen die Attraktionen im Rotationsmodus (Wechsel alle 3 to 5 Min., freie Einteilung untereinander).
Gesamtpreis: {PRICE_plus} €
- Alles wie oben, plus 1 VR-Attraktion/Person, 1 Softdrink/Person

Einstiegsoption ohne inkludierte Attraktionen (bis 7 Pers.):

VR Room Event Starter · 1 Stunde
Voller Zugang zu allen VR-Stationen ohne inkludierte Attraktionen. Bis zu 7 Personen gleichzeitig aktiv.
Gesamtpreis: {PRICE_starter} €
- 3 VR-Räume, 2 Rennsimulatoren, 2 PlayStation, Lounge, Dekoration, Snacks
- Bis zu 7 Personen

Falls ihr lieber alle gemeinsam in derselben virtuellen Arena spielen möchtet, vergleichbar mit Paintball oder Lasertag in VR: Das Arena Event Gold ist für {PRICE_gold} € und 2,5 Stunden ebenfalls verfügbar, mit 3 Attraktionen, 2 Softdrinks, Früchten, Lounge und Moderator.

Kannst du mir die genaue Personenzahl und deine gewünschte Startzeit bestätigen?

{SIGNOFF}`},
{id:'b2c_de_o3',label:'Kleine Gruppe / Budget / Private Arena',stage:'offer',
ms:'Kleine Gruppe / Budget ist Thema / Private Arena oder Einzeleintritt gesucht',
mirrors:[
'Da ihr ausschließlich Arena-Gameplay ohne zusätzliches Event-Setup sucht, ist die Private Arena die direkteste und günstigste Option.',
'Ich habe mir angesehen, welche Option für eure Gruppe am besten passt, und gehe der Reihe nach vom günstigsten Einstieg bis zur vollständigen Option.',
'Abhängig davon, wie viel Setup und Extras ihr möchtet, gibt es drei sehr unterschiedliche Preispunkte.'
],
subject:'Dein Event bei Varpoint, Optionen für {GROUP} Personen',
body:`Hi {NAME},

vielen Dank für deine Antwort.

{MIRROR}

Einzeleintritt · 28 €/Std. pro Person
Flexibler Stundenzugang zur geteilten Arena ohne privates Setup. Am besten geeignet für spontane Besuche oder sehr kleine Gruppen ohne Event-Charakter.
- Geteilte Arena, kein privates Setup

Private Arena · {PRICE_priv} €
Die Arena gehört für eine Stunde exklusiv eurer Gruppe. Teams spielen gemeinsam in über 20 virtuellen Arenen gegeneinander, vergleichbar mit Paintball oder Lasertag in VR. Alle können sich gegenseitig sehen und interagieren. Kein Lounge-Bereich oder Dekoration, aber eine klare private Session zum Festpreis, unabhängig davon, wie viele Personen teilnehmen (bis zu 10).
- Private Arena exklusiv für eure Gruppe
- Kein Lounge-Bereich, keine Dekoration, keine Attraktionen

Das vollständige Erlebnis mit Event-Setup:

Arena Event Gold · {PRICE_gold} €
Das vollständige private Event, mit Lounge, Moderator, VR-Attraktionen, Getränken und Catering.
- 2,5h VR-Arena-Teamgameplay mit Moderator
- 3 VR-Attraktionen pro Person
- 2 Softdrinks, Früchte und Gemüse
- Private Arena, Lounge, Dekoration, Snacks, PlayStation

Kannst du mir die genaue Personenzahl und deine gewünschte Startzeit bestätigen?

{SIGNOFF}`},
{id:'b2c_de_o4',label:'Kindergeburtstag / Elternansprache',stage:'offer',
ms:'Elternteil fragt für Kindergeburtstag: Sicherheit / Alterseignung / was die Kinder erleben',
mirrors:[
'Damit die Kinder einen unvergesslichen Geburtstag erleben, habe ich die passenden Optionen für eure Gruppe zusammengestellt.',
'Für einen Kindergeburtstag mit {GROUP} Kindern haben wir genau das Richtige, alle Erlebnisse sind altersgerecht und werden durchgehend von einem Moderator begleitet.',
'Ich habe mir angesehen, was für Kinder in dieser Altersgruppe am besten funktioniert, und stelle euch drei Optionen vor.'
],
subject:'Geburtstag von {CHILD_NAME} bei Varpoint, Optionen',
body:`Hi {NAME},

vielen Dank für deine Nachricht. Für den Geburtstag von {CHILD_NAME} am {DATE} habe ich die passenden Optionen zusammengestellt.

{MIRROR}

Alle Erlebnisse sind altersgerecht und werden durchgehend von einem Moderator begleitet. Das Mindestalter für den VR Room Bereich beträgt 6 Jahre.

Arena Event Gold · 2,5 Stunden
Das beliebteste Geburtstagspaket bei Familien. Die Kinder spielen gemeinsam in Teams in der VR-Arena, vergleichbar mit Paintball oder Lasertag, aber vollständig sicher in Virtual Reality. Dazu kommen VR-Attraktionen wie Achterbahn oder Fliegen, die jedes für sich schon ein Highlight sind. Der Moderator begleitet das gesamte Event und sorgt für einen reibungslosen, spaßigen Ablauf.
Gesamtpreis: {PRICE_gold} €
Beliebtestes Paket bei Kindergeburtstagen.
- Private Arena, Lounge, Dekoration, Snacks, PlayStation, Moderator
- 3 VR-Attraktionen pro Kind (Achterbahn, Wildwasserfahrt, Fliegen oder Unterwasserabenteuer)
- 2 Softdrinks pro Kind
- Früchte und Gemüse

Gleicher Rahmen, etwas weniger Zeit und eine Attraktion pro Kind:

Arena Event Silver · 2 Stunden
Gleicher Event-Rahmen wie Gold. Etwas weniger Zeit und eine Attraktion pro Kind statt drei. Gut geeignet wenn das Budget etwas enger ist.
Gesamtpreis: {PRICE_silver} €
- Alles wie oben, jedoch 1 VR-Attraktion pro Kind, 1 Softdrink pro Kind

Kompakter Einstieg ohne inkludierte Attraktionen:

Arena Event Bronze · 1,5 Stunden
60 Minuten gemeinsames Arena-Gameplay. Kein inkludierter Inhalt pro Kind, aber derselbe private Event-Rahmen mit Lounge, Deko und Moderator. Gut geeignet für jüngere Kinder oder wenn eine kürzere Session gewünscht wird.
Gesamtpreis: {PRICE_bronze} €
- Private Arena, Lounge, Dekoration, Snacks, PlayStation, Moderator

Kannst du mir die genaue Kinderanzahl und deine gewünschte Startzeit bestätigen? Dann halte ich den Termin fest und schicke dir die Buchungsbestätigung.

{SIGNOFF}`}
],
slot:[
{id:'b2c_de_s1',availabilityModes:['available','partial'],label:'Termin verfügbar ✓',stage:'slot',ms:'Paket bestätigt / Startzeit noch offen / Termin frei',mirrors:[],
subject:'Dein Termin bei Varpoint, {DATE}',
body:`Hi {NAME},

vielen Dank für deine Rückmeldung. Dein Wunschtermin ist verfügbar.

{DATE}, {DAY}  {WINDOW} Uhr

Du kannst innerhalb des Zeitfensters die Startzeit frei wählen.

Damit ich den Termin verbindlich für euch reservieren kann, benötige ich noch deine gewünschte Startzeit, und falls noch nicht angegeben, die genaue Personenzahl.

Melde dich gerne kurz.

{SIGNOFF}`},
{id:'b2c_de_s2',availabilityModes:['available','partial','unavailable'],label:'Termin teilweise verfügbar ⚠',stage:'slot',ms:'Paket bestätigt / Wunschtermin nur teilweise frei',mirrors:[],
subject:'Dein Termin bei Varpoint, {DATE}',
body:`Hi {NAME},

vielen Dank für deine Rückmeldung. An deinem Wunschtermin haben wir leider nur noch ein eingeschränktes Zeitfenster verfügbar.

Verfügbares Zeitfenster:
{DATE}, {DAY}  {WINDOW} Uhr

Alternativ kann ich dir folgenden Termin anbieten:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW} Uhr

Du kannst innerhalb der Zeitfenster die Startzeit frei wählen.

Welcher Termin passt besser? Ich halte ihn dann verbindlich für euch fest.

{SIGNOFF}`},
{id:'b2c_de_s3',availabilityModes:['partial','unavailable'],label:'Termin ausgebucht ✗',stage:'slot',ms:'Paket bestätigt / Wunschtermin ausgebucht',mirrors:[],
subject:'Dein Termin bei Varpoint, Alternative Termine',
body:`Hi {NAME},

vielen Dank für deine Rückmeldung. Der {DATE} ist leider bereits ausgebucht.

Gerne biete ich dir folgende Alternativen an:

Option 1:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW} Uhr

Option 2:
{ALT2_DATE}, {ALT2_DAY}  {ALT2_WINDOW} Uhr

Du kannst innerhalb der Zeitfenster die Startzeit frei wählen.

Passt einer dieser Termine? Dann halte ich ihn verbindlich für euch fest.

{SIGNOFF}`}
],
booked:[
{id:'b2c_de_b1',label:'Buchungsbestätigung',stage:'booked',ms:'',mirrors:[],
subject:'Deine Buchungsbestätigung, {DATE} bei Varpoint',
body:`Hi {NAME},

vielen Dank für deine Bestätigung. Gerne bestätige ich hiermit deine Buchung:

- Datum: {DAY}, {DATE}
- Uhrzeit: {TIME} Uhr
- Personenzahl: {GROUP} Personen
- Gewähltes Paket: {PACKAGE}
- Gesamtpreis: {PRICE_SELECTED} €

Paketinhalt:
{PKG_CONTENTS}

{ANZ}

Solltest du noch Fragen haben oder besondere Wünsche bestehen, melde dich gerne jederzeit.

Wir freuen uns darauf, dich und deine Gäste bei uns begrüßen zu dürfen.

{SIGNOFF}`}
],
other:[
{id:'b2c_de_x1',label:'Preis zu hoch / Budget begrenzt',stage:'other',ms:'Preis zu hoch / Budget begrenzt / günstigere Option gesucht',
mirrors:['Vielen Dank für deine ehrliche Rückmeldung. Ich habe mir angesehen, welche Option in einem anderen Preisrahmen für euch passt.'],
subject:'Dein Event bei Varpoint, Alternative Optionen',
body:`Hi {NAME},

vielen Dank für deine ehrliche Rückmeldung.

{MIRROR}

Die Private Arena startet bei {PRICE_priv} € für bis zu 10 Personen, exklusiver Arena-Zugang ohne Lounge oder Dekoration, aber zum Festpreis.

Das Arena Event Bronze gibt es ab {PRICE_bronze} €, mit Lounge, Dekoration, Snacks und Moderator für 1,5 Stunden.

Welche klingt passender? Ich stelle dann das finale Angebot zusammen.

{SIGNOFF}`},
{id:'b2c_de_x2',label:'Kein Feedback nach Angebot',stage:'other',ms:'Kein Feedback nach Angebot / Follow-up',mirrors:[],
subject:'Dein Event bei Varpoint, Kurze Rückmeldung',
body:`Hi {NAME},

ich wollte kurz nachfragen, ob du noch Fragen zu den Optionen hast oder ob ich dir weitere Details schicken soll.

Der Termin am {DATE} ist noch verfügbar. Sobald ich deine Bestätigung habe, halte ich ihn verbindlich für euch fest.

{SIGNOFF}`},
{id:'b2c_de_x3',label:'Nachfass / Kindergeburtstag',stage:'other',ms:'Kein Feedback nach Kindergeburtstag-Angebot',mirrors:[],
subject:'Dein Event bei Varpoint, Kurze Rückmeldung',
body:`Hi {NAME},

ich wollte kurz nachfragen, ob noch Fragen zum Geburtstagsevent offen sind oder ob ich dir weitere Infos schicken soll.

Der {DATE} Termin ist noch frei. Für eine Reservierung benötige ich nur deine kurze Bestätigung.

Ich freue mich darauf, für {CHILD_NAME} ein unvergessliches Erlebnis zu gestalten.

{SIGNOFF}`}
]
},
en:{
discovery:[
{id:'b2c_en_d1',label:'Birthday / birthday party',stage:'discovery',
ms:'Birthday / kids birthday / {GROUP} people on {DATE}',
mirrors:[
'For a birthday with {GROUP} people on {DATE}, let me briefly walk you through our formats so you can see what fits your group best.',
'A birthday celebration with {GROUP} people on {DATE}, depending on whether you want everyone playing together or exploring different stations, two very different formats come into consideration.',
'For your birthday on {DATE} with {GROUP} people, I will give you a quick overview of the two main formats and the key difference between them.'
],
subject:'Your event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for your message.

{MIRROR}

Arena Event · from {PRICE_bronze} €
The group plays together in teams in our VR arena, comparable to paintball or laser tag, entirely in virtual reality with 20+ arenas. Everyone wears Oculus Quest 3 headsets and can see and interact with each other. Moderator throughout. Private arena, lounge, decoration, snacks and PlayStation included. Up to 10 people.

This format is the right choice when everyone wants to play together in the same virtual world.

VR Room Event · from {PRICE_starter} €
3 separate VR rooms with 100+ games on gaming PCs, 2 racing simulators and 2 PlayStation stations, all running simultaneously. Lounge, decoration and snacks included. Up to 10 people.

This format is the right choice when the group wants to explore as many different experiences as possible, with each person playing something different.

The difference in one sentence: with the Arena Event the whole group plays together in the same virtual world. With the VR Room Event each person explores a different gaming world at the same time.

Which format sounds more interesting, and how long are you thinking for the event?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2c_en_d2',label:'Friends group / social outing',stage:'discovery',
ms:'Friends group / social outing / fun / {GROUP} people on {DATE}',
mirrors:[
'For a group outing with {GROUP} people on {DATE}, let me briefly show you the formats so you can see what fits best.',
'An event with friends, {GROUP} people on {DATE}, depending on what you have in mind, two very different formats come into consideration.',
'For your day out on {DATE} with {GROUP} people, let me quickly walk you through the two main options.'
],
subject:'Your event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for your message.

{MIRROR}

Arena Event · from {PRICE_bronze} €
Shared team VR gameplay, comparable to paintball or laser tag, entirely in virtual reality. Everyone plays together in the same arena, can see each other and compete in teams. Moderator, private arena, lounge, decoration and snacks included. Up to 10 people.

VR Room Event · from {PRICE_starter} €
3 VR rooms with 100+ games, 2 racing simulators and 2 PlayStation stations, all running simultaneously. More variety, each person plays what interests them. Lounge and snacks included. Up to 10 people.

Quick decision guide: if you want everyone playing together in the same virtual world → Arena Event. If you want everyone to try as many different experiences as possible → VR Room Event.

Which format sounds more interesting, and how long are you thinking?

{PHOTO_NOTE}

{SIGNOFF}`},
{id:'b2c_en_d3',label:'General inquiry / format open',stage:'discovery',
ms:'General inquiry / no clear occasion / format not defined',
mirrors:[
'Happy to give you a quick overview of our formats so you can see what fits your group best.',
'Great that you are interested, let me briefly walk you through the different formats so you can see what works best for your group size and what you have in mind.',
'For your event we have different formats depending on the experience you are looking for and your group size. Here is a quick overview.'
],
subject:'Your event at Varpoint',
body:`{AVAIL_NOTE}Hi {NAME},

thank you for your message.

{MIRROR}

Arena Play · €28/h per person
Shared arena without private setup. Best for spontaneous visits or very small groups.

Arena Event · from {PRICE_bronze} €
The group plays together in teams in our VR arena, like paintball or laser tag, entirely in virtual reality. Moderator, private arena, lounge, decoration, snacks and PlayStation included. Up to 10 people.

VR Room Event · from {PRICE_starter} €
3 VR rooms with 100+ games, 2 racing simulators and 2 PlayStation, all running simultaneously. Lounge, decoration and snacks included. Up to 10 people.

The difference: with the Arena Event the whole group plays together in the same virtual world. With the VR Room Event each person explores a different gaming world at the same time.

Which format sounds more interesting, and how long are you thinking for the event?

{PHOTO_NOTE}

{SIGNOFF}`}
],
offer:[
{id:'b2c_en_o1',label:'Arena Event chosen / team gameplay',stage:'offer',
ms:'Arena Event chosen / team gameplay / paintball feeling / shared experience',
mirrors:[
'Since team gameplay in the VR arena is important to you, the Arena Event is exactly the right choice for your group.',
'The Arena Event is designed for exactly what you are looking for: teams compete against each other, everyone is active in the same virtual world simultaneously, and a moderator runs the session from start to finish.',
'For an experience where everyone plays together in the same virtual world and competes directly against each other, the Arena Event is the best choice.',
'Based on your group size and the type of experience you are looking for, I have put together the Arena Event options for you.'
],
subject:'Your event at Varpoint, Options for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. For a group of {GROUP} people on {DATE} at {TIME}, here are the options I would recommend.

{MIRROR}

Arena Event Gold · 2.5 hours
The most complete Arena Event package, the most time, the most attractions and the best content per person. Enough time for real team battles in 20+ virtual arenas, relaxed rotations between games and VR Attractions that lift the experience far beyond regular gaming.
Total price: {PRICE_gold} €
Our most popular package for birthdays and group events.
- Private arena, lounge, decoration, snacks, PlayStation, moderator
- 3 VR Attractions per person (roller coaster, white water rafting, flying or underwater adventure)
- 2 soft drinks per person
- Fruits and vegetables

Same setup, slightly less time and one attraction per person:

Arena Event Silver · 2 hours
Same private setup as Gold, with slightly less time and one attraction per person instead of three. A good fit when budget or duration is limited.
Total price: {PRICE_silver} €
- Private arena, lounge, decoration, snacks, PlayStation, moderator
- 1 VR Attraction per person (in rotation mode from 2 people, swap every 3 to 5 min.)
- 1 soft drink per person

Compact entry option without included attractions:

Arena Event Bronze · 1.5 hours
60 minutes of VR arena gameplay without included attractions. Same private setup with lounge, decoration and moderator.
Total price: {PRICE_bronze} €
- Private arena, lounge, decoration, snacks, PlayStation, moderator

A supplement applies for groups of 11 to 15 people at the same tier rate.

Could you confirm the exact number of people and your preferred start time? We will then hold the slot for you.

{SIGNOFF}`},
{id:'b2c_en_o2',label:'VR Room Event chosen / variety',stage:'offer',
ms:'VR Room Event chosen / variety / individual stations / different genres',
mirrors:[
'Since you are looking for an experience with lots of variety and different gaming options, the VR Room Event is exactly the right choice.',
'The VR Room Event offers exactly what you are looking for: 3 separate VR rooms with 100+ games, 2 racing simulators and 2 PlayStation stations all running simultaneously, and from Plus, VR Attractions in rotation mode are added.',
'For a group that wants to combine different VR experiences and gaming genres in one event, the VR Room Event is the best choice.',
'Based on your group and what you are looking for, I have put together the VR Room Event options for you.'
],
subject:'Your event at Varpoint, Options for {GROUP} people',
body:`Hi {NAME},

thank you for your reply. For a group of {GROUP} people on {DATE} at {TIME}, the VR Room Event is a great fit. Here are the three tiers.

{MIRROR}

VR Room Event Pro · 2.5 hours
The most complete VR Room Event package, 100+ games across shooters, fantasy, missions and sport on high-performance gaming PCs, 3 VR rooms, 2 racing simulators and 2 PlayStation stations. Enough time to genuinely explore different worlds and make the most of every station.
Total price: {PRICE_pro} €
Our most popular VR Room package.
- 3 VR rooms (1 person per room), 2 racing simulators, 2 PlayStation, lounge, decoration, snacks
- 3 VR Attractions per person (roller coaster, white water rafting, flying or underwater adventure)
- 2 soft drinks per person
- Fruits and vegetables
- Up to 10 people active

Same setup, one attraction instead of three:

VR Room Event Plus · 2 hours
Identical station setup as Pro. One attraction per person instead of three, from 2 people the attractions run in rotation mode (swap every 3 to 5 min., free arrangement between participants).
Total price: {PRICE_plus} €
- Everything above, plus 1 VR Attraction/person, 1 soft drink/person

Entry option without included attractions (up to 7 people):

VR Room Event Starter · 1 hour
Full access to all VR stations without included attractions. Up to 7 people active simultaneously.
Total price: {PRICE_starter} €
- 3 VR rooms, 2 racing simulators, 2 PlayStation, lounge, decoration, snacks
- Up to 7 people

If you would prefer a format where everyone plays together in the same arena, comparable to paintball or laser tag in VR: the Arena Event Gold is available at {PRICE_gold} € for 2.5 hours, with 3 attractions, 2 drinks, fruits, private arena, lounge and moderator.

Could you confirm the exact number and your preferred start time?

{SIGNOFF}`},
{id:'b2c_en_o3',label:'Small group / budget / Private Arena',stage:'offer',
ms:'Small group / budget is a topic / looking for Private Arena or entry option',
mirrors:[
'Since you are primarily looking for arena gameplay without additional event setup, the Private Arena is the most direct and affordable option.',
'I have looked at which option fits your group best, going from the most affordable entry point to the full experience.',
'Depending on how much setup and extras you would like, there are three very different price points.'
],
subject:'Your event at Varpoint, Options for {GROUP} people',
body:`Hi {NAME},

thank you for your reply.

{MIRROR}

Single Entry · €28/h per person
Flexible hourly access to the shared arena without private setup. Best for spontaneous visits or very small groups without an event feel.
- Shared arena, no private setup

Private Arena · {PRICE_priv} €
The arena belongs exclusively to your group for one hour. Teams compete in 20+ virtual arenas, comparable to paintball or laser tag in VR. Everyone can see and interact with each other. No lounge or decoration, but a clean private session at a fixed price, regardless of headcount up to 10.
- Private arena exclusively for your group
- No lounge, no decoration, no attractions

The full experience with event setup:

Arena Event Gold · {PRICE_gold} €
The complete private event, with lounge, moderator, VR Attractions, drinks and snacks.
- 2.5h VR arena team gameplay with moderator
- 3 VR Attractions per person
- 2 soft drinks, fruits and vegetables
- Private arena, lounge, decoration, snacks, PlayStation

Could you confirm the exact number and your preferred start time?

{SIGNOFF}`},
{id:'b2c_en_o4',label:'Kids Birthday / Parent-facing',stage:'offer',
ms:'Parent asking for kids birthday: safety / age-appropriateness / what the children will experience',
mirrors:[
'To ensure the children have an unforgettable birthday, I have put together the right options for your group.',
'For a kids birthday with {GROUP} children, we have exactly the right thing, all experiences are age-appropriate and run by a dedicated moderator throughout.',
'I have looked at what works best for children in this age group and have put together three options for you.'
],
subject:'Birthday of {CHILD_NAME} at Varpoint, Options',
body:`Hi {NAME},

thank you for your message. For the birthday of {CHILD_NAME} on {DATE}, I have put together the right options.

{MIRROR}

All experiences are age-appropriate and run by a moderator from start to finish. The minimum age for the VR Room area is 6 years.

Arena Event Gold · 2.5 hours
Our most popular birthday package. The children play together in teams in the VR arena, comparable to paintball or laser tag but completely safe in virtual reality. On top of the arena gameplay, they also experience VR Attractions like roller coasters or flying, which are highlights in their own right. The moderator runs the entire event and makes sure everything flows smoothly.
Total price: {PRICE_gold} €
Most popular package for kids birthdays.
- Private arena, lounge, decoration, snacks, PlayStation, moderator
- 3 VR Attractions per child (roller coaster, white water rafting, flying or underwater adventure)
- 2 soft drinks per child
- Fruits and vegetables

Same setup, slightly less time and one attraction per child:

Arena Event Silver · 2 hours
Same event setup as Gold. Slightly less time and one attraction per child instead of three. A good fit when the budget is a little tighter.
Total price: {PRICE_silver} €
- Everything above, but 1 VR Attraction per child, 1 soft drink per child

Compact entry option without included attractions:

Arena Event Bronze · 1.5 hours
60 minutes of shared arena gameplay. No included attractions per child, but the same private event setup with lounge, decoration and moderator. Well suited for younger children or shorter sessions.
Total price: {PRICE_bronze} €
- Private arena, lounge, decoration, snacks, PlayStation, moderator

Could you confirm the exact number of children and your preferred start time? I will then hold the slot and send you the booking confirmation.

{SIGNOFF}`}
],
slot:[
{id:'b2c_en_s1',availabilityModes:['available','partial'],label:'Slot available ✓',stage:'slot',ms:'Package confirmed / start time still open / slot free',mirrors:[],
subject:'Your slot at Varpoint, {DATE}',
body:`Hi {NAME},

thank you for your reply. Your requested date is available.

{DATE}, {DAY}  {WINDOW}

You can freely choose your start time within the available window.

To confirm the reservation, I just need your preferred start time, and if not yet provided, the exact number of people.

Please feel free to send a quick reply whenever you are ready.

{SIGNOFF}`},
{id:'b2c_en_s2',availabilityModes:['available','partial','unavailable'],label:'Slot partially available ⚠',stage:'slot',ms:'Package confirmed / limited window on requested date',mirrors:[],
subject:'Your slot at Varpoint, {DATE}',
body:`Hi {NAME},

thank you for your reply. For your requested date, we only have a limited time window available.

Available window:
{DATE}, {DAY}  {WINDOW}

Alternatively, I can offer the following date:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW}

You can freely choose your start time within the available windows.

Which date works better for you? I will then confirm the reservation.

{SIGNOFF}`},
{id:'b2c_en_s3',availabilityModes:['partial','unavailable'],label:'Date fully booked ✗',stage:'slot',ms:'Package confirmed / requested date fully booked',mirrors:[],
subject:'Your slot at Varpoint, Alternative dates',
body:`Hi {NAME},

thank you for your reply. Unfortunately {DATE} is already fully booked.

I would like to offer the following alternatives:

Option 1:
{ALT1_DATE}, {ALT1_DAY}  {ALT1_WINDOW}

Option 2:
{ALT2_DATE}, {ALT2_DAY}  {ALT2_WINDOW}

You can freely choose your start time within the available windows.

Does one of these work for you? I will confirm the reservation right away.

{SIGNOFF}`}
],
booked:[
{id:'b2c_en_b1',label:'Booking Confirmation',stage:'booked',ms:'',mirrors:[],
subject:'Your booking confirmation, {DATE} at Varpoint',
body:`Hi {NAME},

thank you for your confirmation. Here are your booking details:

- Date: {DAY}, {DATE}
- Time: {TIME}
- Number of people: {GROUP}
- Selected package: {PACKAGE}
- Total price: {PRICE_SELECTED} €

Package contents:
{PKG_CONTENTS}

{ANZ}

If you have any questions or special requests, please feel free to get in touch.

We look forward to welcoming you and your guests.

{SIGNOFF}`}
],
other:[
{id:'b2c_en_x1',label:'Price too high / budget limited',stage:'other',ms:'Price too high / budget limited / needs a more affordable option',
mirrors:['Thank you for the honest feedback. I have looked at what is possible at a different price point for your group.'],
subject:'Your event at Varpoint, Alternative options',
body:`Hi {NAME},

thank you for the honest feedback.

{MIRROR}

The Private Arena starts at {PRICE_priv} € for up to 10 people, exclusive arena access without lounge or decoration, at a fixed price.

The Arena Event Bronze starts at {PRICE_bronze} € with lounge, decoration, snacks and moderator for 1.5 hours.

Which sounds closer to what you need? I will put together the final offer.

{SIGNOFF}`},
{id:'b2c_en_x2',label:'Follow-up · No response',stage:'other',ms:'No feedback after offer / follow-up needed',mirrors:[],
subject:'Your event at Varpoint, Quick check-in',
body:`Hi {NAME},

I just wanted to check whether you have any questions about the options or whether I can send you any further details.

The slot on {DATE} is still available. Once I have your confirmation I will hold it for you.

Feel free to get in touch if there is anything else you need.

{SIGNOFF}`}
]
}
}
};
