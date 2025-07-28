import { useCallback, useEffect, useState } from "react";

import Theme from "../components/Theme";
import Menu from "../components/Menu";
import Header from "../components/Home/Header";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTop";
import heroRibbonForDarkGR from "../assets/images/HERO_RIBBON_FOR_DARK.svg";
import heroRibbonForLightGR from "../assets/images/HERO_RIBBON_FOR_LIGHT.svg";
import heroRibbonForDarkENG from "../assets/images/HERO_RIBBON_FOR_DARK_ENG.svg";
import heroRibbonForLightENG from "../assets/images/HERO_RIBBON_FOR_LIGHT_ENG.svg";
import { useTheme } from "next-themes";
import { Post, Category, typeOfEvolveFetch } from "../helpers/types/home";
import UnderHeaderSection from "../components/Home/UnderHeaderSection";
import AppsSolutions from "../components/Home/AppSolutions/AppsSolutions";
import Awards from "../components/Home/Awards/Awards";
import OurVideos from "../components/Home/OurVideos/OurVideos";
import Municipalities from "../components/Home/Municipalities/Municipalities";
import Botakis from "../components/Home/BotakisBanner";
import CityOn from "../components/Home/CityOnBanner";
import Evolve from "../components/Home/Evolve/Evolve";
import LanguangeButton from "../components/LanguageButton";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";

import People from "../components/Home/People/People";
import Image from "next/image";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchWithDelay = async (url: string, ms: number) => {
    await delay(ms);
    const res = await fetch(url);
    return res.json();
  };

  const [
    categoriesRes,
    underHeaderSectionRes,
    allAppsCategoriesRes,
    mobileAppsRes,
    appsRes,
    headerRes,
    headerAwardsRes,
    espaRes,
  ] = await Promise.all([
    // Categories
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/categories?per_page=100&lang=${locale}`,
      500
    ),
    // Under Header Section (Meet City On)
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/under-header-section?lang=${locale}`,
      500
    ),
    // Allapps Taxonomy
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`,
      500
    ),
    // Mobile Apps
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/apps?orderby=id&order=asc&per_page=4&lang=${locale}`,
      500
    ),
    // Apps
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/apps?orderby=id&order=asc&per_page=100&lang=${locale}`,
      500
    ),
    // Header
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/categories?slug=header&lang=${locale}`,
      500
    ),
    // Header Awards
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/categories?slug=header-awards&lang=${locale}`,
      500
    ),
    // ESPA
    fetchWithDelay(`${process.env.VITE_API_ROOT_WP_SETTINGS}`, 500),
    ,
  ]);

  const [
    peopleRes,
    mediumRes,
    awardsRes,
    municipalitiesRes,
    collabsRes,
    videosRes,
  ] = await Promise.all([
    // People
    fetchWithDelay(`${process.env.VITE_API_ROOT}/people?lang=${locale}`, 500),
    // Medium
    fetchWithDelay(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/the-crowdpolicy-collection/?per_page=3`,
      500
    ),
    // Awards
    fetchWithDelay(`${process.env.VITE_API_ROOT}/awards?lang=${locale}`, 500),
    // Municipalities
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/municipalities?lang=${locale}&per_page=100`,
      500
    ),
    // Collabs
    fetchWithDelay(`${process.env.VITE_API_ROOT}/collabs?lang=${locale}`, 500),
    // Videos
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/videos?lang=${locale}&per_page=100`,
      500
    ),
  ]);

  let [textHeaderRes, finalHeaderAwardsRes] = ["", ""];
  if (headerRes && headerAwardsRes) {
    [textHeaderRes, finalHeaderAwardsRes] = await Promise.all([
      // Text Header
      fetchWithDelay(
        `${process.env.VITE_API_ROOT}/posts?categories=${headerRes[0]?.id}&lang=${locale}`,
        500
      ),
      // Under Header Section (Meet City On)
      fetchWithDelay(
        `${process.env.VITE_API_ROOT}/posts?categories=${headerAwardsRes[0]?.id}&lang=${locale}`,
        500
      ),
    ]);
  }

  return {
    props: {
      categoriesRes,
      underHeaderSectionRes,
      allAppsCategoriesRes,
      mobileAppsRes,
      appsRes,
      textHeaderRes,
      finalHeaderAwardsRes,
      peopleRes,
      mediumRes,
      awardsRes,
      municipalitiesRes,
      collabsRes,
      videosRes,
      espaRes,
    },
  };
};

