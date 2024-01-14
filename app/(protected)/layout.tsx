"use client";
import { Sidebar } from "@/components/side-bar/SideBar";
import useAuth from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authData } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-6">
              <Sidebar className="hidden lg:block h-screen" />
              <div className="col-span-5 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
