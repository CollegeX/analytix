import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const departmentRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.department.findMany();
    return departments;
  }),

  create: protectedProcedure.input(
    z.object({
      name: z.string(),
      shortName: z.string(),
    }))
  .mutation(async ({ ctx, input }) => {
    const department = await ctx.db.department.create({
      data: {
        name: input.name,
        shortName: input.shortName,
      },
    });
    return !!department;
  })
});

export default departmentRouter;
