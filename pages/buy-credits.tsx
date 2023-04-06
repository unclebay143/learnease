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
  const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  // const handleCreditsPurchase = async (amount: number) => {
  //   const res = await fetch("/api/credits", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ amount }),
  //   });

  //   if (res.ok) {
  //     const { data } = await res.json();
  //     window.location.href = data?.data?.link;
  //   }
  // };

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
        fetchSavedPromptResponses={fetchSavedPromptResponses}
        currentlyLoggedInUser={currentlyLoggedInUser}
      />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <div className='px-5 md:px-20 flex justify-center items-center flex-col py-10 text-white'>
          <div className='max-w-screen-md'>
            <section className='text-center'>
              <h2 className='text-4xl mb-3'>Buy LearnEase Credits</h2>
              <p className='text-sm '>
                You currently have 0 credits. Purchase more below
              </p>
            </section>
          </div>
        </div>
      </Header>

      <section className='mb-32'>
        <AnimatePresence>
          <motion.ul
            {...FADE_IN_ANIMATION_SETTINGS}
            className='sm:mt-16 flex flex-wrap items-center justify-center '
          >
            <div className='flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-col justify-center items-center container'>
              <div className='py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full xl:max-w-min sm:w-full bg-white z-30'>
                <h1 className='text-gray-500 font-semibold text-xl text-center'>
                  20 Credits
                </h1>
                <div className='text-center py-4 px-7'>
                  <h1 className='text-gray-700 text-4xl font-black'>$5.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='text-center mt-3'>
                  <p className='text-sm text-gray-400'>
                    20 learning prompts response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(5)}
                  className='w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
              <div className='sm:rounded py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full xl:max-w-min sm:w-full bg-gray-700'>
                <h1 className='text-green-200 font-semibold text-xl text-center'>
                  100 Credits
                </h1>
                <div className='text-center py-4 px-7'>
                  <h1 className='text-white text-4xl font-black mb-2'>
                    $19.00
                  </h1>
                  <p className='text-gray-100 bg-gray-400 rounded text-sm inline-block px-2 py-[2px]'>
                    Most popular
                  </p>
                </div>
                <div className='h-px bg-green-200' />
                <div className='text-center mt-3'>
                  <p className='text-sm text-white text-opacity-80'>
                    100 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(19)}
                  className='bg-green-700 hover:bg-opacity-100 bg-opacity-90 w-full mt-6 mb-3 py-2 text-white font-semibold hover:shadow-xl duration-200'
                >
                  Buy Now
                </button>
              </div>
              <div className='py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full xl:max-w-min sm:w-full bg-white z-30'>
                <h1 className='text-gray-500 font-semibold text-xl text-center'>
                  250 Credits
                </h1>
                <div className='text-center py-4 px-7'>
                  <h1 className='text-gray-700 text-4xl font-black'>$35.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='text-center mt-3'>
                  <p className='text-sm text-gray-400'>
                    250 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(35)}
                  className='w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
              <div className='py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full xl:max-w-min sm:w-full bg-white z-30'>
                <h1 className='text-gray-500 font-semibold text-xl text-center'>
                  750 Credits
                </h1>
                <div className='text-center py-4 px-7'>
                  <h1 className='text-gray-700 text-4xl font-black'>$75.00</h1>
                </div>
                <div className='h-px bg-gray-200' />
                <div className='text-center mt-3'>
                  <p className='text-sm text-gray-400'>
                    750 learning prompt response
                  </p>
                </div>
                <button
                  onClick={() => handleCreditsPurchase(75)}
                  className='w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.ul>
        </AnimatePresence>
        <div className='flex justify-center items-center'>
          <div className='mt-16'>
            <h3 className='mb-7 text-2xl text-gray-500 font-semibold uppercase text-center tracking-px'>
              Features included
            </h3>
            <AnimatePresence>
              <motion.ul
                {...FADE_IN_ANIMATION_SETTINGS}
                className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'
              >
                {features.map((f, i) => {
                  return (
                    <li className='mb-4 flex items-center' key={i}>
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
        <section className='text-center my-10 px-6'>
          <button className='rounded-2xl font-semibold py-2 px-4 text-gray-700 text-sm sm:text-base border border-green-600'>
            Over{" "}
            <span className='text-green-600 font-semibold'>
              1 hundred users
            </span>{" "}
            have used LearnEase so far
          </button>
        </section>
      </section>
    </HomeLayout>
  );
}
