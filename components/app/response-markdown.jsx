import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyToClipboardButton from "./copy-to-clipboard";
import ResponseMenu from "./response-menu";
import ToastNotification from "../shared/alert";
import EmojiFeedback from "../shared/emoji-feedback";
import { useUserContext } from "context/User";
import { usePromptResponseContext } from "context/Response";

export default function ResponseMarkdown({
  handleSubmit,
  loading,
  focusMode,
  setFocusMode,
}) {
  const { user } = useUserContext();
  const { response, currentResponseLanguage } = usePromptResponseContext();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDeletingResponse, setIsDeletingResponse] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [favoriteStatusUpdated, setFavoriteStatusUpdated] = useState(false);
  const isNonEnglish =
    currentResponseLanguage?.value?.toLowerCase() !== "english" ||
    response?.language?.toLowerCase() !== "english";

  const saveResponseForUser = async () => {
    setSaving(true);
    const payload = {
      userId: user?.userId,
      responseId: response?.responseId,
    };

    const res = await fetch("/api/response", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const { data } = await res.json();

      setSaved(true);

      setTimeout(() => {
        window.location.href = "/dashboard/" + data?.responseId;
      }, [2000]);
    }
  };

  const deleteResponse = async (responseId) => {
    setIsDeletingResponse(true);

    const confirm = window.confirm("This prompt response will be deleted");

    if (!confirm) {
      setIsDeletingResponse(false);
      return;
    }

    if (!responseId) {
      return;
    }

    const res = await fetch("/api/response/" + responseId, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data?.success) {
      setDeleted(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  };

  return (
    <div className={`markdown-container ${loading ? "min-h-[100vh]" : ""}`}>
      {/* TODO: improve how toast notifications are reused */}
      {saved ? (
        <ToastNotification
          open={saved}
          setOpen={setSaved}
          title='Prompt response saved to dashboard'
          dark
        />
      ) : null}
      {setDeleted ? (
        <ToastNotification
          open={deleted}
          setOpen={setDeleted}
          title='Prompt response deleted successfully'
          dark
        />
      ) : null}
      {favoriteStatusUpdated ? (
        <ToastNotification
          open={favoriteStatusUpdated}
          setOpen={setFavoriteStatusUpdated}
          title='Prompt response favorite updated successfully'
          dark
        />
      ) : null}
      {!response?.user ? (
        <span className='p-1 text-xs text-gray-600 bg-green-300 bg-opacity-50 rounded'>
          {saving ? "Saving" : "Not saved"}
        </span>
      ) : null}
      <ResponseMenu
        reload={handleSubmit}
        isLoading={loading}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        saveResponse={saveResponseForUser}
        saving={saving}
        deleteResponse={deleteResponse}
        isDeletingResponse={isDeletingResponse}
      />
      <h1 className='capitalize'>{response?.title}</h1>

      {isNonEnglish ? (
        <>
          <span className='inline-block p-1 mt-3 text-xs text-gray-600 bg-gray-300 bg-opacity-50 rounded'>
            {response?.language?.value || currentResponseLanguage?.value}
          </span>
        </>
      ) : null}

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
              <div
                className='overflow-x-auto p-[1em]'
                style={{
                  background: "rgb(245, 242, 240)",
                  fontFamily:
                    "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                }}
              >
                <code className={` ${className}`} {...props}>
                  {children}
                </code>
              </div>
            );
          },
        }}
      >
        {/* passed here because of react/no-children-prop error */}
        {response?.markdown}
      </ReactMarkdown>
      <EmojiFeedback hide={loading} response={response} />
    </div>
  );
}

const PreWithCopyToClipboard = ({ children }) => {
  return (
    <pre style={{ position: "relative" }}>
      <CopyToClipboardButton data={children[0].props.children[0]} />
      <div>{children}</div>
    </pre>
  );
};
