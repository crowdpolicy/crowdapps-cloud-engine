import H2 from "../../H2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SectionButton from "../../SectionButton";
import SliderPerTab from "./SliderPerTab";
import ReactPlayer from "react-player/youtube";
import { Tab } from "@headlessui/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { Category, Post, typeOfVideos } from "../../../helpers/types/home";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/OurVideos/translations.json";
import { useRouter } from "next/router";

export default function OurVideos(props: typeOfVideos) {
  const router = useRouter();
  const { locale } = router;

  const [isOpen, setIsOpen] = useState<string>();
  const [classifiedCategoriesIds, setClassifiedCategoriesIds] = useState<
    number[]
  >([]);
  const [initialTab, setInitialTab] = useState<number>();
  const [openTabVideos, setOpenTabVideos] = useState<Post[]>([]);

  useEffect(() => {
    let categoriesIds: number[] = [];

    props.categories?.forEach((category) => {
      if (category.description === "video-category" && category.count > 0) {
        categoriesIds.push(category.id);
      }
    });

    categoriesIds = Array.from(new Set(categoriesIds)).sort((a, b) => a - b);

    setClassifiedCategoriesIds(categoriesIds);
  }, [props.categories, props.videos]);

  useEffect(() => {
    if (classifiedCategoriesIds.length > 0) {
      setInitialTab(classifiedCategoriesIds[0]);
    }
  }, [classifiedCategoriesIds]);

  useEffect(() => {
    setIsOpen(`tab${initialTab}`);
  }, [initialTab]);

  useEffect(() => {
    const openTabContent: Post[] = [];
    props.videos?.map((video) => {
      if (`tab${video.categories[0]}` === isOpen) {
        openTabContent.push(video);
      }
    });
    setOpenTabVideos(openTabContent);
  }, [isOpen, props.videos]);

  const firstCategory: Category | undefined = props.categories?.find(
    (cat) => cat.id === classifiedCategoriesIds[0]
  );
  const lastCategory = props.categories?.find(
    (cat) =>
      cat.id === classifiedCategoriesIds[classifiedCategoriesIds.length - 1]
  );

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
    <section className="lg:pt-20 my-20 flex flex-col justify-center">
      <H2
        text={`${translations[locale as keyof typeof translations]["title"]}`}
      />
      <div className="flex flex-col items-center my-10">
        <Tab.Group>
          <div className="w-full flex justify-center xl:justify-start  relative">
            <hr className="h-px bg-dark border-0 dark:bg-white absolute w-full bottom-0 z-10" />
            <Tab.List
              id="tabs"
              className="flex flex-col xl:flex-row justify-center mt-10 z-100 xl:pl-[21rem]"
            >
              {firstCategory && firstCategory.count > 0 && (
                <button
                  id={`tab${firstCategory?.id}`}
                  className={`${
                    windowWidth && windowWidth >= 1280
                      ? isOpen === `tab${firstCategory.id}` &&
                        "border-b-white dark:border-b-[#110529] font-semibold"
                      : isOpen === `tab${firstCategory.id}` &&
                        "bg-black text-white dark:bg-white dark:text-dark border-black dark:border-white font-semibold "
                  } px-20 xl:max-2xl:px-10 py-5 border-2 border-black dark:border-white rounded-t-lg  ${
                    windowWidth && windowWidth >= 1280 && "border-r-0"
                  } `}
                  onClick={() => setIsOpen(`tab${firstCategory?.id}`)}
                >
                  {firstCategory.name}
                </button>
              )}
              {props.categories?.map((category, index) => {
                return classifiedCategoriesIds.map((classifiedCategoryId) => {
                  if (
                    category.id === classifiedCategoryId &&
                    classifiedCategoryId != firstCategory?.id &&
                    classifiedCategoryId != lastCategory?.id &&
                    category.count > 0
                  ) {
                    return (
                      <button
                        key={index}
                        id={`tab${category.id}`}
                        className={`${
                          windowWidth && windowWidth >= 1280
                            ? isOpen === `tab${category.id}` &&
                              "border-b-white dark:border-b-[#110529] font-semibold"
                            : isOpen === `tab${category.id}` &&
                              "bg-black text-white dark:bg-white dark:text-dark border-black dark:border-white font-semibold "
                        } px-20  xl:max-2xl:px-10  py-5 border-t-0 xl:border-t-2 border-2 ${
                          windowWidth && windowWidth >= 1280 && "border-r-0 "
                        } border-black dark:border-white xl:rounded-t-lg`}
                        onClick={() => setIsOpen(`tab${category.id}`)}
                      >
                        {category.name}
                      </button>
                    );
                  }
                });
              })}
              {lastCategory && lastCategory.count > 0 && (
                <button
                  id={`tab${lastCategory?.id}`}
                  className={`${
                    windowWidth && windowWidth >= 1280
                      ? isOpen === `tab${lastCategory.id}` &&
                        "border-b-white dark:border-b-[#110529] font-semibold"
                      : isOpen === `tab${lastCategory.id}` &&
                        "bg-black text-white dark:bg-white dark:text-dark border-black dark:border-white font-semibold "
                  } px-20  xl:max-2xl:px-10  py-5 border-t-0 xl:border-t-2 border-2 border-black dark:border-white xl:rounded-t-lg`}
                  onClick={() => setIsOpen(`tab${lastCategory?.id}`)}
                >
                  {lastCategory.name}
                </button>
              )}
            </Tab.List>
          </div>
          <Tab.Panels className="xl:w-full">
            {(() => {
              const video = openTabVideos[0];
              if (video) {
                return (
                  <Tab.Panel className="flex flex-col justify-center xl:justify-start items-center max-w-fit xl:ml-[21rem] mt-20 mb-10 font-semibold text-xl">
                    <div className="flex flex-col justify-center xl:justify-start items-center lg:items-start w-fit mt-5 self-start">
                      <h5
                        className="mb-4 mx-5 text-left self-start"
                        dangerouslySetInnerHTML={{
                          __html: openTabVideos[0]?.title.rendered,
                        }}
                      ></h5>
                      <div className="border-none rounded-3xl overflow-hidden w-fit h-fit mx-[5vw] xl:mx-0">
                        {windowWidth && windowWidth < 768 ? (
                          <ReactPlayer
                            url={video.acf.video_url}
                            className="justify-center rounded-3xl"
                            width="90vw"
                            height="30vh"
                            controls
                          />
                        ) : windowWidth && windowWidth < 1024 ? (
                          <ReactPlayer
                            url={video.acf.video_url}
                            className="justify-center rounded-3xl"
                            width="85vw"
                            height="35vh"
                            controls
                          />
                        ) : windowWidth && windowWidth < 1280 ? (
                          <ReactPlayer
                            url={video.acf.video_url}
                            className="justify-center rounded-3xl"
                            width="60vw"
                            height="45vh"
                            controls
                          />
                        ) : (
                          <ReactPlayer
                            url={video.acf.video_url}
                            className="justify-center rounded-3xl"
                            width="55vw"
                            height="65vh"
                            controls
                          />
                        )}
                      </div>
                    </div>
                    <div className="max-w-full xl:max-w-[84vw]">
                      <SliderPerTab videos={openTabVideos.slice(1)} />
                    </div>
                  </Tab.Panel>
                );
              }
            })()}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="flex justify-center xl:justify-start xl:ml-[21rem]">
        <SectionButton
          text={`${
            translations[locale as keyof typeof translations]["button"]
          }`}
          url="https://www.youtube.com/@Crowdpolicy"
          newTab={true}
        />
      </div>
    </section>
  );
}
