import { verifyCardFormSchema } from "@/app/(prepaid-card-portal)/home/_schemas/verifyCardSchema";
import type { BgCardInfoDialogProps, VerifyCardFormData } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const BgCardInfoDialog = ({ handleBgCardInfoDialogOpen }: BgCardInfoDialogProps) => {
  const isBgCardInfoDialogOpen = useAppSelector(state => state.dialog.isBgCardInfoDialogOpen);
 
  const form = useForm<VerifyCardFormData>({
    resolver: zodResolver(verifyCardFormSchema),
    defaultValues: {
      cardNumber: "",
      confirmCardNumber: "",
    },
  });


  return (
    <Dialog open={isBgCardInfoDialogOpen} onOpenChange={handleBgCardInfoDialogOpen}>
      <DialogContent className="rounded-[12px]" removeOverlay>
        <DialogTitle className={`${feather.className} text-base font-bold`}>About Babban Gona Card number</DialogTitle>
        <div>
          <p className="text-base/[20.8px]">
            Babban Gona Card Number is usually 10 characters which consist of 9 numbers and a slash, shown in this format{" "}
            <span className="text-[#791E94]">{'"04/0012345"'}</span> .
          </p>
          <p className="text-base/[20.8px]">
            The trust group leader can find this number on the front of the card, just beside the card name written {'"BABBANGONA"'}
          </p>
          <Button
            variant="outline"
            className={`mt-20 w-[6.5rem] rounded-[10px] ${feather.className}`}
            onClick={() => handleBgCardInfoDialogOpen(false)}
          >
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BgCardInfoDialog;
