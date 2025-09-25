import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };
// Generate a fallback avatar if user has none
  const generateAvatar = (username) =>
    `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
      username
    )}`;
  // Load user details from backend if token exists
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      try {
        const res = await api.get("/auth/me");
        const userData = res.data.user;
        if (userData && !userData.avatar) {
          setUser({
            ...userData,
            avatar: generateAvatar(userData.username || userData.name),
          });
        } else {
          setUser(userData || null);
        }
      } catch {
        setAuthToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);
  // Signup new user → save token & add avatar if missing
  const signup = async (name, username, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      username,
      email,
      password,
    });
    setAuthToken(res.data.token);
    const userData = res.data.user;
    if (userData && !userData.avatar) {
      setUser({
        ...userData,
        avatar: generateAvatar(userData.username || userData.name),
      });
    } else {
      setUser(userData);
    }
    return res.data;
  };
// Login user → save token & add avatar if missing
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAuthToken(res.data.token);
    const userData = res.data.user;
    if (userData && !userData.avatar) {
      setUser({
        ...userData,
        avatar: generateAvatar(userData.username || userData.name),
      });
    } else {
      setUser(userData);
    }
    return res.data;
  };
// Clear user data and token on logout
  const logout = () => {
    setUser(null);
    setAuthToken(null);
  };
// Update user state with new info (profile edits, etc.)
  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
