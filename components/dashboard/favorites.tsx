import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Favorites({ items }: { items: Array<any> }) {
  return (
    <CollapsibleWrapper
      heading='my favorites'
      placeholder='Your favorite items will appear here'
    >
      {items?.map((d, i) => {
        return <ResponseCard title={d} id={i} key={d + i} isFavourite />;
      })}
    </CollapsibleWrapper>
  );
}
