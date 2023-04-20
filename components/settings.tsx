import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { SUPPORTED_LANGUAGES, SUPPORTED_LEVELS } from "@/lib/constants";
import { updateUserPreference } from "@/lib/services";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

  console.log("test");

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
              selected={language?.value ? language : SUPPORTED_LANGUAGES[0]}
              setSelected={setLanguage}
              label='Language'
              data={SUPPORTED_LANGUAGES}
            />
          </fieldset>
          <fieldset className='mb-[15px] gap-5'>
            <SelectDropdown
              selected={level?.value ? level : SUPPORTED_LEVELS[0]}
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
export default PersonalizationDialogForm;
