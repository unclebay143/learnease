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
    <nav className='px-6 2xl:px-0 py-2 text-gray-400 z-20 relative max-w-screen-xl mx-auto'>
      <div className='flex h-16 items-center justify-between'>
        <Link href='/' className='flex space-x-1 items-center'>
          <Image
            src='/_static/icons/building-block.png'
            width='50'
            height='50'
            alt='LearnEase logo'
          />
          <h1 className='text-2xl hidden md:inline-block text-gray-200 relative-left-16 mt-1'>
            LearnEase
          </h1>
          <span className='p-2 text-green-700 -mt-4 relative right-2'>
            Beta
          </span>
        </Link>
        <section>
          <AnimatePresence>
            {status == "loading" ? null : (
              <>
                {session ? (
                  <motion.button
                    {...FADE_IN_ANIMATION_SETTINGS}
                    className='flex items-center rounded text-white text-sm transition-all border border-gray-50 hover:bg-white hover:text-gray-700 border-opacity-40 bg-gray-800 py-1.5 px-5'
                    onClick={() => setOpenSiderbar(true)}
                  >
                    <h3>My Dashboard</h3>
                    <Image
                      src={
                        session?.user?.image ||
                        `https://avatars.dicebear.com/api/micah/${session?.user?.email}.svg`
                      }
                      alt='user'
                      width='50'
                      height='50'
                      className='rounded-full w-6 h-6 ml-2'
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
