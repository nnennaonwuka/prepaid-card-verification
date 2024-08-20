import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCurrentDate = () => {
  const isoDate = new Date().toISOString();
  const date = isoDate.slice(0, 10);
  const time = isoDate.slice(11, 19).replaceAll(":", "_");
  return `${date} ${time}`;
};

export const trimCommas = (str: string) => {
  return str.replace(/^,/, "").replace(/,$/, "");
};
