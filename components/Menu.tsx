import Link from "next/link";
// DARK
import mail from "../assets/images/Menu/mail.svg";
import phone from "../assets/images/Menu/phone.svg";
import pin from "../assets/images/Menu/pin.svg";
import crowdappsForDark from "../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForWhite from "../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";

// LIGHT
import mailForLight from "../assets/images/Menu/Light/contact_mail.svg";
import phoneForLight from "../assets/images/Menu/Light/contact_phone.svg";
import pinForLight from "../assets/images/Menu/Light/contact_location.svg";

import textLesscrowdAppsForDark from "../assets/images/Menu/Dark/crowdAppsLogoForD.svg";
import textLesscrowdAppsForWhite from "../assets/images/Menu/crowdAppsLogoForW.svg";

// SOCIAL
import cpLogo from "../assets/images/Menu/cpLogo.svg";
import medium from "../assets/images/Menu/medium.svg";
import fb from "../assets/images/Menu/fb.svg";
import twt from "../assets/images/Menu/twt.svg";
import instagram from "../assets/images/Menu/instagram.svg";
import yt from "../assets/images/Menu/yt.svg";
import linkedin from "../assets/images/Menu/linkedin.svg";
import tiktok from "../assets/images/Menu/tiktok.svg";

import { useTheme } from "next-themes";
import Theme from "./Theme";
import Image from "next/image";

// ======= TRANSLATIONS ======= //
import translations from "../locales/Menu/translations.json";

