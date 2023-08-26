import { create } from 'zustand';

interface SearchModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const UseSearchModel = create<SearchModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default UseSearchModel;
