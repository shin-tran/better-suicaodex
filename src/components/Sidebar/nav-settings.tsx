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
import { ContentCustomizer } from "../Theme/content-customizer";

export function NavSettings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tuỳ chỉnh</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeCustomizer />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <ContentCustomizer />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
