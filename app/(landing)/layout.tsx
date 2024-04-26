import Footer from "@/components/common/Footer";
import Header from "@/components/common/header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className="">
        <Header session={session} />
        <main className="">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
