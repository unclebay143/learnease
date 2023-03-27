import React from "react";
import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "./markdown.module.css";
import CopyToClipboardButton from "./copy-to-clipboard";

export default function ResponseMarkdown({ markdown, title }) {
  const PreWithCopyToClipboard = ({ children }) => {
    return (
      <pre style={{ position: "relative" }}>
        <CopyToClipboardButton codeBlock={children[0].props.children[0]} />
        {children}
      </pre>
    );
  };
  return (
    <div className={`${styles.result} markdown-container`}>
      <h1 className='capitalize'>{title}</h1>
      <ReactMarkdown
        linkTarget={"_blank"}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          pre: PreWithCopyToClipboard,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const formatedChildren = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <>
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag='div'
                  {...props}
                  wrapLines
                  wrapLongLines
                >
                  {/* passed here because of react/no-children-prop error */}
                  {formatedChildren}
                </SyntaxHighlighter>
              </>
            ) : (
              <code
                className={`overflow-x-scroll ${className}`}
                {...props}
                style={{ borderRadius: "100%" }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {/* passed here because of react/no-children-prop error */}
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
