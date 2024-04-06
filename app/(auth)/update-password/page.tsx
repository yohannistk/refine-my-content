import Link from "next/link";
import React from "react";
import UpdatePasswordForm from "./components/update-password-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
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
          <h1 className="mb-3 text-2xl font-bold">Reset Your Password</h1>
          <div className="text-muted-foreground mb-8">
            <p>Reset Your Password</p>
          </div>

          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
