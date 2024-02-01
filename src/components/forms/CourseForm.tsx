"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { api } from "@/trpc/react";

const CourseFromSchema = z.object({
  regulationId: z.coerce.number(),
  semester: z.coerce.number().min(1).max(8),
  departmentId: z.coerce.number(),
  active: z.coerce.boolean(),
});

interface Props {
  className?: string;
}

export default function CourseForm({ className }: Props) {
  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // API CALLS
  const { data: departments } = api.department.findMany.useQuery();
  const { data: regulations } = api.regulation.findMany.useQuery();

  const form = useForm<z.infer<typeof CourseFromSchema>>({
    resolver: zodResolver(CourseFromSchema),
  });
  function onSubmit(values: z.infer<typeof CourseFromSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {/* Regulation */}
        <FormField
          control={form.control}
          name="regulationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regulation</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Regulation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regulations?.map((regulation) => (
                    <SelectItem
                      key={regulation.id}
                      value={String(regulation.id)}
                    >
                      {regulation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <FormControl>
                <Input placeholder="Semester" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments?.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={String(department.id)}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-end space-x-3">
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Checkbox {...form.register("active")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">submit</Button>
      </form>
    </Form>
  );
}
