"use client";

import SideBar from "@/app/components/dashboard/sidebar";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black">
      <SideBar />

      <div className="flex-1">{children}</div>
    </div>
  );
}
