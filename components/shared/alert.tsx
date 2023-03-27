import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

const ToastNotification = ({
  open,
  setOpen,
  title,
  description,
  actionTitle,
  dark,
}: {
  open: boolean;
  setOpen: Function;
  title: string;
  description?: string;
  actionTitle?: string;
  dark?: boolean;
}) => {
  const [scrollY, setScrollY] = React.useState(0);

  const onScroll = React.useCallback(() => {
    const { pageYOffset, scrollY } = window;
    console.log("yOffset", pageYOffset, "scrollY", scrollY);
    setScrollY(window.pageYOffset);
  }, []);

  React.useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        className={`${
          dark ? "bg-gray-800" : "bg-white"
        } rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut`}
        open={open}
        onOpenChange={() => setOpen(false)}
        style={{
          backgroundImage: "url('/_static/illustrations/grid.svg')",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          top: "0",
        }}
      >
        <Toast.Title
          className={`[grid-area:_title]  font-medium ${
            dark ? "text-white" : "text-slate12"
          } text-[15px]`}
        >
          {title || "Action completed"}
        </Toast.Title>
        {description && (
          <Toast.Description className='mt-[5px]' asChild>
            {description}
          </Toast.Description>
        )}
        {actionTitle ? (
          <Toast.Action
            className='[grid-area:_action]'
            asChild
            altText='Goto schedule to undo'
          >
            <button className='inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8'>
              {actionTitle}
            </button>
          </Toast.Action>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`w-5 h-5 ${dark ? "text-white" : "text-slate12"} `}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 12.75l6 6 9-13.5'
            />
          </svg>
        )}
      </Toast.Root>
      <Toast.Viewport
        className={`[--viewport-padding:_25px] fixed ${
          scrollY >= 1270 ? "bottom-20" : "bottom-0"
        } right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none`}
      />
    </Toast.Provider>
  );
};

export default ToastNotification;
