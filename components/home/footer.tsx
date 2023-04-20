import React from "react";
import Github from "../shared/icons/github";
import Love from "../shared/icons/love";
import Chat from "../shared/icons/chat";
import Image from "next/image";

type Props = {};

export default function Footer({}: Props) {
  return (
    <section
      className='z-20 px-2 py-5 text-gray-400 bg-gray-900 sm:p-5 text-md md:text-md'
      style={{
        backgroundImage: "url('/_static/illustrations/grid.svg')",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        top: "0",
      }}
    >
      <div className='flex flex-col items-center justify-between max-w-screen-xl mx-auto md:flex-row'>
        <div className='flex items-center space-x-1'>
          <Image
            src='/_static/icons/learn-ease-2.png'
            alt='footer logo'
            width='100'
            height='100'
            className='opacity-75 mb-5 md:mb-0 w-[100px] h-[17.19px]'
          />
          {/* <span>AI</span> */}
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <a
            href='http://'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center space-x-1'
          >
            <Github className='mt-1' />
            <span>GitHub</span>
          </a>
          <a
            href='https://www.buymeacoffee.com/unclebigbay'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center space-x-1'
          >
            <Love className='mt-1' />
            <span>Buy me a coffee</span>
          </a>
          <a
            href='https://twitter.com/unclebigbay143'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center space-x-1'
          >
            <Chat className='mt-1' />
            <span>Feedback</span>
          </a>
        </div>

        <button
          className='flex items-center self-end mt-5 text-sm min-w-42 md:mt-0'
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <p className='mr-1'>Back to top</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5'
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
