"use client";
import { feather } from "@/app/fonts";
import AccessDeniedIcon from "@/assets/icons/access-denied.svg";
import Image from "next/image";

const AccessDenied = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image src={AccessDeniedIcon} alt="Unplugged Logo" width={500} height={500} className="mb-4 h-[80px] w-[80px]" />
      <div className="flex flex-col gap-3 text-center">
        <p className={`font-700 mt-8 text-[2rem]/[48px] ${feather.className}`}>Access Denied</p>
        <p className="text-[1.25rem] opacity-70">You do not have access to this application. Kindly contact the admin.</p>
      </div>
    </div>
  );
};

export default AccessDenied;
