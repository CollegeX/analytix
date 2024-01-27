import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
    findMany: publicProcedure
    .query(async({ctx}) => {
        const courses = await ctx.db.course.findMany();
        return courses;
    })
    
});

