import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        urlImage: "",
        name: "",
        email: "",
        phones: [],
        // historic: [],
      },
      setUser: (userData) => set({ user: userData }),
      clearUser: () =>
        set({
          user: {
            urlImage: "",
            name: "",
            email: "",
            phones: [],
            // historic: [],
          },
        }),
    }),
    {
      name: "user-storage", // nome da chave no localStorage
    }
  )
);

export default useUserStore;
