import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import SignoutButton from "../common/SignOutButton";
const Nav = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 items-center justify-between border-b bg-white pr-10 lg:px-20">
      <Link
        href={`/admin/dashboard`}
        className="flex items-center justify-start gap-1.5 px-2 font-display font-extralight"
      >
        <span className="text-xl font-medium text-primary">Analytix</span> admin
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link href="/admin/student">
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
        <Link href="/admin/accounts">
          <Button variant={"outline"} className="border-none">
            Accounts
          </Button>
        </Link>
      </div>

      <div className="flex items-center lg:space-x-4">
        <SignoutButton />
      </div>
    </div>
  );
};

export default Nav;
