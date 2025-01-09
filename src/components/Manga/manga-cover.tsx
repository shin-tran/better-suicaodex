"use client";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface MangaCoverProps extends React.HTMLAttributes<HTMLImageElement> {
  id: string;
  cover: string;
  alt: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: string;
}

const MangaCover: FC<MangaCoverProps> = ({
  id,
  cover,
  alt,
  priority = false,
  placeholder,
  loading,
  className,
  ...props
}) => {
  const src =
    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + cover + ".512.jpg";
  return (
    <div
      className={cn(
        "relative bg-cover bg-no-repeat bg-center rounded-md max-w-[200px] h-auto"
      )}
      style={{
        aspectRatio: 5 / 7,
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
      }}
    >
      <img
        src={src}
        alt={`Ảnh bìa ${alt}`}
        className={cn("object-cover rounded-md", className)}
        {...props}
        fetchPriority={priority ? "high" : "auto"}
        loading={loading}
      />
    </div>
  );
};

export default MangaCover;
