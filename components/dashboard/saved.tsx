import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Saved({
  items,
  setSavedPromptResponses,
}: {
  items: Array<any>;
  setSavedPromptResponses: Function;
}) {
  const savedResWithoutFav = items.filter((item) => item.isFavorite === false);
  return (
    <CollapsibleWrapper
      heading={`saved ${
        savedResWithoutFav?.length > 0 ? `(${savedResWithoutFav?.length})` : ""
      }`}
      placeholder='Your saved response will appear here.'
    >
      {savedResWithoutFav.length > 0 ? (
        <>
          {savedResWithoutFav
            ?.filter((item) => item.isFavorite === false)
            ?.map((item) => {
              const { title, responseId } = item;
              return (
                <ResponseCard
                  title={title}
                  key={responseId}
                  responseId={responseId}
                  setSavedPromptResponses={setSavedPromptResponses}
                />
              );
            })}
        </>
      ) : null}
    </CollapsibleWrapper>
  );
}
