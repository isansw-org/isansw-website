import { create } from "zustand";

type FormStore = {
  error: string | undefined;
  loading: boolean;
  setError: (error: string | undefined) => void;
  setLoading: (loading: boolean) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  error: undefined,
  loading: false,
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));
