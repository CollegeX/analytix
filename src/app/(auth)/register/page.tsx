import React from "react";
import { RegisterForm } from "@/components/forms/UserRegisterForm";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <RegisterForm className="flex w-full items-center justify-center" />
    </div>
  );
};

export default LoginPage;
