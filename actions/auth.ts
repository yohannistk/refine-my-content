"use server";

import { createClient } from "@/utils/supabase/server";
import { SignUnDto } from "@/zod_schemas";

export async function signUpWithEmailPassword(dto: SignUnDto) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password,
  });

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}
