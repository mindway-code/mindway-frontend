import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../../api/interfaces/notification';



@Component({
  selector: 'app-notification-therapist',
  standalone: false,
  templateUrl: './notification-therapist.component.html',
  styleUrl: './notification-therapist.component.scss'
})
export class NotificationTherapistComponent implements OnInit {

  notifications: Notification[] = [];
  grouped: { [key: string]: Notification[]; } | undefined;

  ngOnInit(): void {
    this.notifications = [
      { id: 1, title: 'Nova Tarefa', message: 'Uma nova tarefa foi atribuída a você.', date: new Date(), type: 'info', read: false },
      { id: 2, title: 'Relato Enviado', message: 'O terapeuta enviou um novo relato de progresso.', date: new Date('2025-04-20T10:30'), type: 'success', read: false },
      { id: 3, title: 'Alerta de Vencimento', message: 'Sua tarefa "Praticar Linguagem" vence hoje.', date: new Date('2025-04-25T08:00'), type: 'warning', read: false },
      { id: 4, title: 'Erro de Sincronização', message: 'Houve um problema ao sincronizar os dados.', date: new Date('2025-04-24T14:45'), type: 'danger', read: true },
      { id: 4, title: 'Erro desconhecido', message: 'Houve um problema.', date: new Date('2025-04-24T14:45'), type: 'danger', read: true }
    ];
  }

  iconClass(type: Notification['type']): string {
    switch (type) {
      case 'info': return 'bi bi-info-circle text-info';
      case 'success': return 'bi bi-check-circle text-secondary';
      case 'warning': return 'bi bi-exclamation-triangle text-warning';
      case 'danger': return 'bi bi-x-circle text-danger';
    }
  }


  markAsRead(notif: Notification): void {
    notif.read = true;
    let ide  =  notif.id;
    //this.notifications[{ide}] = [];
  }


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

  unreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  readNotifications() {
    return this.notifications.filter(n => n.read);
  }



}
