import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, PROMPT_SUGGESTION } from "@/lib/constants";
import { usePromptResponseContext } from "context/Response";
import { useUserContext } from "context/User";

export default function PromptSuggestions({}: // setPromptInputValue,
// handleSubmit,
// isGeneratingResponse,
// language,
// level,
{
  // setPromptInputValue: Function;
  // handleSubmit: Function;
  // isGeneratingResponse: boolean;
  // language: { value: string; label: string };
  // level: { value: string; label: string };
}) {
  const [active, setActive] = useState<number | null>(null);
  const { setPromptInputValue, isGeneratingResponse, handleGenerateResponse } =
    usePromptResponseContext();
  const { userLanguage, userLevel } = useUserContext();
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
                  if (setPromptInputValue) {
                    setPromptInputValue(prompt);
                  }
                  if (handleGenerateResponse) {
                    handleGenerateResponse({
                      prompt,
                      language: userLanguage,
                      level: userLevel,
                    });
                  }
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
