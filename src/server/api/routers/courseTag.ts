import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const courseTagRouter = createTRPCRouter({
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const courseTags = await ctx.db.courseTag.findMany({
      include: {
        Course: true,
        Tag: true,
      },
    });
    return courseTags;
  }),

  create: protectedProcedure
    .input(
      z.object({
        course: z.number(),
        tag: z.number(),
        count: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const courseTag = await ctx.db.courseTag.create({
        data: {
          count: input.count,
          Course: {
            connect: {
              id: input.course,
            },
          },
          Tag: {
            connect: {
              id: input.tag,
            },
          },
        },
      });
      return !!courseTag;
    }),
});

export default courseTagRouter;
