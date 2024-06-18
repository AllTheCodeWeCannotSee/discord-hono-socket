"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMessages } from "../api/use-get-messages";
import { client } from "@/lib/hono";
import { useSocket } from "@/providers/socket-provider";
import { toast } from "sonner";
import { useEffect } from "react";

type Props = {
    channelId: string;
    serverId: string;
}

export const ChatMain = ({
    channelId,
    serverId
}: Props) => {
    const query = useGetMessages({
        server_id: serverId,
        channel_id: channelId
    });
    const messagesData = query.data;

    const { socket } = useSocket();
    useEffect(() => {

        if (!socket) {
            return;
        }
        socket.on(`channel:${channelId}`, () => {
            query.refetch();
        })

        return () => {
            socket.off(`channel:${channelId}`);
        }
    }, [socket, channelId, query])
    return (
        <ScrollArea className="flex-1 bg-neutral-800/70">
            <div className="relative  flex items-center bg-neutral-800/0 py-4 pl-4 pr-16   ">


                {messagesData?.messageData.map((message) => (
                    <div key={message.id} className="flex items-center gap-x-2">

                        <div>
                            <p className="text-zinc-300">{message.content}</p>
                        </div>
                    </div>

                ))}

                {/* <Avatar className="absolute top-4 mr-2 h-10 w-10" >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                <div className=" pl-14">
                    <p className="text-rose-500 text-sm">Paul</p>
                    <p className="text-zinc-300">
                        2019年去世的先锋领航集团创始人约翰·博格尔曾讲过一个故事，让我们意识到关于金钱的一个重要问题。

                        在谢尔特岛的一次派对上，库尔特·冯内古特告诉朋友约瑟夫·海勒，他们的东道主——一位对冲基金经理——在某一天内赚到的钱比海勒的小说《第二十二条军规》赚到的全部版税还多。海勒回答道：“是的，但是我拥有一样他永远不会有的东西——知足。”

                        “知足”这个词简单而又强大。它提醒我们，许多人，包括那些家财万贯的人，似乎从未理解它的真正含义。
                    </p>
                </div> */}
            </div>

        </ScrollArea>
    );
}