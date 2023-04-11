import SlideOverWrapper from "../shared/slider-over";
import Favorites from "./favorites";
import Saved from "./saved";
import { signOut } from "next-auth/react";
import Power from "../shared/icons/power";
import { useRouter } from "next/router";
import DocumentPlus from "../shared/icons/document-plus";
import Link from "next/link";

export default function SidebarDashboard({
  open,
  setOpen,
  savedPromptResponses,
  setSavedPromptResponses,
  currentlyLoggedInUser,
}: {
  open: boolean;
  setOpen: Function;
  savedPromptResponses: Array<any>;
  setSavedPromptResponses: Function;
  currentlyLoggedInUser: {
    credits: number;
    freeCredits: number;
  } | null;
}) {
  const router = useRouter();

  return (
    <SlideOverWrapper
      title='Dashboard'
      open={open}
      setOpen={setOpen}
      currentlyLoggedInUser={currentlyLoggedInUser}
    >
      <div className='flex flex-col justify-between h-full max-w-[350px] md:max-w-full'>
        <section>
          {router.pathname !== "/dashboard" && (
            <section className='mb-4'>
              <Link href='/dashboard'>
                <button className='flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-gray-600 transition-all border rounded hover:text-gray-800 border-slate-200 hover:border-slate-200 hover:bg-gray-200'>
                  <DocumentPlus className='w-[18px] h-[18px] mr-1' />
                  New Prompt
                </button>
              </Link>
            </section>
          )}
          <Favorites
            items={savedPromptResponses}
            setSavedPromptResponses={setSavedPromptResponses}
          />
          <Saved
            items={savedPromptResponses}
            setSavedPromptResponses={setSavedPromptResponses}
          />
        </section>
        <section className='flex items-center justify-center mt-5 rounded'>
          <button
            className='flex items-center gap-1 p-1 text-sm rounded text-slate-400 hover:text-gray-500'
            onClick={() => signOut()}
          >
            <Power />
            <span className=''>Logout</span>
          </button>
        </section>
      </div>
    </SlideOverWrapper>
  );
}
