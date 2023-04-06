import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";
import { handleInsufficientCredits, handleStreamResponse } from "@/lib/index";
import {
  appUsageCount,
  fetchSavedPromptResponses,
  generateResponse,
  getProfile,
} from "@/lib/services";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState<{
    credits: number;
    freeCredits: number;
  } | null>(null);

  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const resultDivRef = useRef<null | HTMLDivElement>(null);
  const [isErrorWhileResponding, setIsErrorWhileResponding] =
    useState<boolean>(false);

  const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  const [savedPromptResponse, setSavedPromptResponse] = useState({});
  const [responseTitle, setResponseTitle] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // state for streaming

  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  // won't work if stream happens immediately
  const scrollToResult = () => {
    if (resultDivRef.current !== null) {
      resultDivRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    return;
  };

  const handleSubmit = async (prompt: string) => {
    try {
      const hasSufficientCredits = handleInsufficientCredits({
        usedAppCount,
        currentlyLoggedInUser,
      });

      if (!hasSufficientCredits) {
        return;
      }

      setResponse(""); //reset previous response to show PlaceholderSections (isIDle)
      setResponseTitle(prompt || promptInputValue);
      scrollToResult();

      // Adding settimeout to allow scrollToResult work
      setTimeout(async () => {
        setIsGeneratingResponse(true);

        const generateRes = await generateResponse(prompt || promptInputValue);

        if (!generateRes.ok) {
          setIsErrorWhileResponding(true);
          setIsGeneratingResponse(false);
          return;
        }

        appUsageCount();

        const done = await handleStreamResponse({
          data: generateRes.body,
          setResponse,
        });

        if (done) {
          setIsGeneratingResponse(false);
          setUsedAppCount(usedAppCount + 1);
          setSavedPromptResponse({}); // response is not saved yet
          setIsErrorWhileResponding(false);
          getProfile();

          // show sharer for first time users
          if (!showSharer && usedAppCount + 1 === 1) {
            setShowSharer(true);
          }
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      getProfile().then((profile) => setCurrentlyLoggedInUser(profile));
      fetchSavedPromptResponses().then((responses) =>
        setSavedPromptResponses(responses)
      );
    }
  }, [session]);

  if (
    typeof window !== "undefined" &&
    status !== "loading" &&
    status === "unauthenticated"
  ) {
    return (window.location.href = "/");
  }

  return (
    <HomeLayout>
      <SidebarDashboard
        open={openSidebar}
        setOpen={setOpenSiderbar}
        savedPromptResponses={savedPromptResponses}
        fetchSavedPromptResponses={fetchSavedPromptResponses}
        currentlyLoggedInUser={currentlyLoggedInUser}
      />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <Hero
          promptInputValue={promptInputValue}
          setPromptInputValue={setPromptInputValue}
          handleSubmit={handleSubmit}
          isGeneratingResponse={isGeneratingResponse}
          showSharer={showSharer}
        />
      </Header>
      <div ref={resultDivRef}></div>
      <PromptResponse
        currentlyLoggedInUser={currentlyLoggedInUser}
        isIdle={!response}
        handleSubmit={handleSubmit}
        isGeneratingResponse={isGeneratingResponse}
        response={response}
        responseTitle={responseTitle}
        fetchSavedPromptResponses={fetchSavedPromptResponses}
        savedPromptResponse={savedPromptResponse}
        fetchResponse={() => null}
        isErrorWhileResponding={isErrorWhileResponding}
      />
      <div className='mb-20'></div>
    </HomeLayout>
  );
}
