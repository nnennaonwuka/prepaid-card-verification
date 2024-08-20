import Image from "next/image";
import React from "react";
import NoVideoIcon from "@/assets/icons/no-video.svg";
import { feather } from "@/app/fonts";

const NoLearningVideo = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2">
      <Image src={NoVideoIcon} alt="no video icon" width={124} height={124} />
      <p className={`${feather.className}`}>No Learning Video found</p>
    </div>
  );
};

export default NoLearningVideo;
