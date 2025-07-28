import { ThemeProvider, useTheme } from "next-themes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { setTheme } = useTheme();
  setTheme("dark");

  return (
    <ThemeProvider defaultTheme="dark" attribute="class" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;