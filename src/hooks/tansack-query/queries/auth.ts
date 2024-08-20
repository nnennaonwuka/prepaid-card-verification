import { getUserProfile } from "@/api/auth";
import { UserProfileData } from "@/app/(prepaid-card-portal)/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  const {
    data,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useQuery<UserProfileData>({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
  });

  return {
    userProfileData: data,
    userProfileLoading,
    userProfileError,
  };
};
