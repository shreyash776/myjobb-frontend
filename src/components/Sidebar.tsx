"use client";
import { Home, Table, BarChart2, Settings, LogOut, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: Table },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

const handleLogout = async () => {
  await apiFetch("/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
  router.push("/");
};

return (
  <aside className="h-full w-64 bg-black text-white flex flex-col py-8 px-4 shadow-lg sticky top-0 h-screen relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-green-400"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      <div className="mb-10">
        <span className="text-2xl font-extrabold text-green-400">Myjobb</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
            )}
            onClick={onClose}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
