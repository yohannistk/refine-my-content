"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignUnDto, signUpSchema } from "@/zod_schemas";
import LoadingDots from "@/components/ui/LoadingDots";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  user_name: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const supabase = createClientComponentClient();
  const router = useRouter();
  const onSubmit = async ({ email, password, user_name }: SignUnDto) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name,
        },
        emailRedirectTo: getURL("/auth/callback"),
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    } else if (data.user?.identities?.length === 0) {
      toast.error("User with this email already registered");
      return;
    }
    router.push("/messages/confirm-email-sent");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
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
        <Label htmlFor="user_name">Username</Label>
        <Input
          {...register("user_name", { required: true })}
          type="text"
          id="user_name"
          name="user_name"
        />
        {errors?.user_name && (
          <p className="my-2 text-sm text-red-600">
            {errors?.user_name?.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password", { required: true })}
          type="password"
          id="password"
          name="password"
          // autocomplete="off"
        />
        {errors?.password && (
          <p className="my-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
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
          variant={"secondary"}
          disabled={isSubmitting}
          className="w-full font-semibold"
          type="submit"
        >
          {isSubmitting ? (
            <LoadingDots color="white" style="large" />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
