export default function EnquiryContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#f5f5f5] rounded-2xl p-6">
        <h3 className="font-bebas text-2xl text-[#03193D] mb-4">Event Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-[#CC9808] font-semibold text-sm">Dates</p>
            <p className="text-gray-700">15-17 October 2026</p>
          </div>
          <div>
            <p className="text-[#CC9808] font-semibold text-sm">Venue</p>
            <p className="text-gray-700">Auto Cluster Exhibition Centre, Pune</p>
          </div>
          <div>
            <p className="text-[#CC9808] font-semibold text-sm">Timings</p>
            <p className="text-gray-700">10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <div className="bg-[#f5f5f5] rounded-2xl p-6">
        <h3 className="font-bebas text-2xl text-[#03193D] mb-4">Why Visit?</h3>
        <ul className="space-y-3">
          {[
            "Meet 350+ leading tyre manufacturers and suppliers",
            "Discover the latest tyre manufacturing technologies",
            "Network with industry experts and decision-makers",
            "Explore innovative solutions for tyre production",
            "Attend technical conferences and workshops",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#CC9808] text-sm">✓</span>
              <span className="text-gray-600 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-[#CC9808] to-orange-600 rounded-2xl p-6 text-white">
        <h3 className="font-bebas text-2xl mb-2">Free Registration</h3>
        <p className="text-sm text-white/90 mb-4">
          Register now to get free entry to the exhibition and conference sessions.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Limited badges available</span>
        </div>
      </div>
    </div>
  );
}
