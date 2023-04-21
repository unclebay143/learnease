import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Sharer({ caption }: { caption?: string }) {
  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);

  return (
    <AnimatePresence>
      <motion.div
        {...FADE_IN_ANIMATION_SETTINGS}
        className={`${
          showSharer ? "flex" : "hidden"
        } bg-green-800 mt-10 bg-opacity-50 p-3 rounded text-white  justify-between group items-center`}
      >
        <div className='flex flex-wrap items-center justify-center w-11/12 space-x-1'>
          <h3>Found this useful? </h3>
          <div className='space-x-2'>
            <a
              href={`https://twitter.com/intent/tweet?url=https://learnease.vercel.app/&text=${
                caption ||
                "If you're looking for an AI-powered platform to learn new concepts, LearnEase is the one for you! I just learned something new, and it was so easy to understand. #LearnEase #AIlearning"
              }`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-300 underline underline-offset-2'
            >
              Tweet about it
            </a>
            <span className='hidden md:inline'>or</span>
            <a
              href='https://dub.sh/learnease-stargazers'
              target='_blank'
              rel='noopener noreferrer'
              className='hidden text-blue-300 underline md:inline underline-offset-2'
            >
              Star on GitHub
            </a>
          </div>
        </div>
        <button
          className='hidden cursor-pointer group-hover:inline'
          onClick={() => setShowSharer(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 transition-all hover:text-gray-300'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
