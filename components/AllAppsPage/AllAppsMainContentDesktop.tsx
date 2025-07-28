import {
  Post,
  Category,
  typeOfAllAppsMainContent,
} from "../../helpers/types/home";
import { useState, useEffect } from "react";
import AppSolutionCard from "../Home/AppSolutions/AppSolutionCard";
import Toggle from "../Τoggle";

// ======= TRANSLATIONS ======= //
import translations from "../../locales/AllAppsMobilePage/translations.json";
import { useRouter } from "next/router";

export default function AllAppsMainContentDesktop(
  props: typeOfAllAppsMainContent
) {
  const router = useRouter();
  const { locale } = router;

  const isAllServicesAdded = props.allAppsTaxonomy.find(
    (app) => app.description === ""
  );

  // Add "All applications" toggle
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

  // DESKTOP
  const [initialOpenToggleByName, setInitialOpenToggleByName] =
    useState<string>();
  const [initialOpenToggleById, setInitialOpenToggleById] = useState<string>();
  const [initialOpenToggleBySlug, setInitialOpenToggleBySlug] =
    useState<string>();
  const [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    setInitialOpenToggleById(`toggle${props.allAppsTaxonomy[0]?.id}`);
    setInitialOpenToggleByName(`${props.allAppsTaxonomy[0]?.name}`);
    setInitialOpenToggleBySlug(`${props.allAppsTaxonomy[0]?.slug}`);
  }, [
    props.allAppsTaxonomy,
    props.allApps,
    initialOpenToggleById,
    initialOpenToggleByName,
    initialOpenToggleBySlug,
  ]);

  const [openToggleId, setOpenToggleId] = useState(initialOpenToggleById);
  const [openToggleName, setOpenToggleName] = useState(initialOpenToggleByName);
  const [openToggleSlug, setOpenToggleSlug] = useState(initialOpenToggleBySlug);
  const [OpenToggleForFetch, setOpenToggleForFetch] = useState(0);

  useEffect(() => {
    setOpenToggleId(initialOpenToggleById);
    setOpenToggleName(initialOpenToggleByName);
  }, [initialOpenToggleById, initialOpenToggleByName]);

  const handleToggleChange = (
    toggleId: string,
    toggleName: string,
    toggleSlug: string
  ) => {
    let found = false;
    props.categories.map((category) => {
      if (toggleName === category.name) {
        setOpenToggleForFetch(category.id);
        found = true;
      }
      if (!found) {
        if (toggleSlug === "all-applications") {
          setOpenToggleForFetch(0);
        } else if (toggleSlug === "dimofili" || toggleSlug === "dimofili-en") {
          setOpenToggleForFetch(1);
        }
      }
    });
    setOpenToggleId(toggleId);
    setOpenToggleName(toggleName);
    setOpenToggleSlug(toggleSlug);
  };

  const shuffle = (array: Post[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkCategoriesWithToggle = (app: Post) => {
    return app.categories.some((category) => category === OpenToggleForFetch);
  };

  const checkCategoriesWithCard = (card: Post, category: Category) => {
    if (
      card.categories.some((cat) => cat === category.id) &&
      category.slug != "dimofili" &&
      category.slug != "dimofili-en"
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (OpenToggleForFetch != 0) {
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
      setCards(selectedApps);
    } else if (OpenToggleForFetch === 0) {
      const shuffledArray = shuffle(props.allApps);
      setCards(shuffledArray);
    }
  }, [OpenToggleForFetch, props.allApps]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="flex flex-col justify-center items-center lg:items-start pt-[13vh] xl:ml-[5rem]">
      <h1 className="text-left text-2xl w-[85vw] mt-6 lg:mt-0 lg:text-4xl lg:ml-[10vw] lg:w-fit font-semibold ">
        {translations[locale as keyof typeof translations]["title"]}
      </h1>
      <div className="lg:w-full">
        <div className="flex flex-col lg:flex-row mt-20 gap-x-20 justify-center items-start lg:w-full z-10">
          <div className="toglles hidden lg:flex flex-col gap-y-[6vh] lg:min-w-1/5">
            {Object.keys(props.allAppsTaxonomy).length &&
              props.allAppsTaxonomy.map((app, index) => {
                const toggleId = `toggle${app.id}`;
                const toggleName = `${app.name}`;
                const toggleSlug = `${app.slug}`;
                return (
                  <Toggle
                    key={index}
                    id={toggleId}
                    colors={{
                      on: app.description,
                      off: `${app.description}BF`,
                    }}
                    text={`${app.name}`}
                    onChange={() =>
                      handleToggleChange(toggleId, toggleName, toggleSlug)
                    }
                    openNow={openToggleId || ""}
                    slug={app.slug}
                  />
                );
              })}
          </div>
          <div
            id="cardsContainer"
            className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-10 md:gap-x-10 lg:gap-x-[5vw] lg:min-w-2/3 lg:w-[50%] lg:h-full "
          >
            {OpenToggleForFetch != 0 &&
            openToggleSlug != "dimofili" &&
            openToggleSlug != "dimofili-en"
              ? Object.keys(props.categories).length &&
                props.categories.map((category) => {
                  if (category.name === openToggleName) {
                    return cards.map((card: Post) => {
                      return (
                        <AppSolutionCard
                          key={card.id}
                          id={`${card.id}`}
                          slug={card.slug}
                          darkLogo={card?.acf?.app_logo_dark}
                          lightLogo={card?.acf?.app_logo_light}
                          title={`${card?.title?.rendered}`}
                          description={card?.acf?.description}
                          color={category.description}
                        />
                      );
                    });
                  }
                  return null;
                })
              : cards.map((card: Post) => {
                  return props.categories.map((category) => {
                    if (
                      card &&
                      card.categories &&
                      card.categories.length > 0 &&
                      checkCategoriesWithCard(card, category)
                    ) {
                      return (
                        <AppSolutionCard
                          key={card.id}
                          id={`${card.id}`}
                          slug={card.slug}
                          darkLogo={card?.acf?.app_logo_dark}
                          lightLogo={card?.acf?.app_logo_light}
                          title={`${card.title.rendered}`}
                          description={card.acf.description}
                          color={category.description}
                        />
                      );
                    }
                  });
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
