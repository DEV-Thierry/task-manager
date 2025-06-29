import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import authService from "../services/authService";
import type { User, RegisterUserDTO } from "../models/User";

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  registerUser: (user: RegisterUserDTO) => Promise<boolean>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser == null) {
      logout();
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  const registerUser = async (user: RegisterUserDTO) => {
    try {
      const registered = await authService.register(user);
      if (!registered) throw new Error("O usuario nao foi registrado!");

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const user = await authService.login(username, password);

      localStorage.setItem("currentUser", JSON.stringify(user));

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    delete api.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    isAuth: !!user,
    login,
    logout,
    registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
