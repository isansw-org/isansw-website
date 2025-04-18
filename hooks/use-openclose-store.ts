import { create } from "zustand";

type Store = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  open: () => void;
  close: () => void;
};

export const useOpenCloseStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
