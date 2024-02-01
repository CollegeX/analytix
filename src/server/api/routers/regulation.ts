import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const regulationRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const regulations = await ctx.db.regulation.findMany();
    return regulations;
  }),
});

export default regulationRouter;