"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Bike, Eye, EyeOff, AlertCircle } from "lucide-react";

const ADMIN_PASSWORD = "naran2026"; // Change this to your desired password

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate brief loading
    await new Promise((r) => setTimeout(r, 500));

    if (password === ADMIN_PASSWORD) {
      // Store auth in sessionStorage
      sessionStorage.setItem("nbh-admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-orange/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/[0.02] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo / Brand Area */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center shadow-2xl glow-orange"
          >
            <Bike className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white font-serif">
            Admin Panel
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Naran Bikers Hub — Order Management
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel-dark rounded-2xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-brand-orange/10">
              <Lock className="w-5 h-5 text-brand-orange" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Secure Login</h2>
              <p className="text-xs text-neutral-500">Enter your admin password</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/50 p-3.5 pr-12 text-sm focus:border-brand-orange focus:outline-none text-white transition-colors"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 py-3.5 text-sm font-bold shadow-lg transition-all active:scale-[0.98] glow-orange text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-neutral-600 text-xs mt-6">
          Protected Area · Unauthorized access is prohibited
        </p>
      </motion.div>
    </div>
  );
}
