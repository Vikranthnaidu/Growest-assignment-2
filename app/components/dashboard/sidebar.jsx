"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PieChart } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  IndianRupee,
  Settings,
  LogOut,
  Receipt,
} from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Holdings",
      href: "/holdings",
      icon: Wallet,
    },
    {
      name: "Current NAV",
      href: "/current-nav",
      icon: IndianRupee,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: Receipt,
    },
    {
      name: "Total Assets",
      href: "/total-assets",
      icon: PieChart,
    },
  ];

  return (
    <div className="w-[18%] min-h-screen bg-zinc-950 border-r border-zinc-800 text-white flex flex-col justify-between px-6 py-8">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-orange-500 p-3 rounded-xl">
            <IndianRupee size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Growest</h1>

            <p className="text-sm text-zinc-400">Investment Tracker</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
                  
                  ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-zinc-800 text-zinc-300"
                  }
                `}
              >
                <Icon size={20} />

                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Total Assets Card */}
        <div className="mt-10 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 rounded-3xl p-6">
          <p className="text-zinc-300 text-sm">Total Assets</p>

          <h1 className="text-4xl font-bold text-white mt-3">₹14.8L</h1>

          <div className="flex items-center justify-between mt-4">
            <p className="text-green-400 text-sm font-semibold">+18.2%</p>

            <div className="bg-orange-500/20 px-3 py-1 rounded-full text-orange-400 text-xs font-semibold">
              Portfolio
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 hover:bg-zinc-800 transition px-4 py-3 rounded-xl font-semibold text-zinc-300"
        >
          <Settings size={20} />
          Settings
        </Link>

        <button className="flex items-center gap-3 hover:bg-red-500/20 transition px-4 py-3 rounded-xl font-semibold text-red-400">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
