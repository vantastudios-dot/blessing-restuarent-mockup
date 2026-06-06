import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, localUsers, bookings, messages, contacts } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();
    const [bookingData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bookings);
    const [messageData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages);
    const [userData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    const [localUserData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(localUsers);
    const [contactData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contacts);
    const [pendingData] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bookings)
      .where(eq(bookings.status, "pending"));

    return {
      totalBookings: bookingData.count,
      totalMessages: messageData.count,
      totalUsers: userData.count + localUserData.count,
      totalContacts: contactData.count,
      pendingBookings: pendingData.count,
    };
  }),

  recentBookings: adminQuery
    .input(
      z.object({
        limit: z.number().optional().default(10),
      }).optional().default({ limit: 10 })
    )
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(bookings)
        .orderBy(desc(bookings.createdAt))
        .limit(input.limit);
    }),

  recentMessages: adminQuery
    .input(
      z.object({
        limit: z.number().optional().default(10),
      }).optional().default({ limit: 10 })
    )
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))
        .limit(input.limit);
    }),

  allUsers: adminQuery.query(async () => {
    const db = getDb();
    const oauthUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    const local = await db
      .select({
        id: localUsers.id,
        name: localUsers.displayName,
        email: localUsers.email,
        role: localUsers.role,
        createdAt: localUsers.createdAt,
      })
      .from(localUsers)
      .orderBy(desc(localUsers.createdAt));

    return [
      ...oauthUsers.map((u) => ({ ...u, authType: "oauth" as const })),
      ...local.map((u) => ({ ...u, authType: "local" as const })),
    ];
  }),

  updateRole: adminQuery
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["user", "admin"]),
        table: z.enum(["users", "localUsers"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      if (input.table === "users") {
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
      } else {
        await db
          .update(localUsers)
          .set({ role: input.role })
          .where(eq(localUsers.id, input.userId));
      }
      return { success: true };
    }),
});
