import { Link } from "react-router-dom";
import {
  Home,
  PlaySquare,
  Youtube,
  Clock,
  Menu,
} from "lucide-react";

function Sidebar({ open, onToggle }) {
  // Sidebar width toggles based on `open` prop; hidden on small screens
  return (
    <aside
      className={`transition-all duration-300 ${
        open ? "w-60" : "w-20"
      } hidden sm:block overflow-y-auto h-screen sticky top-0 z-40`}
    >
      <div className="flex items-center p-3 border-b bg-neutral-100 border-gray-200">
        {/* Placeholder for logo or menu button */}
      </div>

      {/* Navigation links grouped */}
      <SidebarLinks open={open} />
    </aside>
  );
}

function SidebarLinks({ open }) {
  return (
    <>
      {/* Main navigation */}
      <nav className="p-2 mt-6">
        <SidebarItem to="/" icon={<Home size={30} />} label="Home" open={open} />
        <SidebarItem to="/shorts" icon={<PlaySquare size={30} />} label="Shorts" open={open} />
        <SidebarItem to="/subscriptions" icon={<Youtube size={30} />} label="Subscriptions" open={open} />
      </nav>

      <div className="border-t border-gray-200 my-2"></div>

      {/* Secondary navigation */}
      <nav className="p-2">
        <SidebarItem to="/history" icon={<Clock size={30} />} label="History" open={open} />
      </nav>
    </>
  );
}

function SidebarItem({ to, icon, label, open }) {
  // Each item shows icon always, and label only when sidebar is expanded
  return (
    <Link
      to={to}
      title={!open ? label : ""}
      className="flex items-center gap-3 px-3 py-5 rounded hover:bg-gray-100 transition-colors"
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );
}

export default Sidebar;
