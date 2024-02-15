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
      return !!tag;
    }),

  findParentTags: protectedProcedure
  .query(async({ctx}) => {
    const parentTags = await ctx.db.tag.findMany({
      where: {
        Parent: undefined,
      },
    });

    return parentTags;
  }),

  findTagByName: protectedProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .query(async({ctx, input}) => {
    const tag = await ctx.db.tag.findUnique({
      where: {
        name: input.name,
      },
      include: {
        Child: true,
      }
    });

    return tag;
  })
});

export default tagRouter;