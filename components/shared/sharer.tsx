import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Sharer({ caption }: { caption?: string }) {
  return (
    <section className='bg-green-800 bg-opacity-50 p-3 rounded text-white flex items-center space-x-1 justify-center'>
      <h3>Found this useful? </h3>
      <div className='space-x-2'>
        <AnimatePresence>
          <motion.a
            {...FADE_IN_ANIMATION_SETTINGS}
            href={`https://twitter.com/intent/tweet?url=https://learnease.vercel.app/&text=${
              caption ||
              "If you're looking for an AI-powered platform to learn new concepts, LearnEase is the one for you! I just learned something new, and it was so easy to understand. #LearnEase #AIlearning"
            }`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-2 text-blue-300'
          >
            Tweet about it
          </motion.a>
          <span>or</span>
          <motion.a
            {...FADE_IN_ANIMATION_SETTINGS}
            href="https://twitter.com/intent/tweet?url=https://learnease.vercel.app/&text=I just learned a new concept on LearnEase powered by AI. It's detailed"
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-2 text-blue-300'
          >
            Star on GitHub
          </motion.a>
        </AnimatePresence>
      </div>
    </section>
  );
}
