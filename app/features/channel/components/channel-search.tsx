import { Search } from "lucide-react"


export const ChannelSearch = () => {
    return (
        <div className="h-8 bg-neutral-800 text-zinc-400 hover:bg-neutral-600 hover:text-zinc-200 flex items-center mx-2 my-3 px-2 rounded-md hover:cursor-pointer">
            <Search className="w-4 h-4 mr-2" />
            <p className="">Search</p>
        </div>
    )
}