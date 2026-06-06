import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { menuItems } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const menuRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z
            .enum(["chinese", "tandoor", "thali", "bakery", "cafe", "desserts"])
            .optional(),
        })
        .optional()
        .default({})
    )
    .query(async ({ input }) => {
      const db = getDb();
      if (input.category) {
        return db
          .select()
          .from(menuItems)
          .where(eq(menuItems.category, input.category))
          .orderBy(desc(menuItems.createdAt));
      }
      return db.select().from(menuItems).orderBy(desc(menuItems.createdAt));
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db
        .select()
        .from(menuItems)
        .where(eq(menuItems.id, input.id))
        .limit(1);
      return items[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.string().min(1),
        category: z.enum(["chinese", "tandoor", "thali", "bakery", "cafe", "desserts"]),
        image: z.string().optional(),
        isSpecial: z.boolean().optional().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(menuItems).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        category: z.enum(["chinese", "tandoor", "thali", "bakery", "cafe", "desserts"]).optional(),
        image: z.string().optional(),
        isSpecial: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();
      await db.update(menuItems).set(data).where(eq(menuItems.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(menuItems).where(eq(menuItems.id, input.id));
      return { success: true };
    }),
});
