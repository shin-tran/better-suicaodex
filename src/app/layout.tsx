import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/themes.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/components/Navbar/site-header";
import { ThemeProvider } from "@/components/providers";
import { ThemeSwitcher } from "@/components/Theme/theme-switcher";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableColorScheme
        >
          <SidebarProvider defaultOpen={false}>
            <div className="border-grid flex flex-1 flex-col">
              <SiteHeader />
              <main className="py-4 mx-4 md:mx-8 lg:mx-12">{children}</main>
              <Toaster
                richColors
                position="top-right"
                closeButton
                offset={{
                  top: "55px",
                  right: "65px",
                }}
              />
            </div>

            <AppSidebar side="right" />
          </SidebarProvider>
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
