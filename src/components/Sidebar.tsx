import BetterLifeIcon from "@/assets/icons/better-life.svg";
import HomePageIcon from "@/assets/icons/homepage.svg";
import SidebarRightArrowIcon from "@/assets/icons/sidebar-right-arrow.svg";
import VideoIcon from "@/assets/icons/video.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleSidebar } from "@/lib/redux/slices/sidebarSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import NavLink from "./NavLink";
import type { SideBarLinks } from "./types";

const sideBarLinks: SideBarLinks[] = [
  {
    icon: VideoIcon,
    href: "/learning-videos",
    name: "LEARNING VIDEOS",
  },
  {
    icon: HomePageIcon,
    href: "/home",
    name: "MY HOMEPAGE",
  },
];

const Sidebar: FC = () => {
  const router = useRouter();
  const isSidebarOpen = useAppSelector(state => state.sidebar.isSidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen border border-r-[#DBDFF0] p-4 ${isSidebarOpen ? "w-[250px]" : "w-[100px]"} transition-[width] duration-200 ease-in-out`}
    >
      <div className={`mb-14 flex items-center ${isSidebarOpen ? "justify-between" : "mt-3 justify-center"}`}>
        <div className={`h-[40px] w-[40px] ${isSidebarOpen || "hidden"}`}>
          <Image src={BetterLifeIcon} alt="Better Life Logo" className="h-full w-full" onClick={() => router.push("/home")} />
        </div>
        <div className="h-[16px] w-[32px] cursor-pointer">
          <Image
            src={SidebarRightArrowIcon}
            alt="Sidebar Open Icon"
            className={`h-full w-full ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
            onClick={() => dispatch(toggleSidebar())}
          />
        </div>
      </div>
      <nav className="flex flex-col gap-4">
        {sideBarLinks.map((link, i) => (
          <NavLink key={i} href={link.href} className={`${isSidebarOpen || "justify-center"}`}>
            <Image src={link.icon} alt={`${link.name} Icon`} className="h-[28px] w-[28px]" />
            <p className={`${isSidebarOpen || "hidden"}`}>{link.name}</p>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
