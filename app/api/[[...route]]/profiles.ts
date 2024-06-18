import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzle";
import { insertProfileSchema, profile } from "@/db/schema"

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

            const [data] = await db
                .select()
                .from(profile)
                .where(eq(profile.userId, auth.userId))

            return c.json({ data })

        })
    .post('/',
        clerkMiddleware(),
        zValidator('json', insertProfileSchema.pick({
            name: true,
            imageUrl: true,
            email: true,
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({
                    error: 'You are not logged in.'
                }, 401)
            }
            const [currentProfile] = await db
                .select()
                .from(profile)
                .where(eq(profile.userId, auth.userId));


            if (currentProfile) {
                return c.json({
                    error: 'Profile already exists.'
                }, 400)
            }

            const values = c.req.valid('json');


            const [data] = await db
                .insert(profile)
                .values({
                    id: createId(),
                    userId: auth.userId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ...values
                })
                .returning();


            if (!data) {
                return c.json({
                    error: 'Failed to create profile.'
                }, 500);
            }

            return c.json({ data })
        }
    )

export default app;
