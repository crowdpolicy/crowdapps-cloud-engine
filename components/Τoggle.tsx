import { useState } from "react";
import { Switch } from "@headlessui/react";

import { typePropsToggle } from "../helpers/types/home";
import { useTheme } from "next-themes";
import Image from "next/image";

import popular from "../assets/images/popular.svg";

export default function Toggle(props: typePropsToggle) {
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(props.id === props.openNow);

  const handleChange = () => {
    setEnabled(!enabled);
    if (props.onChange) {
      props.onChange();
    }
  };

  return (
    <div id={props.id} className="flex flex-row items-center gap-x-4">
      <Switch
        checked={props.openNow === props.id}
        onChange={handleChange}
        className={`${
          props.openNow === `toggle${props.id}`
            ? "border-black dark:border-[#ececec]"
            : "border-[#515451] dark:border-[#ececec]"
        } dark:bg-dark relative inline-flex h-11 w-24 items-center rounded-full border`}
      >
        {props.slug === "all-applications" ? (
          <span
            style={{
              background:
                theme === "light"
                  ? props.openNow === props.id
                    ? "#000000"
                    : "#999999"
                  : props.openNow === props.id
                  ? "#FFFFFF"
                  : "#FFFFFFBF",
            }}
            className={`${
              props.openNow === props.id ? "turnOn" : "turnOff"
            } absolute inline-block h-9 w-9 transform rounded-full transition-all duration-300`}
          />
        ) : props.slug === "dimofili" || props.slug === "dimofili-en" ? (
          <span
            className={`${
              props.openNow === props.id ? "turnOn" : "turnOff"
            } absolute inline-block h-9 w-9 transform rounded-full transition-all duration-300`}
          >
            <Image src={popular} alt="" />
          </span>
        ) : (
          <span
            style={{
              background:
                props.openNow === props.id ? props.colors.on : props.colors.off,
            }}
            className={`${
              props.openNow === props.id ? "turnOn" : "turnOff"
            } absolute inline-block h-9 w-9 transform rounded-full transition-all duration-300`}
          />
        )}
      </Switch>
      <p
        className={`${
          props.openNow === props.id
            ? "text-black dark:text-white"
            : "text-[#515451] dark:text-gray"
        } transition-all duration-700 text-left w-64 font-medium`}
      >
        {props.text}
      </p>
    </div>
  );
}
