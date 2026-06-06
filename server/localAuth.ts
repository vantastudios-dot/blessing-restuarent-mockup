import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "blessings-local-auth-secret-key";

function signToken(userId: number): string {
  return jwt.sign({ userId, type: "local" }, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyLocalToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { clockTolerance: 60 }) as { userId: number };
    return decoded;
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6).max(100),
        displayName: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);
      const result = await db.insert(localUsers).values({
        username: input.username,
        passwordHash,
        displayName: input.displayName || input.username,
        email: input.email,
      });

      const userId = Number(result[0].insertId);
      const token = signToken(userId);

      return {
        token,
        user: {
          id: userId,
          name: input.displayName || input.username,
          username: input.username,
          role: "user" as const,
        },
      };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const users = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (users.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const user = users[0];
      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const token = signToken(user.id);

      return {
        token,
        user: {
          id: user.id,
          name: user.displayName || user.username,
          username: user.username,
          role: user.role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const token =
      ctx.req.headers.get("x-local-auth-token") || "";
    if (!token) return null;

    const decoded = verifyLocalToken(token);
    if (!decoded) return null;

    const db = getDb();
    const users = await db
      .select()
      .from(localUsers)
      .where(eq(localUsers.id, decoded.userId))
      .limit(1);

    if (users.length === 0) return null;

    const user = users[0];
    return {
      id: user.id,
      name: user.displayName || user.username,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }),
});
