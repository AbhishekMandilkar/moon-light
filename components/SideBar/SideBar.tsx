"use client";
import { cn } from "@/lib/utils";
import { ITabs, getAvailableTabs } from "./SideBarUtils";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ChevronsLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToggle } from "@uidotdev/usehooks";
import { Button } from "../ui/button";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobile?: boolean;
}

export function Sidebar({ className, isMobile }: SidebarProps) {
  const tabs = useMemo(getAvailableTabs, []);
  const pathName = usePathname();
  const [isSidebarOpen, toggleSidebar] = useToggle(false);
  const isTabActive = (tab: string) => {
    return pathName === tab;
  };

  const renderLinkItem = (tab: ITabs, i: number, expanded: boolean) => {
    const isActive = isTabActive(tab.path);
    return (
      <Link
        key={`${tab.name}-${i}`}
        href={tab.path}
        passHref
        className={`flex items-center px-3 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in mb-2 bg-transparent z-10`}
      >
        <SiderBarLabel
          tab={tab}
          key={tab.name}
          isActive={isActive}
          expanded={expanded}
        />
        {isActive && (
          <motion.div
            layoutId="bubble"
            className="absolute inset-0 rounded-sm z-10 bg-secondary drop-shadow-sm"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
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
          {tabs.map((tab, i) => renderLinkItem(tab, i, false))}
        </nav>
      </div>
    );

  return (
    <motion.div layout className={cn("", className)}>
      <div className=" h-full">
        <div className=" py-2 flex flex-col h-full">
          <div className="space-y-1 flex flex-col relative flex-1 justify-between">
            <nav className="px-3">
              {tabs.map((tab, i) => renderLinkItem(tab, i, isSidebarOpen))}
            </nav>
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <motion.div layout className="px-3 flex justify-center">
                <TooltipTrigger asChild className="">
                  <Button variant={"ghost"} onClick={() => toggleSidebar()}>
                    <motion.div
                      animate={!isSidebarOpen ? { rotate: 180 } : { rotate: 0 }}
                      layout
                    >
                      {/* <ChevronsLeft size={18} /> */}
                      <SiderBarLabel
                        tab={{
                          name: "",
                          icon: () => <ChevronsLeft size={18} />,
                          path: "",
                        }}
                        isActive={false}
                        expanded={isSidebarOpen}
                      />
                    </motion.div>
                  </Button>
                </TooltipTrigger>
              </motion.div>
              <TooltipContent>
                <p>{isSidebarOpen ? "Expand" : "Collapse"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
}

const SiderBarLabel = React.memo(function SiderBarLabel({
  tab,
  isActive,
  expanded,
}: {
  tab: ITabs;
  isActive: boolean;
  expanded?: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div layout className="flex z-20 items-center justify-center">
        <motion.div layout layoutId={tab.name}>
          {tab.icon(false, {
            className: `${isActive ? "text-primary" : "text-muted-foreground"}`,
            size: 22,
          })}
        </motion.div>
        {tab.name.length > 0 && (
          <AnimatePresence>
            {expanded && (
              <motion.span
                key={tab.name}
                layout
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                style={{
                  fontSize: 14,
                }}
                className={`ml-3 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } font-medium`}
              >
                {tab.name}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
});
