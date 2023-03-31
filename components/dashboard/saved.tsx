import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Saved({ items }: { items: Array<any> }) {
  return (
    <CollapsibleWrapper
      heading='saved'
      placeholder='Your saved response will appear here.'
    >
      {items.length > 0 ? (
        <>
          {items?.map((item, i) => {
            const { title, responseId } = item;
            return (
              <ResponseCard
                title={title}
                key={responseId}
                responseId={responseId}
              />
            );
          })}
        </>
      ) : null}
    </CollapsibleWrapper>
  );
}
