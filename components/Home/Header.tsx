// import headerStyle from "../../styles/Header.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import crowdWheelDark from "@/assets/animations/CROWD_WHEEL_FOR_DARK.json";
import crowdWheelLight from "@/assets/animations/CROWD_WHEEL_FOR_LIGHT.json";
import respCrowdWheelForDark from "@/assets/animations/RESP_CROWD_WHEEL_WHITE.json";
import respCrowdWheelForLight from "@/assets/animations/RESP_CROWD_WHEEL_BLACK.json";
import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import respRibbon from "../../assets/images/RIBBON.svg";
import buttonArrow from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";
import { typeOfHeader } from "../../helpers/types/home";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/Header/translations.json";
import { useRouter } from "next/router";

export default function Header(props: typeOfHeader) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

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

  const scrolltoHash = function () {
    const element = document.getElementById("meetCityOn");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="h-[100svh] md:max-lg:h-[120vh] lg:h-screen w-full flex flex-col justify-between lg:flex-row lg:justify-center items-center dark:text-white text-dark">
      <div className="flex flex-col lg:flex-row justify-center text-left lg:w-1/2 ml-0 pt-[20vh] lg:pt-0 h-[90vh] lg:h-full relative">
        <div className="mx-3 my-3 lg:block hidden absolute left-28">
          <Link href={`/`}>
            <Image
              src={theme === "light" ? crowdappsForLight : crowdappsForDark}
              className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
              alt="CrowdApps Logo"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center px-8 xl:pl-0 lg:ml-[13rem] xl:ml-[21rem]">
          <div className="w-full items-center">
            <div
              className="font-bold text-2xl md:text-4xl"
              dangerouslySetInnerHTML={{
                __html: props.text.title?.rendered,
              }}
            ></div>
            <div
              className="mt-5 text-md md:text-xl"
              dangerouslySetInnerHTML={{
                __html: props.text.excerpt?.rendered,
              }}
            ></div>
          </div>
          <button
            className="btn w-fit headerButton my-16"
            onClick={scrolltoHash}
          >
            <button className="flex justify-between items-center font-medium buttonLink ">
              {translations[locale as keyof typeof translations]["button"]}
              <div className="pl-5 flex items-center">
                <Image src={buttonArrow} alt="Arrow icon" />
              </div>
            </button>
          </button>
          <div className="gap-5 hidden xl:flex">
            {props.awards.map(
              (award) => {
                const awardsContent = award.content?.rendered;

                const imgSrcRegex = /<img.*?src="(.*?)"/g;

                const matches = awardsContent.matchAll(imgSrcRegex);
                const imagesArray: string[] = [];

                for (const match of matches) {
                  imagesArray.push(match[1]);
                }

                return (
                  <div key={award.id} className="flex flex-col items-center">
                    <div className="relative w-16 h-14">
                      <Image fill src={imagesArray[0]} className="" alt="" />
                    </div>
                    <div
                      className="w-20 pt-2 text-sm text-center"
                      dangerouslySetInnerHTML={{
                        __html: award.title?.rendered,
                      }}
                    ></div>
                  </div>
                );
              }
              // }
            )}
          </div>
        </div>
      </div>

      <div className="lg:mr-5 lg:p-4 lg:w-1/2 w-full justify-center z-10">
        {windowWidth && windowWidth < 1024 ? (
          theme === "dark" ? (
            <Player autoplay={true} loop={true} src={respCrowdWheelForDark} />
          ) : (
            <Player autoplay={true} loop={true} src={respCrowdWheelForLight} />
          )
        ) : theme === "dark" ? (
          <Player autoplay={true} loop={true} src={crowdWheelDark} />
        ) : (
          <Player autoplay={true} loop={true} src={crowdWheelLight} />
        )}
        {windowWidth && windowWidth < 1024 ? (
          <Image
            width={60}
            height={60}
            src={respRibbon}
            className="w-full "
            alt="Ribbon"
          />
        ) : null}
      </div>
    </header>
  );
}
