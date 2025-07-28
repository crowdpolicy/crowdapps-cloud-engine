import AwardCard from "./AwardCard";
import SectionButton from "../../SectionButton";
import { useEffect, useState } from "react";

import { typeOfAwards } from "../../../helpers/types/home";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/Awards/translations.json";
import { useRouter } from "next/router";

export default function Awards(props: typeOfAwards) {
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
    <section className="lg:py-20 my-20 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row text-left gap-x-10 xl:gap-x-20 items-start xl:items-center justify-between gap-y-5 lg-gap-y-0 ml-5 md:mx-10 xl:px-[21rem] xl:mx-0 mr-5 lg:mr-0 xl:w-full">
        <h2 className="text-2xl md:text-4xl font-bold xl:w-fit">
          {translations[locale as keyof typeof translations]["title"]}
        </h2>
        <p className="text-lg md:text-xl lg:w-[50%]">
          {translations[locale as keyof typeof translations]["subTitle"]}
        </p>
      </div>
      {windowWidth && windowWidth < 840 ? (
        <div className="max-w-[100vw] py-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className=" flex"
          >
            {props.awards?.map((award) => {
              return (
                <SwiperSlide key={award.id}>
                  <AwardCard
                    title={award.title.rendered}
                    award={award.acf.award_image}
                    municipality={award.acf.municipality_logo}
                    appDark={award.acf.app_dark}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : windowWidth && windowWidth < 1024 ? (
        <div className="my-slider md:max-lg:max-w-[99vw] py-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className=" flex"
          >
            {props.awards?.map((award) => {
              return (
                <SwiperSlide key={award.id}>
                  <AwardCard
                    title={award.title.rendered}
                    award={award.acf.award_image}
                    municipality={award.acf.municipality_logo}
                    appDark={award.acf.app_dark}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : windowWidth && windowWidth < 1330 ? (
        <div className="my-slider mx-[5vw] max-w-[85vw] py-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="flex"
          >
            {props.awards?.map((award, index) => {
              return (
                <SwiperSlide key={index}>
                  <AwardCard
                    title={award.title.rendered}
                    award={award.acf.award_image}
                    municipality={award.acf.municipality_logo}
                    appDark={award.acf.app_dark}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : windowWidth && windowWidth < 1550 ? (
        <div className="my-slider mx-[5vw] max-w-[85vw] py-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="flex"
          >
            {props.awards?.map((award, index) => {
              return (
                <SwiperSlide key={index}>
                  <AwardCard
                    title={award.title.rendered}
                    award={award.acf.award_image}
                    municipality={award.acf.municipality_logo}
                    appDark={award.acf.app_dark}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="my-slider ml-[14vw] max-w-[85vw] py-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="flex"
          >
            {props.awards.map((award, index) => {
              return (
                <SwiperSlide key={index}>
                  <AwardCard
                    title={award.title.rendered}
                    award={award.acf.award_image}
                    municipality={award.acf.municipality_logo}
                    appDark={award.acf.app_dark}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      <div className="flex xl:self-start justify-center xl:mx-[17.5vw]">
        <SectionButton
          text={`${
            translations[locale as keyof typeof translations]["button"]
          }`}
          url="https://medium.com/the-crowdpolicy-collection/crowdpolicy-best-city-awards2023-4d40f9f09ffd"
          newTab={true}
        />
      </div>
    </section>
  );
}
