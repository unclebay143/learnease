import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

const promptSuggestions = [
  "I want to learn about AI",
  "I want to learn JavaScript",
  "Explain JavaScript Currying to me like I'm 5",
  "Explain Recursion to me like I'm five",
];

export default function PromptSuggestions({
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
}: {
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className='text-gray-300 mt-10'>
      <p className='text-gray-400'>What do you want to learn today?</p>
      <AnimatePresence>
        <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
          {promptSuggestions.map((prompt, i) => {
            return (
              <button
                disabled={isGeneratingResponse}
                onClick={() => {
                  setActive(i);
                  setPromptInputValue(prompt);
                  handleSubmit(prompt);
                }}
                key={prompt + i}
                className={`border rounded p-2 mr-2 mt-2 border-gray-400 ${
                  active === i ? "bg-green-800 bg-opacity-50" : null
                }`}
              >
                {prompt}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
