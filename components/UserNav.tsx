import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex items-center justify-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
            <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            <img
              src={user?.picture ?? "/user.png"}
              alt="Image of the user"
              className="rounded-full h-8 w-8 hidden lg:block"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {user ? (
            <>
              <DropdownMenuItem>
                <Link href="/create-listing" className="w-full text-start">
                  Airbnb you Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/listings" className="w-full">
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites" className="w-full">
                  My Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/reservations" className="w-full">
                  My Reservations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutLink className="w-full">Logout</LogoutLink>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <RegisterLink className="w-full">Register</RegisterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginLink className="w-full">Login</LoginLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNav;
