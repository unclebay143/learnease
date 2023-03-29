import ResponseCard from "../app/response-card";
import CollapsibleWrapper from "../shared/collapsible-wrapper";

export default function Saved({ items }: { items: Array<any> }) {
  return (
    <CollapsibleWrapper
      heading='saved'
      placeholder='Your saved items will appear here.'
    >
      {items?.map((d, i) => {
        return <ResponseCard title={d} id={i} key={d + i} />;
      })}
    </CollapsibleWrapper>
  );
}
