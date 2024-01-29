"use client";

import React from "react";
import { NavigationBar } from "../forms/navigation";
import Link from "next/link";
import Image from "next/image";
import ActionNav from "./ActionNav";

const page = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 items-center justify-between bg-white pr-10 lg:px-20">
      <div className="px-4">
        <div className="w-40">
          <Link href="/">
            <Image
              src="/content/logodemo.svg"
              width={150}
              height={150}
              alt="logo"
              className="w-40"
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center">
        <NavigationBar />
      </div>
      <ActionNav />
    </div>
  );
};

export default page;
