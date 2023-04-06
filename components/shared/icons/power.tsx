import React from "react";

export default function Power({ className }: { className?: string }) {
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
        d='M5.636 5.636a9 9 0 1012.728 0M12 3v9'
      />
    </svg>
  );
}
