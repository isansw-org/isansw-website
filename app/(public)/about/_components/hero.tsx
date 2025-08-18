// import Image from "next/image";
// import about1 from "@/components/images/about1.jpg";
//import about2 from "@/components/images/about2.jpg";

export default function Hero() {
  return (
    <section className="relative bg-amber-50 pb-20">
      {/* Red Header */}
      <div className="bg-red-500 text-white text-center pt-12 pb-24 px-6">
        <h1 className="text-4xl font-bold">About ISANSW</h1>
        <p className="text-xl mt-4 max-w-xl mx-auto">
          More than just a student association -- We are a cultural family
          across NSW
        </p>
      </div>

      {/* Rose Line */}
      <div className="absolute top-[245px] left-0 w-full h-1 bg-rose-400 z-0" />

      {/* Image Gallery - Overlapping & in front of line */}
      <div className="relative z-10 -mt-16 flex justify-center gap-8 flex-wrap px-6">
        {/* 
      <div className="w-56 h-44 border-2 border-rose-400 rounded-2xl overflow-hidden">
        <Image src={about1} alt="Photo 1" className="w-full h-full object-cover" />
      </div>
      */}
        {/*
      <div className="w-40 h-36 border-2 border-rose-400 rounded-2xl overflow-hidden">
        <Image src={about2} alt="Photo 2" className="w-full h-full object-cover" />
      </div>
      <div className="w-56 h-44 border-2 border-rose-400 rounded-2xl overflow-hidden">
        <Image src={about1} alt="Photo 3" className="w-full h-full object-cover" />
      </div>
      <div className="w-40 h-36 border-2 border-rose-400 rounded-2xl overflow-hidden">
        <Image src={about2} alt="Photo 4" className="w-full h-full object-cover" />
      </div>
      */}
      </div>
    </section>
  );
}
