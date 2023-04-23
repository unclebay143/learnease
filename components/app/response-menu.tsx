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
import { usePromptResponseContext } from "context/Response";

function ResponseMenu({
  reload,
  isLoading,
  focusMode,
  setFocusMode,
  saveResponse,
  saving,
  deleteResponse,
  isDeletingResponse,
}: {
  reload: Function;
  isLoading: boolean;
  focusMode: boolean;
  setFocusMode: Function;
  saveResponse: Function;
  saving: boolean;
  deleteResponse: Function;
  isDeletingResponse: boolean;
}) {
  const { data: session } = useSession();
  const { toggleFavorite, isUpdatingFavoriteStatus, fetchResponse, response } =
    usePromptResponseContext();

  const router = useRouter();
  return (
    <CollapsibleWrapper
      chevronClassName='w-6 h-6'
      isLoading={isLoading}
      showBtnTooltip
    >
      <AnimatePresence>
        <motion.div
          {...FADE_IN_ANIMATION_SETTINGS}
          className='flex flex-col justify-center w-full gap-2 mt-3 md:flex-row'
        >
          <button
            onClick={() => setFocusMode(!focusMode)}
            className='flex items-center gap-2 p-2 text-sm capitalize border border-gray-400 rounded md:py-1 hover:bg-slate-100'
          >
            <Sparkles className='w-4 h-4 text-slate-600' />
            <span className='text-slate-600'>
              {focusMode ? "Classic" : "Focus"} mode
            </span>
          </button>

          {session ? (
            <>
              {response?.responseId ? (
                <button
                  onClick={() => deleteResponse(response?.responseId)}
                  disabled={isDeletingResponse}
                  className='flex items-center gap-2 p-2 text-sm capitalize border border-gray-400 rounded md:py-1 hover:bg-slate-100'
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
                  className='flex items-center gap-2 p-2 text-sm capitalize border border-gray-400 rounded md:py-1 hover:bg-slate-100'
                >
                  <Bookmark className='w-4 h-4 text-slate-600' />
                  <span className='text-slate-600'>
                    {saving ? "Saving response..." : "Save response"}
                  </span>
                </button>
              )}
              <button
                disabled={isUpdatingFavoriteStatus}
                onClick={() => {
                  if (!response?.responseId) {
                    return alert("Save response first");
                  }
                  if (toggleFavorite) {
                    toggleFavorite(response?.responseId).then((res) => {
                      if (fetchResponse && response?.responseId)
                        fetchResponse(response?.responseId);
                    });
                  }
                }}
                className={` ${
                  response?.isFavorite ? "fill-yellow-300 text-yellow-300" : ""
                } capitalize flex items-center ${
                  !response?.responseId ? "bg-slate-200" : ""
                } hover:bg-slate-100 gap-2 rounded border border-gray-400 p-2 text-sm md:py-1`}
              >
                <Star
                  className={` ${
                    response?.isFavorite
                      ? "fill-yellow-300 text-yellow-300"
                      : ""
                  } text-slate-600 w-4 h-4`}
                />
                <span className='text-slate-600'>
                  {isUpdatingFavoriteStatus
                    ? "Please wait..."
                    : response?.isFavorite
                    ? "Unmark favorite"
                    : "Mark favorite"}
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className='flex items-center gap-2 p-2 text-sm capitalize border border-gray-400 rounded md:py-1 hover:bg-slate-100'
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
              className='!no-underline capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-2 text-sm md:py-1'
            >
              <DocumentPlus className='w-4 h-4 text-slate-600' />
              <span className='text-slate-600'>New Prompt</span>
            </Link>
          ) : (
            <button
              disabled={isLoading}
              onClick={() =>
                reload({
                  prompt: response?.title,
                  language: response?.language,
                  level: response?.level,
                })
              }
              className='flex items-center gap-2 p-2 text-sm capitalize border border-gray-400 rounded md:py-1 hover:bg-slate-100'
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
