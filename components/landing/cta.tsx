import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="my-16">
      <div className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl tracking-tight md:text-5xl">
          Stop Struggling,
          <span className="text-primary"> Start Shining</span>
        </h2>

        <p className="text-muted-foreground mt-6 max-w-4xl text-center md:text-lg">
          Eliminate typos, rephrase clunky sentences, and get straight to the
          point with our AI writing assistant.
        </p>

        <div className="mt-6 inline-flex w-1/3  sm:w-auto">
          <Link
            className={buttonVariants({
              className: "rounded-e-full rounded-s-full font-semibold",
              size: "lg",
            })}
            href="/sing-up"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
