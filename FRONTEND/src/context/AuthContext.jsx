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

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      try {
        const res = await api.get("/auth/me"); 
        setUser(res.data.user);
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

  const signup = async (name, username, email, password) => {
    const res = await api.post("/auth/register", { name, username, email, password });
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
