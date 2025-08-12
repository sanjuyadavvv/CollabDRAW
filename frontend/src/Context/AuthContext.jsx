// context/AuthContext.js

import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignin = async (form) => {
    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("email", form.email);
    data.append("password", form.password);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", data);
      const token = res.data.authtoken;
      console.log("Signup response:", res.data);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      const token = res.data.authtoken;
      console.log("Login response:", res.data);
      localStorage.setItem("token", token);

      setFormData({
        ...formData,
        fullName: res.data.fullName,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const value = {
    handleLogin,
    handleSignin,
    formData,
    setFormData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
