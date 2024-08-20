"use client";
import BetterLifeLogo from "@/assets/images/better-life.png";
import isAuth from "@/components/isAuth";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { useGetUserProfile } from "@/hooks/tansack-query/queries/auth";
import { languages } from "@/lib/constants";
import { updateUserConfigs } from "@/lib/redux/slices/authSlice";
import { cn } from "@/lib/utils";
import { CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { feather } from "./fonts";
import AccessDenied from "@/components/AccessDenied";

const EntryPoint = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userProfileData, userProfileLoading, userProfileError } = useGetUserProfile();
  const [userLanguage, setUserLanguage] = useState<null | "English" | "Hausa">(null);

  const handleLanguageClick = (value: null | "English" | "Hausa") => {
    setUserLanguage(value === userLanguage ? null : value);
  };

  if (userProfileData) {
    dispatch(updateUserConfigs(userProfileData?.configs));
  }

  // return <AccessDenied />

  return (
    <main>
      {userProfileLoading ? (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <Image src={BetterLifeLogo} alt="Better Life Image" className="h-[112px] w-[102px]" />
          <BounceLoader color="#59C903 " size={48} aria-label="Loading Spinner" data-testid="loader" />
          <p className={`${feather.className} text-[1.25rem] font-bold`}>Retrieving Permissions</p>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center text-center">
          <div className="h-[116px] w-[106px]">
            <Image src={BetterLifeLogo} alt="Better Life Logo" className="h-full w-full" />
          </div>
          <div>
            <p className={`${feather.className} mb-2 mt-8 text-[2rem]`}>Select Your Language</p>
            <p className="mb-10 text-xl opacity-70">Please select the preferred language you want to use.</p>
            <div className="flex w-[500px] justify-between">
              {languages.map((language, i) => (
                <div
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-[10px] border border-solid border-primary-gray px-14 py-6 hover:cursor-pointer hover:border-primary-orange hover:bg-secondary-yellow",
                    `${userLanguage === language.name && "border-primary-orange bg-secondary-yellow"}`,
                  )}
                  key={i}
                  onClick={() => handleLanguageClick(language.name)}
                >
                  <div className="h-[72px] w-[72px]">
                    <Image src={language.logo} alt={`${language.name} Logo`} className="w-full" />
                  </div>
                  <p>{language.name}</p>
                </div>
              ))}
            </div>
            <Button
              className={`${feather.className} mt-16 flex w-full gap-2 rounded-[10px] py-6`}
              disabled={!userLanguage}
              onClick={() => router.push("/home/cards")}
            >
              Next <CircleChevronRight />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default isAuth(EntryPoint);
