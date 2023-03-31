import Link from "next/link";
import React, { useState } from "react";
import ToastNotification from "../shared/alert";
import Document from "../shared/icons/document";
import Star from "../shared/icons/star";
import Trash from "../shared/icons/trash";

function ResponseCard({
  responseId,
  title,
  isFavorite,
}: {
  responseId: string;
  title: string;
  isFavorite?: boolean;
}) {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isDeletingResponse, setIsDeletingResponse] = useState<boolean>(false);

  const deleteResponse = async (responseId: string) => {
    setIsDeletingResponse(true);

    const confirm = window.confirm(
      `
      Warning! ✋🏽
      
      Are you sure you want to delete this prompt response?
      `
    );

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
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  };
  return (
    <>
      <div
        className='w-[320px] relative group hover:bg-gray-400/10 p-1 mb-1 rounded flex items-center text-slate-600 '
        role='button'
      >
        <a
          href={`/dashboard/${responseId}`}
          className='flex items-center w-full'
        >
          <section>
            <Document className='w-4 h-4 ' />
          </section>

          {isDeletingResponse ? (
            <h3 className='truncate pl-1 text-sm capitalize' title={title}>
              Deleting: <span className='line-through opacity-75'>{title}</span>
            </h3>
          ) : (
            <h3 className='truncate pl-1 text-sm capitalize' title={title}>
              {title || "untitled"}
            </h3>
          )}
        </a>
        <div className='hidden group-hover:inline absolute right-0 z-20'>
          <button
            disabled={isDeletingResponse}
            onClick={() => deleteResponse(responseId)}
            className='bg-white rounded p-1 hover:bg-slate-100 border border-slate-300 mr-[1px]'
          >
            <Trash className='w-4 h-4' />
          </button>
          <button className='bg-white rounded group p-1 hover:bg-slate-100 border border-slate-300 ml-[1px]'>
            <Star
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-yellow-300 text-yellow-300"
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
