import React from "react";

const Hero = () => {
  return (
    <section className="from gray-00 to gray-200 space-y-10 bg-gradient-to-r py-10 md:py-20">
      <div className="container mx-auto text-center">
        <div className="text-gradient flex justify-center bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text pb-10 text-6xl font-bold text-transparent md:px-20 ">
          Chennai Institute of Technology
        </div>
        <p className="md-10 bg-gradient-to-r from-black to-gray-300 bg-clip-text text-lg font-bold text-transparent md:text-xl">
          Transforming lives
        </p>
        <div className="flex justify-center gap-4">
          <button className="rounded-md bg-blue-500 px-10 py-4 text-lg font-bold text-white">
            getting started
          </button>
        </div>
        <video className="rounded-xl pt-10" autoPlay muted loop>
          <source src="/content/dataAnal.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Hero;
