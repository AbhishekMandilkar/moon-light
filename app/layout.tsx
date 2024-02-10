"use client";
import React from "react";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { fontSans } from "./fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/contexts/AuthProvider";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();
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
            <AuthProvider>
              {children}
              <Toaster position="top-center" />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
