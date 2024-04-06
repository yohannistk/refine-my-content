"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  UpdatePasswordDto,
  signInSchema,
  updatePasswordSchema,
} from "@/zod_schemas";
import * as z from "zod";
import LoadingDots from "@/components/ui/LoadingDots";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOff } from "lucide-react";

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordDto>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async ({ password }: UpdatePasswordDto) => {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      return;
    }
    console.log(data);
    toast.success("Password successfully updated");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="">
        <Label htmlFor="email">New password</Label>
        <div className="relative">
          <Input
            className="transition-colors"
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="current-password"
          />
          <span
            role="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <EyeIcon />}
          </span>
        </div>
        {errors?.password && (
          <p className="my-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword" className="mb-2 inline-flex">
          Comfirm new password
        </Label>
        <Input
          {...register("confirmPassword", { required: true })}
          type="text"
          id="confirmPassword"
          name="confirmPassword"
        />
        {errors?.confirmPassword && (
          <p className="my-2 text-sm text-red-600">
            {errors?.confirmPassword?.message}
          </p>
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
            "Update password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
