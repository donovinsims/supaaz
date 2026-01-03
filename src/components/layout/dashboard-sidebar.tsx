"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FolderKanban, Settings, CreditCard, Menu, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/submit", label: "Submit", icon: PlusCircle },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

function NavLinks({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium rounded-[8px] transition-colors",
              isActive
                ? "bg-ui-2 text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-ui-1"
            )}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[240px] flex-col border-r border-border-1 bg-page p-4">
        <div className="mb-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <NavLinks />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-border-1 bg-page/80 backdrop-blur-md flex items-center px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 -ml-2 text-text-secondary hover:text-text-primary">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="p-4 border-b border-border-1">
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <NavLinks onItemClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="w-9" />
      </div>
    </>
  );
}
