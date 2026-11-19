export type SourceMapReading = {
  chapter: number;
  pages: string;
  title: string;
  layers: string[];
  questions: string[];
};

export const sourceMapReadings: SourceMapReading[] = [
  {
    chapter: 12, pages: '103', title: 'Major soil types',
    layers: ['Alluvial soils — northern river plains, valleys and coastal lowlands', 'Black soils — Deccan basalt regions', 'Red soils — extensive peninsular areas', 'Laterite soils — wet uplands and Ghats', 'Desert soils — arid western areas', 'Mountain soils — Himalayan regions'],
    questions: ['Read every colour or pattern in the source legend before identifying a region.', 'Trace the extent of each soil group across the map. Compare the northern plains, western dry region and peninsula.', 'Identify transitions and mixed areas. Explain why a regional soil label needs local observations or testing for a farm-level decision.']
  },
  {
    chapter: 25, pages: '81–90', title: 'Agricultural distribution maps',
    layers: ['Food crops — paddy, wheat, jowar and ragi', 'Commercial crops — sugarcane and tobacco', 'Fibre crops — cotton and jute', 'Beverage crops — tea and coffee', 'Seasons — kharif, rabi and zaid'],
    questions: ['For each source crop map, copy its exact legend into a working list and identify every marked producing region.', 'Compare paddy in the eastern and coastal lowlands with wheat in northern plains. Relate the patterns to water, temperature and irrigation.', 'Compare sugarcane, tobacco, cotton and jute distributions. Explain their different climatic and processing requirements.', 'Locate tea and coffee regions and compare altitude, rainfall, slopes and processing links.', 'Use the source year when discussing rankings. A producing region and the largest producer are different observations.']
  },
  {
    chapter: 26, pages: '91–97', title: 'Mineral and energy maps',
    layers: ['Iron ores — Odisha, Chhattisgarh, Jharkhand and Karnataka examples', 'Manganese — Odisha, Karnataka, Madhya Pradesh and Maharashtra examples', 'Bauxite — major peninsular and plateau deposits', 'Mica — Jharkhand, Andhra Pradesh and Rajasthan examples', 'Gold — Karnataka, including Hutti and historical Kolar fields', 'Energy — coalfields, petroleum regions and atomic-mineral locations'],
    questions: ['Read each resource symbol and distinguish a mine, deposit, oilfield, refinery and power station.', 'Trace all regions marked in each source map and record the State and resource together.', 'Compare resources near steel regions with petroleum production and refinery locations.', 'Explain how transport, power and processing can connect a deposit to a distant factory.']
  },
  {
    chapter: 27, pages: '98–106', title: 'Transport networks and connections',
    layers: ['Golden Quadrilateral — Delhi, Mumbai, Chennai and Kolkata', 'North–south corridor — Srinagar to Kanyakumari', 'East–west corridor — Silchar to Porbandar', 'Road and railway networks', 'Major coastal ports and international airports'],
    questions: ['Trace complete routes between their termini on the source maps. Preserve the route legend and reference date.', 'List the ports and airports shown and identify their coast or inland region.', 'Compare network density with terrain and population centres. Identify links between roads, railways, ports and airports.', 'Check present highway numbers against a dated official map when adapting an older source.']
  },
  {
    chapter: 28, pages: '107–113', title: 'Industrial regions and centres',
    layers: ['Mumbai–Pune and Ahmedabad–Vadodara regions', 'Hooghly and Chota Nagpur regions', 'Bengaluru–Tamil Nadu and Visakhapatnam–Guntur regions', 'Kollam–Thiruvananthapuram and Gurgaon–Delhi–Meerut regions', 'Iron and steel, textiles, sugar, paper and knowledge-industry centres'],
    questions: ['Distinguish the map’s regional shading from individual factory or city symbols.', 'Trace each named industrial region and identify representative centres from the source.', 'Compare raw materials, energy, water, skills, markets and transport in two regions.', 'Explain why industrial regions have approximate boundaries and can contain several types of production.']
  },
  {
    chapter: 29, pages: '114–120', title: 'Disaster-affected and hazard regions',
    layers: ['Cyclone-exposed eastern and western coastal regions', 'River-flood regions including Ganga–Brahmaputra plains', 'Landslide-prone mountain and hill regions', 'Coastal erosion locations', 'Earthquake zones and source examples including the Himalayas, northeast, Gujarat, Koyna and Latur'],
    questions: ['Read the source map title and legend to identify whether it depicts a hazard zone or a past event.', 'Trace every mapped region and compare exposure of settlements, transport and livelihoods.', 'Explain how a regional hazard classification differs from an individual site assessment.', 'Use current IMD, CWC and NDMA information for actual events, alongside the historical textbook map.']
  }
];
