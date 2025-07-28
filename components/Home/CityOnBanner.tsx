import phones from "../../assets/images/CityOnBanner/Phones@2x.png";
import cityOnLogo from "../../assets/images/CityOnBanner/CityOnLogo.svg";
import google from "../../assets/images/CityOnBanner/Google_Play_Store@2x.png";
import apple from "../../assets/images/CityOnBanner/App_Store@2x.png";
import pass from "../../assets/images/CityOnBanner/CityOnPass@2x.png";

import cityPassPhone from "../../assets/images/CityOnBanner/Resp/CITY_ON_PASS@2x.png";
import cityPass from "../../assets/images/CityOnBanner/Resp/CITY_ON_PASS_LOGO.svg";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
// ======= TRANSLATIONS ======= //
import translations from "../../locales/CityOnBanner/translations.json";
import { useRouter } from "next/router";

export default function CityOn() {
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

  return (
    <section className="md:max-w-screen relative flex justify-center xl:justify-start py-20 mx-[5vw] md:mx-0 lg:mx-0">
      <div
        id="cityOn"
        className={`${
          windowWidth && windowWidth < 1024
            ? theme === "light"
              ? "respCityOnForLight"
              : "respCityOnForDark"
            : theme === "light"
            ? "cityOnForLight"
            : "cityOnForDark"
        } lg:w-4/6 md:w-[75vw] md:h-[193vh] lg:h-fit flex flex-col lg:flex-row rounded-3xl justify-evenly md:justify-around lg:justify-evenly z-100 items-center relative px-5 py-20 md:py-10 xl:py-0 gap-y-14 md:gap-y-0 lg:gap-y-0 xl:ml-[21rem]`}
      >
        <div className="h-fit scale-75 md:scale-75 xl:scale-[1] lg:absolute left-[2vw] order-2">
          <Image
            src={phones}
            className={`${windowWidth && windowWidth >= 1024 && "phones"}`}
            alt="CityOn phones"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:ml-[30%] order-1">
          <Image
            src={cityOnLogo}
            className="w-44 md:w-60 2xl:w-40"
            alt="CityOn Logo"
          />
          <h5 className="mt-4 text-lg font-bold">
            {translations[locale as keyof typeof translations]["title"]}
          </h5>
          <p className="mb-4">
            {translations[locale as keyof typeof translations]["subTittle"]}
          </p>
          <div className="flex justify-center gap-x-2">
            <a href="https://play.google.com/store/apps/details?id=com.crowdpolicy.crowdapps.mobile">
              <Image
                src={google}
                className="w-40 md:w-52 lg:w-40"
                alt="Google Play"
              />
            </a>
            <a href="https://apps.apple.com/gr/app/city-on/id1508110671">
              <Image
                src={apple}
                className="w-40 md:w-52 lg:w-40"
                alt="Apple Store"
              />
            </a>
          </div>
        </div>
        <div className="h-fit w-fit order-3">
          {windowWidth && windowWidth < 1024 ? (
            <div className="flex flex-col justify-center items-center gap-y-10">
              <div>
                <Image
                  src={cityPass}
                  alt="CityOn Pass"
                  className="w-44 md:w-72 lg:w-44"
                />
              </div>
              <div>
                <Image
                  src={cityPassPhone}
                  alt="CityOn Pass phone"
                  className="w-32 md:w-60 lg:w-32"
                />
              </div>
            </div>
          ) : (
            <div>
              <Image src={pass} className="w-40 pass" alt="CityOn Pass phone" />
            </div>
          )}
        </div>
      </div>
      {windowWidth && windowWidth >= 1024 ? (
        <>
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[50%]" />
          <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full top-[55%]" />
        </>
      ) : null}
    </section>
  );
}
