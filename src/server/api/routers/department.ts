import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const departmentRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.department.findMany();
    return departments;
  }),
});

export default departmentRouter;
