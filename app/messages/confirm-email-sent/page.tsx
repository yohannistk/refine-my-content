import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ConfirmEmailSent = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-6 sm:py-12">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-3 text-[42px] font-bold text-zinc-800">
          Check your inbox
        </h2>
        <p className="mb-3 text-lg text-zinc-500">
          We're excited to have you (almost) on board! Check your email for a
          confirmation and get started in no time.
        </p>
        <Link
          href="/sign-in"
          className={buttonVariants({
            size: "lg",
            className: "w-56 px-5 py-3 text-2xl font-extrabold",
          })}
        >
          Open the App →
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailSent;
