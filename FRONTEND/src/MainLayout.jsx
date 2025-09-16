import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
