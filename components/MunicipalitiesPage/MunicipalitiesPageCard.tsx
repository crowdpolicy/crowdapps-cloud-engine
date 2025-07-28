import { useTheme } from "next-themes";
import { typeOfMunicipalityPageCard } from "../../helpers/types/home";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MunicipalitiesPageCard(
  props: typeOfMunicipalityPageCard
) {
  const { theme } = useTheme();
  const router = useRouter();

  const [hoveredAppIndex, setHoveredAppIndex] = useState<number | null>(null);

  const municipalityContent = props.municipality.content.rendered;
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      `<div>${municipalityContent}</div>`,
      "text/html"
    );

    const initialImages = doc.getElementsByTagName("img");
    const links = doc.getElementsByTagName("a");

    const imagesArray: string[] = [];
    if (initialImages.length > 0) {
      for (let i = 0; i < initialImages.length; i++) {
        const imageUrl = initialImages[i].getAttribute("src");
        if (imageUrl) {
          imagesArray.push(imageUrl);
        }
      }
    }

    const linksArray: string[] = [];

    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        const url = links[i].getAttribute("href");
        if (url) {
          linksArray.push(url);
        }
      }
    }
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-fit gap-y-5">
      <h2 className="text-left text-xl md:text-2xl font-semibol max-w-[80vw]">
        {props.municipality.title.rendered}
      </h2>
      <div className="municipality flex flex-col w-[80vw] max-h-fit max-w-[25rem] md:w-[35vw] md:h-[35vh] lg:w-[28vw]  lg:min-h-[35vh] lg:h-fit  xl:h-[10rem] xl:w-[20rem] border-black dark:border-white border rounded-3xl">
        <div className="relative bg-white h-[28vh] w-full lg:h-1/2 flex items-center justify-center border-b border-black overflow-hidden rounded-t-3xl">
          <a
            href={props.municipality.acf.municipality_url}
            target="_blank"
            className="w-fit h-fit flex justify-center"
          >
            <Image
              width={100}
              height={100}
              src={props.municipality.acf.logo}
              className="municipalityLogo max-md:w-52 max-w-52 w-40 max-h-72 object-contain self-center !relative"
              alt=""
            />
          </a>
        </div>
        <div className="flex justify-center items-start xl:items-center h-fit lg:h-1/2 py-6 px-5 xl:py-5">
          <div className="grid grid-cols-4 xl:grid-cols-5 items-center  h-fit gap-x-4 lg:gap-x-3 gap-y-3 xl:gap-y-4">
            {props.municipality.acf.apps?.map((_: any, index: number) => (
              <Link
                key={index}
                href={props.municipality.acf.apps[index].app_url}
                target="_blank"
                onMouseEnter={() => setHoveredAppIndex(index)}
                onMouseLeave={() => setHoveredAppIndex(null)}
                className="relative"
              >
                <Image
                  width={50}
                  height={50}
                  src={
                    theme === "light"
                      ? props.municipality.acf.apps[index].app_logo_dark
                      : props.municipality.acf.apps[index].app_logo_light
                  }
                  className="w-12 md:w-16 lg:w-14"
                  alt=""
                />
                {props.apps.map(
                  (app, appIndex) =>
                    app.title.rendered ===
                      props.municipality.acf.apps[index].app_title && (
                      <div
                        key={appIndex}
                        className={`${
                          hoveredAppIndex === index ? "flex" : "hidden"
                        } flex-col gap-0 absolute bottom-[4.5rem] -left-10 w-52 bg-white dark:bg-dark border border-black dark:border-white rounded-lg text-sm text-black dark:text-white px-4 py-3 z-100`}
                      >
                        <p className="font-bold text-base">
                          {props.municipality.acf.apps[index].app_title}
                        </p>
                        <p>{app.acf.description}</p>
                      </div>
                    )
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
