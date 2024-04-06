import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

const Hero = () => {
  return (
    <section className="tails-selected-element pb-32 pt-16 md:px-0">
      <div className="container mx-auto max-w-6xl items-center px-8 xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full space-y-6 pb-6 sm:max-w-md sm:pr-5 md:space-y-4 md:pb-0 lg:max-w-lg lg:space-y-8 lg:pr-0 xl:space-y-9">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">
                  Unlock Your Writing Potential
                </span>
                <span> </span>
                <span
                  className="text-primary block xl:inline"
                  data-primary="indigo-600"
                >
                  With AI!
                </span>
              </h1>
              <p className="mx-auto text-base sm:max-w-md md:max-w-3xl lg:text-xl">
                Our AI writing assistant ensures your content shines while
                maintaining your reputation.
              </p>
              <div className="relative flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "lg",
                    className: "font-semibold",
                  })}
                >
                  Try It Free
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                  href="#_"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div
              className="h-auto w-full overflow-hidden rounded-md shadow-xl sm:rounded-xl"
              data-rounded="rounded-xl"
              data-rounded-max="rounded-full"
            >
              <img src="https://cdn.devdojo.com/images/november2020/hero-image.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
