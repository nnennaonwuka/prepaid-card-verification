import {
  exportCardData,
  getAllCardErrors,
  getAllCards,
  getCardStats,
  getPreloadedCards,
  getPreloadedCardsUploadTemplate,
  getSingleCard,
  getUnresolvedCards,
  getUnverifiedCards,
  getVerifiedCards,
} from "@/api/cards";
import type {
  CardAPiQueryParams,
  CardErrorsData,
  CardsData,
  CardStatsData,
  PreloadedCardAPiQueryParams,
  PreloadedCardsData,
  SingleCardData,
  SingleCardParams,
} from "@/app/(prepaid-card-portal)/home/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetCardStats = () => {
  const {
    data,
    isLoading: cardStatsLoading,
    error: cardStatsError,
  } = useQuery<CardStatsData>({
    queryKey: ["card-stats"],
    queryFn: () => getCardStats(),
  });

  return {
    cardStats: data,
    cardStatsLoading,
    cardStatsError,
  };
};

export const useGetAllCards = (params: CardAPiQueryParams) => {
  const {
    data,
    isLoading: allCardsLoading,
    error: allCardsError,
  } = useQuery<CardsData>({
    queryKey: ["cards", Object.values(params)],
    queryFn: () => getAllCards(params),
    placeholderData: keepPreviousData,
  });

  return {
    allCards: data,
    allCardsLoading,
    allCardsError,
  };
};

export const useGetVerifiedCards = (params: Omit<CardAPiQueryParams, "status">) => {
  const {
    data,
    isLoading: verifiedCardsLoading,
    error: verifiedCardsError,
  } = useQuery<CardsData>({
    queryKey: ["verified-cards", Object.values(params)],
    queryFn: () => getVerifiedCards(params),
    placeholderData: keepPreviousData,
  });

  return {
    verifiedCards: data,
    verifiedCardsLoading,
    verifiedCardsError,
  };
};

export const useGetUnVerifiedCards = (params: Omit<CardAPiQueryParams, "status">) => {
  const {
    data,
    isLoading: unverifiedCardsLoading,
    error: unverifiedCardsError,
  } = useQuery<CardsData>({
    queryKey: ["unverified-cards", Object.values(params)],
    queryFn: () => getUnverifiedCards(params),
    placeholderData: keepPreviousData,
  });

  return {
    unverifiedCards: data,
    unverifiedCardsLoading,
    unverifiedCardsError,
  };
};
export const useGetUnresolvedCards = (params: Omit<CardAPiQueryParams, "status">) => {
  const {
    data,
    isLoading: unresolvedCardsLoading,
    error: unresolvedCardsError,
  } = useQuery<CardsData>({
    queryKey: ["unresolved-cards", Object.values(params)],
    queryFn: () => getUnresolvedCards(params),
    placeholderData: keepPreviousData,
  });

  return {
    unresolvedCards: data,
    unresolvedCardsLoading,
    unresolvedCardsError,
  };
};

export const useGetPreloadedCards = (params: PreloadedCardAPiQueryParams) => {
  const {
    data,
    isLoading: preloadedCardsLoading,
    error: preloadedCardsError,
  } = useQuery<PreloadedCardsData>({
    queryKey: ["preloaded-cards", Object.values(params)],
    queryFn: () => getPreloadedCards(params),
    placeholderData: keepPreviousData,
  });

  return {
    preloadedCards: data,
    preloadedCardsLoading,
    preloadedCardsError,
  };
};

export const useGetSingleCard = (params: SingleCardParams) => {
  const {
    data,
    isLoading: singleCardLoading,
    error: singleCardError,
  } = useQuery<SingleCardData, AxiosError>({
    queryKey: ["single-card", Object.values(params)],
    queryFn: () => getSingleCard(params),
  });

  return {
    singleCard: data,
    singleCardLoading,
    singleCardError,
  };
};

export const useGetAllCardErrors = () => {
  const {
    data,
    isLoading: cardErrorsLoading,
    error: cardErrorsError,
  } = useQuery<CardErrorsData[], AxiosError>({
    queryKey: ["card-errors"],
    queryFn: () => getAllCardErrors(),
  });

  return {
    cardErrors: data,
    cardErrorsLoading,
    cardErrorsError,
  };
};

export const useExportCardData = (exportCounter: number, params: { status?: string; fileName?: string }) => {
  const { isFetching: cardExporting, isError: cardExportError } = useQuery<unknown, AxiosError>({
    queryKey: ["card-export", exportCounter],
    queryFn: () => exportCardData(params),
    enabled: exportCounter > 0,
  });

  return { cardExporting, cardExportError };
};

export const useDownloadPreloadedCardsTemplate = (downloadCounter: number) => {
  const { isFetching: preloadedCardsTemplateDownloading, isError: preloadedCardsTemplateDownloadError } = useQuery({
    queryKey: ["preloaded-cards-template", downloadCounter],
    queryFn: () => getPreloadedCardsUploadTemplate(),
    enabled: downloadCounter > 0,
  });

  return { preloadedCardsTemplateDownloading, preloadedCardsTemplateDownloadError };
};
