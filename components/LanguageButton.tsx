// ======= TRANSLATIONS ======= //
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LanguangeButton() {
  const router = useRouter();
  const { locale } = router;

  const { pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex flex-row top-auto lg:top-5 right-[10vw] md:right-[5vw] lg:right-[2vw]  gap-0 border border-black dark:border-white rounded-2xl overflow-hidden z-1000">
      <button
        data-value="el"
        className={`${
          locale === "el"
            ? "bg-black text-white dark:bg-white dark:text-dark"
            : "bg-transparent text-black dark:text-white"
        } flex justify-center w-1/2 px-2 py-[0.1rem]`}
        onClick={() => changeLanguage("el")}
      >
        GR
      </button>
      <button
        data-value="en"
        className={`${
          locale === "en"
            ? "bg-black text-white dark:bg-white dark:text-dark"
            : "bg-transparent text-black dark:text-white"
        } flex justify-center w-1/2 px-2 py-[0.1rem] `}
        onClick={() => changeLanguage("en")}
      >
        ENG
      </button>
    </div>
  );
}
