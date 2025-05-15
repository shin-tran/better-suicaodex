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
  // const [loaded, setLoaded] = useState(false);
  // const [loadedCount, setLoadedCount] = useState(0);
  // const allLoaded = loadedCount === images.length;

  return (
    <div
      className={cn(
        "min-w-0 relative mt-2 min-h-lvh"
        // allLoaded ? "min-h-0" : "min-h-lvh"
      )}
    >
      <div
        className={cn(
          "overflow-x-auto flex flex-col items-center h-full select-none bg-transparent justify-center"
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
            className={cn("block overflow-hidden w-full")}
            // style={{
            //   minHeight: allLoaded ? "auto" : "500px",
            // }}
          >
            {/* <LazyLoadImage
              wrapperClassName={cn(
                "!block"
                // !loaded && "aspect-[5/7]"
              )}
              placeholderSrc={"/images/place-doro.webp"}
              className={cn(
                "h-auto mx-auto",
                config.reader.imageFit === "height"
                  ? "!max-h-screen w-auto"
                  : "w-full"
              )}
              // onLoad={() => setLoaded(true)}
              onLoad={() => {
                // setLoaded(true);
                setLoadedCount((prev) => prev + 1);
              }}
              onError={(e) => {
                e.currentTarget.src = "/images/xidoco.webp";
              }}
              src={image}
              alt={`Trang ${index + 1}`}
              visibleByDefault={true}
            /> */}

            <MangaImage src={image} alt={`Trang ${index + 1}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

interface MangaImageProps {
  src: string;
  alt: string;
}

function MangaImage({ src, alt }: MangaImageProps) {
  const [config] = useConfig();
  const [loaded, setLoaded] = useState(false);
  return (
    <LazyLoadImage
      wrapperClassName={cn(
        "!block mx-auto",
        !loaded && "aspect-[5/7]",
        config.reader.imageFit === "height" ? "!max-h-screen w-auto" : "w-full"
      )}
      placeholderSrc={"/images/place-doro.webp"}
      className={cn(
        "h-auto mx-auto",
        config.reader.imageFit === "height" ? "!max-h-screen w-auto" : "w-full"
      )}
      onLoad={() => {
        setLoaded(true);
      }}
      onError={(e) => {
        e.currentTarget.src = "/images/xidoco.webp";
      }}
      src={src}
      alt={alt}
      visibleByDefault={true}
    />
  );
}
