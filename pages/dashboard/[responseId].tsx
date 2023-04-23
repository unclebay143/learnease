import React, { useEffect, useState } from "react";

import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { fetchSavedPromptResponses, getProfile } from "@/lib/services";
import { usePromptResponseContext } from "context/Response";

export default function DashboardWithResponseId() {
  const { status, data: session } = useSession();
  const {
    fetchResponse,
    response,
    responseNotFound,
    isRetrievingResponse,
    isErrorWhileRetrievingResponse,
  } = usePromptResponseContext();
  // const [savedPromptResponses, setSavedPromptResponses] = useState([]);
  // const [isRetrievingResponse, setIsRetrievingResponse] =
  //   useState<boolean>(true);
  // const [isErrorWhileRetrievingResponse, setIsErrorWhileRetrievingResponse] =
  //   useState<boolean>(false);
  // const [savedPromptResponse, setSavedPromptResponse] = useState({});

  const [responseTitle, setResponseTitle] = useState<string>("");
  // const [response, setResponse] = useState<string>(""); // state for streaming

  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);
  // const [responseNotFound, setResponseNotFound] = useState<boolean>(false);

  const router = useRouter();
  const responseId = router.query?.responseId as string;

  // const fetchResponse = async () => {
  //   if (responseId) {
  //     const res = await fetch("/api/response/" + responseId);
  //     const { data } = await res.json();
  //     if (!data || data?.isDeleted) {
  //       setResponseNotFound(true);
  //       setIsRetrievingResponse(false);
  //       return;
  //     }
  //     const { title, markdown } = data;
  //     setResponseTitle(title);
  //     setResponse(markdown);
  //     setSavedPromptResponse(data);
  //     setIsRetrievingResponse(false);
  //     setOpenSiderbar(false);
  //     return data;
  //   }
  //   setIsErrorWhileRetrievingResponse(true);
  //   return false;
  // };

  // useEffect(() => {
  //   if (session) {
  //     fetchSavedPromptResponses().then((responses) =>
  //       setSavedPromptResponses(responses)
  //     );
  //   }
  // }, [session]);

  // useEffect(() => {
  //   if (responseId) {
  //     fetchResponse();
  //   }
  // }, [responseId]);

  if (
    typeof window !== "undefined" &&
    status !== "loading" &&
    status === "unauthenticated"
  ) {
    return (window.location.href = "/");
  }

  return (
    <HomeLayout>
      <SidebarDashboard open={openSidebar} setOpen={setOpenSiderbar} />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <p className='hidden'>Children</p>
      </Header>
      <PromptResponse
      // isIdle={!response}
      // handleSubmit={() => null}
      // language={{ value: "", label: "" }}
      // level={{ value: "", label: "" }}
      // isGeneratingResponse={isRetrievingResponse}
      // response={response?.markdown}
      // responseTitle={responseTitle}
      // fetchSavedPromptResponses={fetchSavedPromptResponses}
      // fetchResponse={fetchResponse}
      // savedPromptResponse={savedPromptResponse}
      // isErrorWhileResponding={isErrorWhileRetrievingResponse}
      // responseId={responseId}
      // responseNotFound={responseNotFound}
      />

      <div className='mb-20'></div>
    </HomeLayout>
  );
}
