import { Hash, Mic, Video } from "lucide-react";

type Props = {
    channelId: string;
    serverId: string;
    name: string;
    type: "TEXT" | "AUDIO" | "VIDEO";
    onClick?: () => void;
}

const IconMap = {
    "TEXT": <Hash className="h-5 w-5 mr-2" />,
    "AUDIO": <Mic className="h-5 w-5 mr-2" />,
    "VIDEO": <Video className="h-5 w-5 mr-2" />
}

export const ChannelItem = ({
    channelId,
    serverId,
    name,
    type,
    onClick
}: Props) => {
    return (
        <div
            className="flex items-center w-full group hover:bg-neutral-700 hover:text-zinc-200 p-2 rounded-md cursor-pointer"
            onClick={onClick}
        >
            {IconMap[type]}
            <p className="text-sm ">{name}</p>
        </div>
    )
}