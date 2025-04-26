import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreferencesStore = create(
  persist(
    (set) => ({
      theme: "system",
      idiom: "",
      setTheme: (newTheme) => set({ theme: newTheme }),
      setIdiom: (newIdiom) => set({ idiom: newIdiom }),
    }),
    {
      name: "preferences-storage",
    }
  )
);

export default usePreferencesStore;
