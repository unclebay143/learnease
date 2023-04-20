import React from "react";
import Github from "../shared/icons/github";
import CountingNumbers from "../shared/counting-number";
import styles from "./oss.module.css";

export default function OSS({ stars }: { stars: number }) {
  return (
    <div className='my-20 px-5'>
      <div className='mx-auto max-w-md text-center sm:max-w-xl'>
        {/* <h2 className='bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight'> */}
        <h2 className='mt-20 text-5xl leading-10 text-center font-medium text-gray-900'>
          It&apos;s
          <span className='relative mx-2 text-green-600 whitespace-nowrap'>
            open-source
            <svg
              aria-hidden='true'
              viewBox='0 0 418 42'
              className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
              preserveAspectRatio='none'
            >
              <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
            </svg>
          </span>
        </h2>
        <p className='mt-10 text-gray-600 sm:text-lg'>
          {/* <p className='mx-auto mt-6 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7'> */}
          LearnEase source code is available on GitHub as part of learning -
          feel free to read, review, or contribute to it in anyway you see fit!
        </p>
      </div>
      <div className='flex items-center justify-center py-10'>
        <a
          href='https://dub.sh/learnease-github'
          target='_blank'
          rel='noreferrer'
        >
          <div className='flex items-center'>
            <div
              className='flex h-10 items-center space-x-2 rounded-md border border-gray-600 bg-gray-900 p-4'
              style={{
                backgroundImage: "url('/_static/illustrations/grid.svg')",
                backgroundPosition: "center",
                width: "100%",
                top: "0",
              }}
            >
              <Github className='h-5 w-5 text-white' />
              <p className='font-medium text-white'>Star</p>
            </div>
            <div
              className={`${styles.label} bg-gray-900`}
              style={{
                backgroundImage: "url('/_static/illustrations/grid.svg')",
                backgroundPosition: "center",
                width: "100%",
                top: "0",
              }}
            >
              <CountingNumbers
                value={stars}
                className='font-display font-medium text-white'
              />
            </div>
          </div>
        </a>
      </div>

      <div className='flex justify-center text-center'>
        <p>
          Powered by
          <a
            href='https://openai.com/blog/chatgpt'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold text-gray-800 mx-1 hover:underline hover:underline-offset-2'
          >
            ChatGPT
          </a>
          and
          <a
            href='https://vercel.com/docs/concepts/functions/edge-functions'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold text-gray-800 mx-1 hover:underline hover:underline-offset-2'
          >
            Vercel Edge Functions.
          </a>
        </p>
      </div>
    </div>
  );
}
