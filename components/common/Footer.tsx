import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import EmailSubscription from "../landing/email-subscription";
import Image from "next/image";
import logo from "@/public/logo.png";
export default function Footer() {
  return (
    <footer className="bg-secondary/55 container">
      <div className=" mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="max-w-lg sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight">
              Subscribe our newsletter to get update.
            </h1>
            <EmailSubscription />
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Products
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <Link
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Grammar Checker
              </Link>
              <Link
                href="/paraphraser"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Paraphraser
              </Link>
              <Link
                href="/summarizer"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Summarizer
              </Link>
              <Link
                href="/text-to-image"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Text To Image
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Company
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <Link
                href="/terms-and-conditions"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="flex items-center justify-center">
          <div className="">
            <span className="text-muted-foreground">
              © 2024 RefineMyContent. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
