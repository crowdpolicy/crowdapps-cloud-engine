import buttonArrow from "../../assets/images/BUTTON_ARROW_BLACK.svg";
import { useTheme } from "next-themes";
import { typeOfMeetCityOn } from "../../helpers/types/home";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnderHeaderSection(props: typeOfMeetCityOn) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="meetCityOn"
      className=" flex justify-start md:items-center items-start content-center lg:gap-x-20 lg:mx-[10rem] 2xl:ml-[21rem] lg:py-10 my-20 z-0 md:h-[80vh]"
    >
      <div className="relative w-[25vw] h-[50vh] hidden 2xl:block pt-5 ">
        <Image
          fill
          src={
            theme === "light"
              ? props.post?.acf?.image_dark
              : props.post?.acf?.image_light
          }
          alt="IMAGE"
          className="hidden lg:block w-full"
        />
      </div>
      <div className="w-full mx-6 md:mx-20 2xl:w-4/12 text-base md:text-lg md:text-left">
        <div
          className="text-left mb-12"
          dangerouslySetInnerHTML={{ __html: props.post?.content?.rendered }}
        ></div>
        <button className="btn w-fit UnderHeaderSectionButton my-5">
          <Link
            href="https://cityon.gr/"
            className="flex justify-between buttonLink"
            target="_blank"
          >
            {props.post?.acf?.button}
            <div className="pl-5 flex items-center">
              <Image src={buttonArrow} alt="" />
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
}
