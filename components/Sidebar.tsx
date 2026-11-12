
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: "🏠" },
  { name: "Learning", href: "/learning", icon: "📚" },
  { name: "Projects", href: "/projects", icon: "💻" },
  { name: "Search", href: "/search", icon: "🔎" },
  { name: "About", href: "/about", icon: "ℹ️" },
];

export default function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">I</span>
        <span>InternHub</span>
      </div>

      <p className="nav-heading">MENU</p>

      <nav>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        <span>↪</span>
        Logout
      </button>

      <div className="sidebar-footer">
        <p>InternHub v1.0</p>
        <small>Learning Management</small>
      </div>
    </aside>
  );
}
