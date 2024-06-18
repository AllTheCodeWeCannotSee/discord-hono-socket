"use client"

import { useGetChannel } from "@/app/features/channel/api/use-get-channel";
import { ChatHeader } from "@/app/features/chat/components/chat-header";
import { ChatInput } from "@/app/features/chat/components/chat-input";
import { ChatMain } from "@/app/features/chat/components/chat-main";
import { useParams } from "next/navigation";

const ChannelPage = () => {
    const params = useParams();
    const serverId = params?.serverId;
    const channelId = params?.channelId;

    if (!serverId || !channelId) {
        return null;
    }
    if (typeof serverId !== "string" || typeof channelId !== "string") {
        return null;
    }

    const query = useGetChannel({
        server_id: serverId,
        channel_id: channelId,
    });

    const channelData = query.data;




    return (
        <div className=" w-[calc(100%-288px)] flex flex-col">
            <ChatHeader channelId={channelId} channelName={channelData?.name} />
            <ChatMain channelId={channelId} serverId={serverId} />
            <ChatInput channelId={channelId} serverId={serverId} />
        </div>
    )
}

export default ChannelPage;