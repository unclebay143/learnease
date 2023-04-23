import React, { ReactNode } from "react";
import ArrowPathReload from "./icons/arrow-path-reload";
import { UserLanguagePairType, UserLevelPairType } from "context/User";

const ErrorOccurred = ({
  handleBtnClick,
  hide,
  children,
  responseTitle,
  language,
  level,
}: {
  handleBtnClick: Function;
  hide?: boolean;
  children: ReactNode;
  responseTitle: string | undefined;
  language: UserLanguagePairType | undefined | null;
  level: UserLevelPairType | undefined | null;
}) => {
  return (
    <>
      <section className='flex flex-col items-center justify-center py-6 mx-6 mt-10 text-center bg-red-100 border border-red-300 rounded-lg mx-w-lg'>
        <h3>Something went wrong while generating response.</h3>
        <button
          onClick={() =>
            handleBtnClick({ prompt: responseTitle, language, level })
          }
          className='flex items-center gap-2 p-1 px-2 mt-3 text-sm capitalize border border-gray-400 rounded hover:bg-slate-100'
        >
          <ArrowPathReload className='w-4 h-4 text-slate-600' />
          <span className='text-slate-600'>Regenerate response</span>
        </button>
      </section>
      <section className='p-8 mx-auto mt-10 border shadow sm:rounded-lg border-grays-200'>
        {children}
      </section>
    </>
  );
};

export default ErrorOccurred;
