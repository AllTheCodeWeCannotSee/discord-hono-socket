"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Settings } from "lucide-react";
import { useGetServerWithMemberRole } from "../../server/api/use-get-server-with-member-role";
import { Skeleton } from "@/components/ui/skeleton"
import { useCreateChannelStore } from "../../server/hooks/use-create-channel-store";


type Props = {
    serverId: string;
}

export const ServerHeader = ({ serverId }: Props) => {

    const query = useGetServerWithMemberRole(serverId);
    const data = query.data;

    const { isOpen, onOpen } = useCreateChannelStore();


    if (query.isPending || query.isLoading || !data) {
        return (
            <div className="flex h-12 items-center w-full bg-neutral-800  border-b-black border-b-2 px-4">

                <Skeleton className="h-6 w-48  bg-neutral-700" />
                <Skeleton className="h-6 w-6 ml-auto rounded-full bg-neutral-700" />

            </div>
        )
    }



    const { role } = data.memberRole;
    const isAdmin = role === "ADMIN";
    const isModerator = isAdmin || role === "MODERATOR";

    return (
        <div className="flex h-12 items-center w-full border-b-black border-b-2">
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full h-full border-none rounded-none bg-neutral-800 text-zinc-300 hover:bg-neutral-800/80  font-semibold focus:outline-none">
                    <div className="flex items-center  px-4">
                        <p className="text-sm">{data?.serverData.name}</p>
                        <ChevronDown className="h-5 w-5 ml-auto" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="border-none rounded-sm bg-black text-zinc-400 font-semibold w-64 focus-visible:ring-0 focus-visible:ring-offset-0  focus-visible:outline-none"

                >
                    {isModerator && (
                        <DropdownMenuItem className="px-4 bg-black text-indigo-400 focus:text-zinc-200 focus:bg-indigo-500 my-1 ">
                            Invite People
                        </DropdownMenuItem>
                    )}

                    {isAdmin && (
                        <DropdownMenuItem className="px-4 bg-black focus:text-zinc-200  focus:bg-neutral-800 my-1 ">
                            Server Settings
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-4 bg-black focus:text-zinc-200  focus:bg-neutral-800 my-1 ">
                            Manage Members
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuItem
                            className="px-4 bg-black focus:text-zinc-200  focus:bg-neutral-800 my-1 "
                            onClick={() => onOpen(data.serverData.id)}
                        >
                            Create Channel
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-4 bg-black text-rose-500 focus:text-white  focus:bg-neutral-800 my-1 ">
                            Delete Server
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem
                            className=" px-4 bg-black text-rose-500 focus:text-white focus:bg-rose-500 my-1">
                            Leave Server
                        </DropdownMenuItem>
                    )}
                    {/* <Separator className="bg-neutral-500  mx-auto w-52" /> */}

                </DropdownMenuContent>
            </DropdownMenu>

        </div >
    )
}