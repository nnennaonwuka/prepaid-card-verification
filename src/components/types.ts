import type { SingleCardParams, SingleCardData } from "@/app/(prepaid-card-portal)/home/types";
import Image, { type StaticImageData } from "next/image";
import React, { type ComponentProps, FC } from "react";

export type SideBarLinks = {
  icon: string;
  href: string;
  name: string;
};

export type FilterProps = {
  alignContent: "start" | "center" | "end";
  contentOffset: number;
};

export type TopBarProps = {
  showSearch?: boolean;
  showFilter?: boolean;
  searchPlaceholder?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Filter?: FC;
  showExport?: boolean;
  isExporting?: boolean;
  handleExport?: () => void;
};

export type StatusParam = {
  name: string;
  checked: boolean;
};

export type PaginationButtonProps = {
  page: number;
  active?: boolean;
};

export type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSizes: number[];
};

export type ConfirmationDialogProps = {
  message: string;
  handleConfirmationDialogOpen: (open: boolean) => void;
  isConfirming: boolean;
  handleConfirmation: () => void;
};

export type ImageWithFallbackProps = ComponentProps<typeof Image> & {
  fallbackSrc: StaticImageData;
};
