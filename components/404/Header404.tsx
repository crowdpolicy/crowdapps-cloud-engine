import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import buttonArrow from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import animForDark from "../../assets/animations/404_FOR_DARK.json";
import animForLight from "../../assets/animations/404_FOR_LIGHT.json";
import Link from "next/link";
import Image from "next/image";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/404/translations.json";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function Header404() {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

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
    <header className="h-[100dvh] lg:h-screen w-full flex flex-col justify-between lg:flex-row lg:justify-center items-center dark:text-white text-dark">
      <div className="flex flex-col lg:flex-row justify-center text-left lg:w-1/2 ml-0  lg:ml-24 lg:pt-0 h-[90vh] lg:h-full order-2 lg:order-1">
        <div className="mx-3 my-3 lg:block hidden absolute left-28">
          <Link href={`/`}>
            <Image
              src={theme === "light" ? crowdappsForLight : crowdappsForDark}
              className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
              alt="CrowdApps Logo"
            />
          </Link>
        </div>
        <div className="flex flex-col mx-[5vw] lg:mx-0 lg:w-2/3 justify-center lg:ml-[8rem]">
          <div className="w-full items-center">
            <h1 className="font-bold text-2xl lg:text-4xl ">
              {translations[locale as keyof typeof translations]["title"]}
            </h1>
            <p className="mt-5 text-lg lg:text-xl">
              {translations[locale as keyof typeof translations]["subTitle"]}
            </p>
          </div>
          <button className="btn w-fit mt-16 mb-12 headerButton">
            <Link href="/#" className="buttonLink flex justify-between">
              {translations[locale as keyof typeof translations]["button"]}{" "}
              <Image src={buttonArrow} className="pl-5 w-14" alt="" />
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-[20vh] lg:mt-0 lg:mx-32 lg:w-1/2 w-2/3 justify-center z-10 order-1 lg:order-2">
        {windowWidth && windowWidth < 1024 ? (
          theme === "dark" ? (
            <Lottie loop={true} animationData={animForDark} />
          ) : (
            <Lottie loop={true} animationData={animForLight} />
          )
        ) : theme === "dark" ? (
          <Lottie loop={true} animationData={animForDark} />
        ) : (
          <Lottie loop={true} animationData={animForLight} />
        )}
      </div>
    </header>
  );
}
