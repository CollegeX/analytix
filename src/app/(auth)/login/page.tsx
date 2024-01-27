import { UserAuthForm } from "@/components/forms/UserAuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <UserAuthForm className="flex w-full items-center justify-center" />
    </div>
  );
};

export default LoginPage;
