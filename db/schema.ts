import { relations } from "drizzle-orm";
import { integer, text, boolean, pgTable, date, timestamp, pgEnum } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";


// Profile
export const profile = pgTable("profile", {
    id: text("id").primaryKey(),
    userId: text("user_id").unique().notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    name: text("name"),
    imageUrl: text("image_url"),
    email: text("email"),
})


export const profileRelations = relations(profile, ({ many }) => ({
    server: many(server),
    channel: many(channel),
    member: many(member),
}));

export const insertProfileSchema = createInsertSchema(profile);

// Server
export const server = pgTable("server", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    inviteCode: text("invite_code").unique().notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    profileId: text("profile_id").references(() => profile.id, { onDelete: "cascade" }).notNull(),

})

export const serverRelations = relations(server, ({ many }) => ({
    channel: many(channel),
    member: many(member),
}));

export const insertServerSchema = createInsertSchema(server);


// Channel
export const channelTypeEnum = pgEnum("channel_type", ["TEXT", "AUDIO", "VIDEO"]);

export const channel = pgTable("channel", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: channelTypeEnum("channel_type").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    profileId: text("profile_id").references(() => profile.id, { onDelete: "cascade", }).notNull(),
    serverId: text("server_id").references(() => server.id, { onDelete: "cascade" }).notNull(),

})

export const channelRelations = relations(channel, ({ many }) => ({
    message: many(message),
}));
export const insertChannelSchema = createInsertSchema(channel);


// Message
export const message = pgTable("message", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    deleted: boolean("deleted").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    channelId: text("channel_id").references(() => channel.id, { onDelete: "cascade" }).notNull(),
    memberId: text("member_id").references(() => member.id, { onDelete: "cascade" }).notNull(),

    fileUrl: text("file_url"),
})

export const insertMessageSchema = createInsertSchema(message);


// Member
export const memberRoleEnum = pgEnum("member_role", ["ADMIN", "MODERATOR", "GUEST"]);

export const member = pgTable("member", {
    id: text("id").primaryKey(),
    role: memberRoleEnum("role").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    serverId: text("server_id").references(() => server.id, { onDelete: "cascade" }).notNull(),
    profileId: text("profile_id").references(() => profile.id, { onDelete: "cascade" }).notNull(),
})

export const memberRelations = relations(member, ({ many }) => ({
    message: many(message),
    directMessage: many(directMessage),
}))

export const insertMemberSchema = createInsertSchema(member);

// DirectMessage
export const directMessage = pgTable("direct_message", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    deleted: boolean("deleted").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),

    conversationId: text("conversation_id").references(() => conversation.id, { onDelete: "cascade" }).notNull(),
    memberId: text("member_id").references(() => member.id, { onDelete: "cascade" }).notNull(),

    fileUrl: text("file_url"),
})


// Conversation
export const conversation = pgTable("conversation", {
    id: text("id").primaryKey(),

});

export const conversationRelations = relations(conversation, ({ many }) => ({
    directMessage: many(directMessage),
}))