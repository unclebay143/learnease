import React from "react";
import Github from "./icons/github";

const GetInTouch = () => {
  return (
    <section className='max-w-screen-sm px-6 mx-auto my-12 text-center'>
      <h3 className='mb-4 text-2xl font-bold'>Have any Questions?</h3>
      <p className='mb-4 text-gray-600'>
        Do you have any questions or concerns about LearnEase? We&apos;d love to
        hear from you and address any issues you may have.
      </p>
      <section className='flex flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-x-3 sm:flex-row'>
        <a
          href='https://twitter.com/unclebigbay143'
          rel='noreferrer'
          target={"_blank"}
          className='px-2.5 py-2 font-semibold text-gray-700 bg-white rounded-lg text-base'
        >
          👋 Get in touch
        </a>

        <a
          target={"_blank"}
          rel='noreferrer'
          href='https://dub.sh/learnease-github'
          className='flex items-center gap-1 bg-gray-700 text-sm text-white rounded-lg px-2.5 py-2 hover:bg-gray-800'
        >
          <Github />
          Star on Github
        </a>
      </section>
    </section>
  );
};

export default GetInTouch;
