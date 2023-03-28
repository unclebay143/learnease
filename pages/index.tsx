import React, { useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import AppFeatures from "@/components/home/features-section";
import AppDemo from "@/components/home/demo-section";
import OSS from "@/components/home/oss";
import PromptResponse from "@/components/app/result-response-section";

export default function Home() {
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const [responseTitle, setResponseTitle] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  const resultDivRef = useRef<null | HTMLDivElement>(null);

  // won't work if stream happens immediately
  const scrollToResult = () => {
    if (resultDivRef.current !== null) {
      resultDivRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    return;
  };

  const handleSubmit = async (prompt: string) => {
    setResponse(""); //reset previous response to show PlaceholderSections (isIDle)
    setResponseTitle(prompt || promptInputValue);
    scrollToResult();

    // Adding settimeout to allow scrollToResult work
    setTimeout(async () => {
      setIsGeneratingResponse(true);

      const response = await fetch("api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt || promptInputValue }),
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
    }, 1000);
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
      <AppFeatures />
      <AppDemo />
      <div ref={resultDivRef}></div>
      <PromptResponse
        isIdle={!response}
        handleSubmit={handleSubmit}
        isGeneratingResponse={isGeneratingResponse}
        response={response}
        responseTitle={responseTitle}
      />
      <OSS stars={2000} />
    </HomeLayout>
  );
}
