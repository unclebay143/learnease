import useLocalStorage from "@/lib/hooks/use-local-storage";
import React, { useEffect } from "react";

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
          <div className='flex flex-wrap items-center justify-center text-center bg-green-700 bg-opacity-90 z-30 p-2 text-sm text-gray-100'>
            <p> You&apos;ve exhausted your allocated credits.</p>
            <button className='hover:underline underline-offset-2 rounded font-semibold p-1 text-gray-100 ml-1'>
              Click here to buy credits!
            </button>
          </div>
        )}

      {!session && usedAppCount >= 2 && (
        <div className='flex flex-wrap items-center justify-center text-center bg-green-700 bg-opacity-90 z-30 p-2 text-sm text-gray-100'>
          <p> You&apos;ve exhausted your allocated credits.</p>
          <button className='hover:underline underline-offset-2 rounded font-semibold p-1 text-gray-100 ml-1'>
            Please log in to access 3 more credits.
          </button>
        </div>
      )}
    </>
  );
}

export default LowCreditBanner;
