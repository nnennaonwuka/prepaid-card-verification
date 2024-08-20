"use client";
import PreloadedCardsUploadTemplate from "@/app/(prepaid-card-portal)/home/_components/PreloadedCardsUploadTemplate";
import { feather } from "@/app/fonts";
import BinIcon from "@/assets/icons/bin.svg";
import CsvIcon from "@/assets/icons/csv.svg";
import PageWrapper from "@/components/PageWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUploadPreloadedCards } from "@/hooks/tansack-query/mutations/cards";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const ImportPreloadedCards = () => {
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  let fileSize: string = "";
  if (typeof files === "object") {
    fileSize = files.size >= 1000000 ? `${Math.round(files.size / 1024 ** 2)}mb` : `${Math.ceil(files.size / 1024)}kb`;
  }

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFiles("");
  };

  const { uploadPreloadedCards, isUploadingPreloadedCards } = useUploadPreloadedCards(handleRemoveFile, setUploadProgress);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 1) {
      toast({
        description: "You can only upload one file",
      });
      return;
    }
    const file = e.dataTransfer.files[0];
    const index = file.name.lastIndexOf(".");
    const extension = file.name.slice(index + 1);
    if (extension !== "csv") {
      toast({
        description: "Uploaded file type must be CSV",
      });
      return;
    }
    setFiles(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files;
    if (file && file[0].size > 0) {
      setFiles(file[0]);
      return;
    }
    toast({
      description: "Please choose a non-empty CSV file",
    });
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append("file", files);
    uploadPreloadedCards(formData);
  };

  return (
    <PageWrapper showFilter={false} showSearch={false}>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push("/home/cards")}>Homepage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push("/home/preloaded-cards")}>Preloaded Cards</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Import File</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-[24rem] bg-white p-6">
        <div
          className={`h-full rounded-[20px] border border-dashed border-primary-green ${dragging && "bg-secondary-yellow"}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <Image src={CsvIcon} alt="csv icon" className="h-10 w-10" />
            <p className={`${feather.className} font-bold`}>Drag and Drop file here</p>
            <p className="text-primary-gray">Supports csv file</p>
            <div className="flex items-center gap-2">
              <Separator className="w-28" />
              <p className="text-primary-gray">OR</p>
              <Separator className="w-28" />
            </div>
            <Button
              variant="outline"
              className={`${feather.className} flex h-[2.5rem] w-[10rem] items-center justify-center rounded-[10px] px-4`}
              onClick={() => fileInputRef.current?.click()}
            >
              Browse files
            </Button>
            <Input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" />
          </div>
        </div>
      </div>
      {files && (
        <div className="mt-5">
          <p className={`${feather.className} font-bold`}>Chosen File</p>
          <div className="mt-5 rounded-[10px] border border-primary-gray bg-white px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={CsvIcon} alt="csv icon" className="h-10 w-10" />
                <div>
                  <p>{typeof files === "object" && files.name}</p>
                  <p className="text-primary-gray">{typeof files === "object" && fileSize}</p>
                </div>
              </div>
              <Image
                src={BinIcon}
                alt="bin icon"
                className={`h-6 w-6 cursor-pointer ${isUploadingPreloadedCards ? "invisible" : "visible"}`}
                onClick={handleRemoveFile}
              />
            </div>
            {isUploadingPreloadedCards && <Progress className="mt-4 h-[0.5rem] w-[34rem]" value={uploadProgress} />}
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              className={`h-[3rem] w-[8rem] rounded-[10px] ${feather.className} ${isUploadingPreloadedCards ? "hidden" : "block"}`}
              disabled={isUploadingPreloadedCards}
              onClick={handleUploadFile}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
      <PreloadedCardsUploadTemplate />
    </PageWrapper>
  );
};

export default ImportPreloadedCards;
