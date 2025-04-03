"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import { useLocalNotification } from "@/hooks/use-local-notification";
import { cn } from "@/lib/utils";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { localNotification } = useLocalNotification();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground overflow-visible"
            >
              <div className="relative inline-block">
              {!!localNotification.unread.length && (
                <span className="absolute block rounded-full ring-2 ring-white top-0 left-0 bg-red-500 size-2.5 z-10 animate-bounce duration-250" />
              )}
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Tài khoản
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell
                  className={cn(
                    !!localNotification.unread.length && "animate-bell-shake"
                  )}
                />
                Thông báo
                {!!localNotification.unread.length && (
                  <Badge
                    className="rounded-full ml-auto min-w-4 h-4 justify-center p-1 text-xs font-normal"
                    variant="destructive"
                  >
                    {localNotification.unread.length <= 10
                      ? localNotification.unread.length
                      : "10+"}
                  </Badge>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:bg-red-500/20 focus:text-red-500">
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
