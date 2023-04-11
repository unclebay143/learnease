import React from "react";
import CollapsibleWrapper from "../shared/collapsible-wrapper";
import ArrowPathReload from "../shared/icons/arrow-path-reload";
import Bookmark from "../shared/icons/bookmark";
import Sparkles from "../shared/icons/sparkles";
import Star from "../shared/icons/star";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Trash from "../shared/icons/trash";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import DocumentPlus from "../shared/icons/document-plus";
import Link from "next/link";
import Image from "next/image";

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
  prompt,
  language,
  level,
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
  prompt: string;
  language: { value: string; label: string };
  level: { value: string; label: string };
}) {
  const { status, data: session } = useSession();

  const { isFavorite, responseId } =
    (savedPromptResponse as {
      isFavorite: boolean;
      responseId: string;
    }) || {};

  const router = useRouter();
  return (
    <CollapsibleWrapper chevronClassName='w-5 h-5' isLoading={isLoading}>
      <AnimatePresence>
        <motion.div
          {...FADE_IN_ANIMATION_SETTINGS}
          className='flex flex-col justify-center w-full gap-2 mt-3 md:flex-row'
        >
          <button
            onClick={() => setFocusMode(!focusMode)}
            className='flex items-center gap-2 p-1 px-2 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
          >
            <Sparkles className='w-4 h-4 text-slate-600' />
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
                  className='flex items-center gap-2 p-1 px-2 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
                >
                  <Trash className='w-4 h-4 text-slate-600' />
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
                  className='flex items-center gap-2 p-1 px-2 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
                >
                  <Bookmark className='w-4 h-4 text-slate-600' />
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
              className='flex items-center gap-2 p-1 px-2 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
            >
              <Image
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

          {router.query?.responseId ? (
            <Link
              href='/dashboard'
              className='!no-underline capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
            >
              <DocumentPlus className='w-4 h-4 text-slate-600' />
              <span className='text-slate-600'>New Prompt</span>
            </Link>
          ) : (
            <button
              disabled={isLoading}
              onClick={() => reload({ prompt, language, level })}
              className='flex items-center gap-2 p-1 px-2 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
            >
              <ArrowPathReload className='w-4 h-4 text-slate-600' />
              <span className='text-slate-600'>
                {isLoading ? "Generating response" : "Regenerate response"}
              </span>
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </CollapsibleWrapper>
  );
}

export default ResponseMenu;
