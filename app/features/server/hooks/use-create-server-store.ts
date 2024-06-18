

import { create } from "zustand";

type CreateServerStoreState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCreateServerStore = create<CreateServerStoreState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
