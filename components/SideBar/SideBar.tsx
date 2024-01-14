"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { getAvailableTabs } from "./SideBarUtils";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { fontMono } from "@/app/fonts";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import ThemeToggle from "../common/ThemeToggle";
import ActionBar from "./ActionBar";
import BrandLogo from "../common/BrandLogo";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const tabs = useMemo(getAvailableTabs, []);
  const pathName = usePathname();

  const isTabActive = (tab: string) => {
    return pathName === tab;
  };
  
  return (
    <div className={cn("", className)}>
      <div className="space-y-4 pt-4 h-full">
        <div className=" py-2 flex flex-col h-full">
          <span className="flex items-center justify-between pb-4 rounded-md px-3">
           <BrandLogo />
          </span>
          <div className="space-y-1 flex flex-col relative flex-1 justify-between">
            <div className="px-3">
              {tabs.map((tab, i) => (
                <nav key={`${tab}-${i}`}>
                  <Button
                    asChild
                    variant={isTabActive(tab.path) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link
                      href={tab.path}
                      passHref
                      key={tab.name}
                      className="mb-1"
                    >
                      {tab.icon(false, {
                        className: "mr-4",
                      })}
                      {tab.name}
                    </Link>
                  </Button>
                </nav>
              ))}
            </div>
            <span className="flex items-center justify-between bottom-0 border-t-2">
              <ActionBar />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
