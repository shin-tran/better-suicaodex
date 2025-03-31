"use client";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LongStripProps {
  images: string[];
}

export default function LongStrip({ images }: LongStripProps) {
  // const [loaded, setLoaded] = useState(false);

  const [config] = useConfig();

  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount === images.length;

  return (
    <div
      className={cn(
        "min-w-0 relative mt-2",
        allLoaded ? "min-h-0" : "min-h-lvh"
      )}
    >
      <div
        className={cn(
          "overflow-x-auto flex flex-col items-center h-full select-none bg-transparent"
        )}
        style={{
          gap: `${config.reader.imageGap}px`,
        }}
      >
        {images.map((image, index) => (
          <span
            key={index + 1}
            // className={`block overflow-hidden ${
            //   loaded ? "min-h-0" : "min-h-[100vh]"
            // }`}
            className="block overflow-hidden"
            style={{
              minHeight: allLoaded ? "auto" : "500px",
            }}
          >
            <LazyLoadImage
              wrapperClassName="!block"
              placeholderSrc={"/images/place-doro.webp"}
              className={cn(
                "h-auto w-auto mx-auto",
                config.reader.imageFit === "height" && "!max-h-screen"
              )}
              // onLoad={() => setLoaded(true)}
              onLoad={() => setLoadedCount((prev) => prev + 1)}
              onError={(e) => {
                e.currentTarget.src = "/images/xidoco.webp";
              }}
              src={image}
              alt={`Trang ${index + 1}`}
              visibleByDefault={true}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
