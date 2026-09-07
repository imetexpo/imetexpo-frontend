export default function SponsorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold text-[#CC9808] mb-4 font-bebas">
          ITS Tyre Expo 2026 Conference
        </h2>
        <div className="space-y-4 text-gray-700">
          <p className="text-base leading-relaxed">
            <strong>ITS Tyre Expo 2026 Conference</strong> is a premier annual business platform
            bringing together professionals from tyre manufacturing companies, raw material
            suppliers, machinery manufacturers, automation specialists, and OEMs across the
            tyre and rubber ecosystem.
          </p>
          <p className="text-base leading-relaxed">
            If you'd like to become a summit partner, present your solutions, or advertise at
            the event, please fill out the form — our team will contact you as soon as possible.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#f5f5f5] p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-[#CC9808] font-bebas">50+</p>
          <p className="text-sm text-gray-600">Exhibitors</p>
        </div>
        <div className="bg-[#f5f5f5] p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-[#CC9808] font-bebas">30+</p>
          <p className="text-sm text-gray-600">Speakers</p>
        </div>
        <div className="bg-[#f5f5f5] p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-[#CC9808] font-bebas">500+</p>
          <p className="text-sm text-gray-600">Delegates</p>
        </div>
        <div className="bg-[#f5f5f5] p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-[#CC9808] font-bebas">15+</p>
          <p className="text-sm text-gray-600">Countries</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-black mb-4 font-bebas">Partnership Benefits</h3>
        <ul className="space-y-3">
          {[
            "Premium visibility across all event marketing materials",
            "Dedicated speaking slot in conference program",
            "Logo placement on event website and banners",
            "Exclusive networking opportunities with industry leaders",
            "Complimentary delegate passes for your team",
            "Post-event recognition and media coverage",
          ].map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#CC9808] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
