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
import { Card } from "../ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TagFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(2),
});

const CourseTagFormSchema = z.object({
  course: z.coerce.number(),
  tag: z.coerce.number(),
  count: z.coerce.number(),
});

export default function TagForm({ className }: { className?: string }) {
  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // API Calls
  const courses = api.course.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const tags = api.tag.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const createTag = api.tag.create.useMutation();
  const createCourseTag = api.courseTag.create.useMutation();

  // State Handlers
  async function onTagFormSubmit(data: z.infer<typeof TagFormSchema>) {
    // console.log(data);
    setIsLoading(true);
    const res = await createTag.mutateAsync(data);
    await tags.refetch();
    setIsLoading(false);
    if (res) {
      toast.success("Tag Created Successfully");
    } else {
      toast.error("Failed to create Tag");
    }
  }

  async function onCourseTagFormSubmit(
    data: z.infer<typeof CourseTagFormSchema>,
  ) {
    // console.log(data);
    setIsLoading(true);
    const res = await createCourseTag.mutateAsync(data);
    setIsLoading(false);
    if (res) {
      toast.success("Course Tag Created Successfully");
    } else {
      toast.error("Failed to create Course Tag");
    }
  }

  // Forms
  const tagForm = useForm<z.infer<typeof TagFormSchema>>({
    resolver: zodResolver(TagFormSchema),
  });

  const courseTagForm = useForm<z.infer<typeof CourseTagFormSchema>>({
    resolver: zodResolver(CourseTagFormSchema),
  });

  return (
    <div className="flex gap-12">
      <Card className="h-full min-w-[450px] p-5">
        <p className="mb-2 font-display text-3xl text-primary">
          Create Course Tag
        </p>
        <Form {...courseTagForm}>
          <form
            className={className}
            onSubmit={courseTagForm.handleSubmit(onCourseTagFormSubmit)}
          >
            {/* Course */}
            <FormField
              control={courseTagForm.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Course " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.data?.map((course) => (
                        <SelectItem key={course.id} value={String(course.id)}>
                          {course.Department.shortName} | {course.semester} SEM
                          | {course.Regulation.name} REG
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tag */}
            <FormField
              control={courseTagForm.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tag " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tags.data?.map((tag) => (
                        <SelectItem key={tag.id} value={String(tag.id)}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Count */}
            <FormField
              control={courseTagForm.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Count</FormLabel>
                  <FormControl>
                    <Input placeholder="Count" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              Create Course Tag
            </Button>
          </form>
        </Form>
      </Card>
      <div className="h-full">
        <Card className=" min-w-[450px] p-5">
          <p className="mb-2 font-display text-3xl text-primary">Create Tag</p>
          <Form {...tagForm}>
            <form
              onSubmit={tagForm.handleSubmit(onTagFormSubmit)}
              className={className}
            >
              {/* Name */}
              <FormField
                control={tagForm.control}
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
                control={tagForm.control}
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
                Create Tag
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
