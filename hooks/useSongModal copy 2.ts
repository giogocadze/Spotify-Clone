import { create } from "zustand"
interface useSongModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
const useSongModal = create<useSongModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))
export default useSongModal;