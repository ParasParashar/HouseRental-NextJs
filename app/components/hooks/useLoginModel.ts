import { create } from 'zustand';

interface LoginModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const UseLoginModel = create<LoginModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default UseLoginModel;
