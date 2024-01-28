"use client";

import React from "react";
import Logo from "./logo";
import { NavigationBar } from "./navigation";
import ActionNav from "./actionNav";

const page = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 items-center justify-between bg-white pr-10 lg:px-20">
      <div className="px-4">
        <div className="w-40">
          <Logo />
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
