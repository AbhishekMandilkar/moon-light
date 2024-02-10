"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { useClerk } from "@clerk/nextjs";
import { useToggle } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

function ConfirmLogout({ onCancel }: { onCancel: () => void }) {
  const { signOut,redirectToSignIn } = useClerk();
  const router = useRouter();
  const [loading, toggleLoading] = useToggle(false);
  const handleLogout = async () => {
    toggleLoading();
    await signOut(() => router.replace("/"));
    toggleLoading();
  };

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? This will end your current
            session, and you&apos;ll need to sign in again to use your account
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmLogout;
