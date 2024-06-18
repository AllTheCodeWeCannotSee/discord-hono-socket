import { db } from "@/db/drizzle";
import { insertMessageSchema, member, message, profile } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";



const app = new Hono()
    .get("/:server_id/channel/:channel_id/message",
        clerkMiddleware(),
        zValidator("param", z.object({
            server_id: z.string(),
            channel_id: z.string(),
        })),
        async (c) => {
            const { server_id, channel_id } = c.req.valid("param");
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({
                    error: 'You are not logged in.'
                }, 401)
            }

            const [profileData] = await db
                .select()
                .from(profile)
                .where(eq(profile.userId, auth.userId));

            if (!profileData) {
                return c.json({
                    error: 'Profile not found.'
                }, 404)
            }

            const [memberData] = await db
                .select()
                .from(member)
                .where(
                    and(
                        eq(member.serverId, server_id),
                        eq(member.profileId, profileData.id),
                    )
                );

            const messageData = await db
                .select()
                .from(message)
                .where(
                    and(
                        eq(message.channelId, channel_id),
                    )
                );


            return c.json({ messageData })
        }
    )
    .post('/:server_id/channel/:channel_id/message',
        clerkMiddleware(),
        zValidator("param", z.object({
            server_id: z.string(),
            channel_id: z.string(),
        })),
        zValidator("json", insertMessageSchema.pick({ content: true })),
        async (c) => {
            const { content } = c.req.valid("json");
            const { server_id, channel_id } = c.req.valid("param");
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({
                    error: 'You are not logged in.'
                }, 401)
            }

            const [profileData] = await db
                .select()
                .from(profile)
                .where(eq(profile.userId, auth.userId));

            if (!profileData) {
                return c.json({
                    error: 'Profile not found.'
                }, 404)
            }

            const [memberData] = await db
                .select()
                .from(member)
                .where(
                    and(
                        eq(member.serverId, server_id),
                        eq(member.profileId, profileData.id),
                    )
                );

            const [messageData] = await db
                .insert(message)
                .values({
                    id: createId(),
                    content,
                    deleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    channelId: channel_id,
                    memberId: memberData.id,
                })
                .returning();

            return c.json({ messageData })
        }
    )



export default app;