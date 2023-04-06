import React, { useEffect, useState } from "react";

import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { fetchSavedPromptResponses, getProfile } from "@/lib/services";

export default function DashboardWithResponseId() {
  const { status, data: session } = useSession();
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState<{
    credits: number;
    freeCredits: number;
  } | null>(null);

  const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  const [isRetrievingResponse, setIsRetrievingResponse] =
    useState<boolean>(true);
  const [isErrorWhileRetrievingResponse, setIsErrorWhileRetrievingResponse] =
    useState<boolean>(false);
  const [savedPromptResponse, setSavedPromptResponse] = useState({});

  const [responseTitle, setResponseTitle] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // state for streaming

  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const router = useRouter();
  const responseId = router.query?.responseId as string;

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
        return data;
      }
    }
    setIsErrorWhileRetrievingResponse(true);
    return false;
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
        setSavedPromptResponses={setSavedPromptResponses}
        currentlyLoggedInUser={currentlyLoggedInUser}
      />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <p className='hidden'>Children</p>
      </Header>
      <PromptResponse
        currentlyLoggedInUser={currentlyLoggedInUser}
        isIdle={!response}
        handleSubmit={() => null}
        isGeneratingResponse={isRetrievingResponse}
        response={response}
        responseTitle={responseTitle}
        fetchSavedPromptResponses={fetchSavedPromptResponses}
        fetchResponse={fetchResponse}
        savedPromptResponse={savedPromptResponse}
        isErrorWhileResponding={isErrorWhileRetrievingResponse}
        responseId={responseId}
      />

      <div className='mb-20'></div>
    </HomeLayout>
  );
}
