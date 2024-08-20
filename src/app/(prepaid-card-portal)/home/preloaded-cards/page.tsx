"use client";
import DataNotFound from "@/app/(prepaid-card-portal)/home/_components/DataNotFound";
import PreloadedCardsTableSkeleton from "@/app/(prepaid-card-portal)/home/_components/PreloadedCardsTableSkeleton";
import { feather } from "@/app/fonts";
import PageWrapper from "@/components/PageWrapper";
import PreloadedCardsFilter from "@/components/PreloadedCardsFilter";
import TablePagination from "@/components/TablePagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPreloadedCards } from "@/hooks/tansack-query/queries/cards";
import useDebounce from "@/hooks/useDebounce";
import { preloadedCardStatus, preloadedCardStatusMapping } from "@/lib/constants";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PreloadedCards = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const statusParam = searchParams.get("status");
  const status = statusParam ? preloadedCardStatusMapping[statusParam as keyof typeof preloadedCardStatusMapping] : "";

  const pageParams = {
    query: searchParams.get("q") || "",
    status,
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "20",
  };

  const search = useDebounce<string>(pageParams.query.trim()); // Get search input when user stops typing

  const { preloadedCards, preloadedCardsLoading, preloadedCardsError } = useGetPreloadedCards({
    search,
    status: pageParams.status,
    page: pageParams.page,
    page_size: pageParams.pageSize,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    searchValue ? params.set("q", searchValue) : params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PageWrapper
      showFilter={true}
      searchPlaceholder="Search by Account Number or BG Card ID"
      handleSearch={handleSearch}
      Filter={PreloadedCardsFilter}
    >
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push("/home/cards")}>Homepage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preloaded Cards</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-6 flex justify-end">
        <Button
          variant="outline"
          className={`${feather.className} flex h-[2.5rem] w-[10rem] items-center justify-center rounded-[10px] bg-transparent px-4 `}
          onClick={() => router.push("/home/preloaded-cards/import-file")}
        >
          Import File
        </Button>
      </div>
      {preloadedCardsLoading ? (
        <PreloadedCardsTableSkeleton />
      ) : preloadedCards?.data.length === 0 ? (
        <DataNotFound />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account No</TableHead>
                <TableHead>BG Card ID</TableHead>
                <TableHead>Card Pan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preloadedCards?.data?.map(card => {
                const cardStatus = preloadedCardStatus[card.status as keyof typeof preloadedCardStatus];
                return (
                  <TableRow key={card.id}>
                    <TableCell>{card.account_no}</TableCell>
                    <TableCell>{card.card_number}</TableCell>
                    <TableCell>{card.pan}</TableCell>
                    <TableCell className="w-[15%]">
                      <div className={`flex items-center justify-center gap-2 rounded-[8px] px-2 py-1 ${cardStatus?.bgClass} `}>
                        <Image src={cardStatus.icon} alt={`${cardStatus.name} Icon`} className="h-4 w-4" />
                        <p>{cardStatus.name}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-4">
            {preloadedCards && (
              <TablePagination currentPage={preloadedCards.currentPage} totalPages={preloadedCards.totalPages} pageSizes={[20, 50, 100]} />
            )}
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default PreloadedCards;
