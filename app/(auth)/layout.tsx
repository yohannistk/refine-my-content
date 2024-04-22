import React, { PropsWithChildren } from "react";
const AuthLayout = async ({ children }: PropsWithChildren) => {
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
