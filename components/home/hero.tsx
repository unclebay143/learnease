import React from "react";
import PromptForm from "../app/prompt-form";
import Sharer from "../shared/sharer";
import PromptSuggestions from "./PromptSuggestions";

export default function Hero({
  promptInputValue,
  handleSubmit,
  setPromptInputValue,
  isGeneratingResponse,
  showSharer,
}: {
  promptInputValue: string;
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  showSharer: boolean;
}) {
  return (
    <div className='px-5 md:px-20 flex justify-center items-center flex-col py-10'>
      <div className='max-w-screen-md'>
        <section className='text-center mb-10'>
          <h3 className='text-4xl text-white mb-3'>
            Learn with Ease, Master with Confidence.
          </h3>

          <PromptSuggestions
            setPromptInputValue={setPromptInputValue}
            handleSubmit={handleSubmit}
            isGeneratingResponse={isGeneratingResponse}
          />
        </section>
        <PromptForm
          promptInputValue={promptInputValue}
          setPromptInputValue={setPromptInputValue}
          handleSubmit={handleSubmit}
          isGeneratingResponse={isGeneratingResponse}
        />
        {showSharer ? <Sharer /> : null}
      </div>
    </div>
  );
}
