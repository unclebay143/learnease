import React from "react";

export default function PromptForm({
  promptInputValue,
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
}: {
  promptInputValue: string;
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
}) {
  const disableButton = !promptInputValue || isGeneratingResponse;
  return (
    <form className='w-full sm:flex items-center space-y-2 sm:space-x-2 sm:space-y-0'>
      <input
        type='text'
        placeholder='What else do you want to learn?'
        className='p-4 w-full sm:w-9/12 rounded text-md bg-white focus:outline-none'
        value={promptInputValue}
        onChange={(e) => setPromptInputValue(e.target.value)}
      />
      <button
        className={`bg-green-700 hover:bg-opacity-100 w-full bg-opacity-90 flex-1 p-4 rounded text-white text-md uppercase ${
          !promptInputValue ? "disabled:bg-opacity-75" : ""
        } ${isGeneratingResponse ? "disabled:bg-opacity-40" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          if (!promptInputValue) {
            return alert("Prompt field cannot be empty...");
          }
          handleSubmit();
        }}
        disabled={disableButton}
      >
        {isGeneratingResponse ? "Please wait..." : "Generate"}
      </button>
    </form>
  );
}
