import { authRouter } from "./auth-router";
import { localAuthRouter } from "./localAuth";
import { bookingRouter } from "./bookingRouter";
import { messageRouter } from "./messageRouter";
import { menuRouter } from "./menuRouter";
import { contactRouter } from "./contactRouter";
import { adminRouter } from "./adminRouter";
import { aiRouter } from "./aiRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  booking: bookingRouter,
  message: messageRouter,
  menu: menuRouter,
  contact: contactRouter,
  admin: adminRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
