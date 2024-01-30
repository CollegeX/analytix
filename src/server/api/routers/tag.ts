import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const tagRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db.tag.findMany();
    return tags;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.db.tag.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
      return tag;
    }),
});

export default tagRouter;