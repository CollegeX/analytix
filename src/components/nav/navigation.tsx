import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; description: string }[] = [
  {
    title: "Performance",
    description:
      "Performance analytics of students in their semester exams , assessment exams , model exams",
  },
  {
    title: "Certification",
    description: "Certification analytics students and faculty ",
  },
  {
    title: "Placement",
    description:
      "Placement analytics final year students and previous year students",
  },
  {
    title: "language Training",
    description:
      "Foreign language training analytics such as German , Japanese , French ..etc",
  },
  {
    title: "Competitive Exam Training",
    description:
      "Competitive Exam Training analytics such as GATE, GRE, TOEFL, IELTS ..etc",
  },
  {
    title: "Higher Studies",
    description:
      "Students who are interested in higher studies in aboard and in India analytics",
  },
];

export function NavigationBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex md:space-x-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Link href="/">
                      <Image
                        src="/content/logodemo.svg"
                        width={150}
                        height={150}
                        alt="logo"
                        className="w-40"
                      />
                    </Link>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Chennai Institute of Technology
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Entire student and faculty analytics at your fingertips.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title="Introduction">
                Student and Faculty performance analytics
              </ListItem>
              <ListItem title="Faculty">
                Faculty performance analytics and more
              </ListItem>
              <ListItem title="Student">
                Student performance analytics and more
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink>Documentation</NavigationMenuLink>
          </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
