const config = {
  i18n: {
    locales: ["el", "en"],
    defaultLocale: "el",
    localeDetection: false,
  },
  experimental: {
    esmExternals: "loose",
  },
  reactStrictMode: true,
  transpilePackages: ["react-leaflet-cluster"],
  images: {
    domains: ["wpbck.crowdapps.cloud", "localhost", "cdn-images-1.medium.com"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  output: "standalone",
};

export default config;
