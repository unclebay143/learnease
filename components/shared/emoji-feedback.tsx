import { ResponseType } from "context/Response";
import React, { useState } from "react";

const EmojiFeedback = ({
  response,
  hide,
}: {
  response: ResponseType;
  hide: boolean;
}) => {
  const [feedbackSaved, setFeedbackSaved] = useState<boolean | undefined>(
    response?.hasGivenFeedback
  );
  console.log(response);
  const handleSendFeedback = async (isUseful: boolean) => {
    const payload = {
      isUseful,
      responseId: response?.responseId,
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
              className='p-1 px-2 text-sm text-gray-700 bg-gray-300 rounded'
              onClick={() => handleSendFeedback(true)}
            >
              👍 Yes I did
            </button>
            <button
              className='p-1 px-2 text-sm text-gray-700 bg-gray-300 rounded'
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
