import { useState, useEffect } from "react";
import Theme from "../components/Theme";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AllMunicipalities from "../components/MunicipalitiesPage/AllMunicipalities";
import { useTheme } from "next-themes";
import BackToTopButton from "../components/BackToTop";
import LanguangeButton from "../components/LanguageButton";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";

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

  const [municipalitiesRes, allAppsTaxonomysRes, appsRes, espaRes] =
    await Promise.all([
      // Municipalities
      fetchWithDelay(
        `${process.env.VITE_API_ROOT}/municipalities?lang=${locale}&per_page=100`,
        500
      ),
      // AllAppsTaxonomy
      fetchWithDelay(
        `${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`,
        500
      ),
      // Apps
      fetchWithDelay(
        `${process.env.VITE_API_ROOT}/apps?orderby=id&order=asc&per_page=100&lang=${locale}`,
        500
      ),
      // ESPA
      fetchWithDelay(`${process.env.VITE_API_ROOT_WP_SETTINGS}`, 500),
    ]);

  return {
    props: { municipalitiesRes, allAppsTaxonomysRes, appsRes, espaRes },
  };
};
export default function MunicipalitiesPage({
  municipalitiesRes,
  allAppsTaxonomysRes,
  appsRes,
  espaRes,
}: {
  municipalitiesRes: any;
  allAppsTaxonomysRes: any;
  appsRes: any;
  espaRes: any;
}) {
  const { theme } = useTheme();

  const router = useRouter();
  const { locale } = router;

  municipalitiesRes.sort((a: any, b: any) => {
    const aPriority = a.acf.priority || Infinity;
    const bPriority = b.acf.priority || Infinity;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return a.id - b.id;
  });

  allAppsTaxonomysRes.sort((a: any, b: any) => a.id - b.id);

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
            title={`${
              locale === "en"
                ? "Municipalities | Crowdapps"
                : "Δήμοι & Περιφέρειες | Crowdapps"
            }`}
          />
          <div className="dark:bg-dark bg-white">
            <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
              {windowWidth && windowWidth >= 1024 ? <Theme /> : null}
              {windowWidth && windowWidth >= 1024 ? <LanguangeButton /> : null}
            </div>
            <Menu />
            {municipalitiesRes && (
              <AllMunicipalities
                municipalities={municipalitiesRes}
                apps={appsRes}
              />
            )}
            <Contact />
            {allAppsTaxonomysRes && espaRes && (
              <Footer sectors={allAppsTaxonomysRes} espa={espaRes} />
            )}

            <BackToTopButton />
          </div>
        </div>
      )}
    </>
  );
}
