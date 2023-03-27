import React from "react";
import Github from "../shared/background/icons/github";
import Love from "../shared/background/icons/love";
import Chat from "../shared/background/icons/chat";

type Props = {};

export default function Footer({}: Props) {
  return (
    <section
      className='z-20 flex items-center space-x-4 text-md md:text-md w-full justify-center p-5 text-gray-400 bg-gray-800'
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
        <Github />
        <span>GitHub</span>
      </a>
      <a
        href='https://www.buymeacoffee.com/unclebigbay'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center space-x-1'
      >
        <Love />
        <span>Buy me a coffee</span>
      </a>
      <a
        href='http://'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center space-x-1'
      >
        <Chat />
        <span>Feedback</span>
      </a>
    </section>
  );
}
