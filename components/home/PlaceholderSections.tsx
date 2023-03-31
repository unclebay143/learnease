import { AnimatePresence, motion } from "framer-motion";
import {
  FADE_IN_ANIMATION_SETTINGS,
  FRAMER_MOTION_LIST_ITEM_VARIANTS,
} from "@/lib/constants";

export default function PlaceholderCard({ loading }: { loading?: boolean }) {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <motion.div variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}>
          <h3 className='text-gray-600'>
            {loading ? null : (
              <span>
                LearnEase AI response will appear below.{" "}
                <button
                  onClick={() => scrollToTop()}
                  className='underline hover:no-underline text-gray-600 font-semibold  hover:text-gray-800 transition-all'
                >
                  Give it a try!
                </button>
              </span>
            )}
          </h3>
          <div
            className={`${
              loading ? "animate-pulse" : ""
            } h-6 w-1/2 rounded-md bg-gray-200 mt-8 mb-3`}
          />
          {Array.from({ length: loading ? 6 : 1 }).map((_, i) => (
            <div key={i}>
              <div
                className={`${
                  loading ? "animate-pulse" : ""
                } h-6 w-28 rounded-md bg-gray-200 mt-8 mb-3`}
              />
              <div
                className={`${
                  loading ? "animate-pulse" : ""
                } h-4 w-6/12 rounded-md bg-gray-200 mb-2`}
              />
              <div
                className={`${
                  loading ? "animate-pulse" : ""
                } h-4 w-8/12 rounded-md bg-gray-200 mb-2`}
              />
              <div
                className={`${
                  loading ? "animate-pulse" : ""
                } h-4 w-10/12 rounded-md bg-gray-200 mb-2`}
              />
              <div
                className={`${
                  loading ? "animate-pulse" : ""
                } h-4 w-12/12 rounded-md bg-gray-200 mb-2`}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
