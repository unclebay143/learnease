import React from "react";
import Document from "../shared/icons/document";
import Star from "../shared/icons/star";
import Trash from "../shared/icons/trash";
import Link from "next/link";
import { ResponseType, usePromptResponseContext } from "context/Response";

type Props = {
  response: ResponseType;
};

function ResponseCard({ response }: Props) {
  const { responseId, title, isFavorite, language } = response;

  const {
    deletePromptResponse,
    isDeletingResponse,
    responseIdToBeDeleted,
    toggleFavorite,
  } = usePromptResponseContext();

  return (
    <>
      <div
        className='relative flex items-center w-full p-1 mb-1 rounded group hover:bg-gray-400/10 text-slate-600 '
        role='button'
      >
        <Link
          href={`/dashboard/${responseId}`}
          className='flex items-center w-full'
        >
          <section>
            <Document className='w-4 h-4 ' />
          </section>
          <section className='w-9/12 md:w-10/12'>
            {isDeletingResponse && responseId === responseIdToBeDeleted ? (
              <h3
                className='pl-1 text-sm capitalize truncate max-w-[200px] md:max-w-full'
                title={title}
              >
                Deleting:{" "}
                <span className='line-through opacity-75'>{title}</span>
              </h3>
            ) : (
              <div className='flex items-center max-w-[200px] md:max-w-full'>
                <h3 className='pl-1 text-sm capitalize truncate' title={title}>
                  {title || "untitled"}
                </h3>
                {language?.toLowerCase() !== "english" && (
                  <span className='inline-block p-[1px] px-[2px] ml-1 text-xs bg-slate-100 text-gray-600 rounded ring-1 ring-inset ring-gray-500/10'>
                    {language?.toLowerCase() === "nigeria pidgin" // too long for UI
                      ? "Pidgin"
                      : language}
                  </span>
                )}
              </div>
            )}
          </section>
        </Link>
        {/* floating menu: trash and star */}
        <div className='absolute right-0 z-20 sm:hidden group-hover:inline'>
          <button
            disabled={isDeletingResponse}
            onClick={() => {
              if (deletePromptResponse) {
                deletePromptResponse(responseId);
              }
            }}
            className='bg-white rounded p-1 hover:bg-slate-100 border border-slate-300 mr-[1px]'
          >
            <Trash className='w-4 h-4' />
          </button>
          <button
            onClick={() => {
              if (toggleFavorite) {
                toggleFavorite(responseId);
              }
            }}
            className='bg-white rounded group p-1 hover:bg-slate-100 border border-slate-300 ml-[1px]'
          >
            <Star
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-yellow-300 text-yellow-300 group-focus:fill-none group-focus:text-current"
                  : "group-focus:fill-yellow-300 group-focus:text-yellow-300"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default ResponseCard;
