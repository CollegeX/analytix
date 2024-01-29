import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-8 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center my-12">
        <div>
          <div className="flex flex-col justify-center gap-2 font-display text-6xl font-medium">
            <span>Stay Updated </span>
            <span>With Ease</span>
          </div>

          <p className="pt-4 text-2xl">
            Analytix provides you with the tools to track student and faculty
            statistics in minutes.
          </p>
          <Link href="/" className="flex gap-4 py-10 xl:pt-10">
            <Button className="rounded-[60px] border-4 border-indigo-400/90 bg-primary px-10 py-9 text-xl font-light text-white shadow-md transition-all duration-300  hover:scale-110 hover:shadow-indigo-300">
              Getting Started
            </Button>
          </Link>
        </div>
        <div>
          <video
            className="rounded-3xl shadow-md shadow-neutral-600"
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
