import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Theme from "../components/Theme";
import LanguangeButton from "../components/LanguageButton";
import { useState, useEffect } from "react";
import { Category } from "../helpers/types/home";
import AllAppsMainContentDesktop from "../components/AllAppsPage/AllAppsMainContentDesktop";
import BackToTopButton from "../components/BackToTop";
import HeaderAllApps from "../components/AllAppsPage/HeaderAllAppsPage";
import AllAppsMainContentMobile from "../components/AllAppsPage/AllAppMainContentMobile";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

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

  const [categoriesRes, allAppsTaxonomyRes, appsRes] = await Promise.all([
    // Categories
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/categories?per_page=100&lang=${locale}`,
      500
    ),
    // AllAppsTaxonomy
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`,
      500
    ),
    // All Apps
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/apps?orderby=id&order=asc&per_page=100&lang=${locale}`,
      500
    ),
  ]);
  return {
    props: {
      categoriesRes,
      allAppsTaxonomyRes,
      appsRes,
    },
  };
};

export default function AllAppsMobilePage({
  categoriesRes,
  allAppsTaxonomyRes,
  appsRes,
}: {
  categoriesRes: any;
  allAppsTaxonomyRes: any;
  appsRes: any;
}) {
  const router = useRouter();
  const { locale } = router;
  const { theme } = useTheme();

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [allAppsTaxonomy, setAllApps] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoriesRes);
    allAppsTaxonomyRes.sort((a: any, b: any) => a.id - b.id);
    setAllApps(allAppsTaxonomyRes);
  }, [categoriesRes, allAppsTaxonomyRes]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setLoading(true);
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
        <div className="relative overflow-hiddenh-[100vh] w-[100vw] max-w-[100vw] max-h[100vh]">
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
            title={
              locale === "en"
                ? "Εφαρμογές & Υπηρεσίες | Crowdapps"
                : "Services | Crowdapps"
            }
          />
          <div className="dark:bg-dark bg-white dark:text-white text-dark">
            <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
              {windowWidth && windowWidth >= 1024 ? <Theme /> : null}
              {windowWidth && windowWidth >= 1024 ? <LanguangeButton /> : null}
            </div>
            <Menu />
            <HeaderAllApps />
            {windowWidth && windowWidth > 1024
              ? allAppsTaxonomy &&
                categories &&
                appsRes && (
                  <AllAppsMainContentDesktop
                    allAppsTaxonomy={allAppsTaxonomy}
                    categories={categories}
                    allApps={appsRes}
                  />
                )
              : allAppsTaxonomy &&
                categories &&
                appsRes && (
                  <AllAppsMainContentMobile
                    allAppsTaxonomy={allAppsTaxonomy}
                    categories={categories}
                    allApps={appsRes}
                  />
                )}
            <Contact />
            {allAppsTaxonomy && <Footer sectors={allAppsTaxonomy} />}
            <BackToTopButton />
          </div>
        </div>
      )}
    </>
  );
}
