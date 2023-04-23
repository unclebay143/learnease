import React, { useState } from "react";
import ResponseMarkdown from "./response-markdown";
import PlaceholderSections from "@/components/home/PlaceholderSections";
import ErrorOccurred from "../shared/error-occurred";
import Image from "next/image";
import Link from "next/link";
import { usePromptResponseContext } from "context/Response";

const PromptResponse = ({ hideHeading }: { hideHeading?: boolean }) => {
  const [focusMode, setFocusMode] = useState<boolean>(true);
  const {
    isGeneratingResponse,
    isErrorWhileResponding,
    response,
    responseNotFound,
    isRetrievingResponse,
    isErrorWhileRetrievingResponse,
    handleGenerateResponse,
  } = usePromptResponseContext();

  const responseMarkdownProps = {
    handleSubmit: handleGenerateResponse,
    loading: isGeneratingResponse,
    focusMode,
    setFocusMode,
  };

  return (
    <div className='relative w-full max-w-screen-md mx-auto mt-20'>
      {hideHeading || responseNotFound ? null : (
        <h3 className='mb-3 text-4xl font-medium text-center'>
          White
          <span className='relative mx-2 text-green-600 whitespace-nowrap'>
            Board
            <svg
              aria-hidden='true'
              viewBox='0 0 418 42'
              className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
              preserveAspectRatio='none'
            >
              <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
            </svg>
          </span>
        </h3>
      )}

      {(!isGeneratingResponse && isErrorWhileResponding) ||
      (!isRetrievingResponse && isErrorWhileRetrievingResponse) ? (
        <ErrorOccurred
          handleBtnClick={handleGenerateResponse}
          hide={isGeneratingResponse}
          responseTitle={response?.title}
          language={response?.language}
          level={response?.level}
        >
          <PlaceholderSections loading={isGeneratingResponse} />
        </ErrorOccurred>
      ) : (
        <section
          className={`sm:rounded-lg border mx-auto  ${
            focusMode ? "bg-white" : ""
          } p-6 md:px-8 shadow mt-10`}
        >
          {responseNotFound ? (
            <section className='flex flex-col items-center justify-center min-h-[50vh]'>
              <Image
                src='/_static/illustrations/not_found.svg'
                alt='not found'
                width='100'
                height='100'
                className='w-full h-56 mt-3'
              />
              <div className='mt-5 text-center text-gray-500'>
                <h3 className='text-lg font-semibold'>
                  The response you&apos;re looking for cannot be found.
                </h3>
                <p className='mb-5 text-sm'>
                  It may have been deleted or the reference ID is invalid.
                </p>
                <Link
                  href='/'
                  className='p-2 text-sm text-gray-500 border rounded border-1'
                >
                  Okay, take me home
                </Link>
              </div>
            </section>
          ) : (
            <>
              {!response?.markdown ? (
                <PlaceholderSections
                  loading={isGeneratingResponse || isRetrievingResponse}
                />
              ) : (
                <>
                  <ResponseMarkdown {...responseMarkdownProps} />
                </>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default PromptResponse;
