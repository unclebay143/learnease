import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
type Props = {};

export default function PromptSuggestions({}: Props) {
  return (
    <section className='text-gray-300 mt-10'>
      <p className='text-gray-400'>What do you want to learn today?</p>
      <AnimatePresence>
        <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
          <button className='border rounded p-2 mr-2 mt-2 border-gray-400'>
            I want to learn about AI
          </button>

          <button className='border rounded p-2 mr-2 mt-2 border-gray-400'>
            I want to learn JavaScript
          </button>
          <button className='border rounded p-2 mr-2 mt-2 border-gray-400'>
            Explain JavaScript Currying to me like I'm 5
          </button>
          <button className='border rounded p-2 mr-2 mt-2 border-gray-400'>
            Explain Recursion to me like I'm 5
          </button>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
