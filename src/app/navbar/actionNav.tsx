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

import { AlignJustify } from "lucide-react";
import Link from "next/link";

const ActionNav = () => {
  return (
    <div>
      <div className="md:hidden mt-10">
        <Sheet>
          <SheetTrigger>
            <AlignJustify size={24} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="mt-10 flex w-full flex-col items-center space-y-4 text-lg">
                  <Link href="/">sign in</Link>
                  <Link href="/">home</Link>
                  <Link href="/">about</Link>
                  <Link href="/">faculty</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
        <div className="hidden md:flex md:space-x-4">
            <Button variant="ghost" className="bg-blue-500 text-white">
                Sign In
            </Button>

            <Button variant="ghost"
            className="bg-blue-500 text-white">
                COE
            </Button>

        </div>


    </div>
  );
};

export default ActionNav;
