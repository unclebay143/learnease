import "@/styles/globals.css";
import { ToastProvider } from "@radix-ui/react-toast";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
