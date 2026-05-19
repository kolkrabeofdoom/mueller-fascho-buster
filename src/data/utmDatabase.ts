export interface UTMBrand {
  id: string;
  name: string;
  category: string;
  description: string;
  relation: string;
  corporation: 'muller' | 'nestle';
}

export interface UTMPlant {
  code: string;
  name: string;
  city: string;
  state: string;
  description: string;
  corporation: 'muller' | 'nestle';
}

export interface Alternative {
  name: string;
  type: 'organic' | 'regional' | 'plant-based' | 'independent';
  description: string;
  recommendedFor: string[];
}

export interface BoycottReason {
  title: string;
  description: string;
  details: string;
  corporation: 'muller' | 'nestle';
}

// Normalized brands list for fast matching (Müller and Nestlé)
export const utmBrands: Record<string, UTMBrand> = {
  // --- MÜLLER-GRUPPE ---
  muller: {
    id: "muller",
    name: "Müller (Müllermilch)",
    category: "Milchmischgetränke, Joghurt, Dessert",
    description: "Die Kernmarke der Unternehmensgruppe. Bekannt für Müllermilch, Joghurt mit der Ecke, Milchreis und Reine Buttermilch.",
    relation: "Direkte Hauptmarke der Molkerei Alois Müller.",
    corporation: "muller"
  },
  mullermilch: {
    id: "muller",
    name: "Müllermilch",
    category: "Milchmischgetränke",
    description: "Bekanntes Milchmischgetränk in verschiedenen Geschmacksrichtungen.",
    relation: "Direkte Hauptmarke der Molkerei Alois Müller.",
    corporation: "muller"
  },
  weihenstephan: {
    id: "weihenstephan",
    name: "Weihenstephan",
    category: "Premium-Milchprodukte, Butter, Sahne, Joghurt",
    description: "Traditionsreiche Marke aus Freising, die 2000 von Müller übernommen wurde. Vermarktet als Premium-Marke.",
    relation: "100%ige Tochtergesellschaft der Müller-Gruppe (Staatliche Molkerei Weihenstephan GmbH & Co. KG).",
    corporation: "muller"
  },
  sachsenmilch: {
    id: "sachsenmilch",
    name: "Sachsenmilch",
    category: "Milch, Butter, Käse, Joghurt",
    description: "Regionale Marke in Ostdeutschland. Der Standort Leppersdorf ist eine der größten und modernsten Molkereien Europas.",
    relation: "Gehört seit 1994 vollständig zur Unternehmensgruppe Theo Müller.",
    corporation: "muller"
  },
  landliebe: {
    id: "landliebe",
    name: "Landliebe",
    category: "Joghurt, Milch, Pudding, Butter",
    description: "Traditionelle Marke mit ländlichem Image. Wurde im April 2023 von FrieslandCampina übernommen.",
    relation: "Im Zuge der Übernahme des deutschen Konsumgeschäfts von FrieslandCampina an Müller übergegangen.",
    corporation: "muller"
  },
  almhof: {
    id: "almhof",
    name: "Almhof",
    category: "Joghurt, Desserts",
    description: "Bekannte Marke in den Niederlanden und teilweise in Westdeutschland.",
    relation: "Tochtergesellschaft der Unternehmensgruppe Theo Müller.",
    corporation: "muller"
  },
  elinas: {
    id: "elinas",
    name: "Elinas",
    category: "Joghurt nach griechischer Art",
    description: "Spezialitäten-Joghurtmarke im deutschen Lebensmittelhandel.",
    relation: "Marke der Molkerei Alois Müller GmbH & Co. KG.",
    corporation: "muller"
  },
  lunebest: {
    id: "lunebest",
    name: "Lünebest",
    category: "Wackelpudding, Joghurt, Desserts",
    description: "Traditionsmarke für süße Desserts, bekannt für Wackelpudding und Becher-Joghurts.",
    relation: "Wurde von Müller übernommen (Betriebsstätte Elsterwerda).",
    corporation: "muller"
  },
  kasereloose: {
    id: "kasereloose",
    name: "Käserei Loose",
    category: "Sauermilchkäse, Quäse, Harzer Käse",
    description: "Bekanntester Hersteller von Sauermilchkäse in Deutschland (Quäse, Loose Hausmacher).",
    relation: "Seit 1998 eine eigenständige Tochtergesellschaft der Unternehmensgruppe Theo Müller.",
    corporation: "muller"
  },
  loose: {
    id: "kasereloose",
    name: "Loose",
    category: "Käse",
    description: "Sauermilchkäse-Spezialitäten.",
    relation: "Gehört zur Käserei Loose (Müller-Gruppe).",
    corporation: "muller"
  },
  quase: {
    id: "kasereloose",
    name: "Quäse",
    category: "Käse",
    description: "Fitness-Käse aus Sauermilchquark, reich an Protein.",
    relation: "Marke der Käserei Loose, die zur Müller-Gruppe gehört.",
    corporation: "muller"
  },
  nadler: {
    id: "nadler",
    name: "Nadler",
    category: "Feinkost, Fischspezialitäten, Saucen",
    description: "Bekannte Marke für Heringssalate, Brotaufstriche und Fisch-Feinkost.",
    relation: "Gehört zur Homann-Gruppe und verblieb nach dem Verkauf der Salatsparte bei der Müller-Gruppe.",
    corporation: "muller"
  },
  homann: {
    id: "homann",
    name: "Homann",
    category: "Saucen, Dressings, Fischprodukte",
    description: "Bekannte Feinkostmarke. ACHTUNG: Die Feinkostsalate-Sparte wurde 2021 an Signature Foods verkauft. Dressings, Saucen und Fischprodukte gehören weiterhin zu Müller.",
    relation: "Saucen und Fisch verbleiben in der Müller-Feinkostsparte. Salate sind unabhängig.",
    corporation: "muller"
  },
  berief: {
    id: "berief",
    name: "Berief",
    category: "Pflanzliche Drinks, Tofu, Joghurt-Alternativen",
    description: "Bio-Pflanzendrink- und Tofu-Hersteller aus Beckum. Die Übernahme durch die Unternehmensgruppe Theo Müller wurde im Mai 2026 bekannt gegeben.",
    relation: "Wird innerhalb der Müller-Gruppe zur Stärkung der pflanzlichen Feinkost- und Molkereisparte geführt.",
    corporation: "muller"
  },

  // --- NESTLÉ-KONZERN ---
  nestle: {
    id: "nestle",
    name: "Nestlé",
    category: "Mutterkonzern, diverse Produkte",
    description: "Der größte Lebensmittelkonzern der Welt. Deckt unzählige Marken ab.",
    relation: "Direkte Hauptmarke des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  nescafe: {
    id: "nescafe",
    name: "Nescafé",
    category: "Kaffee, Löskaffee, Kaffeemischgetränke",
    description: "Weltweit führende Marke für Instantkaffee und Kaffeemaschinensysteme.",
    relation: "Kernmarke von Nestlé.",
    corporation: "nestle"
  },
  nespresso: {
    id: "nespresso",
    name: "Nespresso",
    category: "Kaffeekapseln, Kaffeemaschinen",
    description: "Pionier bei portioniertem Premium-Kapselkaffee.",
    relation: "Eigenständige Tochtergesellschaft des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  dolcegusto: {
    id: "dolcegusto",
    name: "Nescafé Dolce Gusto",
    category: "Kaffeekapseln, Heißgetränke",
    description: "Kapsel-Kaffeesystem für den Massenmarkt.",
    relation: "Kapselmarke von Nestlé.",
    corporation: "nestle"
  },
  caro: {
    id: "caro",
    name: "Caro Landkaffee",
    category: "Kaffee-Ersatz, Getreidekaffee",
    description: "Löslicher Getreidekaffee aus Gerste, Roggen und Zichorie.",
    relation: "Marke von Nestlé.",
    corporation: "nestle"
  },
  nesquik: {
    id: "nesquik",
    name: "Nesquik",
    category: "Kakaopulver, Cerealien, Milchgetränke",
    description: "Bekanntes zuckerreiches Kakaopulver und Frühstücksflocken mit dem Hasen-Maskottchen.",
    relation: "Klassische Nestlé-Süßwarenmarke.",
    corporation: "nestle"
  },
  maggi: {
    id: "maggi",
    name: "Maggi",
    category: "Suppen, Fertiggerichte, Saucen, Bouillons",
    description: "Marktführer bei Fertiggerichten, Tütensuppen, Brühen und Küchenhelfern (z. B. Maggi-Würze, 5-Minuten-Terrine).",
    relation: "Seit 1947 eine der wichtigsten und bekanntesten Nestlé-Tochtergesellschaften.",
    corporation: "nestle"
  },
  thomy: {
    id: "thomy",
    name: "Thomy",
    category: "Mayonnaise, Senf, Salatdressings, Saucen",
    description: "Feinkost-Spezialist in Tuben und Gläsern, extrem weit verbreitet.",
    relation: "Gehört seit 1971 vollständig zum Nestlé-Konzern.",
    corporation: "nestle"
  },
  gardengourmet: {
    id: "gardengourmet",
    name: "Garden Gourmet",
    category: "Vegetarische & Vegane Fleischalternativen",
    description: "Große Marke für fleischfreie Burger, Geschnetzeltes und vegane Fertiggerichte.",
    relation: "Die Hauptmarke von Nestlé im pflanzlichen Fleischersatz-Sektor.",
    corporation: "nestle"
  },
  buitoni: {
    id: "buitoni",
    name: "Buitoni",
    category: "Pastasaucen, Pesto, Fertiggerichte",
    description: "Traditionelle italienische Nudel- und Saucenmarke. ACHTUNG: Die Marke wurde in manchen Nudelbereichen lizenziert, Pastasaucen und Pesto gehören aber weiterhin zu Nestlé.",
    relation: "Gehört im Saucenbereich direkt zu Nestlé.",
    corporation: "nestle"
  },
  vittel: {
    id: "vittel",
    name: "Vittel",
    category: "Mineralwasser",
    description: "Stilles französisches Mineralwasser. Stand wegen des Abpumpens von Grundwasser in Vittel (Frankreich) extrem in der Kritik.",
    relation: "Premium-Wassermarke von Nestlé.",
    corporation: "nestle"
  },
  sanpellegrino: {
    id: "sanpellegrino",
    name: "San Pellegrino",
    category: "Mineralwasser, Edel-Limonaden",
    description: "Prickelndes italienisches Mineralwasser und Premium-Limonaden in Dosen.",
    relation: "Wurde 1997 vom Nestlé-Konzern übernommen.",
    corporation: "nestle"
  },
  acquapanna: {
    id: "acquapanna",
    name: "Acqua Panna",
    category: "Mineralwasser",
    description: "Stilles toskanisches Premium-Mineralwasser, häufig in der Gastronomie.",
    relation: "Gehört zur Sanpellegrino-Sparte von Nestlé.",
    corporation: "nestle"
  },
  perrier: {
    id: "perrier",
    name: "Perrier",
    category: "Mineralwasser",
    description: "Französisches kohlensäurehaltiges Mineralwasser in grünen Glasflaschen.",
    relation: "Premium-Wassermarke von Nestlé.",
    corporation: "nestle"
  },
  kitkat: {
    id: "kitkat",
    name: "KitKat",
    category: "Süßwaren, Schokoriegel",
    description: "Weltberühmter Knusper-Schokoriegel in roter Verpackung ('Have a break...').",
    relation: "Kernmarke der Süßwarensparte von Nestlé.",
    corporation: "nestle"
  },
  smarties: {
    id: "smarties",
    name: "Smarties",
    category: "Süßwaren, Schokolinsen",
    description: "Bunte Schokolinsen mit Zuckerüberzug, verpackt in Papprollen.",
    relation: "Marke des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  lion: {
    id: "lion",
    name: "Lion",
    category: "Süßwaren, Schokoriegel, Cerealien",
    description: "Knuspriger Riegel mit Karamell, Waffel und Knusperreis sowie Lion-Frühstücksflocken.",
    relation: "Süßwarenmarke des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  aftereight: {
    id: "aftereight",
    name: "After Eight",
    category: "Feine Schokolade, Pfefferminztäfelchen",
    description: "Hauchdünne Täfelchen aus Zartbitterschokolade mit flüssiger Minzfüllung.",
    relation: "Marke des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  chococrossies: {
    id: "chococrossies",
    name: "Choclait Chips / Choco Crossies",
    category: "Süßwaren, Schoko-Knabbereien",
    description: "Beliebte Knusperpralinen mit Cornflakes und Schokolade.",
    relation: "Marken des Nestlé-Konzerns.",
    corporation: "nestle"
  },
  wagner: {
    id: "wagner",
    name: "Original Wagner (Wagner Pizza)",
    category: "Tiefkühlpizza, Flammkuchen, Snacks",
    description: "Einer der Marktführer bei Tiefkühlpizzen in Deutschland (Steinofen Pizza, Ernst Wagners, Piccolinis).",
    relation: "Seit 2013 eine 100%ige Tochtergesellschaft von Nestlé.",
    corporation: "nestle"
  },
  beba: {
    id: "beba",
    name: "Beba (Nestlé BEBA)",
    category: "Säuglingsnahrung, Babymilch",
    description: "Weit verbreitete Babynahrung und Milchpulver für Säuglinge.",
    relation: "Die Säuglingsnahrungsmarke von Nestlé.",
    corporation: "nestle"
  },
  purina: {
    id: "purina",
    name: "Purina (Felix / Gourmet / Beneful)",
    category: "Tiernahrung, Katzenfutter, Hundefutter",
    description: "Gigantische Haustiernahrungs-Sparte. Umfasst Marken wie Felix, Gourmet, Beneful, ONE und Pro Plan.",
    relation: "Tiernahrungssparte von Nestlé.",
    corporation: "nestle"
  },
  felix: {
    id: "felix",
    name: "Felix",
    category: "Tiernahrung, Katzenfutter",
    description: "Sehr bekanntes Katzenfutter mit der schwarz-weißen Katze.",
    relation: "Marke von Nestlé Purina.",
    corporation: "nestle"
  },
  gourmet: {
    id: "gourmet",
    name: "Gourmet (Katzenfutter)",
    category: "Tiernahrung, Katzenfutter",
    description: "Feuchtfutter-Dosen für Katzen im Premium-Segment.",
    relation: "Marke von Nestlé Purina.",
    corporation: "nestle"
  }
};

