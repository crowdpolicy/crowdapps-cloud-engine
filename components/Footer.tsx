import footerStyles from "../styles/Footer.module.css";
import crowdAppsLogoB from "../assets/images/Footer/CROWDAPPS_LOGO_BLACK.svg";
import cpFooterForDark from "../assets/images/Footer/CP_FOOTER_FOR_DARK.svg";
import cpFooterForLight from "../assets/images/Footer/CP_FOOTER_FOR_LIGHT.svg";

import { useTheme } from "next-themes";

// ======= TRANSLATIONS ======= //
import translations from "../locales/Footer/translations.json";
import {
  // typeOfespaRes,
  typeOfFooter,
  typeOfEspaResponse,
} from "../helpers/types/home";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer(props: typeOfFooter) {
  const router = useRouter();
  const { locale } = router;

  const { theme } = useTheme();

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
    <footer className="flex flex-col !w-full">
      <div className="flex flex-col gap-x-5 md:gap-x-[6vw] bg-[#F7F7F8] dark:bg-white text-black justify-center py-20 pt-10 md:py-0 px-4 md:px-[8vw] lg:px-0 md:flex-wrap md:gap-y-12">
        <div className="flex flex-row gap-x-10 md:gap-x-[6vw] text-left bg-[#F7F7F8] dark:bg-white text-black justify-center md:justify-start lg:justify-center py-20 pt-28 md:py-40 px-4 md:px-[8vw] lg:px-[5vw] md:flex-wrap md:gap-y-12">
          <div>
            <Image src={crowdAppsLogoB} className="mb-10" alt="" />
            <h5 className="font-bold text-xl md:text-3xl mb-3">Crowdapps</h5>
            <ul className="flex flex-col gap-y-3 m-0">
              <li>
                <Link href={`/apps`} className="block h-fit">
                  {
                    translations[locale as keyof typeof translations][
                      "crowdapps"
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link href="/apps" className="block h-fit">
                  {translations[locale as keyof typeof translations]["appServ"]}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-[6vw] gap-y-10">
            {props.sectors.length > 0 && (
              <>
                <div>
                  <h5 className="font-bold text-xl md:text-3xl mb-3">
                    {
                      translations[locale as keyof typeof translations][
                        "sectors"
                      ]
                    }
                  </h5>
                  <ul className="flex flex-col gap-y-3 m-0">
                    {props.sectors?.slice(1).map((sector) => {
                      if (
                        sector.slug !== "dimofili" &&
                        sector.slug !== "dimofili-en"
                      ) {
                        return (
                          <li key={sector.id}>
                            <Link href={`/apps`} className="block h-fit">
                              {sector.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </>
            )}

            <div>
              <h5 className="font-bold text-xl md:text-3xl mb-3">
                {translations[locale as keyof typeof translations]["contact"]}
              </h5>
              <ul className="flex flex-col gap-y-3 m-0">
                <li>
                  <a
                    href="https://crowdpolicy.com"
                    className="block h-fit"
                    target="_blank"
                  >
                    Crowdpolicy
                  </a>
                </li>
                <li>
                  <Link href="/apps" className="block h-fit">
                    {
                      translations[locale as keyof typeof translations][
                        "aboutProducts"
                      ]
                    }
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.crowdpolicy.com/el/support-360-gr/"
                    className="block h-fit"
                  >
                    {
                      translations[locale as keyof typeof translations][
                        "support360"
                      ]
                    }
                  </a>
                </li>
              </ul>
              {windowWidth &&
                windowWidth > 1024 &&
                props.espa?.data?.espa?.isEnabled && (
                  <div className="relative w-80 h-20">
                    <Image
                      fill
                      src={props.espa?.data.espa.img}
                      className="w-[22rem] mt-10"
                      alt="espa"
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        {windowWidth &&
          windowWidth <= 1024 &&
          props.espa?.data?.espa?.isEnabled && (
            <div className="relative w-full h-32 lg:w-20 lg:h-20 mb-auto md:mb-10 xl:mb-auto">
              <Image
                fill
                src={props.espa?.data.espa.img}
                className="w-[20rem]"
                alt="espa"
              />
            </div>
          )}
      </div>
      <div className="bg-white dark:bg-dark text-dark dark:text-white flex flex-col justify-center items-center py-8 gap-y-2">
        <Link className="text-dark dark:text-white" href="/privacy-policy">
          <h5 className="text-lg w-fit">
            {translations[locale as keyof typeof translations]["terms"]}
          </h5>
        </Link>
        <div>
          <p className="flex flex-row justify-center items-center  text-center flex-wrap gap-x-3 mx-4 md:mx-0">
            {translations[locale as keyof typeof translations]["designed"]}
            <span className="mt-4 lg:mt-0">
              <Image
                src={theme === "light" ? cpFooterForLight : cpFooterForDark}
                alt=""
              />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
