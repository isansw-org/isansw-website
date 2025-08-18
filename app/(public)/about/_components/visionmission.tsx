import { Sprout, Handshake, Globe } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="bg-amber-50 text-black py-20">
      {/* Header and Introduction */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl font-bold text-red-500 mb-6">
          Vision & Mission
        </h2>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {/* 1. Supporting Indonesian Studies */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500 rounded-full w-28 h-28 flex items-center justify-center text-amber-50 mb-6">
            <Sprout size={48} />
          </div>
          <h3 className="font-bold text-xl mb-2">
            Supporting Indonesian Studies
          </h3>
          <p className="text-lg leading-relaxed">
            Build a strong and inclusive community where Indonesian students
            feel empowered, connected, and at home in NSW.
          </p>
        </div>

        {/* 2. Collaborating Across Branches */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500 rounded-full w-28 h-28 flex items-center justify-center text-amber-50 mb-6">
            <Handshake size={48} />
          </div>
          <h3 className="font-bold text-xl mb-2">
            Collaborating Across Branches
          </h3>
          <p className="text-lg leading-relaxed">
            Work hand-in-hand with PPIA branches to foster unity and meaningful
            student-led initiatives.
          </p>
        </div>

        {/* 3. Creating Lasting Connections */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500 rounded-full w-28 h-28 flex items-center justify-center text-amber-50 mb-6">
            <Globe size={48} />
          </div>
          <h3 className="font-bold text-xl mb-2">
            Creating Lasting Connections
          </h3>
          <p className="text-lg leading-relaxed">
            Engage with NGOs, cultural groups, and external partners to open new
            doors for growth and opportunity.
          </p>
        </div>
      </div>
    </section>
  );
}
