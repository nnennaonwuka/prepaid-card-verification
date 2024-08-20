import type { CardImageDialogProps } from "@/app/(prepaid-card-portal)/home/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";

const CardImageDialog = ({ imageUrl, handleImageDialogOpen }: CardImageDialogProps) => {
  const isCardImageDialogOpen = useAppSelector(state => state.dialog.isCardImageDialogOpen);

  return (
    <Dialog open={isCardImageDialogOpen} onOpenChange={handleImageDialogOpen}>
      <DialogContent className="flex items-center justify-center rounded-[12px] px-4 py-10">
        <Image src={imageUrl || ""} alt="Card Image" width={500} height={500} className="mt-8 h-[280px] w-[440px]" />
      </DialogContent>
    </Dialog>
  );
};

export default CardImageDialog;
