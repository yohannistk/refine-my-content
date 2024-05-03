"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import { UserNav } from "../ui/user-nav";
import logo from "@/public/logo.svg";
import { features } from "@/constants/app_data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getURL } from "@/utils/helpers";

interface Props {
  session: Session | null;
}

const NavLogo = () => {
  return (
    <Link
      href="/"
      className="mb-5 flex items-center font-medium md:mb-0 lg:w-auto lg:items-center lg:justify-center"
    >
      <Image
        className="rounded-full"
        src={logo}
        alt="Logo"
        width={35}
        height={35}
      />
      <span className="sr-only">Refine My Content</span>
    </Link>
  );
};

export default function Header({ session }: Props) {
  const pathname = usePathname();
  return (
    <header className="z-50 mb-9 h-20 w-full px-2 py-3">
      <div className="mx-auto flex h-full max-w-6xl shrink-0 items-center rounded-full bg-gray-800 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <NavLogo />
              {features.map((feature) => {
                return (
                  <SheetClose asChild>
                    <Link
                      key={feature.title}
                      href={feature.href}
                      className="hover:text-foreground"
                    >
                      {feature.title}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          className="mr-6 hidden text-xl font-bold text-white lg:flex"
          href="#"
        >
          {/* Pixel<span className="text-primary">Pulse</span> */}
          <NavLogo />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {features.map((feature) => {
              const isActive = getURL(pathname) == getURL(feature.href);
              console.log(getURL(feature.href));
              console.log(pathname);
              // console.log(pathname);
              return (
                <NavigationMenuLink asChild key={feature.href}>
                  <Link
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium  text-white transition-colors hover:bg-gray-700",
                      {
                        "bg-gray-700": isActive,
                      }
                    )}
                    href={feature.href}
                  >
                    {feature.title}
                  </Link>
                </NavigationMenuLink>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-2">
          {session ? (
            <UserNav
              avatarUrl={
                session.user.app_metadata.provider != "email"
                  ? session.user.user_metadata.avatar_url
                  : undefined
              }
              email={session.user.email!}
              userName={session.user.user_metadata.user_name}
            />
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Sign in
              </Link>
              <Link href={"/sign-up"} className={buttonVariants()}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShirtIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
