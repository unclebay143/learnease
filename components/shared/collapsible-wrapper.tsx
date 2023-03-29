import * as Collapsible from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";

const CollapsibleWrapper = ({
  heading,
  children,
  placeholder,
  grid,
}: {
  heading: string;
  children?: ReactNode;
  placeholder?: string;
  grid?: boolean;
}) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <section>
      <Collapsible.Root
        className='w-[300px] mb-6'
        open={openCollapse}
        onOpenChange={setOpenCollapse}
      >
        <Collapsible.Trigger asChild>
          <div className='flex items-center justify-between group cursor-pointer'>
            <h3 className='text-sm text-slate-700 group-hover:text-gray-900 font-semibold group-black uppercase'>
              {heading}
            </h3>
            <button className='rounded-md group-hover:bg-gray-300/10 group-hover:text-gray-700 p-1 text-gray-400 shadow-blackA7 outline-none'>
              {openCollapse ? (
                <svg
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
                    d='M4.5 15.75l7.5-7.5 7.5 7.5'
                  />
                </svg>
              ) : (
                <svg
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
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              )}
            </button>
          </div>
        </Collapsible.Trigger>

        <Collapsible.Content className='pt-1'>
          {children || (
            <div className='mt-2 relative h-full p-5 overflow-hidden rounded-lg border border-dashed border-gray-400 opacity-75'>
              {grid ? (
                <svg
                  className='absolute inset-0 h-full w-full stroke-gray-900/10'
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

              <p className='text-gray-400 text-sm z-20'>
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