// Known UTM Plant Codes (Genusstauglichkeitskennzeichen / Identitätskennzeichen)
export const utmPlants: Record<string, UTMPlant> = {
  deby718eg: {
    code: "DE BY 718 EG",
    name: "Molkerei Alois Müller GmbH & Co. KG",
    city: "Aretsried",
    state: "Bayern",
    description: "Das Stammhaus der Molkerei Müller. Hier werden Müllermilch, Joghurt mit der Ecke und Buttermilch produziert.",
    corporation: "muller"
  },
  deby718ec: {
    code: "DE BY 718 EC",
    name: "Molkerei Alois Müller GmbH & Co. KG",
    city: "Aretsried",
    state: "Bayern",
    description: "Das Stammhaus der Molkerei Müller. Hier werden Müllermilch, Joghurt mit der Ecke und Buttermilch produziert.",
    corporation: "muller"
  },
  desn016eg: {
    code: "DE SN 016 EG",
    name: "Sachsenmilch Leppersdorf GmbH",
    city: "Leppersdorf",
    state: "Sachsen",
    description: "Eine der größten Molkereien Europas. Produziert Sachsenmilch-Produkte, aber auch in riesigem Umfang Handelsmarken (z.B. Milbona, ja!, Gut & Günstig) für Lidl, Aldi, Edeka, REWE.",
    corporation: "muller"
  },
  desn016ec: {
    code: "DE SN 016 EC",
    name: "Sachsenmilch Leppersdorf GmbH",
    city: "Leppersdorf",
    state: "Sachsen",
    description: "Eine der größten Molkereien Europas. Produziert Sachsenmilch-Produkte, aber auch in riesigem Umfang Handelsmarken (z.B. Milbona, ja!, Gut & Günstig) für Lidl, Aldi, Edeka, REWE.",
    corporation: "muller"
  },
  deby103eg: {
    code: "DE BY 103 EG",
    name: "Molkerei Weihenstephan (Staatliche Molkerei Weihenstephan GmbH & Co. KG)",
    city: "Freising",
    state: "Bayern",
    description: "Ehemalige staatliche Traditionsmolkerei, heute Müller-Tochter. Produziert alle Weihenstephan-Milchprodukte, Butter und Rahm.",
    corporation: "muller"
  },
  deby103ec: {
    code: "DE BY 103 EC",
    name: "Molkerei Weihenstephan",
    city: "Freising",
    state: "Bayern",
    description: "Ehemalige staatliche Traditionsmolkerei, heute Müller-Tochter. Produziert alle Weihenstephan-Milchprodukte, Butter und Rahm.",
    corporation: "muller"
  },
  denw401eg: {
    code: "DE NW 401 EG",
    name: "Molkerei Köln (ehem. FrieslandCampina)",
    city: "Köln",
    state: "Nordrhein-Westfalen",
    description: "Molkerei-Standort in Köln, im April 2023 von FrieslandCampina an Müller übergeben. Hier werden u.a. Landliebe-Produkte hergestellt.",
    corporation: "muller"
  },
  denw401ec: {
    code: "DE NW 401 EC",
    name: "Molkerei Köln (ehem. FrieslandCampina)",
    city: "Köln",
    state: "Nordrhein-Westfalen",
    description: "Molkerei-Standort in Köln, im April 2023 von FrieslandCampina an Müller übergeben. Hier werden u.a. Landliebe-Produkte hergestellt.",
    corporation: "muller"
  },
  debw033eg: {
    code: "DE BW 033 EG",
    name: "Molkerei Heilbronn (ehem. FrieslandCampina)",
    city: "Heilbronn",
    state: "Baden-Württemberg",
    description: "Großer Molkerei-Standort in Heilbronn, im April 2023 an Müller übergeben. Produziert Landliebe-Produkte.",
    corporation: "muller"
  },
  debw033ec: {
    code: "DE BW 033 EC",
    name: "Molkerei Heilbronn (ehem. FrieslandCampina)",
    city: "Heilbronn",
    state: "Baden-Württemberg",
    description: "Großer Molkerei-Standort in Heilbronn, im April 2023 an Müller übergeben. Produziert Landliebe-Produkte.",
    corporation: "muller"
  },
  debw034eg: {
    code: "DE BW 034 EG",
    name: "Molkerei Schefflenz (ehem. FrieslandCampina)",
    city: "Schefflenz",
    state: "Baden-Württemberg",
    description: "Spezialstandort für traditionelle Milchverarbeitung, im April 2023 an die Müller-Gruppe übergegangen.",
    corporation: "muller"
  },
  debw034ec: {
    code: "DE BW 034 EC",
    name: "Molkerei Schefflenz (ehem. FrieslandCampina)",
    city: "Schefflenz",
    state: "Baden-Württemberg",
    description: "Spezialstandort für traditionelle Milchverarbeitung, im April 2023 an die Müller-Gruppe übergegangen.",
    corporation: "muller"
  }
};

