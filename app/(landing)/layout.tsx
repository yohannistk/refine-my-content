import Footer from "@/components/common/footer";
import { cookies } from "next/headers";
import Header from "../../components/common/header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
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
          <div className="absolute inset-0 -z-10 h-screen bg-gray-900"></div>
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
