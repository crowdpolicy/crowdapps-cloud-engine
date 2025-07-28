import H2 from "../H2";
import SectionButtonForApp from "./SectionButtonForApp";
import { typeOfMoreInfo } from "../../helpers/types/home";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AppSolutionPage/MoreInfo/translations.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MoreInfo(props: typeOfMoreInfo) {
  const router = useRouter();
  const { locale } = router;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {(props.flyer || props.presentation) && (
        <section className="flex flex-col lg:py-10 mt-10">
          <H2
            text={`${
              translations[locale as keyof typeof translations]["title"]
            }`}
          />
          <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-20 justify-center items-center my-14 lg:mt-28 lg:mb-10 w-full">
            {props.presentation && (
              <SectionButtonForApp
                text={`${
                  translations[locale as keyof typeof translations][
                    "presentation"
                  ]
                }`}
                color={props.color}
                url={props.presentation}
              />
            )}
            {props.flyer && (
              <SectionButtonForApp
                text={`${
                  translations[locale as keyof typeof translations]["flyer"]
                }`}
                color={props.color}
                url={props.flyer}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
}
