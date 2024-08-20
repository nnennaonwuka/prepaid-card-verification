import { feather } from "@/app/fonts";
import BellIcon from "@/assets/icons/bell.svg";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import type { ConfirmationDialogProps } from "./types";
import { Button } from "./ui/button";

const ConfirmationDialog = ({ message, handleConfirmationDialogOpen, isConfirming, handleConfirmation }: ConfirmationDialogProps) => {
  const isConfirmationDialogOpen = useAppSelector(state => state.dialog.isConfirmationDialogOpen);

  return (
    <AlertDialog open={isConfirmationDialogOpen} onOpenChange={handleConfirmationDialogOpen}>
      <AlertDialogContent className="flex min-h-80 flex-col items-center justify-center px-8">
        <AlertDialogHeader className="mb-5">
          <div className="mb-3 flex items-center justify-center">
            <Image src={BellIcon} alt="Notification Icon" width={48} height={48} />
          </div>
          <AlertDialogTitle className={`${feather.className} mb-3 text-center text-[1.5rem] font-bold`}>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[#1E202C]">{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-4">
          <AlertDialogCancel className="px-8 py-2 disabled:border-primary-green disabled:text-primary-green" disabled={isConfirming}>
            No
          </AlertDialogCancel>
          <Button variant="outline" className="px-8 py-2 disabled:border-primary-green" disabled={isConfirming} onClick={handleConfirmation}>
            {isConfirming ? <ClipLoader color="#59C903" size={20} /> : "Yes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
