import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./localAuth";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";

export type UnifiedUser = {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
  role: "user" | "admin";
  authType: "oauth" | "local";
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: UnifiedUser;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = {
        id: oauthUser.id,
        name: oauthUser.name || "User",
        email: oauthUser.email,
        avatar: oauthUser.avatar,
        role: oauthUser.role as "user" | "admin",
        authType: "oauth",
      };
      return ctx;
    }
  } catch {
    // OAuth not available
  }

  // Try local auth
  try {
    const localToken = opts.req.headers.get("x-local-auth-token");
    if (localToken) {
      const decoded = verifyLocalToken(localToken);
      if (decoded) {
        const db = getDb();
        const users = await db
          .select()
          .from(localUsers)
          .where(eq(localUsers.id, decoded.userId))
          .limit(1);

        if (users.length > 0) {
          const u = users[0];
          ctx.user = {
            id: u.id,
            name: u.displayName || u.username,
            email: u.email,
            role: u.role as "user" | "admin",
            authType: "local",
          };
        }
      }
    }
  } catch {
    // Local auth not available
  }

  return ctx;
}
