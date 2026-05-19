export interface UTMBrand {
  id: string;
  name: string;
  category: string;
  description: string;
  relation: string;
}

export interface UTMPlant {
  code: string;
  name: string;
  city: string;
  state: string;
  description: string;
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
}

// Normalized brands list for fast matching
export const utmBrands: Record<string, UTMBrand> = {
  muller: {
    id: "muller",
    name: "Müller (Müllermilch)",
    category: "Milchmischgetränke, Joghurt, Dessert",
    description: "Die Kernmarke der Unternehmensgruppe. Bekannt für Müllermilch, Joghurt mit der Ecke, Milchreis und Reine Buttermilch.",
    relation: "Direkte Hauptmarke der Molkerei Alois Müller."
  },
  mullermilch: {
    id: "muller",
    name: "Müllermilch",
    category: "Milchmischgetränke",
    description: "Bekanntes Milchmischgetränk in verschiedenen Geschmacksrichtungen.",
    relation: "Direkte Hauptmarke der Molkerei Alois Müller."
  },
  weihenstephan: {
    id: "weihenstephan",
    name: "Weihenstephan",
    category: "Premium-Milchprodukte, Butter, Sahne, Joghurt",
    description: "Traditionsreiche Marke aus Freising, die 2000 von Müller übernommen wurde. Vermarktet als Premium-Marke.",
    relation: "100%ige Tochtergesellschaft der Müller-Gruppe (Staatliche Molkerei Weihenstephan GmbH & Co. KG)."
  },
  sachsenmilch: {
    id: "sachsenmilch",
    name: "Sachsenmilch",
    category: "Milch, Butter, Käse, Joghurt",
    description: "Regionale Marke in Ostdeutschland. Der Standort Leppersdorf ist eine der größten und modernsten Molkereien Europas.",
    relation: "Gehört seit 1994 vollständig zur Unternehmensgruppe Theo Müller."
  },
  landliebe: {
    id: "landliebe",
    name: "Landliebe",
    category: "Joghurt, Milch, Pudding, Butter",
    description: "Traditionelle Marke mit ländlichem Image. Wurde im April 2023 von FrieslandCampina übernommen.",
    relation: "Im Zuge der Übernahme des deutschen Konsumgeschäfts von FrieslandCampina an Müller übergegangen."
  },
  almhof: {
    id: "almhof",
    name: "Almhof",
    category: "Joghurt, Desserts",
    description: "Bekannte Marke in den Niederlanden und teilweise in Westdeutschland.",
    relation: "Tochtergesellschaft der Unternehmensgruppe Theo Müller."
  },
  elinas: {
    id: "elinas",
    name: "Elinas",
    category: "Joghurt nach griechischer Art",
    description: "Spezialitäten-Joghurtmarke im deutschen Lebensmittelhandel.",
    relation: "Marke der Molkerei Alois Müller GmbH & Co. KG."
  },
  lunebest: {
    id: "lunebest",
    name: "Lünebest",
    category: "Wackelpudding, Joghurt, Desserts",
    description: "Traditionsmarke für süße Desserts, bekannt für Wackelpudding und Becher-Joghurts.",
    relation: "Wurde von Müller übernommen (Betriebsstätte Elsterwerda)."
  },
  kasereloose: {
    id: "kasereloose",
    name: "Käserei Loose",
    category: "Sauermilchkäse, Quäse, Harzer Käse",
    description: "Bekanntester Hersteller von Sauermilchkäse in Deutschland (Quäse, Loose Hausmacher).",
    relation: "Seit 1998 eine eigenständige Tochtergesellschaft der Unternehmensgruppe Theo Müller."
  },
  loose: {
    id: "kasereloose",
    name: "Loose",
    category: "Käse",
    description: "Sauermilchkäse-Spezialitäten.",
    relation: "Gehört zur Käserei Loose (Müller-Gruppe)."
  },
  quase: {
    id: "kasereloose",
    name: "Quäse",
    category: "Käse",
    description: "Fitness-Käse aus Sauermilchquark, reich an Protein.",
    relation: "Marke der Käserei Loose, die zur Müller-Gruppe gehört."
  },
  nadler: {
    id: "nadler",
    name: "Nadler",
    category: "Feinkost, Fischspezialitäten, Saucen",
    description: "Bekannte Marke für Heringssalate, Brotaufstriche und Fisch-Feinkost.",
    relation: "Gehört zur Homann-Gruppe und verblieb nach dem Verkauf der Salatsparte bei der Müller-Gruppe."
  },
  homann: {
    id: "homann",
    name: "Homann",
    category: "Saucen, Dressings, Fischprodukte",
    description: "Bekannte Feinkostmarke. ACHTUNG: Die Feinkostsalate-Sparte wurde 2021 an Signature Foods verkauft. Dressings, Saucen und Fischprodukte gehören weiterhin zu Müller.",
    relation: "Saucen und Fisch verbleiben in der Müller-Feinkostsparte. Salate sind unabhängig."
  },
  berief: {
    id: "berief",
    name: "Berief",
    category: "Pflanzliche Drinks, Tofu, Joghurt-Alternativen",
    description: "Bio-Pflanzendrink- und Tofu-Hersteller aus Beckum. Die Übernahme durch die Unternehmensgruppe Theo Müller wurde im Mai 2026 bekannt gegeben.",
    relation: "Wird innerhalb der Müller-Gruppe zur Stärkung der pflanzlichen Feinkost- und Molkereisparte geführt."
  }
};

