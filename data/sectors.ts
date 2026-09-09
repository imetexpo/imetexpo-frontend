// data/sectors.ts

export interface Sector {
  id: number;
  title: string;
  slug: string;
  shortText: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  // For individual sector page
  content?: string;
  subSectors?: SubSector[];
  keyProducts?: string[];
}

export interface SubSector {
  title: string;
  description: string;
}

export const sectorsData: Sector[] = [
  {
    id: 1,
    title: "Coordinate Measuring Machines (CMM)",
    slug: "coordinate-measuring-machines-cmm",
    shortText: "Bridge, gantry, portable, and articulating CMMs for high-precision dimensional inspection.",
    description: "Advanced coordinate measuring machines and 3D measurement systems for precision inspection and quality control.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore CMM",
    buttonLink: "/exhibiting-enquiry",
    content: "The Coordinate Measuring Machines (CMM) sector at INDIAMET showcases advanced technologies for high-precision dimensional measurement and inspection. From bridge and gantry CMMs to portable and articulating arm systems, this sector brings together solutions that help manufacturers achieve dimensional accuracy, improve quality control, and meet demanding production requirements.",
    subSectors: [
      {
        title: "Bridge & Gantry CMMs",
        description: "High-accuracy bridge and gantry CMM systems for precision dimensional inspection of components and assemblies."
      },
      {
        title: "Portable CMMs",
        description: "Portable coordinate measurement systems and articulating arms for flexible inspection directly on the shop floor."
      },
      {
        title: "CMM Probes & Accessories",
        description: "Touch-trigger probes, scanning probes, probe heads, styli, fixtures, and accessories for advanced CMM applications."
      },
      {
        title: "CMM Software",
        description: "Measurement, inspection, programming, reporting, and analysis software for automated and complex CMM operations."
      }
    ],
    keyProducts: [
      "Bridge CMMs",
      "Gantry CMMs",
      "Portable CMMs",
      "Articulating Arm CMMs",
      "Scanning Probes",
      "Touch Trigger Probes",
      "CMM Fixtures",
      "CMM Measurement Software"
    ]
  },
  {
    id: 2,
    title: "Dimensional Measurement & Gauging",
    slug: "dimensional-measurement-and-gauging",
    shortText: "Precision instruments, gauges, comparators, and systems for dimensional and geometric measurement.",
    description: "Precision measurement instruments and gauging solutions for dimensional, tolerance, and geometric inspection.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Measurement",
    buttonLink: "/exhibiting-enquiry",
    content: "The Dimensional Measurement & Gauging sector brings together precision instruments and inspection technologies used to verify dimensions, tolerances, geometry, and manufacturing accuracy. From traditional precision instruments to advanced digital measurement systems, exhibitors showcase solutions for quality inspection across a wide range of manufacturing applications.",
    subSectors: [
      {
        title: "Precision Measuring Instruments",
        description: "Micrometers, vernier instruments, height gauges, dial indicators, and other precision measurement tools."
      },
      {
        title: "Gauges & Comparators",
        description: "Plug gauges, ring gauges, snap gauges, air gauges, electronic gauges, and comparator systems."
      },
      {
        title: "Geometric Measurement",
        description: "Solutions for measuring straightness, flatness, perpendicularity, parallelism, concentricity, and other geometric characteristics."
      },
      {
        title: "Automated Gauging",
        description: "In-process and post-process automated gauging systems for high-volume and precision manufacturing."
      }
    ],
    keyProducts: [
      "Digital Micrometers",
      "Vernier Calipers",
      "Height Gauges",
      "Dial Indicators",
      "Plug & Ring Gauges",
      "Snap Gauges",
      "Air Gauges",
      "Electronic Comparators"
    ]
  },
  {
    id: 3,
    title: "Optical & Vision Metrology",
    slug: "optical-and-vision-metrology",
    shortText: "Video measuring machines, optical systems, machine vision, and non-contact inspection technologies.",
    description: "Advanced optical measurement, machine vision, video inspection, microscopy, and non-contact metrology systems.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Vision Metrology",
    buttonLink: "/exhibiting-enquiry",
    content: "Optical & Vision Metrology at INDIAMET showcases advanced non-contact measurement and inspection technologies. These solutions combine optics, imaging, sensors, and software to inspect complex components, detect defects, verify dimensions, and automate quality inspection processes across modern manufacturing environments.",
    subSectors: [
      {
        title: "Video Measuring Machines",
        description: "High-precision video measurement systems for dimensional and geometric inspection of components."
      },
      {
        title: "Machine Vision",
        description: "Camera-based inspection systems for automated measurement, defect detection, identification, and quality control."
      },
      {
        title: "Optical Measurement",
        description: "Optical comparators, profile projectors, microscopes, and non-contact measurement systems."
      },
      {
        title: "Automated Vision Inspection",
        description: "Integrated vision systems for inline inspection, defect detection, sorting, and production quality control."
      }
    ],
    keyProducts: [
      "Video Measuring Machines",
      "Optical Comparators",
      "Profile Projectors",
      "Machine Vision Systems",
      "Industrial Cameras",
      "Digital Microscopes",
      "Vision Inspection Software",
      "Automated Optical Inspection Systems"
    ]
  },
  {
    id: 4,
    title: "3D Scanning & Digital Measurement",
    slug: "3d-scanning-and-digital-measurement",
    shortText: "3D laser scanners, structured-light systems, handheld scanners, and digital inspection technologies.",
    description: "3D scanning, laser measurement, structured-light systems, reverse engineering, and digital inspection solutions.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore 3D Measurement",
    buttonLink: "/exhibiting-enquiry",
    content: "The 3D Scanning & Digital Measurement sector presents advanced technologies for capturing accurate three-dimensional data from physical objects. These solutions support dimensional inspection, reverse engineering, product development, surface analysis, and digital quality workflows across precision manufacturing industries.",
    subSectors: [
      {
        title: "Laser Scanning",
        description: "Laser-based 3D scanners for accurate surface capture, dimensional inspection, and digital measurement."
      },
      {
        title: "Structured Light Scanning",
        description: "High-resolution structured-light systems for capturing detailed three-dimensional geometry."
      },
      {
        title: "Portable 3D Scanning",
        description: "Handheld and portable scanners for flexible inspection of large, complex, and hard-to-reach components."
      },
      {
        title: "Reverse Engineering",
        description: "3D measurement and modelling solutions for recreating, analysing, and improving existing components."
      }
    ],
    keyProducts: [
      "3D Laser Scanners",
      "Structured-Light Scanners",
      "Handheld 3D Scanners",
      "Portable Scanning Systems",
      "Point Cloud Software",
      "Reverse Engineering Software",
      "3D Inspection Software",
      "Digital Measurement Systems"
    ]
  },
  {
    id: 5,
    title: "Surface & Form Measurement",
    slug: "surface-and-form-measurement",
    shortText: "Advanced systems for surface roughness, contour, roundness, cylindricity, waviness, and form measurement.",
    description: "Precision technologies for surface texture, contour, roundness, cylindricity, profile, and form measurement.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Surface Measurement",
    buttonLink: "/exhibiting-enquiry",
    content: "Surface & Form Measurement is essential for controlling the functional performance and quality of precision components. This sector showcases advanced instruments for analysing surface texture, roughness, contour, roundness, cylindricity, profile, and other geometric characteristics required in demanding manufacturing applications.",
    subSectors: [
      {
        title: "Surface Roughness",
        description: "Contact and non-contact systems for measuring surface roughness, waviness, and surface texture."
      },
      {
        title: "Roundness & Cylindricity",
        description: "Precision form measurement systems for roundness, cylindricity, concentricity, and related characteristics."
      },
      {
        title: "Contour & Profile",
        description: "Advanced contour and profile measurement systems for complex precision components."
      },
      {
        title: "Surface Analysis",
        description: "Surface analysis technologies for evaluating texture, finish, defects, and functional surface characteristics."
      }
    ],
    keyProducts: [
      "Surface Roughness Testers",
      "Roundness Measuring Machines",
      "Cylindricity Measuring Systems",
      "Contour Measuring Machines",
      "Profile Measurement Systems",
      "Surface Texture Analysers",
      "Form Measurement Systems",
      "Non-Contact Surface Profilers"
    ]
  },
  {
    id: 6,
    title: "Calibration & Reference Standards",
    slug: "calibration-and-reference-standards",
    shortText: "Calibration equipment, reference standards, master instruments, and traceability solutions.",
    description: "Calibration technologies, reference standards, master instruments, laboratory systems, and measurement traceability solutions.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Calibration",
    buttonLink: "/exhibiting-enquiry",
    content: "The Calibration & Reference Standards sector focuses on technologies that ensure measurement accuracy, reliability, and traceability. It brings together calibration equipment, master instruments, reference standards, calibration software, and laboratory solutions supporting quality systems across manufacturing and testing environments.",
    subSectors: [
      {
        title: "Dimensional Calibration",
        description: "Calibration systems for dimensional instruments, gauges, measuring machines, and precision equipment."
      },
      {
        title: "Electrical & Electronic Calibration",
        description: "Calibration solutions for electrical, electronic, signal, and instrumentation measurement equipment."
      },
      {
        title: "Temperature & Pressure Calibration",
        description: "Reference equipment and calibration systems for temperature, pressure, and process measurement instruments."
      },
      {
        title: "Reference Standards & Traceability",
        description: "Certified reference standards, master instruments, calibration software, and traceability solutions."
      }
    ],
    keyProducts: [
      "Calibration Benches",
      "Gauge Calibration Systems",
      "Reference Standards",
      "Master Gauges",
      "Temperature Calibrators",
      "Pressure Calibrators",
      "Electrical Calibrators",
      "Calibration Management Software"
    ]
  },
  {
    id: 7,
    title: "Testing & Quality Inspection",
    slug: "testing-and-quality-inspection",
    shortText: "Material testing, mechanical testing, dimensional inspection, NDT, and laboratory quality systems.",
    description: "Testing and inspection technologies for materials, components, products, and manufacturing quality assurance.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Testing",
    buttonLink: "/exhibiting-enquiry",
    content: "The Testing & Quality Inspection sector brings together technologies used to verify material properties, component performance, product integrity, and manufacturing quality. From mechanical and material testing to non-destructive inspection and laboratory systems, this sector supports manufacturers in maintaining consistent quality and meeting industry standards.",
    subSectors: [
      {
        title: "Material Testing",
        description: "Testing systems for evaluating strength, hardness, elasticity, fatigue, and other material characteristics."
      },
      {
        title: "Mechanical Testing",
        description: "Universal testing machines, hardness testers, impact testers, fatigue systems, and related equipment."
      },
      {
        title: "Non-Destructive Testing",
        description: "Ultrasonic, radiographic, magnetic particle, dye penetrant, and other NDT technologies."
      },
      {
        title: "Laboratory Inspection",
        description: "Laboratory instruments and inspection systems for product verification, analysis, and quality assurance."
      }
    ],
    keyProducts: [
      "Universal Testing Machines",
      "Hardness Testers",
      "Impact Testers",
      "Fatigue Testing Machines",
      "Ultrasonic Testing Systems",
      "X-Ray Inspection Systems",
      "Magnetic Particle Testing Equipment",
      "Dye Penetrant Testing Systems"
    ]
  },
  {
    id: 8,
    title: "Sensors, Probes & Measurement Systems",
    slug: "sensors-probes-and-measurement-systems",
    shortText: "Precision sensors, probes, encoders, laser systems, displacement sensors, and data acquisition technologies.",
    description: "Advanced sensors, probes, encoders, transducers, laser measurement systems, and precision data acquisition technologies.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Sensors",
    buttonLink: "/exhibiting-enquiry",
    content: "Sensors, probes, and measurement systems form the foundation of modern automated and digital metrology. This sector showcases technologies that capture accurate measurement data from manufacturing processes, machines, and components, enabling real-time inspection, process control, automation, and data-driven quality management.",
    subSectors: [
      {
        title: "Measurement Probes",
        description: "Touch probes, scanning probes, optical probes, and specialised sensors for dimensional measurement."
      },
      {
        title: "Laser Measurement",
        description: "Laser displacement, distance, thickness, profile, and dimensional measurement technologies."
      },
      {
        title: "Encoders & Position Measurement",
        description: "Linear and rotary encoders for precision positioning and machine measurement applications."
      },
      {
        title: "Data Acquisition",
        description: "Measurement interfaces, data acquisition systems, signal conditioning, and real-time monitoring technologies."
      }
    ],
    keyProducts: [
      "Touch Probes",
      "Scanning Probes",
      "Laser Sensors",
      "Displacement Sensors",
      "Linear Encoders",
      "Rotary Encoders",
      "Measurement Transducers",
      "Data Acquisition Systems"
    ]
  },
  {
    id: 9,
    title: "Metrology Software & Digital Quality",
    slug: "metrology-software-and-digital-quality",
    shortText: "Inspection software, SPC, QMS, measurement data management, digital reporting, and analytics.",
    description: "Metrology software, inspection planning, SPC, QMS, data management, reporting, analytics, and digital quality solutions.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Software",
    buttonLink: "/exhibiting-enquiry",
    content: "Digital transformation is changing how manufacturers collect, analyse, and manage quality data. The Metrology Software & Digital Quality sector showcases software platforms that connect measurement equipment with quality processes, enabling automated reporting, statistical analysis, traceability, inspection planning, and data-driven decision-making.",
    subSectors: [
      {
        title: "Metrology Software",
        description: "Software platforms for CMM programming, measurement analysis, inspection planning, and automated reporting."
      },
      {
        title: "SPC & Statistical Quality",
        description: "Statistical process control tools for monitoring manufacturing processes and identifying quality trends."
      },
      {
        title: "Quality Management Systems",
        description: "Digital QMS platforms for managing inspections, non-conformities, corrective actions, and quality processes."
      },
      {
        title: "Measurement Data Management",
        description: "Systems for collecting, storing, analysing, visualising, and sharing measurement data across production environments."
      }
    ],
    keyProducts: [
      "CMM Software",
      "Inspection Planning Software",
      "SPC Software",
      "QMS Platforms",
      "Measurement Data Management",
      "Digital Inspection Systems",
      "Quality Analytics",
      "Digital Reporting Solutions"
    ]
  },
  {
    id: 10,
    title: "Automation & Industry 4.0",
    slug: "automation-and-industry-40",
    shortText: "Automated inspection, robotic measurement, inline metrology, AI inspection, and smart manufacturing solutions.",
    description: "Automation, robotics, inline metrology, AI-powered inspection, connected measurement, and Industry 4.0 quality technologies.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Automation",
    buttonLink: "/exhibiting-enquiry",
    content: "Automation & Industry 4.0 technologies are transforming inspection and quality control by connecting measurement systems directly with manufacturing processes. This sector showcases robotic inspection, inline metrology, automated gauging, machine vision, artificial intelligence, connected sensors, and smart quality solutions for next-generation manufacturing.",
    subSectors: [
      {
        title: "Automated Inspection",
        description: "Automated measurement and inspection systems designed for high-speed and high-volume manufacturing."
      },
      {
        title: "Robotic Metrology",
        description: "Robotic measurement and inspection systems for flexible and automated quality control."
      },
      {
        title: "Inline Metrology",
        description: "Measurement technologies integrated directly into production lines for real-time process monitoring."
      },
      {
        title: "AI & Smart Inspection",
        description: "Artificial intelligence, machine learning, computer vision, and connected technologies for intelligent inspection."
      }
    ],
    keyProducts: [
      "Automated Gauging Systems",
      "Robotic Inspection Systems",
      "Inline Metrology Systems",
      "AI Vision Inspection",
      "Smart Sensors",
      "Industrial IoT Platforms",
      "Automated Measurement Cells",
      "Connected Quality Systems"
    ]
  },
  {
    id: 11,
    title: "Precision Instruments & Gauges",
    slug: "precision-instruments-and-gauges",
    shortText: "Micrometers, calipers, indicators, gauges, thread measurement, gear inspection, and precision instruments.",
    description: "Precision hand instruments, gauges, indicators, thread and gear measurement systems, and specialised inspection equipment.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Instruments",
    buttonLink: "/exhibiting-enquiry",
    content: "The Precision Instruments & Gauges sector brings together essential measurement tools used throughout manufacturing and quality inspection. From precision hand instruments and gauges to specialised thread, gear, and component measurement systems, this sector supports accurate and reliable inspection across diverse industrial applications.",
    subSectors: [
      {
        title: "Hand Measuring Instruments",
        description: "Precision calipers, micrometers, depth gauges, height gauges, and indicators for shop-floor measurement."
      },
      {
        title: "Thread & Gear Measurement",
        description: "Specialised systems and gauges for measuring threads, gears, splines, and precision transmission components."
      },
      {
        title: "Gauge Systems",
        description: "Plug, ring, snap, thread, taper, and customised gauges for production inspection."
      },
      {
        title: "Precision Inspection Tools",
        description: "Specialised instruments and accessories for accurate dimensional and geometric verification."
      }
    ],
    keyProducts: [
      "Digital Calipers",
      "Outside Micrometers",
      "Inside Micrometers",
      "Dial Indicators",
      "Thread Gauges",
      "Gear Measuring Systems",
      "Plug & Ring Gauges",
      "Precision Inspection Tools"
    ]
  },
  {
    id: 12,
    title: "Metrology Services & Laboratories",
    slug: "metrology-services-and-laboratories",
    shortText: "Calibration laboratories, testing services, dimensional inspection, certification, consultancy, and training.",
    description: "Professional metrology services, calibration laboratories, testing, inspection, certification, consultancy, and training solutions.",
    image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png",
    buttonText: "Explore Services",
    buttonLink: "/exhibiting-enquiry",
    content: "The Metrology Services & Laboratories sector connects manufacturers with specialist organisations providing calibration, testing, inspection, certification, consultancy, and technical training. These services play a critical role in maintaining measurement accuracy, traceability, regulatory compliance, and continuous quality improvement across the manufacturing ecosystem.",
    subSectors: [
      {
        title: "Calibration Laboratories",
        description: "Accredited and specialist laboratories providing calibration services for dimensional, electrical, temperature, pressure, and other instruments."
      },
      {
        title: "Measurement & Inspection Services",
        description: "Contract measurement, dimensional inspection, CMM inspection, 3D scanning, and specialised metrology services."
      },
      {
        title: "Testing & Certification",
        description: "Testing, certification, verification, and compliance services for products, components, instruments, and manufacturing processes."
      },
      {
        title: "Consultancy & Training",
        description: "Metrology consultancy, quality system support, measurement training, GD&T training, and technical competency development."
      }
    ],
    keyProducts: [
      "Calibration Services",
      "Dimensional Inspection Services",
      "CMM Inspection Services",
      "3D Scanning Services",
      "Testing Laboratories",
      "Certification Services",
      "Metrology Consultancy",
      "Metrology Training"
    ]
  }
];

// Helper function to get sector by slug
export function getSectorBySlug(slug: string): Sector | undefined {
  return sectorsData.find(sector => sector.slug === slug);
}

// Helper function to get all sector slugs for static paths
export function getAllSectorSlugs(): string[] {
  return sectorsData.map(sector => sector.slug);
}