import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ToastNotification from "../shared/alert";
import styles from "./markdown.module.css";

export default function CopyToClipboardButton({
  codeBlock,
}: {
  codeBlock: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <>
      {copied ? (
        <ToastNotification
          open={copied}
          setOpen={setCopied}
          title='Copied to clipboard'
          dark
        />
      ) : null}
      <section className={`${styles.copyClip}`}>
        <CopyToClipboard
          text={codeBlock}
          onCopy={() => {
            setCopied(true);
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`w-6 h-6 ${
              copied
                ? "text-green-500 hover:text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
            />
          </svg>
        </CopyToClipboard>
      </section>
    </>
  );
}
