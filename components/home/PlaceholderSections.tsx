import { motion } from "framer-motion";
import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from "@/lib/constants";

export default function PlaceholderCard({ loading }: { loading?: boolean }) {
  return (
    <motion.div variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}>
      <h3 className='text-gray-600'>
        LearnEase AI response will appear below...Give it a try!
      </h3>
      <div
        className={`${
          loading ? "animate-pulse" : ""
        } h-6 w-1/2 rounded-md bg-gray-200 mt-8 mb-3`}
      />
      {Array.from({ length: 6 }).map((_, i) => (
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
  );
}
