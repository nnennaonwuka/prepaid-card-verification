import { flagCardError, uploadPreloadedBankCards, verifyBankCard } from "@/api/cards";
import type { FlagErrorServerData, VerifyCardServerData } from "@/app/(prepaid-card-portal)/home/types";
import { useAppDispatch } from "@/hooks/redux";
import { openSuccessDialog, closeFlagErrorForm, closeConfirmationDialog, closeVerifyCardForm } from "@/lib/redux/slices/dialogSlice";
import { invalidateQueries } from "@/lib/tansack-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosProgressEvent } from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useFlagError = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const {
    mutate: flagCard,
    isPending: isFlaggingCard,
    isSuccess: isFlaggingSuccess,
  } = useMutation({
    mutationFn: (formData: FlagErrorServerData) => flagCardError(formData),
    onSuccess: () => {
      invalidateQueries(["cards", "single-card", "notifications"]);
      dispatch(closeConfirmationDialog());
      dispatch(closeFlagErrorForm());
      dispatch(openSuccessDialog());
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast({
          description: error?.response?.data.message,
        });
      }
      toast({
        description: "Failed to flag error",
      });
    },
  });

  return { flagCard, isFlaggingCard, isFlaggingSuccess };
};

export const useVerifyCard = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const {
    mutate: verifyCard,
    isPending: isVerifyingCard,
    isSuccess: isVerifyCardSuccess,
  } = useMutation({
    mutationFn: (formData: VerifyCardServerData) => verifyBankCard(formData),
    onSuccess: () => {
      invalidateQueries(["cards", "single-card", "notifications"]);
      dispatch(closeConfirmationDialog());
      dispatch(closeVerifyCardForm());
      dispatch(openSuccessDialog());
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast({
          description: error?.response?.data.message,
        });
      }
      toast({
        description: "Failed to verify card",
      });
    },
  });

  return { verifyCard, isVerifyingCard, isVerifyCardSuccess };
};

export const useUploadPreloadedCards = (handleRemoveFile: () => void, setUploadProgress: (progress: number) => void) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
    setUploadProgress(percentCompleted);
  };
  const { mutate: uploadPreloadedCards, isPending: isUploadingPreloadedCards } = useMutation({
    mutationFn: (formData: FormData) => uploadPreloadedBankCards(formData, onUploadProgress),
    onSuccess: () => {
      invalidateQueries(["preloaded-cards"]);
      dispatch(openSuccessDialog());
      setUploadProgress(0);
      handleRemoveFile();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast({
          description: error?.response?.data.message,
        });
        setUploadProgress(0);
        return;
      }
      toast({
        description: "Failed to export upload",
      });
    },
  });
  return { uploadPreloadedCards, isUploadingPreloadedCards };
};
