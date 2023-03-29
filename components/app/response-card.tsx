import React from "react";
import Document from "../shared/icons/document";
import Star from "../shared/icons/star";
import Trash from "../shared/icons/trash";

function ResponseCard({
  title,
  id,
  isFavourite,
}: {
  title: string;
  id: string | number;
  isFavourite?: boolean;
}) {
  return (
    <div
      className='relative group hover:bg-gray-400/10 p-1 mb-1 rounded flex items-center text-slate-600 '
      role='button'
    >
      <section>
        <Document className='w-4 h-4 ' />
      </section>

      <h3 className='truncate pl-1 text-sm' title={title}>
        {title || "untitled"}
      </h3>
      <div className='hidden group-hover:inline absolute right-0'>
        <button className='bg-white rounded p-1 hover:bg-slate-100 border border-slate-300 mr-[1px]'>
          <Trash className='w-4 h-4' />
        </button>
        <button className='bg-white rounded p-1 hover:bg-slate-100 border border-slate-300 ml-[1px]'>
          <Star
            className={`w-4 h-4 ${
              isFavourite ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default ResponseCard;
