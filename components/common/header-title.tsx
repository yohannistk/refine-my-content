"use client";
import { features } from "@/constants/app_data";
import { getURL } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderTitle = () => {
  const pathname = usePathname();

  const compare = features.find(
    (feature) => getURL(feature.href) == getURL(pathname)
  )?.title;
  const title = compare ? compare : "";

  return <div className="text-sm font-bold md:text-xl">{title}</div>;
};

export default HeaderTitle;
