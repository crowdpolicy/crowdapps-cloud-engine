import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import BackToTopButton from "../components/BackToTop";
import PageHeader from "../components/WpPage/PageHeader";
import PageContent from "../components/WpPage/PageContent";
import Theme from "../components/Theme";
import LanguangeButton from "../components/LanguageButton";
import { Helmet } from "react-helmet";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, params } = context;
  //@ts-ignore
  const pageName = params.slug[0];

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchWithDelay = async (url: string, ms: number) => {
    await delay(ms);
    const res = await fetch(url);
    return res.json();
  };

  const [allAppsTaxonomyRes, pageRes, espaRes] = await Promise.all([
    // AllAppsTaxonomy
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`,
      500
    ),
    // Page
    fetchWithDelay(
      `${process.env.VITE_API_ROOT_WP_PAGE}/?path=${pageName}`,
      500
    ),
    // ESPA
    fetchWithDelay(`${process.env.VITE_API_ROOT_WP_SETTINGS}`, 500),
  ]);

  if (pageRes.success) {
    try {
      const pageData = await fetchWithDelay(
        `${process.env.VITE_API_ROOT}/pages/${pageRes.data.post_id}`,
        500
      );
      return {
        props: {
          allAppsTaxonomyRes,
          pageRes,
          pageData,
          espaRes,
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};

export default function WpPage({
  allAppsTaxonomyRes,
  pageRes,
  pageData,
  espaRes,
}: {
  allAppsTaxonomyRes: any;
  pageRes: any;
  pageData: any;
  espaRes: any;
}) {
  allAppsTaxonomyRes.sort((a: any, b: any) => a.id - b.id);

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

  const router = useRouter();
  const { theme } = useTheme();

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
      <Meta title={`${pageData?.title.rendered} | Crowdapps`} />
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
        pageRes && (
          <div>
            <div className="dark:bg-dark bg-white dark:text-white text-dark">
              <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
                {windowWidth && windowWidth >= 1024 ? <Theme /> : null}
                {windowWidth && windowWidth >= 1024 ? (
                  <LanguangeButton />
                ) : null}
              </div>
              <Menu />
              <PageHeader />
              {pageData && <PageContent page={pageData} />}
              <Contact />
              {allAppsTaxonomyRes && espaRes && (
                <Footer sectors={allAppsTaxonomyRes} espa={espaRes} />
              )}
              <BackToTopButton />
            </div>
          </div>
        )
      )}
    </>
  );
}