// Boycott explanations for the background section
export const boycottReasons: BoycottReason[] = [
  {
    title: "Rechtsextreme Kontroversen",
    description: "Verbindungen zu rechtsextremen Politikern (Müller)",
    details: "Theo Müller hat in Interviews offen bestätigt, sich regelmäßig mit hochrangigen Politikern der AfD (Alternative für Deutschland), u.a. mit Bundessprecherin Alice Weidel, zu treffen. Diese Treffen und die Weigerung, sich von rechtsextremem Gedankengut zu distanzieren, führten zu breiten Protesten und Boykottaufrufen unter dem Motto 'Kein Geld für Faschos'.",
    corporation: "muller"
  },
  {
    title: "Steuerflucht in die Schweiz",
    description: "Umzug aus steuerlichen Gründen (Müller)",
    details: "Theo Müller verlegte 2003 seinen Hauptwohnsitz in die Schweiz (Erlenbach ZH), um der deutschen Erbschaftsteuer zu entgehen. Dies stieß auf starke Kritik, da das Unternehmen gleichzeitig in Deutschland staatliche Subventionen in Millionenhöhe (z.B. für den Ausbau des Werks in Leppersdorf) in Anspruch nahm.",
    corporation: "muller"
  },
  {
    title: "Marktmacht & Druck auf Erzeuger",
    description: "Ausnutzung monopolähnlicher Stellungen (Müller)",
    details: "Die Unternehmensgruppe Theo Müller kontrolliert einen gigantischen Anteil des deutschen Milchmarktes. Kritiker und Bauernverbände werfen dem Konzern vor, seine enorme Marktmacht auszunutzen, um die Milchpreise für die landwirtschaftlichen Erzeuger extrem niedrig zu halten, was viele Familienbetriebe in den Ruin treibt.",
    corporation: "muller"
  },
  {
    title: "Aggressive Expansion & Markensterben",
    description: "Aufkauf unabhängiger Traditionsmarken (Müller)",
    details: "Durch den aggressiven Aufkauf von Traditionsmarken wie Weihenstephan oder zuletzt Landliebe (2023) monopolisiert Müller den Markt. Viele Verbraucher kaufen ahnungslos Produkte im Glauben, eine kleine regionale Molkerei zu unterstützen, während das Geld direkt an den Müller-Konzern fließt.",
    corporation: "muller"
  },
  {
    title: "Ausbeutung & Wasserprivatisierung",
    description: "Abfüllung in wasserarmen Regionen (Nestlé)",
    details: "Nestlé steht weltweit massiv in der Kritik für die Privatisierung von Wasserquellen. In Dürregebieten und Schwellenländern (z. B. in Pakistan oder der Region Vittel in Frankreich) pumpt der Konzern Grundwasser ab, um es als Flaschenwasser (Vittel, Pure Life, San Pellegrino) teuer zu verkaufen. Den Einheimischen fehlt dadurch der Zugang zu sicherem, kostenlosem Trinkwasser.",
    corporation: "nestle"
  },
  {
    title: "Babymilch-Skandal",
    description: "Aggressives Marketing in Entwicklungsländern (Nestlé)",
    details: "Nestlé vermarktete Milchpulver in Entwicklungsländern mit verheerenden Folgen. Mütter wurden mit Gratisproben zum Abstillen gedrängt. Durch verunreinigtes Wasser und fehlende Dosierungsmöglichkeiten starben hunderttausende Säuglinge. Der Boykott begann in den 1970er Jahren und ist bis heute ein Symbol für verantwortungsloses Marketing.",
    corporation: "nestle"
  },
  {
    title: "Systematische Kinderarbeit beim Kakao",
    description: "Ausbeutung auf Kakao-Plantagen (Nestlé)",
    details: "Ein Großteil des von Nestlé verarbeiteten Kakaos stammt aus Westafrika (Elfenbeinküste, Ghana). Unabhängige Recherchen dokumentieren dort seit Jahrzehnten Kinderarbeit, Schuldsklaverei und Menschenhandel auf den Plantagen. Nestlé gelang es trotz wiederholter Versprechen nicht, die Lieferketten vollständig von Kinderarbeit zu befreien.",
    corporation: "nestle"
  },
  {
    title: "Regenwaldzerstörung & Plastikmüll",
    description: "Umweltbelastung auf globaler Ebene (Nestlé)",
    details: "Nestlé gehört zu den weltweit größten Verursachern von Einweg-Plastikmüll, der Flüsse und Weltmeere verschmutzt. Zudem verarbeitet der Konzern in großem Umfang billiges Palmöl, dessen Gewinnung für die rohe Rodung gigantischer Regenwaldflächen und die Zerstörung des Lebensraums bedrohter Tierarten verantwortlich ist.",
    corporation: "nestle"
  }
];

