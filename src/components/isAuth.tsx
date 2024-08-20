"use client";
import { SSO_WEB } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateUserToken } from "@/lib/redux/slices/authSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NotFound from "@/components/NotFound";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const configs = useAppSelector(state => (state.auth as any).user.configs);
    const { canViewPreloadedCards } = configs;
    const userTokenParam = searchParams.get("userToken");
    const userTokenStorage = useAppSelector(state => (state.auth as any).user.token);
    const hasUserToken = userTokenParam || userTokenStorage;
    const currentRoute = pathname === "/" ? "" : pathname;
    const params = new URLSearchParams(searchParams.toString());
    const userAuthenticated = userTokenParam || sessionStorage.getItem("userAuthenticated") === "true";
    const isRouteRestricted = pathname.includes("preloaded-cards") && !canViewPreloadedCards;

    if (userTokenParam) {
      sessionStorage.setItem("userAuthenticated", "true");
      dispatch(updateUserToken(userTokenParam));
      params.delete("userToken"); // Remove userToken param
      return router.push(`${pathname}?${params.toString()}`);
    }

    if ((!userAuthenticated || !hasUserToken) && window !== undefined) {
      // If token query param is not present and userAuthenticated is not true in session storage, redirect to SSO page to get latest token.
      // If token is neither present in query param nor local storage, redirect to SSO page for user to log in.
      return window.location.replace(`${SSO_WEB}?appUrl=${window.location.origin}${currentRoute}`);
    }

    if (isRouteRestricted) {
      return <NotFound />;
    }

    return <Component {...props} />;
  };
}
