"use client";

import { useState } from "react";
import type { HTMLAttributes } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  admin?: boolean;
}

interface LoginInputs {
  email: string;
  password: string;
}

export const revalidate = 0;

export function UserAuthForm({
  className,
  admin,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<LoginInputs>();
  const homeRoute = admin ? "/admin/dashboard" : "/";
  const redirectRoute = useSearchParams().get("from") ?? homeRoute;

  const error = useSearchParams()?.get("error");

  function onSubmit(values: LoginInputs) {
    setIsLoading(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    })
      .then((res) => {
        if (res?.error) {
          toast.error(res?.error);
        } else {
          toast.success("Logged in successfully");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err as string);
        setIsLoading(false);
      });
  }

  return (
    <div className={className} {...props}>
      <Card className="mx-6 mt-4 md:m-8 md:mt-0 md:w-full">
        <div className="header mx-6 my-3">
          <CardTitle className="pt-4 text-3xl text-primary">Login</CardTitle>
          <CardDescription className="text-md pb-2 pt-2">
            Enter your email to{" "}
            <span className="font-medium text-primary"> Login </span>
          </CardDescription>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-3">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="text"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Email field */}
            <div>
              {error ? (
                <SignInError error={error} />
              ) : (
                <div className="flex items-center justify-center text-sm text-red-500">
                  <span>&nbsp;</span>
                </div>
              )}
            </div>

            <CardFooter className="block">
              {/* Submit button */}
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>

              {!admin && (
                <p className="mt-2">
                  Don{"'"}t have an account?{" "}
                  <Link href={"/register"} className="underline">
                    Register
                  </Link>
                </p>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

const errors: Record<string, string> = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
  "Invalid email or password": "Invalid email or password",
  USER_NOT_FOUND: "User doesn't exist",
  INVALID_PASSWORD: "Invalid password",
  "User not found": "User not found",
};

const SignInError = ({ error }: Record<string, string>) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <div className="flex items-center justify-center py-2 text-sm text-red-500">
      {errorMessage}
    </div>
  );
};
