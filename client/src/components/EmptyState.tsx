import { ReactNode } from "react";

const EmptyState = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center" style={{width:"80vw"}}>
      {children}
    </div>
  );
};

export default EmptyState;
