import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

export default function PromptForm({
  promptInputValue,
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
}: {
  promptInputValue: string;
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
}) {
  const disableButton = !promptInputValue || isGeneratingResponse;
  return (
    <form className='w-full sm:flex items-start space-y-2 sm:space-x-2 sm:space-y-0'>
      <div className='w-full sm:w-9/12 relative'>
        <input
          type='text'
          placeholder='What else do you want to learn?'
          className='p-4 w-full rounded mb-2 text-md bg-white focus:outline-none'
          value={promptInputValue}
          onChange={(e) => setPromptInputValue(e.target.value)}
        />
        <AnimatePresence>
          <motion.div
            {...FADE_IN_ANIMATION_SETTINGS}
            className={`${
              promptInputValue?.length >= 10 ? "md:flex" : "hidden"
            } transition-all items-center justify-end text-gray-400 text-sm absolute l-0 w-full hidden`}
          >
            <button
              disabled={promptInputValue?.length <= 0}
              className='flex disabled:text-gray-500'
              onClick={() => setPromptInputValue("")}
              type='button'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <span>Clear field</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        role='submit'
        className={`bg-green-700 hover:bg-opacity-100 w-full bg-opacity-90 flex-1 p-4 rounded text-white text-md uppercase ${
          !promptInputValue ? "disabled:bg-opacity-75" : ""
        } ${isGeneratingResponse ? "disabled:bg-opacity-40" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          if (!promptInputValue) {
            return alert("Prompt field cannot be empty...");
          }
          handleSubmit();
        }}
        disabled={disableButton}
      >
        {isGeneratingResponse ? "Please wait..." : "Generate"}
      </button>
    </form>
  );
}
