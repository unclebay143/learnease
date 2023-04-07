import { FAVICON_FOLDER } from "@/lib/constants";
import Head from "next/head";

export default function Meta({
  title = "LearnEase - Unlock the Power of Learning with AI",
  description = "Your One-Stop Destination for Easy-to-Understand Tech Concepts with AI Assistance.",
  image = "",
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />

      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href={`${FAVICON_FOLDER}/favicon.ico`}
      />

      <meta name='theme-color' content='#ffffff' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta itemProp='image' content={image} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='https://learnease.vercel.app/' />
      <meta name='twitter:creator' content='@unclebigbay143' />
      <meta
        name='twitter:title'
        content='LearnEase - Your One-Stop Destination for Easy-to-Understand Tech Concepts with AI Assistance.'
      />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  );
}
