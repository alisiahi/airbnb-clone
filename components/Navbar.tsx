import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../public/airbnb-desktop.png";
import MobileLogo from "../public/airbnb-icon.png";
import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

const Navbar = () => {
  return (
    <nav className="w-full border-b shadow-md">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="desktop logo"
            className="w-32 hidden lg:block"
          />
          <Image
            src={MobileLogo}
            alt="mobile logo"
            className="w-12 block lg:hidden"
          />
        </Link>
        <SearchComponent />

        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
