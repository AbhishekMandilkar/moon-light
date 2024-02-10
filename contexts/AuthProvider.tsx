import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default AuthProvider;
