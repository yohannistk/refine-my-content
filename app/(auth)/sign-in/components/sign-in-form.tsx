"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/zod_schemas";
import * as z from "zod";
import LoadingDots from "@/components/ui/LoadingDots";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOff } from "lucide-react";
import { getURL } from "@/utils/helpers";
export interface FormValues {
  email: string;
  password: string;
}

type FormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async ({ email, password }: FormData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    window.location.href = getURL("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label htmlFor="email">Email</Label>
          <Link href="/reset-password" className="underline">
            Forgot your password?
          </Link>
        </div>

        <Input
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
        <Label htmlFor="password" className="mb-2 inline-flex">
          Password
        </Label>
        <div className="relative">
          <Input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
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
        <Button
          disabled={isSubmitting}
          className="w-full font-semibold"
          type="submit"
        >
          {isSubmitting ? (
            <LoadingDots color="white" style="large" />
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
