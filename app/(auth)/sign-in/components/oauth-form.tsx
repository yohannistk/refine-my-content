"use client";
import LoadingDots from "@/components/ui/LoadingDots";
import { Button } from "@/components/ui/button";
import { getURL } from "@/utils/helpers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import React, { useState } from "react";
import toast from "react-hot-toast";

const OAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const signInWithOAuth = async (provider: Provider) => {
    const supabase = createClientComponentClient();
    const redirectURL = getURL("/auth/callback");
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: redirectURL,
      },
    });
    if (error) {
      toast.error("Something went wrong");
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log(data);
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-between lg:flex-row">
      <div className="mb-2 w-full lg:mb-0">
        <Button
          onClick={() => signInWithOAuth("google")}
          type="button"
          variant={"outline"}
          className="text-muted-foreground flex w-full gap-3"
        >
          {loading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4"
              id="google"
            >
              <path
                fill="#fbbb00"
                d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
              ></path>
              <path
                fill="#518ef8"
                d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
              ></path>
              <path
                fill="#28b446"
                d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
              ></path>
              <path
                fill="#f14336"
                d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
              ></path>
            </svg>
          )}
          Continue with Google
        </Button>
      </div>
      {/* <div className="ml-0 w-full lg:ml-2 lg:w-1/2">
        <Button
          onClick={() => signInWithOAuth("github")}
          type="button"
          variant={"outline"}
          className="text-muted-foreground flex w-full gap-3"
        >
          {loading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="github"
                className="w-4 dark:hidden"
              >
                <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
              </svg>{" "}
              <svg
                aria-label="github"
                height="20"
                viewBox="0 0 14 14"
                className="hidden dark:block"
                width="20"
              >
                <path
                  d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                  fill="currentColor"
                  fill-rule="nonzero"
                ></path>
              </svg>
            </>
          )}
          Sign Up with Github{" "}
        </Button>
      </div> */}
    </div>
  );
};

export default OAuthForm;
