"use client";

import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Hash } from "lucide-react";

import { useState } from "react"

import { ChannelSearch } from "./channel-search"

import { Separator } from "@/components/ui/separator"
import { useGetChannels } from "../api/use-get-channels";
import { ChannelItem } from "./channel-item";
import { useRouter } from "next/navigation";

type Props = {
    serverId: string;
}

export const ChannelList = ({
    serverId
}: Props) => {
    const [isOpenText, setIsOpenText] = useState(true);
    const [isOpenAudio, setIsOpenAudio] = useState(true);
    const [isOpenVideo, setIsOpenVideo] = useState(true);

    const query = useGetChannels(serverId);
    const channelsData = query.data
    const router = useRouter();
    return (
        <ScrollArea className="flex flex-1 w-full bg-neutral-800">
            <ChannelSearch />
            <Separator className="bg-neutral-700 w-52 mx-auto my-1" />
            <div className=" bg-neutral-800 text-zinc-400 flex flex-col items-center gap-y-4">
                <Collapsible
                    open={isOpenText}
                    onOpenChange={setIsOpenText}
                    className="w-full"
                >
                    <CollapsibleTrigger className="flex hover:text-zinc-200 items-center p-2  w-full rounded-md">
                        {isOpenText ? <ChevronDown className="w-5 h-5 mr-1" /> : <ChevronRight className="w-5 h-5 mr-1" />}
                        <p className="uppercase text-xs font-semibold ">TEXT</p>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 flex flex-col items-center rounded-md">
                        {channelsData?.map((channel) => (
                            channel.type === "TEXT" && (
                                <ChannelItem
                                    key={channel.id}
                                    channelId={channel.id}
                                    serverId={serverId}
                                    name={channel.name}
                                    type={channel.type}
                                    onClick={() => router.push(`/servers/${serverId}/channels/${channel.id}`)}
                                />
                            )
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible
                    open={isOpenAudio}
                    onOpenChange={setIsOpenAudio}
                    className="w-full"
                >
                    <CollapsibleTrigger className="flex hover:text-zinc-200 items-center p-2  w-full rounded-md">
                        {isOpenAudio ? <ChevronDown className="w-5 h-5 mr-1" /> : <ChevronRight className="w-5 h-5 mr-1" />}
                        <p className="uppercase text-xs font-semibold ">AUDIO</p>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 flex flex-col items-center rounded-md">
                        {channelsData?.map((channel) => (
                            channel.type === "AUDIO" && (
                                <ChannelItem
                                    key={channel.id}
                                    channelId={channel.id}
                                    serverId={serverId}
                                    name={channel.name}
                                    type={channel.type}
                                    onClick={() => router.push(`/servers/${serverId}/channels/${channel.id}`)}
                                />
                            )
                        ))}
                    </CollapsibleContent>
                </Collapsible>



                <Collapsible
                    open={isOpenVideo}
                    onOpenChange={setIsOpenVideo}
                    className="w-full"
                >
                    <CollapsibleTrigger className="flex hover:text-zinc-200 items-center p-2  w-full rounded-md">
                        {isOpenVideo ? <ChevronDown className="w-5 h-5 mr-1" /> : <ChevronRight className="w-5 h-5 mr-1" />}
                        <p className="uppercase text-xs font-semibold ">VIDEO</p>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 flex flex-col items-center rounded-md">
                        {channelsData?.map((channel) => (
                            channel.type === "VIDEO" && (
                                <ChannelItem
                                    key={channel.id}
                                    channelId={channel.id}
                                    serverId={serverId}
                                    name={channel.name}
                                    type={channel.type}
                                    onClick={() => router.push(`/servers/${serverId}/channels/${channel.id}`)}
                                />
                            )
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>

        </ScrollArea>
    )
}

{/* <Hash className="w-4 h-4 mr-1" />
<p className="group-hover:text-zinc-200">rules</p> */}