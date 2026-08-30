"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike,
  Calendar,
  User,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  RefreshCw,
  LogOut,
  Search,
  Filter,
  ChevronDown,
  Package,
  TrendingUp,
  Users,
  Play,
  CheckCheck,
  Ban,
} from "lucide-react";

interface Booking {
  id: string;
  bikeModel: string;
  name: string;
  email?: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  gearNeeded: boolean;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const STATUS_CONFIG = {
  pending: {
    label: "Pending Approval",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    icon: Clock,
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Ride Started",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    icon: Play,
    dot: "bg-emerald-400",
  },
  completed: {
    label: "Ride Completed",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    icon: CheckCheck,
    dot: "bg-blue-400",
  },
  cancelled: {
    label: "Ride Cancelled",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/30",
    icon: Ban,
    dot: "bg-red-400",
  },
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();

  const fetchBookings = useCallback(async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Check auth
    const isAuth = sessionStorage.getItem("nbh-admin-auth");
    if (!isAuth) {
      router.push("/admin");
      return;
    }
    fetchBookings();

    // Auto Refresh every 5 seconds (Real-time live polling)
    const interval = setInterval(() => {
      fetchBookings(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [router, fetchBookings]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchBookings(true);
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      await fetchBookings(true);
    } catch (err) {
      console.error("Failed to delete booking:", err);
    } finally {
      setActionLoading(null);
      setDeleteConfirm(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nbh-admin-auth");
    router.push("/admin");
  };

  // Filter and search
  const filteredBookings = bookings.filter((b) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(query) ||
      (b.email && b.email.toLowerCase().includes(query)) ||
      b.phone.includes(searchQuery) ||
      b.bikeModel.toLowerCase().includes(query) ||
      b.id.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 text-sm">Loading orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 glass-panel-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-brand-orange to-red-600 shadow-lg">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold font-serif text-white">
                    Admin Panel
                  </h1>
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Auto-Sync
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 -mt-0.5">
                  Naran Bikers Hub
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchBookings(false)}
                className={`p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer ${
                  isRefreshing ? "animate-spin text-brand-orange" : ""
                }`}
                title="Force Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            {
              label: "Total Orders",
              value: stats.total,
              icon: Package,
              gradient: "from-brand-orange/20 to-red-600/20",
              iconColor: "text-brand-orange",
            },
            {
              label: "Pending Approval",
              value: stats.pending,
              icon: Clock,
              gradient: "from-amber-500/20 to-yellow-600/20",
              iconColor: "text-amber-400",
            },
            {
              label: "Rides Started",
              value: stats.confirmed,
              icon: Play,
              gradient: "from-emerald-500/20 to-green-600/20",
              iconColor: "text-emerald-400",
            },
            {
              label: "Rides Completed",
              value: stats.completed,
              icon: CheckCheck,
              gradient: "from-blue-500/20 to-indigo-600/20",
              iconColor: "text-blue-400",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel-dark rounded-xl p-4 sm:p-5 border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone, bike, or order ID..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-neutral-900/50 text-sm text-white placeholder:text-neutral-600 focus:border-brand-orange focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-neutral-900/50 text-sm text-neutral-300 hover:border-brand-orange/50 transition-colors cursor-pointer min-w-[170px] justify-between"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {statusFilter === "all"
                  ? "All Status"
                  : STATUS_CONFIG[statusFilter as keyof typeof STATUS_CONFIG]
                      ?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden z-30"
                >
                  {["all", "pending", "confirmed", "completed", "cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2 ${
                          statusFilter === status
                            ? "text-brand-orange bg-brand-orange/5"
                            : "text-neutral-300"
                        }`}
                      >
                        {status === "all" ? (
                          <Users className="w-3.5 h-3.5" />
                        ) : (
                          <div
                            className={`w-2 h-2 rounded-full ${
                              STATUS_CONFIG[
                                status as keyof typeof STATUS_CONFIG
                              ].dot
                            }`}
                          />
                        )}
                        {status === "all"
                          ? "All Status"
                          : STATUS_CONFIG[
                              status as keyof typeof STATUS_CONFIG
                            ].label}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Orders List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-neutral-900 flex items-center justify-center">
              <Package className="w-10 h-10 text-neutral-700" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-400 mb-2">
              {bookings.length === 0
                ? "No Orders Yet"
                : "No Matching Orders"}
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              {bookings.length === 0
                ? "Orders will appear here automatically when customers submit booking requests."
                : "Try changing your search query or filter to find what you're looking for."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs text-neutral-500 flex items-center justify-between">
              <span>Showing {filteredBookings.length} of {bookings.length} orders</span>
              <span className="text-[11px] text-emerald-400/80">Updates automatically every 5s</span>
            </p>

            {filteredBookings.map((booking, i) => {
              const statusConf = STATUS_CONFIG[booking.status];
              const StatusIcon = statusConf.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel-dark rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-orange/10 to-red-600/10 shrink-0">
                        <Bike className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-base">
                          {booking.bikeModel}
                        </h3>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          {booking.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConf.color} ${statusConf.bg} border ${statusConf.border}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConf.label}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-neutral-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
                            Customer
                          </p>
                          <p className="text-sm text-white font-medium">
                            {booking.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
                            Email
                          </p>
                          {booking.email ? (
                            <a
                              href={`mailto:${booking.email}`}
                              className="text-sm text-brand-orange hover:underline font-medium truncate block"
                            >
                              {booking.email}
                            </a>
                          ) : (
                            <span className="text-sm text-neutral-500">N/A</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
                            Phone
                          </p>
                          <a
                            href={`tel:${booking.phone}`}
                            className="text-sm text-brand-orange hover:underline font-medium"
                          >
                            {booking.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
                            Dates ({booking.days}d)
                          </p>
                          <p className="text-sm text-white font-medium">
                            {formatDate(booking.pickupDate)} →{" "}
                            {formatDate(booking.returnDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Extra Info Row */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {booking.gearNeeded && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-2.5 py-1.5">
                          <Shield className="w-3 h-3" />
                          Safety Gear Required
                        </span>
                      )}
                      {booking.notes && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 max-w-full">
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">{booking.notes}</span>
                        </span>
                      )}
                    </div>

                    {/* Booked on */}
                    <p className="text-[11px] text-neutral-600 mb-4">
                      Booked on {formatDateTime(booking.createdAt)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
                      {/* Action 1: Start Ride */}
                      {booking.status !== "confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "confirmed")
                          }
                          disabled={actionLoading === booking.id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/30 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Start Ride
                        </button>
                      )}

                      {/* Action 2: Complete Ride */}
                      {booking.status !== "completed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "completed")
                          }
                          disabled={actionLoading === booking.id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/30 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Complete Ride
                        </button>
                      )}

                      {/* Action 3: Cancel Ride */}
                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "cancelled")
                          }
                          disabled={actionLoading === booking.id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/30 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          Cancel Ride
                        </button>
                      )}

                      {/* Reset to Pending if needed */}
                      {booking.status !== "pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "pending")
                          }
                          disabled={actionLoading === booking.id}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-amber-400/80 bg-amber-400/5 hover:bg-amber-400/15 border border-amber-400/20 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          Reset Status
                        </button>
                      )}

                      <div className="flex-1" />

                      {/* Send Email Button */}
                      {booking.email && (
                        <a
                          href={`mailto:${booking.email}?subject=Regarding your booking ${booking.id} - Naran Bikers Hub`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-orange-400 bg-orange-400/10 hover:bg-orange-400/20 border border-orange-400/20 transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Send Email
                        </a>
                      )}

                      {/* WhatsApp shortcut */}
                      <a
                        href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-green-400 bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>

                      {/* Delete */}
                      {deleteConfirm === booking.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            disabled={actionLoading === booking.id}
                            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {actionLoading === booking.id ? (
                              <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              "Yes, Delete"
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2.5 py-2 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(booking.id)}
                          className="p-2 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
