import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyToClipboardButton from "./copy-to-clipboard";

export default function ResponseMarkdown({
  markdown,
  title,
  handleSubmit,
  loading,
}) {
  return (
    <div className='markdown-container min-h-[100vh]'>
      <section className='flex items-center gap-2 justify-between'>
        <h1 className='capitalize'>{title}</h1>

        {loading ? null : (
          <svg
            onClick={() => handleSubmit()}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 text-gray-500 hover:text-gray-700'
            role='button'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        )}
      </section>
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

const PreWithCopyToClipboard = ({ children }) => {
  return (
    <pre style={{ position: "relative" }}>
      <CopyToClipboardButton codeBlock={children[0].props.children[0]} />
      {children}
    </pre>
  );
};
