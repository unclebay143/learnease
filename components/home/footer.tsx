import React from "react";
import Github from "../shared/icons/github";
import Love from "../shared/icons/love";
import Chat from "../shared/icons/chat";

type Props = {};

export default function Footer({}: Props) {
  return (
    <section
      className='z-20 flex items-center space-x-4 text-md md:text-md w-full justify-center p-5 text-gray-400 bg-gray-900'
      style={{
        backgroundImage: "url('/_static/illustrations/grid.svg')",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        top: "0",
      }}
    >
      <a
        href='http://'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center space-x-1'
      >
        <Github className='mt-1' />
        <span>GitHub</span>
      </a>
      <a
        href='https://www.buymeacoffee.com/unclebigbay'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center space-x-1'
      >
        <Love className='mt-1' />
        <span>Buy me a coffee</span>
      </a>
      <a
        href='http://'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center space-x-1'
      >
        <Chat className='mt-1' />
        <span>Feedback</span>
      </a>
    </section>
  );
}
