import Link from "next/link";
import React from "react";
import SignInForm from "./components/sign-in-form";
import OAuthForm from "./components/oauth-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  return (
    <div className="relative flex">
      <div className="absolute left-5 top-5">
        <Link
          href={"/"}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ChevronLeft /> Home
        </Link>
      </div>
      <div className="mb-32 mt-14 flex w-full flex-1 items-center justify-center ">
        <div className="w-full max-w-lg p-6">
          <h1 className="mb-3 text-2xl font-bold">Login to Your Account</h1>
          <div className="text-muted-foreground mb-8">
            <p>
              Don't have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up here
              </Link>
            </p>
          </div>

          <SignInForm />
          <div className="text-muted-foreground mt-4 text-center text-sm">
            <p>OR</p>
          </div>
          <OAuthForm />
          <div className="mt-5 sm:text-center">
            <p className="text-muted-foreground text-xs sm:mx-auto sm:max-w-sm">
              By continuing, you agree to Supabase's{" "}
              <Link
                className="hover:text-foreground-light underline"
                href="/terms-and-conditions"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="hover:text-foreground-light underline"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              , and to receive periodic emails with updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
