"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useState } from "react";
import { api } from "@/trpc/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const TagFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(2),
});

export default function TagForm() {
  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof TagFormSchema>) {
    console.log(data);
  }

  const form = useForm<z.infer<typeof TagFormSchema>>({
    resolver: zodResolver(TagFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
