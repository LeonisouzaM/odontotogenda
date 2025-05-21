import React, { useState, useEffect } from 'react';
import { Bell, Check, Dot, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the notification type with strict types for 'type'
type NotificationType = 'system' | 'appointment' | 'reminder' | 'payment';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationsListProps {
  initialNotifications?: Notification[];
  onCountChange?: (count: number) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ 
  initialNotifications = [], 
  onCountChange 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Inicializa com lista vazia, sem notificações falsas
    if (onCountChange) {
      onCountChange(0);
    }
    setIsLoading(false);
  }, [onCountChange]);

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    
    // Update unread count
    if (onCountChange) {
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      onCountChange(unreadCount);
    }
    
    toast.success("Notificação marcada como lida");
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    
    // Update unread count
    if (onCountChange) {
      onCountChange(0);
    }
    
    toast.success("Todas as notificações marcadas como lidas");
  };

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    // Update unread count
    if (onCountChange) {
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      onCountChange(unreadCount);
    }
    
    toast.success("Notificação excluída");
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'appointment':
        return <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-blue-600" />
        </div>;
      case 'system':
        return <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-purple-600" />
        </div>;
      case 'reminder':
        return <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-yellow-600" />
        </div>;
      case 'payment':
        return <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-green-600" />
        </div>;
      default:
        return <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-gray-600" />
        </div>;
    }
  };

  // Get notification badge color based on type
  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case 'appointment':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Agendamento</Badge>;
      case 'system':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Sistema</Badge>;
      case 'reminder':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Lembrete</Badge>;
      case 'payment':
        return <Badge className="bg-green-500 hover:bg-green-600">Pagamento</Badge>;
      default:
        return <Badge>Notificação</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Notificações</h3>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-full bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Notificações</h3>
        {notifications.some(n => !n.read) && (
          <Button 
            variant="ghost" 
            onClick={markAllAsRead} 
            size="sm" 
            className="text-xs"
          >
            <Check className="h-3 w-3 mr-1" /> Marcar todas como lidas
          </Button>
        )}
      </div>
      
      <div className="text-center py-6 text-gray-500">
        <Bell className="h-10 w-10 mx-auto mb-2 text-gray-400" />
        <p>Nenhuma notificação</p>
      </div>
    </div>
  );
};

export default NotificationsList;
