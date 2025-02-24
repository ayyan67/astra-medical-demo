'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Settings,
  ShieldCheck,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

export function TopNav() {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'Submit a Claim',
      href: '/dashboard/claims/submit',
      icon: Upload,
      current: pathname === '/dashboard/claims/submit'
    },
    {
      name: 'View History',
      href: '/dashboard/claims/history',
      icon: FileText,
      current: pathname === '/dashboard/claims/history'
    },
    {
      name: 'De-identify Data',
      href: '/dashboard/deidentify',
      icon: ShieldCheck,
      current: pathname === '/dashboard/deidentify'
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname === '/dashboard/settings'
    }
  ]

  return (
    <div className="bg-white shadow">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-[#1D2432]">ASTRA</h1>
          </Link>
          <nav className="hidden md:ml-8 md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  item.current
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}