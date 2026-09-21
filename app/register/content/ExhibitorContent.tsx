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
        <h2 className="font-bebas text-3xl text-[#031A34] uppercase">
          Why <span className="text-[#D4A72C]">Exhibit?</span>
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Showcase your solutions to senior buyers across the full tyre manufacturing value chain.
        </p>
        <p className="text-sm text-gray-800 font-bold">INDIAMET Expo is the leading platform to:</p>
        <ul className="space-y-3">
          {[
            "Connect with decision-makers from 20+ countries",
            "Launch new products to buyers actively sourcing equipment",
            "Build relationships with procurement heads and engineers",
            "Grow your presence in one of the world's fastest-growing tyre markets",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#D4A72C] mt-0.5">✓</span>
              <span className="text-sm text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f5f5f5] border border-gray-100 p-6 rounded-sm shadow-sm">
        {statsData.map((stat, idx) => (
          <div key={idx} className="text-center">
            <h3 className="text-3xl font-bebas text-[#D4A72C] uppercase font-bold">{stat.value}</h3>
            <p className="text-xs uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="font-bebas text-3xl text-[#031A34] uppercase">
          Who You'll <span className="text-[#D4A72C]">Meet:</span>
        </h2>
        <ul className="space-y-2">
          {[
            "Owners, CEOs, and Senior Executives",
            "Plant Directors, Division Managers, and Procurement Heads",
            "Tyre Manufacturing and Rubber Processing Engineers",
            "Operations and Maintenance Specialists",
            "IT and Automation Experts",
            "Buyers sourcing machinery, spare parts, and digital solutions",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#D4A72C]">•</span>
              <span className="text-sm text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
