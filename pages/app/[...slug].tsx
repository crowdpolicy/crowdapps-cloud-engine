import { useState, useEffect } from "react";
import Theme from "../../components/Theme";
import Menu from "../../components/Menu";
import HeaderAppSolution from "../../components/AppSolutionPage/HeaderAppSolution";
import MoreInfo from "../../components/AppSolutionPage/MoreInfo";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import BackToTopButton from "../../components/BackToTop";
import LanguangeButton from "../../components/LanguageButton";
import { Helmet } from "react-helmet";
import { Router, useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";
import LoadingForDark from "../../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { locale, params } = context;
    //@ts-ignore
    const slug = params.slug[0];

    // const delay = (ms: number): Promise<void> =>
    //   new Promise((resolve) => setTimeout(resolve, ms));

    // const fetchWithDelay = async (url: string, ms: number) => {
    //   await delay(ms);
    //   const res = await fetch(url);
    //   return res.json();
    // };

    const [appRes, allAppsTaxonomysRes, categoryIdRes, espaRes] =
      await Promise.all([
        // App
        fetch(`${process.env.VITE_API_ROOT}/apps?slug=${slug}&lang=${locale}`),
        // AllAppsTaxonomy
        fetch(`${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`),
        // Category
        fetch(
          `${process.env.VITE_API_ROOT}/categories?slug=${slug}&lang=${locale}`
        ),
        // ESPA
        fetch(`${process.env.VITE_API_ROOT_WP_SETTINGS}`),
      ]);

    // Check if any of the responses are not okay
    if (
      !appRes.ok ||
      !allAppsTaxonomysRes.ok ||
      !categoryIdRes.ok ||
      !espaRes.ok
    ) {
      throw new Error("Failed to fetch data");
    }

    const [appData, allAppsTaxonomyData, categoryIdData, espaData] =
      await Promise.all([
        appRes.json(),
        allAppsTaxonomysRes.json(),
        categoryIdRes.json(),
        espaRes.json(),
      ]);

    let [categoriesRes]: any = [""];

    // if (appRes && categoryIdRes) {
    if (appData && categoryIdData) {
      [categoriesRes] = await Promise.all([
        // App category content
        fetch(
          `${process.env.VITE_API_ROOT}/categories/${appData[0]?.categories[0]}`
        ),
      ]);
    }

    // Check if the category response is not okay
    if (!categoriesRes.ok) {
      throw new Error("Failed to fetch category data");
    }

    const [categoriesData] = await Promise.all([categoriesRes.json()]);

    return {
      props: {
        appRes: appData,
        allAppsTaxonomysRes: allAppsTaxonomyData,
        categoriesRes: categoriesData,
        espaRes: espaData,
      },
    };
  } catch (error) {
    // If any request fails, return a 404 error
    return {
      notFound: true,
    };
  }
};

export default function AppSolutionPage({
  appRes,
  allAppsTaxonomysRes,
  categoriesRes,
  espaRes,
}: // articlesRes
{
  appRes: any;
  allAppsTaxonomysRes: any;
  categoriesRes: any;
  espaRes: any;
  // articlesRes: any;
}) {
  const router = useRouter();
  const { theme } = useTheme();

  const { locale } = router;

  allAppsTaxonomysRes.data?.sort((a: any, b: any) => a.id - b.id);

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

  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

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
              appRes[0]
                ? appRes[0].title.rendered + " | Crowdapps"
                : "Crowdapps"
            }`}
          />
          <div className="dark:bg-dark bg-white dark:text-white text-dark">
            <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
              {windowWidth && windowWidth >= 1024 ? <Theme /> : null}
              {windowWidth && windowWidth >= 1024 ? <LanguangeButton /> : null}
            </div>
            <Menu />
            <HeaderAppSolution
              darkLogo={appRes[0]?.acf.app_logo_dark}
              lightLogo={appRes[0]?.acf.app_logo_light}
              categoryName={`${categoriesRes?.name}`}
              color={categoriesRes ? categoriesRes.description : ""}
              title={appRes[0] ? appRes[0].title.rendered : ""}
              description={appRes[0]?.acf.description}
              mainText={
                appRes[0].content.rendered
                  ? appRes[0].content.rendered
                  : locale === "el"
                  ? "Δεν υπάρχει περιεχόμενο"
                  : "There is no content yet"
              }
              projects={appRes[0]?.acf.projects}
            />
            <MoreInfo
              color={categoriesRes ? categoriesRes.description : ""}
              flyer={appRes[0]?.acf.flyer}
              presentation={appRes[0]?.acf.presentation}
            />
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
