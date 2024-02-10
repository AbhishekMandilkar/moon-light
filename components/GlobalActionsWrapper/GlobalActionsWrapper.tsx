"use client";
import { getKeyboardShortcuts } from "@/constants/KeyboardShortcuts";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Settings from "../Settings/Settings";
import { useClerk } from "@clerk/nextjs";
import { useToggle } from "@uidotdev/usehooks";
import ConfirmLogout from "../ConfirmLogout/ConfirmLogout";

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
  const { theme, setTheme, systemTheme } = useTheme();
  const keyboardShortcuts = getKeyboardShortcuts();
  const [showSettings, setShowSettings] = useToggle(false);
  const [confirmLogout, setConfirmLogout] = useToggle(false);

  const onActionClick = (action: IActionCode) => {
    switch (action) {
      case IActionCode.DarkMode:
        setTheme(theme === "light" ? "dark" : "light");
        break;
      case IActionCode.Settings:
        setShowSettings(!showSettings);
        break;
      case IActionCode.LogOut:
        setConfirmLogout(true);
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
      {confirmLogout && (
        <ConfirmLogout
          onCancel={() => setConfirmLogout(false)}
        />
      )}
    </GlobalActionsProvider>
  );
}

export default GlobalActionsWrapper;
