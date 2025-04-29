import { useEffect, useState } from "react";

import useUserStore from "@/contexts/user.context";
import usePreferencesStore from "@/contexts/preferences.context";

import Account from "./components/account";
import Security from "./components/Security";
// import Historic from "./components/historic";
import Preferences from "./components/preferences";

const Profile = () => {
  const { setUser } = useUserStore();
  const { theme } = usePreferencesStore();
  const [effectiveTheme, setEffectiveTheme] = useState("light");

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
      let currentTheme = theme;

      if (theme === "system") {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        currentTheme = isSystemDark ? "dark" : "light";
      }

      setEffectiveTheme(currentTheme);

      if (currentTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemThemeChange = (e) => {
      if (theme === "system") {
        const newTheme = e.matches ? "dark" : "light";
        setEffectiveTheme(newTheme);

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
      className={`h-screen py-12 px-7 lg:px-44 flex flex-col gap-7 ${
        effectiveTheme === "light" ? "bg-[#F5F7FA]" : "bg-[#1a1a1a]"
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
