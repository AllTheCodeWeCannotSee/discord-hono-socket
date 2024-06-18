import { Hash } from "lucide-react"
import { SocketIndicator } from "./socket-indicator";


type Props = {
    channelId: string | undefined;
    channelName: string | undefined;
}

export const ChatHeader = ({
    channelId,
    channelName
}: Props) => {

    return (
        <div className="bg-neutral-800/80 h-12 border-b-black border-b-2 flex items-center p-4 ">
            <div className="mr-2">
                <Hash className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-zinc-200">{channelName}</p>
            <div className="ml-auto">
                <SocketIndicator />
            </div>
        </div>
    )
}