
import { Home, Table, BarChart2, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: Table },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ active }: { active?: string }) {
  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col py-8 px-4 shadow-lg">
      <div className="mb-10">
        <span className="text-2xl font-extrabold text-green-400">Myjobb</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition",
              active === item.name ? "bg-green-600" : ""
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
