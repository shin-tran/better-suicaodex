"use client";

import Link from "next/link";
//import { usePathname } from "next/navigation";
import useScrollOffset from "@/hooks/use-scroll-offset";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

export function MainNav() {
  const { isAtTop } = useScrollOffset();
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <div>
      <Link
        href="/"
        className="mr-4 flex items-center gap-1 justify-start lg:mr-6"
      >
        {/* <Icons.logo className="h-6 w-6" /> */}
        {/* <img
          src="/doro.webp"
          fetchPriority="high"
          alt="Doro"
          className="h-10 w-auto pb-1 -ml-1"
        /> */}
        <img
          src="/suicaodex.webp"
          fetchPriority="high"
          alt="SuicaoDex"
          className={cn(
            "h-[22px] w-auto drop-shadow-md dark:invert hidden xs:flex",
            !isAtTop && "filter-none",
            pathname.includes("/manga") && "md:invert"
          )}
        />
        {/* <span  className="font-bold inline-block">{siteConfig.name}</span> */}
      </Link>
      {/* <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Components
        </Link>
        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Blocks
        </Link>
        <Link
          href="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/component/chart") ||
              pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Charts
        </Link>
        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Themes
        </Link>
        <Link
          href="/colors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Colors
        </Link>
      </nav> */}
    </div>
  );
}
