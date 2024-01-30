import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
const Nav = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 items-center justify-between border-b bg-white pr-10 lg:px-20">
      <div className="px-2 font-bold text-primary">AnalytixAdmin</div>

      <div className="flex items-center justify-center gap-4">
        <Link href="/admin">
          <Button variant={"outline"} className="border-none">
            Student
          </Button>
        </Link>
        <Link href="/admin/faculty">
          <Button variant={"outline"} className="border-none">
            Faculty
          </Button>
        </Link>
        <Link href="/admin/department">
          <Button variant={"outline"} className="border-none">
            Department
          </Button>
        </Link>
        <Link href="/admin/subject">
          <Button variant={"outline"} className="border-none">
            Placements
          </Button>
        </Link>
        <Link href="/admin/subject">
          <Button variant={"outline"} className="border-none">
            Course
          </Button>
        </Link>
        <Link href="/admin/subject">
          <Button variant={"outline"} className="border-none">
            LanguageTraining
          </Button>
        </Link>
      </div>

      <div className="flex items-center lg:space-x-4">
        <Link href="/admin/login">
          <Button className="text-md hidden border-4  border-indigo-400/90 bg-primary px-5 py-5 font-light text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-indigo-300 md:flex">
            Login here
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
