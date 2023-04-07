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
  saveResponse,
} from "@/lib/services";
import { handleInsufficientCredits, handleStreamResponse } from "../lib";
import LowCreditDialog from "@/components/shared/low-credit-dialog";

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
  const [responseId, setResponseId] = useState<string>("");

  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const [hasLowCredit, setHasLowCredit] = useState<boolean>(false);
  const [hasLowCreditMsg, setHasLowCreditMsg] = useState<string>("");

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
    const { hasSufficientCredits, message } = handleInsufficientCredits({
      usedAppCount,
      currentlyLoggedInUser,
    });
    console.log(hasSufficientCredits);
    console.log(message);
    console.log(currentlyLoggedInUser);
    if (!hasSufficientCredits) {
      setHasLowCredit(true);
      setHasLowCreditMsg(message);
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
      saveResponse({
        title: responseTitle,
        markdown: response,
      }).then((res) => setResponseId(res.responseId));
    }
  }, [doneGenerating]);

  return (
    <HomeLayout>
      <LowCreditDialog
        open={hasLowCredit}
        setOpen={setHasLowCredit}
        text={hasLowCreditMsg}
        showLoginBtn={!session}
        showBuyCreditsBtn={session ? true : false}
      />
      <SidebarDashboard
        open={openSidebar}
        setOpen={setOpenSiderbar}
        savedPromptResponses={savedPromptResponses}
        setSavedPromptResponses={setSavedPromptResponses}
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
        responseId={responseId}
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

  return {
    props: {
      stars: data.stargazers_count,
    },
    revalidate: 60,
  };
}
