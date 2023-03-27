import React, { useState } from "react";
import HomeLayout from "@/components/layouts/home";
import PlaceholderSections from "@/components/home/PlaceholderSections";
import Header from "@/components/home/header";
import OSS from "@/components/home/oss";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { sendPrompt } from "@/lib/prompts";
import ResponseMarkdown from "@/components/app/response-markdown";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { Toast } from "@radix-ui/react-toast";

export default function Home() {
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const [responseTitle, setResponseTitle] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db

  const handleSubmit = (prompt: string) => {
    setIsGeneratingResponse(true);
    setResponse(null); //reset previous response to show PlaceholderSections
    setResponseTitle(prompt || promptInputValue);

    sendPrompt(prompt || promptInputValue)
      .then((res) => {
        setResponse(res);
        setIsGeneratingResponse(false);
        setUsedAppCount(usedAppCount + 1);

        if (!showSharer && usedAppCount + 1 === 1) {
          setShowSharer(true);
        }
      })
      .catch((error) => {
        console.log("something went wrong");
        setIsGeneratingResponse(false);
      });
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
