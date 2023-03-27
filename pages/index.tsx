import React, { useState } from "react";
import HomeLayout from "@/components/layouts/home";
import PlaceholderSections from "@/components/home/PlaceholderSections";
import Header from "@/components/home/header";
import OSS from "@/components/home/oss";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import ResponseMarkdown from "@/components/app/response-markdown";
import useLocalStorage from "@/lib/hooks/use-local-storage";

export default function Home() {
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const [responseTitle, setResponseTitle] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db

  const handleSubmit = async (prompt: string) => {
    setIsGeneratingResponse(true);
    setResponse(""); //reset previous response to show PlaceholderSections
    setResponseTitle(prompt || promptInputValue);

    const response = await fetch("api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      setIsGeneratingResponse(false);
      return;
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setIsGeneratingResponse(false);
    setUsedAppCount(usedAppCount + 1);

    // show sharer for first time users
    if (!showSharer && usedAppCount + 1 === 1) {
      setShowSharer(true);
    }
  };

  return (
    <HomeLayout>
      <Header
        promptInputValue={promptInputValue}
        setPromptInputValue={setPromptInputValue}
        handleSubmit={handleSubmit}
        isGeneratingResponse={isGeneratingResponse}
        showSharer={showSharer}
      />

      <div className='relative max-w-screen-md mx-auto w-full mt-20'>
        <section className='z-20 relative'>
          <section className='sm:rounded-md border mx-auto border-gray-200 bg-white p-8 shadow-lg'>
            {!response ? (
              <AnimatePresence>
                <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                  <PlaceholderSections loading={isGeneratingResponse} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <ResponseMarkdown markdown={response} title={responseTitle} />
            )}
          </section>
          <OSS stars={2000} />
        </section>
      </div>
    </HomeLayout>
  );
}
