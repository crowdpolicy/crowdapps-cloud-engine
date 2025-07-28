import Header404 from "@/components/404/Header404";
import BackToTopButton from "@/components/BackToTop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguangeButton from "@/components/LanguageButton";
import Menu from "@/components/Menu";
import Meta from "@/components/Meta";
import Theme from "@/components/Theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingForDark from "../assets/animations/HD_LOADING_BLACK.json";
import LoadingForLight from "../assets/animations/HD_LOADING_WHITE.json";
import LoadingForDarkResp from "../assets/animations/RESP_LOADING_BLACK.json";
import LoadingForLightResp from "../assets/animations/RESP_LOADING_WHITE.json";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

export default function UnderConstruction() {
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
            title={`${locale === "en" ? "404 | Crowdapps" : "404 | Crowdapps"}`}
          />
          <div>
            <div className="absolute flex flex-row w-fit h-fit gap-x-4 top-7 right-7">
              {windowWidth && windowWidth >= 1024 && <Theme />}
              {windowWidth && windowWidth >= 1024 && <LanguangeButton />}
            </div>
            <Menu />
            <Header404 />
            <Contact />
            <BackToTopButton />
            <Footer
              sectors={[]}
              espa={{ data: { espa: { isEnabled: false, img: "" } } }}
            />
          </div>
        </div>
      )}
    </>
  );
}
