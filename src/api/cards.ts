import type {
  CardAPiQueryParams,
  FlagErrorServerData,
  PreloadedCardAPiQueryParams,
  SingleCardParams,
  VerifyCardServerData,
} from "@/app/(prepaid-card-portal)/home/types";
import { AxiosProgressEvent } from "axios";
import { prepaidCardsApi } from "./axios";

export const getCardStats = async () => {
  const response = await prepaidCardsApi("/cards/status-stats");
  return response?.data?.data;
};

export const getAllCards = async (params: CardAPiQueryParams) => {
  const response = await prepaidCardsApi("/cards", { params });
  return response?.data?.data;
};

export const getVerifiedCards = async (params: Omit<CardAPiQueryParams, "status">) => {
  const response = await prepaidCardsApi("/cards?status=1", { params });
  return response?.data?.data;
};

export const getUnverifiedCards = async (params: Omit<CardAPiQueryParams, "status">) => {
  const response = await prepaidCardsApi("/cards?status=0", { params });
  return response?.data?.data;
};

export const getUnresolvedCards = async (params: Omit<CardAPiQueryParams, "status">) => {
  const response = await prepaidCardsApi("/cards?status=2", { params });
  return response?.data?.data;
};

export const getPreloadedCards = async (params: PreloadedCardAPiQueryParams) => {
  const response = await prepaidCardsApi("/preloaded-cards", { params });
  return response?.data?.data;
};

export const getSingleCard = async ({ uniqueEntityId, bankCardId, hub }: SingleCardParams) => {
  const response = await prepaidCardsApi(`/cards/${uniqueEntityId}/${bankCardId}/${hub}`);
  return response?.data?.data;
};

export const getAllCardErrors = async () => {
  const response = await prepaidCardsApi(`/errors`);
  return response?.data?.data;
};

export const flagCardError = async (formData: FlagErrorServerData) => {
  await prepaidCardsApi.post("/bank_card_verification/flag-error", formData);
};

export const verifyBankCard = async (formData: VerifyCardServerData) => {
  await prepaidCardsApi.post("/bank_card_verification/verify-card", formData);
};

export const exportCardData = async (params: { status?: string; fileName?: string }) => {
  const response = await prepaidCardsApi("/cards/export", { params, responseType: "blob" });
  const href = URL.createObjectURL(response.data);
  const a = Object.assign(document.createElement("a"), {
    href,
    download: `${params.fileName}.csv`,
  });
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
  return response;
};

export const uploadPreloadedBankCards = async (formData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
  await prepaidCardsApi.post("/preloaded-cards/import", formData, { onUploadProgress });
};

export const getPreloadedCardsUploadTemplate = async () => {
  const response = await prepaidCardsApi("/preloaded-cards/template", { responseType: "blob" });
  const href = URL.createObjectURL(response.data);
  const a = Object.assign(document.createElement("a"), {
    href,
    download: "preloaded_cards_template.csv",
  });
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
  return response;
};
