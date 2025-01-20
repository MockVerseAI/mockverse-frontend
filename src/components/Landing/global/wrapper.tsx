import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ children, className }: Props) => {
  return <div className={cn("mx-auto w-full px-4 md:px-12 lg:mx-auto lg:max-w-screen-xl", className)}>{children}</div>;
};

export default Wrapper;
