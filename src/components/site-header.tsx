import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ModeSwitcher } from "./mode-switcher";
// import { MobileNav } from "@/components/mobile-nav";
//import { ModeSwitcher } from "@/components/mode-switcher";

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper px-4">
        <div className="flex h-12 items-center">
          <MainNav />
          {/* <MobileNav /> */}
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* <CommandMenu /> */}
              <Button
                variant="outline"
                className={cn(
                  "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
                )}
              >
                <span className="hidden lg:inline-flex">Tìm kiếm...</span>
                <span className="inline-flex lg:hidden">Tìm kiếm...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
            <nav className="flex items-center gap-0.5">
              <ModeSwitcher />
              <SidebarTrigger />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
