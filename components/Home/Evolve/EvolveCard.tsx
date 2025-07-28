/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { typeOfEvolveCard } from "../../../helpers/types/home";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EvolveCard(props: typeOfEvolveCard) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const dateString = props.date.toString();
  const splitDateTime = dateString.split(" ");

  const dayPart = splitDateTime[2];
  const yearPart = splitDateTime[3];

  const formatter = new Intl.DateTimeFormat(locale, { month: "short" });
  const formattedDate = formatter.format(props?.date);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-row justify-center py-12 hover:pt-10 transition-all duration-300 ">
      <Link href={props?.url} target="_blank">
        <div className="flex flex-col justify-between gap-y-2 h-80 w-72 p-4 rounded-3xl border border-[#110529] dark:border-white bg-[#F7F7F8] dark:bg-[#3d334e] text-left">
          <div className="flex justify-center h-1/2">
            <div className="relative w-full rounded-lg overflow-hidden">
              <img src={`${props?.image}`} alt="Evolve image" />
            </div>
          </div>
          <div className="flex flex-col justify-between h-1/2">
            <div
              className="font-semibold text-ellipsis overflow-hidden dark:text-white text-dark"
              dangerouslySetInnerHTML={{ __html: props?.title }}
            />
            <div
              className={`flex flex-row justify-end border-t border-black dark:border-gray-100 pt-2 gap-x-4 ${
                theme === "light" ? "text-[#09C7C2]" : "text-[#55FFE2]"
              }`}
            >
              <div>{formattedDate + ". " + dayPart + " " + yearPart}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
