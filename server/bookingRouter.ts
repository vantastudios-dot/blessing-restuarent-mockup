import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { bookings } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const bookingRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        phone: z.string().min(1).max(50),
        email: z.string().email().optional(),
        guests: z.number().int().min(1).max(20),
        date: z.string(),
        time: z.string(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(bookings).values({
        name: input.name,
        phone: input.phone,
        email: input.email,
        guests: input.guests,
        date: new Date(input.date),
        time: input.time,
        message: input.message,
      });
      return { id: Number(result[0].insertId), status: "pending" };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: input.status })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(bookings).where(eq(bookings.id, input.id));
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const all = await db.select().from(bookings);
    const pending = all.filter((b) => b.status === "pending").length;
    return {
      total: all.length,
      pending,
      confirmed: all.filter((b) => b.status === "confirmed").length,
      cancelled: all.filter((b) => b.status === "cancelled").length,
    };
  }),
});