export default function App({
  categoriesRes,
  underHeaderSectionRes,
  allAppsCategoriesRes,
  mobileAppsRes,
  appsRes,
  textHeaderRes,
  finalHeaderAwardsRes,
  peopleRes,
  mediumRes,
  awardsRes,
  municipalitiesRes,
  collabsRes,
  videosRes,
  espaRes,
}: {
  categoriesRes: any;
  underHeaderSectionRes: any;
  allAppsCategoriesRes: any;
  mobileAppsRes: any;
  appsRes: any;
  textHeaderRes: any;
  finalHeaderAwardsRes: any;
  peopleRes: any;
  mediumRes: any;
  awardsRes: any;
  municipalitiesRes: any;
  collabsRes: any;
  videosRes: any;
  espaRes: any;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const Map = dynamic(() => import("@/components/Home/MapSection"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
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

  // Fetch States
  const [people, setPeople] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allApps, setAllApps] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoriesRes);
    allAppsCategoriesRes.sort((a: any, b: any) => a.id - b.id);
    setAllApps(allAppsCategoriesRes);
    peopleRes.data?.sort((a: any, b: any) => a.id - b.id);
    setPeople(peopleRes);
  }, [categoriesRes, allAppsCategoriesRes, peopleRes, people]);

  const updateCategoriesAndAllApps = useCallback(() => {
    setCategories(categoriesRes);
    allAppsCategoriesRes.sort((a: any, b: any) => a.id - b.id);
    setAllApps(allAppsCategoriesRes);
  }, [categoriesRes, allAppsCategoriesRes]);

  useEffect(() => {
    updateCategoriesAndAllApps();
  }, [updateCategoriesAndAllApps]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  // ======= DISABLE SCROLLLING WHEN LOADING ======= //
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="relative overflow-hidden h-[100vh] w-[100vw] max-w-[100vw] max-h[100vh]">
          {windowWidth && windowWidth >= 1024 ? (
            <div className="fixed loading top-[-9%] w-[100vw] ">
              <Lottie
                loop={true}
                animationData={
                  theme === "light" ? LoadingForLight : LoadingForDark
                }
              />
            </div>
          ) : (
            <div className="fixed top-[-8%] w-[100vw] ">
              <Lottie
                loop={true}
                animationData={
                  theme === "light" ? LoadingForLightResp : LoadingForDarkResp
                }
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Meta
            title={`${
              locale === "en" ? "Home | Crowdapps" : "Αρχική | Crowdapps"
            }`}
          />
          <div>
            <div>
              <div className="relative dark:bg-dark bg-white dark:text-white text-dark">
                <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
                  {windowWidth && windowWidth >= 1024 ? <Theme /> : null}
                  {windowWidth && windowWidth >= 1024 ? (
                    <LanguangeButton />
                  ) : null}
                </div>
                <Menu />
                {textHeaderRes && finalHeaderAwardsRes && (
                  <Header
                    text={textHeaderRes[0]}
                    awards={finalHeaderAwardsRes}
                  />
                )}
                {windowWidth &&
                  windowWidth >= 1024 &&
                  (theme === "dark" ? (
                    locale === "el" ? (
                      <Image
                        src={heroRibbonForDarkGR}
                        className="w-full my-10"
                        alt="Ribbon"
                      />
                    ) : (
                      <Image
                        src={heroRibbonForDarkENG}
                        className="w-full my-10"
                        alt="Ribbon"
                      />
                    )
                  ) : locale === "el" ? (
                    <Image
                      src={heroRibbonForLightGR}
                      className="w-full my-10"
                      alt="Ribbon"
                    />
                  ) : (
                    <Image
                      src={heroRibbonForLightENG}
                      className="w-full my-10"
                      alt="Ribbon"
                    />
                  ))}
                {underHeaderSectionRes && (
                  <UnderHeaderSection
                    post={underHeaderSectionRes && underHeaderSectionRes[0]}
                  />
                )}

                {allApps && categories && mobileAppsRes && allApps && (
                  <AppsSolutions
                    allAppsTaxonomy={allApps}
                    categories={categories}
                    mobileApps={mobileAppsRes}
                    allApps={appsRes}
                  />
                )}
                {people && <People people={people} />}
                {awardsRes && <Awards awards={awardsRes} />}
                <CityOn />
                {videosRes && categories && (
                  <OurVideos videos={videosRes} categories={categories} />
                )}
                {municipalitiesRes && (
                  <Municipalities municipalities={municipalitiesRes} />
                )}
                {municipalitiesRes && collabsRes && (
                  <Map
                    municipalities={municipalitiesRes}
                    collabs={collabsRes}
                  />
                )}
                <Botakis />
                {mediumRes.items && <Evolve evolves={mediumRes.items} />}
                <Contact />
                <BackToTopButton />
                {allApps && espaRes && (
                  <Footer sectors={allApps} espa={espaRes} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
