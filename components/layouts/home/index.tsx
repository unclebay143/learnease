import React, { ReactNode, useEffect, useState } from "react";
import Meta from "../meta";
import Footer from "@/components/home/footer";
import PageBackground from "@/components/shared/background";
import { useSession } from "next-auth/react";
import LowCreditBanner from "@/components/shared/low-credit-banner";

export default function HomeLayout({
  meta,
  children,
}: {
  meta?: { title?: string; description?: string; image?: string };
  children: ReactNode;
}) {
  const { status, data: session } = useSession();
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState<{
    credits: number;
    freeCredits: number;
  } | null>(null);

  const getProfile = async () => {
    const res = await fetch("/api/user");
    const { data } = await res.json();
    setCurrentlyLoggedInUser(data);
  };

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  return (
    <div className='flex flex-col justify-between min-h-screen selection:bg-green-300/75'>
      <Meta {...meta} />
      <PageBackground />
      <div className='z-20'>
        {status !== "loading" && (
          <LowCreditBanner
            currentlyLoggedInUser={currentlyLoggedInUser}
            session={session}
          />
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}
