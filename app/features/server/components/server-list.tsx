"use client";

import { MessageSquare } from "lucide-react";
import { ActionButton } from "./action-button";

import { Separator } from "@/components/ui/separator";
import { ServerButton } from "./server-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetServers } from "../../server/api/use-get-servers";

import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const ServerList = () => {
    const query = useGetServers();
    const router = useRouter();

    if (query.isPending) {
        return (
            <div className=" flex flex-col flex-1 w-full mt-2 items-center gap-y-4">
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
                <Separator className="w-8 bg-neutral-700" />
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
                <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
            </div>
        )
    }


    return (
        <div className=" flex flex-col flex-1 w-full mt-2 items-center">


            <ActionButton
                key="Private Message"
                label="私信"
                icon={MessageSquare}
                buttonClassName="hover:bg-indigo-500"
                iconClassName="text-white"
                onClick={() => { }}
            />

            <Separator className="mt-4 w-8 bg-neutral-700" />

            <ScrollArea className="h-[480px] w-full">
                {
                    query.data?.map(({ server }) => (
                        <div key={server.id} className="mb-2">
                            <ServerButton
                                key={server.id}
                                serverId={server.id}
                                label={server.name}
                                imageUrl={server.imageUrl}
                                buttonClassName="hover:bg-neutral-600"
                                iconClassName="text-white"
                                onClick={() => {
                                    return router.push(`/servers/${server.id}`)
                                }}
                            />
                        </div>
                    ))
                }


            </ScrollArea>
        </div>
    )
}