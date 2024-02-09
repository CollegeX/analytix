import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
  type User,
} from "next-auth";

import { db } from "@/server/db";
import type { Role } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

interface IUser extends DefaultUser {
  id: string;
  role: Role;
}

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT extends IUser {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login" ,
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log("====================================");
      // console.log("token jwt token", token);
      // console.log("====================================");
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        // console.log("====================================");
        // console.log("session token", token);
        // console.log("====================================");
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        const role = token.role;
        session.user.role = role as Role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "roshan@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });


        if (!user || !user.emailVerified) {
          return null;
        }

        // console.log("====================================");
        // console.log("user", user);
        // console.log("====================================");

        const isValid = await argon2.verify(
          user.password,
          credentials.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          role: user.role,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
