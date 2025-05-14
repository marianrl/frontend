import { Audit } from '../../types/audit';
import { auditService } from './audit';

interface Notification {
  id: number;
  auditId: number;
  userId: number;
  message: string;
  date: string;
  isRead: boolean;
  isAFIP: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private lastCheck: string | null = null;
  private readonly STORAGE_KEY = 'notifications';
  private readonly LAST_CHECK_KEY = 'lastNotificationCheck';

  private constructor() {
    // Load notifications from localStorage on initialization
    const storedNotifications = localStorage.getItem(this.STORAGE_KEY);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
    const storedLastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
    if (storedLastCheck) {
      this.lastCheck = storedLastCheck;
    }
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notifications));
    if (this.lastCheck) {
      localStorage.setItem(this.LAST_CHECK_KEY, this.lastCheck);
    }
  }

  private async cleanupInvalidNotifications(): Promise<void> {
    try {
      // Get all audits
      const response = await auditService.fetchAllAudit('audit');
      const audits = response.data;

      // Create a set of valid audit IDs
      const validAuditIds = new Set(audits.map((audit: Audit) => audit.id));

      // Remove notifications for non-existent audits
      this.notifications = this.notifications.filter((n) =>
        validAuditIds.has(n.auditId)
      );

      // Save the cleaned up notifications
      this.saveToStorage();
    } catch (error) {
      console.error('Error cleaning up notifications:', error);
    }
  }

  public async fetchNotifications(userId: number): Promise<Notification[]> {
    try {
      // First, clean up any notifications for non-existent audits
      await this.cleanupInvalidNotifications();

      // Get all audits
      const response = await auditService.fetchAllAudit('audit');
      const audits = response.data;

      // Sort audits by date in descending order
      const sortedAudits = audits.sort(
        (a: Audit, b: Audit) =>
          new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime()
      );

      // Get the last 5 audits
      const lastFiveAudits = sortedAudits.slice(0, 5);

      // Create notifications for the last 5 audits
      const newNotifications = lastFiveAudits.map((audit: Audit) => ({
        id: audit.id,
        auditId: audit.id,
        userId: userId,
        message: `Nueva auditoría ${
          audit.idTipoAuditoria.id === 9 ? 'AFIP' : 'Interna'
        } - ${audit.idTipoAuditoria.auditType}`,
        date: audit.auditDate,
        isRead: false,
        isAFIP: audit.idTipoAuditoria.id === 9,
      }));

      // Only add new notifications that don't exist in the current list
      const existingIds = new Set(
        this.notifications.map((n: Notification) => n.id)
      );
      const uniqueNewNotifications = newNotifications.filter(
        (n: Notification) => !existingIds.has(n.id)
      );

      // Update notifications list with new notifications and sort by date
      this.notifications = [...this.notifications, ...uniqueNewNotifications]
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          // If dates are equal, sort by ID in descending order (newer IDs first)
          if (dateA === dateB) {
            return b.id - a.id;
          }
          return dateB - dateA;
        })
        .slice(0, 5);

      // Update last check time
      this.lastCheck = new Date().toISOString();

      // Save to localStorage
      this.saveToStorage();

      return this.notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return this.notifications;
    }
  }

  public getUnreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length;
  }

  public markAsRead(notificationId: number): void {
    const notification = this.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.isRead = true;
      this.saveToStorage();
    }
  }

  public markAllAsRead(): void {
    this.notifications.forEach((n) => (n.isRead = true));
    this.saveToStorage();
  }

  public removeNotificationByAuditId(auditId: number): void {
    this.notifications = this.notifications.filter(
      (n) => n.auditId !== auditId
    );
    this.saveToStorage();
  }

  public clearNotifications(): void {
    this.notifications = [];
    this.lastCheck = null;
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.LAST_CHECK_KEY);
  }
}

export const notificationService = NotificationService.getInstance();
