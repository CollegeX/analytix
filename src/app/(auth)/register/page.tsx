import React from "react";
import { RegisterForm } from "@/components/forms/UserRegisterForm";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <RegisterForm className="w-full md:w-auto" />
    </div>
  );
};

export default LoginPage;
