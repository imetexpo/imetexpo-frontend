const statsData = [
  { value: "10,000+", label: "Trade Visitors" },
  { value: "150+", label: "Exhibitors" },
  { value: "20+", label: "Visiting Countries" },
  { value: "1st", label: "Edition" },
];

export default function ExhibitorContent() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="space-y-4">
        <h2 className="font-bebas text-3xl text-[#003A77] uppercase">
          Why <span className="text-[#00A1B1]">Exhibit?</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Showcase your solutions to senior buyers across the full precision manufacturing and industrial metrology value chain.
        </p>
        <p className="text-lg sm:text-xl text-gray-800 font-bold">INDIAMET Expo 2027 is the leading platform to:</p>
        <ul className="space-y-3">
          {[
            "Connect with decision-makers from 20+ countries and across India",
            "Launch new metrology products to buyers actively sourcing precision equipment",
            "Build relationships with procurement heads, plant managers, and quality engineers",
            "Grow your market presence in India's booming precision engineering and manufacturing hub",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#00A1B1] mt-0.5">✓</span>
              <span className="text-lg sm:text-xl text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f5f5f5] border border-gray-100 p-6 rounded-sm shadow-sm">
        {statsData.map((stat, idx) => (
          <div key={idx} className="text-center">
            <h3 className="text-3xl font-bebas text-[#00A1B1] uppercase font-bold">{stat.value}</h3>
            <p className="text-xs uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="font-bebas text-3xl text-[#003A77] uppercase">
          Who You'll <span className="text-[#00A1B1]">Meet:</span>
        </h2>
        <ul className="space-y-2">
          {[
            "Owners, CEOs, Directors & Senior Management",
            "Plant Heads, Production & Operations Managers",
            "Quality Control & Quality Assurance Professionals",
            "Metrology, Inspection & Measurement Engineers",
            "Design, Manufacturing & Process Engineers",
            "Purchase, Procurement & Sourcing Heads",
 "Automation, Digital Manufacturing & Industry 4.0 Experts",
 "R&D, Product Development & Tool Room Professionals",
 "CMM, 3D Scanning, Vision & Calibration Specialists",
  "Buyers & Decision-Makers Sourcing Metrology, Inspection & Quality Solutions",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#00A1B1]">•</span>
              <span className="text-lg sm:text-xl text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
