import React, { ReactNode } from "react";
import ArrowPathReload from "./icons/arrow-path-reload";

const ErrorOccurred = ({
  handleBtnClick,
  hide,
  children,
}: {
  handleBtnClick: Function;
  hide?: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      <section className='flex flex-col justify-center items-center border border-red-300 rounded-lg bg-red-100 py-6 mx-6 text-center mt-10 mx-w-lg'>
        <h3>Something went wrong while generating response.</h3>
        <button
          onClick={() => handleBtnClick()}
          className='mt-3 capitalize flex items-center hover:bg-slate-100 gap-2 rounded border border-gray-400 p-1 px-2 text-sm'
        >
          <ArrowPathReload className='text-slate-600 w-4 h-4' />
          <span className='text-slate-600'>Regenerate response</span>
        </button>
      </section>
      <section className='sm:rounded-lg border mx-auto border-grays-200 p-8 shadow mt-10'>
        {children}
      </section>
    </>
  );
};

export default ErrorOccurred;
