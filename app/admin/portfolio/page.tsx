import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FileTextIcon,
  HomeIcon,
  ImagesIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { PortfolioCmsForm } from "@/components/admin/portfolio-cms-form";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getPortfolioContent } from "@/lib/cms-store";
import { defaultPortfolioContent } from "@/lib/portfolio-defaults";

const nav = [
  { title: "Home page", href: "/admin/home", icon: HomeIcon },
  { title: "About page", href: "/admin/about", icon: FileTextIcon },
  { title: "Services page", href: "/admin/services", icon: Settings2Icon },
  { title: "Portfolio page", href: "/admin/portfolio", icon: ImagesIcon, active: true },
  { title: "Blog page", href: "/admin/blog", icon: NewspaperIcon },
  { title: "SEO", href: "/admin/seo", icon: SearchIcon },
];

export default async function AdminPortfolioPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  let content = defaultPortfolioContent;
  try {
    content = (await getPortfolioContent()) ?? defaultPortfolioContent;
  } catch {
    content = defaultPortfolioContent;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/admin/home">
                  <LayoutDashboardIcon />
                  <span>Luumox CMS</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.active} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <form action={logoutAdmin}>
            <Button className="w-full" size="sm" type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Portfolio page content</p>
            <p className="truncate text-xs text-muted-foreground">Hero, tabs, project grid.</p>
          </div>
        </header>
        <div className="p-4 md:p-6">
          <PortfolioCmsForm initialContent={content} />
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
