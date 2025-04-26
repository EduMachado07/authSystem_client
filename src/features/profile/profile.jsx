import { useEffect } from "react";

import useUserStore from "@/contexts/user.context";
import usePreferencesStore from "@/contexts/preferences.context";

import Account from "./components/account";
import Security from "./components/Security";
// import Historic from "./components/historic";
import Preferences from "./components/preferences";

const Profile = () => {
  const { setUser } = useUserStore();
  const { theme, setTheme } = usePreferencesStore();

  useEffect(() => {
    const mockUser = {
      urlImage: "",
      name: "Eduardo Machado",
      email: "eduardo@gmail.com",
      phones: [{ number: "12988503575" }, { number: null }],
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      if (theme === "light") {
        root.classList.remove("dark");
      } else if (theme === "dark") {
        root.classList.add("dark");
      } else {
        // Tema do sistema
        const isSystemDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (isSystemDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    // Escutar mudanças no sistema (opcional)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemThemeChange = (e) => {
      if (theme === "system") {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };
    mediaQuery.addEventListener("change", systemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", systemThemeChange);
    };
  }, [theme]);

  return (
    <main
      className={`py-12 px-7 lg:px-44 flex flex-col gap-7 ${
        theme === "light" ? "bg-[#F5F7FA]" : "bg-[#1a1a1a]"
      }`}
    >
      {/* CONTA */}
      <Account />
      {/* PREFERENCIAS */}
      <Preferences />
      {/* SEGURANÇA */}
      <Security />
      {/* HISTORICO */}
      {/* <Historic /> */}
    </main>
  );
};

export default Profile;
