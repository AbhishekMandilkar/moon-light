"use client";
import { getKeyboardShortcuts } from "@/constants/KeyboardShortcuts";
import useAuth from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Settings from "../Settings/Settings";

interface Props {
  children: ReactNode;
}

enum IActionCode {
  DarkMode = "darkMode",
  Settings = "settings",
  LogOut = "logOut",
}

export const GlobalActionsContext = React.createContext(
  (action: IActionCode) => {}
);

const GlobalActionsProvider = GlobalActionsContext.Provider;

function GlobalActionsWrapper({ children }: Props) {
  const {
    authData: { name, email },
  } = useAuth();
  const { theme, setTheme, systemTheme } = useTheme();
  const keyboardShortcuts = getKeyboardShortcuts();
  const [showSettings, setShowSettings] = React.useState(false);

  const onActionClick = (action: IActionCode) => {
    switch (action) {
      case IActionCode.DarkMode:
        setTheme(theme === "light" ? "dark" : "light");
        break;
      case IActionCode.Settings:
        setShowSettings(!showSettings);
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

  return (
    <GlobalActionsProvider value={onActionClick}>
      {children}
      <Settings
        open={showSettings}
        onOpenChange={(open) => setShowSettings(open)}
      />
    </GlobalActionsProvider>
  );
}

export default GlobalActionsWrapper;
