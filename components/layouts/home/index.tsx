import React, { ReactNode } from "react";
import Meta from "../meta";
import Footer from "@/components/home/footer";
import PageBackground from "@/components/shared/background";

export default function HomeLayout({
  meta,
  children,
}: {
  meta?: { title?: string; description?: string; image?: string };
  children: ReactNode;
}) {
  return (
    <div className='flex justify-between flex-col min-h-screen selection:bg-green-300/75'>
      <Meta {...meta} />
      <PageBackground />
      <div className='z-20'>{children}</div>
      <Footer />
    </div>
  );
}
