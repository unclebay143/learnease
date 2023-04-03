import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function DashboardWithResponseId() {
  const { status, data: session } = useSession();
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] =
    useState<Object | null>(null);

  const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  const [isRetrievingResponse, setIsRetrievingResponse] =
    useState<boolean>(true);
  const [isErrorWhileResponding, setIsErrorWhileResponding] =
    useState<boolean>(false);
  const [savedPromptResponse, setSavedPromptResponse] = useState({});

  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const resultDivRef = useRef<null | HTMLDivElement>(null);
  const [responseTitle, setResponseTitle] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // state for streaming

  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const router = useRouter();
  const responseId = router.query?.responseId;

  const fetchResponse = async () => {
    if (responseId) {
      const res = await fetch("/api/response/" + responseId);
      const { data } = await res.json();
      if (data) {
        const { title, markdown } = data;
        setResponseTitle(title);
        setResponse(markdown);
        setSavedPromptResponse(data);
        setIsRetrievingResponse(false);
        scrollToResult();
        return data;
      }
    }
    return false;
  };

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
      setResponse(""); //reset previous response to show PlaceholderSections (isIDle)
      setResponseTitle(prompt || promptInputValue || responseTitle);
      scrollToResult();

      // Adding settimeout to allow scrollToResult work
      setTimeout(async () => {
        setIsGeneratingResponse(true);

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt || promptInputValue || responseTitle,
          }),
        });

        if (!response.ok) {
          setIsErrorWhileResponding(true);
          setIsGeneratingResponse(false);
          return;
        }

        // increase app use
        await fetch("/api/app-use", {
          method: "POST",
        })
          .then(() => console.log("app use increased"))
          .catch((err) => console.log(err));

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
        setSavedPromptResponse({}); // response is not saved yet
        setIsErrorWhileResponding(false);

        // show sharer for first time users
        if (!showSharer && usedAppCount + 1 === 1) {
          setShowSharer(true);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    const res = await fetch("/api/user");
    const { data } = await res.json();
    setCurrentlyLoggedInUser(data);
  };

  const fetchSavedPromptResponses = async () => {
    const res = await fetch("/api/response");
    const { data } = await res.json();
    setSavedPromptResponses(data);
  };

  useEffect(() => {
    getProfile();
    fetchSavedPromptResponses();
  }, []);

  useEffect(() => {
    if (responseId) {
      fetchResponse();
    }
  }, [responseId]);

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
        isGeneratingResponse={isGeneratingResponse || isRetrievingResponse}
        response={response}
        responseTitle={responseTitle}
        fetchSavedPromptResponses={fetchSavedPromptResponses}
        fetchResponse={fetchResponse}
        savedPromptResponse={savedPromptResponse}
        isErrorWhileResponding={isErrorWhileResponding}
      />

      <div className='mb-20'></div>
    </HomeLayout>
  );
}
