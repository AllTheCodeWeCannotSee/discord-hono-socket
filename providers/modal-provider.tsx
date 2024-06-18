import { CreateChannelModal } from "@/app/features/server/components/create-channel-modal"
import { CreateServerModal } from "@/app/features/server/components/create-server-modal"



export const ModalProvider = () => {
    return (
        <div>
            <CreateServerModal />
            <CreateChannelModal />
        </div>
    )
}