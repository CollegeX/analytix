import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const regulationRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const regulations = await ctx.db.regulation.findMany();
    return regulations;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const regulation = await ctx.db.regulation.create({
        data: {
          name: input.name,
        },
      });
      return !!regulation;
    }),
});

export default regulationRouter;
