// app/exhibition-directory/api.ts

export interface ExhibitionCompany {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  fullAddress?: string;
  logo?: string;
  country: string;
  countryCode?: string;
  pavilion: string;
  hall?: string;
  standNumber: string;
  sector: string[];
  website?: string;
  contactPerson?: {
    name?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  title?: string;
  description?: string;
  price?: string;
  image?: string;
}

export interface Brochure {
  id: string;
  name: string;
  title?: string;
  description?: string;
  fileUrl?: string;
  url?: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
}

// Mock data - Replace with your actual API calls
const MOCK_COMPANIES: ExhibitionCompany[] = [
  {
    id: "1",
    name: "NPO Akonit",
    shortName: "Akonit",
    description: "Leading manufacturer of mining equipment and standardized parts for the mining industry. With over 30 years of experience, NPO Akonit provides innovative solutions for mineral processing and mining operations.",
    fullAddress: "123 Industrial Park, Moscow, Russia",
    logo: "",
    country: "Russia",
    countryCode: "RU",
    pavilion: "Pavilion 1",
    hall: "Hall A",
    standNumber: "A101",
    sector: ["Mining Equipment", "Mineral Processing", "Spare Parts"],
    website: "https://akonit.ru",
    contactPerson: {
      name: "Ivan Petrov",
      jobTitle: "Sales Director",
      email: "ivan@akonit.ru",
      phone: "+7 495 123 4567"
    }
  },
  {
    id: "2",
    name: "Sever Minerals",
    shortName: "Sever",
    description: "Comprehensive mining solutions provider specializing in mineral exploration and extraction technologies.",
    fullAddress: "45 Northern Avenue, St. Petersburg, Russia",
    logo: "",
    country: "Russia",
    countryCode: "RU",
    pavilion: "Pavilion 1",
    hall: "Hall B",
    standNumber: "B205",
    sector: ["Exploration", "Mining Equipment", "Consulting"],
    website: "https://sever-minerals.ru",
    contactPerson: {
      name: "Maria Volkova",
      jobTitle: "Business Development Manager",
      email: "maria@sever.ru",
      phone: "+7 812 987 6543"
    }
  },
  {
    id: "3",
    name: "TEM Partner",
    shortName: "TEM",
    description: "Leading provider of heavy equipment and machinery for the mining industry.",
    fullAddress: "89 Machinery Blvd, Ekaterinburg, Russia",
    logo: "",
    country: "Russia",
    countryCode: "RU",
    pavilion: "Pavilion 2",
    hall: "Hall C",
    standNumber: "C312",
    sector: ["Heavy Equipment", "Transportation", "Logistics"],
    website: "https://tem-partner.ru",
    contactPerson: {
      name: "Alexey Smirnov",
      jobTitle: "Technical Director",
      email: "alexey@tem.ru",
      phone: "+7 343 555 1212"
    }
  },
  {
    id: "4",
    name: "Flotent Chemicals Rus",
    shortName: "Flotent",
    description: "Specialized chemical solutions for mineral processing and flotation processes.",
    fullAddress: "12 Chemical Lane, Kazan, Russia",
    logo: "",
    country: "Russia",
    countryCode: "RU",
    pavilion: "Pavilion 1",
    hall: "Hall A",
    standNumber: "A156",
    sector: ["Chemicals", "Mineral Processing", "Reagents"],
    website: "https://flotent.ru",
    contactPerson: {
      name: "Elena Kuznetsova",
      jobTitle: "Technical Sales Manager",
      email: "elena@flotent.ru",
      phone: "+7 843 234 5678"
    }
  },
  {
    id: "5",
    name: "RIVS",
    shortName: "RIVS",
    description: "Manufacturer of specialized aeration units and flotation machines for mineral processing.",
    fullAddress: "67 Engineering St, Novosibirsk, Russia",
    logo: "",
    country: "Russia",
    countryCode: "RU",
    pavilion: "Pavilion 2",
    hall: "Hall D",
    standNumber: "D401",
    sector: ["Flotation Equipment", "Aeration Systems", "Processing"],
    website: "https://rivs.ru",
    contactPerson: {
      name: "Dmitry Orlov",
      jobTitle: "Chief Engineer",
      email: "dmitry@rivs.ru",
      phone: "+7 383 777 8899"
    }
  },
  {
    id: "6",
    name: "China Mining Equipment Co.",
    shortName: "CMEC",
    description: "Leading Chinese manufacturer of mining machinery and equipment.",
    fullAddress: "88 Industrial Zone, Shanghai, China",
    logo: "",
    country: "China",
    countryCode: "CN",
    pavilion: "Pavilion 3",
    hall: "Hall E",
    standNumber: "E501",
    sector: ["Mining Equipment", "Crushers", "Grinding Mills"],
    website: "https://cmec.cn",
    contactPerson: {
      name: "Wei Zhang",
      jobTitle: "Export Manager",
      email: "wei@cmec.cn",
      phone: "+86 21 1234 5678"
    }
  },
  {
    id: "7",
    name: "Kaz Minerals",
    shortName: "KazMin",
    description: "Kazakhstan's leading mining company specializing in copper production.",
    fullAddress: "45 Mining Avenue, Nur-Sultan, Kazakhstan",
    logo: "",
    country: "Kazakhstan",
    countryCode: "KZ",
    pavilion: "Pavilion 1",
    hall: "Hall B",
    standNumber: "B289",
    sector: ["Copper Mining", "Mineral Processing", "Exploration"],
    website: "https://kazminerals.kz",
    contactPerson: {
      name: "Nurlan Sultanov",
      jobTitle: "Commercial Director",
      email: "nurlan@kazmin.kz",
      phone: "+7 7172 345 678"
    }
  },
  {
    id: "8",
    name: "Turkish Mining Machinery",
    shortName: "TMM",
    description: "Premium mining equipment manufacturer from Turkey.",
    fullAddress: "56 Machinery Park, Ankara, Turkey",
    logo: "",
    country: "Turkey",
    countryCode: "TR",
    pavilion: "Pavilion 2",
    hall: "Hall C",
    standNumber: "C345",
    sector: ["Drilling Equipment", "Excavators", "Loaders"],
    website: "https://tmm.com.tr",
    contactPerson: {
      name: "Mehmet Demir",
      jobTitle: "Sales Manager",
      email: "mehmet@tmm.com.tr",
      phone: "+90 312 555 6677"
    }
  }
];

// Mock products
const MOCK_PRODUCTS: Record<string, Product[]> = {
  "1": [
    { id: "p1", name: "Standardized Parts", description: "High-quality standardized components for mining equipment", price: "Custom pricing" },
    { id: "p2", name: "Flotation Machines", description: "Advanced flotation technology for mineral processing", price: "On request" }
  ],
  "2": [
    { id: "p3", name: "Exploration Drills", description: "High-precision drilling equipment for mineral exploration", price: "$50,000 - $200,000" }
  ],
  "4": [
    { id: "p4", name: "Flotation Reagents", description: "Specialized chemicals for mineral flotation processes", price: "Contact for pricing" }
  ]
};

// Mock brochures
const MOCK_BROCHURES: Record<string, Brochure[]> = {
  "1": [
    { id: "b1", name: "Company Brochure", description: "Complete overview of NPO Akonit products and services" },
    { id: "b2", name: "Product Catalog", description: "Detailed specifications of all equipment" }
  ],
  "2": [
    { id: "b3", name: "Sever Minerals Profile", description: "Company capabilities and project portfolio" }
  ]
};

// Mock brands
const MOCK_BRANDS: Record<string, Brand[]> = {
  "1": [
    { id: "br1", name: "Akonit Pro", description: "Premium equipment line" },
    { id: "br2", name: "Akonit Standard", description: "Standardized parts line" }
  ],
  "4": [
    { id: "br3", name: "Flotent X", description: "Advanced flotation reagents" }
  ]
};

export async function fetchExhibitionCompanies(
  page: number = 1,
  limit: number = 24,
  search: string = ""
): Promise<{ companies: ExhibitionCompany[]; totalPages: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = [...MOCK_COMPANIES];
  
  if (search) {
    filtered = filtered.filter(company => 
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.sector.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const totalPages = Math.ceil(filtered.length / limit);
  
  return {
    companies: paginated,
    totalPages
  };
}

export async function fetchExhibitionCompanyById(id: string): Promise<ExhibitionCompany | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_COMPANIES.find(c => c.id === id) || null;
}

export async function fetchExhibitorProducts(companyId: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return MOCK_PRODUCTS[companyId] || [];
}

export async function fetchExhibitorBrochures(companyId: string): Promise<Brochure[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return MOCK_BROCHURES[companyId] || [];
}

export async function fetchExhibitorBrands(companyId: string): Promise<Brand[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return MOCK_BRANDS[companyId] || [];
}