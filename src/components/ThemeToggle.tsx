"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 relative focus:outline-none bg-slate-200/50 hover:bg-slate-200/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 text-foreground border border-slate-300/20 dark:border-slate-700/20 cursor-pointer"
      aria-label="Toggle Theme"
    >
      <span className="sr-only">Toggle Theme</span>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-5 h-5 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-800" />
        )}
      </motion.div>
    </button>
  );
}
