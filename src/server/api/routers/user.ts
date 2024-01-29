import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";
import { z } from "zod";

const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        role: Role.UNASSIGNED,
      },
    });
    return !!user;
  }),
});

export default userRouter;