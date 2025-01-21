"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface MangaCoverProps extends React.HTMLAttributes<HTMLImageElement> {
  id: string;
  cover: string;
  alt: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: string;
  isExpandable?: boolean;
  wrapper?: string;
}

const MangaCover: FC<MangaCoverProps> = ({
  id,
  cover,
  alt,
  priority = false,
  placeholder,
  loading,
  isExpandable = false,
  wrapper,
  className,
  ...props
}) => {
  const src =
    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + cover + ".512.jpg";
  return (
    <div
      className={cn(
        "relative bg-cover bg-no-repeat bg-center rounded-md",
        wrapper
      )}
      style={{
        aspectRatio: 5 / 7,
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
      }}
    >
      <div className="relative">
        {isExpandable && (
          <Dialog>
            <DialogTrigger className="flex opacity-0 hover:opacity-100 transition-opacity items-center justify-center absolute inset-0 bg-black bg-opacity-50 rounded cursor-pointer">
              <Expand size={55} color="white" />
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden bg-transparent border-none border-0 shadow-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>

              <div className="w-full h-full flex justify-center items-center relative">
                <img
                  src={
                    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + cover
                  }
                  alt={`Ảnh bìa ${alt}`}
                  className="max-h-[95vh] w-auto"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        <img
          src={src}
          alt={`Ảnh bìa ${alt}`}
          className={cn("object-cover rounded-md", className)}
          {...props}
          fetchPriority={priority ? "high" : "auto"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MangaCover;
