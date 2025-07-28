import Image from "next/image";
import { typeOfAwardCard } from "../../../helpers/types/home";

export default function AwardCard(props: typeOfAwardCard) {
  return (
    <div className="relative flex flex-row !w-fit  justify-center py-14 pl-12 pr-12 lg:pr-0">
      <div className="h-56 w-60 md:h-64 md:w-80 static rounded-3xl border border-[#110529] dark:border-white">
        <div>
          <Image
            width={100}
            height={100}
            src={props.award}
            alt="Award icon"
            className="w-20 absolute top-4 left-2 md:left-2 xl:left-2"
          />
        </div>
        <div className="h-2/5 bg-white border-b border-black dark:border-b-0 rounded-t-3xl flex flex-row gap-x-2 justify-evenly max-w-full px-3">
          <div className="relative w-[80%] ">
            <Image
              fill
              src={props.municipality}
              className="p-5 object-contain"
              alt="Municipality Logo"
            />
          </div>
          <div className="relative w-[40%]">
            <Image fill src={props.appDark} className="p-5 " alt="App" />
          </div>
        </div>
        <div className="h-3/5 flex ">
          <div
            className="px-3 py-2 text-left font-semibold "
            dangerouslySetInnerHTML={{ __html: props.title }}
          />
        </div>
      </div>
    </div>
  );
}
