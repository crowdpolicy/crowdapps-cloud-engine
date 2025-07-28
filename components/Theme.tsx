import sun from "../assets/images/Header/sun.svg";
import moon from "../assets/images/Header/moon.svg";
import Image from "next/image";
import { useEffect } from "react";

import { useTheme } from "next-themes";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const element = document.documentElement;
    localStorage.setItem("theme", theme as any);

    function onWindowMatch() {
      if (localStorage.theme === "dark") {
        setTheme("dark");
        element.classList.add("dark");
      } else {
        setTheme("light");
        element.classList.remove("dark");
      }
    }

    onWindowMatch();

    return () => {};
  }, [setTheme, theme]);

  return (
    <div className="flex flex-col top-auto lg:top-5 right-[20vw] md:right-[10vw] lg:right-[8.5vw] items-end w-fit z-1000">
      <div className="text-right">
        {theme === "dark" ? (
          <button
            key="dark"
            className={`sunSvg flex items-center gap-x-3  text-dark`}
            onClick={() => setTheme("light")}
          >
            <Image src={sun} alt="" className="w-[28px]" />
          </button>
        ) : theme === "light" ? (
          <button
            key="light"
            className={`moonSvg flex items-center gap-x-3  text-dark`}
            onClick={() => setTheme("dark")}
          >
            <Image src={moon} alt="" className="w-[28px]" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
