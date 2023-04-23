import React from "react";
import PromptForm from "../app/prompt-form";
import Sharer from "../shared/sharer";
import PromptSuggestions from "./PromptSuggestions";
import { usePromptResponseContext } from "context/Response";

export default function Hero({}: // promptInputValue,
// handleSubmit,
// setPromptInputValue,
// isGeneratingResponse,
// showSharer,
// language,
// setLanguage,
// level,
// setLevel,
{
  // promptInputValue: string;
  // setPromptInputValue: Function;
  // handleSubmit: Function;
  // isGeneratingResponse: boolean;
  // showSharer: boolean;
  // language: { value: string; label: string };
  // setLanguage: Function;
  // level: { value: string; label: string };
  // setLevel: Function;
}) {
  const { showSharer } = usePromptResponseContext();
  return (
    <div className='flex flex-col items-center justify-center px-5 py-10 md:px-20'>
      <div className='max-w-screen-md'>
        <section className='mb-12 text-center sm:mb-10'>
          <h3 className='mb-3 text-4xl text-white'>
            Learn with Ease, Master with Confidence.
          </h3>

          <PromptSuggestions
          // setPromptInputValue={setPromptInputValue}
          // handleSubmit={handleSubmit}
          // isGeneratingResponse={isGeneratingResponse}
          // language={language}
          // level={level}
          />
        </section>
        <PromptForm
        // promptInputValue={promptInputValue}
        // setPromptInputValue={setPromptInputValue}
        // handleSubmit={handleSubmit}
        // isGeneratingResponse={isGeneratingResponse}
        // language={language}
        // level={level}
        // setLanguage={setLanguage}
        // setLevel={setLevel}
        />
        {showSharer ? <Sharer /> : null}
      </div>
    </div>
  );
}
