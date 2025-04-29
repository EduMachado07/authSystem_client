import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreferencesStore = create(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: "preferences-storage",
    }
  )
);

export default usePreferencesStore;
