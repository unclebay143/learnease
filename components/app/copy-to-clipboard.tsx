import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ToastNotification from "../shared/alert";
import Check from "../shared/icons/check";
import ClipboardDocument from "../shared/icons/clipboard-document";
import styles from "./markdown.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

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
            // reset copied state in 3s to match toast duration
            setTimeout(() => {
              setCopied(false);
            }, 3000);
          }}
        >
          <div>
            {copied ? (
              <AnimatePresence>
                <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                  <Check className='w-6 h-6 text-slate-500' />
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                  <ClipboardDocument className='w-6 h-6 text-slate-500' />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </CopyToClipboard>
      </section>
    </>
  );
}
