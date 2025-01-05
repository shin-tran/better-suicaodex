import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  id: string;
  src: string;
  alt: string;
}

export default function Background({ id, src, alt }: BackgroundProps) {
  const coverURL =
    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + src + ".256.jpg";

  return (
    <div className="absolute h-[17.5rem] z-[-2] w-auto left-0 right-0 top-0 block">
      <div
        className={cn(
          "fixed h-[17.5rem] w-full",
          "transition-[width] duration-150 ease-in-out",
          "bg-no-repeat bg-cover bg-center-25"
        )}
        style={{ backgroundImage: `url('${coverURL}')` }}
      ></div>
      <div
        className={cn(
          "absolute h-auto w-auto inset-0 pointer-events-none",
          "backdrop-blur-sm",
          "bg-gradient-to-r from-black/65 to-transparent"
        )}
      ></div>
    </div>
  );
}
