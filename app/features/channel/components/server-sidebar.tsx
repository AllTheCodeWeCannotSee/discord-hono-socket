

"use client";

import { ServerHeader } from "./server-header"
import { ServerFooter } from "./server-footer"
import { ChannelList } from "./channel-list";

type ServerSidebarProps = {
    serverId: string;
}

export const ServerSidebar = ({
    serverId
}: ServerSidebarProps) => {

    return (
        <div className="w-[288px]  flex flex-col items-center">
            <ServerHeader serverId={serverId} />
            <ChannelList serverId={serverId} />
            <ServerFooter />
        </div>
    )
}