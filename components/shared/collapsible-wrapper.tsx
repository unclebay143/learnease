import * as Collapsible from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";
import ArrowPathReload from "./icons/arrow-path-reload";
import ChevronDown from "./icons/chevron-down";
import ChevronUp from "./icons/chevron-up";
import * as Tooltip from "@radix-ui/react-tooltip";
import useLocalStorage from "@/lib/hooks/use-local-storage";

const CollapsibleWrapper = ({
  heading,
  children,
  placeholder,
  grid,
  chevronClassName,
  isLoading,
  openDefault,
  showBtnTooltip,
}: {
  heading?: string;
  children?: ReactNode;
  placeholder?: string;
  grid?: boolean;
  chevronClassName?: string;
  isLoading?: boolean;
  openDefault?: boolean;
  showBtnTooltip?: boolean;
}) => {
  const [openCollapse, setOpenCollapse] = useState(openDefault ? true : false);
  const [showTooltip, setShowTooltip] = useLocalStorage(
    "show-menu-tooltip",
    true
  );

  const handleCloseToolTip = () => {
    setShowTooltip(false);
  };

  return (
    <section>
      <Collapsible.Root
        className='w-full mb-6'
        open={isLoading ? false : openCollapse} // since radix ui disabled prop not working
        onOpenChange={setOpenCollapse}
      >
        <Collapsible.Trigger asChild>
          <div className='flex items-center justify-between cursor-pointer group'>
            <h3 className='text-sm font-semibold uppercase text-slate-700 group-hover:text-gray-900'>
              {heading || ""}
            </h3>
            {showBtnTooltip ? (
              <MenuButtonWithTooltip
                isLoading={isLoading}
                chevronClassName={chevronClassName}
                openCollapse={openCollapse}
                open={!isLoading && showTooltip}
                setOpen={handleCloseToolTip}
              />
            ) : (
              <MenuToggleButton
                isLoading={isLoading}
                chevronClassName={chevronClassName}
                openCollapse={openCollapse}
              />
            )}
          </div>
        </Collapsible.Trigger>

        <Collapsible.Content className='pt-1'>
          {children || (
            <div className='relative h-full p-5 mt-2 overflow-hidden border border-gray-400 border-dashed rounded-lg opacity-75'>
              {grid ? (
                <svg
                  className='absolute inset-0 w-full h-full stroke-gray-900/10'
                  fill='none'
                >
                  <defs>
                    <pattern
                      id='pattern-510798f3-74a4-4150-a0cf-4e93e8f4fbdf'
                      x={0}
                      y={0}
                      width={10}
                      height={10}
                      patternUnits='userSpaceOnUse'
                    >
                      <path d='M-3 13 15-5M-5 5l18-18M-1 21 17 3' />
                    </pattern>
                  </defs>
                  <rect
                    stroke='none'
                    fill='url(#pattern-510798f3-74a4-4150-a0cf-4e93e8f4fbdf)'
                    width='100%'
                    height='100%'
                  />
                </svg>
              ) : null}

              <p className='z-20 text-sm text-gray-400'>
                {placeholder || "Collapsible items will appear here"}
              </p>
            </div>
          )}
        </Collapsible.Content>
      </Collapsible.Root>
    </section>
  );
};

export default CollapsibleWrapper;

const MenuButtonWithTooltip = ({
  open,
  setOpen,
  isLoading,
  chevronClassName,
  openCollapse,
}: {
  open: boolean;
  setOpen: Function;
  isLoading?: boolean;
  chevronClassName?: string;
  openCollapse: boolean;
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root
        open={open}
        // onOpenChange={() => setOpen(false)} // remain comment out to prevent closing the tool tip when the button loses focus
        delayDuration={100}
      >
        <Tooltip.Trigger asChild>
          <button
            title={"Open response menu"}
            className='p-1 text-gray-400 rounded-md outline-none group-hover:bg-gray-300/10 group-hover:text-gray-700 shadow-blackA7'
          >
            {isLoading ? (
              <ArrowPathReload
                className={`${chevronClassName} animate-spin w-4 h-4`}
              />
            ) : openCollapse ? (
              <ChevronUp
                className={`${chevronClassName} w-4 h-4 transition-all`}
              />
            ) : (
              <ChevronDown
                className={`${chevronClassName} w-4 h-4 transition-all`}
              />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade  select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
          sideOffset={5}
        >
          <section className='flex flex-col items-center'>
            <h3 className='text-sm text-gray-600'>
              <span className='font-bold'>Hint:</span> Click arrow to open menu
            </h3>
            <Collapsible.Trigger asChild>
              <button
                onClick={() => setOpen(false)}
                className='p-1 mt-2 text-xs text-gray-600 border border-gray-400 rounded'
              >
                Got it
              </button>
            </Collapsible.Trigger>
          </section>
          <Tooltip.Arrow className='fill-white' />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

const MenuToggleButton = ({
  isLoading,
  chevronClassName,
  openCollapse,
}: {
  isLoading?: boolean;
  chevronClassName?: string;
  openCollapse: boolean;
}) => {
  return (
    <button
      title={"Open response menu"}
      className='p-1 text-gray-400 rounded-md outline-none group-hover:bg-gray-300/10 group-hover:text-gray-700 shadow-blackA7'
    >
      {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                />
              </svg> */}

      {isLoading ? (
        <ArrowPathReload
          className={`${chevronClassName} animate-spin w-4 h-4`}
        />
      ) : openCollapse ? (
        <ChevronUp className={`${chevronClassName} w-4 h-4 transition-all`} />
      ) : (
        <ChevronDown className={`${chevronClassName} w-4 h-4 transition-all`} />
      )}
    </button>
  );
};
