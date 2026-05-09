export const CFG = {
  biz:{name:'Varpoint',tagline:'Virtual Reality Park',phone:'+49 176 70838137',addr:'Tempelhofer Damm 227, 12099 Berlin',company:'HOVR Entertainment GmbH',bank:'Berliner Volksbank',iban:'DE91 1009 0000 2970 4260 03',bic:`BEVODEBBXXX`},
  stages:{
    de:{discovery:`🔍 Erstkontakt`,offer:'📋 Angebot',slot:'📅 Terminbestätigung',booked:'✅ Gebucht',other:`⚡ Sonstiges`},
    en:{discovery:`🔍 Discovery`,offer:'📋 Quote',slot:'📅 Slot Confirmation',booked:'✅ Booked',other:`⚡ Other`}
  },
  prices:{
    b2b:{arena15:700,arena2:800,arena3:900,venue15:1150,venue2:1490,venue3:1690,prem3:1850,prem4:2250},
    b2c:{bronze:350,silver:400,gold:450,starter:250,plus:350,pro:400,priv:250,entry:28}
  },
  priceList:{
    b2b:[
      {name:`Arena Event`,badge:{de:'Team',en:'Team'},color:'#1B5E9B',cap:{de:'bis 20 Pers.',en:`up to 20`},tiers:[
        {lbl:{de:`3h`,en:'3h'},key:'arena3',tierRank:3,offerLevel:3,family:`arena`,differentiator:{de:"Mehr Zeit, mehr Attraktionen, entspanntere Rotationen.",en:"More time, more attractions, relaxed rotations."},
          cardDesc:{de:`Mehr Zeit pro Person, entspanntere Rotationen und der höchste Inhalt pro Person. Beste Wahl wenn das Arena-Gameplay klar im Mittelpunkt des Events stehen soll.`,en:`More time per person, relaxed rotations and the highest content per person. Best choice when focused arena gameplay should clearly be the centrepiece of the event.`},
          desc:{de:`+ 2 Attr., 2 Drinks, Früchte`,en:'+ 2 attr., 2 drinks, fruits'},transition:{de:{upward:'',downward:'',alternative:''},en:{upward:'',downward:'',alternative:``}}},
        {lbl:{de:`2h`,en:'2h'},key:'arena2',tierRank:2,offerLevel:2,family:`arena`,differentiator:{de:"Gleicher Aufbau, kompakterer Zeitrahmen.",en:"Same setup, more compact time frame."},
          cardDesc:{de:`Kompakteres Arena-Format mit reduziertem Inhalt pro Person. Gleicher exklusiver Aufbau in kürzerem Zeitrahmen.`,en:`More compact arena format with reduced content per person. Same exclusive setup in a shorter time frame.`},
          desc:{de:`+ 1 Attr., 1 Drink`,en:'+ 1 attr., 1 drink'},transition:{de:{upward:'Wenn Sie mehr Zeit und Inhalt pro Person wünschen:',downward:'Gleicher Aufbau, kompaktere Zeitstruktur und reduzierter Inhalt pro Person:',alternative:''},en:{upward:'If you would like more time and content per person:',downward:'Same exclusive setup, more compact time frame with reduced content per person:',alternative:``}}},
        {lbl:{de:`1,5h`,en:'1.5h'},key:'arena15',tierRank:1,offerLevel:1,family:`arena`,differentiator:{de:"Einstieg mit vollem Arena-Zugang, ohne Extras pro Person.",en:"Entry option with full arena access, no per-person extras."},
          cardDesc:{de:`Kompakter Einstieg mit vollem Arena-Zugang und strukturiertem Ablauf. Kein inkludierter Inhalt pro Person, aber derselbe exklusive Rahmen.`,en:`Compact entry option with full arena access and a structured flow. No included attractions or drinks, but the same exclusive private setup.`},
          desc:{de:`Arena, Lounge, Snacks`,en:'Arena, lounge, snacks'},transition:{de:{upward:'Mit einer Attraktion und einem Softdrink pro Person:',downward:'Falls Sie das Event noch kompakter planen möchten:',alternative:''},en:{upward:'With one attraction and one soft drink per person:',downward:'If you would like a further compact entry option:',alternative:``}}}
      ]},
      {name:`Venue Booking`,badge:{de:'Complete',en:'Complete'},color:'#1B2E5E',cap:{de:'bis 25 Pers.',en:`up to 25`},tiers:[
        {lbl:{de:`3h`,en:'3h'},key:'venue3',tierRank:3,offerLevel:6,family:`venue`,differentiator:{de:"Alle Stationen parallel, maximaler Inhalt pro Person.",en:"All stations in parallel, maximum content per person."},
          cardDesc:{de:`Mehr Zeit pro Station, mehr Attraktionen pro Person und zusätzliche Extras. Für Gruppen dieser Größe bietet diese Option das beste Verhältnis aus Aktivität, Inhalt und Eventdauer. Die längere Eventdauer reduziert Wartezeiten bei den Stationsrotationen deutlich.`,en:`More time per station, more attractions per person and additional extras. For groups of this size this option offers the best balance of activity, content and event duration. The longer format significantly reduces waiting time during station rotations.`},
          desc:{de:`Arena+VR+Sim, + 3 Attr., 3 Drinks`,en:'Arena+VR+sim, + 3 attr., 3 drinks'},transition:{de:{upward:'',downward:'',alternative:''},en:{upward:'',downward:'',alternative:``}}},
        {lbl:{de:`2h`,en:'2h'},key:'venue2',tierRank:2,offerLevel:5,family:`venue`,differentiator:{de:"Gleicher Stationsaufbau, kompakterer Zeitrahmen.",en:"Same station setup, more compact time frame."},
          cardDesc:{de:`Gleicher Stationsaufbau in kompakterem Zeitrahmen mit reduziertem Inhalt pro Person. Gute Wahl wenn das Event zeitlich eingebettet ist.`,en:`Same station setup in a slightly more compact time frame with reduced content per person. A good fit when the event needs to fit into a tighter schedule.`},
          desc:{de:`+ 2 Attr., 2 Drinks`,en:'+ 2 attr., 2 drinks'},transition:{de:{upward:'Mehr Zeit pro Station, mehr Attraktionen und Extras:',downward:'Gleicher Stationsaufbau, kompakterer Zeitrahmen, reduzierter Inhalt pro Person:',alternative:''},en:{upward:'More time per station, more attractions and extras:',downward:'Same station setup, in a more compact time frame with reduced content per person:',alternative:``}}},
        {lbl:{de:`1,5h`,en:'1.5h'},key:'venue15',tierRank:1,offerLevel:4,family:`venue`,differentiator:{de:"Voller Stationsaufbau, reduzierter Inhalt pro Person.",en:"Full station setup, reduced content per person."},
          cardDesc:{de:`Einstiegsoption mit vollem Stationsaufbau und strukturiertem Ablauf. Empfohlen wenn die Zeit begrenzt ist oder das Event in einen größeren Tagesplan eingebettet wird.`,en:`Entry option with full station setup and structured flow. Recommended when time is limited or the event is part of a larger day schedule.`},
          desc:{de:`+ 1 Attr., 1 Drink`,en:'+ 1 attr., 1 drink'},transition:{de:{upward:'Mit zwei Attraktionen und Softdrinks pro Person:',downward:'Falls Sie das Event noch kompakter planen möchten:',alternative:''},en:{upward:'With two attractions and soft drinks per person:',downward:'If you would like to keep the event even more compact:',alternative:``}}}
      ]},
      {name:`Premium`,badge:{de:'Exklusiv',en:'Exclusive'},color:'#6B21A8',cap:{de:'bis 35 Pers.',en:`up to 35`},tiers:[
        {lbl:{de:`3h`,en:'3h'},key:'prem3',tierRank:1,offerLevel:7,family:`premium`,differentiator:{de:"Gesamte Location exklusiv, alle Stationen gleichzeitig, kein Rotationssystem.",en:"Entire venue exclusively yours, all stations simultaneously, no rotation system."},
          cardDesc:{de:`Exklusive Nutzung der gesamten Location. Alle Stationen laufen parallel und die Teilnehmer können frei zwischen Arena, VR-Erlebnissen und Simulatoren wechseln. Die einzige Option, bei der alle Teilnehmer gleichzeitig an allen Stationen aktiv sein können, ohne Wartezeiten, ohne Rotationssystem.`,en:`Exclusive use of the entire venue. All stations run in parallel and participants can move freely between arena, VR experiences and simulators. The only option where all participants can be active at all stations simultaneously, no waiting time, no rotation system.`},
          desc:{de:`Branding, Foto & Video, Unb. Attr.`,en:'Branding, photo & video, unlimited'},transition:{de:{upward:'',downward:'',alternative:''},en:{upward:'',downward:'',alternative:``}}},
        {lbl:{de:`4h`,en:'4h'},key:'prem4',tierRank:2,offerLevel:8,family:`premium`,differentiator:{de:"Wie Premium 3h, zusätzlich Pizza, unbegrenzte Drinks und mehr Zeit.",en:"Like Premium 3h, plus pizza, unlimited drinks and additional time."},
          cardDesc:{de:`Gleicher Aufbau wie die 3-Stunden-Variante, mit zusätzlicher Zeit für entspanntere Übergänge, mehr Raum für informellen Austausch im Team und einem vollständigen Catering-Paket das keine weiteren Absprachen erfordert.`,en:`Same setup as above, with additional time for more relaxed transitions and more space for team interaction. Recommended when the event should also have a social component alongside the activity.`},
          desc:{de:`+ Pizza, Unb. Drinks, Früchte`,en:'+ Pizza, unlimited drinks, fruits'},transition:{de:{upward:'',downward:'Gleicher Aufbau, mit mehr Zeit und vollständigem Catering-Paket:',alternative:''},en:{upward:'',downward:'Same setup, with additional time and a complete catering package:',alternative:``}}}
      ]}
    ],
    b2c:[
      {name:{de:`Arena Event`,en:'Arena Event'},badge:{de:'Geburtstag',en:'Birthday'},color:'#B45309',cap:{de:'bis 10 Pers.',en:`up to 10`},tiers:[
        {lbl:{de:`Gold 2,5h ★`,en:'Gold 2.5h ★'},key:'gold',tierRank:3,offerLevel:5,family:`arena_event`,differentiator:{de:"Meiste Zeit, meiste Attraktionen, bestes Erlebnis pro Person.",en:"Most time, most attractions, best experience per person."},
          cardDesc:{de:`Das vollständigste Arena Event Paket, die meiste Zeit, die meisten Attraktionen und der beste Inhalt pro Person. Genug Zeit für echte Team-Battles, entspannte Rotationen und VR-Attraktionen, die das Erlebnis weit über normales Gaming hinaus heben.`,en:`The most complete Arena Event package, the most time, most attractions and best content per person. Enough time for real team battles, relaxed rotations and VR Attractions that lift the experience far beyond regular gaming.`},
          desc:{de:`+ 3 Attr., 2 Drinks, Früchte`,en:'+ 3 attr., 2 drinks, fruits'},transition:{de:{upward:'',downward:'',alternative:''},en:{upward:'',downward:'',alternative:``}}},
        {lbl:{de:`Silver 2h`,en:'Silver 2h'},key:'silver',tierRank:2,offerLevel:4,family:`arena_event`,differentiator:{de:"Gleicher Arena-Rahmen, eine Attraktion pro Person.",en:"Same arena setup, one attraction per person."},
          cardDesc:{de:`Gleicher Rahmen wie Gold, mit etwas weniger Zeit und einer Attraktion pro Person statt drei. Gut geeignet wenn das Budget oder die Dauer begrenzt ist, das vollständige Arena-Erlebnis aber gewünscht wird.`,en:`Same setup as Gold, with slightly less time and one attraction per person instead of three. A good fit when budget or duration is limited but the full arena experience is still wanted.`},
          desc:{de:`+ 1 Attr., 1 Drink`,en:'+ 1 attr., 1 drink'},transition:{de:{upward:'',downward:'Gleicher Rahmen, etwas kompaktere Zeitstruktur und reduzierter Inhalt pro Person:',alternative:''},en:{upward:'',downward:'Same setup, slightly more compact and reduced content per person:',alternative:``}}},
        {lbl:{de:`Bronze 1,5h`,en:'Bronze 1.5h'},key:'bronze',tierRank:1,offerLevel:3,family:`arena_event`,differentiator:{de:"Arena-Gameplay ohne inkludierte Attraktionen.",en:"Arena gameplay without included attractions."},
          cardDesc:{de:`60 Minuten VR-Arena-Gameplay ohne inkludierte Attraktionen. Gleiche private Arena-Ausstattung mit Lounge, Dekoration und Moderator, ohne Extras pro Person.`,en:`60 minutes of VR arena gameplay without included attractions. Same private arena setup with lounge, decoration and moderator, without the per-person extras.`},
          desc:{de:`Arena, Lounge, Deko, Snacks`,en:'Arena, lounge, deco, snacks'},transition:{de:{upward:'Mit einer Attraktion und einem Softdrink pro Person:',downward:'Kompakter Einstieg ohne inkludierte Attraktionen:',alternative:''},en:{upward:'With one attraction and one soft drink per person:',downward:'Compact entry option without included attractions:',alternative:``}}}
      ]},
      {name:{de:`VR Room Event`,en:'VR Room Event'},badge:{de:'Geburtstag',en:'Birthday'},color:'#6B21A8',cap:{de:'bis 10 Pers.',en:`up to 10`},tiers:[
        {lbl:{de:`Pro 2,5h ★`,en:'Pro 2.5h ★'},key:'pro',tierRank:3,offerLevel:5,family:`vr_room`,differentiator:{de:"VR-Räume, Simulatoren, 3 Attraktionen pro Person, maximale Abwechslung.",en:"VR rooms, simulators, 3 attractions per person, maximum variety."},
          cardDesc:{de:`Das vollständigste VR Room Event Paket, 3 VR-Räume mit über 100 Spielen, 2 Rennsimulatoren und 2 PlayStation laufen gleichzeitig. Genug Zeit um wirklich in verschiedene Welten einzutauchen und alle Stationen ausgiebig zu nutzen.`,en:`The most complete VR Room Event package, 3 VR rooms with 100+ games, 2 racing simulators and 2 PlayStation all running simultaneously. Enough time to genuinely explore different worlds and make the most of every station.`},
          desc:{de:`+ 3 Attr., 2 Drinks, Früchte`,en:'+ 3 attr., 2 drinks, fruits'},transition:{de:{upward:'',downward:'',alternative:''},en:{upward:'',downward:'',alternative:``}}},
        {lbl:{de:`Plus 2h`,en:'Plus 2h'},key:'plus',tierRank:2,offerLevel:4,family:`vr_room`,differentiator:{de:"VR-Räume und Simulatoren, eine Attraktion pro Person.",en:"VR rooms and simulators, one attraction per person."},
          cardDesc:{de:`Gleicher Stationsaufbau wie Pro. Eine Attraktion pro Person statt drei, ab 2 Personen laufen die Attraktionen im Rotationsmodus (Wechsel alle 3 to 5 Min., freie Einteilung).`,en:`Same station setup as Pro. One attraction per person instead of three, from 2 people the attractions run in rotation mode (swap every 3 to 5 min., free arrangement).`},
          desc:{de:`+ 1 Attr., 1 Drink`,en:'+ 1 attr., 1 drink'},transition:{de:{upward:'Mit drei Attraktionen pro Person und mehr Zeit:',downward:'Gleicher Aufbau, eine Attraktion pro Person statt drei:',alternative:''},en:{upward:'With three attractions per person and more time:',downward:'Same setup, one attraction per person instead of three:',alternative:``}}},
        {lbl:{de:`Starter 1h`,en:'Starter 1h'},key:'starter',tierRank:1,offerLevel:3,family:`vr_room`,differentiator:{de:"Voller VR-Stations-Zugang ohne inkludierte Attraktionen.",en:"Full VR station access without included attractions."},
          cardDesc:{de:`Voller Zugang zu allen VR-Stationen ohne inkludierte Attraktionen. Bis zu 7 Personen gleichzeitig aktiv. Gut geeignet für kompakte Events oder als Budget-Einstieg.`,en:`Full access to all VR stations without included attractions. Up to 7 people active simultaneously. Good fit for compact events or as a budget entry point.`},
          desc:{de:`3 VR-Räume, 2 Sim., 2 PS`,en:'3 VR rooms, 2 sim., 2 PS'},transition:{de:{upward:'Mit einer Attraktion und einem Softdrink pro Person:',downward:'Einstiegsoption ohne inkludierte Attraktionen (bis 7 Pers.):',alternative:''},en:{upward:'With one attraction and one soft drink per person:',downward:'Entry option without included attractions (up to 7 people):',alternative:``}}}
      ]},
      {name:{de:`Private Arena`,en:'Private Arena'},badge:{de:'Walk-in',en:'Walk-in'},color:'#1B5E9B',cap:{de:'bis 10 Pers.',en:`up to 10`},tiers:[
        {lbl:{de:`1h exklusiv`,en:'1h exclusive'},key:'priv',tierRank:1,offerLevel:2,family:`private_arena`,differentiator:{de:"Exklusive Arena-Session, kein Event-Setup.",en:"Exclusive arena session, no event setup."},
          cardDesc:{de:`Die Arena gehört für eine Stunde exklusiv eurer Gruppe. Kein Lounge-Bereich oder Dekoration, aber eine klare private Session zum Festpreis unabhängig von der Personenzahl.`,en:`The arena belongs exclusively to your group for one hour. No lounge area or decoration, but a clean private session at a fixed price regardless of headcount.`},
          desc:{de:`Exklusiv, kein Setup`,en:'Exclusive, no setup'},transition:{de:{upward:'Mit Lounge, Dekoration, Snacks und Moderator:',downward:'',alternative:''},en:{upward:'With lounge, decoration, snacks and moderator:',downward:'',alternative:``}}}
      ]},
      {name:{de:`Einzeleintritt`,en:'Single Entry'},badge:{de:'Walk-in',en:'Walk-in'},color:'#475569',cap:{de:'1 Person',en:`1 person`},tiers:[
        {lbl:{de:`28 €/Std.`,en:'€28/h'},key:'entry',tierRank:1,offerLevel:1,family:`single_entry`,differentiator:{de:"Geteilte Arena, kein privates Setup.",en:"Shared arena, no private setup."},
          cardDesc:{de:`Geteilte Arena ohne privates Setup. Am besten geeignet für sehr kleine Gruppen oder spontane Besuche.`,en:`Shared arena without private setup. Best for very small groups or spontaneous visits.`},
          desc:{de:`Geteilte Arena, kein Setup`,en:'Shared arena, no setup'},transition:{de:{upward:'Exklusiv für eure Gruppe, private Arena:',downward:'',alternative:''},en:{upward:'Exclusively for your group, private arena:',downward:'',alternative:``}}}
      ]}
    ]
  },
  pkgContents:{
    arena15:{de:`Dauer: 1,5 Std.
Private Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator`,en:`Duration: 1.5h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator`},
    arena2:{de:`Dauer: 2 Std.
Private Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator
1 VR-Attraktion/Pers. · 1 Softdrink/Pers.`,en:`Duration: 2h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator
1 VR Attraction/person · 1 soft drink/person`},
    arena3:{de:`Dauer: 3 Std.
Private Arena · Lounge · Dekoration · Snacks · PlayStation · Moderator
2 VR-Attraktionen/Pers. · 2 Softdrinks/Pers. · Früchte & Gemüse`,en:`Duration: 3h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator
2 VR Attractions/person · 2 soft drinks · Fruits & vegetables`},
    venue15:{de:`Dauer: 1,5 Std.
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
1 VR-Attraktion/Pers. · 1 Softdrink/Pers.`,en:`Duration: 1.5h
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
1 VR Attraction/person · 1 soft drink`},
    venue2:{de:`Dauer: 2 Std.
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
2 VR-Attraktionen/Pers. · 2 Softdrinks/Pers.`,en:`Duration: 2h
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
2 VR Attractions/person · 2 soft drinks`},
    venue3:{de:`Dauer: 3 Std.
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
3 VR-Attraktionen/Pers. · 3 Softdrinks/Pers. · Früchte & Gemüse`,en:`Duration: 3h
Arena + VR Spaces (3) + Driving Simulators (2) · 2 Lounges · PlayStation (2)
3 VR Attractions/person · 3 soft drinks · Fruits & vegetables`},
    prem3:{de:`Dauer: 3 Std. · Gesamte Location exklusiv
Alle Stationen gleichzeitig · Unbegrenzte Attraktionen/Pers. · 2 Softdrinks/Pers.
Company Branding · Foto & Video Session · Preis Gewinnerteam · Dediziertes Moderationsteam`,en:`Duration: 3h · Entire venue exclusively
All stations simultaneously · Unlimited attractions/person · 2 soft drinks/person
Company branding · Photo & video session · Prize for winning team · Dedicated moderation team`},
    prem4:{de:`Dauer: 4 Std. · Gesamte Location exklusiv
Unbegrenzte Attraktionen & Softdrinks · Pizza für alle
Company Branding · Foto & Video Session · Preis Gewinnerteam · Moderationsteam · Früchte & Gemüse`,en:`Duration: 4h · Entire venue exclusively
Unlimited attractions & soft drinks · Pizza for all participants
Company branding · Photo & video session · Prize for winning team · Moderation team · Fruits & vegetables`},
    bronze:{de:`Dauer: 1,5 Std.
Private Arena · Lounge · Deko · Snacks · PlayStation · Moderator`,en:`Duration: 1.5h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator`},
    silver:{de:`Dauer: 2 Std.
Private Arena · Lounge · Deko · Snacks · PlayStation · Moderator
1 VR-Attraktion/Person · 1 Softdrink/Person`,en:`Duration: 2h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator
1 VR Attraction/person · 1 soft drink`},
    gold:{de:`Dauer: 2,5 Std.
Private Arena · Lounge · Deko · Snacks · PlayStation · Moderator
3 VR-Attraktionen/Person · 2 Softdrinks/Person · Früchte & Gemüse`,en:`Duration: 2.5h
Private arena · Lounge · Decoration · Snacks · PlayStation · Moderator
3 VR Attractions/person · 2 soft drinks · Fruits & vegetables`},
    starter:{de:`Dauer: 1 Std. (bis 7 Pers.)
VR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks`,en:`Duration: 1h (up to 7 people)
VR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks`},
    plus:{de:`Dauer: 2 Std. (bis 10 Pers.)
VR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks
1 VR-Attraktion/Person (Rotation) · 1 Softdrink/Person`,en:`Duration: 2h (up to 10 people)
VR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks
1 VR Attraction/person (rotation mode) · 1 soft drink`},
    pro:{de:`Dauer: 2,5 Std. (bis 10 Pers.)
VR Room ×3 · Race Simulator ×2 · Lounge · Dekoration · Snacks
3 VR-Attraktionen/Person · 2 Softdrinks/Person · Früchte & Gemüse`,en:`Duration: 2.5h (up to 10 people)
VR Room ×3 · Race Simulator ×2 · Lounge · Decoration · Snacks
3 VR Attractions/person · 2 soft drinks · Fruits & vegetables`},
    priv:{de:`Dauer: 1 Std. (bis 10 Pers.)
Private Arena exklusiv · Kein Lounge/Deko`,en:`Duration: 1h (up to 10 people)
Private arena exclusively · No lounge/decoration`}
  },
  crossTransitions:{
    de:{
      'prem3→prem4':`Gleicher Aufbau, mit mehr Zeit und vollständigem Catering-Paket:`,
      'prem4→prem3':`Kompaktere Alternative ohne Catering-Paket:`,
      'prem3→venue3':`Falls Sie das Event etwas kompakter planen möchten:`,
      'prem4→venue3':`Falls Sie das Event kompakter planen möchten:`,
      'venue3→venue2':`Gleicher Stationsaufbau, etwas kompakterer Zeitrahmen:`,
      'venue3→venue15':`Falls Sie das Event noch kompakter planen möchten:`,
      'venue2→venue15':`Falls Sie das Event noch kompakter planen möchten:`,
      'venue3→arena3':`Falls Sie das Budget kompakt halten möchten:`,
      'venue2→arena3':`Falls Sie das Budget kompakt halten möchten:`,
      'venue15→arena3':`Falls Sie das Budget kompakt halten möchten:`,
      'arena3→venue15':`Falls Sie mehr Abwechslung in kompakterer Zeit wünschen:`,
      'arena3→arena2':`Gleicher Aufbau, kompaktere Zeitstruktur:`,
      'arena2→arena15':`Kompakter Einstieg ohne inkludierte Attraktionen:`,
      'gold→silver':`Gleicher Rahmen, etwas weniger Zeit und eine Attraktion pro Person:`,
      'silver→bronze':`Kompaktes Einstiegsformat ohne inkludierte Attraktionen:`,
      'pro→plus':`Gleicher Aufbau, eine Attraktion statt drei:`,
      'plus→starter':`Einstiegsoption ohne inkludierte Attraktionen (bis 7 Pers.):`,
      'gold→priv':`Kompaktere Alternative ohne Event-Setup:`,
      'pro→gold':`Falls ihr lieber alle gemeinsam in der Arena spielen möchtet:`,
      'gold→pro':`Falls ihr mehr Abwechslung und verschiedene Spielstationen möchtet:`
    },
    en:{
      'prem3→prem4':`Same setup, with additional time and a complete catering package:`,
      'prem4→prem3':`More compact alternative without the catering package:`,
      'prem3→venue3':`If you would like a slightly more compact format:`,
      'prem4→venue3':`If you would like a more compact format:`,
      'venue3→venue2':`Same station setup, in a slightly more compact time frame:`,
      'venue3→venue15':`If you would like to keep the event even more compact:`,
      'venue2→venue15':`If you would like to keep the event even more compact:`,
      'venue3→arena3':`If you would like to keep the budget compact:`,
      'venue2→arena3':`If you would like to keep the budget compact:`,
      'venue15→arena3':`If you would like to keep the budget compact:`,
      'arena3→venue15':`If you would like more variety and a broader experience in a compact format:`,
      'arena3→arena2':`Same exclusive setup, more compact time frame:`,
      'arena2→arena15':`Compact entry option without included attractions:`,
      'gold→silver':`Same setup, slightly less time and one attraction per person:`,
      'silver→bronze':`Compact entry option without included attractions:`,
      'pro→plus':`Same setup, one attraction instead of three:`,
      'plus→starter':`Entry option without included attractions (up to 7 people):`,
      'gold→priv':`More compact alternative without event setup:`,
      'pro→gold':`If you would prefer everyone playing together in the same arena:`,
      'gold→pro':`If you would like more variety and individual gaming stations:`
    }
  },
  anz:{
    b2b_de:`Anzahlung:
Für die verbindliche Buchung ist eine Anzahlung von 50 € erforderlich.

HOVR Entertainment GmbH · Berliner Volksbank
IBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX

Die Anzahlung kann per Überweisung oder bar vor Ort geleistet werden.`,
    b2b_en:`Deposit:
A deposit of €50 is required to confirm the booking.

HOVR Entertainment GmbH · Berliner Volksbank
IBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX

Payment by bank transfer or cash on site.`,
    b2c_de:`Anzahlung:
Für die verbindliche Buchung ist eine Anzahlung von 50 € erforderlich.

HOVR Entertainment GmbH · Berliner Volksbank
IBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX

Hinweis: Festpreis bis 10 Personen. Ab der 11. Person gilt ein Personenzuschlag.`,
    b2c_en:`Deposit:
A deposit of €50 is required to confirm the booking.

HOVR Entertainment GmbH · Berliner Volksbank
IBAN: DE91 1009 0000 2970 4260 03 · BIC: BEVODEBBXXX

Note: Fixed price up to 10 people. A per-person supplement applies from the 11th person.`
  },
  sig:{de:`Mit freundlichen Grüßen,

Ihr Varpoint Team  |  Virtual Reality Park
Telefon: +49 176 70838137  |  Tempelhofer Damm 227, 12099 Berlin`,en:`Best regards,

Your Varpoint Team  |  Virtual Reality Park
Phone: +49 176 70838137  |  Tempelhofer Damm 227, 12099 Berlin`},
  photo:{de_b2b:`Im Anhang finden Sie Bilder unserer Lounge-Zone und des Spielbereichs.
Anhänge: Lounge Zone 1.jpg | Lounge Zone 2.jpg | Varpoint Spielbereich.jpg`,de_b2c:`Im Anhang findest du Bilder unserer Lounge-Zone.
Anhänge: Lounge Zone 1.jpg | Lounge Zone 2.jpg | Varpoint Spielbereich.jpg`,en_b2b:`Please find attached photos of our lounge area and play zone.
Attachments: Lounge Zone 1.jpg | Lounge Zone 2.jpg | Varpoint Play Area.jpg`,en_b2c:`Please find attached photos of our lounge area.
Attachments: Lounge Zone 1.jpg | Lounge Zone 2.jpg | Varpoint Play Area.jpg`}
};
