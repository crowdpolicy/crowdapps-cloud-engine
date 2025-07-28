import cpLogo from "@/assets/images/Contact/CONT_CP_LOGO.svg";
import medium from "@/assets/images/Contact/CONT_MEDIUM.svg";
import facebook from "@/assets/images/Contact/CONT_FB.svg";
import twitter from "@/assets/images/Contact/CONT_TWT.svg";
import instagram from "@/assets/images/Contact/CONT_INST.svg";
import youtube from "@/assets/images/Contact/CONT_YT.svg";
import linkedin from "@/assets/images/Contact/CONT_LINKEDIN.svg";
import tiktok from "@/assets/images/Contact/CONT_TIKTOK.svg";
import crowd360 from "@/assets/images/Contact/CROWD360_LOGO.svg";
import email from "@/assets/images/Contact/contact-mail.svg";
import phone from "@/assets/images/Contact/contact-phone.svg";
import location from "@/assets/images/Contact/contact-location.svg";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ======= TRANSLATIONS ======= //

import translations from "../locales/Contact/translations.json";
import { useRouter } from "next/router";

export default function Contact() {
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
    <section id="support" className="relative ">
      <div className=" flex flex-col justify-center xl:justify-start items-center lg:flex-row md:h-fit min-h-[60vh] lg:max-2xl:pl-[10vw] lg:max-2xl:max-w-[100vw] text-black dark:text-white 2xl:pl-[17.5vw] 2xl:max-w-[82,5vw] xl:gap-20">
        <h4 className="font-bold text-[2rem] md:text-[2.2rem] self-center xl:ml-0 md:mx-0 xl:mt-20 text-start lg:w-[20rem] mx-[5vw]">
          {translations[locale as keyof typeof translations]["newsletter"]}
        </h4>
        <div className="z-100 relative h-screen w-srceen self-start md:h-[40vh] lg:w-[50vw] 2xl:w-[55vw]">
          <div
            id="contact"
            className={`${
              windowWidth && windowWidth < 768
                ? theme === "light"
                  ? "respBgForLight"
                  : "respBgForDark"
                : theme === "light"
                ? "bgForLight"
                : "bgForDark"
            } absolute w-[90vw] md:w-[90vw] lg:w-[50vw] 2xl:w-[55vw] lg:max-w-[55vw] min-h-[45vh] h-screen md:h-[45vh] left-[5vw]  lg:left-auto top-[7.15vh] md:top-[6.5vh] lg:top-[19.5vh] xl:top-[19.6vh] py-8 md:py-14 px-6 md:px-16 flex flex-col md:flex-row gap-x-20 xl:gap-x-5 justify-evenly xl:justify-center bg-dark rounded-[2.5rem] md:rounded-[4.5rem] lg:rounded-[3.5rem] text-black items-center text-left`}
          >
            <div className="flex flex-col relative justify-center gap-y-14 xl:h-full xl:w-[40%]">
              <ul className="flex flex-col gap-y-4 xl:text-xl m-0">
                <li className="flex flex-row gap-x-3 items-center ">
                  <Image src={email} alt="" />
                  <a href="">hello@crowdpolicy.com</a>
                </li>
                <li className="flex flex-row gap-x-3 items-center ">
                  <Image src={phone} alt="" />
                  <a href="">(+30) 216 900 2600</a>
                </li>
                <li className="flex flex-row gap-x-3 items-center ">
                  <Image src={location} alt="" />
                  <a href="">
                    {
                      translations[locale as keyof typeof translations][
                        "address"
                      ]
                    }
                  </a>
                </li>
              </ul>
              <div
                id="social"
                className="flex flex-row flex-wrap gap-x-2 md:gap-x-4 md:gap-y-2"
              >
                <a href="https://crowdpolicy.com" target="_blank">
                  <Image src={cpLogo} alt="Crowdpolicy logo" />
                </a>
                <a
                  href="https://medium.com/the-crowdpolicy-collection-en"
                  target="_blank"
                >
                  <Image src={medium} alt="Crowdpolicy medium" />
                </a>
                <a href="https://www.facebook.com/CrowdPolicy/" target="_blank">
                  <Image src={facebook} alt="Crowdpolicy facebook" />
                </a>
                <a href="https://twitter.com/Crowdpolicy" target="_blank">
                  <Image src={twitter} alt="Crowdpolicy twitter" />
                </a>
                <a
                  href="https://www.instagram.com/crowdpolicy/"
                  target="_blank"
                >
                  <Image src={instagram} alt="Crowdpolicy instagram" />
                </a>
                <a
                  href="https://www.youtube.com/user/crowdpolicy"
                  target="_blank"
                >
                  <Image src={youtube} alt="Crowdpolicy youtube" />
                </a>
                <a
                  href="https://www.linkedin.com/company/crowdpolicy/"
                  target="_blank"
                >
                  <Image src={linkedin} alt="Crowdpolicy linkedin" />
                </a>
                <a href="https://www.tiktok.com/@crowdpolicy" target="_blank">
                  <Image src={tiktok} alt="Crowdpolicy titok" />
                </a>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-y-10 md:gap-y-7 xl:gap-y-0  justify-evenly items-center md:items-start xl:items-center h-fit xl:w-[55%] ml-[5%]">
              <div className="flex flex-col justify-center xl:justify-between xl:h-32">
                <div className="flex flex-row flex-wrap items-end gap-x-3 w-full">
                  <Image src={crowd360} className="pb-[0.7vh]" alt="" />
                  <p className="text-base lg:max-xl:text-sm font-semibold">
                    {
                      translations[locale as keyof typeof translations][
                        "support360"
                      ]
                    }
                  </p>
                </div>
                <button className="orangeButton rounded-full text-base lg:max-xl:text-sm w-36 py-2 mt-3">
                  <Link
                    href="https://360.crowdpolicy.com/"
                    className="text-white"
                    target="_blank"
                  >
                    {
                      translations[locale as keyof typeof translations][
                        "buttonSupport"
                      ]
                    }
                  </Link>
                </button>
              </div>
              <div className="flex flex-col md:w-[70%] justify-center xl:justify-between xl:h-32">
                <p className="text-base lg:max-xl:text-sm font-semibold">
                  {
                    translations[locale as keyof typeof translations][
                      "aboutProducts"
                    ]
                  }
                </p>
                <button className="blueButton rounded-full text-base lg:max-xl:text-sm w-36 p-2 mt-3">
                  <Link
                    href="https://360.crowdpolicy.com/"
                    className="text-white"
                    target="_blank"
                  >
                    {
                      translations[locale as keyof typeof translations][
                        "buttonAbout"
                      ]
                    }
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {windowWidth && windowWidth >= 1024 && (
        <>
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[70%] z-10" />
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[75%] z-10" />
        </>
      )}
    </section>
  );
}
