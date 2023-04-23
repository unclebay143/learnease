import React, { useEffect, useRef, useState } from "react";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import ToastNotification from "@/components/shared/alert";
import LowCreditDialog from "@/components/shared/low-credit-dialog";
import PromptIdeas from "@/components/shared/PromptIdeas";
import { usePromptResponseContext } from "context/Response";

export default function Dashboard() {
  const { status } = useSession();
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  const resultDivRef = useRef<null | HTMLDivElement>(null);
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);

  const { hasLowCredit, lowCreditMsg, setHasLowCredit } =
    usePromptResponseContext();
  const router = useRouter();

  // won't work if stream happens immediately
  const scrollToResult = () => {
    if (resultDivRef.current !== null) {
      resultDivRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    return;
  };

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
        text={lowCreditMsg}
        showBuyCreditsBtn
      />

      <SidebarDashboard open={openSidebar} setOpen={setOpenSiderbar} />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <Hero />
      </Header>
      <div ref={resultDivRef}></div>
      <PromptResponse />

      {isGeneratingResponse || <PromptIdeas openDefault />}
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
