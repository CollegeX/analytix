import React from "react";
import Link from "next/link";
import SignoutButton from "@/components/common/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 items-center justify-between border-b bg-white pr-10 lg:px-20">
      <Link
        href={`/dashboard`}
        className="flex items-center justify-start gap-1.5 px-2 font-display font-extralight"
      >
        <Image src={"/logo.png"} width={40} height={40} alt="logo"></Image>
        <span className="text-xl font-medium text-primary">Analytix</span> admin
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link href="/student">
          <Button variant={"outline"} className="border-none">
            Student
          </Button>
        </Link>
        <Link href="/faculty">
          <Button variant={"outline"} className="border-none">
            Faculty
          </Button>
        </Link>
        <Link href="/department">
          <Button variant={"outline"} className="border-none">
            Department
          </Button>
        </Link>
        <Link href="/accounts">
          <Button variant={"outline"} className="border-none">
            Accounts
          </Button>
        </Link>
      </div>

      {/* <div className="flex items-center lg:space-x-4">
        <SignoutButton />
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-12 w-12 rounded-full">
            <User className="-m-7 h-7 w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="group">
              <SignoutButton className="flex h-7 bg-background justify-start text-foreground group-hover:bg-muted w-full" />
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
