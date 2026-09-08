// app/articles/data.ts

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  publishedDate: string;
  content: string;
};

export const ARTICLES: Article[] = [
  {
    id: 199,
    title: "The Future of Industrial Metrology in Smart Manufacturing",
    slug: "future-of-industrial-metrology-smart-manufacturing",
    excerpt:
      "Explore how advanced metrology and digital technologies are transforming quality control and precision manufacturing.",
    image:
      "https://cdn.itegroupnews.com/photo_1_main_1_f5b42c6a16.webp",
    publishedDate: "2026-09-05T08:45:00.000Z",
    content: `
      <h2><strong>The Future of Industrial Metrology in Smart Manufacturing</strong></h2>
      <p>&nbsp;</p>
      <p>Industrial manufacturing is entering a new era where precision, automation, connectivity, and data-driven quality control are becoming essential to remain competitive.</p>
      <p>&nbsp;</p>
      <p>Modern metrology plays a critical role in this transformation by enabling manufacturers to measure components accurately, identify deviations early, and maintain consistent product quality.</p>
      <p>&nbsp;</p>

      <h3><strong>Why Metrology Matters in Modern Manufacturing</strong></h3>
      <p>As manufacturing tolerances become increasingly demanding, traditional inspection methods are being complemented by advanced coordinate measuring machines, optical systems, 3D scanners, sensors, and automated inspection technologies.</p>
      <p>&nbsp;</p>

      <h3><strong>Connected Measurement Systems</strong></h3>
      <p>Connected metrology systems allow measurement data to move directly into quality management and manufacturing systems. This creates greater visibility into production performance and helps engineers make faster decisions.</p>
      <p>&nbsp;</p>

      <h3><strong>Automation and Digital Quality</strong></h3>
      <p>Automated inspection is helping manufacturers reduce inspection time, improve repeatability, and detect quality issues earlier in the production process.</p>
      <p>&nbsp;</p>

      <h3><strong>The Road Ahead</strong></h3>
      <p>The future of industrial metrology will increasingly combine high-precision measurement with automation, artificial intelligence, digital twins, advanced analytics, and connected manufacturing environments.</p>
    `,
  },

   {
    id: 200,
    title: "Latest Innovations in CMM and 3D Measurement",
    slug: "latest-innovations-cmm-3d-measurement",
    excerpt:
      "Discover how next-generation CMMs and 3D measurement technologies are improving accuracy, productivity, and inspection capabilities.",
    image:
      "https://cdn.itegroupnews.com/photo_2_84279059fe.webp",
    publishedDate: "2026-09-02T10:30:00.000Z",
    content: `
      <h2><strong>Next-Generation CMM and 3D Measurement Technologies</strong></h2>
      <p>&nbsp;</p>
      <p>Coordinate Measuring Machines remain one of the most important technologies for high-precision dimensional inspection. New developments are making CMM systems faster, more flexible, automated, and easier to integrate into modern manufacturing environments.</p>
      <p>&nbsp;</p>

      <h3><strong>High-Speed Measurement</strong></h3>
      <p>Modern CMMs are designed to improve measurement speed while maintaining the accuracy required for demanding industrial applications.</p>
      <p>&nbsp;</p>

      <h3><strong>3D Scanning and Point Clouds</strong></h3>
      <p>3D scanning technologies capture large amounts of dimensional information quickly, making them valuable for complex components, reverse engineering, inspection, and process improvement.</p>
      <p>&nbsp;</p>

      <h3><strong>Automated Inspection</strong></h3>
      <p>Automated measurement routines reduce manual intervention and help manufacturers achieve consistent inspection results across production batches.</p>
      <p>&nbsp;</p>

      <h3><strong>Integration with Manufacturing</strong></h3>
      <p>CMM and 3D measurement systems are increasingly connected with CAD, quality management, manufacturing execution, and production systems.</p>
    `,
  },
  {
    id: 201,
    title: "Industry 4.0: The Evolution of Smart Metrology",
    slug: "industry-4-smart-metrology",
    excerpt:
      "Discover how automation, connected measurement systems, data analytics, and AI are shaping the future of industrial quality.",
    image:
      "https://cdn.itegroupnews.com/photo_3_30daf082db.webp",
    publishedDate: "2026-08-28T14:20:00.000Z",
    content: `
      <h2><strong>How Industry 4.0 Is Transforming Metrology</strong></h2>
      <p>&nbsp;</p>
      <p>Industry 4.0 is changing the way manufacturers collect, analyse, and use measurement data. Smart metrology connects measurement systems with production processes to create a more responsive quality environment.</p>
      <p>&nbsp;</p>

      <h3><strong>Connected Measurement</strong></h3>
      <p>Modern measurement equipment can communicate with manufacturing and quality systems, enabling real-time access to inspection information.</p>
      <p>&nbsp;</p>

      <h3><strong>Data-Driven Quality Control</strong></h3>
      <p>Measurement data can be analysed to identify trends, process variations, and potential quality issues before they become costly production problems.</p>
      <p>&nbsp;</p>

      <h3><strong>Artificial Intelligence in Inspection</strong></h3>
      <p>AI and machine learning are creating new possibilities for automated visual inspection, defect detection, predictive quality, and intelligent analysis of measurement data.</p>
      <p>&nbsp;</p>

      <h3><strong>Smart Factories</strong></h3>
      <p>As factories become more connected, metrology is moving from a final inspection function towards an integrated part of the entire manufacturing process.</p>
    `,
  },
  {
    id: 202,
    title: "Why Precision Measurement Is Critical for Modern Manufacturing",
    slug: "precision-measurement-modern-manufacturing",
    excerpt:
      "Understand why accurate measurement is essential for product quality, process control, productivity, and manufacturing excellence.",
    image:
      "https://cdn.itegroupnews.com/photo_1_main_1_f5b42c6a16.webp",
    publishedDate: "2026-08-22T09:15:00.000Z",
    content: `
      <h2><strong>The Role of Precision Measurement in Manufacturing</strong></h2>
      <p>&nbsp;</p>
      <p>Precision measurement is fundamental to modern manufacturing. From aerospace components and automotive parts to medical devices and precision engineering, manufacturers depend on accurate measurement to ensure components meet exact specifications.</p>
      <p>&nbsp;</p>

      <h3><strong>Maintaining Product Quality</strong></h3>
      <p>Accurate measurement helps manufacturers verify dimensions, tolerances, geometry, surface characteristics, and other critical parameters.</p>
      <p>&nbsp;</p>

      <h3><strong>Reducing Manufacturing Errors</strong></h3>
      <p>Early identification of dimensional deviations can reduce scrap, rework, production delays, and customer complaints.</p>
      <p>&nbsp;</p>

      <h3><strong>Improving Process Control</strong></h3>
      <p>Measurement data provides manufacturers with valuable information for monitoring production processes and maintaining consistent quality.</p>
      <p>&nbsp;</p>

      <h3><strong>Supporting Advanced Manufacturing</strong></h3>
      <p>As components become more complex and tolerances become tighter, advanced metrology systems are becoming increasingly important for manufacturing competitiveness.</p>
    `,
  },
   {
    id: 203,
    title: "Optical and Vision Metrology: The Future of Non-Contact Inspection",
    slug: "optical-vision-metrology-non-contact-inspection",
    excerpt:
      "Explore how optical measurement and machine vision technologies are transforming high-speed, non-contact inspection.",
    image:
      "https://cdn.itegroupnews.com/photo_2_84279059fe.webp",
    publishedDate: "2026-08-18T11:45:00.000Z",
    content: `
      <h2><strong>Optical and Vision Metrology for Advanced Inspection</strong></h2>
      <p>&nbsp;</p>
      <p>Optical measurement and machine vision technologies are becoming increasingly important for manufacturers that require fast, repeatable, and non-contact inspection.</p>
      <p>&nbsp;</p>

      <h3><strong>Non-Contact Measurement</strong></h3>
      <p>Optical systems can measure delicate, small, complex, or difficult-to-access components without physically contacting the part.</p>
      <p>&nbsp;</p>

      <h3><strong>Machine Vision Inspection</strong></h3>
      <p>Machine vision systems can automatically identify dimensional variations, surface defects, assembly issues, and other quality characteristics.</p>
      <p>&nbsp;</p>

      <h3><strong>High-Speed Production Inspection</strong></h3>
      <p>Automated optical inspection can support high-volume manufacturing environments where inspection speed and repeatability are critical.</p>
      <p>&nbsp;</p>

      <h3><strong>Applications Across Industries</strong></h3>
      <p>Optical and vision metrology is increasingly used across automotive, electronics, aerospace, medical devices, plastics, tooling, and precision engineering.</p>
    `,
  },
   {
    id: 204,
    title: "Calibration and Traceability: The Foundation of Accurate Measurement",
    slug: "calibration-traceability-accurate-measurement",
    excerpt:
      "Learn why calibration, measurement standards, and traceability are essential for reliable industrial measurement.",
    image:
      "https://cdn.itegroupnews.com/photo_3_30daf082db.webp",
    publishedDate: "2026-08-12T13:30:00.000Z",
    content: `
      <h2><strong>Why Calibration Matters in Industrial Metrology</strong></h2>
      <p>&nbsp;</p>
      <p>Reliable measurement depends not only on sophisticated equipment but also on proper calibration, reference standards, environmental control, and measurement traceability.</p>
      <p>&nbsp;</p>

      <h3><strong>What Is Calibration?</strong></h3>
      <p>Calibration establishes the relationship between the readings of a measuring instrument and known reference standards, helping ensure measurement reliability.</p>
      <p>&nbsp;</p>

      <h3><strong>Measurement Traceability</strong></h3>
      <p>Traceability provides confidence that measurement results can be related to recognised standards through an unbroken chain of comparisons.</p>
      <p>&nbsp;</p>

      <h3><strong>Reducing Measurement Uncertainty</strong></h3>
      <p>Proper calibration and controlled measurement environments help manufacturers understand and manage measurement uncertainty.</p>
      <p>&nbsp;</p>

      <h3><strong>Supporting Quality Systems</strong></h3>
      <p>Well-managed calibration programmes support quality assurance, regulatory requirements, process control, and customer confidence.</p>
    `,
  },
     {
    id: 205,
    title: "3D Scanning and Reverse Engineering in Modern Manufacturing",
    slug: "3d-scanning-reverse-engineering-manufacturing",
    excerpt:
      "Explore how 3D scanning is being used for inspection, reverse engineering, product development, and quality improvement.",
    image:
      "https://cdn.itegroupnews.com/photo_1_main_1_f5b42c6a16.webp",
    publishedDate: "2026-08-06T10:00:00.000Z",
    content: `
      <h2><strong>3D Scanning: From Inspection to Product Development</strong></h2>
      <p>&nbsp;</p>
      <p>3D scanning has become an important technology for manufacturers looking to capture detailed information about physical components quickly and accurately.</p>
      <p>&nbsp;</p>

      <h3><strong>Fast Dimensional Inspection</strong></h3>
      <p>3D scanners can capture thousands or millions of measurement points, creating detailed digital representations of physical components.</p>
      <p>&nbsp;</p>

      <h3><strong>Reverse Engineering</strong></h3>
      <p>Scanning technology can help engineers recreate digital models of existing components where original CAD data is unavailable.</p>
      <p>&nbsp;</p>

      <h3><strong>Design Verification</strong></h3>
      <p>Scanned data can be compared with CAD models to identify dimensional deviations and verify manufacturing accuracy.</p>
      <p>&nbsp;</p>

      <h3><strong>Applications</strong></h3>
      <p>3D scanning is increasingly used in automotive, aerospace, tooling, engineering, casting, additive manufacturing, and product development.</p>
    `,
  },
  // app/articles/data.ts - Add this to the ARTICLES array

 {
    id: 206,
    title: "The Growing Role of Metrology in Automotive Manufacturing",
    slug: "role-of-metrology-automotive-manufacturing",
    excerpt:
      "Discover how advanced measurement and inspection technologies are supporting quality and precision across automotive manufacturing.",
    image:
      "https://cdn.itegroupnews.com/photo_2_84279059fe.webp",
    publishedDate: "2026-07-30T10:00:00.000Z",
    content: `
      <h2><strong>Metrology in the Automotive Industry</strong></h2>
      <p>&nbsp;</p>
      <p>The automotive industry requires extremely high levels of dimensional accuracy and repeatability. Metrology therefore plays a critical role throughout product development and manufacturing.</p>
      <p>&nbsp;</p>

      <h3><strong>Component Inspection</strong></h3>
      <p>Measurement systems are used to inspect engine components, transmission parts, body panels, tooling, fixtures, and precision components.</p>
      <p>&nbsp;</p>

      <h3><strong>Process Quality</strong></h3>
      <p>Measurement data helps manufacturers monitor processes and identify variations before they affect large production volumes.</p>
      <p>&nbsp;</p>

      <h3><strong>Electric Vehicle Manufacturing</strong></h3>
      <p>The growth of electric vehicles is creating new measurement requirements for batteries, motors, lightweight components, electronics, and advanced materials.</p>
      <p>&nbsp;</p>

      <h3><strong>Future of Automotive Metrology</strong></h3>
      <p>Automation, robotics, 3D measurement, machine vision, and connected quality systems will continue to transform automotive inspection.</p>
    `,
  },

 {
    id: 207,
    title: "AI and Automation in Industrial Inspection",
    slug: "ai-automation-industrial-inspection",
    excerpt:
      "Explore how artificial intelligence, robotics, and automation are creating smarter and faster inspection processes.",
    image:
      "https://cdn.itegroupnews.com/photo_3_30daf082db.webp",
    publishedDate: "2026-07-24T10:00:00.000Z",
    content: `
      <h2><strong>AI-Powered Inspection Is Changing Quality Control</strong></h2>
      <p>&nbsp;</p>
      <p>Artificial intelligence and automation are opening new possibilities for industrial inspection by enabling machines to analyse measurement and visual data at high speed.</p>
      <p>&nbsp;</p>

      <h3><strong>Automated Visual Inspection</strong></h3>
      <p>AI-based vision systems can identify surface defects, dimensional variations, assembly errors, and other quality characteristics.</p>
      <p>&nbsp;</p>

      <h3><strong>Predictive Quality</strong></h3>
      <p>Data analytics can help identify process trends and potential quality problems before they result in defective products.</p>
      <p>&nbsp;</p>

      <h3><strong>Robotic Inspection</strong></h3>
      <p>Robotic systems can perform repeatable inspection tasks and bring measurement capabilities directly into production environments.</p>
      <p>&nbsp;</p>

      <h3><strong>The Smart Factory</strong></h3>
      <p>The combination of AI, robotics, sensors, metrology, and manufacturing data is creating increasingly connected quality ecosystems.</p>
    `,
  },
    {
    id: 208,
    title: "Building a Strong Quality Culture Through Metrology",
    slug: "building-quality-culture-through-metrology",
    excerpt:
      "Understand how measurement, inspection, calibration, and data-driven quality practices contribute to manufacturing excellence.",
    image:
      "https://cdn.itegroupnews.com/photo_1_main_1_f5b42c6a16.webp",
    publishedDate: "2026-07-18T10:00:00.000Z",
    content: `
      <h2><strong>Metrology as a Strategic Quality Tool</strong></h2>
      <p>&nbsp;</p>
      <p>Metrology is more than a final inspection activity. When integrated into manufacturing processes, measurement can become a strategic tool for improving productivity, consistency, and customer satisfaction.</p>
      <p>&nbsp;</p>

      <h3><strong>Measurement Throughout the Production Cycle</strong></h3>
      <p>Applying measurement at different stages of manufacturing allows organisations to identify problems earlier and reduce the cost of poor quality.</p>
      <p>&nbsp;</p>

      <h3><strong>Reliable Data for Better Decisions</strong></h3>
      <p>Accurate measurement data gives engineers and quality teams the information needed to understand processes and make informed decisions.</p>
      <p>&nbsp;</p>

      <h3><strong>Training and Skills</strong></h3>
      <p>Modern metrology requires skilled professionals who understand measurement principles, equipment, software, standards, uncertainty, and quality requirements.</p>
      <p>&nbsp;</p>

      <h3><strong>Creating Manufacturing Excellence</strong></h3>
      <p>A strong measurement culture helps organisations move from reactive inspection towards proactive quality improvement and continuous manufacturing excellence.</p>
    `,
  },
  
];

