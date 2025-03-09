'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  ShieldCheck,
  LogOut,
  Users,
  FileBarChart2,
  HelpCircle,
  ChevronRight,
  Bell,
  AlertCircle,
} from "lucide-react";

// Add a route for Claims Review
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-purple-500",
  },
  {
    label: "Submit Claim",
    icon: Upload,
    href: "/claims/submit",
    color: "text-purple-500",
  },
  {
    label: "Claims Review",
    icon: AlertCircle,
    href: "/claims/review",
    color: "text-amber-500",
    badge: 8, // Number of claims needing attention
  },
  {
    label: "Claims History",
    icon: FileText,
    href: "/claims/history",
    color: "text-purple-500",
  },
  {
    label: "Analytics",
    icon: FileBarChart2,
    href: "/dashboard/analytics",
    color: "text-purple-500",
  },
  {
    label: "De-identify Data",
    icon: ShieldCheck,
    color: "text-purple-500",
    href: "/deidentify",
  },
  {
    label: "Team",
    icon: Users,
    href: "/dashboard/team",
    color: "text-purple-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-purple-500",
  },
];

export function Sidebar({ collapsed = false, toggleCollapse }: { 
  collapsed?: boolean,
  toggleCollapse?: () => void
}) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex flex-col h-full bg-[#0A0A20] text-white border-r border-purple-900/30 transition-all duration-300",
      collapsed ? "w-[80px]" : "w-[280px]"
    )}>
      <div className="p-5 flex items-center gap-3 border-b border-purple-900/30">
        {!collapsed && (
          <>
            <Image src="/astra-logo.png" alt="Astra Logo" width={64} height={64} />
          </>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Image src="/astra-logo.png" alt="Astra Logo" width={64} height={64} />
          </div>
        )}
        {toggleCollapse && (
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-purple-900/20 ml-auto"
          >
            <ChevronRight className={cn("h-5 w-5 transition-transform", 
              collapsed ? "" : "rotate-180"
            )} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex p-3 rounded-md transition-all duration-200 relative",
                collapsed ? "justify-center" : "items-center",
                pathname === route.href
                  ? "bg-purple-900/30 text-purple-300 border-l-4 border-purple-500"
                  : "text-gray-300 hover:text-white hover:bg-purple-900/10"
              )}
              title={collapsed ? route.label : undefined}
            >
              <route.icon className={cn("h-5 w-5 flex-shrink-0", route.color)} />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span className="ml-2">{route.label}</span>
                  {route.badge && (
                    <span className="text-xs px-2 py-0.5 bg-amber-900/50 text-amber-300 rounded-full ml-2">
                      {route.badge}
                    </span>
                  )}
                </div>
              )}
              {collapsed && route.badge && (
                <span className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center bg-amber-900/50 text-amber-300 rounded-full">
                  {route.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="border-t border-purple-900/30 p-4">
        {!collapsed && (
          <div className="flex items-center mb-4 p-2 bg-purple-900/20 rounded-md">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-sm font-bold mr-3">
              DA
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Dr. Astra</p>
              <p className="text-xs text-gray-400">Internal Medicine</p>
            </div>
          </div>
        )}
        
        <button
          onClick={() => window.location.href = "/"}
          className={cn(
            "group flex rounded-md p-3 w-full transition-all duration-200",
            collapsed ? "justify-center" : "items-center space-x-2",
            "text-red-400 hover:text-red-300 hover:bg-red-900/10"
          )}
          title={collapsed ? "Log Out" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
        
        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-purple-900/30">
            <div className="flex items-center text-xs text-gray-400 space-x-1">
              <HelpCircle className="h-3 w-3" />
              <span>Need help?</span>
              <a href="#" className="text-purple-400 hover:text-purple-300 ml-1">Contact support</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}