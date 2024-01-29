import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-16 my-4">
      <div className="my-12 grid grid-cols-1 items-center md:grid-cols-2 ">
        <div className="">
          <div className="flex flex-col justify-center gap-2  font-display text-6xl font-medium">
            <span className="tracking-tight">Remain up-to-date</span>
            <span className="tracking-tight">With current data</span>
          </div>

          <p className="pt-4 text-2xl">
            Our platform provides you with the tools to track student <br />
            and faculty statistics in seconds.
          </p>
          <Link href="/" className="flex gap-4 py-10 xl:pt-10">
            <Button className=" border-4 border-indigo-400/90 bg-primary p-6 text-xl font-light text-white shadow-md transition-all duration-300  hover:scale-110 hover:shadow-indigo-300">
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
