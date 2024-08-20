import { useAppSelector } from "@/hooks/redux";
import { type PropsWithChildren } from "react";
import TopBar from "./TopBar";
import type { TopBarProps } from "./types";

const PageWrapper = ({
  children,
  showSearch = true,
  showFilter = true,
  searchPlaceholder = "",
  handleSearch,
  Filter,
  showExport = false,
  isExporting = false,
  handleExport
}: PropsWithChildren<TopBarProps>) => {
  const isSidebarOpen = useAppSelector(state => state.sidebar.isSidebarOpen);

  return (
    <div className={`${isSidebarOpen ? "ml-[250px]" : "ml-[100px]"} transition-all duration-200 ease-in-out`}>
      <TopBar
        showSearch={showSearch}
        showFilter={showFilter}
        searchPlaceholder={searchPlaceholder}
        handleSearch={handleSearch}
        Filter={Filter}
        showExport={showExport}
        isExporting={isExporting}
        handleExport={handleExport}
      />
      <div className="min-h-[100vh] bg-[#F2F2F4] px-4 py-6">{children}</div>
    </div>
  );
};

export default PageWrapper;
