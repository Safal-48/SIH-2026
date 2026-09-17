"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, CheckCircle2, AlertTriangle, Briefcase, Award, X, Sparkles } from "lucide-react";
import { NotificationService, SmartNotification } from "@/lib/services/notificationService";

export function SmartNotificationBell() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<SmartNotification[]>([]);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setNotifications(NotificationService.getNotifications());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    const updated = NotificationService.markAsRead(id);
    setNotifications(updated);
  };

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/5 border border-emerald-500/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
        title="Smart Platform Alerts"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-[#03190f]/95 border border-emerald-500/40 backdrop-blur-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                Platform Notifications
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">
              {unreadCount} Unread
            </span>
          </div>

          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No new notifications.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border transition-all text-xs space-y-2 ${
                    !n.read
                      ? "bg-black/60 border-amber-400/40 shadow-sm"
                      : "bg-black/30 border-white/5 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white text-xs leading-snug">
                      {n.title}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono flex-shrink-0">
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    {n.message}
                  </p>

                  <div className="pt-1 flex items-center justify-between gap-2 text-[10px]">
                    {!n.read && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                    {n.actionUrl && (
                      <Link
                        href={n.actionUrl}
                        onClick={() => {
                          handleMarkAsRead(n.id);
                          setIsOpen(false);
                        }}
                        className="font-bold text-amber-300 hover:text-amber-200 transition-colors ml-auto inline-flex items-center gap-1"
                      >
                        <span>{n.actionLabel || "View Action"}</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
