"use client";
import {
  ChevronDown,
  LogOut,
  LucideProps,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAuth from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { getKeyboardShortcuts } from "@/constants/KeyboardShortcuts";
import { useContext } from "react";
import { GlobalActionsContext } from "../GlobalActionsWrapper/GlobalActionsWrapper";

enum IActionCode {
  DarkMode = "darkMode",
  Settings = "settings",
  LogOut = "logOut",
}

export function UserNav() {
  const {
    authData: { name, email },
  } = useAuth();
  const { theme, setTheme, systemTheme } = useTheme();
  const globalAction = useContext(GlobalActionsContext);

  const onActionClick = (action: IActionCode) => {
    globalAction(action);
  };

  const keyboardShortcuts = getKeyboardShortcuts();

  const actionBarItem = [
    {
      title: theme === "light" ? "Dark Mode" : "Light Mode",
      icon: (props: LucideProps) =>
        theme === "light" ? <Moon {...props} /> : <Sun {...props} />,
      shortcut: keyboardShortcuts.toggleDarkMode,
      action: IActionCode.DarkMode,
    },
    {
      title: "Settings",
      icon: (props: LucideProps) => <Settings {...props} />,
      shortcut: keyboardShortcuts.settings,
      action: IActionCode.Settings,
    },
    {
      title: "Log Out",
      icon: (props: LucideProps) => <LogOut {...props} />,
      shortcut: keyboardShortcuts.logout,
      action: IActionCode.LogOut,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              <span>{name?.charAt(0)}</span>
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-2">
          {actionBarItem.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="p-2 cursor-pointer"
              onClick={() => onActionClick(item.action)}
            >
              {item.icon({
                className: "mr-2",
                size: 18,
              })}
              {item.title}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
