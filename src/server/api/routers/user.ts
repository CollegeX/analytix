import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";
import { hash } from "argon2";
import { z } from "zod";
import { sendEmail } from "@/server/mailer";
import { render } from "@react-email/render";
import ConfirmEmail from "@/server/emails/ConfirmEmail";
import crypto from "crypto";
import { env } from "@/env";

const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        requestedRole: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const password = await hash(input.password);
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const user = await ctx.db.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: password,
          role: Role.UNASSIGNED,
          verificationToken: verificationToken,
          requestedRole: input.requestedRole as Role,
        },
      });
      await sendEmail({
        to: input.email,
        subject: "Verify your Analytix account",
        html: render(
          ConfirmEmail({
            userFirstname: input.firstName,
            confirmEmailLink: `${env.BASE_URL}/verify/email/${verificationToken}`,
          }),
        ),
      });

      return !!user;
    }),

  findMany: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {

      const user = await ctx.db.user.findFirst({
        where: {
          verificationToken: input.token,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Invalid verification token.",
        };
      }

      const updatedUser = await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: true,
          verificationToken: null, 
        },
      });
      if (!updatedUser) {
        return {
          success: false,
          message: "There was an error verifying your email.",
        };
      }

      return {
        success: true,
        message: "Your email has been verified.",
      };
    }),

  findUnassigned: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      where: {
        role: Role.UNASSIGNED,
      },
    });
    return users;
  }),

  changeRole: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: input.role as Role,
        },
      });
      return !!user;
    }),
});

export default userRouter;
