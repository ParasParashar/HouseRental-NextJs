import { create } from 'zustand';

interface RegisterModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const UseRegisterModel = create<RegisterModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default UseRegisterModel;
