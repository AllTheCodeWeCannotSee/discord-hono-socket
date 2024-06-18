"use client";
import { Compass, Plus } from "lucide-react"
import { ActionButton } from "./action-button"
import { useCreateServerStore } from "../hooks/use-create-server-store";




export const ActionList = () => {

    const { isOpen, onOpen, onClose } = useCreateServerStore();



    return (
        <div className="mt-4 mb-4 flex flex-col gap-y-4">
            <ActionButton
                key="Add"
                label="Add Server"
                icon={Plus}
                buttonClassName="hover:bg-emerald-500"
                iconClassName="text-emerald-500 group-hover:text-white"
                onClick={onOpen}
            />

            <ActionButton
                key="Expolre"
                label="Explore"
                icon={Compass}
                buttonClassName="hover:bg-emerald-500"
                iconClassName="text-emerald-500 group-hover:text-white"
                onClick={() => { }}
            />
        </div>
    )
}