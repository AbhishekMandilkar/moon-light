"use client";

import { ThemeProvider } from "@material-tailwind/react";

const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
export default NextThemeProvider;
