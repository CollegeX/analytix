"use client";
import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      className="w-full"
    >
      Sign out
    </Button>
  );
};

export default SignoutButton;
