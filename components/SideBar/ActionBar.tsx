"use client";
import { LogOut, Settings, User } from "lucide-react";
import React from "react";
import ThemeToggle from "../Common/ThemeToggle";
import { Button } from "../ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
// import appwriteService from "@/services/appwrite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ActionBar() {
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const [logoutLoader, setLogoutLoader] = React.useState(false);
  const router = useRouter();

  const actionBarItem = [
    {
      title: "Settings",
      icon: <Settings />,
      onPress: () => console.log("User"),
      extraClassNames: "text-muted-foreground",
    },
    {
      title: "Theme",
      icon: <ThemeToggle className="text-muted-foreground hover:text-foreground" />,
    },
    {
      title: "Log Out",
      icon: <LogOut />,
      onPress: () => setConfirmLogout(true),
      extraClassNames: "text-red-500 hover:bg-red-100 hover:text-red-500",
    },
  ];

  // const handlelogout = async () => {
  //   setLogoutLoader(true);
  //   try {
  //     await appwriteService.logout();
  //     setLogoutLoader(false);
  //     toast.success("Logged out successfully");
  //     window.location.reload();
  //   } catch (error) {
  //     setLogoutLoader(false);
  //     toast.error("Something went wrong");
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex-1 flex self-stretch w-full justify-evenly rounded-md  bg-secondary p-1">
      {actionBarItem.map((item, index) => (
        <TooltipProvider key={item.title} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={item?.onPress}
                variant={"ghost"}
                className={`flex items-center justify-center rounded-md w-full ${item.extraClassNames}`}
                key={index}
                title={item.title}
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={5} alignOffset={5}>
              {item.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
     
    </div>
  );
}

export default ActionBar;
