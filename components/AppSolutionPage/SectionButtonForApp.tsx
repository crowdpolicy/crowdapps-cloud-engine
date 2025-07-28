import buttonArrowW from "../..//assets/images/BUTTON_ARROW_WHITE.svg";
import buttonArrowB from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import { useEffect, useState } from "react";
import { typePropsSectionButtonForApp } from "../../helpers/types/home";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function SectionButtonForApp(
  props: typePropsSectionButtonForApp
) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [icon, setIcon] = useState(
    theme === "light" ? buttonArrowB : buttonArrowW
  );

  useEffect(() => {
    setIcon(buttonArrowW);
  }, [theme]);

  // ======= DEVICE WIDTH ======= //
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
    <>
      <div className="buttonAnimationApp flex items-center justify-center h-fit w-fit md:w-auto">
        <Link
          href={props.url}
          style={{ background: `${props.color}` }}
          className={`buttonLink items-center px-4 py-2.5 font-semibold flex justify-between rounded-full text-base md:text-xl text-white active:text-white md:active:text-dark md:hover:text-white]
        active:bg-black md:hover:text-black dark:text-white active:dark:text-black md:dark:hover:text-black active:dark:bg-white md:dark:hover:bg-white  md:transition-all md:duration-500`}
          onMouseOver={() => {
            windowWidth && windowWidth >= 768 && setIcon(buttonArrowB);
          }}
          onMouseLeave={() => {
            windowWidth && windowWidth >= 768 && setIcon(buttonArrowW);
          }}
          onClick={() => {
            windowWidth && windowWidth < 768 && theme === "light"
              ? setIcon(buttonArrowW)
              : setIcon(buttonArrowB);
          }}
          target="_blank"
        >
          {props.text}
          <Image src={icon} className="pl-5 w-14" alt="" />
        </Link>
      </div>
    </>
  );
}
