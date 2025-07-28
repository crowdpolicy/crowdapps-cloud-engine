import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Theme from "../components/Theme";
import Menu from "../components/Menu";
import HeaderUnderConstruction from "../components/UnderConstruction/HeaderUnderConstruction";
import Contact from "../components/Contact";
import BackToTopButton from "../components/BackToTop";
import Footer from "../components/Footer";
import LanguangeButton from "../components/LanguageButton";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Meta from "@/components/Meta";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  const [allAppsTaxonomyRes, espaRes] = await Promise.all([
    // AllAppsTaxonomy
    fetch(`${process.env.VITE_API_ROOT}/allappscategories?lang=${locale}`).then(
      (res) => res.json()
    ),
    // ESPA
    fetch(`${process.env.VITE_API_ROOT_WP_SETTINGS}`).then((res) => res.json()),
  ]);
  return {
    props: {
      allAppsTaxonomyRes,
      espaRes,
    },
  };
};

export default function UnderConstruction({
  allAppsTaxonomyRes,
  espaRes,
}: {
  allAppsTaxonomyRes: any;
  espaRes: any;
}) {
  const { theme } = useTheme();
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

  allAppsTaxonomyRes?.data?.sort((a: any, b: any) => a.id - b.id);

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
        <div className="dark:bg-dark bg-white">
          <Meta
            title={`${
              locale === "en"
                ? "Under Construction | Crowdapps"
                : "Υπό Κατασκευή | Crowdapps"
            }`}
          />
          <div>
            <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
              {windowWidth && windowWidth >= 1024 && <Theme />}
              {windowWidth && windowWidth >= 1024 && <LanguangeButton />}
            </div>
            <Menu />
            <HeaderUnderConstruction />
            <Contact />
            <BackToTopButton />
            <Footer sectors={allAppsTaxonomyRes} espa={espaRes} />
          </div>
        </div>
      )}
    </>
  );
}
