import { Link } from "react-router-dom";
import {
  Home,
  PlaySquare,
  Youtube,
  Clock,
  Menu,
} from "lucide-react";

function Sidebar({ open, onToggle }) {
  return (
    <aside
      className={`transition-all duration-300 ${
        open ? "w-60" : "w-20"
      } hidden sm:block overflow-y-auto border-r border-gray-200 bg-white h-screen sticky top-0 z-40`}
    >
      <div className="flex items-center p-3 border-b border-gray-200">
        <button
          onClick={onToggle}
          aria-label="Toggle Sidebar"
          className="p-0.5 rounded hover:bg-gray-100"
        >
          <Menu size={30} />
        </button>
        {open && (
          <Link to="/" className="ml-3 flex items-center gap-5">
            <svg
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-6 text-red-600"
              fill="currentColor"
            >
              <path d="M549.7 124.1c-6.3-23.7-24.9-42.4-48.6-48.7C456.2 64 288 64 288 64s-168.2 0-213.1 11.4c-23.7 6.3-42.3 25-48.6 48.7C15 168.1 15 256 15 256s0 87.9 11.3 131.9c6.3 23.7 24.9 42.4 48.6 48.7C119.8 448 288 448 288 448s168.2 0 213.1-11.4c23.7-6.3 42.3-25 48.6-48.7C561 343.9 561 256 561 256s0-87.9-11.3-131.9zM232 338V174l142 82-142 82z" />
            </svg>
            <span className="text-lg font-bold">YouTube</span>
          </Link>
        )}
      </div>

      <SidebarLinks open={open} />
    </aside>
  );
}

function SidebarLinks({ open }) {
  return (
    <>
      <nav className="p-2 my-2">
        <SidebarItem to="/" icon={<Home size={30} />} label="Home" open={open} />
        <SidebarItem to="/shorts" icon={<PlaySquare size={30} />} label="Shorts" open={open} />
        <SidebarItem to="/subscriptions" icon={<Youtube size={30} />} label="Subscriptions" open={open} />
      </nav>

      <div className="border-t border-gray-200 my-2"></div>

      <nav className="p-2">
        <SidebarItem to="/history" icon={<Clock size={30} />} label="History" open={open} />
      </nav>
    </>
  );
}

function SidebarItem({ to, icon, label, open }) {
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
