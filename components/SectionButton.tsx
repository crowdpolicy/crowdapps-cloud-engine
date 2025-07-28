import buttonArrowW from "../assets/images/BUTTON_ARROW_WHITE.svg";
import buttonArrowB from "../assets/images/BUTTON_ARROW_BLACK.svg";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { typePropsSectionButton } from "../helpers/types/home";
import Link from "next/link";
import Image from "next/image";

export default function SectionButton(props: typePropsSectionButton) {
  const { theme } = useTheme();

  const [icon, setIcon] = useState(
    theme === "light" ? buttonArrowB : buttonArrowW
  );

  useEffect(() => {
    setIcon(theme === "light" ? buttonArrowB : buttonArrowW);
  }, [theme]);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="buttonAnimation flex items-center justify-center h-fit w-fit md:w-auto">
      <Link
        target={props.newTab ? "_blank" : ""}
        href={props.url}
        className="btn-white flex justify-between buttonLink border rounded-full text-base md:text-xl text-dark border-black active:text-white md:active:text-dark md:hover:text-white bg-white active:bg-black md:hover:bg-black  dark:text-white dark:border-white dark:bg-dark active:dark:text-black md:dark:hover:text-black active:dark:bg-white md:dark:hover:bg-white  md:transition-all md:duration-700 "
        onMouseOver={() => {
          windowWidth && windowWidth >= 768
            ? theme === "light"
              ? setIcon(buttonArrowW)
              : setIcon(buttonArrowB)
            : null;
        }}
        onMouseLeave={() => {
          windowWidth && windowWidth >= 768
            ? theme === "light"
              ? setIcon(buttonArrowB)
              : setIcon(buttonArrowW)
            : null;
        }}
        onClick={() => {
          windowWidth && windowWidth < 768
            ? theme === "light"
              ? setIcon(buttonArrowW)
              : setIcon(buttonArrowB)
            : null;
        }}
      >
        {props.text}
        <Image src={icon} className="pl-5 flex items-center w-14" alt="" />
      </Link>
    </div>
  );
}
