"use client";

import * as React from "react";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "./ui/tooltip";
import { ThemeWrapper } from "./Theme/theme-wrapper";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <JotaiProvider>
      <NextThemesProvider {...props}>
        <ThemeWrapper>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeWrapper>
      </NextThemesProvider>
    </JotaiProvider>
  );
}
