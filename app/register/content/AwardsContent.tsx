import Link from "next/link";

export default function AwardsContent() {
  return (
    <div className="space-y-6">
      <h2 className="font-bebas text-3xl text-[#00A1B1]">Register Your Interest in the Awards</h2>
      <p className="text-lg leading-relaxed text-gray-700">
        Celebrate leadership, innovation and industry excellence. Share your details and select
        the award category you are interested in. Our team will contact you with further information.
      </p>
      <p className="text-gray-600">
        Ready to submit a detailed nomination? Complete the nomination form with your nominee’s
        achievements and supporting information.
      </p>
      <Link href="/nominate" className="inline-block font-semibold text-[#00A1B1] hover:underline">
        Go to the nomination form →
      </Link>
    </div>
  );
}
