import Image from "next/image";
import Link from "next/link";
import crowdappsForDark from "../../assets/images/Header/CROWDAPPS_LOGO_LIGHT.svg";
import crowdappsForLight from "../../assets/images/Header/CROWDAPPS_LOGO_BLACK.svg";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeaderAllApps() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header>
      <div className="lg:ml-24 lg:w-fit">
        <div className="mx-3 my-3 lg:block hidden absolute left-28">
          <Link href={`/`} className="lg:block w-fit">
            <Image
              src={theme === "light" ? crowdappsForLight : crowdappsForDark}
              className="max-w-36 w-36 h-fit pt-5 hidden lg:block"
              alt="CrowdApps Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
