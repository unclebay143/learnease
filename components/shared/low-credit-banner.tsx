import useLocalStorage from "@/lib/hooks/use-local-storage";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

function LowCreditBanner({
  currentlyLoggedInUser,
  session,
}: {
  currentlyLoggedInUser: any;
  session: any;
}) {
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db

  return (
    <>
      {currentlyLoggedInUser?.credits === 0 &&
        currentlyLoggedInUser?.freeCredits === 0 && (
          <div className='z-30 flex flex-wrap items-center justify-center p-2 text-sm text-center text-gray-100 bg-green-700 bg-opacity-90'>
            <p> You&apos;ve exhausted your allocated credits.</p>
            <Link
              href='/buy-credits'
              className='p-1 ml-1 font-semibold text-gray-100 rounded hover:underline underline-offset-2'
            >
              Click here to buy credits!
            </Link>
          </div>
        )}

      {!session && usedAppCount >= 2 && (
        <div className='z-30 flex flex-wrap items-center justify-center p-2 text-sm text-center text-gray-100 bg-green-700 bg-opacity-90'>
          <p> You&apos;ve exhausted your allocated credits.</p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className='p-1 ml-1 font-semibold text-gray-100 rounded hover:underline underline-offset-2'
          >
            Please log in to access 3 more credits.
          </button>
        </div>
      )}
    </>
  );
}

export default LowCreditBanner;
