import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";
import { hash } from "argon2";
import { z } from "zod";
import { sendEmail } from "@/server/mailer";
import { render } from "@react-email/render";
import ConfirmEmail from "@/server/emails/ConfirmEmail";

const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const password = await hash(input.password);
      const user = await ctx.db.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: password,
          role: Role.UNASSIGNED,
        },
      });
      return !!user;
    }),

  findMany: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),
});

export default userRouter;
