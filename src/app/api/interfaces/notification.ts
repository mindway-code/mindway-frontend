export interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
}
