import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyToClipboardButton from "./copy-to-clipboard";
import ResponseMenu from "./response-menu";
import ToastNotification from "../shared/alert";
import EmojiFeedback from "../shared/emoji-feedback";

export default function ResponseMarkdown({
  markdown,
  title,
  handleSubmit,
  loading,
  focusMode,
  setFocusMode,
  currentlyLoggedInUser,
  fetchSavedPromptResponses,
  savedPromptResponse,
  fetchResponse,
  responseId,
  language,
  level,
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDeletingResponse, setIsDeletingResponse] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [favoriteStatusUpdated, setFavoriteStatusUpdated] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  const saveResponseForUser = async () => {
    setSaving(true);
    const payload = {
      userId: currentlyLoggedInUser?.userId,
      responseId,
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

      fetchSavedPromptResponses();
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

  const toggleFavorite = async (responseId) => {
    setIsUpdatingFavorite(true);

    try {
      const res = await fetch("/api/response/" + responseId, {
        method: "PUT",
      });
      fetchSavedPromptResponses();
      setFavoriteStatusUpdated(true);
      await fetchResponse().then((res) => {
        setIsUpdatingFavorite(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`markdown-container ${loading ? "min-h-[100vh]" : ""}`}>
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

      {!savedPromptResponse?.responseId ? (
        <span className='p-1 text-xs text-gray-600 bg-green-300 bg-opacity-50 rounded'>
          {saving ? "Saving" : "Not saved"}
        </span>
      ) : null}

      <ResponseMenu
        currentlyLoggedInUser={currentlyLoggedInUser}
        reload={handleSubmit}
        prompt={title}
        language={language}
        level={level}
        isLoading={loading}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        saveResponse={saveResponseForUser}
        saving={saving}
        deleteResponse={deleteResponse}
        isDeletingResponse={isDeletingResponse}
        savedPromptResponse={savedPromptResponse}
        toggleFavorite={toggleFavorite}
        isUpdatingFavorite={isUpdatingFavorite}
      />

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

      <EmojiFeedback
        responseId={savedPromptResponse?.responseId || responseId}
        hasGivenFeedback={savedPromptResponse?.hasGivenFeedback}
        hide={loading}
      />
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
