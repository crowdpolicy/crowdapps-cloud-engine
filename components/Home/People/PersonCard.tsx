import Image from "next/image";
import { typeOfPerson } from "../../../helpers/types/home";

export default function PersonCard(props: typeOfPerson) {
  return (
    <div className="flex flex-col items-center self-start w-[40vw] lg:w-[10vw]">
      <div className="relative w-20 h-24">
        <Image fill src={props?.profile} className="w-20 pb-5" alt="" />
      </div>
      <h5 className="font-semibold text-center text-[0.9rem]">
        {props?.fullName}
      </h5>
      <p className="font-light text-xs text-center">{props?.description}</p>
    </div>
  );
}
