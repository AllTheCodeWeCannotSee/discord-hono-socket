
import { ActionList } from "./action-list"
import { ServerList } from "./server-list"

export const Sidebar = () => {

    return (
        <div className="bg-neutral-900 text-white w-[72px] flex flex-col items-center pt-2 pb-8 justify-between h-full ">
            <ServerList />
            <ActionList />
        </div>
    )
}

