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
import { useTheme } from "next-themes";
import { getKeyboardShortcuts } from "@/constants/KeyboardShortcuts";
import { useContext } from "react";
import { GlobalActionsContext } from "../GlobalActionsWrapper/GlobalActionsWrapper";
import { useUser } from "@clerk/nextjs";

enum IActionCode {
  DarkMode = "darkMode",
  Settings = "settings",
  LogOut = "logOut",
}

export function UserNav() {
  const { isLoaded, user, isSignedIn } = useUser();
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
      hide: !isSignedIn,
      title: "Log Out",
      icon: (props: LucideProps) => <LogOut {...props} />,
      shortcut: keyboardShortcuts.logout,
      action: IActionCode.LogOut,
    },
  ];

  if (!isLoaded) {
    return null;
  }

  const name = user?.fullName ?? "";
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";
  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={
                user?.imageUrl ??
                "https://avatars.githubusercontent.com/u/1066040?s=60&v=4"
              }
              alt={name}
            />
            {name.length && (
              <AvatarFallback>
                <span>{name?.charAt(0).toUpperCase() ?? undefined}</span>
              </AvatarFallback>
            )}
          </Avatar>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        {name.length && email.length && (
          <DropdownMenuLabel className="font-normal py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-2">
          {actionBarItem.map((item, index) => {
            if (item?.hide) return null;
            return (
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
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
