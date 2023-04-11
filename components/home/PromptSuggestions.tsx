import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, PROMPT_SUGGESTION } from "@/lib/constants";

export default function PromptSuggestions({
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
  language,
  level,
}: {
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  language: { value: string; label: string };
  level: { value: string; label: string };
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className='mt-10 text-gray-300'>
      <p className='text-gray-400'>What do you want to learn today?</p>
      <AnimatePresence>
        <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
          {PROMPT_SUGGESTION.map((prompt, i) => {
            return (
              <button
                disabled={isGeneratingResponse}
                onClick={() => {
                  setActive(i);
                  setPromptInputValue(prompt);
                  handleSubmit({ prompt, language, level });
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
