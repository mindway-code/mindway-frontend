// pages/personal-layout/personal-layout.component.ts

import { Component, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-personal-layout',
  standalone: false,
  templateUrl: './personal-layout.component.html',
  styleUrls: ['./personal-layout.component.scss']
})
export class PersonalLayoutComponent implements OnInit {
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
