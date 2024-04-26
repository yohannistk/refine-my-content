import React from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeChanger } from "../ui/theme-changer";
import { Session } from "@supabase/supabase-js";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { UserNav } from "../ui/user-nav";
import logo from "@/public/logo.png";
import Image from "next/image";
import { features } from "@/data/app_data";

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

const Header = (props: Props) => {
  const { session } = props;
  return (
    <header className="container mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-between py-5 md:flex-row">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLogo />
        {features.map((feature) => {
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="text-muted-foreground font-medium leading-6 hover:text-gray-900"
            >
              {feature.title}
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
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
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <ThemeChanger />

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
          <Link href={"/sign-in"}>
            <Avatar>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
