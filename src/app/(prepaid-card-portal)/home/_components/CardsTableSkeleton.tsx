import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CardsTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(6)
            .fill("-")
            .map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-2" />
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>{" "}
      <TableBody>
        {Array(20)
          .fill("-")
          .map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-48">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-[45px] w-[45px]" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-2 w-36" />
                    <Skeleton className="h-2 w-36" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-2" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CardsTableSkeleton;
