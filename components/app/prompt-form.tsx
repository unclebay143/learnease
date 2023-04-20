import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import PersonalizationDialogForm from "../settings";

export default function PromptForm({
  promptInputValue,
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
  language,
  setLanguage,
  level,
  setLevel,
}: {
  promptInputValue: string;
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  language: { value: string; label: string };
  setLanguage: Function;
  level: { value: string; label: string };
  setLevel: Function;
}) {
  const disableButton = !promptInputValue || isGeneratingResponse;
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <form className='items-start w-full space-y-2 sm:flex sm:space-x-2 sm:space-y-0'>
        <div className='relative w-full sm:w-9/12'>
          <input
            type='text'
            placeholder='What else do you want to learn?'
            className='w-full p-4 mb-2 bg-white rounded text-md focus:outline-none'
            value={promptInputValue}
            onChange={(e) => setPromptInputValue(e.target.value)}
          />
          <AnimatePresence>
            <motion.div
              {...FADE_IN_ANIMATION_SETTINGS}
              className={`transition-all flex items-center justify-end text-gray-400 text-sm absolute -top-7 sm:top-auto l-0 w-full`}
            >
              <button
                className='flex mr-3 disabled:text-gray-500'
                type='button'
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 mr-[2px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>

                <span>Settings</span>
              </button>

              {/* clear field */}
              <button
                disabled={disableButton}
                className={`flex disabled:text-gray-500`}
                onClick={() => setPromptInputValue("")}
                type='button'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 mr-[2px]'
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
          className={`bg-green-700 hover:bg-opacity-100 w-full bg-opacity-90 flex-1 p-4 rounded text-white text-md uppercase disabled:cursor-not-allowed ${
            !promptInputValue ? "disabled:bg-opacity-75" : ""
          } ${isGeneratingResponse ? "disabled:bg-opacity-40" : ""}`}
          onClick={async (e) => {
            e.preventDefault();
            if (!promptInputValue) {
              return alert("Prompt field cannot be empty...");
            }

            handleSubmit({
              prompt: promptInputValue,
              language,
              level,
            });
          }}
          disabled={disableButton}
        >
          {isGeneratingResponse ? "Please wait..." : "Generate"}
        </button>
      </form>
      <PersonalizationDialogForm
        open={open}
        setOpen={setOpen}
        language={language}
        setLanguage={setLanguage}
        level={level}
        setLevel={setLevel}
      />
    </>
  );
}
