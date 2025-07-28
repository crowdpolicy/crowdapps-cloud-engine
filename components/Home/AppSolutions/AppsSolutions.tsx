import axios from "axios";
import Toggle from "../../Τoggle";
import AppSolutionCard from "./AppSolutionCard";

import info from "../../../assets/images/INFO_I.svg";
import apps from "../../../assets/images/AppSolution/INDEX_APPS.svg";
import services from "../../../assets/images/AppSolution/INDEX_SERVICES.svg";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import SectionButton from "../../SectionButton";
import { Post, typeOfAppSolution } from "../../../helpers/types/home";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/AppsSolutions/translations.json";
import { useRouter } from "next/router";

export default function AppsSolutions(props: typeOfAppSolution) {
  const router = useRouter();
  const { locale } = router;

  const [initialOpenToggleForFetch, setInitialOpenToggleForFetch] =
    useState<number>();
  const [initialOpenToggleByName, setInitialOpenToggleByName] =
    useState<string>();
  const [initialOpenToggleById, setInitialOpenToggleById] = useState<string>();
  const [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    if (props.allAppsTaxonomy) {
      setInitialOpenToggleById(`toggle${props.allAppsTaxonomy[0]?.id}`);
      setInitialOpenToggleByName(`${props.allAppsTaxonomy[0]?.name}`);
    }
  }, [props.allAppsTaxonomy, initialOpenToggleById, initialOpenToggleByName]);

  const [openToggleId, setOpenToggleId] = useState(initialOpenToggleById);
  const [openToggleName, setOpenToggleName] = useState(initialOpenToggleByName);
  const [OpenToggleForFetch, setOpenToggleForFetch] = useState(
    initialOpenToggleForFetch
  );

  useEffect(() => {
    let initialFlag = false;
    props.categories?.map((category) => {
      if (
        category.description != "" &&
        props.allAppsTaxonomy[0].name === category.name &&
        !initialFlag
      ) {
        setInitialOpenToggleForFetch(category?.id);
        initialFlag = true;
      }
    });
  }, [props.categories, initialOpenToggleForFetch, props.allAppsTaxonomy]);

  useEffect(() => {
    setOpenToggleId(initialOpenToggleById);
    setOpenToggleName(initialOpenToggleByName);
    setOpenToggleForFetch(initialOpenToggleForFetch);
  }, [
    initialOpenToggleById,
    initialOpenToggleByName,
    initialOpenToggleForFetch,
  ]);

  const handleToggleChange = (toggleId: string, toggleName: string) => {
    const element = document.getElementById("appsContainerTop");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    props.categories.map((category) => {
      if (toggleName === category.name) {
        setOpenToggleForFetch(category.id);
      }
    });
    setOpenToggleId(toggleId);
    setOpenToggleName(toggleName);
  };

  useEffect(() => {
    if (OpenToggleForFetch) {
      const selectedApps: Post[] = [];
      props.allApps?.map((app) => {
        if (
          app.categories.some((category) => category === OpenToggleForFetch)
        ) {
          selectedApps.push(app);
        }
      });
      setCards(selectedApps);
    }
  }, [OpenToggleForFetch, props.allApps]);

  // Window width
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

  // Info
  const [infoSolutionOpen, setInfoSolutionOpen] = useState(false);
  const infoSolutionRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      const handler = (e: TouchEvent) => {
        if (infoSolutionOpen) {
          if (
            infoSolutionRef.current &&
            !infoSolutionRef.current.contains(e.target as Node)
          ) {
            setInfoSolutionOpen(false);
            const item = document.querySelector(
              ".infoSolution"
            ) as HTMLElement | null;
            if (item) {
              if (locale === "en") {
                item.style.right = "-12rem";
              } else {
                item.style.right = "-11.5rem";
              }
            }
          }
        }
      };

      document.addEventListener("touchstart", handler);

      return () => {
        document.removeEventListener("touchstart", handler);
      };
    }
  }, [infoSolutionOpen, locale]);

  function closeInfoSolution() {
    const item = document.querySelector(".infoSolution") as HTMLElement | null;

    if (item) {
      if (infoSolutionOpen) {
        setInfoSolutionOpen(!infoSolutionOpen);
        if (locale === "en") {
          item.style.right = "-12rem";
        } else {
          item.style.right = "-11.5rem";
        }
      } else {
        setInfoSolutionOpen(!infoSolutionOpen);
        item.style.right = "0";
      }
    }
  }

  return (
    <section
      id="appSolution"
      className="flex flex-col lg:py-20 my-20 items-center justify-center relative overflow-x-hidden"
    >
      <div className="flex flex-col lg:flex-row text-left gap-x-10 xl:gap-x-20 items-center justify-center xl:justify-start gap-y-5 lg-gap-y-0 ml-5 md:mx-10 lg:mx-[7vw] xl:mx-[21rem] mr-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:w-[50%] xl:w-1/2">
          {translations[locale as keyof typeof translations]["title"]}
        </h2>
        <p className="text-lg lg:w-[40%] xl:w-1/2">
          {translations[locale as keyof typeof translations]["subTittle"]}
        </p>
      </div>
      <div
        className={`${
          locale === "el" ? "-right-[11.5rem]" : "-right-[12rem]"
        } infoSolution hover:right-0 absolute top-[21%] md:top-[15%] lg:top-20 flex flex-col z-100 transition-all ease-in duration-300`}
      >
        <div
          ref={infoSolutionRef}
          className="flex flx-row items-center gap-x-3 bg-[#3441FB] p-2 rounded-l-full"
        >
          <div>
            <Image
              src={info}
              onClick={() => {
                windowWidth && windowWidth < 1024 ? closeInfoSolution() : null;
              }}
              alt=""
            />
          </div>
          <p className="px-5 text-white text-[1.4rem] font-semibold">
            {translations[locale as keyof typeof translations]["memorandum"]}
          </p>
        </div>
        <div className="bg-[#c5c5c5] dark:bg-white text-black font-semibold p-4 ml-[6em] rounded-bl-lg">
          <ul className="flex flex-col text-[1.1rem]">
            <li className="flex flex-row items-center gap-x-3">
              <Image src={apps} alt="" />
              {translations[locale as keyof typeof translations]["apps"]}
            </li>
            <li className="flex flex-row items-center gap-x-3">
              <Image src={services} alt="" />
              {translations[locale as keyof typeof translations]["services"]}
            </li>
          </ul>
        </div>
      </div>
      <div
        id="appsContainerTop"
        className="flex flex-col mt-20 gap-x-20 justify-center xl:justify-start items-start z-10 2xl:ml-[21rem] 2xl:mr-auto"
      >
        <div className="flex flex-col lg:flex-row mt-20 gap-x-20 justify-center xl:justify-start items-start  z-10 ">
          <div className="toglles hidden xl:flex flex-col gap-y-[6vh] lg:min-w-1/5">
            {props.allAppsTaxonomy?.map((app, index) => {
              const toggleId = `toggle${app.id}`;
              const toggleName = `${app.name}`;

              if (app.slug != "dimofili" && app.slug != "dimofili-en") {
                return (
                  <Toggle
                    key={index}
                    id={toggleId}
                    colors={{
                      on: app.description,
                      off: `${app.description}BF`,
                    }}
                    text={`${app.name}`}
                    onChange={() => handleToggleChange(toggleId, toggleName)}
                    openNow={openToggleId || ""}
                    slug={app.slug}
                  />
                );
              }
            })}
          </div>
          <div
            id="cardsContainer"
            className="grid gap-10 md:gap-x-10 xl:gap-x-40 2xl:gap-x-[3vw] 2xl:min-w-2/3 lg:w-auto lg:h-full "
          >
            {windowWidth && windowWidth < 768
              ? props.mobileApps.slice(0, 3).map((mobileApp, index) => {
                  return (
                    <AppSolutionCard
                      key={index}
                      id={`${mobileApp.id}`}
                      slug={mobileApp.slug}
                      darkLogo={mobileApp.acf.app_logo_dark}
                      lightLogo={mobileApp.acf.app_logo_light}
                      title={`${mobileApp.title.rendered}`}
                      description={mobileApp.acf.description}
                      color=""
                    />
                  );
                  return null;
                })
              : windowWidth && windowWidth < 1280
              ? props.mobileApps.slice(0, 4).map((mobileApp, index) => {
                  return (
                    <AppSolutionCard
                      key={index}
                      id={`${mobileApp.id}`}
                      slug={mobileApp.slug}
                      darkLogo={mobileApp.acf.app_logo_dark}
                      lightLogo={mobileApp.acf.app_logo_light}
                      title={`${mobileApp.title.rendered}`}
                      description={mobileApp.acf.description}
                      color=""
                    />
                  );
                  return null;
                })
              : props.categories?.map((category) => {
                  if (category.name === openToggleName) {
                    return cards.map((card: Post) => {
                      return (
                        <AppSolutionCard
                          key={card.id}
                          id={`${card.id}`}
                          slug={card.slug}
                          darkLogo={card.acf.app_logo_dark}
                          lightLogo={card.acf.app_logo_light}
                          title={`${card.title.rendered}`}
                          description={card.acf.description}
                          color={category.description}
                        />
                      );
                    });
                  }
                  return null;
                })}
          </div>
        </div>
        <div className="my-12 self-center xl:self-start lg:mt-32">
          <SectionButton
            text={translations[locale as keyof typeof translations]["button"]}
            url={`/apps`}
            newTab={false}
          />
        </div>
      </div>
    </section>
  );
}
