"use client";
import { feather } from "@/app/fonts";
import Image from "next/image";
import { Button } from "./ui/button";
import UnpluggedIcon from "@/assets/icons/unplugged.svg";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image src={UnpluggedIcon} alt="Unplugged Logo" width={500} height={500} className="mb-4 h-[60px] w-[60px]" />
      <div className="flex flex-col gap-3 text-center">
        <p className={`font-700 text-[2.5rem] ${feather.className}`}>404</p>
        <p className={`font-700 text-[1.25rem] ${feather.className} opacity-60`}>Page not found</p>
        <p className="text-[1.25rem]">Sorry we cannot find the page you are looking for</p>
        <Button className={`font-700 ${feather.className} mt-4 h-[54px] w-full`} onClick={() => router.push("/home")}>
          Back to homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
