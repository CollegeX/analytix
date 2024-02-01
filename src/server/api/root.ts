import { createTRPCRouter } from "@/server/api/trpc";
import { courseRouter } from "@/server/api/routers/course";
import userRouter from "@/server/api/routers/user";
import tagRouter from "./routers/tag";
import departmentRouter from "./routers/department"; 
import regulationRouter from "./routers/regulation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  user: userRouter,
  tag: tagRouter,
  department: departmentRouter,
  regulation: regulationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
