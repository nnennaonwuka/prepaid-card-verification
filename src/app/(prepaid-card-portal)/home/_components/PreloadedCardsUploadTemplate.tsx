"use client";
import { feather } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDownloadPreloadedCardsTemplate } from "@/hooks/tansack-query/queries/cards";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/components/ui/use-toast";

const PreloadedCardsUploadTemplate = () => {
  const { toast } = useToast();
  const [downloadCounter, setDownloadCounter] = useState<number>(0);
  const [isUploadTemplateOpen, setIsUploadTemplateOpen] = useState<boolean>(true);
  const { preloadedCardsTemplateDownloading, preloadedCardsTemplateDownloadError } = useDownloadPreloadedCardsTemplate(downloadCounter);

  const enableTemplateDownload = () => {
    setDownloadCounter(prev => prev + 1);
  };

  useEffect(() => {
    if (preloadedCardsTemplateDownloadError) {
      toast({
        description: "Failed to download template",
      });
    }
  }, [preloadedCardsTemplateDownloadError, toast]);

  return (
    <Dialog open={isUploadTemplateOpen} onOpenChange={setIsUploadTemplateOpen}>
      <DialogContent className="w-[30rem] rounded-[12px] px-6 py-10">
        <DialogTitle className={`${feather.className} text-[1.25rem] font-bold`}>Download Template</DialogTitle>
        <p>Kindly click the button below to download the template of the file to be uploaded.</p>
        <Button
          className={`mt-2 h-[3rem] w-full rounded-[10px] ${feather.className} disabled:bg-primary-green`}
          disabled={preloadedCardsTemplateDownloading}
          onClick={enableTemplateDownload}
        >
          {preloadedCardsTemplateDownloading ? <ClipLoader color="#fff " size={25} /> : "Download template"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PreloadedCardsUploadTemplate;
