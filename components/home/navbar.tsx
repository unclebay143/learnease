import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar({
  setOpenSiderbar,
}: {
  setOpenSiderbar: Function;
}) {
  const { status, data: session } = useSession();

  return (
    <nav className='relative z-20 max-w-screen-xl px-6 py-2 mx-auto text-gray-400 2xl:px-0'>
      <div className='flex items-center justify-between h-16'>
        <Link href='/' className='flex items-center space-x-1'>
          <Image
            src='/_static/icons/building-block.png'
            width={50}
            height={50}
            alt='LearnEase logo'
            className='md:w-[50px] md:h-[48.4px] w-11 h-11'
          />
          <h1 className='hidden mt-1 text-2xl text-gray-200 md:inline-block relative-left-16'>
            LearnEase
          </h1>
          <span className='relative p-2 -mt-4 text-green-700 right-2'>
            Beta
          </span>
        </Link>
        <section className='flex items-center'>
          <Link
            href='/buy-credits'
            className='flex items-center rounded text-white text-sm transition-all hover:text-gray-300 py-1.5 px-5'
          >
            Pricing
          </Link>
          <AnimatePresence>
            {status == "loading" ? (
              <button className='invisible flex items-center rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'>
                <h3 className='hidden mr-2 md:inline'>Loading</h3>
                <Image
                  src={`https://avatars.dicebear.com/api/micah/loading.svg`}
                  alt='user'
                  width='50'
                  height='50'
                  className='w-6 h-6 rounded-full'
                />
              </button>
            ) : (
              <>
                {session ? (
                  <motion.button
                    {...FADE_IN_ANIMATION_SETTINGS}
                    className='flex items-center rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'
                    onClick={() => setOpenSiderbar(true)}
                  >
                    <h3 className='hidden mr-2 md:inline'>My Dashboard</h3>
                    <Image
                      src={
                        session?.user?.image ||
                        `https://avatars.dicebear.com/api/micah/${session?.user?.email}.svg`
                      }
                      alt='user'
                      width='50'
                      height='50'
                      className='w-6 h-6 rounded-full'
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    {...FADE_IN_ANIMATION_SETTINGS}
                    onClick={() =>
                      signIn("google", { callbackUrl: "/dashboard" })
                    }
                    className='rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'
                  >
                    Login
                  </motion.button>
                )}
              </>
            )}
          </AnimatePresence>
        </section>
      </div>
    </nav>
  );
}
