"use client";
import React, { FC } from "react";
import { getAvailableTabs } from "./SideBarUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./components/Profile";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-react";

const SideBar: FC<{ onCollapse: () => void; collapsed: boolean }> = ({
  onCollapse,
  collapsed,
}) => {
  const tabList = getAvailableTabs();
  const pathName = usePathname();
  return (
    <div className="py-4 h-screen border border-sky-500 flex flex-col">
      <div className="flex justify-end items-center">
        <span
          className="-mr-3  shadow-xl bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
          onClick={() => onCollapse()}
        >
          {collapsed ? <ArrowCircleRight /> : <ArrowCircleLeft />}
        </span>
      </div>
      <div className="flex-1">
        {tabList.map((tabItem) => (
          <Link href={tabItem.path} key={tabItem.path}>
            <div
              className={`px-4 py-2 flex items-center  m-2 rounded-md cursor-pointer hover:bg-gray-100  ${
                pathName === tabItem.path ? "bg-gray-100 color-white" : ""
              }`}
            >
              {tabItem.icon(true, {
                size: 20,
                color: pathName === tabItem.path ? "black" : "#5C5E64",
                variant: pathName === tabItem.path ? "Bold" : "Linear",
              })}
              {!collapsed && (
                <div
                  style={{ fontSize: 14 }}
                  className={`pl-2 text-md text-gray-600 ${
                    pathName === tabItem.path ? "text-black" : ""
                  }`}
                >
                  {tabItem.name}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {/* <Profile collapsed={collapsed} /> */}
    </div>
  );
};

export default React.memo(SideBar);
