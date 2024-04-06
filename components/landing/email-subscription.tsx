"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingDots from "../ui/LoadingDots";

const EmailSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/mailchimp`, { email });
      toast.success("Successfully! 🎉 You are now subscribed.");
    } catch (e) {
      toast.error(
        "Your e-mail address is invalid or you are already subscribed!"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={subscribe}
      className="mx-auto mt-6 flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0"
    >
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        id="email"
        type="email"
        placeholder="Email Address"
      />

      <Button className="mt-4" disabled={loading}>
        {loading ? <LoadingDots color="white" style="large" /> : "Subscribe"}
      </Button>
    </form>
  );
};

export default EmailSubscription;
