"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {sidebarOpen && (
  <div className="fixed inset-0 z-40 flex">
    
    <div
  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-0"
  onClick={() => setSidebarOpen(false)}
/>

    
    <div className="relative z-10 w-64 h-full">
      <Sidebar onClose={() => setSidebarOpen(false)} />
    </div>
  </div>
)}

      
      <div className="flex-1 flex flex-col">
       
        <div className="md:hidden flex items-center p-4 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-600"
            aria-label="Open sidebar"
          >
            <Menu className="w-7 h-7" />
          </button>
          <span className="ml-4 text-xl font-bold text-black">Dashboard</span>
        </div>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
