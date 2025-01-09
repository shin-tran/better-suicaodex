import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  id: string;
  src: string;
}

export default function Background({ id, src }: BackgroundProps) {
  const coverURL =
    siteConfig.suicaodex.apiURL + "/covers/" + id + "/" + src + ".256.jpg";

  return (
    <div className="absolute h-[17.5rem] z-[-1] w-auto left-0 right-0 top-0 block">
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
          "fixed h-[17.5rem] w-auto inset-0 pointer-events-none",
          "backdrop-blur-none md:backdrop-blur-sm",
          "bg-gradient-to-r from-black/65 to-transparent"
        )}
      ></div>
      <div
        className={cn(
          "md:hidden",
          "fixed h-[17.5rem] w-auto inset-0 pointer-events-none backdrop-blur-[2px]"
        )}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / .6) 0%, hsl(var(--background)) 100%)",
        }}
      ></div>
    </div>
  );
}
