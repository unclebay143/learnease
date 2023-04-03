import React from "react";
import CollapsibleWrapper from "../shared/collapsible-wrapper";
import ArrowPathReload from "../shared/icons/arrow-path-reload";
import Bookmark from "../shared/icons/bookmark";
import Sparkles from "../shared/icons/sparkles";
import Star from "../shared/icons/star";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Trash from "../shared/icons/trash";
import { useSession, signIn, signOut } from "next-auth/react";

function ResponseMenu({
  reload,
  isLoading,
  focusMode,
  setFocusMode,
  saveResponse,
  saving,
  deleteResponse,
  isDeletingResponse,
  savedPromptResponse,
  toggleFavorite,
  isUpdatingFavorite,
}: {
  reload: Function;
  isLoading: boolean;
  focusMode: boolean;
  setFocusMode: Function;
  saveResponse: Function;
  saving: boolean;
  deleteResponse: Function;
  isDeletingResponse: boolean;
  savedPromptResponse: Object;
  toggleFavorite: Function;
  isUpdatingFavorite: boolean;
}) {
  const { status, data: session } = useSession();

  const { isFavorite, responseId } =
    (savedPromptResponse as {
      isFavorite: boolean;
      responseId: string;
    }) || {};
  return (
    <CollapsibleWrapper
      chevronClassName='w-5 h-5 text-black'
      isLoading={isLoading}
    >
      <AnimatePresence>
        <motion.div
          {...FADE_IN_ANIMATION_SETTINGS}
          className='mt-3 w-full justify-center flex flex-col md:flex-row gap-2'
        >
          <button
            onClick={() => setFocusMode(!focusMode)}
            className='capitalize flex  items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
          >
            <Sparkles className='text-slate-600 w-4 h-4' />
            <span className='text-slate-600'>
              {focusMode ? "Classic" : "Focus"} mode
            </span>
          </button>

          {session ? (
            <>
              {responseId ? (
                <button
                  onClick={() => deleteResponse(responseId)}
                  disabled={isDeletingResponse}
                  className='capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
                >
                  <Trash className='text-slate-600 w-4 h-4' />
                  <span className='text-slate-600'>
                    {isDeletingResponse
                      ? "Deleting response..."
                      : "Delete response"}
                  </span>
                </button>
              ) : (
                <button
                  disabled={saving}
                  onClick={() => saveResponse()}
                  className='capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
                >
                  <Bookmark className='text-slate-600 w-4 h-4' />
                  <span className='text-slate-600'>
                    {saving ? "Saving response..." : "Save response"}
                  </span>
                </button>
              )}
              <button
                disabled={isUpdatingFavorite}
                onClick={() => {
                  if (!responseId) {
                    return alert("Save response first");
                  }
                  toggleFavorite(responseId);
                }}
                className={` ${
                  isFavorite ? "fill-yellow-300 text-yellow-300" : ""
                } capitalize flex items-center ${
                  !responseId ? "bg-slate-200" : ""
                } hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm`}
              >
                <Star
                  className={` ${
                    isFavorite ? "fill-yellow-300 text-yellow-300" : ""
                  } text-slate-600 w-4 h-4`}
                />
                <span className='text-slate-600'>
                  {isUpdatingFavorite
                    ? "Please wait..."
                    : isFavorite
                    ? "Unmark favorite"
                    : "Mark favorite"}
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className='capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
            >
              <img
                alt="google's logo"
                src='/_static/icons/google.webp'
                width={20}
                height={20}
                decoding='async'
                loading='lazy'
                style={{ color: "transparent" }}
              />
              <span className='text-slate-600'>Sign in to Save response</span>
            </button>
          )}
          <button
            disabled={isLoading}
            onClick={() => reload()}
            className='capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
          >
            <ArrowPathReload className='text-slate-600 w-4 h-4' />
            <span className='text-slate-600'>
              {isLoading ? "Generating response" : "Regenerate response"}
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
    </CollapsibleWrapper>
  );
}

export default ResponseMenu;
