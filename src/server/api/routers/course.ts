import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findMany({
      include: {
        Department: {
          select: {
            shortName: true,
          },
        },
        Regulation: {
          select: {
            name: true,
          },
        },
      },
    });
    return courses;
  }),

  create: protectedProcedure
    .input(
      z.object({
        regulationId: z.number(),
        semester: z.number(),
        departmentId: z.number(),
        active: z.boolean(),
        totalStudents: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.db.course.create({
        data: {
          semester: input.semester,
          isActive: input.active,
          totalStudents: input.totalStudents,
          Department: {
            connect: {
              id: input.departmentId,
            },
          },
          Regulation: {
            connect: {
              id: input.regulationId,
            },
          },
        },
      });
      return !!course;
    }),
});
