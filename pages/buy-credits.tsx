import React, { useEffect, useState } from "react";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import SidebarDashboard from "@/components/dashboard/sidebar";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import {
  fetchSavedPromptResponses,
  getProfile,
  handleCreditsPurchase,
} from "@/lib/services";

export default function BuyCredits() {
  const { status, data: session } = useSession();
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState<{
    credits: number;
    freeCredits: number;
  } | null>(null);

  let totalUserCredits;

  if (currentlyLoggedInUser) {
    totalUserCredits =
      currentlyLoggedInUser?.freeCredits + currentlyLoggedInUser?.credits;
  }

  const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const features = [
    "Save your generated response",
    "Mark response as favorite",
    "Ability to request features",
    "Premium support by email",
  ];

  useEffect(() => {
    if (session) {
      getProfile().then((profile) => setCurrentlyLoggedInUser(profile));
      fetchSavedPromptResponses().then((responses) =>
        setSavedPromptResponses(responses)
      );
    }
  }, [session]);

  if (
    typeof window !== "undefined" &&
    status !== "loading" &&
    status === "unauthenticated"
  ) {
    return (window.location.href = "/");
  }
  return (
    <HomeLayout>
      <SidebarDashboard
        open={openSidebar}
        setOpen={setOpenSiderbar}
        savedPromptResponses={savedPromptResponses}
        setSavedPromptResponses={setSavedPromptResponses}
        currentlyLoggedInUser={currentlyLoggedInUser}
      />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <div className='flex flex-col items-center justify-center px-5 py-10 text-white md:px-20'>
          <div className='max-w-screen-md'>
            <section className='text-center'>
              <h2 className='mb-3 text-4xl'>Buy LearnEase Credits</h2>
              {currentlyLoggedInUser && (
                <AnimatePresence>
                  <motion.p
                    {...FADE_IN_ANIMATION_SETTINGS}
                    className='text-sm '
                  >
                    You currently have {totalUserCredits} credits. Purchase more
                    below
                  </motion.p>
                </AnimatePresence>
              )}
            </section>
          </div>
        </div>
      </Header>

      <section className='mb-32'>
        <AnimatePresence>
          <motion.ul
            {...FADE_IN_ANIMATION_SETTINGS}
            className='flex flex-wrap items-center justify-center sm:mt-16 '
          >
            <div className='container flex flex-col items-center justify-center sm:flex-col lg:flex-row xl:flex-row md:flex-col'>
              <div className='z-30 w-full px-8 py-12 bg-white sm:py-12 md:py-6 lg:py-6 xl:py-6 xl:max-w-min sm:w-full'>
                <h1 className='text-xl font-semibold text-center text-gray-500'>
                  20 Credits
                </h1>
                <div className='py-4 text-center px-7'>
                  <h1 className='text-4xl font-black text-gray-700'>$5.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='mt-3 text-center'>
                  <p className='text-sm text-gray-400'>
                    20 learning prompts response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(5)}
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
              <div className='w-full px-8 py-12 bg-gray-700 sm:rounded sm:py-12 md:py-6 lg:py-6 xl:py-6 xl:max-w-min sm:w-full'>
                <h1 className='text-xl font-semibold text-center text-green-200'>
                  100 Credits
                </h1>
                <div className='py-4 text-center px-7'>
                  <h1 className='mb-2 text-4xl font-black text-white'>
                    $19.00
                  </h1>
                  <p className='text-gray-100 bg-gray-400 rounded text-sm inline-block px-2 py-[2px]'>
                    Most popular
                  </p>
                </div>
                <div className='h-px bg-green-200' />
                <div className='mt-3 text-center'>
                  <p className='text-sm text-white text-opacity-80'>
                    100 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(19)}
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-green-700 hover:bg-opacity-100 bg-opacity-90 hover:shadow-xl'
                >
                  Buy Now
                </button>
              </div>
              <div className='z-30 w-full px-8 py-12 bg-white sm:py-12 md:py-6 lg:py-6 xl:py-6 xl:max-w-min sm:w-full'>
                <h1 className='text-xl font-semibold text-center text-gray-500'>
                  250 Credits
                </h1>
                <div className='py-4 text-center px-7'>
                  <h1 className='text-4xl font-black text-gray-700'>$35.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='mt-3 text-center'>
                  <p className='text-sm text-gray-400'>
                    250 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(35)}
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
              <div className='z-30 w-full px-8 py-12 bg-white sm:py-12 md:py-6 lg:py-6 xl:py-6 xl:max-w-min sm:w-full'>
                <h1 className='text-xl font-semibold text-center text-gray-500'>
                  750 Credits
                </h1>
                <div className='py-4 text-center px-7'>
                  <h1 className='text-4xl font-black text-gray-700'>$75.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='mt-3 text-center'>
                  <p className='text-sm text-gray-400'>
                    750 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(75)}
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.ul>
        </AnimatePresence>
        <div className='flex items-center justify-center'>
          <div className='mt-16'>
            <h3 className='text-2xl font-semibold text-center text-gray-500 uppercase mb-7 tracking-px'>
              Features included
            </h3>
            <AnimatePresence>
              <motion.ul
                {...FADE_IN_ANIMATION_SETTINGS}
                className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'
              >
                {features.map((f, i) => {
                  return (
                    <li className='flex items-center mb-4' key={i}>
                      <svg
                        className='mr-2 text-gray-600'
                        width={20}
                        height={20}
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <p className='font-semibold leading-normal'>{f}</p>
                    </li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
        <section className='px-6 my-10 text-center'>
          <button className='px-4 py-2 text-sm font-semibold text-gray-700 border border-green-600 rounded-2xl sm:text-base'>
            Over{" "}
            <span className='font-semibold text-green-600'>
              1 hundred users
            </span>{" "}
            have used LearnEase so far
          </button>
        </section>
      </section>
    </HomeLayout>
  );
}
