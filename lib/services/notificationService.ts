/**
 * Skillora / Vaidya Setu - Smart Notification Service
 * Ministry of Ayush | All India Institute of Ayurveda (AIIA)
 */

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: "APPLICATION" | "SKILL_GAP" | "INTERVIEW" | "OPPORTUNITY" | "VERIFICATION";
  priority: "HIGH" | "MEDIUM" | "INFO";
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const NOTIFICATIONS_STORAGE_KEY = "vaidya_setu_smart_notifications_v2";

export const DEFAULT_NOTIFICATIONS: SmartNotification[] = [
  {
    id: "notif-1",
    title: "Application Status Update: Shortlisted!",
    message: "Dabur Research Foundation has shortlisted your application for Phytopharmaceutical Formulation Scientist. Proceed to AI Mock Interview to prepare.",
    timestamp: "10 mins ago",
    category: "APPLICATION",
    priority: "HIGH",
    read: false,
    actionUrl: "/career?tab=interview",
    actionLabel: "Prepare for Interview",
  },
  {
    id: "notif-2",
    title: "Skill Gap Alert: 3 Opportunities Affected",
    message: "Your GCP-Ayush Clinical Trials gap is reducing compatibility across 3 hospital fellowships. Remediate in Learning Hub to unlock 94% compatibility.",
    timestamp: "1 hour ago",
    category: "SKILL_GAP",
    priority: "HIGH",
    read: false,
    actionUrl: "/learning",
    actionLabel: "Remediate in Learning",
  },
  {
    id: "notif-3",
    title: "New Matching Research Opening",
    message: "CCRAS has announced a new Collaborative Classical Drug Standardization Project matching 91% of your verified competencies.",
    timestamp: "3 hours ago",
    category: "OPPORTUNITY",
    priority: "MEDIUM",
    read: false,
    actionUrl: "/opportunities",
    actionLabel: "View Opportunity",
  },
  {
    id: "notif-4",
    title: "Placement Readiness Improved (+6 Pts)",
    message: "Your consolidated placement readiness score increased from 79% to 85% (Job Ready tier) after completing Kayachikitsa clinical diagnostics.",
    timestamp: "Yesterday",
    category: "INTERVIEW",
    priority: "INFO",
    read: true,
    actionUrl: "/career?tab=placement",
    actionLabel: "View Readiness Report",
  },
];

export class NotificationService {
  public static getNotifications(): SmartNotification[] {
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!stored) return DEFAULT_NOTIFICATIONS;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }

  public static markAsRead(id: string): SmartNotification[] {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    if (typeof window !== "undefined") {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  }

  public static addNotification(notif: Omit<SmartNotification, "id" | "timestamp" | "read">): SmartNotification {
    const notifications = this.getNotifications();
    const created: SmartNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
      read: false,
    };
    const updated = [created, ...notifications];
    if (typeof window !== "undefined") {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    }
    return created;
  }

  public static getUnreadCount(): number {
    const notifications = this.getNotifications();
    return notifications.filter((n) => !n.read).length;
  }
}
