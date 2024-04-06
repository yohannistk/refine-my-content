import Footer from "@/components/common/Footer";
import Header, { MobileHeader } from "@/components/common/Header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PropsWithChildren } from "react";
import { cookies } from "next/headers";
const AuthLayout = async ({ children }: PropsWithChildren) => {
  // const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  return (
    <>
      {/* <MobileHeader session={session} />
      <Header session={session} /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default AuthLayout;
