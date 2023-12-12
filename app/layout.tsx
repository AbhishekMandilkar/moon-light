"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "@/lib/AntdRegistry";

import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";
import useAuth, { AuthProvider } from "@/contexts/AuthContext";
import appwriteService from "@/services/appwrite";
import { Models } from "appwrite";
import { Spin } from "antd";
import LoginSignUp from "@/components/LoginSignUp/LoginSignUp";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    };
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const renderMainView = () => (!!authData ? children : <LoginSignUp />);

  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="font-sans">
        <StyledComponentsRegistry>
          <ThemeProvider>
            <AuthProvider
              value={{ setAuthData: setAuthData, authData: authData }}
            >
              {loader ? <Spin /> : renderMainView()}
            </AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