// Known UTM Plant Codes (Genusstauglichkeitskennzeichen / Identitätskennzeichen)
export const utmPlants: Record<string, UTMPlant> = {
  deby718eg: {
    code: "DE BY 718 EG",
    name: "Molkerei Alois Müller GmbH & Co. KG",
    city: "Aretsried",
    state: "Bayern",
    description: "Das Stammhaus der Molkerei Müller. Hier werden Müllermilch, Joghurt mit der Ecke und Buttermilch produziert."
  },
  deby718ec: {
    code: "DE BY 718 EC",
    name: "Molkerei Alois Müller GmbH & Co. KG",
    city: "Aretsried",
    state: "Bayern",
    description: "Das Stammhaus der Molkerei Müller. Hier werden Müllermilch, Joghurt mit der Ecke und Buttermilch produziert."
  },
  desn016eg: {
    code: "DE SN 016 EG",
    name: "Sachsenmilch Leppersdorf GmbH",
    city: "Leppersdorf",
    state: "Sachsen",
    description: "Eine der größten Molkereien Europas. Produziert Sachsenmilch-Produkte, aber auch in riesigem Umfang Handelsmarken (z.B. Milbona, ja!, Gut & Günstig) für Lidl, Aldi, Edeka, REWE."
  },
  desn016ec: {
    code: "DE SN 016 EC",
    name: "Sachsenmilch Leppersdorf GmbH",
    city: "Leppersdorf",
    state: "Sachsen",
    description: "Eine der größten Molkereien Europas. Produziert Sachsenmilch-Produkte, aber auch in riesigem Umfang Handelsmarken (z.B. Milbona, ja!, Gut & Günstig) für Lidl, Aldi, Edeka, REWE."
  },
  deby103eg: {
    code: "DE BY 103 EG",
    name: "Molkerei Weihenstephan (Staatliche Molkerei Weihenstephan GmbH & Co. KG)",
    city: "Freising",
    state: "Bayern",
    description: "Ehemalige staatliche Traditionsmolkerei, heute Müller-Tochter. Produziert alle Weihenstephan-Milchprodukte, Butter und Rahm."
  },
  deby103ec: {
    code: "DE BY 103 EC",
    name: "Molkerei Weihenstephan",
    city: "Freising",
    state: "Bayern",
    description: "Ehemalige staatliche Traditionsmolkerei, heute Müller-Tochter. Produziert alle Weihenstephan-Milchprodukte, Butter und Rahm."
  },
  denw401eg: {
    code: "DE NW 401 EG",
    name: "Molkerei Köln (ehem. FrieslandCampina)",
    city: "Köln",
    state: "Nordrhein-Westfalen",
    description: "Molkerei-Standort in Köln, im April 2023 von FrieslandCampina an Müller übergeben. Hier werden u.a. Landliebe-Produkte hergestellt."
  },
  denw401ec: {
    code: "DE NW 401 EC",
    name: "Molkerei Köln (ehem. FrieslandCampina)",
    city: "Köln",
    state: "Nordrhein-Westfalen",
    description: "Molkerei-Standort in Köln, im April 2023 von FrieslandCampina an Müller übergeben. Hier werden u.a. Landliebe-Produkte hergestellt."
  },
  debw033eg: {
    code: "DE BW 033 EG",
    name: "Molkerei Heilbronn (ehem. FrieslandCampina)",
    city: "Heilbronn",
    state: "Baden-Württemberg",
    description: "Großer Molkerei-Standort in Heilbronn, im April 2023 an Müller übergeben. Produziert Landliebe-Produkte."
  },
  debw033ec: {
    code: "DE BW 033 EC",
    name: "Molkerei Heilbronn (ehem. FrieslandCampina)",
    city: "Heilbronn",
    state: "Baden-Württemberg",
    description: "Großer Molkerei-Standort in Heilbronn, im April 2023 an Müller übergeben. Produziert Landliebe-Produkte."
  },
  debw034eg: {
    code: "DE BW 034 EG",
    name: "Molkerei Schefflenz (ehem. FrieslandCampina)",
    city: "Schefflenz",
    state: "Baden-Württemberg",
    description: "Spezialstandort für traditionelle Milchverarbeitung, im April 2023 an die Müller-Gruppe übergegangen."
  },
  debw034ec: {
    code: "DE BW 034 EC",
    name: "Molkerei Schefflenz (ehem. FrieslandCampina)",
    city: "Schefflenz",
    state: "Baden-Württemberg",
    description: "Spezialstandort für traditionelle Milchverarbeitung, im April 2023 an die Müller-Gruppe übergegangen."
  }
};

