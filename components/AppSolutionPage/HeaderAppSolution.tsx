import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import { typeOfAppHeader } from "../../helpers/types/home";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import Image from "next/image";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AppSolutionPage/Header/translations.json";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HeaderAppSolution(props: typeOfAppHeader) {
  const router = useRouter();
  const { locale } = router;
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      id="header"
      className="lg:min-h-full w-full flex flex-col lg:flex-row dark:text-white text-dark gap-x-5 pt-[12vh] lg:pt-0"
    >
      <div className="lg:ml-24 h-full lg:w-fit">
        <div className="mx-3 my-3 lg:block hidden absolute left-28">
          <Link href={`/`} className="lg:block w-fit">
            <Image
              src={theme === "light" ? crowdappsForLight : crowdappsForDark}
              className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
              alt="CrowdApps Logo"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-10 pt-[7%] lg:min-w-[80%] xl:ml-[10rem] lg:max-xl:justify-center lg:max-xl:mx-[5rem] lg:max-xl:pt-[10%]">
        <div className="flex flex-col gap-y-20 lg:gap-y-10 px-5 lg:pr-44 lg:pl-0">
          <div className="relative flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row justify-between items-center lg:gap-x-[50%] w-full">
            <Image
              width={100}
              height={100}
              src={theme === "light" ? props.darkLogo : props.lightLogo}
              className="w-16 left-0"
              alt=""
            />
            <p
              style={{ color: `${props.color}` }}
              className={`border border-[#110529] dark:border-white rounded-full p-5 text-center`}
            >
              {props.categoryName}
            </p>
          </div>
          <div className="flex flex-col gap-y-5 lg:flex-row justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold">{props.title}</h1>
            <p
              className="mt-5 lg:mt-0 lg:max-w-[40vw] text-xl"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row text-left lg:min-h-[50%]">
          <div className="appText flex flex-col gap-y-5 lg:w-3/5 px-5 py-10 md:px-10 lg:pl-0 lg:pr-[5vw]">
            <div className="content flex flex-col">
              <div
                className="lg:text-lg !leading-7"
                dangerouslySetInnerHTML={{ __html: props.mainText }}
              ></div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center 2xl:items-start lg:flex-col border-t-2 lg:border-l-2 lg:border-t-0 border-black dark:border-white lg:w-2/5 pt-[5vh] lg:pt-0 lg:px-[5vw]  gap-y-8 lg:gap-y-12 px-5 py-10`}
          >
            <h3
              className={` ${
                props.projects?.length != null ? "flex" : "hidden"
              } self-start text-3xl font-bold w-fit`}
            >
              {translations[locale as keyof typeof translations]["projects"]}
            </h3>
            {props.projects?.length != null ? (
              <div className="evolves flex items-center gap-y-12 lg:gap-y-10 max-w-[80vw] lg:max-w-[18vw] ">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000 }}
                >
                  {Array.from(props.projects || []).map((_, index) => {
                    if (index % 2 === 0) {
                      return (
                        <SwiperSlide key={index}>
                          <div className="pb-10 flex flex-col gap-y-12 sm:gap-y-24 lg:gap-y-10 overflow-hidden">
                            {props.projects[index] && (
                              <div className="w-fit lg:w-[20vw] h-fit flex justify-center items-center">
                                <Link
                                  href={props.projects[index].project_url}
                                  target="_blank"
                                  className="flex flex-col w-full h-full gap-y-1"
                                >
                                  <div className="w-[60vw] lg:w-[15vw]">
                                    <Image
                                      fill
                                      src={props.projects[index].thubmnail}
                                      className="!relative rounded-xl mb-1"
                                      alt=""
                                    />
                                  </div>
                                  <p className="w-[50vw] lg:w-[15vw] text-base xl:text-xl dark:text-white text-dark">
                                    {props.projects &&
                                      props.projects.length >= 0 &&
                                      props.projects[index] &&
                                      props.projects[index].title}
                                  </p>
                                </Link>
                              </div>
                            )}
                            {props.projects[index + 1] && (
                              <div className="w-fit lg:w-[20vw] h-fit flex justify-center items-center">
                                <Link
                                  href={props.projects[index + 1]?.project_url}
                                  target="_blank"
                                  className="flex flex-col w-full h-full gap-y-1"
                                >
                                  <div className="w-[60vw] lg:w-[15vw]">
                                    <Image
                                      fill
                                      src={props.projects[index + 1].thubmnail}
                                      className="!relative rounded-xl mb-1"
                                      alt=""
                                    />
                                  </div>
                                  <p className="w-[50vw] lg:w-[15vw] text-base xl:text-xl dark:text-white text-dark">
                                    {props.projects &&
                                      props.projects.length > 0 &&
                                      props.projects[index + 1] &&
                                      props.projects[index + 1].title}
                                  </p>
                                </Link>
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className=" text-3xl font-bold w-fit">
                  {
                    translations[locale as keyof typeof translations][
                      "projects"
                    ]
                  }
                </p>
                <p className="mt-20 font-semibold text-xl text-center">
                  {
                    translations[locale as keyof typeof translations][
                      "commingsoon"
                    ]
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