/**
 * Format a date string into a readable format (e.g., "Feb 27, 2026")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get a single article by its slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/**
 * Get all articles sorted by published date (newest first)
 */
export function getAllArticles(): Article[] {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get related articles excluding the current article
 * @param currentSlug - The slug of the current article to exclude
 * @param limit - Maximum number of related articles to return (default: 3)
 */
export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  return ARTICLES.filter((article) => article.slug !== currentSlug)
    .sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )
    .slice(0, limit);
}

/**
 * Get the latest N articles
 * @param limit - Number of articles to return (default: 4)
 */
export function getLatestArticles(limit: number = 4): Article[] {
  return getAllArticles().slice(0, limit);
}

/**
 * Get featured articles (can be customized based on your needs)
 * @param limit - Number of featured articles to return (default: 1)
 */
export function getFeaturedArticles(limit: number = 1): Article[] {
  return getLatestArticles(limit);
}

/**
 * Search articles by title or excerpt
 * @param query - Search query string
 */
export function searchArticles(query: string): Article[] {
  const searchTerm = query.toLowerCase();
  return ARTICLES.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm)
  ).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get articles by year
 * @param year - Year to filter by (e.g., 2026)
 */
export function getArticlesByYear(year: number): Article[] {
  return ARTICLES.filter(
    (article) => new Date(article.publishedDate).getFullYear() === year
  ).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get unique years that have articles
 */
export function getAvailableYears(): number[] {
  const years = ARTICLES.map((article) => new Date(article.publishedDate).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}