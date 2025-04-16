import { create } from "zustand";
import { persist } from "zustand/middleware";

type RateLimitEntry = {
  count: number;
  // Timestamp for the beginning of the current period
  time: number;
};

type StoreState = {
  error: string | undefined;
  loading: boolean;
  // Record to track rate-limiting entries for different actions
  lastAction: Record<string, RateLimitEntry>;
};

type StoreActions = {
  setError: (error: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  /**
   * Implements rate-limiting based on the number of tries within a specified period.
   * @param key A unique key for the action.
   * @param maxTries The maximum number of allowed tries within the time period.
   * @param period The time period (in milliseconds) for which the tries are counted.
   * @returns true if the action is allowed; otherwise, false.
   */
  rateLimit: (key: string, maxTries: number, period: number) => boolean;
};

export const useFormStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      error: undefined,
      loading: false,
      lastAction: {},
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      rateLimit: (key, maxTries, period) => {
        const now = Date.now();
        const entry = get().lastAction[key];

        // If there is no entry, or the current period has expired,
        // reset the counter
        if (!entry || now - entry.time >= period) {
          set((state) => ({
            lastAction: {
              ...state.lastAction,
              [key]: { count: 1, time: now },
            },
          }));
          return true;
        }

        // If the current count is below the maximum allowed tries,
        // increment and allow the action
        if (entry.count < maxTries) {
          set((state) => ({
            lastAction: {
              ...state.lastAction,
              [key]: { count: entry.count + 1, time: entry.time },
            },
          }));
          return true;
        }

        // Maximum tries exceeded within the period
        return false;
      },
    }),
    {
      name: "form-store",
      // Only persist the lastAction data
      partialize: (state) => ({ lastAction: state.lastAction }),
    }
  )
);
