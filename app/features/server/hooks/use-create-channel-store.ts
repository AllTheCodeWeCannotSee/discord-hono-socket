

import { create } from "zustand";

type CreateChannelStoreState = {
    isOpen: boolean;
    serverId?: string;
    onOpen: (id?: string) => void;
    onClose: () => void;

};

export const useCreateChannelStore = create<CreateChannelStoreState>((set) => ({
    isOpen: false,
    serverId: undefined,
    onOpen: (id) => set({ isOpen: true, serverId: id }),
    onClose: () => set({ isOpen: false }),
}));