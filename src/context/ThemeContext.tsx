"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Always dark — remove any saved light theme
    localStorage.removeItem("theme");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Dark mode is permanent — no toggle
  };

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
      <div className={mounted ? "" : "invisible"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
