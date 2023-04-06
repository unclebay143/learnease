import React, { useState } from "react";

const EmojiFeedback = ({
  responseId,
  hasGivenFeedback,
  hide,
}: {
  title: string;
  markdown: string;
  responseId?: string;
  hasGivenFeedback: boolean;
  hide: boolean;
}) => {
  const [feedbackSaved, setFeedbackSaved] = useState<boolean>(hasGivenFeedback);

  const handleSendFeedback = async (isUseful: boolean) => {
    const payload = {
      isUseful,
      responseId,
    };

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setFeedbackSaved(true);
  };

  return (
    <section
      className={`${
        hide ? "hidden" : "flex"
      } items-center gap-4 mt-10 flex-col border-t pt-5`}
    >
      {feedbackSaved ? (
        <h3> 🎉 Thank you for your valuable feedback! </h3>
      ) : (
        <>
          <h3 className='text-sm'>Did you find this response useful?</h3>
          <section className='flex items-center gap-2'>
            <button
              className='bg-gray-300 rounded p-1 text-sm px-2 text-gray-700'
              onClick={() => handleSendFeedback(true)}
            >
              👍 Yes I did
            </button>
            <button
              className='bg-gray-300 rounded p-1 text-sm px-2 text-gray-700'
              onClick={() => handleSendFeedback(false)}
            >
              👎 Not Exactly
            </button>
          </section>
        </>
      )}
    </section>
  );
};

export default EmojiFeedback;
