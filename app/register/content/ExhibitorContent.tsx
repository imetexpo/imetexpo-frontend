const statsData = [
  { value: "8,500+", label: "Trade Visitors" },
  { value: "350+", label: "Exhibitors" },
  { value: "50+", label: "Visiting Countries" },
  { value: "10th", label: "Edition" },
];

export default function ExhibitorContent() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="space-y-4">
        <h2 className="font-bebas text-3xl text-black uppercase">
          Why <span className="text-[#CC9808]">Exhibit?</span>
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Showcase your solutions to senior buyers across the full tyre manufacturing value chain.
        </p>
        <p className="text-sm text-gray-800 font-bold">ITS Tyre Expo is the leading platform to:</p>
        <ul className="space-y-3">
          {[
            "Connect with decision-makers from 50+ countries",
            "Launch new products to buyers actively sourcing equipment",
            "Build relationships with procurement heads and engineers",
            "Grow your presence in one of the world's fastest-growing tyre markets",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#CC9808] mt-0.5">✓</span>
              <span className="text-sm text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f5f5f5] border border-gray-100 p-6 rounded-sm shadow-sm">
        {statsData.map((stat, idx) => (
          <div key={idx} className="text-center">
            <h3 className="text-3xl font-bebas text-[#CC9808] uppercase font-bold">{stat.value}</h3>
            <p className="text-xs uppercase font-bold text-gray-600 mt-1 tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="font-bebas text-3xl text-black uppercase">
          Who You'll <span className="text-[#CC9808]">Meet:</span>
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
              <span className="text-[#CC9808]">•</span>
              <span className="text-sm text-gray-650 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
