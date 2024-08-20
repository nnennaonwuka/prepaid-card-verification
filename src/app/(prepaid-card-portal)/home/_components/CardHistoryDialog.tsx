import type { CardHistoryDialogProps } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/redux";

const CardHistoryDialog = ({ cardHistory, handleHistoryDialogOpen }: CardHistoryDialogProps) => {
  const isCardHistoryDialogOpen = useAppSelector(state => state.dialog.isCardHistoryDialogOpen);

  return (
    <Dialog open={isCardHistoryDialogOpen} onOpenChange={handleHistoryDialogOpen}>
      <DialogContent className="rounded-[12px] px-6 py-10">
        <DialogTitle className={`${feather.className} text-base font-bold`}>History</DialogTitle>
        <div className="max-h-[20rem] overflow-auto">
          <div className="mt-4 flex flex-col gap-3">
            <p className={`${feather.className} font-bold`}>{cardHistory?.pco_verification_flag === 0 || "PCO"} Card Verification</p>
            <Separator />
            <p>
              Card verified by <span className="font-bold">{cardHistory?.verified_by}</span> on{" "}
              <span className="font-bold">{cardHistory?.verified_on}</span>
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <p className={`${feather.className} font-bold`}>Card Replacement</p>
            <Separator />
            {cardHistory?.replace_flag ? (
              cardHistory?.replacementHistory?.map((history, i) => (
                <p key={i}>
                  Card replaced by <span className="font-bold">{history.replaced_by}</span> on{" "}
                  <span className="font-bold">{history.replaced_on}</span>
                </p>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardHistoryDialog;
