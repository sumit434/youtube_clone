import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes> 
    </BrowserRouter>
  );
}
