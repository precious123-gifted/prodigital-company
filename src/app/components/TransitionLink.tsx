"use client"
import { animatePageOut } from "@/lib/animations";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string
  role?: string
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      router.refresh()
      animatePageOut(href, router);
    }
  };

  return (
    <div
      className=""
      onClick={handleClick}
    >
      {children}  
    </div>
  );
};

export default TransitionLink;

