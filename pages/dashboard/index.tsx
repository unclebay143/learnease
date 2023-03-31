import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";

export default function Home({
  stars,
  profile,
}: {
  stars: number;
  profile: Array<any>;
}) {
  const { status, data: session } = useSession();

  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] =
    useState<Object | null>(null);

  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const resultDivRef = useRef<null | HTMLDivElement>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const [savedPromptResponse, setSavedPromptResponse] = useState({});
  const [responseTitle, setResponseTitle] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // state for streaming

  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db

  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const [savedPromptResponses, setSavedPromptResponses] = useState([]);

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
      // increase app use
      await fetch("api/app", {
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

      // show sharer for first time users
      if (!showSharer && usedAppCount + 1 === 1) {
        setShowSharer(true);
      }
    }, 1000);
  };

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch("/api/user");
      const { data } = await res.json();
      setCurrentlyLoggedInUser(data);
    };
    getProfile();
  }, []);

  const fetchSavedPromptResponses = async () => {
    const res = await fetch("/api/response");
    const { data } = await res.json();
    setSavedPromptResponses(data);
  };

  useEffect(() => {
    fetchSavedPromptResponses();
  }, []);

  console.log(typeof window !== "undefined" && !session);

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
      />
      <div className='mb-20'></div>
    </HomeLayout>
  );
}
