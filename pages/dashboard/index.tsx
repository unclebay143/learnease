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
  saveResponse,
} from "@/lib/services";
import { useRouter } from "next/router";
import ToastNotification from "@/components/shared/alert";
import LowCreditDialog from "@/components/shared/low-credit-dialog";
import { SUPPORTED_LANGUAGES, SUPPORTED_LEVELS } from "@/lib/constants";
import PromptIdeas from "@/components/shared/PromptIdeas";

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
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const [responseId, setResponseId] = useState<string>("");
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);
  const [hasLowCredit, setHasLowCredit] = useState<boolean>(false);
  const [hasLowCreditMsg, setHasLowCreditMsg] = useState<string>("");
  const [language, setLanguage] = useState<{ value: string; label: string }>(
    SUPPORTED_LANGUAGES[0]
  );
  const [level, setLevel] = useState<{ value: string; label: string }>(
    SUPPORTED_LEVELS[0]
  );
  const router = useRouter();

  // won't work if stream happens immediately
  const scrollToResult = () => {
    if (resultDivRef.current !== null) {
      resultDivRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    return;
  };

  const handleSubmit = async ({
    prompt,
    language,
    level,
  }: {
    prompt: string;
    language: { value: string; label: string };
    level: { value: string; label: string };
  }) => {
    console.log(language, level);
    try {
      setDoneGenerating(false);

      const { hasSufficientCredits, message } = handleInsufficientCredits({
        usedAppCount,
        currentlyLoggedInUser,
      });

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

        const generateRes = await generateResponse({
          prompt: prompt || promptInputValue,
          language: language.value,
          level: level.value,
        });

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
      getProfile().then((profile) => {
        setCurrentlyLoggedInUser(profile);
        setLanguage(
          profile?.language?.value
            ? { label: profile.language, value: profile.language }
            : SUPPORTED_LANGUAGES[0]
        );
        setLevel(
          profile?.level?.value
            ? { label: profile.level, value: profile.level }
            : SUPPORTED_LEVELS[0]
        );
      });
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
        language: language.value,
        level: level.value,
      }).then((res) => setResponseId(res.responseId));
    }
  }, [doneGenerating]);

  useEffect(() => {
    if (router.query.status === "successful") {
      setPaymentSuccessful(true);
      // https://stackoverflow.com/a/72346195
      router.replace("/dashboard", undefined, { shallow: true }); // clear query params from browser bar
    }
  }, [router.query]);

  if (
    typeof window !== "undefined" &&
    status !== "loading" &&
    status === "unauthenticated"
  ) {
    return (window.location.href = "/");
  }

  return (
    <HomeLayout>
      <LowCreditDialog
        open={hasLowCredit}
        setOpen={setHasLowCredit}
        text={hasLowCreditMsg}
        showBuyCreditsBtn
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
          language={language}
          level={level}
          setLanguage={setLanguage}
          setLevel={setLevel}
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
        responseId={responseId}
        language={language}
        level={level}
      />

      {isGeneratingResponse || (
        <PromptIdeas
          setPromptInputValue={setPromptInputValue}
          handleSubmit={handleSubmit}
          isGeneratingResponse={isGeneratingResponse}
          language={language}
          level={level}
          openDefault
        />
      )}
      <div className='mb-20'></div>
      {paymentSuccessful ? (
        <ToastNotification
          open={paymentSuccessful}
          setOpen={setPaymentSuccessful}
          title='Credit purchase successfully'
          dark
        />
      ) : null}
    </HomeLayout>
  );
}
