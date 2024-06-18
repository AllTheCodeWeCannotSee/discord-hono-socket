
import { db } from "@/db/drizzle";
import { member, message, profile, server } from "@/db/schema";
import { NextApiResponseServerIo } from "@/types";
import { and, eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { content } = req.body;
        const { server_id, channel_id } = req.query;
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "You are not logged in" });
        }

        const [profileData] = await db
            .select()
            .from(profile)
            .where(eq(profile.userId, userId));
        if (!profileData) {
            return res.status(404).json({ error: "Profile not found" });
        }

        const [serverData] = await db
            .select()
            .from(server)
            .where(eq(server.id, server_id as string));;

        if (!serverData) {
            return res.status(404).json({ error: "Server not found" });
        }


        const [memberData] = await db
            .select()
            .from(member)
            .where(
                and(
                    eq(member.serverId, server_id as string),
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
                channelId: channel_id as string,
                memberId: memberData.id,
            })
            .returning();

        const key = `channel:${channel_id}`
        res?.socket?.server?.io?.emit(key, messageData);
        return res.json({ messageData });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
} 