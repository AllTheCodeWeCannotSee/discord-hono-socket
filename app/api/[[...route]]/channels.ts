import { db } from "@/db/drizzle";
import { channel, insertChannelSchema, member, profile } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { and, eq, ne, notInArray, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";


const app = new Hono()
    .get(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string()
        })),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");
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

            const channelData = await db
                .select()
                .from(channel)
                .where(
                    eq(channel.serverId, id),
                );

            return c.json({ channelData })



        }
    )
    .get("/:server_id/channel/:channel_id",
        clerkMiddleware(),
        zValidator("param", z.object({
            server_id: z.string(),
            channel_id: z.string(),
        })),
        async (c) => {
            const auth = getAuth(c);
            const {
                server_id,
                channel_id
            } = c.req.valid("param");

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
                        eq(member.profileId, profileData.id),
                        eq(member.serverId, server_id),
                    )
                );
            if (!memberData) {
                return c.json({
                    error: 'You are not a member of this server.'
                }, 403)
            }

            const [channelData] = await db
                .select()
                .from(channel)
                .where(eq(channel.id, channel_id));

            return c.json({ channelData })

        }
    )

    .post(
        "/:id/create",
        clerkMiddleware(),
        zValidator("json", insertChannelSchema.pick({
            name: true,
            type: true,
        })),
        zValidator("param", z.object({
            id: z.string()
        })),
        async (c) => {
            const values = c.req.valid("json");
            const { id } = c.req.valid("param");
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
                        eq(member.profileId, profileData.id),
                        eq(member.serverId, id),
                    )
                );


            if (!memberData) {
                return c.json({
                    error: 'You are not a member of this server.'
                }, 403)
            }
            if (memberData.role === "GUEST") {
                return c.json({
                    error: 'You do not have permission to create a channel.'
                }, 403)
            }
            const [channelData] = await db
                .insert(channel)
                .values({
                    id: createId(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    profileId: profileData.id,
                    serverId: id,
                    ...values,
                })
                .returning();


            return c.json({ channelData })
        }
    )



export default app;