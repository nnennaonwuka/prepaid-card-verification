import { feather } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import type { PaginationButtonProps, TablePaginationProps } from "./types";

const TablePagination = ({ currentPage, totalPages, pageSizes }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const handlePageChange = (page: number) => {
    params.set("page", String(page));
    return router.push(`${pathname}?${params.toString()}`, { scroll: false }); // Prevent scrolling to top of page on page change
  };

  const handlePageSizeChange = (pageSize: string) => {
    params.set("pageSize", pageSize);
    params.delete("page"); // Remove current page on page size change (Go to page 1)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const addPageButton = ({ page, active = false }: PaginationButtonProps) => {
    return (
      <Button
        key={page}
        variant={active ? "default" : "outline"}
        className={`h-8 w-8 rounded-full ${active || "border-none bg-transparent hover:bg-primary-green hover:text-white"}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPaginationButtons = () => {
    const pageButtons: ReactNode[] = [];

    // First Page
    pageButtons.push(addPageButton({ page: 1, active: currentPage === 1 }));

    if (totalPages === 1) {
      // If there's only one page, just return the first page only
      return pageButtons;
    }

    if (currentPage > 3) {
      pageButtons.push(
        <Button
          size="icon"
          variant="outline"
          key="ellipsis-1"
          className="h-8 w-8 cursor-default rounded-full border-none bg-transparent hover:bg-transparent"
        >
          ...
        </Button>,
      );
    }

    // One page before current page
    if (currentPage > 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          active: false,
        }),
      );
    }

    // Current Page
    if (currentPage > 1 && currentPage < totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          active: true,
        }),
      );
    }

    // One page after current page
    if (currentPage < totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          active: false,
        }),
      );
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button
          size="icon"
          variant="outline"
          key="ellipsis-2"
          className="h-8 w-8 cursor-default rounded-full border-none bg-transparent hover:bg-transparent"
        >
          ...
        </Button>,
      );
    }

    // Last Page to be rendered only if page is not 1 since first page button is already rendered
    pageButtons.push(addPageButton({ page: totalPages, active: currentPage === totalPages }));
    return pageButtons;
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={`${feather.className} flex h-auto gap-2 rounded-[10px] bg-transparent px-4 py-1.5 text-sm hover:bg-transparent hover:text-primary-green/80`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <CircleChevronLeft size={20} /> Prev
        </Button>
        {renderPaginationButtons()}
        <Button
          variant="outline"
          className={`${feather.className} flex h-auto gap-2 rounded-[10px] bg-transparent px-4 py-1.5 text-sm hover:bg-transparent hover:text-primary-green/80`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next <CircleChevronRight size={20} />
        </Button>
      </div>
      <div className="">
        <Select onValueChange={handlePageSizeChange}>
          <SelectTrigger className="h-[2.5rem] w-[4.5rem] rounded-[8px] border border-primary-gray px-4 py-3">
            <SelectValue placeholder={searchParams.get("pageSize") || "20"} defaultValue={searchParams.get("pageSize") || "20"} />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((size, i) => (
              <SelectItem value={String(size)} className="flex items-center justify-center" key={i}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TablePagination;
