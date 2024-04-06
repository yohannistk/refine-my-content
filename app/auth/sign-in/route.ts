import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";
import { signInSchema, signUpSchema } from "@/zod_schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const response = signInSchema.safeParse(body);
  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }
  const { email, password } = response.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return NextResponse.json(
      {
        error: { message: error.message },
      },
      { status: error.status }
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
