"use client";

import useMediaQuery from "@/lib/hooks/use-media-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ModalProps } from "@/lib/hooks/use-modal";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

// This is a responsive design that shows a drawer on mobile devices
// and a modal on non-mobile devices.

type Props = ModalProps & {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  customCloseButton?: React.ReactNode;
};

export default function Modal({
  showModal,
  setShowModal,
  title,
  description,
  trigger,
  children,
  customCloseButton,
}: Props) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer open={showModal} onOpenChange={setShowModal}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          {customCloseButton && (
            <DrawerFooter>
              <DrawerClose asChild>{customCloseButton}</DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {customCloseButton && (
          <DialogFooter>
            <DialogClose asChild>{customCloseButton}</DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
