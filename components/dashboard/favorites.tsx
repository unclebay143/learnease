import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Favorites({
  items,
  fetchSavedPromptResponses,
}: {
  items: Array<any>;
  fetchSavedPromptResponses: Function;
}) {
  const favResponses = items?.filter((item) => item.isFavorite === true);
  return (
    <CollapsibleWrapper
      heading={`my favorites ${
        favResponses?.length > 0 ? `(${favResponses?.length})` : ""
      }`}
      placeholder='Your favorite items will appear here'
    >
      {favResponses?.length > 0 ? (
        <>
          {favResponses?.map((item) => {
            const { title, responseId, isFavorite } = item;
            return (
              <ResponseCard
                isFavorite={isFavorite}
                title={title}
                key={responseId}
                responseId={responseId}
                fetchSavedPromptResponses={fetchSavedPromptResponses}
              />
            );
          })}
        </>
      ) : null}
    </CollapsibleWrapper>
  );
}
