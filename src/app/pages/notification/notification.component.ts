import { Component, OnInit } from '@angular/core';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
}

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];

  ngOnInit(): void {
    // Dados de exemplo; em produção, buscar de um serviço/API.
    this.notifications = [
      { id: 1, title: 'Nova Tarefa', message: 'Uma nova tarefa foi atribuída a você.', date: new Date(), type: 'info', read: false },
      { id: 2, title: 'Relato Enviado', message: 'O terapeuta enviou um novo relato de progresso.', date: new Date('2025-04-20T10:30'), type: 'success', read: false },
      { id: 3, title: 'Alerta de Vencimento', message: 'Sua tarefa "Praticar Linguagem" vence hoje.', date: new Date('2025-04-25T08:00'), type: 'warning', read: false },
      { id: 4, title: 'Erro de Sincronização', message: 'Houve um problema ao sincronizar os dados.', date: new Date('2025-04-24T14:45'), type: 'danger', read: true }
    ];
  }

  // Retorna a classe de ícone conforme o tipo
  iconClass(type: Notification['type']): string {
    switch (type) {
      case 'info': return 'bi bi-info-circle text-info';
      case 'success': return 'bi bi-check-circle text-secondary';
      case 'warning': return 'bi bi-exclamation-triangle text-warning';
      case 'danger': return 'bi bi-x-circle text-danger';
    }
  }

  // Marca uma notificação como lida
  markAsRead(notif: Notification): void {
    notif.read = true;
  }

  // Limpa todas as notificações
  clearAll(): void {
    this.notifications = [];
  }

  searchTerm = '';

  filteredNotifications() {
    return this.notifications.filter(n =>
      n.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
