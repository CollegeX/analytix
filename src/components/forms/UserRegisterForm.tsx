"use client";
//todo: validate repeat password
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role } from "@prisma/client";

export function RegisterForm({ className }: { className?: string }) {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // QUERIES
  const register = api.user.createUser.useMutation();

  const RegisterFormSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
    role: z.enum(["PRINCIPAL", "HOD", "DEPT_STAFF"]),
  });

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
  });

  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(data);
    setIsLoading(true);
    try {
      const res = await register.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        requestedRole: data.role as Role,
      });

      if (res) {
        toast.success("Registered Successfully");
        router.push("/login");
      } else toast.error("Something went wrong. Try again in some time.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("mx-6  mt-4 p-4 md:m-8", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormLabel className="mb-1 font-display text-3xl text-primary">
            Register
          </FormLabel>
          <FormDescription className="mb-3">
            Submit details get started with your account.
          </FormDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                      <Mail className="stroke-muted-foreground" size={16} />
                    </span>
                    <Input type="email" placeholder="Email" {...field} />
                  </div>
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repeat Password */}
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Requested Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEPT_STAFF">Staff</SelectItem>
                    <SelectItem value="HOD">Head Of Department</SelectItem>
                    <SelectItem value="PRINCIPAL">Principal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="my-3 w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>

          <p>
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
}
