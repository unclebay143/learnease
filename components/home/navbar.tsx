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
          <h1 className='text-2xl hidden md:inline-block text-gray-200'>
            LearnEase
          </h1>
        </section>

        <section>
          <AnimatePresence>
            {isLoggedIn ? (
              <motion.button
                {...FADE_IN_ANIMATION_SETTINGS}
                className='rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'
              >
                My Dashboard
              </motion.button>
            ) : (
              <motion.button
                {...FADE_IN_ANIMATION_SETTINGS}
                className='rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'
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
