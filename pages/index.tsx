import React, { useState } from "react";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import AppFeatures from "@/components/home/features-section";
import AppDemo from "@/components/home/demo-section";
import OSS from "@/components/home/oss";
import PromptResponse from "@/components/app/result-response-section";
import SidebarDashboard from "@/components/dashboard/sidebar";
import Hero from "@/components/home/hero";
import { useSession } from "next-auth/react";

import LowCreditDialog from "@/components/shared/low-credit-dialog";
import PromptIdeas from "@/components/shared/PromptIdeas";
import Testimonials from "@/components/shared/testimonials";
import { usePromptResponseContext } from "context/Response";

export default function Home({ stars }: { stars: number }) {
  const { data: session } = useSession();
  const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const { isGeneratingResponse, hasLowCredit, lowCreditMsg, setHasLowCredit } =
    usePromptResponseContext();

  return (
    <HomeLayout>
      <LowCreditDialog
        open={hasLowCredit}
        setOpen={setHasLowCredit}
        text={lowCreditMsg}
        showLoginBtn={!session}
        showBuyCreditsBtn={session ? true : false}
      />
      <SidebarDashboard open={openSidebar} setOpen={setOpenSiderbar} />

      <Header setOpenSiderbar={setOpenSiderbar}>
        <Hero />
      </Header>
      <AppFeatures />
      <AppDemo />

      {/* <div ref={resultDivRef}></div> */}
      <PromptResponse />

      {isGeneratingResponse || <PromptIdeas openDefault={true} />}

      <Testimonials />

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
