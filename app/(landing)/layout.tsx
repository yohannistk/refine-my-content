import Footer from "@/components/common/Footer";
import Header, { MobileHeader } from "@/components/common/Header";
import RichTextEditor from "@/components/common/RichTextEditor";
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
      <MobileHeader session={session} />
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