import ResponsiveLanguangeButton from "./ResponsiveLanguageButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Menu() {
  const { theme } = useTheme();

  const router = useRouter();
  const { locale } = router;

  const [isNavOpen, setIsNavOpen] = useState(false);

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    });
  }, []);

  function handlemenu() {
    setIsNavOpen(!isNavOpen);

    const menu = document.getElementById("menu");
    const list = document.querySelectorAll("ul li");

    if (menu?.classList.contains("initialClosed")) {
      menu?.classList.remove("initialClosed");
      menu.classList.add("open");
      setShowLogo(true);
      return;
    }

    if (menu?.classList.contains("closed")) {
      menu.classList.remove("closed");
      menu.classList.add("open");
      setShowLogo(true);
    } else if (menu?.classList.contains("open")) {
      menu.classList.remove("open");
      menu.classList.add("closed");
      if (window.scrollY <= 100) {
        setShowLogo(false);
      }

      list.forEach((item) => {
        item.classList.remove(`${item.id}NotHovered`);
      });
    }
  }

  // ======= DISABLE SCROLLLING WHEN MENU IS OPEN ======= //
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  function changeClassHover(
    classHovered: string,
    classNotHovered: string,
    id: string
  ) {
    const item = document.getElementById(id);
    if (item) {
      if (
        !item.classList.contains(classNotHovered) &&
        !item.classList.contains(classHovered)
      ) {
        item.classList.add(classHovered);
      } else if (item.classList.contains(classHovered)) {
        item.classList.remove(classHovered);
        item.classList.add(classNotHovered);
      } else {
        item.classList.remove(classNotHovered);
        item.classList.add(classHovered);
      }
    }
  }

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
    <div
      className={`fixed flex lg:flex-row w-full lg:w-auto flex-col h-auto lg:h-screen z-1000 text-dark dark:text-white`}
    >
      <div
        id="leftBar"
        className={`w-full h-[11vh] lg:h-full lg:w-[5vw] bg-white dark:bg-dark z-100 border-b border-r-0 lg:border-b-0 lg:border-r border-[#110529] dark:border-gray-50 flex flex-row lg:flex-col justify-between items-center`}
      >
        <Link
          href={`/`}
          className={`${
            showLogo
              ? "opacity-100 transition-all ease-in .7s hidden lg:block"
              : "opacity-0 transition-all ease-out .7s hidden lg:block"
          } h-fit mt-10 absolute w-fit`}
        >
          <Image
            src={
              theme === "light"
                ? textLesscrowdAppsForWhite
                : textLesscrowdAppsForDark
            }
            alt="Crowd Apps Logo"
            className="w-[3.5vw]"
          />
        </Link>
        {windowWidth &&
          windowWidth < 1024 &&
          (theme === "light" ? (
            <Link href={`/`}>
              <Image src={crowdappsForWhite} className="w-20 ml-5" alt="" />
            </Link>
          ) : (
            <Link href={`/`}>
              <Image src={crowdappsForDark} className="w-20 ml-5" alt="" />
            </Link>
          ))}
        <div className="relative h-full w-fit flex justify-end lg:justify-center items-center gap-x-4 mr-5 lg:mr-0">
          <div className="lg:hidden relative flex w-14 h-full">
            {windowWidth && windowWidth < 1024 && <ResponsiveLanguangeButton />}
          </div>
          {windowWidth && windowWidth < 1024 && <Theme />}
          <div className="h-fit lg:w-full flex justify-end lg:justify-center">
            <div
              id="menuBtn"
              className={`menuIcon ${isNavOpen ? "closeX" : "burger"} w-10`}
              onClick={handlemenu}
            >
              <span className="bg-dark dark:bg-white"></span>
              <span className="bg-dark dark:bg-white"></span>
              <span className="bg-dark dark:bg-white"></span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="menu"
        className={`flex flex-col justify-between h-[90dvh] lg:h-screen bg-white dark:bg-dark initialClosed lg:pr-[10vw] w-screen lg:w-auto`}
      >
        <div className="flex flex-row justify-center gap-x-[10vw]">
          <div className="lg:flex flex-row w-fit my-5 items-center gap-x-[0.5vw] hidden">
            {theme === "light" ? (
              <Image src={mailForLight} className="" alt="" />
            ) : (
              <Image src={mail} className="" alt="" />
            )}
            <a
              href="mailto:hello@crowdpolicy.com"
              className="dark:text-gray hover:dark:text-white"
            >
              hello@crowdpolicy.com
            </a>
          </div>
          <div className="lg:flex flex-row w-fit my-5 items-center gap-x-[0.5vw] hidden">
            {theme === "light" ? (
              <Image src={phoneForLight} className="" alt="" />
            ) : (
              <Image src={phone} className="" alt="" />
            )}

            <a
              href="tel:216 900 2600"
              className="dark:text-gray hover:dark:text-white"
            >
              (+30) 216 900 2600
            </a>
          </div>
          <div className="lg:flex flex-row w-fit my-5 items-center gap-x-[0.5vw] hidden">
            {theme === "light" ? (
              <Image src={pinForLight} className="" alt="" />
            ) : (
              <Image src={pin} className="" alt="" />
            )}

            <a
              href="https://www.google.com/maps/place/Crowdpolicy/@37.9567896,23.686775,17z/data=!3m1!4b1!4m6!3m5!1s0x14a1bd2369ee8a47:0x1804deedcfea8740!8m2!3d37.9567854!4d23.6893499!16s%2Fg%2F12hslblhm?authuser=0&entry=ttu"
              className="dark:text-gray hover:dark:text-white"
              target="_blank"
            >
              {translations[locale as keyof typeof translations]["address"]}
            </a>
          </div>
        </div>
        <div>
          <ul
            id="list"
            className="flex flex-col items-center text-base  lg:text-4xl font-bold"
          >
            <li
              id="first"
              onMouseEnter={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("firstHovered", "firstNotHovered", "first")
                  : null;
              }}
              onMouseLeave={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("firstHovered", "firstNotHovered", "first")
                  : null;
              }}
              className="flex justify-center items-center leading-tight lg:leading-10 text-[1.7rem] md:text-[2.7rem] lg:text-[3rem] w-full h-fit lg:w-fit px-0 lg:px-28 pt-[2vh] lg:pt-[5vh] pb-[2vh] lg:pb-[4vh]"
            >
              <Link
                href={`/apps`}
                className="text-dark hover:text-dark dark:text-white block h-fit active:font-extrabold"
                onClick={handlemenu}
              >
                {translations[locale as keyof typeof translations]["appServ"]}
              </Link>
            </li>
            {/* <li
              id="secondly"
              onMouseEnter={() => {
                windowWidth >= 1024
                  ? changeClassHover(
                      "secondlyHovered",
                      "secondlyNotHovered",
                      "secondly"
                    )
                  : null;
              }}
              onMouseLeave={() => {
                windowWidth >= 1024
                  ? changeClassHover(
                      "secondlyHovered",
                      "secondlyNotHovered",
                      "secondly"
                    )
                  : null;
              }}
              className="flex justify-center items-center leading-tight lg:leading-10 text-[1.7rem] md:text-[2.7rem] lg:text-[3rem] w-full h-fit lg:w-fit px-0 lg:px-28 pt-[2vh] lg:pt-[5vh] pb-[2vh] lg:pb-[4vh]"
            >
              <Link
                href="/#evolve"
                className="text-dark hover:text-dark dark:text-white block h-fit active:font-extrabold"
                onClick={handlemenu}
              >
                Τομείς
              </Link>
            </li> */}
            <li
              id="third"
              onMouseEnter={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("thirdHovered", "thirdNotHovered", "third")
                  : null;
              }}
              onMouseLeave={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("thirdHovered", "thirdNotHovered", "third")
                  : null;
              }}
              className="flex justify-center items-center leading-tight lg:leading-10 text-[1.7rem] md:text-[2.7rem] lg:text-[3rem] w-full h-fit lg:w-fit px-0 lg:px-28 pt-[2vh] lg:pt-[5vh] pb-[2vh] lg:pb-[4vh]"
            >
              <Link
                href={`/partners`}
                className="text-dark hover:text-dark dark:text-white block h-fit active:font-extrabold"
                onClick={handlemenu}
              >
                {
                  translations[locale as keyof typeof translations][
                    "municipalities"
                  ]
                }
              </Link>
            </li>
            <li
              id="quarter"
              onMouseEnter={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover(
                      "quarterHovered",
                      "quarterNotHovered",
                      "quarter"
                    )
                  : null;
              }}
              onMouseLeave={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover(
                      "quarterHovered",
                      "quarterNotHovered",
                      "quarter"
                    )
                  : null;
              }}
              className="flex justify-center items-center leading-tight lg:leading-10 text-[1.7rem] md:text-[2.7rem] lg:text-[3rem] w-full h-fit lg:w-fit px-0 lg:px-28 pt-[2vh] lg:pt-[5vh] pb-[2vh] lg:pb-[4vh]"
            >
              <Link
                href="#evolve"
                className="text-dark hover:text-dark dark:text-white block h-fit active:font-extrabold"
                onClick={handlemenu}
              >
                {translations[locale as keyof typeof translations]["evolves"]}
              </Link>
            </li>
            <li
              id="fifth"
              onMouseEnter={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("fifthHovered", "fifthNotHovered", "fifth")
                  : null;
              }}
              onMouseLeave={() => {
                windowWidth && windowWidth >= 1024
                  ? changeClassHover("fifthHovered", "fifthNotHovered", "fifth")
                  : null;
              }}
              className="flex justify-center items-center leading-tight lg:leading-10 text-[1.7rem] md:text-[2.7rem] lg:text-[3rem] w-full h-fit lg:w-fit px-0 lg:px-28 pt-[2vh] lg:pt-[5vh] pb-[2vh] lg:pb-[4vh]"
            >
              <Link
                href="#support"
                className="text-dark hover:text-dark dark:text-white block h-fit active:font-extrabold"
                onClick={handlemenu}
              >
                {translations[locale as keyof typeof translations]["support"]}
              </Link>
            </li>
          </ul>
        </div>
        <div
          id="social"
          className="flex flex-row justify-center my-[5vh] gap-[5vw] md:gap-[7vw] lg:gap-[9vw]"
        >
          <a href="https://crowdpolicy.com" target="_blank">
            <Image src={cpLogo} alt="" />
          </a>
          <a
            href="https://medium.com/the-crowdpolicy-collection-en"
            target="_blank"
          >
            <Image src={medium} alt="" />
          </a>
          <a href="https://www.facebook.com/CrowdPolicy/" target="_blank">
            <Image src={fb} alt="" />
          </a>
          <a href="https://twitter.com/Crowdpolicy" target="_blank">
            <Image src={twt} alt="" />
          </a>
          <a href="https://www.instagram.com/crowdpolicy/" target="_blank">
            <Image src={instagram} alt="" />
          </a>
          <a href="https://www.youtube.com/user/crowdpolicy" target="_blank">
            <Image src={yt} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/company/crowdpolicy/"
            target="_blank"
          >
            <Image src={linkedin} alt="" />
          </a>
          <a href="https://www.tiktok.com/@crowdpolicy" target="_blank">
            <Image src={tiktok} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
