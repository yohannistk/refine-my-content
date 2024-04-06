"use client";

import Link from "next/link";
import Menu from "../ui/menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDown, MenuIcon, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { features } from "@/data/app_data";
import { ThemeChanger } from "../ui/theme-changer";
import { Session } from "@supabase/supabase-js";
import { UserNav } from "../ui/user-nav";
import Image from "next/image";
import logo from "@/public/logo.png";

interface Props {
  session: Session | null;
}

export default function Header({ session }: Props) {
  return (
    <header className="tails-selected-element hidden w-full px-8  md:block">
      <div className="container mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between py-5 md:flex-row">
        <div className="relative flex flex-col md:flex-row">
          <NavLogo />
          <nav className="mb-5 flex flex-wrap items-center text-base md:mb-0 md:ml-2 md:border-l md:border-gray-200 md:pl-2">
            <Menu />
          </nav>
        </div>

        <div className=" flex items-center gap-2 lg:justify-end">
          <ThemeChanger />
          {!session ? (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "link",
                  className: "font-semibold",
                })}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "default",
                  className: "font-semibold",
                })}
              >
                Get Started
              </Link>
            </>
          ) : (
            <UserNav
              avatarUrl={
                session.user.app_metadata.provider != "email"
                  ? session.user.user_metadata.avatar_url
                  : undefined
              }
              email={session.user.email!}
              userName={session.user.user_metadata.user_name}
            />
          )}
        </div>
      </div>
    </header>
  );
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
        width={40}
        height={40}
      />
    </Link>
  );
};

export function MobileHeader({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="tails-selected-element block w-full px-0 text-gray-700 md:hidden">
        <div className="container mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-between py-5">
          <NavLogo />
          <div className="flex items-center gap-2">
            {session ? (
              <UserNav
                avatarUrl={
                  session.user.app_metadata.provider != "email"
                    ? session.user.user_metadata.avatar_url
                    : undefined
                }
                email={session!.user.email!}
                userName={session.user.user_metadata.user_name}
              />
            ) : null}

            <ThemeChanger />

            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="p-5 md:hidden">
          <nav className="z-50">
            <ul className="flex h-full flex-col items-start justify-center ">
              <li>
                <HeaderMobileDropDown setIsMenuOpen={setIsMenuOpen} />
              </li>
              <li>
                <a
                  href=""
                  className="text-slate-gray inline-block py-2 leading-normal "
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-slate-gray inline-block py-2 leading-normal "
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
          {!session && (
            <div className="flex flex-col items-center space-y-1">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "block w-full text-center"
                )}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "block w-full text-center"
                )}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

interface HeaderMobileDropDownProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function HeaderMobileDropDown({
  setIsMenuOpen,
}: HeaderMobileDropDownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <li className="flex items-center gap-2">
          <button className="text-slate-gray inline-block py-2 leading-normal ">
            Products
          </button>
          <ChevronDown size={16} />
        </li>
      </PopoverTrigger>
      <PopoverContent className="ml-4 w-[200px] p-0">
        <ul>
          {features.map((feature) => {
            return (
              <li key={feature.href} className="my-2">
                <Link
                  href={feature.href}
                  onClick={(e) => {
                    setOpen(false);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex w-full justify-start border-0 text-sm font-medium"
                  )}
                >
                  {feature.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
