"use client"
import { getKeyboardShortcuts } from "@/constants/KeyboardShortcuts";
import useAuth from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  children: ReactNode;
}

enum IActionCode {
  DarkMode = "darkMode",
  Settings = "settings",
  LogOut = "logOut",
}

function GlobalActionsWrapper({ children }: Props) {
  const {
    authData: { name, email },
  } = useAuth();
  const { theme, setTheme, systemTheme } = useTheme();
  const keyboardShortcuts = getKeyboardShortcuts();

  const onActionClick = (action: IActionCode) => {
    switch (action) {
      case IActionCode.DarkMode:
        setTheme(theme === "light" ? "dark" : "light");
        break;
      case IActionCode.Settings:
        break;
      case IActionCode.LogOut:
        break;
      default:
        break;
    }
  };

  useHotkeys(keyboardShortcuts.toggleDarkMode, () =>
    onActionClick(IActionCode.DarkMode)
  );
  useHotkeys(keyboardShortcuts.settings, () =>
    onActionClick(IActionCode.Settings)
  );
  useHotkeys(keyboardShortcuts.logout, () => onActionClick(IActionCode.LogOut));

  return <div>{children}</div>;
}

export default GlobalActionsWrapper;
