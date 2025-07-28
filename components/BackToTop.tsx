import { useState, useEffect } from "react";
import topForDark from "../assets/images/BackToTop/backToTopForDark.svg";
import topForLight from "../assets/images/BackToTop/backToTopForLight.svg";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div>
        <button
          className={`fixed bottom-8 right-8 flex justify-center items-center z-100 top ${
            backToTopButton ? "showBackToTop" : "hideBackToTop"
          }`}
          onClick={scrollUp}
        >
          <Image
            src={theme === "light" ? topForLight : topForDark}
            className={`${
              windowWidth && windowWidth < 1024 && "max-w-[4.5vw] w-full"
            }`}
            alt="Back to top icon"
          />
        </button>
      </div>
    </div>
  );
}
