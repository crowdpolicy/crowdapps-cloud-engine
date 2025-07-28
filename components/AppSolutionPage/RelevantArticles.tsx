import H2 from "../H2";
import animForDark from "../../assets/animations/EVOLVE_FOR_DARK.json";
import animForLight from "../../assets/animations/EVOLVE_FOR_LIGHT.json";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import ArticleCard from "./ArticleCard";
import { typeOfRelevantArticles } from "../../helpers/types/home";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AppSolutionPage/RelevantArticles/translations.json";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function RelevantArticles(props: typeOfRelevantArticles) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="lg:pt-20 mt-10 flex flex-col relative overflow-hidden">
      <H2
        text={`${translations[locale as keyof typeof translations]["title"]}`}
      />

      {windowWidth < 768 ? (
        <>
          <div className="ml-[5vw] max-w-[90vw] pb-20 z-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }}
              className=" flex"
            >
              {props.articles?.slice(0, 3).map((article, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ArticleCard
                      key={index}
                      color={props.color}
                      title={article.title.rendered}
                      image={article.acf.thumbnail}
                      date={article.acf.date}
                      readTime={article.acf.reading_time}
                      url={article.acf.medium_link}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      ) : windowWidth < 1024 ? (
        <>
          <div className="ml-[5vw] max-w-[90vw] pt-10 pb-20 z-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }}
              className=" flex"
            >
              {props.articles?.slice(0, 3).map((article, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ArticleCard
                      key={index}
                      color={props.color}
                      title={article.title.rendered}
                      image={article.acf.thumbnail}
                      date={article.acf.date}
                      readTime={article.acf.reading_time}
                      url={article.acf.medium_link}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      ) : (
        <>
          <div
            id="cards"
            className="flex flex-row justify-between md:justify-center px-[10vw] md:px-0 md:pl-0 relative gap-x-12  z-10 my-16"
          >
            {props.articles?.slice(0, 3).map((article, index) => {
              return (
                <ArticleCard
                  key={index}
                  color={props.color}
                  title={article.title.rendered}
                  image={article.acf.thumbnail}
                  date={article.acf.date}
                  readTime={article.acf.reading_time}
                  url={article.acf.medium_link}
                />
              );
            })}
          </div>
        </>
      )}
      <div className="absolute lg:w-full top-[40%] scale-[3] md:scale-[2] lg:scale-100">
        <Lottie
          loop={true}
          animationData={theme === "light" ? animForLight : animForDark}
          className=""
        />
      </div>
    </section>
  );
}
