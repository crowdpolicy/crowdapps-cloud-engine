import arrowW from "../../assets/images/BUTTON_ARROW_WHITE.svg";
import arrowD from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import info from "../../assets/images/INFO_I.svg";
import municipalitiesIcon from "../../assets/images/MapSection/MAP_INDEX_MUNICIPALITIES.svg";
import col from "../../assets/images/MapSection/MAP_COL_ICON.svg";
import mun from "@/assets/images/MapSection/MAP_MUN_ICON.svg";
import collabsIcon from "../../assets/images/MapSection/MAP_INDEX_COLLABS.svg";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import L from "leaflet";
// Import MarkerClusterGroup dynamically
import dynamic from "next/dynamic";
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), {
  ssr: false,
});
import "@react-leaflet/core"; // Import @react-leaflet/core directly
import "leaflet/dist/leaflet.css";

import { typeOfMapSection } from "../../helpers/types/home";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import translations from "../../locales/MapSection/translations.json";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MapSection(props: typeOfMapSection) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [infoOpen, setInfoOpen] = useState(false);

  const infoMap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      const handler = (e: TouchEvent) => {
        if (infoOpen) {
          if (infoMap.current && !infoMap.current.contains(e.target as Node)) {
            setInfoOpen(false);
            const item = document.querySelector(
              ".infoMap"
            ) as HTMLElement | null;
            if (item) {
              if (locale === "en") {
                item.style.right = "-22rem";
              } else {
                item.style.right = "-22.5rem";
              }
            }
          }
        }
      };

      document.addEventListener("touchstart", handler);

      return () => {
        document.removeEventListener("touchstart", handler);
      };
    }
  }, [infoOpen, locale]);

  const colPin = new L.Icon({
    iconUrl: col.src,
    iconSize: [32, 32],
  });
  const munPin = new L.Icon({
    iconUrl: mun.src,
    iconSize: [32, 32],
  });

  const createClusterCustomIcon = function (cluster: any) {
    return divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className:
        "custom-marker-cluster !flex justify-center items-center rounded-full font-medium text-lg border-solid border-[1px] border-white bg-[#FB7955] text-white",
      iconSize: [33, 33],
    });
  };

  function closeInfoMap() {
    const item = document.querySelector(".infoMap") as HTMLElement | null;

    if (item) {
      if (infoOpen) {
        setInfoOpen(!infoOpen);
        if (locale === "en") {
          item.style.right = "-22rem";
        } else {
          item.style.right = "-22.5rem";
        }
      } else {
        setInfoOpen(!infoOpen);
        item.style.right = "0";
      }
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  return (
    <section className="flex flex-col lg:flex-row relative py-20 lg:py-40 items-center lg:max-xl:justify-center overflow-x-hidden w-full">
      <div className="xl:w-[30%] lg:w-[40%] flex flex-col text-left pb-32 lg:py-32 px-[7vw] xl:pl-0 justify-start items-center gap-y-10 xl:ml-[21rem]">
        <h4 className="text-2xl md:text-3xl font-bold w-full">
          {translations[locale as keyof typeof translations]["title"]}
        </h4>
        <div className="hidden lg:flex flex-row justify-between w-full relative">
          <p>{translations[locale as keyof typeof translations]["subTitle"]}</p>
          <Image
            src={theme === "light" ? arrowD : arrowW}
            className="w-7 arrowMap absolute"
            alt="Click on the map"
          />
        </div>
      </div>
      <div className="w-[90vw] mt-18 lg:w-1/2 lg:pr-[8vw] h-[30vh] md:h-[45vh] lg:h-[50vh]">
        <div
          id="map"
          className="border rounded-3xl border-[#110529] dark:border-white h-full overflow-hidden z-10"
        >
          <MapContainer
            center={[38.515361639691704, 23.97996923337369]}
            zoom={windowWidth < 768 ? 4 : 5}
            style={
              windowWidth < 768
                ? { height: "32vh", width: "100%", zIndex: "10" }
                : windowWidth < 1024
                ? { height: "47vh", width: "100%", zIndex: "10" }
                : { height: "52vh", width: "100%", zIndex: "10" }
            }
            zoomControl={false}
          >
            {theme === "light" ? (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
              />
            ) : (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
              />
            )}
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {props.municipalities?.map((municipality, index) => {
                const coordinates = municipality.acf.coordinates;
                if (!coordinates) return null;
                const [latitude, longitude] = municipality.acf.coordinates
                  .split(",")
                  .map((coord: string) => parseFloat(coord.trim()));

                return (
                  <Marker
                    position={[latitude, longitude]}
                    icon={munPin}
                    key={index}
                  >
                    <Popup className="absolute w-fit">
                      <div className=" flex flex-row gap-x-4 lg:gap-x-6 justify-center items-center w-52 lg:w-auto  text-center ">
                        <div className="w-[30%]">
                          <Link href={municipality.acf?.municipality_url}>
                            <Image
                              width={100}
                              height={100}
                              src={municipality.acf?.logo}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col w-[70%]">
                          <Link href={municipality.acf?.municipality_url}>
                            <p
                              className="font-semibold text-sm lg:text-lg text-left !my-2 text-black"
                              dangerouslySetInnerHTML={{
                                __html: municipality.title.rendered,
                              }}
                            ></p>
                          </Link>
                          <ul className="flex flex-row items-center gap-x-2 !ml-0">
                            {municipality.acf?.apps
                              ?.slice(0, municipality.acf?.apps.length)
                              ?.map((app: any, index: number) => {
                                const appUrl = app?.app_url;
                                return (
                                  <li key={index}>
                                    <Link
                                      href={appUrl ? appUrl : ""}
                                      className=""
                                    >
                                      <Image
                                        width={40}
                                        height={40}
                                        src={
                                          municipality.acf.apps[index]
                                            ?.app_logo_dark
                                        }
                                        alt="App image"
                                      />
                                    </Link>
                                  </li>
                                  // )
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
            {props.collabs?.map((collab, index) => {
              const [latitude, longitude] = collab.acf.coordinates
                .split(",")
                .map((coord: string) => parseFloat(coord.trim()));

              return (
                <Marker
                  position={[latitude, longitude]}
                  icon={colPin}
                  key={index}
                >
                  <Popup className="absolute w-fit">
                    <div className="flex flex-row gap-x-4 justify-center items-center w-52 lg:w-auto">
                      <div className="relative w-10 lg:w-20">
                        <Image fill src={collab.acf.logo} alt="" />
                      </div>
                      <div className="flex flex-col">
                        <div
                          className="font-semibold  text-sm lg:text-lg !my-2"
                          dangerouslySetInnerHTML={{
                            __html: collab.title.rendered,
                          }}
                        ></div>
                        <ul className="flex flex-row gap-x-2 lg:gap-x-4 !ml-0">
                          {props.collabs.slice(0, 4).map((_, index) => (
                            <li key={index}>
                              <Link
                                href={collab.acf.apps[index]?.app_url}
                                className="relative"
                              >
                                <Image
                                  fill
                                  src={collab.acf.apps[index]?.app_logo}
                                  className="w-12"
                                  alt=""
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
      <div
        className={`${
          locale === "el"
            ? "-right-[22.5rem] md:-right-[26rem]"
            : "-right-[22rem] md:-right-[25.5rem]"
        } infoMap hover:right-0 absolute top-[35%] md:top-[5%] flex flex-col z-100 transition-all ease-in duration-500 `}
      >
        <div
          ref={infoMap}
          className="flex items-center gap-x-3 bg-[#3441FB] p-2 rounded-l-full"
        >
          <Image
            src={info}
            onClick={() => {
              windowWidth < 1024 ? closeInfoMap() : null;
            }}
            alt="Info icon"
          />
          <p className="px-5 text-white text-[1.2rem] md:text-[1.4rem] font-semibold">
            {translations[locale as keyof typeof translations]["memorandum"]}
          </p>
        </div>
        <div className="bg-[#c5c5c5] dark:bg-white text-black font-semibold p-4 ml-[6em] rounded-bl-lg">
          <ul className="flex flex-col text-left gap-y-2 text-[0.9rem] md:text-[1.1rem]">
            <li className="flex flex-row items-center gap-x-3">
              <Image src={municipalitiesIcon} alt="Municipalities icon" />
              {
                translations[locale as keyof typeof translations][
                  "municipalities"
                ]
              }
            </li>
            <li className="flex flex-row items-center gap-x-3">
              <Image src={collabsIcon} alt="Collabs icon" />
              {
                translations[locale as keyof typeof translations][
                  "collaborations"
                ]
              }
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
