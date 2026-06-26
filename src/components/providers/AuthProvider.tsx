"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "admin" | "student" | "applicant";
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@spaceup.vn": {
    password: "admin123",
    user: {
      id: "1",
      email: "admin@spaceup.vn",
      name: "Admin User",
      role: "admin",
    },
  },
  "user@example.com": {
    password: "password123",
    user: {
      id: "2",
      email: "user@example.com",
      name: "Nguyễn Văn A",
      role: "student",
    },
  },
  "SU@admin.com": {
    password: "thanhchung204",
    user: {
      id: "0",
      email: "SU@admin.com",
      name: "Super Admin",
      role: "superadmin",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("spaceup_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("spaceup_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedEmail = email.toLowerCase().trim();
    const demoUser = DEMO_USERS[normalizedEmail];

    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem("spaceup_user", JSON.stringify(demoUser.user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("spaceup_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}