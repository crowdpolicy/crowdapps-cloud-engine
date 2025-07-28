import arrowW from "../../../assets/images/BUTTON_ARROW_WHITE.svg";
import arrowD from "../../../assets/images/BUTTON_ARROW_BLACK.svg";
import { useTheme } from "next-themes";

import { typePropsAppSolutionCard } from "../../../helpers/types/home";
import Link from "next/link";
import Image from "next/image";
// ======= TRANSLATIONS ======= //
import translations from "../../../locales/AppsSolutions/translations.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AppSolutionsCard(props: typePropsAppSolutionCard) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-fit h-fit">
      <Link
        href={`/app/${props?.slug}`}
        className="flex flex-row gap-x-2"
        // onClick={() => {
        //   window.scroll({ top: 0, left: 0, behavior: "smooth" });
        // }}
      >
        <div
          id={props?.id}
          style={{
            background: `linear-gradient(to right, ${
              theme === "light" ? props?.color + "80" : props?.color + "50"
            }, ${
              theme === "light" ? props?.color + "80" : props?.color + "50"
            })`,
            backgroundRepeat: "no-repeat",
            transition: "all 0.4s ease-in-out",
          }}
          className="appCard flex flex-col h-60 w-64 p-5 rounded-3xl border dark:border-white border-[#110529] justify-between relative gap-y-3"
        >
          <div className="app flex flex-row justify-between h-1/3">
            <div className="relative w-16">
              <Image
                fill
                src={theme === "light" ? props?.darkLogo : props?.lightLogo}
                alt="App icon"
              />
            </div>
            <div className="more flex flex-row items-center h-fit gap-x-3">
              <Link
                href={`/app/${props?.slug}`}
                className="flex flex-row gap-x-2"
                // onClick={() => {
                //   window.scroll({ top: 0, left: 0, behavior: "smooth" });
                // }}
              >
                <span className="arrow-text text-sm dark:text-white text-dark">
                  {translations[locale as keyof typeof translations]["card"]}
                </span>
                <Image
                  src={theme === "light" ? arrowD : arrowW}
                  className="w-7"
                  alt="More info"
                />
              </Link>
            </div>
          </div>
          <div className="h-2/3 flex flex-col justify-start gap-y-2 text-left">
            <Link href={`/app/${props.slug}`}>
              <h4 className="dark:text-white text-dark font-bold">
                {props?.title}
              </h4>
            </Link>
            <div
              className="text-base dark:text-white text-dark"
              dangerouslySetInnerHTML={{ __html: props?.description }}
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
