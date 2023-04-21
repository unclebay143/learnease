import { FAVICON_FOLDER } from "@/lib/constants";
import Head from "next/head";

export default function Meta({
  sitename = "LearnEase.vercel.app",
  title = "LearnEase - Unlock the Power of Learning with AI",
  description = "Your One-Stop Destination for Easy-to-Understand Tech Concepts with AI Assistance.",
  image = "https://learnease.vercel.app/_static/demo/og-image.png",
}: {
  sitename?: string;
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' href={`${FAVICON_FOLDER}/favicon.ico`} />
      <meta name='description' content={description} />

      <meta property='og:site_name' content={sitename} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  );
}
