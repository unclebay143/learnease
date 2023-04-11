import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FADE_IN_ANIMATION_SETTINGS,
  SUPPORTED_LANGUAGES,
  SUPPORTED_LEVELS,
} from "@/lib/constants";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { updateUserPreference } from "@/lib/services";
import { useSession } from "next-auth/react";

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
          className={`bg-green-700 hover:bg-opacity-100 w-full bg-opacity-90 flex-1 p-4 rounded text-white text-md uppercase ${
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

const PersonalizationDialogForm = ({
  open,
  setOpen,
  language,
  setLanguage,
  level,
  setLevel,
}: {
  open: boolean;
  setOpen: Function;
  language: { value: string; label: string };
  setLanguage: Function;
  level: { value: string; label: string };
  setLevel: Function;
}) => {
  const [savePreference, setSavePreference] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const [showLoginWarning, setShowLoginWarning] =
    React.useState<boolean>(false);

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className='z-50 bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Dialog.Content className='z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          <Dialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
            Personalization Settings
          </Dialog.Title>
          <Dialog.Description className='text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal'>
            {/* Personalized learning paths based on your language, and level of
            proficiency. */}
            Personalize the AI response based on your language and proficiency
            level
            {/* Create a personalized learning path and get AI responses tailored to
            your language and proficiency level with LearnEase. */}
          </Dialog.Description>

          <fieldset className='mb-[15px] gap-5'>
            <SelectDropdown
              selected={language}
              setSelected={setLanguage}
              label='Language'
              data={SUPPORTED_LANGUAGES}
            />
          </fieldset>
          <fieldset className='mb-[15px] gap-5'>
            <SelectDropdown
              selected={level}
              setSelected={setLevel}
              label='Level'
              data={SUPPORTED_LEVELS}
            />
          </fieldset>

          <div className='mt-[25px] flex items-center justify-between'>
            <div className='flex items-center text-sm'>
              <input
                type='checkbox'
                className='mr-1'
                id='remember'
                disabled={showLoginWarning}
                onChange={(e) => {
                  if (!session) {
                    setShowLoginWarning(true);
                    return;
                  }
                  setSavePreference(e.target.checked);
                }}
              />
              {showLoginWarning ? (
                <label htmlFor='remember' className='text-red-500'>
                  Login to save as preference
                </label>
              ) : (
                <label htmlFor='remember'>Remember my preference.</label>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                onClick={async () => {
                  if (savePreference) {
                    await updateUserPreference({
                      language: language.value,
                      level: level.value,
                    });
                  }
                }}
                className='bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
              >
                {/* <button className='p-2 text-white uppercase bg-green-700 rounded hover:bg-opacity-100 bg-opacity-90 text-md'> */}
                Apply
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className=' absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none'
              aria-label='Close'
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function SelectDropdown({
  label,
  selected,
  setSelected,
  data,
}: {
  label: string;
  selected: { value: any; label: any };
  setSelected: Function;
  data: { value: any; label: any }[];
}) {
  return (
    <Listbox value={selected} onChange={(s) => setSelected(s)}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
          </Listbox.Label>
          <div className='relative mt-2'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6'>
              <span className='flex items-center'>
                <span className='block capitalize truncate'>
                  {selected.label}
                </span>
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none'>
                <ChevronUpDownIcon
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {data?.map((d, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-green-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={d}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate capitalize"
                          )}
                        >
                          {d.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-green-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
