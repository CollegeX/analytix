"use client";

import React from "react";
import { NavigationBar } from "./navigation";
import Link from "next/link";
import Image from "next/image";
import ActionNav from "./ActionNav";

const page = () => {
  return (
    <div className="sticky top-0 z-50 ">
      <div className="mx-6 flex h-24 items-center justify-between md:mx-20 ">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/images/logo.png" width={35} height={35} alt="logo" />
          <p className="font-display text-2xl tracking-tight">Analytix</p>
        </Link>

        <div className="flex items-center">
          <NavigationBar />
        </div>
        <ActionNav />
      </div>
      <div className="border-b"/>
    </div>
  );
};

export default page;
