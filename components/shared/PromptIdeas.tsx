import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FADE_IN_ANIMATION_SETTINGS,
  PROMPT_IDEAS,
  SUPPORTED_LANGUAGES,
  SUPPORTED_LEVELS,
} from "@/lib/constants";
import CollapsibleWrapper from "./collapsible-wrapper";
import CopyToClipboard from "react-copy-to-clipboard";
import ToastNotification from "./alert";

export default function PromptIdeas({
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
  language,
  level,
  openDefault,
}: {
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  language: { value: string; label: string };
  level: { value: string; label: string };
  openDefault?: boolean;
}) {
  const [show, setShow] = useState<number>(20);

  return (
    <div className='px-5'>
      <div className='max-w-screen-md rounded-lg p-6 mx-auto mt-10 bg-white border shadow md:px-8'>
        <CollapsibleWrapper
          openDefault={openDefault}
          heading={"Prompt suggestions"}
          isLoading={isGeneratingResponse}
        >
          <p className='mb-4 text-left text-gray-400'>
            Explore our collection of prompt suggestions for various programming
            topics. Use them as templates or click to run them directly and
            start learning in seconds.
          </p>
          <section className='flex flex-col items-center justify-center text-gray-300'>
            <AnimatePresence>
              <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                {PROMPT_IDEAS.slice(0, show).map((prompt, i) => {
                  return (
                    <PromptButton
                      activeId={i}
                      prompt={prompt}
                      key={prompt + i}
                      handleSubmit={handleSubmit}
                      setPromptInputValue={setPromptInputValue}
                      language={language}
                      level={level}
                      isGeneratingResponse={isGeneratingResponse}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </section>
          <section className='flex items-center justify-center pt-5 mt-6 border-t'>
            {show >= PROMPT_IDEAS.length ? (
              <div className='inline-flex flex-col justify-center'>
                <p className='text-sm text-gray-600'>
                  You&apos;ve reached the end.
                </p>
                <button
                  onClick={() => setShow(show - 10)}
                  className='p-1 mx-auto mt-3 text-sm text-gray-600 border border-slate-300 rounded hover:bg-gray-100'
                >
                  Hide some
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShow(show + 10)}
                className='p-1 text-sm text-gray-600 border border-slate-300 rounded hover:bg-gray-100'
              >
                Show more
              </button>
            )}
          </section>
        </CollapsibleWrapper>
      </div>
    </div>
  );
}

const PromptButton = ({
  handleSubmit,
  isGeneratingResponse,
  setPromptInputValue,
  language,
  level,
  prompt,
  activeId,
}: {
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  setPromptInputValue: Function;
  language: { value: string; label: string };
  level: { value: string; label: string };
  prompt: string;
  activeId: number;
}) => {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {copied && (
        <ToastNotification
          open={copied}
          setOpen={setCopied}
          title='Prompt copied to clipboard'
          dark
        />
      )}
      <button
        disabled={isGeneratingResponse}
        className={`w-full md:w-auto flex space-x-2 justify-between border border-slate-300 text-gray-600 rounded p-2 mr-2 mt-2 text-sm border-gray-4d00 text-left hover:bg-gray-100 ${
          active === activeId ? "bg-green-800 bg-opacity-50" : null
        }`}
      >
        <span
          onClick={() => {
            setActive(activeId);
            setPromptInputValue(prompt);
            handleSubmit({ prompt, language, level });
          }}
        >
          {prompt}
        </span>
        <div className='relative h-full'>
          <CopyToClipboard
            text={prompt}
            onCopy={() => {
              setCopied(true);
              // reset copied state in 3s to match toast duration
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            <div>
              {copied ? (
                <AnimatePresence>
                  <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4 text-slate-500'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
                      />
                    </svg>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-4 h-4 text-slate-500'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
                      />
                    </svg>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </CopyToClipboard>
        </div>
      </button>
    </>
  );
};
