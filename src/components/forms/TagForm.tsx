"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  name: z.string(),
  description: z.string(),
});

export default function TagForm() {
  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof TagFormSchema>) {
    console.log(values);
  }

  const form = useForm({
    resolver: zodResolver(TagFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={() => {
          console.log(form.getValues());
        }}
      >
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
