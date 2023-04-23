import { ResponseType } from "context/Response";
import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Saved({ items }: { items: ResponseType[] }) {
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
              const { responseId } = item;
              return <ResponseCard key={responseId} response={item} />;
            })}
        </>
      ) : null}
    </CollapsibleWrapper>
  );
}
