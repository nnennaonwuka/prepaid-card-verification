import { feather } from "@/app/fonts";
import DataNotFoundIcon from "@/assets/icons/data-not-found.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DataNotFound = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-white`, className)}>
      <Image src={DataNotFoundIcon} alt="Data Not Found Icon" width={124} height={124} />
      <p className={`${feather.className} font-bold`}>No data found</p>
    </div>
  );
};

export default DataNotFound;
