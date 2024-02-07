"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScanFace, AlignJustify } from "lucide-react";
import Link from "next/link";

const ActionNav = () => {
  return (
    <div>
      <div className="mt-10 md:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify size={24} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="mt-10 flex w-full flex-col items-center space-y-4 text-lg">
                  <Link href="/">Performance</Link>
                  <Link href="/">Certification</Link>
                  <Link href="/">Placements</Link>
                  <Link href="/">Higher Studies</Link>
                  <Link href="/">Language Training</Link>
                  <Link href="/">Competitive Exam Training</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center lg:space-x-4">
        <Link href="/login">
          <Button className="text-md hidden rounded-[40px] border-4 border-indigo-400/90 bg-primary py-6 font-light text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-indigo-300 md:flex">
            Login here <ScanFace size={24} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
f
export default ActionNav;
