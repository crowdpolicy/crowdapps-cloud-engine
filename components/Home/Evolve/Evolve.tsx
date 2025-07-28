import H2 from "../../H2";
import SectionButton from "../../SectionButton";
import EvolveCard from "./EvolveCard";
import animForDarkGR from "@/assets/animations/EVOLVE_FOR_DARK.json";
import animForLightGR from "@/assets/animations/EVOLVE_FOR_LIGHT.json";
import animForDarkEN from "@/assets/animations/[ENG] NEWS_ANIMATION_BLACK.json";
import animForLightEN from "@/assets/animations/[ENG] NEWS_ANIMATION_WHITE.json";

import Lottie from "lottie-react";
import { Player } from "@lottiefiles/react-lottie-player";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { typeOfEvolves } from "../../../helpers/types/home";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/Evolves/translations.json";
import { useRouter } from "next/router";

export default function Evolve(props: typeOfEvolves) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  // ======= DEVICE WIDTH ======= //

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth as any);
  }, []);

  return (
    <section
      id="evolve"
      className="md:pt-20 my-20 xl:py-20 xl:mt-20 flex flex-col relative md:max-lg:max-w-[99vw] overflow-hidden"
    >
      <H2
        text={`${translations[locale as keyof typeof translations]["title"]}`}
      />
      {windowWidth && windowWidth < 768 ? (
        <div className="ml-[5vw] max-w-[90vw] pb-20 z-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className=" flex"
          >
            {props.evolves?.slice(0, 3).map((evolve, index) => {
              const imgSrcRegex = /<img.*?src="(.*?)"/;

              const match = evolve.content.match(imgSrcRegex);

              const imageUrl = match ? match[1] : "";

              const dateTimeString = evolve.pubDate;
              const splitDateTime = dateTimeString.split(" ");

              const date: Date = new Date(splitDateTime[0]);

              return (
                <SwiperSlide key={index}>
                  <EvolveCard
                    title={evolve.title}
                    image={imageUrl}
                    date={date}
                    url={evolve.link}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : windowWidth && windowWidth < 1024 ? (
        <div className="ml-[0vw] max-w-[100vw] py-20 z-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="flex"
          >
            {Array.isArray(props.evolves) &&
              props.evolves.slice(0, 3).map((evolve, index) => {
                const imgSrcRegex = /<img.*?src="(.*?)"/;

                const match = evolve.content.match(imgSrcRegex);

                const imageUrl = match ? match[1] : "";

                const dateTimeString = evolve.pubDate;
                const splitDateTime = dateTimeString.split(" ");

                const date: Date = new Date(splitDateTime[0]);

                return (
                  <SwiperSlide key={index}>
                    <EvolveCard
                      title={evolve.title}
                      image={imageUrl}
                      date={date}
                      url={evolve.link}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      ) : (
        <div className="w-fit self-center">
          <div
            id="cards"
            className="flex flex-row justify-between md:justify-center px-[10vw] md:px-0 md:pl-0 relative gap-x-12  z-10 my-16"
          >
            {Array.isArray(props.evolves) &&
              props.evolves.slice(0, 3).map((evolve, index) => {
                const imgSrcRegex = /<img.*?src="(.*?)"/;

                const match = evolve.content.match(imgSrcRegex);

                const imageUrl = match ? match[1] : "";

                const dateTimeString = evolve.pubDate;
                const splitDateTime = dateTimeString.split(" ");

                const date: Date = new Date(splitDateTime[0]);

                return (
                  <EvolveCard
                    key={index}
                    title={evolve.title}
                    image={imageUrl}
                    date={date}
                    url={evolve.link}
                  />
                );
              })}
          </div>
          <div className="flex justify-start">
            <SectionButton
              text={`${
                translations[locale as keyof typeof translations]["button"]
              }`}
              url="https://medium.com/the-crowdpolicy-collection/tagged/crowdapps"
              newTab={true}
            />
          </div>
        </div>
      )}
      <div className="absolute lg:w-full top-[45%] lg:top-1/3 scale-[2.5] lg:scale-100">
        {theme === "dark" ? (
          locale === "el" ? (
            <Player
              autoplay={true}
              loop={true}
              src={animForDarkGR}
              className=""
            />
          ) : (
            <Player
              autoplay={true}
              loop={true}
              src={animForDarkEN}
              className=""
            />
          )
        ) : locale === "el" ? (
          <Player
            autoplay={true}
            loop={true}
            src={animForLightGR}
            className=""
          />
        ) : (
          <Player
            autoplay={true}
            loop={true}
            src={animForLightEN}
            className=""
          />
        )}
      </div>
      <div className="flex justify-center lg:hidden">
        <SectionButton
          text={`${
            translations[locale as keyof typeof translations]["button"]
          }`}
          url="https://medium.com/the-crowdpolicy-collection/tagged/crowdapps"
          newTab={true}
        />
      </div>
    </section>
  );
}
