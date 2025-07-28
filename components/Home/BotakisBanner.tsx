import chatForDark from "@/assets/images/BotakisBanner/BotakisChatForDark.png";
import chatForLight from "@/assets/images/BotakisBanner/BOTAKIS_PHONE@2x.png";
import respChatForLight from "@/assets/images/BotakisBanner/Resp/BOTAKIS_PHONE_RESPONSIVE_FOR_LIGHT.png";
import respChatForDark from "@/assets/images/BotakisBanner/Resp/BOTAKIS_PHONE_RESPONSIVE_FOR_DARK.png";
import botakisLogo from "@/assets/images/BotakisBanner/BOTAKIS_LOGO.svg";
import buttonArrow from "@/assets/images/BUTTON_ARROW_BLACK.svg";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/BotakisBanner/translations.json";
import { useRouter } from "next/router";

export default function Botakis() {
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
    <section className="md:max-w-screen relative flex flex-col md:flex-row justify-center xl:justify-start items-center my-10 lg:my-0 py-20">
      <div
        id="botakis"
        className={`${
          windowWidth && windowWidth < 1024
            ? theme === "dark"
              ? "respBotakisForDark"
              : "respBotakisForLight"
            : theme === "dark"
            ? "botakisForDark"
            : "botakisForLight"
        } w-[90vw] xl:w-4/6 md:w-[75vw] lg:w-[85vw] md:h-[145vh] h-[127vh] lg:h-[40vh] flex flex-col md:items-center lg:flex-row rounded-3xl justify-around z-100 xl:ml-[21rem]`}
      >
        <div className="flex flex-col md:items-center lg:items-start h-[48%] lg:h-auto xl:h-full justify-evenly xl:justify-center">
          <Image
            src={botakisLogo}
            className="px-8 pt-8 md:w-[50vw] lg:w-[25vw] xl:w-[14vw] xl:pt-4"
            alt="Botakis Logo"
          />
          <div className="flex flex-col justify-center items-center md:gap-y-10 lg:items-start lg:justify-evenly text-left lg:pl-[5vw] lg:mt-5">
            <h5 className="w-fit pl-10 pr-5 lg:pr-0 lg:pl-0 text-[2rem] md:text-[3rem] lg:text-[1.8rem] text-black font-bold">
              {translations[locale as keyof typeof translations]["title"]}
            </h5>
            <button className="btn w-fit md:w-[35vw] md:h-[4.5vh+] lg:w-auto lg:h-auto bg-light botakisButton mt-5">
              <a
                href="https://ai.botakis.com/en"
                className="buttonLink flex justify-between"
                target="_blank"
              >
                <span>
                  {
                    translations[locale as keyof typeof translations][
                      "buttonLightPart"
                    ]
                  }
                  <span className="font-bold">
                    {
                      translations[locale as keyof typeof translations][
                        "buttonBoldPart"
                      ]
                    }
                  </span>
                </span>
                <Image src={buttonArrow} className="pl-5 w-14" alt="" />
              </a>
            </button>
          </div>
        </div>
        <div className="h-[52%] lg:h-full lg:w-[32vw] 2xl:w-[34vw] relative">
          {windowWidth && windowWidth < 1024 ? (
            <div className="md:w-[50vw] md:h-[70vh] lg:w-[20vw] lg:h-[20vh] ">
              <Image
                src={theme === "light" ? respChatForLight : respChatForDark}
                className="chat"
                alt="Chat image"
              />
            </div>
          ) : (
            <div className="md:w-[80vw] md:h-[80vh] lg:w-[40vw] lg:h-[40vh] xl:w-[20vw] xl:h-[50vh]">
              <Image
                src={theme === "light" ? chatForLight : chatForDark}
                className="chat"
                alt="Chat image"
              />
            </div>
          )}
        </div>
      </div>
      {windowWidth && windowWidth >= 1024 && (
        <>
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[50%]" />
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[55%]" />
        </>
      )}
    </section>
  );
}
