"use client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ITabs, getAvailableTabs } from "./SideBarUtils";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { fontMono } from "@/app/fonts";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import ThemeToggle from "../Common/ThemeToggle";
import ActionBar from "./ActionBar";
import BrandLogo from "../Common/BrandLogo";
import { motion } from "framer-motion";
import React from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobile?: boolean;
}

export function Sidebar({ className, isMobile }: SidebarProps) {
  const tabs = useMemo(getAvailableTabs, []);
  const pathName = usePathname();

  const isTabActive = (tab: string) => {
    return pathName === tab;
  };

  const renderLinkItem = (tab: ITabs, i: number) => {
    const isActive = isTabActive(tab.path);
    return (
      <Link
        key={`${tab}-${i}`}
        href={tab.path}
        passHref
        className={`flex items-center px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in mb-2 bg-transparent z-10`}
      >
        <SiderBarLabel tab={tab} key={tab.name} />
        {isActive && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 rounded-sm z-10 bg-secondary"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          />
        )}
      </Link>
    );
  };

  if (isMobile)
    return (
      <div className={cn("absolute bottom-0 w-full z-50", className)}>
        <nav className="flex border-2 p-2 justify-evenly">
          {tabs.map((tab, i) => renderLinkItem(tab, i))}
        </nav>
      </div>
    );

  return (
    <div className={cn("", className)}>
      <div className="space-y-4 pt-4 h-full">
        <div className=" py-2 flex flex-col h-full">
          <span className="flex items-center justify-between pb-4 rounded-md px-3">
            <BrandLogo />
          </span>
          <div className="space-y-1 flex flex-col relative flex-1 justify-between">
            <nav className="px-3">
              {tabs.map((tab, i) => renderLinkItem(tab, i))}
            </nav>
            <span className="flex items-center justify-between bottom-0 border-t-2">
              <ActionBar />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SiderBarLabel = React.memo(function SiderBarLabel({
  tab,
}: {
  tab: ITabs;
}) {
  return (
    <div className="flex z-20 items-center">
      {tab.icon(false, {
        className: "mr-4",
      })}
      {tab.name}
    </div>
  );
});

