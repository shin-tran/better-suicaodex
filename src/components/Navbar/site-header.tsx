"use client";
import { MainNav } from "@/components/Navbar/main-nav";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { ModeSwitcher } from "./mode-switcher";
import useScrollOffset from "@/hooks/use-scroll-offset";
import QuickSearch from "../Search/quick-search";

export function SiteHeader() {
  const { isAtTop } = useScrollOffset();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "px-4 md:px-8 lg:px-12",
        isAtTop && "bg-transparent",
        !isAtTop &&
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container-wrapper">
        <div className="flex h-12 items-center justify-between">
          <MainNav />
          {/* <MobileNav /> */}
          <div className="flex flex-grow items-center gap-2 justify-end">
            <QuickSearch />

            <nav className="flex items-center gap-2">
              <ModeSwitcher />
              <SidebarTrigger className="w-8 h-8 bg-muted/50 shadow-sm" />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
