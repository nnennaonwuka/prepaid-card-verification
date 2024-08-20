import { verifyCardFormSchema } from "@/app/(prepaid-card-portal)/home/_schemas/verifyCardSchema";
import type { VerifyCardFormData, VerifyCardFormProps } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useVerifyCard } from "@/hooks/tansack-query/mutations/cards";
import { closeBgCardInfoDialog, closeConfirmationDialog, openBgCardInfoDialog, openConfirmationDialog } from "@/lib/redux/slices/dialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BgCardInfoDialog from "./BgCardInfoDialog";

const VerifyCardForm = ({ handleVerifyCardDialogOpen, baseFormData }: VerifyCardFormProps) => {
  const dispatch = useAppDispatch();
  const isVerifyCardFormOpen = useAppSelector(state => state.dialog.isVerifyCardFormOpen);
  const { verifyCard, isVerifyingCard } = useVerifyCard();

  const handleConfirmationDialogOpen = (open: boolean) => {
    dispatch(open ? openConfirmationDialog() : closeConfirmationDialog());
  };

  const form = useForm<VerifyCardFormData>({
    resolver: zodResolver(verifyCardFormSchema),
    defaultValues: {
      cardNumber: "",
      confirmCardNumber: "",
    },
  });

  const handleSubmitClick = (values: VerifyCardFormData) => {
    handleConfirmationDialogOpen(true);
  };

  const handleCardVerification = () => {
    verifyCard({
      ...baseFormData,
      card_number: form.getValues().cardNumber,
    });
  };

  const handleBgCardInfoDialogOpen = (open: boolean) => {
    dispatch(open ? openBgCardInfoDialog() : closeBgCardInfoDialog());
  };

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    isVerifyCardFormOpen ||
      form.reset({
        cardNumber: "",
        confirmCardNumber: "",
      });
  }, [isVerifyCardFormOpen, form]); // Clear form values on dialog close

  return (
    <Dialog open={isVerifyCardFormOpen} onOpenChange={handleVerifyCardDialogOpen}>
      <DialogContent className="rounded-[12px]">
        <DialogTitle className={`${feather.className} text-base font-bold`}>Enter Card Details</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitClick)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Babban Gona Card Number</FormLabel>
                      <p className="cursor-pointer text-[0.8rem] text-[#791E94]" onClick={() => handleBgCardInfoDialogOpen(true)}>
                        What is Babban Gona card number?
                      </p>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className={`border ${errors.cardNumber ? "border-destructive" : "border-[#75748F]"}`}
                        onCopy={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Babban Gona Card Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={`border ${errors.confirmCardNumber ? "border-destructive" : "border-[#75748F]"}`}
                        onCopy={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="outline" type="submit" className={`${feather.className} mt-6 block px-8`}>
              Submit
            </Button>
          </form>
        </Form>
        <BgCardInfoDialog handleBgCardInfoDialogOpen={handleBgCardInfoDialogOpen} />
        <ConfirmationDialog
          message="You are about to verify the card number of this trust group. Do you want to continue with this action?"
          handleConfirmationDialogOpen={handleConfirmationDialogOpen}
          isConfirming={isVerifyingCard}
          handleConfirmation={handleCardVerification}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VerifyCardForm;
