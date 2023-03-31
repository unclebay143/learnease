import SlideOverWrapper from "../shared/slider-over";
import Favorites from "./favorites";
import Saved from "./saved";
import { signOut } from "next-auth/react";
import Power from "../shared/icons/power";
import { useRouter } from "next/router";

const data = [
  "Explain JavaScript Currying to me like I'm 5",
  "I want to learn about JavaScript and Python",
  "I want to learn about JavaScript, Python, AI, Machine Learning, Booking, commerce, economics, agric, computer",
  "web3",
  "AI",
  "jknjndfjoidjoijsd",
  "Untitled",
  "test",
  "does this work?",
  "who are you?",
  "1",
  "2?",
  "who are you bott?",
  "/AI?",
  "bot?",
  "who are you?",
  "long list behavior",
  "test for overflow",
  "jknjndfjoidjoijsd",
  "Untitled",
  "test",
  "does this work?",
  "who are you?",
  "1",
  "2?",
  "who are you bott?",
  "/AI?",
  "bot?",
  "who are you?",
  "long list behavior",
  "test for overflow",
  "jknjndfjoidjoijsd",
  "Untitled",
  "test",
  "does this work?",
  "who are you?",
  "1",
  "2?",
  "who are you bott?",
  "/AI?",
  "bot?",
  "who are you?",
  "long list behavior",
  "test for overflow",
  "jknjndfjoidjoijsd",
  "Untitled",
  "test",
  "does this work?",
  "who are you?",
  "1",
  "2?",
  "who are you bott?",
  "/AI?",
  "bot?",
  "who are you?",
  "long list behavior",
  "test for overflow",
];

export default function SidebarDashboard({
  open,
  setOpen,
  savedPromptResponses,
}: {
  open: boolean;
  setOpen: Function;
  savedPromptResponses: Array<any>;
}) {
  const router = useRouter();
  return (
    <SlideOverWrapper title='Dashboard' open={open} setOpen={setOpen}>
      <div className='flex flex-col justify-between h-full'>
        <section>
          <Favorites items={data} />
          <Saved items={savedPromptResponses} />
        </section>
        <section>
          {router.pathname === "/" ? (
            <a href='/dashboard' className='mb-4'>
              <button className='flex items-center justify-center rounded text-base border border-slate-500 font-semibold hover:bg-gray-100 w-full px-3 py-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                  />
                </svg>
                New Prompt
              </button>
            </a>
          ) : (
            <section className='flex justify-center items-center rounded mt-5'>
              <button
                className='text-slate-400 rounded hover:text-gray-500 p-1 flex items-center gap-1 text-sm'
                onClick={() => signOut()}
              >
                <Power />
                <span className=''>Logout</span>
              </button>
            </section>
          )}
        </section>
      </div>
    </SlideOverWrapper>
  );
}
