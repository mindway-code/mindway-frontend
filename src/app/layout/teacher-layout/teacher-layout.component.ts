import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-teacher-layout',
  standalone: false,
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.scss'
})
export class TeacherLayoutComponent implements OnInit {
  /** itens do sidebar */
  menuItems: MenuItem[] = [
    { label: 'Perfil',       link: '/personal/profile',    icon: 'bi bi-person-circle'    },
    { label: 'Histórico',    link: '/personal/history',    icon: 'bi bi-calendar-check'   },
    { label: 'Relatos',      link: '/personal/relation',   icon: 'bi bi-pencil-square'    },
    { label: 'Tarefas',      link: '/personal/task',       icon: 'bi bi-check-square'     },
    { label: 'Notificações', link: '/personal/notification', icon: 'bi bi-bell'            },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode inicializar lógica adicional,
    // como carregar permissões de menu via serviço, etc.
  }
}
