import { typePropsArticleCard } from "../../helpers/types/home";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticleCard(props: typePropsArticleCard) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-row justify-center py-14 hover:pt-10 transition-all duration-300">
      <Link href={props.url}>
        <div
          className={`flex flex-col justify-between  h-80 w-72 p-4 rounded-3xl border border-[#110529] dark:border-white bg-[#F7F7F8] dark:bg-[#3d334e] text-left`}
        >
          <div className="flex justify-center h-1/2 rounded-t-xl overflow-hidden mb-2">
            <Image src={props.image} className="w-full" alt="" />
          </div>
          <div className="flex flex-col justify-between h-1/2">
            <p className="font-semibold">{props.title}</p>
            <div className="flex flex-row justify-end border-t border-black dark:border-gray-100 pt-2 gap-x-4">
              <p>{props.date}</p>
              <p style={{ color: `${props.color}` }}>{props.readTime}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