// Boycott explanations for the background section
export const boycottReasons: BoycottReason[] = [
  {
    title: "Rechtsextreme Kontroversen",
    description: "Verbindungen zu rechtsextremen Politikern",
    details: "Theo Müller hat in Interviews offen bestätigt, sich regelmäßig mit hochrangigen Politikern der AfD (Alternative für Deutschland), u.a. mit Bundessprecherin Alice Weidel, zu treffen. Diese Treffen und die Weigerung, sich von rechtsextremem Gedankengut zu distanzieren, führten zu breiten Protesten und Boykottaufrufen unter dem Motto 'Kein Geld für Faschos'."
  },
  {
    title: "Steuerflucht in die Schweiz",
    description: "Umzug aus steuerlichen Gründen",
    details: "Theo Müller verlegte 2003 seinen Hauptwohnsitz in die Schweiz (Erlenbach ZH), um der deutschen Erbschaftsteuer zu entgehen. Dies stieß auf starke Kritik, da das Unternehmen gleichzeitig in Deutschland staatliche Subventionen in Millionenhöhe (z.B. für den Ausbau des Werks in Leppersdorf) in Anspruch nahm."
  },
  {
    title: "Marktmacht & Druck auf Erzeuger",
    description: "Ausnutzung monopolähnlicher Stellungen",
    details: "Die Unternehmensgruppe Theo Müller kontrolliert einen gigantischen Anteil des deutschen Milchmarktes. Kritiker und Bauernverbände werfen dem Konzern vor, seine enorme Marktmacht auszunutzen, um die Milchpreise für die landwirtschaftlichen Erzeuger extrem niedrig zu halten, was viele Familienbetriebe in den Ruin treibt."
  },
  {
    title: "Aggressive Expansion & Markensterben",
    description: "Aufkauf unabhängiger Traditionsmarken",
    details: "Durch den aggressiven Aufkauf von Traditionsmarken wie Weihenstephan oder zuletzt Landliebe (2023) monopolisiert Müller den Markt. Viele Verbraucher kaufen ahnungslos Produkte im Glauben, eine kleine regionale Molkerei zu unterstützen, während das Geld direkt an den Müller-Konzern fließt."
  }
];

// Independent Alternatives
export const independentAlternatives: Alternative[] = [
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
  {
    name: "Alnatura / dmBio / Vemondo",
    type: "independent",
    description: "Bio-Eigenmarken von Drogerien und Supermärkten. Bieten preiswerte, qualitativ hochwertige Alternativen zu klassischen Milch-, Feinkost- und Tofuprodukten.",
    recommendedFor: ["joghurt", "milch", "dessert", "saucen", "tofu"]
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
