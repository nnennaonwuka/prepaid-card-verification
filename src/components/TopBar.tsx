import SearchIcon from "@/assets/icons/search.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import { useGetUserProfile } from "@/hooks/tansack-query/queries/auth";
import { logOutUser, updateUserConfigs } from "@/lib/redux/slices/authSlice";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Notifications from "./Notifications";
import type { TopBarProps } from "./types";
import { Skeleton } from "./ui/skeleton";

const TopBar = ({ showSearch, showFilter, searchPlaceholder, handleSearch, Filter, showExport, isExporting, handleExport }: TopBarProps) => {
  const [isLogOutDropdownOpen, setIsLogOutDropDownOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { userProfileData, userProfileLoading, userProfileError } = useGetUserProfile();
  const profileNameArr = userProfileData?.staff_name?.split(" ");
  const profileInitials = profileNameArr
    ?.map(name => name[0])
    .slice(0, 2) // Limit to initials to the first two names
    .join("");

  if (userProfileData) {
    dispatch(updateUserConfigs(userProfileData?.configs));
  }

  const handleLogOutDropdownOpen = () => {
    setIsLogOutDropDownOpen(prev => !prev);
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const handleExportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behaviour of dropdown closing on click of menu item
    handleExport && handleExport();
  };

  return (
    <div className="h-22 flex items-center justify-between py-5 pl-5 pr-8">
      <div className="flex w-1/2 items-center justify-between gap-4">
        <div className={`relative w-full ${showSearch || "invisible"}`}>
          <Input
            placeholder={searchPlaceholder}
            className="h-[3rem] border-[#75748F00] pr-8"
            onChange={e => handleSearch && handleSearch(e)}
            defaultValue={searchParams.get("q") || ""}
          />
          <Image src={SearchIcon} alt="Search Icon" className="absolute bottom-1/2 right-3 translate-y-1/2" />
        </div>
        <div className={`${showFilter || "invisible"}`}>{Filter && <Filter />}</div>
      </div>
      <div className="flex h-10 w-1/2 items-center justify-end gap-3">
        <Notifications />
        <Avatar>
          {userProfileLoading ? (
            <Skeleton className="h-10 w-10" />
          ) : (
            <>
              <AvatarImage src={userProfileData?.staff_picture} />
              <AvatarFallback>{profileInitials}</AvatarFallback>
            </>
          )}
        </Avatar>
        <div>
          {userProfileLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-2 w-32" />
              <Skeleton className="h-2 w-32" />
            </div>
          ) : (
            <>
              <p className="font-bold">{userProfileData?.staff_name}</p>
              <p className="text-sm text-primary-gray">{userProfileData?.staff_id}</p>
            </>
          )}
        </div>
        <DropdownMenu open={isLogOutDropdownOpen} onOpenChange={handleLogOutDropdownOpen}>
          <DropdownMenuTrigger className="focus:outline-none">
            <ChevronDown className={`cursor-pointer transition duration-200 ease-in-out ${isLogOutDropdownOpen ? "rotate-180" : "rotate-0"}`} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[12.625rem]" align="end" sideOffset={35}>
            <DropdownMenuItem
              className={`cursor-pointer justify-start py-2 ${showExport || "hidden"}`}
              disabled={isExporting}
              onClick={e => handleExportClick(e)}
            >
              {isExporting ? (
                <div className="flex items-center gap-2">
                  <p>Exporting </p> <ClipLoader color="#59C903" size={15} />
                </div>
              ) : (
                "Export Data"
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer justify-start py-2 text-destructive hover:border-destructive active:bg-destructive active:text-white"
              onClick={handleLogOut}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
