import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUserContext } from "context/User";

// https://tailwindui.com/components/application-ui/overlays/slide-overs
export default function SlideOverWrapper({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: Function;
  title?: string;
  children: ReactNode;
}) {
  const { data: session } = useSession();
  const { user } = useUserContext();

  let totalUserCredits;

  if (user) {
    totalUserCredits = user?.freeCredits + user?.credits;
  }

  return (
    <Transition show={open}>
      <Dialog as='div' className='relative z-30' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative w-screen max-w-md pointer-events-auto'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='w-6 h-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title>
                        <section className='flex items-center justify-between'>
                          <div className='w-full'>
                            <div className='flex items-center mb-3'>
                              <h3 className='text-lg font-semibold leading-6 text-gray-900'>
                                {title}
                              </h3>
                              <Image
                                src={
                                  session?.user?.image ||
                                  `https://avatars.dicebear.com/api/micah/${session?.user?.email}.svg`
                                }
                                alt='user'
                                width='50'
                                height='50'
                                className='mx-2 rounded-full w-7 h-7'
                              />
                            </div>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center'>
                                <span className='text-sm font-normal text-gray-600'>
                                  {totalUserCredits} Credits Left
                                </span>
                              </div>
                              <Link
                                href='/buy-credits'
                                className='p-1 text-sm font-semibold text-gray-600 rounded-md bg-slate-100'
                              >
                                Buy credits
                              </Link>
                            </div>
                          </div>
                        </section>
                      </Dialog.Title>
                    </div>
                    <div className='relative flex-1 px-4 mt-3 sm:px-6'>
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
