"use client";
import CardsSkeleton from "@/app/(prepaid-card-portal)/home/_components/CardsSkeleton";
import TableSkeleton from "@/app/(prepaid-card-portal)/home/_components/CardsTableSkeleton";
import DataNotFound from "@/app/(prepaid-card-portal)/home/_components/DataNotFound";
import type { CardData, Stats } from "@/app/(prepaid-card-portal)/home/types";
import { feather } from "@/app/fonts";
import CancelIcon from "@/assets/icons/cancel-box.svg";
import CardIcon from "@/assets/icons/card.svg";
import CheckIcon from "@/assets/icons/check-circle.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import SortIcon from "@/assets/icons/sort.svg";
import WarningIcon from "@/assets/icons/warning.svg";
import MemberFallbackImage from "@/assets/images/member-fallback.svg";
import AccessDenied from "@/components/AccessDenied";
import AllCardsFilter from "@/components/AllCardsFilter";
import ImageWithFallback from "@/components/ImageWithFallback";
import PageWrapper from "@/components/PageWrapper";
import TablePagination from "@/components/TablePagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/redux";
import { useExportCardData, useGetAllCards, useGetCardStats } from "@/hooks/tansack-query/queries/cards";
import useDebounce from "@/hooks/useDebounce";
import { cardStatus, cardStatusMapping, sortMapping } from "@/lib/constants";
import { cn, getCurrentDate, trimCommas } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const { toast } = useToast();
  const [exportCounter, setExportCounter] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const configs = useAppSelector(state => (state.auth as any).user.configs);
  const { canViewPreloadedCards, canVerifyCard } = configs;

  const validStatuses: string[] = ["unverified", "unresolved", "verified"];

  let status = "";
  let sort = "";
  const statusParam = searchParams.get("status");
  let cardStatuses: string[] = statusParam?.split(",") || ["total"];

  const areAllCardStatusesInValid = cardStatuses.every(item => !validStatuses.includes(item));
  if (areAllCardStatusesInValid) {
    cardStatuses = ["total"]; // If all card statues are invalid, set the card to total
  }

  const sortParam = searchParams.get("sort");

  if (statusParam) {
    const untrimmedStatus = statusParam
      .split(",")
      .map(item => cardStatusMapping[item as keyof typeof cardStatusMapping])
      .join(",");
    status = trimCommas(untrimmedStatus); // For cases of undefined params, status could start or end with commas, so trim accordingly
  }

  if (sortParam) {
    const sortParamArr = sortParam.split(",");
    const sortParamObj: any = {};
    for (let i = 0; i < sortParamArr.length; i += 2) {
      sortParamObj[sortParamArr[i]] = sortMapping[sortParamArr[i + 1] as keyof typeof sortMapping] || "0";
    }
    const untrimmedSort = Object.entries(sortParamObj)
      .map(item => item.join(","))
      .join(","); // Convert sort param to format recognized by api e.g. sort=1,0
    sort = trimCommas(untrimmedSort); // For cases of undefined params, sort could start or end with commas, so trim accordingly
  }

  const pageParams = {
    query: searchParams.get("q") || "",
    status,
    sort,
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "20",
  };

  const currentDate = getCurrentDate();
  const exportFileName = `${currentDate}-${statusParam === null ? "all" : statusParam.replace(",", "_")}_cards_details`;

  const { cardExporting, cardExportError } = useExportCardData(exportCounter, {
    status: pageParams.status,
    fileName: exportFileName,
  });

  const search = useDebounce<string>(pageParams.query.trim()); // Get search input when user stops typing

  const { cardStats, cardStatsLoading, cardStatsError } = useGetCardStats();
  const { allCards, allCardsLoading, allCardsError } = useGetAllCards({
    search,
    status: pageParams.status,
    sort: pageParams.sort,
    page_num: pageParams.page,
    page_size: pageParams.pageSize,
  });

  const params = new URLSearchParams(searchParams.toString());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    searchValue ? params.set("q", searchValue) : params.delete("q");
    params.delete("page"); // Remove current page on search (Go to page 1)
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (sortKey: string) => {
    const sortParamObj: Record<string, string> = {};
    if (sortParam) {
      const sortParamArr = sortParam.split(",");
      for (let i = 0; i < sortParamArr.length; i += 2) {
        sortParamObj[sortParamArr[i]] = sortParamArr[i + 1] as keyof typeof sortMapping;
      }
    }
    sortParamObj[sortKey] === "asc" ? params.set("sort", `${sortKey},desc`) : params.set("sort", `${sortKey},asc`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCardDetailsClick = (card: CardData) => {
    router.push(`/home/cards/${card.unique_entity_id}/${card.bank_card_id}/${card.hub}`);
  };

  const handleStatsClick = (stat: Stats) => {
    if (stat.routesNewPage) {
      router.push(stat.href); // If user clicks preloaded cards
      return;
    }

    const statName = stat.name.split(" ")[0].toLowerCase();
    params.delete("page"); // Remove current page on card click (Go to page 1)
    params.set("status", statName);

    if (statName === "total") {
      params.delete("status"); // If user clicks on total number of cards, remove status param
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const enableCardExport = () => {
    setExportCounter(prev => prev + 1);
  };

  const stats: Stats[] = [
    {
      name: "Total Number of Cards",
      colorClass: {
        default: "bg-primary-blue/10",
        hover: "hover:bg-primary-blue/30",
        active: "bg-primary-blue/30  border-primary-blue",
      },
      number: cardStats?.all_cards,
      icon: FolderIcon,
      href: "",
      visible: true,
      routesNewPage: false,
    },
    {
      name: "Verified Cards",
      colorClass: {
        default: "bg-primary-green/10",
        hover: "hover:bg-primary-green/30",
        active: "bg-primary-green/30 border-primary-green",
      },
      number: cardStats?.verified_cards,
      icon: CheckIcon,
      href: "",
      visible: true,
      routesNewPage: false,
    },
    {
      name: "Unverified Cards",
      colorClass: {
        default: "bg-destructive/10",
        hover: "hover:bg-destructive/30",
        active: "bg-destructive/30  border-destructive",
      },
      number: cardStats?.unverified_cards,
      icon: CancelIcon,
      href: "",
      visible: true,
      routesNewPage: false,
    },
    {
      name: "Unresolved Cards",
      colorClass: {
        default: "bg-primary-yellow/10",
        hover: "hover:bg-primary-yellow/30",
        active: "bg-primary-yellow/30  border-primary-yellow",
      },
      number: cardStats?.unresolved_cards,
      icon: WarningIcon,
      href: "",
      visible: true,
      routesNewPage: false,
    },
    {
      name: "Preloaded Cards",
      colorClass: {
        default: "bg-white",
        hover: "hover:bg-white",
        active: "bg-white",
      },
      number: cardStats?.preloaded_cards,
      icon: CardIcon,
      href: "/home/preloaded-cards",
      visible: canViewPreloadedCards,
      routesNewPage: true,
    },
  ];

  useEffect(() => {
    if (cardExportError) {
      toast({
        description: "Failed to export cards",
      });
    }
  }, [cardExportError, toast]);

  return (
    <PageWrapper
      searchPlaceholder="Search by ID, Name, Location"
      handleSearch={handleSearch}
      Filter={AllCardsFilter}
      showExport={true}
      isExporting={cardExporting}
      handleExport={enableCardExport}
    >
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Homepage</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {cardStatsLoading ? (
        <CardsSkeleton />
      ) : (
        <div className="mb-6 flex flex-wrap gap-4">
          {stats.map((stat, i) => {
            const statName = stat.name.split(" ")[0].toLowerCase();

            return (
              <div
                className={cn(
                  `h-[5.375rem] w-[13.5rem] rounded-[10px] border-2 border-transparent px-3 transition-colors duration-200 hover:cursor-pointer ${stat.colorClass.default} ${stat.colorClass.hover} ${stat.visible || "hidden"} `,
                  cardStatuses.includes(statName) && stat.colorClass.active,
                )}
                onClick={() => handleStatsClick(stat)}
                key={i}
              >
                <div className="mb-4 mt-2 flex items-start gap-2">
                  <Image src={stat.icon} alt={stat.name} width={24} height={24} />
                  <p> {stat.name}</p>
                </div>
                <p className={`${feather.className} text-xl text-[700]`}>{stat.number?.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
      {allCardsLoading ? (
        <TableSkeleton />
      ) : allCards?.data.length === 0 ? (
        <DataNotFound />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holder Details</TableHead>
                <TableHead className="flex cursor-pointer items-center gap-2" onClick={() => handleSort("hub")}>
                  Hub <Image src={SortIcon} alt="Sort Icon" />
                </TableHead>
                <TableHead>BG Card ID</TableHead>
                <TableHead>Card Pan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issuer ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCards?.data?.map(card => (
                <TableRow key={`${card.unique_entity_id} ${card.bank_card_id}`}>
                  <TableCell>
                    <div className="flex gap-2">
                      <div className="h-[45px] w-[45px]">
                        <ImageWithFallback src={card.image} alt={`${card.name} image`} fallbackSrc={MemberFallbackImage} />
                      </div>
                      <div>
                        <p>{card.name}</p>
                        <p className="opacity-80">{card.ik_number}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{card.hub}</TableCell>
                  <TableCell>{card.card_id}</TableCell>
                  <TableCell>{card.card_pan}</TableCell>
                  <TableCell>
                    <div className={`flex items-center justify-center gap-2 rounded-[8px] px-2 py-1 ${cardStatus[card.status]?.bgClass}`}>
                      <Image src={cardStatus[card.status]?.icon} alt={`${cardStatus[card?.status].name} Icon`} className="h-4 w-4" />
                      <p>{cardStatus[card.status]?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{card.issuer_id}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <MoreHorizontal className="w-17 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleCardDetailsClick(card)}>
                          {card.status === "0" && canVerifyCard ? "Change Status" : "View"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            {allCards && <TablePagination currentPage={allCards.currentPage} totalPages={allCards.totalPages} pageSizes={[20, 50, 100]} />}
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default Home;
