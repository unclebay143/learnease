import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Image from "next/image";
type Props = {};

export default function Navbar({}: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // pass as prop or useSession

  return (
    <nav className='px-5 md:px-20 py-2 text-gray-400 z-20'>
      <div className='flex h-16 items-center justify-between'>
        <section className='flex space-x-1 items-center'>
          <Image
            src='/_static/icons/logo.png'
            width='25'
            height='25'
            alt='LearnEase logo'
          />
          <h3 className='text-2xl hidden md:inline-block text-gray-200'>
            LearnEase
          </h3>
        </section>

        <section className='hidden items-center space-x-4 text-md md:text-lg'>
          <a
            href='http://'
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center space-x-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='bi bi-heart w-4 h-4'
              viewBox='0 0 16 16'
            >
              <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
            </svg>

            <span>Buy me a coffee</span>
          </a>
          <a
            href='http://'
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center space-x-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='bi bi-github w-4 h-4'
              viewBox='0 0 16 16'
            >
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href='http://'
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center space-x-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='bi bi-chat-square-dots w-4 h-4'
              viewBox='0 0 16 16'
            >
              <path d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
              <path d='M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
            </svg>

            <span>Feedback</span>
          </a>
        </section>

        <section>
          <AnimatePresence>
            {isLoggedIn ? (
              <motion.button
                {...FADE_IN_ANIMATION_SETTINGS}
                className='rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-700 py-1.5 px-5'
              >
                My Dashboard
              </motion.button>
            ) : (
              <motion.button
                {...FADE_IN_ANIMATION_SETTINGS}
                className='rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-700 py-1.5 px-5'
              >
                Login
              </motion.button>
            )}
          </AnimatePresence>
        </section>
      </div>
    </nav>
  );
}
