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
import Github from "@/components/shared/icons/github";
import GetInTouch from "@/components/shared/get-in-touch";
import UsersCounter from "@/components/shared/users-counter";
import Testimonials from "@/components/shared/testimonials";

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
    "Mark response as favorites",
    "Personalize language to fit your needs",
    "Customize the level of professionalism",
    "Ability to request additional features",
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
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 rounded hover:shadow-xl hover:bg-gray-800'
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
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-green-700 rounded hover:bg-opacity-100 bg-opacity-90 hover:shadow-xl'
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
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 rounded hover:shadow-xl hover:bg-gray-800'
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
                  className='w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 rounded hover:shadow-xl hover:bg-gray-800'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.ul>
        </AnimatePresence>
        <div className='flex items-center justify-center'>
          <div className='mt-10 mb-5 group'>
            {/* <h3 className='text-2xl font-semibold text-center text-gray-500 uppercase mb-7 tracking-px'> */}
            {/* <h3 className='text-2xl font-bold text-center mb-7 tracking-px'> */}
            <h3 className='my-7 text-4xl font-medium leading-10 text-center text-gray-900'>
              <span className='relative mx-2 text-green-600 whitespace-nowrap'>
                Features
                <svg
                  aria-hidden='true'
                  viewBox='0 0 418 42'
                  className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
                  preserveAspectRatio='none'
                >
                  <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
                </svg>
              </span>
              included
            </h3>
            <AnimatePresence>
              <motion.ul
                {...FADE_IN_ANIMATION_SETTINGS}
                className='grid grid-cols-1 sm:grid-cols-2 gap-x-5'
              >
                {features.map((f, i) => {
                  return (
                    <li
                      className='flex items-center mb-4 text-gray-600 group-hover:text-black'
                      key={i}
                    >
                      <svg
                        className='mr-2 text-gray-600 group-hover:text-black'
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
        <UsersCounter />
        <Testimonials />
        <GetInTouch />
      </section>
    </HomeLayout>
  );
}
