import { useEffect, useState } from "react";
import { typeOfPagination } from "../../helpers/types/home";
import prevArrowForDark from "../../assets/images/PREV_ARROW_FOR_DARK.svg";
import nextArrowForDark from "../../assets/images/NEXT_ARROW_FOR_DARK.svg";
import prevArrowForLight from "../../assets/images/Group 12293-1.svg";
import nextArrowForLight from "../../assets/images/Group 12293.svg";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Pagination(props: typeOfPagination) {
  const { theme } = useTheme();

  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.total / props.municipalitiesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  function handlePageClick(
    number: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    setActivePage(number);
    props.paginate(number);
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="flex flex-row flex-wrap lg:flex-nowrap mx-5 lg:mx-0 justify-center items-center gap-x-5 text-[1.8rem]">
        {activePage != 1 ? (
          <a
            href=""
            onClick={(e) => {
              handlePageClick(activePage - 1, e);
              props.paginate(activePage - 1);
            }}
          >
            {theme === "dark" ? (
              <Image
                src={prevArrowForDark}
                className="border rounded-3xl border-white py-3 px-4 w-[15vw] lg:w-[3.5vw]"
                alt=""
              />
            ) : (
              <Image
                src={prevArrowForLight}
                className=" border rounded-3xl border-black py-3 px-4 w-[15vw] lg:w-[3.5vw]"
                alt=""
              />
            )}
          </a>
        ) : theme === "dark" ? (
          <Image
            src={prevArrowForDark}
            className="disabledArrowForDark border rounded-3xl border-white py-3 px-4 w-[15vw] lg:w-[3.5vw]"
            alt=""
          />
        ) : (
          <Image
            src={prevArrowForLight}
            className="disabledArrowForLight border rounded-3xl border-black py-3 px-4 w-[15vw] lg:w-[3.5vw]"
            alt=""
          />
        )}
        {pageNumbers.map((number) => {
          return (
            <div
              key={number}
              className={`${activePage === number ? "active" : "inactive"}`}
            >
              <a
                href=""
                onClick={(e) => {
                  handlePageClick(number, e);
                  props.paginate(number);
                }}
              >
                {number}
              </a>
            </div>
          );
        })}
        {activePage < pageNumbers.length ? (
          <a
            href=""
            onClick={(e) => {
              handlePageClick(activePage + 1, e);
              props.paginate(activePage + 1);
            }}
          >
            <Image
              src={theme === "light" ? nextArrowForLight : nextArrowForDark}
              className="border rounded-3xl border-black dark:border-white py-3 px-4 w-[15vw] lg:w-[3.5vw]"
              alt=""
            />
          </a>
        ) : theme === "light" ? (
          <Image
            src={nextArrowForLight}
            className="disabledArrowForLight border rounded-3xl border-white py-3 px-4 w-[15vw] lg:w-[3.5vw]"
            alt=""
          />
        ) : (
          <Image
            src={nextArrowForDark}
            className="disabledArrowForDark border rounded-3xl border-black py-3 px-4 w-[15vw] lg:w-[3.5vw]"
            alt=""
          />
        )}
      </div>
    </div>
  );
}
