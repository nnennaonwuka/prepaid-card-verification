import { z } from "zod";
import { verifyCardFormSchema } from "./_schemas/verifyCardSchema";
import { flagErrorFormSchema } from "./_schemas/flagErrorSchema";

type Config = {
  app_name: string;
  permission_id: string;
  app_id: string;
  imei_flag: false;
  configs: {
    config_name: string;
    config_value: boolean;
  }[];
};

export type UsersConfigs = {
  staff_id: string;
  hub: number;
  staff_name: string;
  role: string;
  config: Config[];
};

export type Stats = {
  name: string;
  colorClass: {
    hover: string;
    active: string;
    default: string;
  };
  number?: number;
  icon: string;
  href: string;
  visible: boolean;
  routesNewPage: boolean;
};

export type CardStatsData = {
  all_cards: number;
  unverified_cards: number;
  verified_cards: number;
  unresolved_cards: number;
  preloaded_cards: number;
};

export type CardData = {
  unique_entity_id: string;
  bank_card_id: number;
  ik_number: string;
  card_id: string;
  card_pan: string;
  status: "0" | "1" | "2";
  issuer_id: string;
  name: string;
  hub: string;
  image: string;
};

export type CardsData = {
  totalPages: number;
  currentPage: number;
  data: CardData[];
};

export type PreloadedCardData = {
  id: number;
  account_no: string;
  name_on_card: string;
  product_code: string | null;
  branch_no: string | null;
  card_number: string;
  modified_card_number: string;
  pan: string;
  card_assignment_flag: number;
  created_at: string;
  updated_at: string;
  status: number;
};

export type PreloadedCardsData = Omit<CardsData, "data"> & {
  data: PreloadedCardData[];
};

export type CardAPiQueryParams = {
  search: string;
  status: string;
  sort: string;
  page_num: string;
  page_size: string;
};

export type PreloadedCardAPiQueryParams = {
  search: string;
  status: string | number;
  page: string;
  page_size: string;
};

export type SingleCardParams = {
  uniqueEntityId: string;
  bankCardId: string;
  hub: string;
};

export type CardHistoryData = {
  verified_by: string;
  verified_on: string | null;
  pco_verification_flag: 0 | 1;
  replace_flag: 0 | 1;
  replacementHistory?: {
    replaced_by: string;
    replaced_on: string;
  }[];
};

export type SingleCardData = {
  cardData: {
    hub: string;
    current_card_id: string;
    current_card_pan: string;
    card_picture: null;
    issuer_id: string;
    card_status: string;
    previous_card_id: null;
    previous_card_pan: null;
    issuer_phone_no: string;
    type_of_error: null;
    duration_of_error: null;
    name_of_verifying_staff: string;
    id_of_verifying_staff: string;
  };
  memberData: {
    ik_number: string;
    name: string;
    role: string;
    location: string;
    phone_number: string;
    member_image: string;
  };
  history: CardHistoryData;
};

export type CardErrorsData = {
  error_id: number;
  error_message: string;
};

export type CardImageDialogProps = {
  imageUrl?: string | null;
  handleImageDialogOpen: (open: boolean) => void;
};

export type CardHistoryDialogProps = {
  cardHistory?: CardHistoryData;
  cardStatus?: string;
  handleHistoryDialogOpen: (open: boolean) => void;
};

export type FlagErrorFormProps = {
  handleFlagErrorDialogOpen: (open: boolean) => void;
  baseFormData: Omit<VerifyCardServerData, "card_number">;
};

export type VerifyCardFormProps = {
  handleVerifyCardDialogOpen: (open: boolean) => void;
  baseFormData: Omit<VerifyCardServerData, "card_number">;
};

export type BgCardInfoDialogProps = {
  handleBgCardInfoDialogOpen: (open: boolean) => void;
};


export type VerifyCardFormData = z.infer<typeof verifyCardFormSchema>;
export type FlagErrorFormData = z.infer<typeof flagErrorFormSchema>;

export type VerifyCardServerData = {
  ik_number?: string;
  unique_entity_id: string | null;
  bank_card_id: number;
  card_number: string;
};

export type FlagErrorServerData = Omit<VerifyCardServerData, "card_number"> & {
  error_id: number;
};
