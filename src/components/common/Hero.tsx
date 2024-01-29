import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#d1d1f7] px-10 py-10 xl:py-36">
      <div className="flex flex-col md:items-center">
        <div className="flex justify-center pt-10 text-4xl font-medium text-[#2b1c50] lg:text-5xl xl:text-6xl">
          <h1>Chennai Institute of Technology</h1>
        </div>

        <p className="pt-4 text-xl  text-[#3d2e7c] md:text-center lg:pt-6 xl:w-1/2 xl:text-3xl">
          Analytics of Students and Faculties of the University to track their
          performance and more.
        </p>
        <div className="flex gap-4 py-10 xl:pt-10">
          <Link href="/">
            <Button className="rounded-[60px] border-4 border-indigo-400/90 bg-[#565add] px-10 py-9 text-xl font-light text-white shadow-md transition-all duration-300  hover:scale-110 hover:shadow-indigo-300 md:flex md:justify-center xl:px-24 xl:py-12 xl:text-3xl">
              Getting Started
            </Button>
          </Link>
        </div>
        <div className="xl:pt-28">
          <video
            className="rounded-[40px] shadow-xl shadow-indigo-400 xl:mx-auto xl:w-5/6"
            autoPlay
            muted
            loop
          >
            <source src="/content/dataAnal.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Hero;
