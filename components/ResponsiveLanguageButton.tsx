import dropdownArrowBlack from "../assets/images/Dropdown-arrow-black.svg";
import dropdownArrowWhite from "../assets/images/Dropdown-arrow-white.svg";
import { useTheme } from "next-themes";
import Image from "next/image";

// ======= TRANSLATIONS ======= //
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function ResponsiveLanguangeButton() {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const dropwDown = useRef<HTMLUListElement>(null);
  const arrow = useRef<HTMLButtonElement>(null);

  const [dropwDownOpen, setDropDownOpen] = useState(false);

  const { pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  useEffect(() => {
    const handler = (e: TouchEvent) => {
      if (dropwDown) {
        if (
          dropwDown.current &&
          !dropwDown.current.contains(e.target as Node) &&
          arrow.current &&
          !arrow.current.contains(e.target as Node)
        ) {
          setDropDownOpen(false);
        }
      }
    };

    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <div className="absolute flex flex-col top-[30%] md:top-[38%] right-0 z-1000">
      <div className={`flex flex-row items-center gap-x-2 text-lg`}>
        <button
          data-value="el"
          className={`${
            locale === "el" ? "flex" : "hidden"
          }  justify-center text-dark dark:text-white `}
        >
          GR
        </button>
        <button
          data-value="en"
          className={`${
            locale === "en" ? "flex " : "hidden"
          } justify-center text-dark dark:text-white`}
        >
          ENG
        </button>
        <button ref={arrow} onClick={() => setDropDownOpen(!dropwDownOpen)}>
          <Image
            src={theme === "light" ? dropdownArrowBlack : dropdownArrowWhite}
            className="w-3"
            alt=""
          />
        </button>
      </div>
      <ul
        ref={dropwDown}
        className={`${
          dropwDownOpen ? "openDropdown" : "closeDropdown"
        } flex justify-start ml-0 py-[0.1rem] border-t border-black dark:border-white transition-all ease-linear duration-700`}
      >
        <li
          className={`${
            locale === "el" ? "hidden" : "flex justify-center items-center"
          }`}
          onClick={() => changeLanguage("el")}
        >
          GR
        </li>
        <li
          className={`${
            locale === "en" ? "hidden" : "flex justify-center items-center"
          }`}
          onClick={() => changeLanguage("en")}
        >
          ENG
        </li>
      </ul>
    </div>
  );
}
