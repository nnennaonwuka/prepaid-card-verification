import Image from "next/image";
import LearningVideoThumbNail from "@/assets/images/learning-videos-thumbnail.svg";
import VideoIcon from "@/assets/icons/video.svg";
import { feather } from "@/app/fonts";
import { useRouter } from "next/navigation";
import type { LearningVideosProps } from "@/app/(prepaid-card-portal)/learning-videos/types";

const LearningVideo = ({ videoId, videoTitle }: LearningVideosProps) => {
  const router = useRouter();

  return (
    <div className="w-[290px]">
      <Image src={LearningVideoThumbNail} alt="learning videos thumbnail" className="h-[158px] w-full rounded-t-[10px]" />
      <div
        className="flex cursor-pointer items-center gap-4 rounded-b-[10px] bg-white p-5 h-[5rem]"
        onClick={() => router.push(`/learning-videos/${videoId}`)}
      >
        <Image src={VideoIcon} alt="Video Icon" width={36} height={36} />
        <p className={`${feather.className}`}>{videoTitle}</p>
      </div>
    </div>
  );
};

export default LearningVideo;
