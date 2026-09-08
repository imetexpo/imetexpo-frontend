import Image from "next/image";

export default function BrochureContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <h2 className="font-bebas text-3xl leading-[1.05] tracking-tight uppercase text-[#03193D]">
          ITS TYRE EXPO <span className="text-[#CC9808]">2026</span>
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Step into Asia's most influential tyre manufacturing & rubber processing exhibition.
          ITS Tyre Expo connects global suppliers of raw materials, manufacturing machinery,
          testing tools, and automated systems with thousands of qualified buyers from 50+ countries.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f5f5f5] border border-gray-100 p-6 rounded-sm shadow-sm">
        {[
          { value: "10,000+", label: "Visitors" },
          { value: "150+", label: "Exhibitors" },
          { value: "20+", label: "Countries" },
          { value: "1st", label: "Edition" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <h3 className="text-3xl font-bebas text-[#CC9808] uppercase font-bold">{item.value}</h3>
            <p className="text-[10px] uppercase font-bold text-gray-600 mt-1 tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="font-bebas text-2xl text-[#03193D] uppercase font-bold">Why Download the Brochure?</h3>
        <ul className="text-xs text-gray-650 space-y-2.5">
          <li className="flex items-start gap-2">
            <span className="text-[#CC9808]">•</span>
            <span>Engage directly with decision-makers – 85% influence or approve purchasing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#CC9808]">•</span>
            <span>Showcase solutions to buyers seeking machinery and processing technology.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#CC9808]">•</span>
            <span>Build year-round visibility through our digital platform.</span>
          </li>
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-center lg:justify-start">
        <div className="relative w-40 h-52 rotate-[-4deg] shadow-md rounded-sm overflow-hidden border border-gray-150">
          <Image
            src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
            alt="Event Brochure"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
