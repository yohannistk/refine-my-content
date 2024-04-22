import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  User,
  Users2,
} from "lucide-react";
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
    <header className="bg-background sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b px-6 md:px-12">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLogo />

        <Link
          href="/"
          className="text-foreground hover:text-foreground transition-colors"
        >
          Grammar Checker
        </Link>
        <Link
          href="/paraphraser"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Paraphraser
        </Link>
        <Link
          href="/summarizer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Summarizer
        </Link>
        <Link
          href="/image-to-text"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Image To Text
        </Link>
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
                  <Link href={feature.href} className="hover:text-foreground">
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
    // <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    //   <Sheet>
    //     <SheetTrigger asChild>
    //       <Button size="icon" variant="outline" className="sm:hidden">
    //         <PanelLeft className="h-5 w-5" />
    //         <span className="sr-only">Toggle Menu</span>
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left" className="sm:max-w-xs">
    //       <nav className="grid gap-6 text-lg font-medium">
    //         <Link
    //           href="/"
    //           className="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
    //         >
    //           <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
    //           <span className="sr-only">Acme Inc</span>
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    //         >
    //           <Home className="h-5 w-5" />
    //           Grammar Checker
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-foreground flex items-center gap-4 px-2.5"
    //         >
    //           <ShoppingCart className="h-5 w-5" />
    //           Paraphraser
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    //         >
    //           <Package className="h-5 w-5" />
    //           Products
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    //         >
    //           <Users2 className="h-5 w-5" />
    //           Customers
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    //         >
    //           <LineChart className="h-5 w-5" />
    //           Settings
    //         </Link>
    //       </nav>
    //     </SheetContent>
    //   </Sheet>
    //   {/* <HeaderTitle /> */}
    //   <div className="relative ml-auto flex grow-0 items-center gap-3">
    //     <ThemeChanger />
    //     {session ? (
    //       <UserNav
    //         avatarUrl={
    //           session.user.app_metadata.provider != "email"
    //             ? session.user.user_metadata.avatar_url
    //             : undefined
    //         }
    //         email={session.user.email!}
    //         userName={session.user.user_metadata.user_name}
    //       />
    //     ) : (
    //       <Link href={"/sign-in"}>
    //         <Avatar>
    //           <AvatarFallback>
    //             <User />
    //           </AvatarFallback>
    //         </Avatar>
    //       </Link>
    //     )}
    //   </div>
    // </header>
  );
};

export default Header;
