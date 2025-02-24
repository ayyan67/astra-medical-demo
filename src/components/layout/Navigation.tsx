"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, History, Settings, LogOut, Shield } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/claims/submit", label: "Submit a Claim", icon: FileText },
    { href: "/claims/history", label: "View History", icon: History },
    { href: "/deidentify", label: "De-identify Data", icon: Shield },  // Updated path
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ASTRA</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  asChild
                  className={`flex items-center gap-2 ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            <Button
              variant="outline"
              className="ml-4 text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;