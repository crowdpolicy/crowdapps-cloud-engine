import H2 from "../../H2";
import SectionButton from "../../SectionButton";
import MunicipalityCard from "./MunicipalityCard";

import { typeOfMunicipalities } from "../../../helpers/types/home";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { useState, useEffect } from "react";

// ======= TRANSLATIONS ======= //
import translations from "../../../locales/Municipalities/translations.json";
import { useRouter } from "next/router";

export default function Municipalities(props: typeOfMunicipalities) {
  const router = useRouter();
  const { locale } = router;

  props.municipalities?.sort((a: any, b: any) => a.id - b.id);

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
    <section id="municipalities" className="flex flex-col justify-center py-20">
      <H2
        text={`${translations[locale as keyof typeof translations]["title"]}`}
      />
      <div className="flex flex-col items-center 2xl:items-end">
        {windowWidth && windowWidth < 768 ? (
          <>
            <div className="my-slider max-w-[90vw] py-20">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="flex"
              >
                {props.municipalities
                  ?.slice(0, 8)
                  .map((municipality, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <MunicipalityCard
                          title={municipality.title.rendered}
                          logo={municipality.acf.logo}
                          municipalityUrl={municipality.acf.municipality_url}
                          apps={municipality.acf.apps}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        ) : windowWidth && windowWidth < 1024 ? (
          <>
            <div className="my-slider max-w-[90vw] py-20">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={2}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="flex"
              >
                {props.municipalities
                  ?.slice(0, 8)
                  .map((municipality, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <MunicipalityCard
                          title={municipality.title.rendered}
                          logo={municipality.acf.logo}
                          municipalityUrl={municipality.acf.municipality_url}
                          apps={municipality.acf.apps}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        ) : windowWidth && windowWidth < 1330 ? (
          <>
            <div className="my-slider max-w-[95vw] py-20">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={3}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="flex"
              >
                {props.municipalities
                  ?.slice(0, 8)
                  .map((municipality, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <MunicipalityCard
                          title={municipality.title.rendered}
                          logo={municipality.acf.logo}
                          municipalityUrl={municipality.acf.municipality_url}
                          apps={municipality.acf.apps}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        ) : windowWidth && windowWidth < 1550 ? (
          <>
            <div className="my-slider max-w-[95vw] py-20 ">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={4}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="flex"
              >
                {props.municipalities
                  ?.slice(0, 8)
                  .map((municipality, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <MunicipalityCard
                          title={municipality.title.rendered}
                          logo={municipality.acf.logo}
                          municipalityUrl={municipality.acf.municipality_url}
                          apps={municipality.acf.apps}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        ) : (
          <>
            <div className="my-slider max-w-[83.5vw] py-20 ">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={5}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="flex"
              >
                {props.municipalities
                  ?.slice(0, 8)
                  .map((municipality, index) => {
                    return (
                      <SwiperSlide key={index} style={{ margin: 0 }}>
                        <MunicipalityCard
                          title={municipality.title.rendered}
                          logo={municipality.acf.logo}
                          municipalityUrl={municipality.acf.municipality_url}
                          apps={municipality.acf.apps}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center xl:justify-start lg:ml-[10vw] 2xl:ml-[21rem]">
        <SectionButton
          text={`${
            translations[locale as keyof typeof translations]["button"]
          }`}
          url={`/partners`}
          newTab={false}
        />
      </div>
    </section>
  );
}
