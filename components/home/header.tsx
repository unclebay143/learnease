import React from "react";
import Hero from "./hero";

import Navbar from "./navbar";

export default function Header({
  setOpenSiderbar,
  promptInputValue,
  setPromptInputValue,
  handleSubmit,
  isGeneratingResponse,
  showSharer,
}: {
  setOpenSiderbar: Function;
  promptInputValue: string;
  setPromptInputValue: Function;
  handleSubmit: Function;
  isGeneratingResponse: boolean;
  showSharer: boolean;
}) {
  return (
    <header
      className='bg-gray-900'
      style={{
        backgroundImage: "url('/_static/illustrations/grid.svg')",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        top: "0",
      }}
    >
      <Navbar setOpenSiderbar={setOpenSiderbar} />
      <Hero
        promptInputValue={promptInputValue}
        setPromptInputValue={setPromptInputValue}
        handleSubmit={handleSubmit}
        isGeneratingResponse={isGeneratingResponse}
        showSharer={showSharer}
      />
    </header>
  );
}
