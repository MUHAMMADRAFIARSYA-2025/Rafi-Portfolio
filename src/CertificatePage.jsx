import React, { useEffect } from 'react';
import ShinyText from "./components/ShinyText/ShinyText";
import { listSertifikat } from "./data";
import Aurora from "./components/Aurora/Aurora";

const CertificatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); //scroll atas (default)
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora colorStops={["#577870", "#1F97A6", "#127B99"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>
      
      <h1 className="text-5xl font-bold text-center mb-4">
        <ShinyText text="All Achievements" speed={3} />
      </h1>
      <p className="text-center text-gray-400 mb-16">Explore my collection of professional certifications.</p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-4">
        {listSertifikat.map((sertif) => (
          <div key={sertif.id} className="bg-zinc-900/80 border border-zinc-700 p-6 rounded-3xl hover:border-violet-500 transition-all shadow-2xl">
            <img src={sertif.image} alt={sertif.title} className="rounded-xl mb-4 w-full aspect-video object-cover" />
            <h3 className="text-xl font-bold text-white">{sertif.title}</h3>
            <p className="text-violet-400">{sertif.issuer}</p>
            <p className="text-gray-500 text-sm">{sertif.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesPage;