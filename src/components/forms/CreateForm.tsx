"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
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
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";

// Schemas
const CourseFormSchema = z.object({
  regulationId: z.coerce.number(),
  semester: z.coerce.number().min(1).max(8),
  departmentId: z.coerce.number(),
  totalStudents: z.coerce.number(),
  active: z.coerce.boolean(),
});

const DepartmentFormSchema = z.object({
  name: z.string(),
  shortName: z.string(),
});

const RegulationFormSchema = z.object({
  name: z.string(),
});

interface Props {
  className?: string;
}

export default function CreateForm({ className }: Props) {
  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // API CALLS
  const departments = api.department.findMany.useQuery();
  const regulations = api.regulation.findMany.useQuery();
  const createCourse = api.course.create.useMutation();
  const createDepartment = api.department.create.useMutation();
  const createRegulation = api.regulation.create.useMutation();

  // FORMS
  const courseForm = useForm<z.infer<typeof CourseFormSchema>>({
    resolver: zodResolver(CourseFormSchema),
  });

  const departmentForm = useForm<z.infer<typeof DepartmentFormSchema>>({
    resolver: zodResolver(DepartmentFormSchema),
  });

  const regulationForm = useForm<z.infer<typeof RegulationFormSchema>>({
    resolver: zodResolver(RegulationFormSchema),
  });

  // Submit Handlers
  async function onSubmitCourseForm(values: z.infer<typeof CourseFormSchema>) {
    console.log(values);
    setIsLoading(true);
    const res = await createCourse.mutateAsync(values);
    if (res) {
      setIsLoading(false);
      courseForm.reset();
      toast.success("Course created successfully");
    } else {
      setIsLoading(false);
      toast.error("Failed to create course");
    }
  }

  async function onDepartmentFormSubmit(
    values: z.infer<typeof DepartmentFormSchema>,
  ) {
    console.log(values);
    setIsLoading(true);
    const res = await createDepartment.mutateAsync(values);
    if (res) {
      setIsLoading(false);
      departmentForm.reset();
      toast.success("Department created successfully");
      await departments.refetch();
    } else {
      setIsLoading(false);
      toast.error("Failed to create department");
    }
  }

  async function onRegulationFormSubmit(
    values: z.infer<typeof RegulationFormSchema>,
  ) {
    console.log(values);
    setIsLoading(true);
    const res = await createRegulation.mutateAsync(values);
    if (res) {
      setIsLoading(false);
      regulationForm.reset();
      toast.success("Regulation created successfully");
      await regulations.refetch();
    } else {
      setIsLoading(false);
      toast.error("Failed to create regulation");
    }
  }

  return (
    <div className="flex gap-6">
      <Card className="h-full min-w-[450px] p-5">
        <p className="mb-2 font-display text-3xl text-primary">Create Course</p>
        <Form {...courseForm}>
          <form
            onSubmit={courseForm.handleSubmit(onSubmitCourseForm)}
            className={className}
          >
            {/* Regulation */}
            <FormField
              control={courseForm.control}
              name="regulationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regulation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Regulation " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regulations.data?.map((regulation) => (
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
              control={courseForm.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      max={8}
                      placeholder="Semester"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={courseForm.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.data?.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={String(department.id)}
                        >
                          {department.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Students */}
            <FormField
              control={courseForm.control}
              name="totalStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Students</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Total Students"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Active */}
            <FormField
              control={courseForm.control}
              name="active"
              defaultValue={true}
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Checkbox
                      {...courseForm.register("active")}
                      defaultChecked={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Course
            </Button>
          </form>
        </Form>
      </Card>

      <div className="flex flex-col gap-6">
        {/* Department Form */}
        <Card className="min-w-[500px] p-5">
          <p className="mb-2 font-display text-3xl text-primary">
            Create Department
          </p>
          <Form {...departmentForm}>
            <form
              onSubmit={departmentForm.handleSubmit(onDepartmentFormSubmit)}
              className={className}
            >
              {/* Name */}
              <FormField
                control={departmentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Short Name */}
              <FormField
                control={departmentForm.control}
                name="shortName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Short Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Department
              </Button>
            </form>
          </Form>
        </Card>

        {/* Regulation Form */}
        <Card className="min-w-[500px] p-5">
          <p className="mb-2 font-display text-3xl text-primary">
            Create Regulation
          </p>
          <Form {...regulationForm}>
            <form
              onSubmit={regulationForm.handleSubmit(onRegulationFormSubmit)}
              className={className}
            >
              {/* Name */}
              <FormField
                control={regulationForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Regulation
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