// Independent Alternatives
export const independentAlternatives: Alternative[] = [
  // --- MILCH & JOGHURT ALTERNATIVEN (Gegen Müller) ---
  {
    name: "Berchtesgadener Land",
    type: "organic",
    description: "Genossenschaftliche Molkerei aus Bayern. Bekannt für fairen Milchpreis für Bauern, hohe Tierwohlstandards und absolute Unabhängigkeit von Großkonzernen.",
    recommendedFor: ["milch", "joghurt", "sahne", "butter"]
  },
  {
    name: "Schwarzwaldmilch",
    type: "regional",
    description: "Traditionelle, genossenschaftlich organisierte Molkerei im Südwesten Deutschlands. Bietet hervorragende Qualität und gehört den Bauern der Region.",
    recommendedFor: ["milch", "joghurt", "butter", "dessert"]
  },
  {
    name: "Andechser Natur",
    type: "organic",
    description: "Führende Bio-Molkerei in Familienbesitz. Verarbeitet ausschließlich 100% Bio-Milch und setzt sich aktiv für Umweltschutz und faire Erzeugerpreise ein.",
    recommendedFor: ["joghurt", "quark", "milch", "butter", "kaese"]
  },
  {
    name: "Oatly",
    type: "plant-based",
    description: "Der schwedische Pionier für Haferdrinks. Bietet exzellente, klimafreundliche Alternativen zu Milch, Kakao, Kochsahne und Joghurt (Oatgurt).",
    recommendedFor: ["milch", "sahne", "dessert"]
  },
  {
    name: "Alpro / Provamel",
    type: "plant-based",
    description: "Marktführer für pflanzliche Joghurt- und Milchalternativen auf Basis von Soja, Mandel, Hafer und Kokos. Ideal als Ersatz für süße Joghurtbecher.",
    recommendedFor: ["joghurt", "milch", "dessert"]
  },
  
  // --- TOFU & VEGANE ALTERNATIVEN (Gegen Müller & Nestlé) ---
  {
    name: "Taifun Tofu",
    type: "organic",
    description: "Der unabhängige deutsche Bio-Tofu-Pionier aus Freiburg. Um Übernahmen durch Großkonzerne dauerhaft auszuschließen, ist das Unternehmen in einer unverkäuflichen Stiftung organisiert. Verwendet ausschließlich europäischen Bio-Soja aus regionalem Vertragsanbau.",
    recommendedFor: ["tofu", "vegan", "pflanzlich"]
  },
  {
    name: "Lord of Tofu",
    type: "organic",
    description: "Inhabergeführtes Familienunternehmen aus Lörrach. Bekannt für innovative Bio-Tofu-Spezialitäten mit regionalem Soja und handwerklicher Herstellung.",
    recommendedFor: ["tofu", "vegan", "pflanzlich"]
  },
  {
    name: "Kato Tofu",
    type: "organic",
    description: "Inhabergeführte Bio-Tofurei aus Kassel. Stellt seit Jahrzehnten in handwerklicher Tradition hochwertigen Tofu aus deutschem und europäischem Bio-Soja her.",
    recommendedFor: ["tofu", "vegan", "pflanzlich"]
  },

  // --- PIZZA-ALTERNATIVEN (Gegen Nestlé/Wagner) ---
  {
    name: "Gustavo Gusto",
    type: "independent",
    description: "Inhabergeführtes Premium-Tiefkühlpizza-Unternehmen aus Bayern. Bekannt für traditionell im Steinofen gebackene Pizzaböden, hochwertige Bio-Zutaten und absolute Unabhängigkeit.",
    recommendedFor: ["pizza", "wagner"]
  },
  {
    name: "Bio-TK-Pizzen (Soto, Followfood)",
    type: "organic",
    description: "Hervorragende ökologische Tiefkühl-Pizzen und Flammkuchen aus inhabergeführter Bio-Produktion mit Fokus auf nachhaltige Fischerei und faire Landwirtschaft.",
    recommendedFor: ["pizza", "wagner"]
  },

  // --- WASSER-ALTERNATIVEN (Gegen Nestlé/Vittel/Pellegrino) ---
  {
    name: "Viva con Agua",
    type: "independent",
    description: "Gemeinnütziges Brunnenprojekt aus Hamburg. Fließt zu 100% in weltweite Trinkwasserprojekte. Bietet regionales Mineralwasser in umweltfreundlichen Mehrwegflaschen.",
    recommendedFor: ["wasser", "drink"]
  },
  {
    name: "Bio-Mineralwasser (z.B. Preussenquelle)",
    type: "organic",
    description: "Unabhängige Mineralbrunnen (wie Rheinsberger Preussenquelle oder Neumarkter Lammsbräu Bio-Kristall). Streng kontrolliert, klimaneutral und in regionalem Familienbesitz.",
    recommendedFor: ["wasser", "drink"]
  },
  {
    name: "Leitungswasser & Wassersprudler",
    type: "independent",
    description: "Die nachhaltigste, günstigste und 100% Nestlé-freie Alternative. Lokales Leitungswasser ist in Deutschland von exzellenter Qualität und schont Transportwege.",
    recommendedFor: ["wasser", "drink"]
  },

  // --- SÜSSWAREN / SCHOKOLADE ALTERNATIVEN (Gegen Nestlé/KitKat/Smarties) ---
  {
    name: "Tony's Chocolonely",
    type: "independent",
    description: "Niederländischer Schokoladenhersteller, der sich zum Ziel gesetzt hat, die Kakaoindustrie zu 100% sklavenfrei und kinderarbeitsfrei zu machen. Kauft Kakao direkt bei Kooperativen.",
    recommendedFor: ["schokolade", "sweet", "kitkat", "smarties"]
  },
  {
    name: "GEPA / Gepa / Rapunzel",
    type: "organic",
    description: "Die Pioniere des Fairen Handels in Deutschland. Hervorragende Bio-Schokolade und Riegel, die den Kakaobauern existenzsichernde Preise garantieren.",
    recommendedFor: ["schokolade", "sweet", "kitkat", "smarties"]
  },
  {
    name: "Ritter Sport",
    type: "independent",
    description: "Inhabergeführtes, deutsches Familienunternehmen. Setzt auf 100% zertifiziert nachhaltigen Kakaobezug und betreibt eine eigene, nachhaltige Kakaoplantage.",
    recommendedFor: ["schokolade", "sweet", "kitkat", "smarties"]
  },

  // --- GEWÜRZE / SAUCEN ALTERNATIVEN (Gegen Nestlé/Maggi/Thomy) ---
  {
    name: "Byodo",
    type: "organic",
    description: "Inhabergeführtes Naturkostunternehmen aus Bayern. Premium-Feinkost, Senf, Mayonnaise und Salat-Dressing in feinster Bio-Qualität.",
    recommendedFor: ["saucen", "gewuerz", "thomy", "maggi"]
  },
  {
    name: "Sonnentor / Lebensbaum Gewürze",
    type: "organic",
    description: "Die führenden Bio-Gewürzhersteller. Bieten reine, hocharomatische Kräutermischungen, Suppenbrühen und Würzen ohne jegliche künstliche Zusatzstoffe.",
    recommendedFor: ["saucen", "gewuerz", "maggi"]
  },

  // --- SUPERMARKT-BIO-EIGENMARKEN ---
  {
    name: "Alnatura / dmBio / Vemondo",
    type: "independent",
    description: "Bio-Eigenmarken von Drogerien und Supermärkten. Bieten preiswerte, qualitativ hochwertige Alternativen zu klassischen Milch-, Feinkost- und Tofuprodukten.",
    recommendedFor: ["joghurt", "milch", "dessert", "saucen", "tofu", "pizza", "schokolade"]
  }
];

// Normalize strings helper to perform robust matching
export const normalizeString = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD") // Decompose character accents (e.g., ü -> u + ¨)
    .replace(/[\u0300-\u036f]/g, "") // Remove the accent marks
    .replace(/[^a-z0-9]/g, ""); // Keep only letters and numbers
};

// Check if a brand name matches UTM database
export const checkUTMBrand = (brandName: string): UTMBrand | null => {
  const normalizedInput = normalizeString(brandName);
  
  // Direct check
  if (utmBrands[normalizedInput]) {
    return utmBrands[normalizedInput];
  }
  
  // Partial check (e.g. "Molkerei Alois Müller" contains "muller")
  for (const key of Object.keys(utmBrands)) {
    if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
      return utmBrands[key];
    }
  }
  
  return null;
};

// Check if an emb code matches UTM database
export const checkUTMPlant = (embCode: string): UTMPlant | null => {
  const normalizedInput = normalizeString(embCode);
  
  // Search for the plant code in the input
  for (const plant of Object.values(utmPlants)) {
    const normalizedKey = normalizeString(plant.code);
    if (normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput)) {
      return plant;
    }
  }
  
  return null;
};
