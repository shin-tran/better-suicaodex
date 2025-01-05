"use client";
import { MainNav } from "@/components/Navbar/main-nav";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { ModeSwitcher } from "./mode-switcher";
import { Search } from "lucide-react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import useScrollOffset from "@/hooks/use-scroll-offset";

export function SiteHeader() {
  const { isAtTop } = useScrollOffset();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        isAtTop && "bg-transparent",
        !isAtTop &&
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-grid border-b"
        // scrollDirection === "down" && !isAtTop && "-translate-y-full"
        // "-translate-y-full",
        // "border-grid border-b",
        // "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        // "bg-transparent"
      )}
    >
      <div className="container-wrapper px-4">
        <div className="flex h-12 items-center justify-between">
          <MainNav />
          {/* <MobileNav /> */}
          <div className="flex flex-1 items-center gap-2 justify-end">
            <div className="hidden md:flex md:w-auto">
              <Button
                variant="ghost"
                className={cn(
                  "relative h-8 justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal px-2 shadow-sm sm:pr-12 md:w-40 lg:w-56 xl:w-64"
                )}
              >
                <Search />
                <span className="hidden md:inline-flex">Tìm kiếm...</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              className="h-8 w-8 bg-muted/50 px-0 inline-flex shadow-sm md:hidden"
            >
              <Search />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
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
