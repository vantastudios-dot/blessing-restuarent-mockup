import { authRouter } from "./auth-router.js";
import { localAuthRouter } from "./localAuth.js";
import { bookingRouter } from "./bookingRouter.js";
import { messageRouter } from "./messageRouter.js";
import { menuRouter } from "./menuRouter.js";
import { contactRouter } from "./contactRouter.js";
import { adminRouter } from "./adminRouter.js";
import { aiRouter } from "./aiRouter.js";
import { createRouter, publicQuery } from "./middleware.js";

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
