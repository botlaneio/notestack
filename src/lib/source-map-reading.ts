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
    questions: ['Compare the two maps and use their legends to identify the higher and lower paddy- and wheat-growing areas.', 'Compare paddy in the eastern and coastal lowlands with wheat in northern plains. Relate the patterns to water, temperature and irrigation.', 'Compare sugarcane, tobacco, cotton and jute distributions. Explain their different climatic and processing requirements.', 'Locate tea and coffee regions and compare altitude, rainfall, slopes and processing links.', 'Use the source year when discussing rankings. A producing region and the largest producer are different observations.']
  },
  {
    chapter: 26, pages: '91–97', title: 'Mineral and energy maps',
    layers: ['Iron ores — Odisha, Chhattisgarh, Jharkhand and Karnataka examples', 'Manganese — Odisha, Karnataka, Madhya Pradesh and Maharashtra examples', 'Bauxite — major peninsular and plateau deposits', 'Mica — Jharkhand, Andhra Pradesh and Rajasthan examples', 'Gold — Karnataka, including Hutti and historical Kolar fields', 'Energy — coalfields, petroleum regions and atomic-mineral locations'],
    questions: ['Read each resource symbol and distinguish a mine, deposit, oilfield, refinery and power station.', 'Trace all regions marked in each source map and record the State and resource together.', 'Compare resources near steel regions with petroleum production and refinery locations.', 'Explain how transport, power and processing can connect a deposit to a distant factory.']
  },
  {
    chapter: 27, pages: '98–106', title: 'Transport networks and connections',
    layers: ['Golden Quadrilateral — Delhi, Mumbai, Chennai and Kolkata', 'North–south corridor — Srinagar to Kanyakumari', 'East–west corridor — Silchar to Porbandar', 'Highway routes and junctions', 'Major coastal ports and international airports'],
    questions: ['Trace complete routes between their termini on the source maps. Preserve the route legend and reference date.', 'List the ports and airports shown and identify their coast or inland region.', 'Compare network density with terrain and population centres. Identify links between roads, railways, ports and airports.', 'Check present highway numbers against a dated official map when adapting an older source.']
  },
  {
    chapter: 28, pages: '107–113', title: 'Industrial regions and centres',
    layers: ['Mumbai–Pune and Ahmedabad–Vadodara regions', 'Hooghly and Chota Nagpur regions', 'Bengaluru–Tamil Nadu and Visakhapatnam–Guntur regions', 'Kollam–Thiruvananthapuram and Gurgaon–Delhi–Meerut regions', 'Iron and steel, textiles, sugar, paper and knowledge-industry centres'],
    questions: ['Match each of the three industry symbols to a labelled centre.', 'Use the chapter text to locate the named industrial regions. Find labelled centres on the map.', 'Compare raw materials, energy, water, skills, markets and transport in two regions.', 'Explain why industrial regions have approximate boundaries and can contain several types of production.']
  },
  {
    chapter: 29, pages: '114–120', title: 'Disaster-affected and hazard regions',
    layers: ['Cyclone-exposed eastern and western coastal regions', 'River-flood regions including Ganga–Brahmaputra plains', 'Landslide-prone mountain and hill regions', 'Coastal erosion locations', 'Earthquake zones and source examples including the Himalayas, northeast, Gujarat, Koyna and Latur'],
    questions: ['Read the source map title and legend to identify whether it depicts a hazard zone or a past event.', 'Trace every mapped region and compare exposure of settlements, transport and livelihoods.', 'Explain how a regional hazard classification differs from an individual site assessment.', 'Use current IMD, CWC and NDMA information for actual events, alongside the historical textbook map.']
  }
];

type TextbookMap = {
  file: string;
  title: string;
  page: number;
  description: string;
};

export const textbookMaps: Record<number, TextbookMap[]> = {
  12: [
    {file:'major-soils',title:'Major soil types',page:103,description:'Follow the six patterns for mountain, alluvial, red, black, laterite and desert soils. The dark Deccan region is black soil, printed as “Block soil” in the key.'}
  ],
  25: [
    {file:'paddy',title:'Paddy-growing areas',page:85,description:'Vertical lines show the lower growing category. Dense diagonal lines show the higher category, concentrated in the east with smaller coastal patches.'},
    {file:'wheat',title:'Wheat-growing areas',page:86,description:'Read the same two hatching patterns as on the paddy map. The higher wheat-growing category stretches across the northern plains into central India.'}
  ],
  26: [
    {file:'iron-manganese',title:'Iron and manganese ores',page:92,description:'Filled triangles locate iron ore and dots locate manganese ore. Compare the clusters in Karnataka and Odisha.'},
    {file:'bauxite-mica-gold',title:'Bauxite, mica and gold',page:93,description:'Open circles locate bauxite, triangles locate mica and squares locate gold. Trace the mica symbols from Rajasthan to the eastern plateau and Andhra Pradesh.'},
    {file:'power-resources',title:'Power resources',page:96,description:'The key distinguishes coal, lignite, petroleum and nuclear stations. Compare the coal belt around Jharkhand with the petroleum symbols in Assam and offshore near Mumbai.'}
  ],
  27: [
    {file:'transport',title:'Highways, ports and international airports',page:100,description:'Trace the Delhi–Kolkata–Chennai–Mumbai–Delhi circuit using the highway lines and junctions. The key uses circles for corridor or highway nodes, filled dots for ports and stars for international airports.'}
  ],
  28: [
    {file:'industries',title:'Industrial centres',page:110,description:'Triangles mark paper, circles mark iron and steel, and stars mark cotton industry centres. Compare the eastern cluster around Jamshedpur with the western centres around Mumbai and Ahmedabad.'}
  ],
  29: [
    {file:'hazards',title:'Cyclone areas and earthquake centres',page:115,description:'Triangles mark cyclone areas along the coasts. Dots mark earthquake centres, including locations in the Himalayas, northeast and peninsular India. These are textbook examples, not a forecast.'}
  ]
};
