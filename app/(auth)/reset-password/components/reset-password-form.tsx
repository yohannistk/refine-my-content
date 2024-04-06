"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResetPasswordDto, resetPasswordSchema } from "@/zod_schemas";
import * as z from "zod";
import LoadingDots from "@/components/ui/LoadingDots";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getURL } from "@/utils/helpers";
export interface FormValues {
  email: string;
  password: string;
}

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const supabase = createClientComponentClient();
  const onSubmit = async ({ email }: ResetPasswordDto) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL("/update-password"),
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("check your inbox");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Email associated with your account"
          className="transition-colors"
          {...register("email", { required: true })}
          type="text"
          id="email"
          name="email"
        />
        {errors?.email && (
          <p className="my-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>

      <div>
        <Button
          disabled={isSubmitting}
          className="w-full font-semibold"
          type="submit"
        >
          {isSubmitting ? (
            <LoadingDots color="white" style="large" />
          ) : (
            "Send reset instructions"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
