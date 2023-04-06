import { ReactNode } from "react";

function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-screen-xl mx-auto w-full px-4 ${className}`}>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
