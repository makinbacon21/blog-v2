import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import "./index.css";

import LogoIcon from "./icons/LogoIcon";
import BurgerIcon from "./icons/BurgerIcon";
import MoonIcon from "./icons/MoonIcon";

const pages: Record<string, string> = {
  Home: "/",
  About: "/about",
  Posts: "/posts",
};

function getDark() {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export function Layout() {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(getDark());

  function toggleTheme() {
    const cur_dark = getDark();
    if (cur_dark) localStorage.theme = "light";
    else localStorage.theme = "dark";

    setDark(!cur_dark);
  }

  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  return (
    <>
      <div className="fixed rounded-full w-300 h-300 -top-100 -left-100 dark:w-200 dark:h-200 dark:-top-50 dark:-left-45 bg-radial from-bacongreen to-transparent to-70% opacity-80 dark:opacity-60" />
      <div className="fixed rounded-full w-500 h-500 -bottom-200 -right-200 dark:w-300 dark:h-300 dark:-bottom-100 dark:-right-100 bg-radial from-baconpink to-transparent to-50% opacity-80 dark:opacity-60" />
      <div className="text-bg bg-white dark:text-white dark:bg-bg font-sans w-screen h-screen overscroll-x-contain overscroll-y-none overflow-y-none">
        <div className="w-full h-full relative z-10 flex flex-col">
          <header className="h-20 bg-light dark:bg-dark drop-shadow-md">
            <div className="max-w-7xl mx-auto h-full flex flex-row p-4 gap-4 items-center">
              <div className="rounded-md h-full overflow-hidden hover:scale-120 transition duration-150 ease-in-out">
                <NavLink to={{ pathname: "/" }}>
                  <LogoIcon className="h-full" />
                </NavLink>
              </div>
              <div className="flex-col">
                <h1 className="text-xl md:text-2xl hover:text-gray-500 transition duration-150 ease-in-out">
                  <NavLink to={{ pathname: "/" }}>
                    <strong>Thomas Makin</strong>
                  </NavLink>
                </h1>
                <h3 className="text-sm hover:text-gray-500 transition duration-150 ease-in-out">
                  <NavLink to={{ pathname: "/" }}>thomasmak.in</NavLink>
                </h3>
              </div>
              <div className="justify-end ml-auto" />
              {/* desktop */}
              <div className="hidden md:flex justify-end gap-6 pr-2">
                {Object.keys(pages).map((page) => (
                  <div className="justify-end" key={page}>
                    <NavLink
                      prefetch="intent"
                      className="text-xl hover:text-gray-500 transition-all ease-in-out"
                      to={{ pathname: pages[page] }}
                    >
                      {page}
                    </NavLink>
                  </div>
                ))}
              </div>
              {/* mobile */}
              <div className="flex md:hidden justify-end h-full">
                <BurgerIcon fill="black" className="h-full cursor-pointer" onClick={() => setMenu(!menu)} />
              </div>
              <div className="flex justify-end h-full">
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                >
                <MoonIcon className="h-2/3 cursor-pointer" fill={dark ? "white" : "black"} />
                </button>
              </div>
            </div>
          </header>
          <main className="grow overflow-auto">
            <Outlet />
          </main>
        </div>
        <div
          className={`fixed w-full top-20 left-0 right-0 bottom-0 z-50 bg-light dark:bg-dark transition-all duration-300 ease-in-out ${
            menu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-end p-4 gap-4">
            {Object.keys(pages).map((page) => (
              <div key={page} className="p-2">
                <NavLink
                  prefetch="viewport"
                  className="text-2xl"
                  to={{ pathname: pages[page] }}
                  onClick={() => setMenu(false)}
                >
                  {page}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
