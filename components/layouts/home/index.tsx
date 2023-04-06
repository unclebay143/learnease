import React, { ReactNode, useEffect, useState } from "react";
import Meta from "../meta";
import Footer from "@/components/home/footer";
import PageBackground from "@/components/shared/background";
import { useSession } from "next-auth/react";

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
  }, []);

  return (
    <div className='flex justify-between flex-col min-h-screen selection:bg-green-300/75'>
      <Meta {...meta} />
      <PageBackground />
      <div className='z-20'>
        {currentlyLoggedInUser?.credits === 0 &&
          currentlyLoggedInUser?.freeCredits === 0 && (
            <div className='flex flex-wrap items-center justify-center text-center bg-green-700 bg-opacity-90 z-30 p-2 text-sm text-gray-100'>
              <p> You&apos;ve exhausted your allocated credits.</p>
              <button className='hover:underline underline-offset-2 rounded font-semibold p-1 text-gray-100 ml-1'>
                Click here to buy credits!
              </button>
            </div>
          )}
        {children}
      </div>
      <Footer />
    </div>
  );
}
