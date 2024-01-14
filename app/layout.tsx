"use client";
import React, { useEffect, useState } from "react";

import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { usePathname, useRouter } from "next/navigation";
import useAuth, { AuthProvider } from "@/contexts/AuthContext";
import appwriteService from "@/services/appwrite";
import { Models } from "appwrite";
import LoginSignUp from "@/components/login-sign-up/LoginSignUp";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { fontSans } from "./fonts";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Loader2 } from "lucide-react";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const [authData, setAuthData] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loader, setLoader] = useState(true);

  const checkIfLoggedIn = async () => {
    setLoader(true);
    const loggedInData = await appwriteService.isLoggedIn();
    setLoader(false);
    if (loggedInData) {
      setAuthData(loggedInData);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const renderMainView = () => (!!authData ? children : <LoginSignUp />);
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased transition-all`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider
            value={{ setAuthData: setAuthData, authData: authData }}
          >
            {loader ? (
              <div className="w-max h-screen mx-auto items-center flex">
                <Loader2 className="animate-spin" size={50} />
              </div>
            ) : (
              renderMainView()
            )}
            <Toaster position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
