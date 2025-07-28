import { typePropsH2 } from "../helpers/types/home";
export default function H2(props: typePropsH2) {
  return (
    <div className="flex relative items-center justify-center w-full">
      <h2 className="border rounded-full border-[#110529] dark:border-gray-50 px-4 py-3 bg-white dark:bg-dark font-bold text-lg md:text-2xl w-fit z-10">
        {props.text}
      </h2>
      <hr className="h-px bg-dark border-0 dark:bg-light absolute w-full" />
    </div>
  );
}
