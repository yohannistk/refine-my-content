import Link from "next/link";
import React from "react";
import SignUpForm from "./components/sign-up-form";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { Button, buttonVariants } from "@/components/ui/button";
import OAuthForm from "../sign-in/components/oauth-form";
import { ChevronLeft } from "lucide-react";

const SignUp = () => {
  const signInWithGoogle = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
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
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-lg p-6">
          <h1 className="mb-3 mt-9 text-2xl font-bold">Create Your Account</h1>
          <div className="text-muted-foreground mb-8">
            <p>
              Already have an account?
              <Link href="/sign-in" className="underline">
                {" "}
                Login here
              </Link>
            </p>
          </div>

          <SignUpForm />

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

export default SignUp;
