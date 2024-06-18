
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserButton } from "@clerk/nextjs"
import { Headphones, Mic, Settings } from "lucide-react"
import { useGetProfile } from "../../profile/api/use-get-profile"



export const ServerFooter = () => {
    const query = useGetProfile();
    const data = query.data

    return (
        <div className=" h-12 w-full flex items-center bg-neutral-900/80 text-zinc-300 px-2 " >
            <div className="flex mr-2 items-center justify-center">
                <UserButton />
            </div>

            <div className="text-zinc-200 flex flex-col items-center">
                <p className="text-sm">{data?.name}</p>
                <p className="text-zinc-400 text-sm ">在线</p>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <Mic size={20} />
                <Headphones size={20} />
                <Settings size={20} />
            </div>
        </div>
    )
}