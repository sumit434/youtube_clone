import { Link } from "react-router-dom";
import { Home, PlaySquare, Youtube, Clock } from "lucide-react";

function Sidebar({ open }) {
  return (
    <aside
  className={`transition-all duration-300 h-screen  ${
    open ? "w-60" : "w-20"
  } flex flex-col overflow-y-auto mt-14`} // mt-14 = height of Navbar
>
  <SidebarLinks open={open} />
</aside>
  );
}

function SidebarLinks({ open }) {
  return (
    <nav className="flex-1 p-2">
      <SidebarItem to="/" icon={<Home size={30} />} label="Home" open={open} />
      <SidebarItem to="/shorts" icon={<PlaySquare size={30} />} label="Shorts" open={open} />
      <SidebarItem to="/subscriptions" icon={<Youtube size={30} />} label="Subscriptions" open={open} />

      <div className="border-t border-gray-200 my-2"></div>

      <SidebarItem to="/history" icon={<Clock size={30} />} label="History" open={open} />
    </nav>
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
