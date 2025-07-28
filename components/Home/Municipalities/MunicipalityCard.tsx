import { typeOfMunicipality } from "../../../helpers/types/home";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MunicipalityCard(props: typeOfMunicipality) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="municipality flex flex-row justify-center py-14">
        <div className="flex flex-col h-80 w-64 rounded-3xl border border-[#110529] dark:border-white overflow-hidden">
          <div className=" flex p-4 bg-white border-b border-[#110529] dark:border-b-0 h-1/2 justify-center">
            <a
              href={props.municipalityUrl}
              className="h-full py-3"
              target="_blank"
            >
              <Image
                width={200}
                height={200}
                src={props.logo}
                className="municipalityLogo h-full object-contain"
                alt=""
              />
            </a>
          </div>
          <div className="flex flex-col p-3 text-left h-1/2 justify-center my-2">
            <div className="flex justify-start h-[60%] ">
              <a
                href={props.municipalityUrl}
                className="text-xl font-semibold dark:text-white text-dark"
                dangerouslySetInnerHTML={{ __html: props.title }}
              ></a>
            </div>
            <div className="flex flex-row justify-start gap-x-2 px-3 h-[40%]">
              {props.apps?.slice(0, 4).map((_, index) => (
                <Link
                  href={props.apps[index].app_url}
                  target="_blank"
                  key={index}
                  className="relative max-w-[25%] w-24 max-h-14"
                >
                  <Image
                    fill
                    src={
                      theme === "light"
                        ? props.apps[index].app_logo_dark
                        : props.apps[index].app_logo_light
                    }
                    className="w-12"
                    alt=""
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
