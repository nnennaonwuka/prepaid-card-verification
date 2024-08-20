"use client";
import CardDetailsSkeleton from "@/app/(prepaid-card-portal)/home/_components/CardDetailsSkeleton";
import CardHistoryDialog from "@/app/(prepaid-card-portal)/home/_components/CardHistoryDialog";
import CardImageDialog from "@/app/(prepaid-card-portal)/home/_components/CardImageDialog";
import DataNotFound from "@/app/(prepaid-card-portal)/home/_components/DataNotFound";
import FlagErrorForm from "@/app/(prepaid-card-portal)/home/_components/FlagErrorForm";
import VerifyCardForm from "@/app/(prepaid-card-portal)/home/_components/VerifyCardForm";
import type { SingleCardParams } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import MemberFallbackImage from "@/assets/images/member-fallback.svg";
import ImageWithFallback from "@/components/ImageWithFallback";
import PageWrapper from "@/components/PageWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetSingleCard } from "@/hooks/tansack-query/queries/cards";
import { cardStatus } from "@/lib/constants";
import {
  closeCardHistoryDialog,
  closeCardImageDialog,
  closeFlagErrorForm,
  closeVerifyCardForm,
  openCardHistoryDialog,
  openCardImageDialog,
  openFlagErrorForm,
  openVerifyCardForm,
} from "@/lib/redux/slices/dialogSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SingleCard = ({ params }: { params: SingleCardParams }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { singleCard, singleCardLoading, singleCardError } = useGetSingleCard(params);
  const configs = useAppSelector(state => (state.auth as any).user.configs);
  const { canVerifyCard, canViewUnverifiedCardImage } = configs;

  const handleImageDialogOpen = (open: boolean) => {
    dispatch(open ? openCardImageDialog() : closeCardImageDialog());
  };

  const handleHistoryDialogOpen = (open: boolean) => {
    dispatch(open ? openCardHistoryDialog() : closeCardHistoryDialog());
  };

  const handleFlagErrorDialogOpen = (open: boolean) => {
    dispatch(open ? openFlagErrorForm() : closeFlagErrorForm());
  };

  const handleVerifyCardDialogOpen = (open: boolean) => {
    dispatch(open ? openVerifyCardForm() : closeVerifyCardForm());
  };

  const singleCardStatus = singleCard?.cardData?.card_status;

  const baseFormData = {
    ik_number: singleCard?.memberData?.ik_number,
    unique_entity_id: params.uniqueEntityId,
    bank_card_id: +params.bankCardId,
  };

  return (
    <PageWrapper showFilter={false} showSearch={false}>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push("/home/cards")}>Homepage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>View Card Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {singleCardLoading ? (
        <CardDetailsSkeleton />
      ) : singleCardError?.response?.status === 404 ? (
        <DataNotFound />
      ) : (
        <div className="grid grid-cols-[0.3fr_0.7fr] gap-x-4">
          <div className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-6 self-start bg-white px-5 py-4">
            <ImageWithFallback
              src={singleCard?.memberData?.member_image || ""}
              alt={`${singleCard?.memberData?.name} image`}
              fallbackSrc={MemberFallbackImage}
              className="h-[136px] w-[136px] rounded-[8px]"
            />
            <div className="flex flex-col gap-1">
              <p>{singleCard?.memberData?.name}</p>
              <p>{singleCard?.memberData?.ik_number}</p>
              <p>{singleCard?.memberData?.role}</p>
              <p>{singleCard?.memberData?.location}</p>
              <p>{singleCard?.memberData?.phone_number}</p>
            </div>
            <div className={`col-span-full ${singleCardStatus === "0" ? "hidden" : "block"}`}>
              <Button variant="outline" className={`${feather.className} w-full font-bold`} onClick={() => handleHistoryDialogOpen(true)}>
                View History
              </Button>
            </div>
          </div>
          <div className="bg-white px-6 pb-12 pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-bold">Hub:</p>
                <p>{singleCard?.cardData?.hub || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Current season BG card ID:</p>
                <p>{singleCard?.cardData?.current_card_id || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Current season card PAN:</p>
                <p>{singleCard?.cardData?.current_card_pan || "-"}</p>
              </div>
              <div
                className={`flex items-center justify-between ${["0", "2"].includes(singleCardStatus as string) && !canViewUnverifiedCardImage && "hidden"}`}
              >
                <p className="font-bold">Card Picture:</p>
                <p className="cursor-pointer font-bold text-primary-green hover:underline" onClick={() => handleImageDialogOpen(true)}>
                  View image
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Issuer ID:</p>
                <p>{singleCard?.cardData?.issuer_id || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Card Status:</p>
                <p
                  className={`flex items-center justify-center gap-2 rounded-[8px] px-2 py-1 ${cardStatus[singleCardStatus as keyof typeof cardStatus]?.bgClass} box-border`}
                >
                  <Image src={cardStatus[singleCardStatus as keyof typeof cardStatus]?.icon || ""} alt={"status icon"} className="h-4 w-4" />
                  {singleCardStatus ? cardStatus[singleCardStatus as keyof typeof cardStatus]?.name : "-"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Previous season BG card ID:</p>
                <p>{singleCard?.cardData?.previous_card_id || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Previous season card PAN:</p>
                <p>{singleCard?.cardData?.previous_card_pan || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Issuer Phone number:</p>
                <p>{singleCard?.cardData?.issuer_phone_no || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Type of Error flagged:</p>
                <p>{singleCard?.cardData?.type_of_error || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Duration of error flagged:</p>
                <p>{singleCard?.cardData?.duration_of_error || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Name of Staff that verified:</p>
                <p>{singleCard?.cardData?.name_of_verifying_staff || "-"}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Staff ID of Staff that verified:</p>
                <p>{singleCard?.cardData?.id_of_verifying_staff || "-"}</p>
              </div>
            </div>
            <div className={`mt-20 flex gap-6 ${singleCard?.cardData?.card_status === "0" && canVerifyCard ? "block" : "hidden"}`}>
              <Button
                variant="outline-red"
                className={`${feather.className} w-[8.5rem] rounded-[10px]`}
                onClick={() => handleFlagErrorDialogOpen(true)}
              >
                Flag Error
              </Button>
              <Button variant="outline" className={`${feather.className} w-[8.5rem] rounded-[10px]`} onClick={() => handleVerifyCardDialogOpen(true)}>
                Verify Card
              </Button>
            </div>
          </div>
          <CardImageDialog imageUrl={singleCard?.cardData?.card_picture} handleImageDialogOpen={handleImageDialogOpen} />
          <CardHistoryDialog
            cardHistory={singleCard?.history}
            cardStatus={singleCard?.cardData?.card_status}
            handleHistoryDialogOpen={handleHistoryDialogOpen}
          />
          <FlagErrorForm handleFlagErrorDialogOpen={handleFlagErrorDialogOpen} baseFormData={baseFormData} />
          <VerifyCardForm handleVerifyCardDialogOpen={handleVerifyCardDialogOpen} baseFormData={baseFormData} />
        </div>
      )}
    </PageWrapper>
  );
};

export default SingleCard;
