import SlideOverWrapper from "../shared/slider-over";
import Favorites from "./favorites";
import Saved from "./saved";

const data = [
  "Explain JavaScript Currying to me like I'm 5",
  "I want to learn about JavaScript and Python",
  "I want to learn about JavaScript, Python, AI, Machine Learning, Booking, commerce, economics, agric, computer",
  "web3",
  "AI",
  "jknjndfjoidjoijsd",
];

export default function SidebarDashboard({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <SlideOverWrapper title='Dashboard' open={open} setOpen={setOpen}>
      <Favorites items={data} />
      <Saved items={data} />
    </SlideOverWrapper>
  );
}
