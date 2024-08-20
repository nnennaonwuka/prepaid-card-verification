import { flagErrorFormSchema } from "@/app/(prepaid-card-portal)/home/_schemas/flagErrorSchema";
import type { FlagErrorFormData, FlagErrorFormProps } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useFlagError } from "@/hooks/tansack-query/mutations/cards";
import { useGetAllCardErrors } from "@/hooks/tansack-query/queries/cards";
import { closeConfirmationDialog, openConfirmationDialog } from "@/lib/redux/slices/dialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

const FlagErrorForm = ({ handleFlagErrorDialogOpen, baseFormData }: FlagErrorFormProps) => {
  const dispatch = useAppDispatch();
  const isFlagErrorFormOpen = useAppSelector(state => state.dialog.isFlagErrorFormOpen);
  const { flagCard, isFlaggingCard } = useFlagError();
  const { cardErrors, cardErrorsLoading, cardErrorsError } = useGetAllCardErrors();

  const handleConfirmationDialogOpen = (open: boolean) => {
    dispatch(open ? openConfirmationDialog() : closeConfirmationDialog());
  };

  const form = useForm<FlagErrorFormData>({
    resolver: zodResolver(flagErrorFormSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: FlagErrorFormData) => {
    handleConfirmationDialogOpen(true);
  };

  const handleFlagError = () => {
    flagCard({
      ...baseFormData,
      error_id: +form.getValues().reason,
    });
  };

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    isFlagErrorFormOpen ||
      form.reset({
        reason: "",
      });
  }, [isFlagErrorFormOpen, form]); // Clear form values on dialog close

  return (
    <Dialog open={isFlagErrorFormOpen} onOpenChange={handleFlagErrorDialogOpen}>
      <DialogContent className="rounded-[12px]">
        <DialogTitle className={`${feather.className} text-base font-bold`}>Select Reason</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select the reason why you want to flag an error against this TG card verification</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`border ${errors.reason ? "border-destructive" : "border-[#75748F]"}`}>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="py-2">
                      {cardErrorsLoading ? (
                        <div className="flex items-center justify-center p-2">
                          <ClipLoader color="#59C903 " size={30} />
                        </div>
                      ) : cardErrorsError !== null ? (
                        <p className="text-center text-sm">Failed to load data</p>
                      ) : (
                        cardErrors?.map(error => (
                          <SelectItem value={String(error.error_id)} key={error.error_id}>
                            {error.error_message}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit" className={`${feather.className} block px-8`} >
              Submit
            </Button>
          </form>
        </Form>
        <ConfirmationDialog
          message="You are about flagging card error against this trust group. Do you want to continue with this action?"
          handleConfirmationDialogOpen={handleConfirmationDialogOpen}
          isConfirming={isFlaggingCard}
          handleConfirmation={handleFlagError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FlagErrorForm;
