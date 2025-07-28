export interface typePropsH2 {
  text: string;
}

export interface typePropsSectionButton {
  text: string;
  url: string;
  newTab: boolean;
}

export interface typePropsSectionButtonForApp {
  text: string;
  color: string;
  url: string;
}

export interface typePropsArticleCard {
  key: number;
  color: string;
  title: string;
  image: string;
  date: string;
  readTime: string;
  url: string;
}

export interface typePropsToggle {
  id: string;
  colors: {
    on: string;
    off: string;
  };
  text: string;
  openNow: string;
  slug: string;
  onChange: () => void;
}

export interface typePropsAppSolutionCard {
  id: string;
  slug: string;
  darkLogo: string;
  lightLogo: string;
  title: string;
  description: string;
  color: string;
}

export interface Post {
  id: number;
  slug: string;
  categories: number[];
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: any;
}

export interface Category {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

export interface typeOfAppHeader {
  darkLogo: string;
  lightLogo: string;
  categoryName: string;
  color: string;
  title: string;
  description: string;
  mainText: any;
  projects: any[];
}

export interface typeOfMoreInfo {
  color: string;
  flyer: string;
  presentation: string;
}

export interface typeOfRelevantArticles {
  color: string;
  articles: Post[];
}
export interface typeOfAwardCard {
  title: string;
  award: string;
  municipality: string;
  appDark: string;
}

export interface typeOfMunicipality {
  title: string;
  logo: string;
  municipalityUrl: string;
  apps: any[];
}

export interface typeOfEvolveFetch {
  content: string;
  title: string;
  pubDate: string;
  link: string;
}
export interface typeOfEvolveCard {
  title: string;
  image: string;
  date: Date;
  url: string;
}

export interface typeOfSliderPerTab {
  videos: Post[];
}

export interface typeOfMunicipalityPageCard {
  municipality: Post;
  apps: Post[];
}

export interface typeOfPagination {
  municipalitiesPerPage: number;
  total: number;
  paginate: (pageNumber: number) => void;
}

export interface typeOfAllMunicipalities {
  municipalities: Post[];
  apps: Post[];
}

export interface typeOfAwards {
  awards: Post[];
}

export interface typeOfEvolves {
  evolves: typeOfEvolveFetch[];
}

export interface typeOfMapSection {
  municipalities: Post[];
  collabs: Post[];
}

export interface typeOfVideos {
  videos: Post[];
  categories: Category[];
}

export interface typeOfMunicipalities {
  municipalities: Post[];
}

export interface typeOfMeetCityOn {
  post: Post;
}

export interface typeOfHeader {
  text: Post;
  awards: Post[];
}

export interface typeOfAppSolution {
  allAppsTaxonomy: Category[];
  categories: Category[];
  mobileApps: Post[];
  allApps: Post[];
}

export interface typeOfAllAppsMainContent {
  allAppsTaxonomy: Category[];
  categories: Category[];
  allApps: Post[];
}

export interface typeOfPageContent {
  page: Post;
}

export interface typeOfFooter {
  sectors: Category[];
  espa?: typeOfEspaContent;
}

export interface typeOfPeople {
  people: Post[];
}

export interface typeOfPerson {
  profile: string;
  fullName: string;
  description: string;
}

export interface typeOfEspaContent {
  data: {
    espa: {
      isEnabled: boolean;
      img: string;
    } | null;
  };
}

export interface typeOfEspaResponse {
  data: {
    espa: {
      isEnabled: boolean;
      img: string;
    };
  };
}
