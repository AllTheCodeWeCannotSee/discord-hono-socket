import { db } from "@/db/drizzle";
import { channel, insertServerSchema, member, profile, server } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { and, eq, ne, notInArray, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";


const app = new Hono()
    .get(
        '/',
        clerkMiddleware(),
        async (c) => {
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

            const serverData = await db
                .select({ server })
                .from(server)
                .leftJoin(member, eq(server.id, member.serverId))
                .where(eq(member.profileId, profileData.id));

            return c.json({ serverData })
        }
    )
    .get(
        '/:id',
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

            const [serverData] = await db
                .select()
                .from(server)
                .where(eq(server.id, id));

            const memberData = await db
                .select()
                .from(member)
                .where(eq(member.serverId, id));

            const channelData = await db
                .select()
                .from(channel)
                .where(eq(channel.serverId, id));

            return c.json({ serverData, memberData, channelData })
        }
    )
    .get(
        '/:id/role',
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

            const [serverData] = await db
                .select()
                .from(server)
                .where(eq(server.id, id));

            const [memberRole] = await db.select({ role: member.role })
                .from(member)
                .where(and(
                    eq(member.serverId, id),
                    eq(member.profileId, profileData.id)
                ))

            return c.json({ serverData, memberRole })
        }
    )

    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertServerSchema.pick({
            name: true,
            imageUrl: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

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

            const [serverData] = await db
                .insert(server)
                .values({
                    id: createId(),
                    profileId: profileData.id,
                    inviteCode: createId(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ...values,
                })
                .returning();

            const [channelData] = await db
                .insert(channel)
                .values({
                    id: createId(),
                    name: "genernal",
                    type: "TEXT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    profileId: profileData.id,
                    serverId: serverData.id,
                })
                .returning();

            const [memberData] = await db
                .insert(member)
                .values({
                    id: createId(),
                    role: "ADMIN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    serverId: serverData.id,
                    profileId: profileData.id,
                })
                .returning();
            if (!serverData || !channelData || !memberData) {
                return c.json({
                    error: 'Failed to create server.'
                }, 500)
            }

            return c.json({ serverData })
        }
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        zValidator("json", insertServerSchema.pick({
            name: true,
            imageUrl: true,
        })),
        zValidator("param", z.object({
            id: z.string(),
        })),

        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

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

            const [serverData] = await db
                .update(server)
                .set(values)
                .where(
                    and(
                        eq(server.id, id),
                        eq(server.profileId, profileData.id)
                    )
                )
                .returning();
            return c.json({ serverData })
        }
    )
    .delete(
        '/:id',
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

            const [serverData] = await db
                .delete(server)
                .where(and(
                    eq(server.id, id),
                    eq(server.profileId, profileData.id)
                ))
                .returning();

            if (!serverData) {
                return c.json({
                    error: 'Server not found.'
                }, 404)
            }

            return c.json({ serverData })

        }
    )
    .patch(
        "/:id/invite",
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

            const [serverData] = await db
                .update(server)
                .set({
                    inviteCode: createId()
                })
                .where(and(
                    eq(server.id, id),
                    eq(server.profileId, profileData.id)
                ))
                .returning();

            return c.json({ serverData });
        }
    )
    .patch(
        "/:id/leave",
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

            const memberToDelete = db
                .$with("member_to_delete")
                .as(
                    db
                        .select({ id: member.id })
                        .from(member)
                        .innerJoin(server, eq(member.serverId, server.id))
                        .where(
                            and(
                                eq(member.profileId, profileData.id),
                                eq(server.id, id),
                                ne(server.profileId, profileData.id)
                            )
                        )
                )

            const [memberData] = await db
                .with(memberToDelete)
                .delete(member)
                .where(
                    eq(member.id, sql`(select id from ${memberToDelete})`)
                )
                .returning();

            if (!memberData) {
                return c.json({
                    error: 'Failed to leave server.'
                }, 500)
            }

            return c.json({ memberData })
        }

    )
    .post(
        "/join",
        clerkMiddleware(),
        zValidator("json", insertServerSchema.pick({
            inviteCode: true
        })),
        async (c) => {
            console.log("join")
            const auth = getAuth(c);
            const { inviteCode } = c.req.valid("json");
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
            const [serverData] = await db
                .select()
                .from(server)
                .where(eq(server.inviteCode, inviteCode));

            const [serverAndMemberData] = await db
                .select()
                .from(server)
                .innerJoin(member, eq(server.id, member.serverId))
                .where(
                    and(
                        eq(server.inviteCode, inviteCode),
                        eq(member.profileId, profileData.id),
                    )
                );

            if (serverAndMemberData) {
                return c.json({
                    error: 'You have joined this server .'
                }, 404)
            }

            const [memberData] = await db
                .insert(member)
                .values({
                    id: createId(),
                    role: "GUEST",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    serverId: serverData.id,
                    profileId: profileData.id,
                })
                .returning();

            if (!memberData) {
                return c.json({
                    error: 'Failed to join server.'
                }, 500)
            }

            return c.json({ memberData })
        }
    )




export default app;