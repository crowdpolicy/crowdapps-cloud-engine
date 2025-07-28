import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import buttonArrow from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import animForDark from "../../assets/animations/UNDER_CONSTR_FOR_DARK.json";
import animForLight from "../../assets/animations/UNDER_CONSTR_FOR_LIGHT.json";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/UnderConstruction/translations.json";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

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

  const customStyleDesktop = {
    height: "80vh",
  };

  const customStyleTablet = {
    height: "60vh",
  };

  const customStyleMobile = {
    height: "40vh",
  };

  return (
    <header className="h-[125dvh] lg:h-screen w-full flex flex-col justify-between lg:flex-row lg:justify-center items-center dark:text-white text-dark">
      <div className="flex flex-col lg:flex-row justify-center text-left lg:w-1/2 ml-0  lg:ml-24 lg:pt-0 h-[90vh] lg:h-full order-2 lg:order-1">
        {/* <div className="mx-3 my-3 lg:w-1/3 lg:block hidden"> */}
        <div className="mx-3 my-3 lg:block hidden absolute left-28">
          <Link href={`/`}>
            <Image
              src={theme === "light" ? crowdappsForLight : crowdappsForDark}
              className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
              alt="CrowdApps Logo"
            />
          </Link>
        </div>
        <div className="flex flex-col lg:w-2/3 justify-center xl:ml-[7rem]">
          <div className="w-full items-center">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl ">
              {translations[locale as keyof typeof translations]["title"]}
            </h1>
            <p className="mt-5 text-lg md:text-xl">
              {translations[locale as keyof typeof translations]["subTitle"]}
            </p>
          </div>
          <button className="btn w-fit mt-16 mb-12 headerButton">
            <Link href="/#" className="buttonLink flex justify-between">
              {translations[locale as keyof typeof translations]["button"]}{" "}
              <Image src={buttonArrow} className="pl-5 xl:w-14" alt="" />
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-[20vh] mb-[10vh] lg:mb-0 lg:mt-0 lg:mx-32 lg:w-1/2 w-2/3 justify-center z-10 order-1 lg:order-2">
        {windowWidth && windowWidth < 768 ? (
          <Lottie
            loop={true}
            animationData={theme === "light" ? animForLight : animForDark}
            style={customStyleMobile}
          />
        ) : windowWidth && windowWidth < 1024 ? (
          <Lottie
            loop={true}
            animationData={theme === "light" ? animForLight : animForDark}
            style={customStyleTablet}
          />
        ) : (
          <Lottie
            loop={true}
            animationData={theme === "light" ? animForLight : animForDark}
            style={customStyleDesktop}
          />
        )}
      </div>
    </header>
  );
}
