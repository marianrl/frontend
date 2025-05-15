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
    // Cargar notificaciones desde localStorage al inicializar
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
      // Obtener todas las auditorías
      const response = await auditService.fetchAllAudit('audit');
      const audits = response.data;

      // Crear un conjunto de IDs de auditorías válidas
      const validAuditIds = new Set(audits.map((audit: Audit) => audit.id));

      // Eliminar notificaciones para auditorías inexistentes
      this.notifications = this.notifications.filter((n) =>
        validAuditIds.has(n.auditId)
      );

      // Guardar las notificaciones limpias
      this.saveToStorage();
    } catch (error) {
      console.error('Error al limpiar notificaciones:', error);
    }
  }

  public async fetchNotifications(userId: number): Promise<Notification[]> {
    try {
      // Primero, limpiar cualquier notificación para auditorías inexistentes
      await this.cleanupInvalidNotifications();

      // Obtener todas las auditorías
      const response = await auditService.fetchAllAudit('audit');
      const audits = response.data;

      // Ordenar auditorías por fecha en orden descendente
      const sortedAudits = audits.sort(
        (a: Audit, b: Audit) =>
          new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime()
      );

      // Obtener las últimas 5 auditorías
      const lastFiveAudits = sortedAudits.slice(0, 5);

      // Crear notificaciones para las últimas 5 auditorías
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

      // Solo agregar nuevas notificaciones que no existan en la lista actual
      const existingIds = new Set(
        this.notifications.map((n: Notification) => n.id)
      );
      const uniqueNewNotifications = newNotifications.filter(
        (n: Notification) => !existingIds.has(n.id)
      );

      // Actualizar lista de notificaciones con nuevas notificaciones y ordenar por fecha
      this.notifications = [...this.notifications, ...uniqueNewNotifications]
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          // Si las fechas son iguales, ordenar por ID en orden descendente (IDs más nuevos primero)
          if (dateA === dateB) {
            return b.id - a.id;
          }
          return dateB - dateA;
        })
        .slice(0, 5);

      // Actualizar tiempo de última verificación
      this.lastCheck = new Date().toISOString();

      // Guardar en localStorage
      this.saveToStorage();

      return this.notifications;
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
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

  public removeNotificationByAuditId(auditId: number): void {
    this.notifications = this.notifications.filter(
      (n) => n.auditId !== auditId
    );
    this.saveToStorage();
  }
}

export const notificationService = NotificationService.getInstance();
