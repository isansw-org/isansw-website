import { create } from "zustand";

type Store = {
  error: string | undefined;
  loading: boolean;
  setError: (error: string | undefined) => void;
  setLoading: (loading: boolean) => void;
};

export const useFormStore = create<Store>((set) => ({
  error: undefined,
  loading: false,
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));
