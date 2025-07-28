import bannertop from "../../../assets/images/People/banner_top.svg";
import bannerbottom from "../../../assets/images/People/banner_bottom.svg";
import bannertopResp from "../../../assets/images/People/banner_top_resp.svg";
import bannerbottomResp from "../../../assets/images/People/banner_bottom_resp.svg";
import buttonArrowB from "../../../assets/images/BUTTON_ARROW_BLACK.svg";
import buttonArrowW from "../../../assets/images/BUTTON_ARROW_WHITE.svg";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/People/translations.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { typeOfPeople } from "../../../helpers/types/home";
import PersonCard from "./PersonCard";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SectionButton from "@/components/SectionButton";

export default function People(props: typeOfPeople) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [icon, setIcon] = useState(
    theme === "light" ? buttonArrowB : buttonArrowW
  );

  useEffect(() => {
    setIcon(theme === "light" ? buttonArrowB : buttonArrowW);
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
    <section className="">
      {windowWidth && windowWidth < 1024 ? (
        <Image src={bannertopResp} className="sm:max-lg:w-[100vw]" alt="" />
      ) : (
        <Image src={bannertop} className="w-[-webkit-fill-available]" alt="" />
      )}
      <div className="flex flex-col lg:flex-row justify-center xl:justify-start items-center gap-y-20 lg:gap-y-0 lg:gap-x-10 py-16 xl:mx-[21rem]">
        <div className="flex flex-col items-center lg:items-start gap-y-14 lg:w-[25%]">
          <h3 className="text-xl md:text-2xl md:w-[80%] lg:w-auto lg:text-[1.5rem] font-[600] text-left pl-5 pr-4 lg:px-0">
            {translations[locale as keyof typeof translations]["text"]}
          </h3>
          <div className="buttonAnimation buttonDiv flex items-center justify-center h-fit w-52 md:w-auto">
            <Link
              target="_blank"
              href="https://medium.com/the-crowdpolicy-collection/crowdpolicy-fotunr-greece-july-2023-145ddc9ef58e"
              className="!py-2 btn-white flex justify-between buttonLink border rounded-full text-base md:text-base text-dark border-black active:text-white md:active:text-dark md:hover:text-white bg-white active:bg-black md:hover:bg-black  dark:text-white dark:border-white dark:bg-dark active:dark:text-black md:dark:hover:text-black active:dark:bg-white md:dark:hover:bg-white  md:transition-all md:duration-700 "
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
              Medium
              <Image
                src={icon}
                className="pl-5 lg:w-12 flex items-center w-14"
                alt=""
              />
            </Link>
          </div>
          {/* </div> */}
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-x-8 xl:gap-x-12 gap-y-10 lg:max-w-[50%] xl:max-w-[76.5%] xl:min-w-[74.5%] px-3 lg:px-0">
          {props.people?.map((person, index) => {
            return (
              <PersonCard
                key={index}
                profile={person.acf.profile}
                fullName={person.title.rendered}
                description={person.acf.description}
              />
            );
          })}
        </div>
      </div>
      {windowWidth && windowWidth < 1024 ? (
        <Image src={bannerbottomResp} className="sm:max-lg:w-[100vw]" alt="" />
      ) : (
        <Image
          src={bannerbottom}
          className="w-[-webkit-fill-available]"
          alt=""
        />
      )}
    </section>
  );
}
