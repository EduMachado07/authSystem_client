import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import usePreferencesStore from "@/contexts/preferences.context";

import background from "../../assets/login.assets.jpg";

function Auth() {
  const { theme } = usePreferencesStore();

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
    <main className="h-dvh flex">
      <section className="relative xl:w-2/5 h-full max-lg:hidden overflow-hidden shadow-md shadow-neutral-600">
        <img src={background} alt="" className="h-full w-full object-cover" />
      </section>

      {/* FORMULARIO */}
      <section
        className={`${
          theme === "light" ? "bg-[#F5F7FA]" : "bg-[#1a1a1a]"
        }h-full xl:w-3/5 w-full flex flex-col gap-7 justify-center items-center px-8 md:px-28 xl:px-52`}
      >
        {/* -- component forms -- */}
        <Outlet />
      </section>
    </main>
  );
}

export default Auth;
