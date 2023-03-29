import SlideOver from "../shared/slider-over";

export default function SidebarDashboard({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <SlideOver title='Dashboard' open={open} setOpen={setOpen}>
      <div className='h-1/2 '>
        <div className='relative h-full p-5 overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75'>
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
        </div>
      </div>
    </SlideOver>
  );
}
