"use client";

import * as React from "react";
import { Bookmark, BookOpen, Users } from "lucide-react";
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
} from "@icons-pack/react-simple-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { siteConfig } from "@/config/site";
import { NavSupports } from "./nav-supports";
import { NavSettings } from "./nav-settings";

// This is sample data.
const data = {
  user: {
    name: "iamneyk",
    email: "iamneyk@suicaodex.com",
    avatar: "/avatars/doro_think.webp",
  },

  navMain: [
    {
      title: "Theo dõi",
      url: "#",
      icon: Bookmark,
      isActive: true,
      items: [
        {
          title: "Thư viện",
          url: "#",
        },
        {
          title: "Lịch sử đọc",
          url: "#",
        },
      ],
    },
    {
      title: "Truyện",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Tìm kiếm nâng cao",
          url: "#",
        },
        {
          title: "Mới cập nhật",
          url: "#",
        },
        {
          title: "Truyện mới đăng",
          url: "#",
        },
        {
          title: "Truyện ngẫu nhiên",
          url: "/random",
        },
      ],
    },
    {
      title: "Cộng đồng",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Diễn đàn",
          url: "#",
        },
        {
          title: "Nhóm dịch",
          url: "#",
        },
      ],
    },
  ],

  supports: [
    {
      name: "Facebook",
      url: siteConfig.links.facebook,
      icon: SiFacebook,
    },
    {
      name: "Discord",
      url: siteConfig.links.discord,
      icon: SiDiscord,
    },
    {
      name: "Github",
      url: siteConfig.links.github,
      icon: SiGithub,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-12 items-center justify-center">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings />
      </SidebarContent>
      <SidebarFooter className="p-0">
        <NavSupports supports={data.supports} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
