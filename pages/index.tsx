import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import AppFeatures from "@/components/home/features-section";
import AppDemo from "@/components/home/demo-section";
import OSS from "@/components/home/oss";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";
import {
  appUsageCount,
  fetchSavedPromptResponses,
  generateResponse,
  getProfile,
  saveResponseCopy,
} from "@/lib/services";
import { handleInsufficientCredits, handleStreamResponse } from "../lib";

export default function Home({ stars }: { stars: number }) {
  const { data: session } = useSession();

  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState<{
    userId: string;
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
  const [response, setResponse] = useState<string>("");

  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);

  // won't work if stream happens immediately
  const scrollToResult = () => {
    if (resultDivRef.current !== null) {
      resultDivRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    return;
  };

  const handleSubmit = async (prompt: string) => {
    setDoneGenerating(false);
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
        setDoneGenerating(true);
        setIsGeneratingResponse(false);
        setUsedAppCount(usedAppCount + 1);
        setSavedPromptResponse({});
        setIsErrorWhileResponding(false);

        if (currentlyLoggedInUser) {
          getProfile();
        }

        // show sharer for first time users
        if (!showSharer && usedAppCount + 1 === 1) {
          setShowSharer(true);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (session) {
      getProfile().then((profile) => setCurrentlyLoggedInUser(profile));
      fetchSavedPromptResponses().then((responses) =>
        setSavedPromptResponses(responses)
      );
    }
  }, [session]);

  useEffect(() => {
    if (doneGenerating) {
      saveResponseCopy({
        userId: currentlyLoggedInUser?.userId,
        title: responseTitle,
        markdown: response,
      });
    }
  }, [doneGenerating]);

  return (
    <HomeLayout>
      <SidebarDashboard
        open={openSidebar}
        setOpen={setOpenSiderbar}
        savedPromptResponses={savedPromptResponses}
        fetchSavedPromptResponses={() => null}
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
      <AppFeatures />
      <AppDemo />

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

      <OSS stars={stars} />
    </HomeLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://api.github.com/repos/unclebay143/learnease",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
    }
  );
  const data = await res.json();

  console.log(data);
  console.log(process.env.GITHUB_OAUTH_TOKEN);

  return {
    props: {
      stars: data.stargazers_count,
    },
    revalidate: 60,
  };
}
