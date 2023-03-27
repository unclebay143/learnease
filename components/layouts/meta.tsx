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
        rel='apple-touch-icon'
        sizes='180x180'
        href={`${FAVICON_FOLDER}/apple-touch-icon.png`}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href={`${FAVICON_FOLDER}/favicon-32x32.png`}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href={`${FAVICON_FOLDER}/favicon-16x16.png`}
      />
      {/* <link rel='manifest' href='/site.webmanifest' /> */}
      <link
        rel='mask-icon'
        href={`${FAVICON_FOLDER}/safari-pinned-tab.svg`}
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />

      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta itemProp='image' content={image} />
      <link
        rel='shortcut icon'
        href={`${FAVICON_FOLDER}/apple-touch-icon.png`}
      />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@unclebigbay143' />
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
