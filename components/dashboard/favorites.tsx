import { ResponseType } from "context/Response";
import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Favorites({ items }: { items: ResponseType[] }) {
  const favResponses = items?.filter((item) => item.isFavorite === true);
  return (
    <CollapsibleWrapper
      heading={`my favorites ${
        favResponses?.length > 0 ? `(${favResponses?.length})` : ""
      }`}
      placeholder='Your favorite response will appear here'
    >
      {favResponses?.length > 0 ? (
        <>
          {favResponses?.map((item) => {
            const { responseId } = item;
            return <ResponseCard key={responseId} response={item} />;
          })}
        </>
      ) : null}
    </CollapsibleWrapper>
  );
}
