import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
