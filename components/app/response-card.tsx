import { fetchSavedPromptResponses } from "@/lib/services";
import React, { useState } from "react";
import ToastNotification from "../shared/alert";
import Document from "../shared/icons/document";
import Star from "../shared/icons/star";
import Trash from "../shared/icons/trash";
import Link from "next/link";

function ResponseCard({
  responseId,
  title,
  isFavorite,
  setSavedPromptResponses,
  language,
}: {
  responseId: string;
  title: string;
  language: string;
  isFavorite?: boolean;
  setSavedPromptResponses: Function;
}) {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isDeletingResponse, setIsDeletingResponse] = useState<boolean>(false);

  const deleteResponse = async (responseId: string) => {
    setIsDeletingResponse(true);
    const confirm = window.confirm("This prompt response will be deleted");

    if (!confirm) {
      setIsDeletingResponse(false);
      return;
    }

    if (!responseId) {
      return;
    }

    const res = await fetch("/api/response/" + responseId, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data?.success) {
      setDeleted(true);
      fetchSavedPromptResponses().then((responses) => {
        setSavedPromptResponses(responses);
      });
    }
  };

  const toggleFavorite = async (responseId: string) => {
    try {
      const res = await fetch("/api/response/" + responseId, { method: "PUT" });
      fetchSavedPromptResponses().then((responses) =>
        setSavedPromptResponses(responses)
      );
    } catch (error) {
      console.log(error);
    }
  };
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
            {isDeletingResponse ? (
              <h3 className='pl-1 text-sm capitalize truncate' title={title}>
                Deleting:{" "}
                <span className='line-through opacity-75'>{title}</span>
              </h3>
            ) : (
              <div className='flex items-center'>
                <h3 className='pl-1 text-sm capitalize truncate' title={title}>
                  {title || "untitled"}
                </h3>
                {language.toLowerCase() !== "english" && (
                  <span className='inline-block p-[1px] px-[2px] ml-1 text-xs bg-slate-100 text-gray-600 rounded'>
                    {language.toLowerCase() === "nigeria pidgin" // too long for UI
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
            onClick={() => deleteResponse(responseId)}
            className='bg-white rounded p-1 hover:bg-slate-100 border border-slate-300 mr-[1px]'
          >
            <Trash className='w-4 h-4' />
          </button>
          <button
            onClick={() => toggleFavorite(responseId)}
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

      {setDeleted ? (
        <ToastNotification
          open={deleted}
          setOpen={setDeleted}
          title='Prompt response deleted successfully'
          dark
        />
      ) : null}
    </>
  );
}

export default ResponseCard;
