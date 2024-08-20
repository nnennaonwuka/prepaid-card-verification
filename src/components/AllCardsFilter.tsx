import { feather } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import type { StatusParam } from "./types";

const AllCardsFilter: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const statusSearchParam = searchParams.get("status")?.split(",") || "";

  const defaultStatuses: StatusParam[] = [
    { name: "Unresolved", checked: statusSearchParam?.includes("unresolved") },
    { name: "Unverified", checked: statusSearchParam?.includes("unverified") },
    { name: "Verified", checked: statusSearchParam?.includes("verified") },
  ];

  const resetStatuses: StatusParam[] = [
    { name: "Unresolved", checked: false },
    { name: "Unverified", checked: false },
    { name: "Verified", checked: false },
  ];

  const [statuses, setStatuses] = useState<StatusParam[]>(defaultStatuses);

  const params = new URLSearchParams(searchParams.toString());

  const handleStatusChange = (status: StatusParam) => {
    const newStatuses = statuses.map(item => {
      if (item.name === status.name) {
        item.checked = !item.checked;
      }
      return item;
    });
    setStatuses(newStatuses);
  };

  const handleResetFilter = () => {
    setStatuses(resetStatuses);
    params.delete("status");
    params.delete("page"); // Remove current page on filter reset (Go to page 1)
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApplyFilter = () => {
    const checkedStatuses = statuses.filter(status => status.checked).map(status => status.name.toLowerCase());
    checkedStatuses.length ? params.set("status", checkedStatuses.join(",")) : params.delete("status");
    params.delete("page"); // Remove current page on filter application (Go to page 1)
    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const isAllUnchecked = statuses.every(status => !status.checked);

  useEffect(() => {
    // Update statuses when param changes
    setStatuses(defaultStatuses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button className="gap-1">
          Add Filter <ListFilter size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[26.25rem] rounded-[12px] px-5 pb-10 pt-5" align="end" sideOffset={20}>
        <div>
          <div className="mb-6">
            <h4 className={`${feather.className} text-[1.5rem]/[36px] font-medium leading-none`}>Filters</h4>
          </div>
          <div>
            <div>
              <Collapsible open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                <div className="flex items-center justify-between text-primary-gray">
                  <h4 className="text-[1.25rem]">Status</h4>
                  <CollapsibleTrigger asChild>
                    <Button
                      size="sm"
                      className={`bg-transparent p-0 text-primary-gray hover:bg-transparent active:bg-transparent ${isStatusOpen ? "rotate-180" : "rotate-0"} transition duration-200 ease-in-out`}
                    >
                      <TbTriangleInvertedFilled size={12} />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 grid gap-4 pl-4">
                  {statuses.map((status, i) => (
                    <div className="flex items-center gap-2" key={i}>
                      <Checkbox id={status.name.toLowerCase()} checked={status.checked} onCheckedChange={() => handleStatusChange(status)} />
                      <Label htmlFor={status.name.toLowerCase()}>{status.name}</Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Separator className="mt-3" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className={`rounded-[10px] ${feather.className}`} onClick={handleResetFilter} disabled={isAllUnchecked}>
              Reset
            </Button>
            <Button variant="outline" className={`rounded-[10px] ${feather.className}`} onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AllCardsFilter;
