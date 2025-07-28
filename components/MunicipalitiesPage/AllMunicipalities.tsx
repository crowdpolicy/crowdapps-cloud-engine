import { useEffect, useRef, useState } from "react";
import { typeOfAllMunicipalities } from "../../helpers/types/home";
import MunicipalitiesPageCard from "./MunicipalitiesPageCard";
import Pagination from "./Pagination";
import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import filterBlack from "../../assets/images/Partners/filter-black.svg";
import filterWhite from "../../assets/images/Partners/filter-white.svg";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AllMunicipalities/translations.json";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function AllMunicipalities(props: typeOfAllMunicipalities) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const [showDropdown, setShowDropdown] = useState(false);

  const [municipalitiesFilter, setMuniciaplitiesFilter] = useState(
    props.municipalities
  );
  const [filters, setFilters] = useState<string[]>([]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const postPerPage = 10;

  // const indxOfLastPost = currentPage * postPerPage;
  // const indxOfFirstPost = indxOfLastPost - postPerPage;
  // const currentPosts = props.municipalities.slice(
  //   indxOfFirstPost,
  //   indxOfLastPost
  // );

  // change page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const changeFilters = (e: any, app: string) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilters((prevFilters) => [...prevFilters, app]);
    } else {
      setFilters((prevFilters) => prevFilters.filter((filt) => filt != app));
    }
  };

  const clearFilters = () => {
    const checkboxes = document.querySelectorAll(".checkboxes");

    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
    setFilters([]);
  };

  const submitFilter = () => {
    setShowDropdown(false);
    setMuniciaplitiesFilter([]);
    filters.length > 0
      ? filters.map((filter) => {
          props.municipalities.map((municipality) => {
            municipality.acf.apps.map((app: any) => {
              if (app.app_title === filter) {
                setMuniciaplitiesFilter((prevMunicipalities) => [
                  ...prevMunicipalities,
                  municipality,
                ]);
              }
            });
          });
        })
      : setMuniciaplitiesFilter(props.municipalities);
  };

  const sortedMunicipalities = [...props.municipalities].sort((a, b) => {
    const nameA = String(a.title.rendered).toLowerCase();
    const nameB = String(b.title.rendered).toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative flex flex-col justify-center items-center text-dark dark:text-white ">
      <div className="mx-3 my-3 lg:block hidden absolute top-0 left-28">
        <Link href={`/`} className="lg:block w-fit">
          <Image
            src={theme === "light" ? crowdappsForLight : crowdappsForDark}
            className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
            alt="CrowdApps Logo"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-y-20 mt-32 ml-[10vw]  md:max-2xl:mr-[5vw] 2xl:w-[83%] ">
        <div className="flex items-center max-md:gap-10 justify-between mt-8 md:mt-20 lg:mt-0 2xl:w-[95%]">
          <h1 className="text-left ml-5 lg:mx-0  text-3xl lg:text-4xl font-bold">
            {translations[locale as keyof typeof translations]["title"]}
          </h1>
          <div className="xl:relative max-md:mr-5">
            <button
              ref={buttonRef}
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              {theme === "dark" ? (
                <Image src={filterWhite} alt="" className="w-8" />
              ) : (
                <Image src={filterBlack} alt="" className="w-8" />
              )}
            </button>
            <div
              ref={dropdownRef}
              className={`${
                showDropdown ? "flex" : "hidden"
              } absolute flex-col max-lg:my-10 max-sm:right-[5%] max-md:right-0 md:right-10 lg:right-[10%] xl:right-5 z-1000 shadow max-md:w-[90vw] max-lg:h-screen 2xl:w-[20vw] max-h-[70vh]`}
            >
              <div className="flex flex-col gap-0 bg-white px-8 py-6 max-h-[70vh] rounded-t-2xl overflow-y-scroll no-scrollbar">
                <ul className="flex flex-col gap-2 m-0">
                  {props.apps.map((app, index) => {
                    return (
                      <li
                        key={index}
                        className="dark:text-dark text-black flex items-start gap-4 filterLi"
                      >
                        <input
                          type="checkbox"
                          value={app.title.rendered}
                          onChange={(e) => changeFilters(e, app.title.rendered)}
                          className="min-w-4 mt-1  checkboxes relative appearance-none shrink-0 w-4 h-4 border border-gray-400 rounded-sm  bg-white
        focus:outline-none focus:ring-offset-0 focus:ring-0 
        checked:bg-[#110529] checked:border-0
        disabled:border-steel-400 disabled:bg-steel-400
        "
                        />
                        <p className="font-semibold text-dark">
                          {app.title.rendered}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex w-full rounded-b-2xl shadow-lg">
                <button
                  onClick={() => clearFilters()}
                  className="bg-gray-50 text-dark border-b border-r border-gray-50 text-sm w-1/2 py-2 rounded-bl-2xl"
                >
                  {locale === "el" ? "Εκκαθάριση όλων" : "Clear all"}
                </button>
                <button
                  onClick={() => submitFilter()}
                  className="bg-[#110529] border-b border-r border-gray-50 w-1/2  font-semibold rounded-br-2xl"
                >
                  {locale === "el" ? "Αναζήτηση" : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center"> */}
        <div
          id="partners"
          className="partners flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3  lg:gap-x-20 xl:gap-x-5 gap-y-20"
        >
          {/* {currentPosts.map((municipality, index) => { */}
          {municipalitiesFilter.map((municipality, index) => {
            return (
              <MunicipalitiesPageCard
                key={index}
                municipality={municipality}
                apps={props.apps}
              />
            );
          })}
        </div>
        {/* </div> */}
        {/* <Pagination
          municipalitiesPerPage={postPerPage}
          total={props.municipalities.length}
          paginate={paginate}
        /> */}
      </div>
    </section>
  );
}
