import { GetServerSideProps } from "next";

// Helper function to generate XML sitemap structure
const generateSiteMap = (
  staticPages: string[],
  allApps: any[],
  customSlugs: any[],
  baseUrl: string
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => {
        return `
      <url>
        <loc>${baseUrl}${page}</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      `;
      })
      .join("")}
    ${allApps
      .map((app) => {
        return `
      <url>
        <loc>${baseUrl}/app/${app.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      `;
      })
      .join("")}
      ${customSlugs
        .map((page) => {
          return `
        <url>
          <loc>${baseUrl}/${page.slug}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
        `;
        })
        .join("")}
      
  </urlset>
  `;
};

// Fetching the same data as in your apps.tsx
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://hello.crowdapps.cloud";

  // Define your static pages
  const staticPages = [
    "/", // Home page
    "/partners",
    "/apps",
  ];

  // Fetch dynamic data for categories, apps, and taxonomy
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const fetchWithDelay = async (url: string, ms: number) => {
    await delay(ms);
    const res = await fetch(url);
    return res.json();
  };

  const [appsRes, customSlugs] = await Promise.all([
    fetchWithDelay(
      `${process.env.VITE_API_ROOT}/apps?orderby=id&order=asc&per_page=100`,
      500
    ),
    fetchWithDelay(`${process.env.VITE_API_ROOT}/pages`, 500), // Fetch dynamic slugs for custom pages
  ]);

  // Generate XML sitemap including static and dynamic pages
  const sitemap = generateSiteMap(staticPages, appsRes, customSlugs, baseUrl);

  // Set the content type to XML
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return <></>;
}
