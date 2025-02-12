"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface MangaCoverProps extends React.HTMLAttributes<HTMLImageElement> {
  id: string;
  cover: string;
  alt: string;
  placeholder?: string;
  isExpandable?: boolean;
  wrapper?: string;
}

const MangaCover: FC<MangaCoverProps> = ({
  id,
  cover,
  alt,
  placeholder,
  isExpandable = false,
  wrapper,
  className,
  ...props
}) => {
  const src =
    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + cover + ".512.jpg";
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {isExpandable && (
        <Dialog>
          <DialogTrigger className="z-10 flex opacity-0 hover:opacity-100 transition-opacity items-center justify-center absolute inset-0 bg-black bg-opacity-50 rounded-sm cursor-pointer">
            <Expand size={50} color="white" />
          </DialogTrigger>
          <DialogContent className="[&>button]:hidden bg-transparent border-none border-0 shadow-none p-0 w-auto h-auto">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>

            <div className="max-w-screen-md max-h-screen flex justify-center items-center relative">
              <img
                src={
                  siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + cover
                }
                alt={`Ảnh bìa ${alt}`}
                className="max-h-full max-w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <LazyLoadImage
        wrapperClassName={cn(
          "!block rounded-sm object-cover",
          !loaded && "aspect-[5/7]",
          wrapper
        )}
        placeholderSrc={placeholder}
        className={cn("h-auto w-full rounded-sm block", className)}
        src={src}
        alt={`Ảnh bìa ${alt}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = "/images/xidoco.jpg";
        }}
        {...props}
      />
    </div>
  );
};

export default MangaCover;
