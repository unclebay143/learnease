import React from "react";
import Sharer from "../shared/sharer";
import PromptSuggestions from "./PromptSuggestions";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className='px-5 md:px-20 flex justify-center items-center flex-col py-10'>
      <div className='max-w-screen-md'>
        <section className='text-center mb-10'>
          <h3 className='text-4xl text-white mb-3'>
            Learn with Ease, Master with Confidence.
          </h3>

          {/* <p className='text-gray-400'>Unlock the Power of Learning with AI</p> */}
          {/* <p className='text-gray-500 max-w-md '>
            Your One-Stop Destination for Understanding Complex Tech Concepts.
          </p> */}

          <PromptSuggestions />
        </section>
        <form className='w-full mb-10 sm:flex items-center space-y-2 sm:space-x-2 sm:space-y-0'>
          <input
            type='text'
            name='animal'
            placeholder='What else do you want to learn?'
            className='p-4 w-full sm:w-9/12 rounded text-md bg-white'
          />
          <button className='bg-green-700 w-full bg-opacity-90 flex-1 p-4 rounded text-white text-md uppercase'>
            Generate
          </button>
        </form>

        {/* Todo: Render after user has ran their first prompt request */}
        <Sharer />
      </div>
    </div>
  );
}
