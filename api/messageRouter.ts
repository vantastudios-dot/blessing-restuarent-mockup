import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { messages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const messageRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        message: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(messages).values({
        name: input.name,
        email: input.email,
        message: input.message,
      });
      return { id: Number(result[0].insertId) };
    }),

  list: publicQuery
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).optional().default(50),
        offset: z.number().int().min(0).optional().default(0),
      }).optional().default({ limit: 50, offset: 0 })
    )
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(messages).where(eq(messages.id, input.id));
      return { success: true };
    }),
});
