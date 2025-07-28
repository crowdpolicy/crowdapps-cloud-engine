import { Fragment, useEffect, useState } from "react";
import {
  Category,
  Post,
  typeOfAllAppsMainContent,
} from "../../helpers/types/home";
import { Combobox, Transition } from "@headlessui/react";
import dropdownArrowBlack from "../../assets/images/AllAppsMobilePage/Dropdown-arrow-black.svg";
import dropdownArrowWhite from "../../assets/images/AllAppsMobilePage/Dropdown-arrow-white.svg";
import AppSolutionsCard from "../Home/AppSolutions/AppSolutionCard";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AllAppsMobilePage/translations.json";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AllAppsMainContentMobile(
  props: typeOfAllAppsMainContent
) {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  const isAllServicesAdded = props.allAppsTaxonomy.find(
    (app) => app.description === ""
  );

  if ((locale === "el" || locale === "en") && !isAllServicesAdded) {
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 1000) + 1;
    } while (
      props.allApps.some((app) => app.id === newId) &&
      props.allAppsTaxonomy.some((tax) => tax.id === newId)
    );

    const allservices: Category = {
      id: newId,
      count: 0,
      description: "",
      name: locale === "el" ? "Όλες οι εφαρμογές" : "All applications",
      slug: "all-applications",
    };
    props.allAppsTaxonomy.unshift(allservices);
  }

  useEffect(() => {
    const dimofiliIndex = props.allAppsTaxonomy.findIndex(
      (tax) => tax.slug === "dimofili" || tax.slug === "dimofili-en"
    );

    if (dimofiliIndex > -1) {
      const [dimofili] = props.allAppsTaxonomy.splice(dimofiliIndex, 1);

      props.allAppsTaxonomy.splice(1, 0, dimofili);
    }
  }, [props.allAppsTaxonomy]);

  const [selectedAppName, setSelectedAppName] = useState(
    props.allAppsTaxonomy[0].name
  );
  const [selectedApp, setSelectedApp] = useState(props.allAppsTaxonomy[0]);
  const [selectedAppSlug, setSelectedAppSlug] = useState("");

  const [cards, setCards] = useState<Post[]>([]);
  const [currentApps, setCurrentApps] = useState<Post[]>([]);

  const [selectedAppForFetch, setSelectedAppForFetch] = useState(0);

  useEffect(() => {
    let initialFlag = false;
    props.categories.map((category) => {
      if (props.allAppsTaxonomy[0].name === category.name && !initialFlag) {
        setSelectedAppName(category.name);

        initialFlag = true;
      }
    });
  }, [props.categories, props.allAppsTaxonomy]);

  const selectApp = (value: string) => {
    let found = false;

    props.categories.map((category) => {
      if (value === category.name) {
        setSelectedAppForFetch(category.id);
        setSelectedApp(category);
        found = true;
      }
      if (!found) {
        setSelectedAppForFetch(0);
        setSelectedApp(props.allAppsTaxonomy[0]);
      }
    });
    setSelectedAppName(value);
  };

  const shuffle = (array: Post[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkCategoriesWithToggle = (app: Post) => {
    return app.categories.some((category) => category === selectedAppForFetch);
  };

  useEffect(() => {
    if (selectedAppForFetch != 0) {
      const selectedApps: Post[] = [];
      props.allApps?.map((app) => {
        if (
          app.categories &&
          app.categories.length > 0 &&
          checkCategoriesWithToggle(app)
        ) {
          selectedApps.push(app);
        }
      });
      setCurrentApps(selectedApps);
    } else if (selectedAppForFetch === 0) {
      const shuffledArray = shuffle(props.allApps);
      setCards(shuffledArray);
    }
  }, [props.allApps, selectedAppForFetch]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="flex flex-col justify-center items-center lg:items-start py-[10vh]">
      <h1 className="text-left text-2xl w-[85vw] mt-6 lg:mt-0 lg:text-4xl lg:ml-[10vw] lg:w-fit font-semibold ">
        {translations[locale as keyof typeof translations]["title"]}
      </h1>
      <div className="flex flex-col items-center">
        <div className="mt-10 w-[85vw]">
          <Combobox
            value={selectedAppName}
            onChange={(value) => selectApp(value)}
          >
            <div className="relative">
              <div
                style={{
                  backgroundColor: `${
                    selectedApp.slug === "all-applications"
                      ? theme === "light"
                        ? "#F6F6F6"
                        : "#F6F6F6"
                      : selectedApp.slug === "dimofili" ||
                        selectedApp.slug === "dimofili-en"
                      ? theme === "light"
                        ? "#3441FB80"
                        : "#3441FB50"
                      : theme === "light"
                      ? selectedApp.description + "80"
                      : selectedApp.description + "50"
                  }`,
                }}
                className="dropdown flex flex-row w-full cursor-default  overflow-hidden rounded-3xl text-left shadow-md sm:text-sm text-dark"
              >
                <Combobox.Input
                  className={`bg-transparent w-full text-base font-medium leading-5 pointer-events-none outline-none ${
                    selectedApp.slug === "all-applications"
                      ? "dark:text-dark"
                      : "dark:text-white"
                  } text-dark`}
                  inputMode="none"
                />
                <Combobox.Button className="flex w-5 h-5 items-center z-100 ml-2">
                  {selectedApp.slug != "all-applications" ? (
                    <Image
                      src={
                        theme === "light"
                          ? dropdownArrowBlack
                          : dropdownArrowWhite
                      }
                      className="h-5 w-5"
                      alt=""
                    />
                  ) : (
                    <Image
                      src={dropdownArrowBlack}
                      className="h-5 w-5"
                      alt=""
                    />
                  )}
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute bg-white rounded-2xl top-14 max-h-72 w-full overflow-auto text-left text-base !font-semibold text-dark shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ml-0 scrollbar-none z-10">
                  {props.allAppsTaxonomy.length === 0 ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    Object.keys(props.allAppsTaxonomy).length &&
                    props.allAppsTaxonomy.map((app) =>
                      app.slug === "all-applications" ||
                      app.slug === "dimofili" ||
                      app.slug === "dimofili-en" ? (
                        <Combobox.Option
                          style={{
                            color: `${
                              app.slug === "all-applications"
                                ? "#000000"
                                : "#3441FB"
                            }`,
                          }}
                          key={app.id}
                          className={`relative cursor-default select-none py-3 px-5 ${
                            app.name === selectedAppName && "bg-gray-100 "
                          }`}
                          value={app.name}
                        >
                          {app.name}
                        </Combobox.Option>
                      ) : (
                        <Combobox.Option
                          style={{ color: `${app.description}` }}
                          key={app.id}
                          className={`relative cursor-default select-none py-3 px-5 ${
                            app.name === selectedAppName && "bg-gray-100 "
                          }`}
                          value={app.name}
                        >
                          {app.name}
                        </Combobox.Option>
                      )
                    )
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className="flex flex-col gap-y-10 mt-12">
          {selectedAppForFetch != 0 &&
          selectedAppSlug != "dimofili" &&
          selectedAppSlug != "dimofili-en"
            ? currentApps?.map((app: Post, index) => {
                return (
                  <AppSolutionsCard
                    key={index}
                    id={`${app.id}`}
                    slug={app.slug}
                    darkLogo={app.acf.app_logo_dark}
                    lightLogo={app.acf.app_logo_light}
                    title={`${app.title.rendered}`}
                    description={app.acf.description}
                    color={selectedApp.description}
                  />
                );
              })
            : cards.map((card: Post) => {
                return (
                  <AppSolutionsCard
                    key={card.id}
                    id={`${card.id}`}
                    slug={card.slug}
                    darkLogo={card.acf.app_logo_dark}
                    lightLogo={card.acf.app_logo_light}
                    title={`${card.title.rendered}`}
                    description={card.acf.description}
                    color=""
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
}
