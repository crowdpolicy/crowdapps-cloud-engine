import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function PageHeader() {
  const { theme } = useTheme();
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <div className="ml-[6vw] w-fit lg:block hidden">
        <Link href={`/${locale}`}>
          <Image
            width={100}
            height={100}
            src={theme === "light" ? crowdappsForLight : crowdappsForDark}
            className="w-40 h-fit pt-5 hidden lg:block"
            alt="CrowdApps Logo"
          />
        </Link>
      </div>
    </>
  );
}
