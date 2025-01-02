"use client";

import { SquareCheck, SquareX } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { ThemeCustomizer } from "../Theme/theme-customizer";

export function NavSettings() {
  //   const { isMobile } = useSidebar();
  const [isR18Enabled, setIsR18Enabled] = React.useState(false);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tuỳ chỉnh</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeCustomizer />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="R18"
            onClick={() => setIsR18Enabled(!isR18Enabled)}
          >
            <div>
              {isR18Enabled ? <SquareCheck /> : <SquareX />}
              <span>R18</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
