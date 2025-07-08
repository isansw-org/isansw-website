import Navbar from "../../../components/common/navbar"; 
import Footer from "../../../components/common/footer";
import Hero from "./_components/hero";
import VisionMission from "./_components/visionmission";
import {Sprout, Handshake, Globe} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="bg-amber-50 text-black">
      <div className="justify-center items-center py-20">
        <div className="text-lg text-center grid space-y-4">
          <h3 className="font-bold text-4xl pb-4 text-red-500">Our Story</h3>
          <p className="max-w-2xl mx-auto">
            Founded by and for Indonesian studets, ISANSW staretd as a way to stay connected far from home. From humble beginnings, we've grown into a cross-campus community that celebrates Indonesian identity, supports student life, and create memorable experienced for students across New South Wales.
          </p>
        </div>
      </div>
      </main>
      <VisionMission />
      <div className="bg-amber-50 text-black py-20">
        <div className="px-1 py-1 rounded-2xl bg-gradient-to-b from-rose-400 via-red-500 to-yellow-400 mx-auto max-w-2xl mt-16>">
        <div className="relative bg-red-500 text-white px-10 py-10 rounded-2xl shadow-md max-w-2xl w-full text-center mx-auto ">
        {/* Corner dots */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-4 h-4 bg-white rounded-full`}
          />
        ))}
        <h3 className="text-xl font-semibold mb-2">
          See the faces behind what made it all possible
        </h3>
        <p className="mb-6">Meet the team that brings ISANSW to life.</p>
        <a href="/committees" className="inline-block">
          <button className="bg-white text-red-500 font-semibold px-6 py-2 rounded-full shadow hover:bg-amber-200 transition">
            View Our Team
          </button>
        </a>
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
