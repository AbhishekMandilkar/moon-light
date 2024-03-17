"use client";
import { useScreenDetector } from "@/lib/hooks/useScreenDetector";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";

function ModalView({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  onClose: () => void;
}) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (isSmallDevice) {
    return (
      <Drawer open onOpenChange={onClose}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="">{children}</DialogContent>
    </Dialog>
  );
}

export default ModalView;
