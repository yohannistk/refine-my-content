import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import ContactUsForm from "./components/contact-us-form";

const ContactUs = () => {
  return (
    <section className="mb-20 mt-9">
      <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16 dark:text-gray-400">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactUs;
