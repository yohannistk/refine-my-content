import { Features } from "@/data/app_data";
import Link from "next/link";
import React from "react";

interface Props {
  feature: Features;
}
const SingleApp = (props: Props) => {
  const { description, href, title } = props.feature;
  return (
    <Link href={href}>
      <div className="bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block cursor-pointer select-none space-y-1 rounded-md p-6 leading-none no-underline outline-none transition-colors hover:ring-2">
        <div className="mb-2 text-lg font-medium leading-none">{title}</div>
        <p className="text-muted-foreground line-clamp-2 leading-snug">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default SingleApp;
