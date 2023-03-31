import React from "react";

export default function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={20}
      height={20}
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 15.75l7.5-7.5 7.5 7.5'
      />
    </svg>
  );
}
