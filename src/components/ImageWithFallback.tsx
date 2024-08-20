"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageWithFallbackProps } from "./types";

const ImageWithFallback = ({ fallbackSrc, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false);
  
  useEffect(() => {
    setError(false);
  }, [props.src]);

  return (
    <Image
      {...props}
      alt={props.alt}
      width={500}
      height={500}
      className={cn("h-full w-full rounded-[5px] object-cover", props.className)}
      onError={() => setError(true)}
      src={error ? fallbackSrc : props.src}
    />
  );
};

export default ImageWithFallback;
