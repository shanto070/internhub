
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/", icon: "🏠" },
  { name: "Learning", href: "/learning", icon: "📚" },
  { name: "Projects", href: "/projects", icon: "💻" },
  { name: "Search", href: "/search", icon: "🔍" },
  { name: "About", href: "/about", icon: "ℹ️" },
];

export default function Sidebar() {
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

      <div className="sidebar-footer">
        <p>InternHub v1.0</p>
        <small>Learning Management</small>
      </div>
    </aside>
  );
}
