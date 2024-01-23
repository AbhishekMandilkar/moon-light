"use client";
import AppHeader from "@/components/AppHeader/AppHeader";
import GlobalActionsWrapper from "@/components/GlobalActionsWrapper/GlobalActionsWrapper";
import { Sidebar } from "@/components/SideBar/SideBar";
import useAuth from "@/contexts/AuthContext";
import { useScreenDetector } from "@/lib/hooks/useScreenDetector";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authData } = useAuth();

  const { isTablet } = useScreenDetector();
  return (
    <GlobalActionsWrapper>
      <div className="md:block bg-background">
        <div className="flex  h-screen">
          <Sidebar
            className="hidden lg:block flex-none border-r-2 w-54"
            key={"web"}
          />
          <div className="flex-1 overflow-y-scroll">
            <div className="h-full">
             <AppHeader />
              <div className=" px-4 py-3 lg:px-8">{children}</div>
            </div>
          </div>
          {isTablet && (
            <Sidebar
              className="block lg:hidden bg-background"
              isMobile
              key={"mobile"}
            />
          )}
        </div>
      </div>
    </GlobalActionsWrapper>
  );
};

export default ProtectedLayout;
