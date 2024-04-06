"use client";
import LoadingDots from "@/components/ui/LoadingDots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactUsDto, contactUsSchema } from "@/zod_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsDto>({
    resolver: zodResolver(contactUsSchema),
  });

  const onSubmit = async (data: ContactUsDto) => {
    try {
      await axios.post("api/contact", data);
      toast.success("Email sent");
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label htmlFor="email">Your email</Label>
        <Input
          id="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors?.email && (
          <p className="my-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          {...register("subject", {
            required: true,
          })}
        />
        {errors?.subject && (
          <p className="my-2 text-sm text-red-600">
            {errors?.subject?.message}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          {...register("message", {
            required: true,
          })}
        />
        {errors?.message && (
          <p className="my-2 text-sm text-red-600">
            {errors?.message?.message}
          </p>
        )}
      </div>

      <Button disabled={isSubmitting} className="w-full" type="submit">
        {isSubmitting ? (
          <LoadingDots color="white" style="large" />
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
};

export default ContactUsForm;
