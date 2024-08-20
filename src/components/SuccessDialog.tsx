"use client"
import { feather } from "@/app/fonts";
import BetterLifeLogo from "@/assets/images/better-life-no-text.png";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeSuccessDialog } from "@/lib/redux/slices/dialogSlice";
import Image from "next/image";
import { Button } from "./ui/button";

const SuccessDialog = () => {
  const dispatch = useAppDispatch()
  const isSuccessDialogOpen = useAppSelector(state => state.dialog.isSuccessDialogOpen);

  return (
    <AlertDialog open={isSuccessDialogOpen}>
      <AlertDialogContent className="flex min-h-80 flex-col items-center justify-center bg-primary-yellow px-8">
        <AlertDialogHeader className="mb-5">
          <div className="mb-3 flex items-center justify-center">
            <Image src={BetterLifeLogo} alt="Better Life Image" width={124} height={124} />
          </div>
          <AlertDialogDescription className={`text-center text-[#1E202C] ${feather.className} text-[1.5rem]`}>Done</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-4">
          <Button className={`w-[10rem] ${feather.className} rounded-[10px]`} onClick={() => dispatch(closeSuccessDialog())}>Next</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
