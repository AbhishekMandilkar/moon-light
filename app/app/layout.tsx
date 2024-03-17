"use client";
import AppHeader from "@/components/AppHeader/AppHeader";
import GlobalActionsWrapper from "@/components/GlobalActionsWrapper/GlobalActionsWrapper";
import { Sidebar } from "@/components/SideBar/SideBar";
import { useScreenDetector } from "@/lib/hooks/useScreenDetector";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

import { Moon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");


  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex flex-1 justify-center items-center animate-bounce">
        <Moon size={180} />
      </div>
    );
  }

  if (!isSignedIn) {
   router.replace("/");
  }

  return (
    <GlobalActionsWrapper>
      <div className="bg-background h-screen w-screen">
        <div className="flex h-screen w-screen">
          <Sidebar
            className="hidden lg:block flex-none border-r-2 w-54"
            key={"web"}
          />
          <div className="flex-1 h-full max-h-screen flex flex-col">
            <AppHeader />
            <motion.div layout className="flex-1 overflow-y-auto">
              {children}
            </motion.div>
          </div>
          {isSmallDevice && (
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
