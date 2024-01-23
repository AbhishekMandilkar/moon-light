"use client";
import React, { useEffect, useState } from "react";

import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import appwriteService, { LoggedInUser } from "@/services/appwrite";
import LoginSignUp from "@/components/LoginSignUp/LoginSignUp";
import { Toaster } from "@/components/ui/sonner";
import { fontSans } from "./fonts";
import { Loader2 } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const [authData, setAuthData] = useState<LoggedInUser>({} as LoggedInUser);
  const [loader, setLoader] = useState(true);
  const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
