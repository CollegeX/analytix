import { UserAuthForm } from "@/components/forms/UserAuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <UserAuthForm className="w-full md:w-auto" />
    </div>
  );
};

export default LoginPage;
